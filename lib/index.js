/**
 * dsh-ai-study-kit — AI 学习教练 for DeepSeek Harness.
 *
 * 把 ai-study-kit 的五个学习教练 skill 原样搬进 DSH：
 *   - ask-coach     主入口 / 路由（探测状态 → 快照 → 推荐 → F1..F13 菜单）
 *   - study-coach   陪练直入（F10）
 *   - study-doctor  一站式体检
 *   - study-recap   错题串讲直入（F4）
 *   - study-podcast 播客直入（F5）
 *
 * 每个 skill 的正文来自随包携带的 skills/<name>/SKILL.md（YAML frontmatter
 * 在注册前剥掉，name/description/invocation 从 frontmatter 读取）。skill 目录
 * 本身作为 resourceBase，正文里的相对路径（../../references/*.md、../ask-coach/…、
 * <插件根>/kit/…）都能按绝对 base 解析到——和原始插件的目录布局一致。
 *
 * 附带完整答题站快照 kit/（apps/quiz-app 等，版本见 kit/kit-version.json）与
 * references/（契约、状态探测、语气），原样分发，不改一行运行代码。
 *
 * 无运行时依赖：只用 node:fs / node:path / node:url。没有用户密钥，不收集任何
 * 数据，不在工作区之外写任何东西。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** cordis 插件名。 */
export const name = 'ai-study-kit'
/** 只依赖 skills 服务；不给宿主塞任何工具。 */
export const inject = ['skills']

const PLUGIN = 'dsh-ai-study-kit'

function here() {
  return path.dirname(fileURLToPath(import.meta.url))
}

/** 包根：lib/ 的上一级。 */
export function pkgRoot() {
  return path.join(here(), '..')
}

export function readVersion() {
  try {
    return JSON.parse(fs.readFileSync(path.join(pkgRoot(), 'package.json'), 'utf8')).version ?? '0.0.0'
  } catch {
    return '0.0.0'
  }
}

/** 随包的 skills 根目录。 */
export function skillsRoot() {
  return path.join(pkgRoot(), 'skills')
}

/**
 * 剥掉 SKILL.md 顶部的 YAML frontmatter，返回解析出的键值和正文。
 * 只处理本项目实际用到的扁平行（name / description / disable-model-invocation）。
 * @param {string} raw
 * @returns {{ data: Record<string,string>, body: string }}
 */
export function parseFrontmatter(raw) {
  const text = String(raw)
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text)
  if (!match) return { data: {}, body: text }
  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z0-9_-]+):\s?([\s\S]*)$/.exec(line)
    if (!kv) continue
    let value = kv[2].trim()
    if (value.length >= 2 && (value[0] === '"' || value[0] === "'") && value.at(-1) === value[0]) {
      value = value.slice(1, -1)
    }
    data[kv[1]] = value
  }
  return { data, body: text.slice(match[0].length).replace(/^\n+/, '') }
}

/**
 * 读取所有技能的注册描述。
 * @returns {Array<object>} ctx.skills.register 可接受的 SkillRegistration 数组
 */
export function skillDefinitions() {
  const root = skillsRoot()
  const version = readVersion()
  const dirs = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()

  return dirs.map((dir) => {
    const skillDir = path.join(root, dir)
    const file = path.join(skillDir, 'SKILL.md')
    const { data, body } = parseFrontmatter(fs.readFileSync(file, 'utf8'))
    const skillName = data.name || dir
    if (!data.description) {
      throw new Error(`skill "${dir}" (${file}) 缺少 description`)
    }
    const disableModel = String(data['disable-model-invocation'] ?? '').toLowerCase() === 'true'
    return {
      name: skillName,
      description: data.description,
      content: body,
      resourceBase: { kind: 'directory', path: skillDir },
      // 原文 disable-model-invocation: true 表示只让用户斜杠调用，不自动进模型目录。
      invocation: { modelInvocable: !disableModel, userInvocable: true },
      source: 'runtime',
      metadata: { plugin: PLUGIN, version, skillDir: dir },
    }
  })
}

/**
 * cordis 插件入口。
 * @param {import('@deepseek-ai/cordis').Context} ctx
 * @param {Record<string, unknown>} [config]
 */
export function apply(ctx, config = {}) {
  void config
  ctx.effect(() => {
    const disposers = []
    try {
      for (const skill of skillDefinitions()) {
        disposers.push(ctx.skills.register(skill))
      }
      ctx.logger?.info?.(`ai-study-kit: 注册了 ${disposers.length} 个技能`)
    } catch (err) {
      for (const dispose of disposers) {
        try {
          dispose()
        } catch {
          /* ignore */
        }
      }
      throw err
    }
    return () => {
      for (const dispose of disposers) {
        try {
          dispose()
        } catch {
          /* ignore */
        }
      }
    }
  })
}
