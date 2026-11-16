/**
 * 宿主学习台服务（src/host/index.js 的 createStudyService / parseFrontmatter）集成回归测试。
 *
 * 原则：
 *   - 只碰本测试自己建的临时目录；绝不调用默认 cwd/home，避免读到真实用户的学习项目与进度。
 *   - 项目根一律用显式注入的 cwd 或 project.set 手选，不走真实家目录探测。
 *   - 只通过公开导出（createStudyService / parseFrontmatter）和磁盘上的 progress.json 断言，
 *     不 import 内部模块，因此生产代码重构内部实现不影响本测试。
 */
import test, { after } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { createStudyService, parseFrontmatter } from '../src/host/index.js'

// ── 临时目录（清理前必须校验是本测试自己的绝对路径） ──────────────────────

const TEST_PREFIX = 'dsh-study-service-test-'
const SUITE_ROOT = fs.mkdtempSync(path.join(path.resolve(os.tmpdir()), TEST_PREFIX))

/** 只允许操作 SUITE_ROOT 自身或它下面的路径。 */
function assertTempPath(target) {
  const abs = path.resolve(target)
  const insideSuite = abs === SUITE_ROOT || abs.startsWith(SUITE_ROOT + path.sep)
  if (!insideSuite) throw new Error(`拒绝清理测试目录之外的路径：${abs}`)
  if (!path.basename(SUITE_ROOT).startsWith(TEST_PREFIX)) {
    throw new Error(`临时根目录名不符合测试前缀：${SUITE_ROOT}`)
  }
  return abs
}

function mkTemp(label) {
  return fs.mkdtempSync(path.join(SUITE_ROOT, `${label}-`))
}

after(() => {
  fs.rmSync(assertTempPath(SUITE_ROOT), { recursive: true, force: true })
})

// ── 轻项目 fixture（examples/<theme>/questions.json + flashcards.json） ────

const ALPHA_QUESTIONS = [
  { id: 'a-q1', examPoint: 'EP-01', question: '变量是什么？', options: ['A', 'B'], answer: 0 },
  { id: 'a-q2', examPoint: 'EP-02', question: '函数是什么？', options: ['A', 'B'], answer: 1 },
]
const ALPHA_FLASHCARDS = [{ id: 'a-f1', examPoint: 'EP-01', front: '作用域', back: '变量的可见范围' }]
const ALPHA_MISSION = [
  '# MISSION',
  '',
  '| 考点 | 名称 | 难度 | 材料 | 学程块 |',
  '| --- | --- | --- | --- | --- |',
  '| EP-01 | 变量与作用域 | 基础 | 讲义 | D1 |',
  '| EP-02 | 函数 | 基础 | 讲义 | D2 |',
  '',
].join('\n')

const BETA_QUESTIONS = [{ id: 'b-q1', examPoint: 'EP-01', question: 'Beta 题', options: ['A', 'B'], answer: 0 }]
const BETA_FLASHCARDS = [
  { id: 'b-f1', examPoint: 'EP-01', front: 'B1', back: '背 1' },
  { id: 'b-f2', examPoint: 'EP-01', front: 'B2', back: '背 2' },
]

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, JSON.stringify(value, null, 2))
}

function writeTheme(root, slug, { questions, flashcards, config, mission }) {
  const dir = path.join(root, 'examples', slug)
  writeJson(path.join(dir, 'questions.json'), questions)
  writeJson(path.join(dir, 'flashcards.json'), flashcards)
  if (config) writeJson(path.join(dir, 'theme-config.json'), config)
  if (mission) fs.writeFileSync(path.join(dir, 'MISSION.md'), mission)
}

function makeProject() {
  const root = mkTemp('project')
  writeTheme(root, 'alpha', {
    questions: ALPHA_QUESTIONS,
    flashcards: ALPHA_FLASHCARDS,
    config: { title: 'Alpha 主题' },
    mission: ALPHA_MISSION,
  })
  writeTheme(root, 'beta', {
    questions: BETA_QUESTIONS,
    flashcards: BETA_FLASHCARDS,
    config: { title: 'Beta 主题' },
  })
  return root
}

