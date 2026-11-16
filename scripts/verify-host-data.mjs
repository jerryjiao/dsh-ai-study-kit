#!/usr/bin/env node
/**
 * 宿主数据层对拍验证（task: host-data）。
 *
 * 两组断言：
 *  A. 等价性对拍：直接 import 老构建期真源 `kit/apps/quiz-app/scripts/lib/*.mjs`，按 sync-examples.mjs
 *     的调用方式算出 kit/examples/dev-intro 的 theme.json / coverage.json 派生结果，
 *     与 src/host/study/content.js 的 readThemeData 输出逐字段 deepStrictEqual。
 *     （coverage 的 generatedAt 是现算时间戳，两侧都剔除后比较，另断言两侧都是合法 ISO 串。）
 *  B. 进度持久化：os.tmpdir() 造临时项目根（拷 examples/dev-intro + 空 study/），
 *     readProgress → applyAnswer → writeProgress → 再读，验证 read-merge-write / 原子写 / 墓碑 /
 *     LWW / 坏文件回退 / 形状非法抛错。
 *
 * 跑法：node scripts/verify-host-data.mjs   （退出码 0 = 全过，1 = 有差异）
 */

import { deepStrictEqual, ok, throws } from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '..');
const KIT = join(REPO, 'kit');
const LIB = join(KIT, 'apps', 'quiz-app', 'scripts', 'lib');
const EXAMPLE_DIR = join(KIT, 'examples', 'dev-intro');
const THEME = 'dev-intro';

// §A 用到的临时 home：<home>/study-kit/examples/dev-intro，用来断言 home 兜底探测
const tmpHomeRoot = mkdtempSync(join(tmpdir(), 'study-kit-home-'));
const tmpHome = join(tmpHomeRoot, 'home');
const tmpHomeStudyKit = join(tmpHome, 'study-kit');
mkdirSync(join(tmpHomeStudyKit, 'examples'), { recursive: true });
cpSync(EXAMPLE_DIR, join(tmpHomeStudyKit, 'examples', THEME), { recursive: true });

// ── 老真源（按 sync-examples.mjs 的 import 面引入，不复制代码） ────────────
const { epNameMap, epDayMap } = await import(join(LIB, 'mastery.mjs'));
const { buildPanorama } = await import(join(LIB, 'panorama.mjs'));
const { buildCoverageSnapshot, readSessionRecords, lessonsReadState } = await import(join(LIB, 'coverage.mjs'));
const { mergeOralAttempts, readOralAttempts, oralAttemptsFromProgress } = await import(join(LIB, 'oral.mjs'));

// ── 被测模块 ──────────────────────────────────────────────────────────────
const { readThemeData, listThemes, isSafeThemeSlug } = await import(
  join(REPO, 'src', 'host', 'study', 'content.js')
);
const { readProgress, readProgressState, mergeProgress, writeProgress, applyAnswer, emptyProgress } =
  await import(join(REPO, 'src', 'host', 'study', 'progress.js'));
const { emptyThemeData } = await import(join(REPO, 'src', 'shared', 'contract.js'));
const { isStudyProject, detectProject } = await import(join(REPO, 'src', 'host', 'study', 'project.js'));

// ── 断言收集 ──────────────────────────────────────────────────────────────
const failures = [];
let checks = 0;
function check(name, fn) {
  checks++;
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failures.push({ name, err });
    console.log(`  ✗ ${name}`);
    console.log(String(err.message || err).split('\n').map((l) => `      ${l}`).join('\n'));
  }
}

const readJson = (p) => JSON.parse(readFileSync(p, 'utf-8'));
const stripGeneratedAt = (cov) => {
  const { generatedAt, ...rest } = cov;
  return rest;
};

// ══ A. 等价性对拍 ════════════════════════════════════════════════════════
console.log(`\n[A] 等价性对拍：${EXAMPLE_DIR}`);

// —— 老链路（sync-examples.mjs:79-95 / 141-180） ——
const missionText = existsSync(join(EXAMPLE_DIR, 'MISSION.md')) ? readFileSync(join(EXAMPLE_DIR, 'MISSION.md'), 'utf-8') : '';
const oldExamPoints = epNameMap(missionText);
const oldExamDays = epDayMap(missionText);
const oldTheme = { theme: THEME, examPoints: oldExamPoints, examDays: oldExamDays };

