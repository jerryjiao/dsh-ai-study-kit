/**
 * dsh-ai-study-kit — 宿主半边（host）。
 *
 * 做两件事：
 *   1. 把 skills/ 下的 5 个技能注册进 DSH（原有能力，不能退化）。
 *   2. 给浏览器半边的「学习台」面板供数据：读用户学习项目、读写唯一进度真源
 *      progress.json（RPC 通道见 src/shared/contract.js）。
 *
 * 关键取舍：
 *   - 只静态 inject `skills`。面板要的 `connection` 用动态 inject 等（headless 之类的
 *     profile 没有它，静态注入会让技能也一起不激活）。
 *   - 存储用 feature detection：宿主有 storageDomain 就记住「上次的项目」，没有就退化成
 *     不记忆（面板仍可用，用户每次手选目录）。
 *   - 进度只有一个真源：项目里的 progress.json。宿主不缓存、不双写。
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  DEFAULT_SETTINGS,
  ENDPOINTS,
  RPC_AUTHORITY,
  RPC_CHANNEL,
  emptySnapshot,
  emptyThemeData,
} from '../shared/contract.js'
import { listThemes, readThemeData } from './study/content.js'
import { detectProject, findStudyRoot } from './study/project.js'
import { mergeProgress, readProgress, writeProgress } from './study/progress.js'

export const name = 'ai-study-kit'
/** 技能注册是硬依赖；连接/存储等服务在 apply 里动态等待。 */
export const inject = ['skills']

const PLUGIN = 'dsh-ai-study-kit'
const STATE_NAME = 'dsh_study_kit'

/* ------------------------------------------------------------------ */
/* 包内路径与技能注册（原样保留）                                       */
/* ------------------------------------------------------------------ */

function here() {
  return dirname(fileURLToPath(import.meta.url))
}

/** 包根目录（lib/ 的上一级）。 */
export function pkgRoot() {
  return join(here(), '..')
}

/** 读包版本；读不到不致命，回落 0.0.0。 */
export function readVersion() {
  try {
    return JSON.parse(readFileSync(join(pkgRoot(), 'package.json'), 'utf8')).version ?? '0.0.0'
  } catch {
    return '0.0.0'
  }
}

/** 技能目录。 */
export function skillsRoot() {
  return join(pkgRoot(), 'skills')
}

/**
 * 拆 SKILL.md 的 frontmatter（扁平 YAML：key: value）。
 * @param {string} raw
 * @returns {{data: Record<string, string>, body: string}}
 */
export function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(String(raw ?? ''))
  if (!match) return { data: {}, body: String(raw ?? '') }
  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z0-9_-]+):\s?([\s\S]*)$/.exec(line)
    if (!kv) continue
    let value = kv[2].trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[kv[1]] = value
  }
  return { data, body: String(raw).slice(match[0].length).replace(/^\s*\n/, '') }
}

/**
 * 枚举各技能目录的 SKILL.md 并组装 DSH 的技能定义。
 * @returns {Array<object>}
 */
export function skillDefinitions() {
  const root = skillsRoot()
  const dirs = readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
  const version = readVersion()
  const defs = []
  for (const dir of dirs) {
    const file = join(root, dir, 'SKILL.md')
    if (!existsSync(file)) continue
    const { data, body } = parseFrontmatter(readFileSync(file, 'utf8'))
    if (!data.description) throw new Error(`skill "${dir}" (${file}) 缺少 description`)
    const disableModel = data['disable-model-invocation'] === 'true'
    defs.push({
      name: data.name || dir,
      description: data.description,
      content: body,
      resourceBase: { kind: 'directory', path: join(root, dir) },
      invocation: { modelInvocable: !disableModel, userInvocable: true },
      source: 'runtime',
      metadata: { plugin: PLUGIN, version, skillDir: dir },
    })
  }
  return defs
}