/** 永不落到真实 cwd/home 的服务工厂：默认发给它刚建的空临时目录。 */
function makeService({ cwd = mkTemp('cwd'), home = mkTemp('home'), state = {}, logger } = {}) {
  return createStudyService({ logger, state, cwd, home })
}

function readDiskProgress(root) {
  const file = path.join(root, 'progress.json')
  if (!fs.existsSync(file)) return null
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function listFiles(base, prefix = '') {
  const out = []
  for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
    const rel = path.join(prefix, entry.name)
    if (entry.isDirectory()) out.push(...listFiles(path.join(base, entry.name), rel))
    else out.push(rel)
  }
  return out.sort()
}

function assertSamePath(actual, expected) {
  assert.equal(fs.realpathSync(actual), fs.realpathSync(expected))
}

/** assert.rejects 的谓词：错误码 + 面板可见消息。 */
function rejectsWith(pattern, code = 'bad_request') {
  return (error) => {
    assert.equal(error?.code, code)
    assert.match(String(error?.message ?? ''), pattern)
    return true
  }
}

// ── parseFrontmatter ─────────────────────────────────────────────────────

test('parseFrontmatter 解析扁平 frontmatter 且不丢正文', () => {
  const raw = [
    '---',
    'name: study-coach',
    'description: "学习教练：含冒号的说明"',
    'disable-model-invocation: true',
    '---',
    '',
    '# 正文标题',
    '',
    '第一段。',
    '---',
    '正文里的分隔线不能当 frontmatter。',
  ].join('\n')

  const { data, body } = parseFrontmatter(raw)
  assert.equal(data.name, 'study-coach')
  assert.equal(data.description, '学习教练：含冒号的说明')
  assert.equal(data['disable-model-invocation'], 'true')
  // 正文完整保留（含正文内部的 ---），且不残留 frontmatter 后的空行
  assert.equal(body, '# 正文标题\n\n第一段。\n---\n正文里的分隔线不能当 frontmatter。')
  assert.ok(!body.includes('name: study-coach'))
  assert.ok(!body.startsWith('\n'))

  // 没有 frontmatter 时原样返回，不误吞正文
  const plain = '# 只有正文\n\n---\n分隔线\n'
  assert.deepEqual(parseFrontmatter(plain), { data: {}, body: plain })

  // 非 key: value 行跳过，不让坏行吞掉后面的合法字段
  const messy = '---\n: 没有键\nname: 有效\n---\n正文'
  assert.equal(parseFrontmatter(messy).data.name, '有效')
})

// ── 读取项目与主题 ────────────────────────────────────────────────────────

test('snapshot 从 cwd 读取轻项目：主题、题库、闪卡、考点、默认设置', async () => {
  const root = makeProject()
  const service = makeService({ cwd: root, home: mkTemp('home') })
  const filesBefore = listFiles(root)

  const snap = await service.snapshot()

  assertSamePath(snap.project.root, root)
  assert.equal(snap.project.source, 'cwd')
  assert.equal(snap.project.legacy, false)
  assert.deepEqual(
    snap.themes.map((theme) => [theme.slug, theme.title, theme.questionCount, theme.cardCount]),
    [
      ['alpha', 'Alpha 主题', 2, 1],
      ['beta', 'Beta 主题', 1, 2],
    ],
  )
  assert.equal(snap.theme, 'alpha')
  assert.deepEqual(snap.data.questions.map((q) => q.id), ['a-q1', 'a-q2'])
  assert.deepEqual(snap.data.flashcards.map((f) => f.id), ['a-f1'])
  assert.deepEqual(snap.data.theme.examPoints, { 'EP-01': '变量与作用域', 'EP-02': '函数' })
  assert.deepEqual(snap.data.theme.examDays, { 'EP-01': 'D1', 'EP-02': 'D2' })
  assert.deepEqual(snap.settings, { extOn: true, autoAdvance: true, dailyNewCards: 20, lang: 'zh' })
  assert.deepEqual(snap.warnings, [])

  // snapshot 是纯读：不得创建 progress.json，也不得派生写回任何文件
  assert.equal(readDiskProgress(root), null)
  assert.deepEqual(listFiles(root), filesBefore)
})

