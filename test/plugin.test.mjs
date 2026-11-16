import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as plugin from '../lib/index.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SKILLS = path.join(ROOT, 'skills')
const EXPECTED = ['ask-coach', 'study-coach', 'study-doctor', 'study-podcast', 'study-recap']
const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function listFiles(base, out = [], prefix = '') {
  for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
    const rel = path.join(prefix, entry.name)
    if (entry.isDirectory()) listFiles(path.join(base, entry.name), out, rel)
    else out.push(rel)
  }
  return out
}

function walkMarkdown(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walkMarkdown(p, out)
    else if (entry.name.endsWith('.md')) out.push(p)
  }
  return out
}

test('exports the cordis bundle shape', () => {
  assert.equal(plugin.name, 'ai-study-kit')
  assert.deepEqual(plugin.inject, ['skills'])
  assert.equal(typeof plugin.apply, 'function')
})

test('package.json declares a dsh.bundle patch and entry that exist', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'))
  assert.equal(pkg.name, 'dsh-ai-study-kit')
  assert.equal(pkg.type, 'module')
  assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml')
  assert.ok(fs.existsSync(path.join(ROOT, pkg.dsh.bundle.patch)), 'cordis.patch.yml missing')
  assert.equal(pkg.main, 'lib/index.js')
  assert.ok(fs.existsSync(path.join(ROOT, pkg.main)), 'lib/index.js missing')
  assert.ok(pkg.engines.dsh, 'engines.dsh missing')
})

test('cordis.patch.yml inserts this package under matching id/name', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'))
  const patch = fs.readFileSync(path.join(ROOT, 'cordis.patch.yml'), 'utf8')
  assert.match(patch, /insert:/)
  assert.match(patch, new RegExp('id: ' + pkg.name))
  assert.match(patch, new RegExp("name: '" + pkg.name + "'"))
})

test('skillDefinitions returns the five skills with correct policies', () => {
  const defs = plugin.skillDefinitions()
  assert.equal(defs.length, 5)
  assert.deepEqual(defs.map((d) => d.name), EXPECTED)
  for (const def of defs) {
    assert.match(def.name, SKILL_NAME)
    assert.ok(typeof def.description === 'string' && def.description.length > 0, `${def.name} description`)
    assert.ok(typeof def.content === 'string' && def.content.length > 0, `${def.name} content`)
    assert.ok(!def.content.startsWith('---'), `${def.name} frontmatter should be stripped`)
    assert.deepEqual(def.invocation, { modelInvocable: false, userInvocable: true })
    assert.equal(def.source, 'runtime')
    assert.equal(def.metadata.plugin, 'dsh-ai-study-kit')
    assert.equal(def.resourceBase.kind, 'directory')
    assert.equal(def.resourceBase.path, path.join(SKILLS, def.metadata.skillDir))
    assert.ok(fs.statSync(def.resourceBase.path).isDirectory(), `${def.name} resourceBase must be a directory`)
  }
})

test('each skill directory name matches its frontmatter name', () => {
  for (const entry of fs.readdirSync(SKILLS, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const { data } = plugin.parseFrontmatter(fs.readFileSync(path.join(SKILLS, entry.name, 'SKILL.md'), 'utf8'))
    assert.equal(data.name, entry.name)
    assert.match(data.name, SKILL_NAME)
  }
})

test('frontmatter parsing keeps descriptions with Chinese punctuation', () => {
  const { data, body } = plugin.parseFrontmatter(
    fs.readFileSync(path.join(SKILLS, 'study-doctor', 'SKILL.md'), 'utf8'),
  )
  assert.equal(data.name, 'study-doctor')
  assert.ok(data.description.startsWith('/study-doctor 一站式体检'), data.description)
  assert.equal(data['disable-model-invocation'], 'true')
  assert.ok(body.startsWith('# '), 'body should start at the markdown heading')
})

test('apply registers all five skills through ctx.effect and tears down', () => {
  const registered = []
  const disposed = []
  let cleanup
  const injected = []
  const ctx = {
    effect(fn) {
      cleanup = fn()
      return cleanup
    },
    // 宿主半边（学习台 RPC）走 ctx.inject；本用例只验 skill 注册，注入回调不执行。
    inject(services, fn) {
      injected.push([services, typeof fn])
      return () => {}
    },
    skills: {
      register(skill) {
        registered.push(skill)
        return () => disposed.push(skill.name)
      },
    },
    logger: { info() {}, warn() {} },
  }
  plugin.apply(ctx)
  assert.deepEqual(registered.map((s) => s.name), EXPECTED)
  assert.deepEqual(injected.map(([services]) => services), [['connection', 'webServer']])
  assert.equal(typeof cleanup, 'function')
  cleanup()
  assert.deepEqual(disposed.slice().sort(), EXPECTED.slice().sort())
})

test('every relative markdown link in skills/ and references/ resolves', () => {
  const files = [...walkMarkdown(SKILLS), ...walkMarkdown(path.join(ROOT, 'references'))]
  const broken = []
  const linkRe = /\]\(([^)]+)\)/g
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8')
    let match
    while ((match = linkRe.exec(text))) {
      const target = match[1].trim()
      if (!target || target.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(target) || target.includes('<')) continue
      const clean = target.split('#')[0]
      if (!clean) continue
      const abs = path.resolve(path.dirname(file), clean)
      if (!fs.existsSync(abs)) broken.push(`${path.relative(ROOT, file)} -> ${clean}`)
    }
  }
  assert.deepEqual(broken, [], 'unresolved relative links: ' + broken.join('; '))
})