const oldQuestions = readJson(join(EXAMPLE_DIR, 'questions.json'));
const oldFlashcards = existsSync(join(EXAMPLE_DIR, 'flashcards.json')) ? readJson(join(EXAMPLE_DIR, 'flashcards.json')) : [];
const oldProgressPath = join(KIT, 'apps', 'quiz-app', 'progress.json');
let oldProgress = null;
if (existsSync(oldProgressPath)) {
  try {
    oldProgress = readJson(oldProgressPath);
  } catch {
    oldProgress = null;
  }
}
const oldCoverage = {
  theme: THEME,
  ...buildCoverageSnapshot(
    buildPanorama({
      questions: oldQuestions,
      answers: (oldProgress && oldProgress.answers) || {},
      srs: (oldProgress && oldProgress.srs) || {},
      flashcards: oldFlashcards,
      epNames: oldExamPoints,
      epDays: oldExamDays,
      records: readSessionRecords(EXAMPLE_DIR),
      oralAttempts: mergeOralAttempts(readOralAttempts(EXAMPLE_DIR), oralAttemptsFromProgress(oldProgress, THEME)),
      coursesRead: lessonsReadState(EXAMPLE_DIR, THEME, oldProgress),
    }),
    null, // 无 KNOWFLOW_GRAPH_JSON → 快照不带 graph 键
  ),
};

// —— 新链路 ——
const data = readThemeData(KIT, THEME);
const dataFromRepoRoot = readThemeData(REPO, THEME); // 仓库根 → 收敛到 kit/（legacy 探测）

check(`theme 与老 theme.json 逐字段一致（${JSON.stringify(oldTheme)}）`, () => {
  deepStrictEqual(data.theme, oldTheme);
});
check(`coverage 与老 coverage.json 一致（剔除现算 generatedAt）`, () => {
  deepStrictEqual(stripGeneratedAt(data.coverage), stripGeneratedAt(oldCoverage));
});
check('coverage.generatedAt 是合法 ISO 时间戳（两侧同形，仅时间不同）', () => {
  ok(!Number.isNaN(Date.parse(data.coverage.generatedAt)) && data.coverage.generatedAt.endsWith('Z'));
  ok(!Number.isNaN(Date.parse(oldCoverage.generatedAt)) && oldCoverage.generatedAt.endsWith('Z'));
});
check('从仓库根调用与从 kit/ 调用结果一致（旧布局自动探测）', () => {
  deepStrictEqual(stripGeneratedAt(dataFromRepoRoot.coverage), stripGeneratedAt(data.coverage));
  deepStrictEqual(dataFromRepoRoot.theme, data.theme);
});
check('直读的 questions/flashcards/plan/themeConfig 与源文件一致', () => {
  deepStrictEqual(data.questions, oldQuestions);
  deepStrictEqual(data.flashcards, oldFlashcards);
  deepStrictEqual(data.plan, { units: [] }); // dev-intro 无 plan.json → 空计划回退
  deepStrictEqual(data.themeConfig, readJson(join(EXAMPLE_DIR, 'theme-config.json')));
  ok(!('theme' in data.plan) && !('coverage' in data.themeConfig));
});
check('listThemes(kit) 命中 dev-intro（title 回退 slug，计数来自 JSON 数组长度）', () => {
  deepStrictEqual(listThemes(KIT), [
    { slug: 'dev-intro', title: 'dev-intro', questionCount: oldQuestions.length, cardCount: oldFlashcards.length },
  ]);
});
check('主题 slug 防路径逃逸：非法 slug 一律返回 emptyThemeData()，不读 examples/ 之外', () => {
  const empty = emptyThemeData();
  const bad = [
    '..',
    '../kit/examples/dev-intro',
    '../../package.json',
    'dev-intro/../../etc',
    '/etc/passwd',
    'a/b',
    'dev-intro\\..\\..',
    '',
    '  dev-intro',
    '.hidden',
    'dev:intro',
    'dev-intro\u0000',
  ];
  for (const slug of bad) {
    ok(isSafeThemeSlug(slug) === false, `slug=${JSON.stringify(slug)} 应判非法`);
    deepStrictEqual(readThemeData(KIT, slug), empty, `slug=${JSON.stringify(slug)} 应回退空主题数据`);
  }
  // 不存在的合法 slug：与 contract 的 emptyThemeData() 完全一致（lead 已统一空 coverage 形状）
  deepStrictEqual(readThemeData(KIT, 'no-such-theme'), empty);

  ok(isSafeThemeSlug(THEME) === true);
  ok(isSafeThemeSlug('my theme') === true, '内部空格是合法目录名');
  // 合法 slug 仍能读到真实数据（不是一刀切禁读）
  ok(readThemeData(KIT, THEME).questions.length === oldQuestions.length);
});