test('没有项目时 snapshot 返回合法空快照并给出提示', async () => {
  const service = makeService()
  const snap = await service.snapshot()

  assert.equal(snap.project.root, '')
  assert.equal(snap.project.source, 'none')
  assert.equal(snap.theme, null)
  assert.deepEqual(snap.themes, [])
  assert.deepEqual(snap.data.questions, [])
  assert.deepEqual(snap.data.flashcards, [])
  assert.deepEqual(snap.settings, { extOn: true, autoAdvance: true, dailyNewCards: 20, lang: 'zh' })
  assert.equal(snap.warnings.length, 1)
  assert.match(snap.warnings[0], /没有找到学习项目/)
  assert.equal(snap.progress.version, 1)
})

test('progress 里记的主题不存在时快照回退首个主题，但不改盘', async () => {
  const root = makeProject()
  fs.writeFileSync(
    path.join(root, 'progress.json'),
    JSON.stringify({ version: 1, answers: {}, theme: 'ghost', themeUpdatedAt: 123 }),
  )
  const service = makeService({ cwd: root })

  const snap = await service.snapshot()

  assert.equal(snap.theme, 'alpha')
  assert.equal(snap.progress.theme, 'alpha')
  assert.equal(readDiskProgress(root).theme, 'ghost')
})

// ── 手选项目（无 storageDomain 也要能用） ─────────────────────────────────

test('无 storage state 也可手选项目，并在同一 state 里记住', async () => {
  const root = makeProject()
  const state = {}
  const service = makeService({ state })

  const selected = await service.setProject({ root })
  assertSamePath(selected.project.root, root)
  assert.equal(selected.project.source, 'manual')
  assert.equal(selected.theme, 'alpha')
  assertSamePath(state.projectRoot, root)

  // 同一个 state 起新服务（模拟本次进程内的记住），cwd/home 都没有项目也能恢复
  const rememberedService = makeService({ state })
  const remembered = await rememberedService.snapshot()
  assertSamePath(remembered.project.root, root)
  assert.equal(remembered.project.source, 'remembered')
  assert.deepEqual(remembered.data.questions.map((q) => q.id), ['a-q1', 'a-q2'])

  // 手填路径两端空白要被容忍
  const trimmed = await service.setProject({ root: `  ${root}  ` })
  assertSamePath(trimmed.project.root, root)
})

test('setProject 拒绝非学习目录与空路径', async () => {
  const service = makeService()
  const notProject = mkTemp('not-project')
  fs.mkdirSync(path.join(notProject, 'src'))

  await assert.rejects(() => service.setProject({ root: notProject }), rejectsWith(/不像学习项目/))
  await assert.rejects(() => service.setProject({}), rejectsWith(/project\.set 需要 root/))
  await assert.rejects(
    () => service.setProject({ root: path.join(notProject, 'missing') }),
    rejectsWith(/不像学习项目/),
  )
  assert.equal((await service.snapshot()).project.root, '')
})

// ── 主题切换 + timestamp LWW ─────────────────────────────────────────────