/* ------------------------------------------------------------------ */
/* 学习台服务                                                          */
/* ------------------------------------------------------------------ */

/** 默认设置（进度里没存过就用它）。 */
function normalizeSettings(progress) {
  const stored = progress?.settings && typeof progress.settings === 'object' ? progress.settings : {}
  return {
    ...DEFAULT_SETTINGS,
    ...stored,
    lang: progress?.lang === 'en' || stored.lang === 'en' ? 'en' : DEFAULT_SETTINGS.lang,
  }
}

/**
 * 学习台服务：所有端点都是纯函数式的「读盘 → 算 → 返回」，没有内存缓存。
 * （进度只有一个真源是 progress.json，缓存只会引入不一致。）
 */
export function createStudyService({ logger, state = {}, cwd = process.cwd(), home = homedir() } = {}) {
  state ??= {}
  let selectedProject = null
  const warn = (message) => logger?.warn?.(`${PLUGIN}: ${message}`)

  /** 当前项目根：记住的优先，其余按 cwd → ~/study-kit 顺序探测。 */
  function resolveProject() {
    const remembered = state?.projectRoot ?? null
    return selectedProject ?? detectProject({ remembered, cwd, home })
  }

  /** 组装整份快照。 */
  function snapshot() {
    const project = resolveProject()
    if (!project.root) {
      const empty = emptySnapshot()
      return { ...empty, warnings: ['没有找到学习项目：请选择一个含 examples/ 的目录'] }
    }
    const root = project.root
    const themes = listThemes(root)
    const progress = readProgress(root) ?? {}
    const usable = themes.some((item) => item.slug === progress.theme)
    const theme = usable ? progress.theme : (themes[0]?.slug ?? null)
    const settings = normalizeSettings(progress)
    const data = theme ? readThemeData(root, theme) : emptyThemeData()
    const warnings = []
    if (project.legacy) {
      warnings.push('这是旧版布局（examples/ 埋在 kit/ 下），建议按 docs/adr/0003 迁移到轻结构')
    }
    if (!themes.length) warnings.push('项目里还没有主题：examples/ 是空的')
    return {
      project: { root, source: project.source, legacy: project.legacy },
      themes,
      theme,
      data,
      progress: { ...progress, theme, settings, lang: settings.lang },
      settings,
      warnings,
    }
  }

  /** 记住项目根（有 storageDomain 才持久化）。 */
  async function rememberProject(root) {
    if (state) state.projectRoot = root
    if (!state?.global) return
    try {
      await state.global.set({ ...(state.global.get() ?? {}), projectRoot: root })
    } catch (error) {
      warn(`记住项目路径失败（不影响使用）：${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return {
    snapshot,

    async saveProgress(payload) {
      const root = resolveProject().root
      if (!root) throw badRequest('还没有选中学习项目')
      const incoming = payload?.progress
      if (!incoming || typeof incoming !== 'object') throw badRequest('progress.save 需要 progress 对象')
      if (incoming.version !== 1 || !incoming.answers || Array.isArray(incoming.answers)) throw badRequest('invalid progress payload')
      if (payload.root && payload.root !== root) throw badRequest('项目已切换，拒绝保存旧项目进度')
      const merged = writeProgress(root, incoming)
      return { progress: merged }
    },

    async setProject(payload) {
      const candidate = typeof payload?.root === 'string' ? payload.root.trim() : ''
      if (!candidate) throw badRequest('project.set 需要 root 路径')
      const found = findStudyRoot(candidate.replace(/^~(?=$|\/)/, homedir()))
      if (!found) throw badRequest(`这个目录不像学习项目（里面没有 examples/）：${candidate}`)
      selectedProject = { ...found, source: 'manual' }
      await rememberProject(found.root)
      return snapshot()
    },

    async setTheme(payload) {
      const root = resolveProject().root
      if (!root) throw badRequest('还没有选中学习项目')
      const slug = typeof payload?.theme === 'string' ? payload.theme.trim() : ''
      if (!slug) throw badRequest('theme.set 需要 theme')
      const themes = listThemes(root)
      if (!themes.some((item) => item.slug === slug)) throw badRequest(`主题不存在：${slug}`)
      const base = readProgress(root) ?? {}
      const merged = mergeProgress(base, { ...base, theme: slug, themeUpdatedAt: Math.max(Date.now(), (base.themeUpdatedAt ?? 0) + 1) })
      await writeProgress(root, merged)
      return snapshot()
    },

    async setSettings(payload) {
      const root = resolveProject().root
      if (!root) throw badRequest('还没有选中学习项目')
      const patch = payload?.patch
      if (!patch || typeof patch !== 'object') throw badRequest('settings.set 需要 patch 对象')
      const base = readProgress(root) ?? {}
      const current = normalizeSettings(base)
      const allowed = {}
      for (const [key, value] of Object.entries(patch)) {
        if (['extOn', 'autoAdvance'].includes(key) && typeof value === 'boolean') allowed[key] = value
        else if (key === 'dailyNewCards' && Number.isInteger(value) && value >= 0 && value <= 1000) allowed[key] = value
        else if (key === 'lang' && ['zh', 'en'].includes(value)) allowed[key] = value
        else throw badRequest(`设置值无效：${key}`)
      }
      const next = { ...current, ...allowed }
      const now = Math.max(Date.now(), (base.settingsUpdatedAt ?? 0) + 1, (base.langUpdatedAt ?? 0) + 1)
      const merged = mergeProgress(base, {
        ...base,
        settings: next,
        settingsUpdatedAt: now,
        ...(patch.lang === 'zh' || patch.lang === 'en' ? { lang: patch.lang, langUpdatedAt: now } : {}),
      })
      await writeProgress(root, merged)
      return { progress: merged, settings: next }
    },
  }
}

/** 400 类错误：消息直接给面板看。 */
function badRequest(message) {
  const error = new Error(message)
  error.code = 'bad_request'
  return error
}

/* ------------------------------------------------------------------ */
/* RPC                                                                 */
/* ------------------------------------------------------------------ */

/**
 * 解析 RPC 注册器：优先 connection.register（传自己的 owner），否则回落 connection.rpc。
 * 直接 connection.rpc.handle 会因服务 ctx 缺 webServer 而恒抛，导致面板全部 405。
 */
function resolveRpcRegistrar(connection, owner) {
  if (!connection) return undefined
  const { register } = connection
  if (typeof register === 'function') {
    return { handle: (channel, handler, options) => register.call(connection, owner, channel, handler, options) }
  }
  return connection.rpc
}

/**
 * 注册学习台 RPC；返回 disposer（可能是 promise）。
 * @returns {Promise<void | (() => void)> | undefined}
 */
function registerStudyRpc(service, connection, owner, logger) {
  const rpc = resolveRpcRegistrar(connection, owner)
  if (!rpc?.handle) {
    logger?.warn?.(`${PLUGIN}: connection 服务不可用，学习台面板拿不到数据`)
    return undefined
  }
  const handler = async (endpoint, payload) => {
    try {
      switch (endpoint) {
        case ENDPOINTS.snapshot:
          return envelope(await service.snapshot())
        case ENDPOINTS.saveProgress:
          return envelope(await service.saveProgress(payload))
        case ENDPOINTS.setProject:
          return envelope(await service.setProject(payload))
        case ENDPOINTS.setTheme:
          return envelope(await service.setTheme(payload))
        case ENDPOINTS.setSettings:
          return envelope(await service.setSettings(payload))
        default:
          throw badRequest(`未知端点：${endpoint}`)
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      logger?.warn?.(`${PLUGIN}: ${endpoint} 失败：${message}`)
      return {
        ok: false,
        error: { code: error?.code ?? 'internal', message: message.slice(0, 500) },
      }
    }
  }

  let pending
  try {
    pending = rpc.handle(RPC_CHANNEL, handler, { authority: RPC_AUTHORITY })
  } catch (error) {
    logger?.warn?.(`${PLUGIN}: RPC 注册失败：${error instanceof Error ? error.message : String(error)}`)
    return undefined
  }
  return Promise.resolve(pending).then((dispose) => () => dispose?.())
}

function envelope(value) {
  return { ok: true, value }
}

/* ------------------------------------------------------------------ */
/* 生命周期                                                            */
/* ------------------------------------------------------------------ */

/** 打开可选的状态域（记住项目路径）。缺失时退化成不记忆。 */
async function openState(ctx, logger) {
  const storageDomain = tryService(ctx, 'storageDomain')
  if (!storageDomain?.open) return null
  try {
    const domain = await storageDomain.open({
      name: STATE_NAME,
      version: 1,
      global: {
        // 宿主只校验形状；不用 zod，避免为一个字符串引入依赖。
        schema: {
          parse(value) {
            if (!value || typeof value !== 'object' || Array.isArray(value)) {
              throw new TypeError('state 必须是对象')
            }
            return value
          },
          safeParse(value) {
            const ok = Boolean(value) && typeof value === 'object' && !Array.isArray(value)
            return ok ? { success: true, data: value } : { success: false }
          },
        },
        initial: { projectRoot: null },
      },
      tables: {},
    })
    const global = domain.global
    const current = global?.get?.() ?? {}
    return {
      global,
      projectRoot: typeof current.projectRoot === 'string' ? current.projectRoot : null,
    }
  } catch (error) {
    logger?.warn?.(
      `${PLUGIN}: 状态域打不开（这次不记忆项目路径）：${error instanceof Error ? error.message : String(error)}`,
    )
    return null
  }
}

/** 读服务：cordis 对未 inject 的服务属性访问会抛错，这里统一降级成 undefined。 */
function tryService(ctx, name) {
  try {
    return ctx?.[name]
  } catch {
    return undefined
  }
}

/**
 * @param {any} ctx
 * @param {{ projectRoot?: string }} [config]
 */
export function apply(ctx, config = {}) {
  const logger = typeof ctx?.logger === 'function' ? ctx.logger(PLUGIN) : ctx?.logger

  // 1) 技能注册（原有能力，行为不变）
  ctx.effect(() => {
    const disposers = []
    try {
      const defs = skillDefinitions()
      for (const definition of defs) {
        disposers.push(ctx.skills.register(definition))
      }
      logger?.info?.(`ai-study-kit: 注册了 ${defs.length} 个技能`)
    } catch (error) {
      for (const dispose of disposers.splice(0).reverse()) {
        try {
          dispose?.()
        } catch {
          /* 回滚失败不影响抛出原始错误 */
        }
      }
      throw error
    }
    return () => {
      for (const dispose of disposers.reverse()) {
        try {
          dispose?.()
        } catch {
          /* 卸载期忽略 */
        }
      }
    }
  })

  // 2) 学习台 RPC：用动态 inject 等 connection/webServer 就绪。
  //    静态 inject 只留 skills —— headless 之类没有 connection 的 profile 不该让技能一起失效。
  ctx.inject(['connection', 'webServer'], (child) => {
    child.effect(
      async () => {
        const state = (await openState(child, logger)) ?? {}
        if (typeof config?.projectRoot === 'string' && !state.projectRoot) {
          state.projectRoot = config.projectRoot
        }
        const service = createStudyService({ logger, state })
        const stopRpc = registerStudyRpc(service, tryService(child, 'connection'), child, logger)
        logger?.info?.('ai-study-kit: 学习台 RPC 已挂载')
        return async () => {
          const dispose = await Promise.resolve(stopRpc).catch(() => undefined)
          dispose?.()
        }
      },
      `${PLUGIN}: study desk rpc`,
    )
  })
}