check('detectProject 顺序 remembered → cwd → home（remembered 优先级最高）', () => {
  ok(isStudyProject(KIT) === true);
  ok(isStudyProject(EXAMPLE_DIR) === false); // 主题包本身不是项目根
  // 1) remembered 最高：即使 cwd 与 home 都能命中有效项目，也必须取 remembered
  deepStrictEqual(detectProject({ remembered: KIT, cwd: tmpHomeStudyKit, home: tmpHome }), {
    root: KIT,
    source: 'remembered',
    legacy: false,
  });
  // 2) remembered 无效时 cwd 优先于 home（cwd=仓库根 → 识别旧布局 kit/，legacy:true）
  deepStrictEqual(detectProject({ remembered: '/nonexistent-remembered', cwd: REPO, home: tmpHome }), {
    root: KIT,
    source: 'cwd',
    legacy: true,
  });
  // 3) cwd 也没有时用 <home>/study-kit
  deepStrictEqual(detectProject({ remembered: '', cwd: '/nonexistent-cwd', home: tmpHome }), {
    root: tmpHomeStudyKit,
    source: 'home',
    legacy: false,
  });
  // 4) 全不命中：空项目（不抛错）
  deepStrictEqual(detectProject({ remembered: '', cwd: '/nonexistent-cwd', home: '/nonexistent-home' }), {
    root: '',
    source: 'none',
    legacy: false,
  });
});

// 字段覆盖面（打印给人看，确认比对了哪些字段）
const covKeys = Object.keys(stripGeneratedAt(oldCoverage));
console.log(
  `  · 覆盖字段：theme{${Object.keys(oldTheme).join(',')}} · coverage{${covKeys.join(',')}}` +
    ` · points=${oldCoverage.points.length} · 考点名 ${Object.keys(oldExamPoints).length} 个 · day 分组 ${Object.keys(oldExamDays).length} 个`,
);

rmSync(tmpHomeRoot, { recursive: true, force: true });

// ══ B. 临时项目根：进度读写 ══════════════════════════════════════════════
console.log('\n[B] 临时项目根：progress 读-合并-写');

const tmpRoot = mkdtempSync(join(tmpdir(), 'study-kit-verify-'));
let tmpProject = join(tmpRoot, 'project');
mkdirSync(join(tmpProject, 'examples'), { recursive: true });
cpSync(EXAMPLE_DIR, join(tmpProject, 'examples', THEME), { recursive: true });
mkdirSync(join(tmpProject, 'study'), { recursive: true });
console.log(`  · 临时项目根：${tmpProject}`);