test('切换主题持久化，timestamp 严格递增且旧快照不覆盖新主题', async () => {
  const root = makeProject()
  const service = makeService({ cwd: root })

  const beta = await service.setTheme({ theme: 'beta' })
  assert.equal(beta.theme, 'beta')
  assert.deepEqual(beta.data.questions.map((q) => q.id), ['b-q1'])
  const disk1 = readDiskProgress(root)
  assert.equal(disk1.theme, 'beta')
  assert.ok(Number.isFinite(disk1.themeUpdatedAt))

  const alpha = await service.setTheme({ theme: 'alpha' })
  assert.equal(alpha.theme, 'alpha')
  const disk2 = readDiskProgress(root)
  assert.equal(disk2.theme, 'alpha')
  assert.ok(disk2.themeUpdatedAt > disk1.themeUpdatedAt, '同一毫秒内也要严格递增')

  // 旧客户端快照（更早的 themeUpdatedAt）不能把当前主题改回去
  const stale = await service.saveProgress({
    progress: { version: 1, answers: {}, theme: 'beta', themeUpdatedAt: 1 },
  })
  assert.equal(stale.progress.theme, 'alpha')
  assert.equal(readDiskProgress(root).theme, 'alpha')

  // 明确更新的 timestamp 才能赢
  const future = Date.now() + 60_000
  const newer = await service.saveProgress({
    progress: { version: 1, answers: {}, theme: 'beta', themeUpdatedAt: future },
  })
  assert.equal(newer.progress.theme, 'beta')
  assert.equal(readDiskProgress(root).theme, 'beta')

  await assert.rejects(() => service.setTheme({ theme: 'ghost' }), rejectsWith(/主题不存在/))
  await assert.rejects(() => service.setTheme({}), rejectsWith(/theme\.set 需要 theme/))
  assert.equal(readDiskProgress(root).theme, 'beta')

  // 新服务（只靠 remembered root）从盘上恢复主题
  const fresh = makeService({ state: { projectRoot: root } })
  assert.equal((await fresh.snapshot()).theme, 'beta')
})

// ── 设置 patch + timestamp LWW ───────────────────────────────────────────

test('设置 patch 持久化，timestamp 严格递增且旧快照不覆盖', async () => {
  const root = makeProject()
  const service = makeService({ cwd: root })

  const first = await service.setSettings({ patch: { dailyNewCards: 7, extOn: false } })
  assert.deepEqual(first.settings, { extOn: false, autoAdvance: true, dailyNewCards: 7, lang: 'zh' })
  const disk1 = readDiskProgress(root)
  assert.deepEqual(disk1.settings, first.settings)
  assert.ok(Number.isFinite(disk1.settingsUpdatedAt))

  // 旧 settings 快照整块 LWW，不能覆盖刚写入的设置
  const stale = await service.saveProgress({
    progress: {
      version: 1,
      answers: {},
      settings: { extOn: true, autoAdvance: true, dailyNewCards: 999, lang: 'zh' },
      settingsUpdatedAt: 1,
    },
  })
  assert.equal(stale.progress.settings.dailyNewCards, 7)
  assert.equal(stale.progress.settings.extOn, false)

  // 切语言同时写 settings 与顶层 lang，两个时间戳都要前进
  const second = await service.setSettings({ patch: { lang: 'en' } })
  assert.equal(second.settings.lang, 'en')
  const disk2 = readDiskProgress(root)
  assert.equal(disk2.lang, 'en')
  assert.ok(disk2.settingsUpdatedAt > disk1.settingsUpdatedAt)
  assert.ok(Number.isFinite(disk2.langUpdatedAt))
  assert.equal((await service.snapshot()).settings.lang, 'en')

  const fresh = makeService({ state: { projectRoot: root } })
  assert.equal((await fresh.snapshot()).settings.lang, 'en')

  // 非法设置值逐项拒绝，且一次失败都不能改盘
  const file = path.join(root, 'progress.json')
  const before = fs.readFileSync(file, 'utf8')
  const invalid = [
    [{ bogus: 1 }, /设置值无效：bogus/],
    [{ dailyNewCards: -1 }, /设置值无效：dailyNewCards/],
    [{ dailyNewCards: 1.5 }, /设置值无效：dailyNewCards/],
    [{ dailyNewCards: 1001 }, /设置值无效：dailyNewCards/],
    [{ lang: 'fr' }, /设置值无效：lang/],
    [{ extOn: 'yes' }, /设置值无效：extOn/],
  ]
  for (const [patchValue, pattern] of invalid) {
    await assert.rejects(() => service.setSettings({ patch: patchValue }), rejectsWith(pattern))
  }
  await assert.rejects(() => service.setSettings({}), rejectsWith(/settings\.set 需要 patch 对象/))
  await assert.rejects(() => service.setSettings({ patch: null }), rejectsWith(/settings\.set 需要 patch 对象/))
  assert.equal(fs.readFileSync(file, 'utf8'), before)
})