test('kit snapshot version exists and matches the changelog', () => {
  const kv = JSON.parse(fs.readFileSync(path.join(ROOT, 'kit/kit-version.json'), 'utf8'))
  assert.equal(kv.version, '0.28.0')
  const changelog = fs.readFileSync(path.join(ROOT, 'CHANGELOG.md'), 'utf8')
  assert.ok(changelog.includes(`## [${kv.version}]`), 'CHANGELOG should contain the kit version heading')
})

test('icon.png is a real PNG and locale metadata is complete', () => {
  const png = fs.readFileSync(path.join(ROOT, 'icon.png'))
  assert.deepEqual([...png.subarray(0, 8)], [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  for (const lang of ['en', 'zh']) {
    const j = JSON.parse(fs.readFileSync(path.join(ROOT, `locale/${lang}.json`), 'utf8'))
    assert.ok(j.meta.title && j.meta.description, `${lang} meta incomplete`)
  }
})

// ── 上游完整性检查（记录差异 allowlist，不静默放过）────────────────────────
// 契约：① 与上游同名的文件逐字节一致；② **允许**的改写必须逐文件登记在 UPSTREAM_DIFFS，
// 并写明理由（细则见 docs/DETAIL.md §4）；③ 未登记的字节差异一律失败——既防上游漂移被
// 静默吞掉，也防有人偷偷改快照；④ 快照**故意不带**的上游文件（设计源 / sync 产物 / 运行时
// 数据 / 构建产物）走 SNAPSHOT_PRUNE 白名单，每条也要写理由。
// 本仓库把上游的 skills/references/ 上提到了仓库根的 references/，kit/ 是上游 apps/quiz-app
// 与 examples/ 的发包快照——所以先做路径映射，再比内容。
const UPSTREAM_MAP = [
  {
    local: 'skills',
    upstream: 'skills',
    prune: [[/^references\//, '上游 skills/references/ 已上提到仓库根 references/（见下一条映射）']],
  },
  {
    local: 'references',
    upstream: 'skills/references',
    note: 'references/ 上提到仓库根（插件 resourceBase 与 `../../references/` 相对链接依赖这个位置）',
  },
  {
    local: 'kit/apps/quiz-app',
    upstream: 'apps/quiz-app',
    prune: [
      [/^(assets-src|node_modules|dist)\//, '设计源 / 依赖 / 构建目录，不发包'],
      [/^public\/study\//, 'sync 产物（构建时从主题源 examples/ 生成，禁止手改）'],
      [/^src\/data\//, 'sync 产物（同上）'],
      [/^progress\.json$/, '运行时用户数据，绝不进包'],
      [/(^|\/)tsconfig(\.[a-z0-9]+)?\.tsbuildinfo$/, '构建产物（增量编译缓存）'],
      [/(^|\/)vite\.config\.(js|d\.ts)$/, '构建产物（源码是 vite.config.ts）'],
    ],
  },
  {
    local: 'kit/examples',
    upstream: 'examples',
    prune: [
      [/^software-designer\//, '上游多出的演示主题；快照只带 dev-intro 一个主题'],
      [/(^|\/)study\//, '演示用用户数据（records/notes/wrong-questions 等），不进包'],
    ],
  },
]

const UPSTREAM_DIFFS = {
  'skills/ask-coach/SKILL.md':
    'DSH 学习台形态：快照字段（服务 → 学习台连接）、意图路由前置、硬红线 1-4（去 EXAMPLE_THEME / src-data 同步产物 / 发布门）',
  'skills/ask-coach/references/coach.md':
    '品牌自查改「学习项目里没有 scan 脚本，按同口径自查」，去发布门禁措辞',
  'skills/ask-coach/references/flows.md':
    '流程手册整体迁移：F1 建轻目录、F2/F7 只改 examples/<theme>、F8 内容自检（原四门校验）、F9 部署退役、F13 迁移+插件更新、F12 报告走 kit 快照、体检/诊断口径（无 dev/server/pm2/:8787/build）',
  'skills/ask-coach/references/flows/F4.md':
    '前置去「后端在线」、档案改项目根 study/records、CLI 标注旧 SERVER 形态跑不通、去 scan+build 门禁',
  'skills/ask-coach/references/flows/F5.md':
    '播客脚本路径改 <插件根>/kit 快照 + 绝对主题路径（去仓库内相对 apps/quiz-app）',
  'skills/ask-coach/references/flows/F6.md':
    '产课脚本路径改 <插件根>/kit 快照 + 绝对主题路径（同上）',
  'skills/ask-coach/references/flows/F10.md':
    '链接修正（../voice.md → ../../../../references/voice.md）+ 口头流水改纯落盘（去 POST /api/oral-attempts）+ 学习痕迹目录改项目根 study/ + 报告/计划脚本走 kit 快照并显式传 --progress',
  'skills/ask-coach/references/flows/F11.md':
    '去「scan 零命中随 build 上站」发布门，改「落盘即在学习台可见」',
  'skills/study-coach/SKILL.md': '非陪练分流措辞：答题站 → 学习台「答题」视图',
  'skills/study-doctor/SKILL.md':
    'description 与流程摘要改内容自检 + 环境探测 + 版本/契约（去四门校验、:8787 后端、sync 新鲜度）',
  'skills/study-podcast/SKILL.md': '非播客分流措辞：答题站 → 学习台「答题」视图',
  'skills/study-recap/SKILL.md': 'description 与前置去「后端在线（pnpm run server）」，刷题入口改学习台答题视图',
  'references/state.md':
    '探测协议迁移：项目探测改 examples/ 判据、主题取 progress.json.theme、库存/进度直读 examples/ 与根 progress.json（去 /api/health、/api/progress curl）、报告走 kit 快照脚本、记录目录改项目根 study/records、版本三态去项目 kit 与部署实例',
  'references/contracts.md':
    '契约二改项目根 study/records、口述改纯落盘（去回流 API）、台账/next-hook 落项目根、plan 生成脚本走 kit 快照',
  'references/voice.md':
    '只改引用路径：references/ 上提到根后 coach.md 的链接层级 ../ask-coach/... → ../skills/ask-coach/...（成文口径未动）',
  'kit/apps/quiz-app/scripts/lib/theme-path.mjs': '隐私清洗：原作者服务器用户名替换为占位用户名',
  'kit/apps/quiz-app/scripts/lib/theme-path.test.mjs': '隐私清洗：同上',
}

function firstDiffLine(a, b) {
  const la = a.split('\n')
  const lb = b.split('\n')
  const n = Math.max(la.length, lb.length)
  for (let i = 0; i < n; i += 1) if (la[i] !== lb[i]) return i + 1
  return n
}

function pruneReason(entry, rel) {
  for (const [pattern, why] of entry.prune ?? []) {
    if (pattern instanceof RegExp ? pattern.test(rel) : rel.startsWith(pattern)) return why
  }
  return null
}

test(
  'copied skills/kit/references differ from upstream only where recorded (recorded-diff allowlist)',
  { skip: !process.env.AI_STUDY_KIT_SRC ? 'set AI_STUDY_KIT_SRC to run the upstream integrity check' : false },
  (t) => {
    const src = process.env.AI_STUDY_KIT_SRC
    assert.ok(fs.existsSync(src), `AI_STUDY_KIT_SRC not found: ${src}`)

    // 上游可能有本地运行痕迹（.mimosa 之类），快照里不会有
    const IGNORED = new Set(['.git', '.mimosa', 'node_modules', 'dist', 'out', '.DS_Store'])
    const list = (base, prefix = '', out = []) => {
      for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
        if (IGNORED.has(entry.name)) continue
        const rel = path.join(prefix, entry.name)
        if (entry.isDirectory()) list(path.join(base, entry.name), rel, out)
        else out.push(rel)
      }
      return out
    }

    const recorded = []
    const seen = new Set()

    for (const entry of UPSTREAM_MAP) {
      const upBase = path.join(src, entry.upstream)
      if (!fs.existsSync(upBase)) {
        t.diagnostic(`skip ${entry.local}: upstream has no ${entry.upstream}`)
        continue
      }
      const upFiles = list(upBase).map((r) => r.split(path.sep).join('/')).sort()
      const localFiles = list(path.join(ROOT, entry.local)).map((r) => r.split(path.sep).join('/')).sort()
      const localSet = new Set(localFiles)
      const upSet = new Set(upFiles)

      // 快照里多出来的文件 → 上游没有对应源，必须显式知会（当前应为空）
      const extraLocal = localFiles.filter((rel) => !upSet.has(rel))
      assert.deepEqual(extraLocal, [], `${entry.local}: snapshot has files with no upstream counterpart`)

      // 上游多出来的文件 → 只能落在 SWTCH 快照裁剪白名单里，且每条都要有理由
      const pruned = []
      const unexpected = []
      for (const rel of upFiles.filter((r) => !localSet.has(r))) {
        const why = pruneReason(entry, rel)
        if (why) pruned.push({ rel, why })
        else unexpected.push(rel)
      }
      assert.deepEqual(
        unexpected,
        [],
        `${entry.local}: upstream files missing from the snapshot without a documented prune rule — ` +
          'either refresh the snapshot or add a SNAPSHOT prune rule (with reason) to UPSTREAM_MAP',
      )
      if (pruned.length) t.diagnostic(`${entry.local}: pruned ${pruned.length} upstream files (${pruned[0].why} …)`)

      for (const rel of upFiles.filter((r) => localSet.has(r))) {
        const key = `${entry.local}/${rel}`
        seen.add(key)
        const upstream = fs.readFileSync(path.join(upBase, rel), 'utf8')
        const local = fs.readFileSync(path.join(ROOT, entry.local, rel), 'utf8')
        if (upstream === local) {
          if (UPSTREAM_DIFFS[key]) t.diagnostic(`allowlist stale (no diff now): ${key}`)
          continue
        }
        const reason = UPSTREAM_DIFFS[key]
        assert.ok(
          reason,
          `${key} differs from upstream but is not in the recorded-diff allowlist — ` +
            'either revert it or register it in UPSTREAM_DIFFS with a reason (and docs/DETAIL.md §4)',
        )
        recorded.push(key)
        t.diagnostic(`diff ${key} @line ${firstDiffLine(upstream, local)}: ${reason}`)
      }
    }

    // 台账不能有幽灵条目：登记了但文件不存在 / 文件已与上游一致（提示回收，不失败）
    for (const key of Object.keys(UPSTREAM_DIFFS)) {
      assert.ok(fs.existsSync(path.join(ROOT, key)), `allowlist entry missing on disk: ${key}`)
      if (!seen.has(key)) t.diagnostic(`allowlist entry outside UPSTREAM_MAP subtrees: ${key}`)
    }
    t.diagnostic(`recorded ${recorded.length} intentional differences from upstream`)

    // 定向回归：链接修正（台账最早的一笔）与隐私（不许残留作者机器绝对路径）
    const fixed = fs.readFileSync(path.join(ROOT, 'skills', 'ask-coach', 'references', 'flows', 'F10.md'), 'utf8')
    assert.ok(fixed.includes('](../../../../references/voice.md)'), 'documented link fix missing')
    assert.ok(!fixed.includes('](../voice.md)'), 'broken link still present')

    for (const sub of ['skills', 'references']) {
      for (const rel of list(path.join(ROOT, sub))) {
        const text = fs.readFileSync(path.join(ROOT, sub, rel), 'utf8')
        const hit = text.match(/\/home\/[a-z0-9._-]+\//i)
        assert.ok(!hit, `personal absolute path still present in ${sub}/${rel}: ${hit && hit[0]}`)
      }
    }
  },
)