try {
  check('readProgress 缺失文件 → {version:1,answers:{},read:{}}', () => {
    deepStrictEqual(readProgress(tmpProject), { version: 1, answers: {}, read: {} });
  });

  const rec1 = { correct: true, submittedAt: 1000, streak: 1 };
  const afterApply = applyAnswer(readProgress(tmpProject), 'q-1', rec1);
  const written = writeProgress(tmpProject, afterApply);

  check('writeProgress 落盘并返回合并后完整 Progress', () => {
    deepStrictEqual(written.answers['q-1'], rec1);
    // srsMeta 等可选字段为 undefined 时 JSON.stringify 会丢键（老 server 同款），故按落盘形态比对
    deepStrictEqual(readProgress(tmpProject), JSON.parse(JSON.stringify(written)));
    ok(existsSync(join(tmpProject, 'progress.json')));
    ok(!existsSync(join(tmpProject, 'progress.json.tmp')), 'tmp 文件应已被 rename 掉');
  });

  check('再读（磁盘 → 内存）与写入结果一致，且 version/read 字段齐备', () => {
    const back = readProgress(tmpProject);
    deepStrictEqual(back.version, 1);
    deepStrictEqual(back.answers, { 'q-1': rec1 });
    deepStrictEqual(back.read, {});
  });

  check('read-merge-write：只提交 q-2 不会冲掉盘上的 q-1', () => {
    const incoming = { version: 1, answers: { 'q-2': { correct: false, submittedAt: 2000, streak: 0 } } };
    const merged = writeProgress(tmpProject, incoming);
    deepStrictEqual(Object.keys(merged.answers).sort(), ['q-1', 'q-2']);
    deepStrictEqual(merged.answers['q-1'], rec1);
    deepStrictEqual(readProgress(tmpProject).answers['q-2'], { correct: false, submittedAt: 2000, streak: 0 });
  });

  check('墓碑参与定序：deletedAt 更新的记录胜出（重做本题集语义）', () => {
    const merged = writeProgress(tmpProject, {
      version: 1,
      answers: { 'q-1': { ...rec1, deletedAt: 3000 } },
    });
    deepStrictEqual(merged.answers['q-1'].deletedAt, 3000);
  });

  check('settings LWW：settingsUpdatedAt 较大者整块胜出', () => {
    const local = { version: 1, answers: {}, settings: { dailyNewCards: 5 }, settingsUpdatedAt: 10 };
    const remote = { version: 1, answers: {}, settings: { dailyNewCards: 99 }, settingsUpdatedAt: 20 };
    deepStrictEqual(mergeProgress(local, remote).settings, { dailyNewCards: 99 });
    deepStrictEqual(mergeProgress(local, remote).settingsUpdatedAt, 20);
    // 相等取 local（与老 >= 逻辑一致）
    deepStrictEqual(mergeProgress(local, { ...remote, settingsUpdatedAt: 10 }).settings, { dailyNewCards: 5 });
  });

  check('coursesRead / read 每 key 取 max；oralAttempts 四元组去重升序', () => {
    const local = {
      version: 1,
      answers: {},
      read: { a: 1 },
      coursesRead: { [`${THEME}/git-basics.html`]: 100 },
      oralAttempts: [{ target: 'EP-01 暂存区', correct: true, at: 5 }],
    };
    const remote = {
      version: 1,
      answers: {},
      read: { a: 3 },
      coursesRead: { [`${THEME}/git-basics.html`]: 50 },
      oralAttempts: [
        { target: 'EP-01 暂存区', correct: true, at: 5 },
        { target: 'EP-02 revert', correct: false, at: 9 },
      ],
    };
    const m = mergeProgress(local, remote);
    deepStrictEqual(m.read, { a: 3 });
    deepStrictEqual(m.coursesRead, { [`${THEME}/git-basics.html`]: 100 });
    deepStrictEqual(m.oralAttempts.map((x) => x.at), [5, 9]);
    deepStrictEqual(m.answers, {});
    deepStrictEqual(m.readTombstones, {});
    deepStrictEqual(m.coursesReadTombstones, {});
    deepStrictEqual(m.srs, {});
  });

  check('坏 JSON / 形状非法 → 空进度回退；incoming 非法 → 抛 invalid progress payload', () => {
    writeFileSync(join(tmpProject, 'progress.json'), '{ this is not json', 'utf-8');
    deepStrictEqual(readProgress(tmpProject), emptyProgress());
    writeFileSync(join(tmpProject, 'progress.json'), JSON.stringify({ version: 2, answers: {} }), 'utf-8');
    deepStrictEqual(readProgress(tmpProject), emptyProgress());
    throws(() => writeProgress(tmpProject, { version: 2, answers: {} }), /invalid progress payload/);
    throws(() => writeProgress(tmpProject, null), /invalid progress payload/);
  });

  check('损坏的 progress.json：读降级但写拒绝覆盖，文件字节原样保留', () => {
    const file = join(tmpProject, 'progress.json');
    const garbage = '{ "version": 1, "answers": { broken';
    writeFileSync(file, garbage, 'utf-8');
    const state = readProgressState(tmpProject);
    ok(state.ok === false && state.status === 'corrupt', `状态应为 corrupt，实际 ${state.status}`);
    deepStrictEqual(readProgress(tmpProject), emptyProgress());

    // 页面此时读到的空进度若被 applyAnswer 后写回，就会静默清空历史——必须拒写
    const next = applyAnswer(readProgress(tmpProject), 'q-3', { correct: true, submittedAt: 1, streak: 1 });
    let caught;
    try {
      writeProgress(tmpProject, next);
    } catch (err) {
      caught = err;
    }
    ok(caught, '坏文件写入必须抛错');
    ok(caught.code === 'EPROGRESS_CORRUPT', `错误码应为 EPROGRESS_CORRUPT，实际 ${caught.code}`);
    ok(caught.status === 'corrupt');
    ok(readFileSync(file, 'utf-8') === garbage, '损坏文件必须逐字节保留，不能被空进度覆盖');
    ok(!existsSync(`${file}.tmp`), '拒绝时不应留下 tmp 文件');
  });

  check('形状非法的 progress.json 同样拒写；用户修好后可继续保存', () => {
    const file = join(tmpProject, 'progress.json');
    writeFileSync(file, JSON.stringify({ version: 2, answers: {} }), 'utf-8');
    const state = readProgressState(tmpProject);
    ok(state.ok === false && state.status === 'invalid-shape');
    let caught;
    try {
      writeProgress(tmpProject, { version: 1, answers: {} });
    } catch (err) {
      caught = err;
    }
    ok(caught?.code === 'EPROGRESS_CORRUPT');
    ok(caught?.status === 'invalid-shape');
    deepStrictEqual(JSON.parse(readFileSync(file, 'utf-8')), { version: 2, answers: {} });

    // 恢复路径：用户修复/覆盖成合法进度后，保存恢复正常（且 read-merge-write 仍生效）
    writeFileSync(file, JSON.stringify({ version: 1, answers: {}, read: {} }), 'utf-8');
    ok(readProgressState(tmpProject).status === 'ok');
    const q9 = { correct: true, submittedAt: 42, streak: 1 };
    const recovered = writeProgress(tmpProject, { version: 1, answers: { 'q-9': q9 } });
    deepStrictEqual(recovered.answers['q-9'], q9);
    deepStrictEqual(readProgress(tmpProject).answers['q-9'], q9);
  });

  check('临时项目根里 readThemeData 仍然可用（study/ 空目录不干扰派生）', () => {
    const tmpData = readThemeData(tmpProject, THEME);
    deepStrictEqual(tmpData.theme, oldTheme);
    deepStrictEqual(stripGeneratedAt(tmpData.coverage), stripGeneratedAt(oldCoverage));
  });

  check('临时项目根可被 isStudyProject / detectProject 识别（cwd 命中）', () => {
    ok(isStudyProject(tmpProject) === true);
    deepStrictEqual(detectProject({ remembered: '', cwd: tmpProject, home: '/nonexistent-home' }), {
      root: tmpProject,
      source: 'cwd',
      legacy: false,
    });
  });
} finally {
  rmSync(tmpRoot, { recursive: true, force: true });
}

// ══ 结论 ════════════════════════════════════════════════════════════════
console.log('');
if (failures.length === 0) {
  console.log(`OK — ${checks} 项断言全部通过（theme/coverage 对拍 deepStrictEqual 通过，进度 read-merge-write 通过）`);
  process.exit(0);
} else {
  console.log(`FAIL — ${failures.length}/${checks} 项断言失败：`);
  for (const { name, err } of failures) {
    console.log(`\n▸ ${name}`);
    console.log(String(err.stack || err).split('\n').slice(0, 40).join('\n'));
  }
  process.exit(1);
}