// ── 答题保存（read-merge-write） ──────────────────────────────────────────

test('两次保存答案按 read-merge-write 合并，不丢前一次', async () => {
  const root = makeProject()
  const service = makeService({ cwd: root })

  const first = await service.saveProgress({
    progress: {
      version: 1,
      answers: { 'a-q1': { correct: true, submittedAt: 1000 } },
      read: { 'a-q1': 1000 },
    },
  })
  assert.equal(first.progress.answers['a-q1'].correct, true)
  assert.equal(first.progress.read['a-q1'], 1000)

  // 第二次请求只带新答案，第一次的答案不能被覆盖丢失
  const second = await service.saveProgress({
    progress: {
      version: 1,
      answers: { 'a-q2': { correct: false, submittedAt: 2000 } },
      read: { 'a-q2': 2000 },
    },
  })
  assert.deepEqual(Object.keys(second.progress.answers).sort(), ['a-q1', 'a-q2'])
  assert.deepEqual(Object.keys(second.progress.read).sort(), ['a-q1', 'a-q2'])
  const disk = readDiskProgress(root)
  assert.deepEqual(Object.keys(disk.answers).sort(), ['a-q1', 'a-q2'])
  assert.equal(disk.read['a-q1'], 1000)

  // 同一题旧记录不覆盖新记录，新记录才更新
  const stale = await service.saveProgress({
    progress: {
      version: 1,
      answers: { 'a-q1': { correct: false, submittedAt: 500 } },
    },
  })
  assert.equal(stale.progress.answers['a-q1'].correct, true)
  const fresh = await service.saveProgress({
    progress: {
      version: 1,
      answers: { 'a-q1': { correct: false, submittedAt: 3000 } },
    },
  })
  assert.equal(fresh.progress.answers['a-q1'].correct, false)
  assert.equal(readDiskProgress(root).answers['a-q1'].submittedAt, 3000)
  assert.equal(readDiskProgress(root).answers['a-q2'].correct, false)
})

test('非法 progress payload 被拒绝且不落盘', async () => {
  const root = makeProject()
  const service = makeService({ cwd: root })

  const cases = [
    [{}, /progress\.save 需要 progress 对象/],
    [{ progress: null }, /progress\.save 需要 progress 对象/],
    [{ progress: { version: 2, answers: {} } }, /invalid progress payload/],
    [{ progress: { version: 1, answers: [] } }, /invalid progress payload/],
    [{ progress: { version: 1, answers: null } }, /invalid progress payload/],
    [{ progress: { version: 1, answers: {} }, root: path.join(root, 'other') }, /项目已切换/],
  ]
  for (const [payload, pattern] of cases) {
    await assert.rejects(() => service.saveProgress(payload), rejectsWith(pattern))
  }

  assert.equal(fs.existsSync(path.join(root, 'progress.json')), false)
})

test('没有选中项目时写操作一律拒绝', async () => {
  const service = makeService()

  await assert.rejects(
    () => service.saveProgress({ progress: { version: 1, answers: {} } }),
    rejectsWith(/还没有选中学习项目/),
  )
  await assert.rejects(() => service.setTheme({ theme: 'alpha' }), rejectsWith(/还没有选中学习项目/))
  await assert.rejects(
    () => service.setSettings({ patch: { dailyNewCards: 3 } }),
    rejectsWith(/还没有选中学习项目/),
  )
})
