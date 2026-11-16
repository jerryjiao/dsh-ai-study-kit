/**
 * 主题内容读取 + 派生（Host 半，纯 node 内置模块，零第三方依赖）。
 *
 * 数据源：`<项目根>/examples/<slug>/` 下的源文件（ADR 0002：页面直读 examples，不走构建产物）。
 *   questions.json / flashcards.json / plan.json / theme-config.json / MISSION.md / lessons/ / study/records/
 *
 * 派生（ADR 0002：现算，**绝不落盘**——不写 theme.json、不写 coverage.json）：
 *   theme    = { theme, examPoints, examDays }，等价老 `kit/apps/quiz-app/src/data/theme.json`
 *              （sync-examples.mjs 用 epNameMap/epDayMap 解析 MISSION.md 排布表）
 *   coverage = { theme, ...buildCoverageSnapshot(buildPanorama(...)) }，等价老
 *              `kit/apps/quiz-app/src/data/coverage.json`（含 generatedAt，内存派生不可避免带时间戳）
 *
 * ⚠️ 本文件里的判据函数是 `kit/apps/quiz-app/scripts/lib/*.mjs` 的**镜像实现**：
 * 用户机器上没有 kit/ 工具链（插件 files 里虽然有 kit 快照，但那是开发者工具，不能当运行时依赖），
 * 所以这里重写一份纯 JS。算法若改动，两边必须同步（ADR 0002 的「互为镜像」代价）。
 * 镜像来源逐个标注在函数注释里。
 *
 * 布局兼容（ADR 0003 迁移期）：
 *   学习记录优先读 `<项目根>/study/records/`（轻结构），缺失时回退 `<主题目录>/study/records/`
 *   （旧 kit 形态，references/state.md §196）。两者不同时读，避免迁移期重复计数。
 *   口头流水同款：先找主题包内 `study/records/oral-attempts.json`，再找项目根同路径。
 *
 * 空回退口径：主题目录不存在 → 直接返回 contract 的 `emptyThemeData()`（含 contract 里那份
 * 简化 coverage `{version,examPoints,counts}`）；主题目录存在但文件缺失/损坏 → 各字段按空值回退，
 * coverage 仍是真实的快照形状（points:[]）。
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

import { emptyThemeData } from '../../shared/contract.js';
import { findStudyRoot } from './project.js';
import { readProgress } from './progress.js';

// ── 文件读取小工具（坏文件不让整条链路炸） ────────────────────────────────

function isDir(p) {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function readText(file) {
  try {
    return readFileSync(file, 'utf-8');
  } catch {
    return '';
  }
}

/**
 * 读 JSON。文件不存在 → fallback（静默：可选文件缺失是正常状态）；
 * 文件存在但损坏 → fallback + console.warn（能修，应该提示）。
 */
function readJson(file, fallback, label = file) {
  if (!existsSync(file)) return fallback;
  try {
    return JSON.parse(readFileSync(file, 'utf-8'));
  } catch (err) {
    console.warn(`[study/content] 坏 JSON，按空值回退: ${label} (${err.message})`);
    return fallback;
  }
}

/** 读成数组：不是数组（含 null/对象）一律 []。 */
function readJsonArray(file) {
  const v = readJson(file, []);
  return Array.isArray(v) ? v : [];
}

/** 读成普通对象（非数组）：不是对象一律 {}。 */
function readJsonObject(file, label) {
  const v = readJson(file, {}, label);
  return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
}

// ── 主题 slug 安全校验 ────────────────────────────────────────────────────

/**
 * 主题 slug 校验：只接受**单层目录名**。
 *
 * slug 来自页面/RPC（theme.set 的入参、用户手填路径的最后一段），会直接 join 进
 * `<项目根>/examples/<slug>`。不校验的话 `../..` 就能把读路径带出 examples/（路径逃逸），
 * 甚至读到项目根外面的文件。这里按「白名单精神」拒绝所有可疑形态：
 *   - 空串 / 纯空白 / 前后带空白（避免拼出意外目录名）
 *   - `.`、`..`
 *   - 含 `/` 或 `\`（多级路径）
 *   - 含 NUL/控制字符
 *   - 含 `:`（Windows 盘符 / NTFS 备用数据流）
 *   - 以 `.` 开头（隐藏目录；examples/ 下的点目录一律视为非主题）
 *
 * @param {string} slug
 * @returns {boolean}
 */
export function isSafeThemeSlug(slug) {
  if (typeof slug !== 'string') return false;
  if (!slug || slug !== slug.trim()) return false;
  if (slug === '.' || slug === '..') return false;
  if (/[/\\]/.test(slug)) return false; // eslint-disable-line no-useless-escape
  if (/[\u0000-\u001f\u007f]/.test(slug)) return false;
  if (slug.includes(':')) return false;
  if (slug.startsWith('.')) return false;
  return true;
}

// ── 掌握度判据（镜像 scripts/lib/mastery.mjs） ────────────────────────────

/** 错题毕业阈值：与 progress.ts streakToPass 一致。 */
function streakToPass(wrongCount) {
  if (wrongCount <= 1) return 1;
  if (wrongCount === 2) return 2;
  return 3;
}

/** 是否仍是未毕业错题。 */
function isOpenWrong(r) {
  if (!r || r.streak === undefined) return false;
  return r.streak < streakToPass(r.wrongCount ?? 1);
}

/** MISSION.md 排布表第 2 列 → EP-NN 考点名（镜像 mastery.mjs epNameMap）。 */
function epNameMap(missionText) {
  const map = {};
  if (!missionText) return map;
  for (const m of missionText.matchAll(/^\|\s*(EP-\d+)\s*\|\s*([^|]+?)\s*\|/gm)) {
    map[m[1]] = m[2].trim();
  }
  return map;
}

/** MISSION.md 排布表第 5 列 → EP-NN 学程块 day（镜像 mastery.mjs epDayMap）。 */
function epDayMap(missionText) {
  const map = {};
  if (!missionText) return map;
  for (const m of missionText.matchAll(/^\|\s*(EP-\d+)\s*\|[^|]*\|[^|]*\|[^|]*\|\s*([^|]*?)\s*\|/gm)) {
    const day = m[2].trim();
    if (day && !/^[—\-–~]+$/.test(day)) map[m[1]] = day;
  }
  return map;
}

/** 闪卡毕业：有 SRS 记录、无墓碑、进入 review 阶段。 */
function isFlashGraduated(s) {
  return !!s && s.deletedAt === undefined && s.phase === 'review';
}

function oralStatusOf(oralByEp, ep) {
  if (!oralByEp) return undefined;
  const v = typeof oralByEp.get === 'function' ? oralByEp.get(ep) : oralByEp[ep];
  return v === 'untouched' ? undefined : v ?? undefined;
}

function countNeutral(ids, answers) {
  let n = 0;
  for (const id of ids) {
    const r = answers[id];
    if (r && r.deletedAt === undefined && !r.fromRandom && r.correct === null) n++;
  }
  return n;
}

/**
 * 按考点聚合掌握度（镜像 scripts/lib/mastery.mjs masteryByExamPoint，判据 v1.2）：
 * mastered = 题全对 + 无未毕业错题 + 超题证据（口述 mastered / 无口述数据 / 映射闪卡全毕业）；
 * weak = 未毕业错题 / 最近一次答错 / 口述 weak；inProgress 其余；untouched 一题未答。
 */
function masteryByExamPoint({ questions, answers = {}, epNames = {}, flashcards = [], srs = {}, oralByEp = null }) {
  const flashByEp = new Map();
  for (const f of flashcards) {
    if (!f.examPoint) continue;
    if (!flashByEp.has(f.examPoint)) flashByEp.set(f.examPoint, []);
    flashByEp.get(f.examPoint).push(f.id);
  }

  const groups = new Map();
  let untracked = 0;
  for (const q of questions) {
    const ep = q.examPoint;
    if (!ep) {
      untracked++;
      continue;
    }
    if (!groups.has(ep)) groups.set(ep, []);
    groups.get(ep).push(q.id);
  }

  const points = [];
  for (const [ep, ids] of groups) {
    let answered = 0;
    let correctNow = 0;
    const openWrongIds = [];
    for (const id of ids) {
      const r = answers[id];
      if (!r || r.deletedAt !== undefined || r.fromRandom) continue;
      answered++;
      if (r.correct === true) correctNow++;
      if (isOpenWrong(r)) openWrongIds.push(id);
    }
    const flashIds = flashByEp.get(ep) ?? [];
    const flashOpenIds = flashIds.filter((id) => !isFlashGraduated(srs[id]));
    const oral = oralStatusOf(oralByEp, ep);
    const oralData = oral !== undefined;
    const beyondOK = !oralData || oral === 'mastered' || (flashIds.length > 0 && flashOpenIds.length === 0);
    const hasNegative = openWrongIds.length > 0 || correctNow + countNeutral(ids, answers) < answered;
    let status;
    if (answered === 0 && oral !== 'weak') status = 'untouched';
    else if (hasNegative || oral === 'weak') status = 'weak';
    else if (answered === ids.length && correctNow === ids.length && beyondOK) status = 'mastered';
    else status = 'inProgress';
    points.push({
      ep,
      name: epNames[ep] || ep,
      questionIds: ids,
      total: ids.length,
      answered,
      correctNow,
      openWrongIds,
      flashMapped: flashIds.length,
      flashGraduated: flashIds.length - flashOpenIds.length,
      flashOpenIds,
      oralStatus: oralData ? oral : null,
      status,
    });
  }
  return { points, untracked };
}

// ── 口头答题流水（镜像 scripts/lib/oral.mjs） ─────────────────────────────

const ORAL_SOURCES = ['recall', 'recite', 'case'];
const ORAL_WEIGHTS = [0.5, 0.7, 0.85, 0.95, 1.0];
const ORAL_CAPS = { 1: 0.5, 2: 0.8 };
const ORAL_MASTER_AT = 0.85;
const ORAL_WEAK_BELOW = 0.5;

/** 宽容解析口头流水（坏 JSON → 空；残缺条目跳过）。 */
function parseOralAttempts(text) {
  const out = { attempts: [], skipped: 0 };
  if (!text) return out;
  let raw;
  try {
    raw = JSON.parse(text);
  } catch {
    return out;
  }
  if (!Array.isArray(raw)) return out;
  for (const e of raw) {
    if (!e || typeof e !== 'object') {
      out.skipped++;
      continue;
    }
    if (typeof e.target !== 'string' || !e.target.trim()) {
      out.skipped++;
      continue;
    }
    if (typeof e.correct !== 'boolean') {
      out.skipped++;
      continue;
    }
    if (typeof e.at !== 'number' || !Number.isFinite(e.at)) {
      out.skipped++;
      continue;
    }
    out.attempts.push({
      target: e.target.trim(),
      correct: e.correct,
      at: e.at,
      source: ORAL_SOURCES.includes(e.source) ? e.source : null,
    });
  }
  return out;
}

/** 合并流水：并集 + 四元组去重 + 按 at 升序。 */
function mergeOralAttempts(a = [], b = []) {
  const seen = new Set();
  const merged = [];
  for (const e of [...a, ...b]) {
    const key = `${e.target}\u0000${e.correct}\u0000${e.at}\u0000${e.source ?? ''}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(e);
  }
  return merged.sort((x, y) => x.at - y.at);
}

/** 目标解析：EP 前缀 → 图映射（本项目不接图）→ 裸考点名。 */
function resolveOralTarget(target, { epNames = {}, graphMap = null, graphNodes = null } = {}) {
  const raw = String(target ?? '').trim();
  const epm = raw.match(/^(EP-\d+)\b/);
  if (epm) {
    return { ep: epm[1], node: null, name: raw.slice(epm[1].length).trim() || epNames[epm[1]] || epm[1], via: 'ep', resolved: true };
  }
  if (graphMap) {
    const byNode = graphMap.byNode?.get(raw);
    if (byNode) return { ep: byNode.ep, node: byNode.node, name: byNode.label || raw, via: 'node', resolved: true };
    const byLabel = graphMap.byLabel?.get(raw);
    if (byLabel) return { ep: byLabel.ep, node: byLabel.node, name: raw, via: 'node', resolved: true };
  }
  if (graphNodes) {
    const byId = graphNodes.byId?.get(raw);
    if (byId) return { ep: null, node: byId.id, name: byId.label || raw, via: 'node', resolved: true };
    const byLabel = graphNodes.byLabel?.get(raw);
    if (byLabel) return { ep: null, node: byLabel.id, name: raw, via: 'node', resolved: true };
  }
  for (const [ep, name] of Object.entries(epNames)) {
    if (name === raw) return { ep, node: null, name: raw, via: 'name', resolved: true };
  }
  return { ep: null, node: null, name: raw, via: null, resolved: false };
}

/** 按目标聚合计数（每条只进一个桶）。 */
function aggregateOral(attempts = [], opts = {}) {
  const byEp = new Map();
  const byNode = new Map();
  const byName = new Map();
  const bump = (map, key, correct) => {
    const cur = map.get(key) ?? { asked: 0, correct: 0 };
    cur.asked += 1;
    if (correct) cur.correct += 1;
    map.set(key, cur);
  };
  for (const a of attempts) {
    const r = resolveOralTarget(a.target, opts);
    if (r.ep) bump(byEp, r.ep, a.correct);
    else if (r.node) bump(byNode, r.node, a.correct);
    else bump(byName, r.name, a.correct);
  }
  return { byEp, byNode, byName };
}

/** 口头四态（近期加权正确率 + 小样本封顶 + 负面优先）。 */
function oralMastery(attempts = []) {
  const sorted = [...attempts].sort((a, b) => a.at - b.at);
  const n = sorted.length;
  const correct = sorted.filter((a) => a.correct).length;
  if (n === 0) return { asked: 0, correct: 0, score: null, status: 'untouched' };
  const k = Math.min(ORAL_WEIGHTS.length, n);
  const recent = sorted.slice(-k);
  const weights = ORAL_WEIGHTS.slice(-k);
  const wSum = weights.reduce((s, w) => s + w, 0);
  let score = recent.reduce((s, a, i) => s + weights[i] * (a.correct ? 1 : 0), 0) / wSum;
  const cap = ORAL_CAPS[n];
  if (cap !== undefined) score = Math.min(score, cap);
  const status = !sorted[n - 1].correct || score < ORAL_WEAK_BELOW ? 'weak' : score >= ORAL_MASTER_AT ? 'mastered' : 'inProgress';
  return { asked: n, correct, score: Math.round(score * 1000) / 1000, status };
}

/** 按目标分组（保留时序，oralMastery 用）。 */
function groupOralAttempts(attempts = [], opts = {}) {
  const byEp = new Map();
  const byNode = new Map();
  const byName = new Map();
  for (const a of attempts) {
    const r = resolveOralTarget(a.target, opts);
    if (r.ep) {
      if (!byEp.has(r.ep)) byEp.set(r.ep, []);
      byEp.get(r.ep).push(a);
    } else if (r.node) {
      if (!byNode.has(r.node)) byNode.set(r.node, []);
      byNode.get(r.node).push(a);
    } else {
      if (!byName.has(r.name)) byName.set(r.name, []);
      byName.get(r.name).push(a);
    }
  }
  return { byEp, byNode, byName };
}

/** 从 progress.oralAttempts 取当前主题的回流副本（缺 theme 宽容视为当前主题）。 */
function oralAttemptsFromProgress(progress, theme) {
  if (!progress || !Array.isArray(progress.oralAttempts)) return [];
  const scoped = progress.oralAttempts.filter(
    (a) => a && typeof a === 'object' && (a.theme === undefined || a.theme === null || a.theme === theme),
  );
  return parseOralAttempts(JSON.stringify(scoped)).attempts;
}

// ─────────────────────────────────────────────────────────────────────────

// ── 学习记录（镜像 scripts/lib/records.mjs 的 parseSessionRecord） ────────

function splitEp(name) {
  const m = name.match(/^(EP-\d+)\s+(.+)$/);
  return m ? { ep: m[1], name: m[2] } : { ep: null, name };
}

/** 解析契约二学习记录（frontmatter + 已过考点 / 错的点 / 待办 / 口头题计数）。 */
function parseSessionRecord(text) {
  const out = { legacy: true, id: null, topic: null, mode: null, status: null, passed: [], wrongPoints: [], todos: [], oral: [] };
  if (!text) return out;

  let body = text;
  if (text.startsWith('---')) {
    const end = text.indexOf('\n---', 3);
    if (end !== -1) {
      const fmText = text.slice(3, end);
      body = text.slice(text.indexOf('\n', end + 1) + 1);
      out.legacy = false;
      for (const line of fmText.split('\n')) {
        const m = line.match(/^([a-zA-Z-]+)\s*:\s*(.*)$/);
        if (!m) continue;
        const val = m[2].trim().replace(/^["']|["']$/g, '');
        if (m[1] === 'id') out.id = /^-?\d+$/.test(val) ? Number(val) : val || null;
        else if (m[1] === 'topic') out.topic = val || null;
        else if (m[1] === 'mode') out.mode = val || null;
        else if (m[1] === 'status') out.status = val || null;
      }
    }
  }

  const sections = new Map();
  let current = null;
  for (const line of body.split('\n')) {
    const h = line.match(/^##\s+(.*)$/);
    if (h) {
      current = h[1].trim();
      if (!sections.has(current)) sections.set(current, []);
      continue;
    }
    if (current && line.trim()) sections.get(current).push(line);
  }

  for (const line of sections.get('已过考点') ?? []) {
    const m = line.match(/^[-*]\s*(.+)$/);
    if (!m) continue;
    const [rawName, rawGolden] = m[1].split(/·\s*金句[：:]/, 2);
    const { ep, name } = splitEp(rawName.trim());
    out.passed.push({ ep, name, golden: rawGolden ? rawGolden.trim().replace(/^[「"]|["」]$/g, '') || null : null });
  }

  for (const line of sections.get('错的点') ?? []) {
    const m = line.match(/^[-*]\s*(.+)$/);
    if (m) out.wrongPoints.push(m[1].trim());
  }

  for (const line of sections.get('待办') ?? []) {
    const m = line.match(/^[-*]\s*\[([ xX])\]\s*(.+)$/);
    if (m) out.todos.push({ text: m[2].trim(), done: m[1].toLowerCase() === 'x' });
  }

  for (const line of sections.get('口头题计数') ?? []) {
    const m = line.match(/^[-*]\s*(.+?)[：:]\s*问\s*(\d+)\s*对\s*(\d+)\s*$/);
    if (!m) continue;
    const { ep, name } = splitEp(m[1].trim());
    out.oral.push({ ep, name, asked: Number(m[2]), correct: Number(m[3]) });
  }

  return out;
}

// ── 全景聚合（镜像 scripts/lib/panorama.mjs） ─────────────────────────────

/** 全景：三信号（taught / practiced / mastered）按 day 分组。 */
function buildPanorama({
  questions,
  answers = {},
  srs = {},
  flashcards = [],
  epNames = {},
  epDays = {},
  records = [],
  oralAttempts = [],
  coursesRead = { lessonsTotal: 0, lessonsDone: 0 },
}) {
  const oralGroups = groupOralAttempts(oralAttempts, { epNames });
  const oralStatusByEp = new Map();
  for (const [ep, attempts] of oralGroups.byEp) oralStatusByEp.set(ep, oralMastery(attempts).status);

  const { points } = masteryByExamPoint({ questions, answers, epNames, flashcards, srs, oralByEp: oralStatusByEp });

  const taughtByEp = new Map();
  const recordHits = (entry) => {
    if (!entry) return [];
    const targets = new Set();
    if (entry.ep) targets.add(entry.ep);
    if (entry.name) {
      for (const [ep, name] of Object.entries(epNames)) {
        if (name === entry.name) targets.add(ep);
      }
    }
    return [...targets];
  };
  for (const rec of records || []) {
    for (const passed of rec.passed || []) {
      for (const ep of recordHits(passed) ?? []) taughtByEp.set(ep, true);
    }
  }

  const oralByEp = new Map();
  const bumpOral = (ep, asked, correct) => {
    const cur = oralByEp.get(ep) ?? { asked: 0, correct: 0 };
    cur.asked += asked;
    cur.correct += correct;
    oralByEp.set(ep, cur);
  };
  for (const rec of records || []) {
    for (const oral of rec.oral || []) {
      for (const ep of recordHits(oral) ?? []) bumpOral(ep, oral.asked, oral.correct);
    }
  }
  const ledgerOral = aggregateOral(oralAttempts, { epNames });
  for (const [ep, c] of ledgerOral.byEp) bumpOral(ep, c.asked, c.correct);

  const courseTaughtAll = coursesRead.lessonsTotal > 0 && coursesRead.lessonsDone === coursesRead.lessonsTotal;

  const dayOrder = [];
  for (const ep of points.map((p) => p.ep)) {
    const day = epDays[ep];
    if (day && !dayOrder.includes(day)) dayOrder.push(day);
  }
  dayOrder.sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', { numeric: true }));

  const groupMap = new Map();
  for (const p of points) {
    const day = epDays[p.ep] || '未排程';
    if (!groupMap.has(day)) groupMap.set(day, []);
    const oral = oralByEp.get(p.ep) ?? null;
    groupMap.get(day).push({
      ep: p.ep,
      name: p.name,
      taught: taughtByEp.has(p.ep) || courseTaughtAll,
      practiced: !!(p.answered > 0 || (oral && oral.asked > 0)),
      mastered: p.status === 'mastered',
      status: p.status,
      answered: p.answered,
      total: p.total,
      openWrong: p.openWrongIds.length,
      oral,
      oralStatus: p.oralStatus,
    });
  }

  const groupKeys = [...groupMap.keys()].sort((a, b) => {
    if (a === '未排程') return 1;
    if (b === '未排程') return -1;
    const ia = dayOrder.indexOf(a);
    const ib = dayOrder.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  const groups = groupKeys.map((day) => {
    const pts = groupMap.get(day);
    return {
      day,
      points: pts,
      summary: {
        total: pts.length,
        taught: pts.filter((x) => x.taught).length,
        practiced: pts.filter((x) => x.practiced).length,
        mastered: pts.filter((x) => x.mastered).length,
      },
    };
  });

  const all = groups.flatMap((g) => g.points);
  return {
    summary: {
      examPoints: all.length,
      taught: all.filter((x) => x.taught).length,
      practiced: all.filter((x) => x.practiced).length,
      mastered: all.filter((x) => x.mastered).length,
    },
    courseTaughtAll,
    groups,
  };
}

// ── 覆盖快照（镜像 scripts/lib/coverage.mjs） ─────────────────────────────

const POINT_KEYS = ['ep', 'taught', 'practiced', 'mastered', 'oral', 'oralStatus'];
const ORAL_KEYS = ['asked', 'correct'];
const ORAL_STATUS_VALUES = ['mastered', 'inProgress', 'weak'];

/**
 * 全景 → 内容无关覆盖快照。graphEdges 本项目恒为 null（不接 knowflow 图）：
 * 无图时快照不带 graph 键，与老 sync 在无图环境下的输出一致。
 */
function buildCoverageSnapshot(panorama, graphEdges = null) {
  const out = {
    generatedAt: new Date().toISOString(),
    courseTaughtAll: !!panorama.courseTaughtAll,
    points: (panorama.groups ?? []).flatMap((g) =>
      (g.points ?? []).map((p) => {
        const pt = {
          ep: p.ep,
          taught: !!p.taught,
          practiced: !!p.practiced,
          mastered: !!p.mastered,
          oral: p.oral ? { asked: p.oral.asked, correct: p.oral.correct } : null,
          oralStatus: ORAL_STATUS_VALUES.includes(p.oralStatus) ? p.oralStatus : null,
        };
        for (const k of Object.keys(pt)) if (!POINT_KEYS.includes(k)) delete pt[k];
        if (pt.oral) for (const k of Object.keys(pt.oral)) if (!ORAL_KEYS.includes(k)) delete pt.oral[k];
        return pt;
      }),
    ),
  };
  if (Array.isArray(graphEdges) && graphEdges.length > 0) {
    out.graph = { edges: graphEdges.map((e) => ({ from: e.from, to: e.to, prerequisite: !!e.prerequisite })) };
  }
  return out;
}

/** 读记录目录下的 *.md（坏文件跳过）。 */
function readRecordsFrom(dirs) {
  const records = [];
  const seen = new Set();
  for (const dir of dirs) {
    const abs = resolve(dir);
    if (seen.has(abs)) continue;
    seen.add(abs);
    if (!isDir(abs)) continue;
    for (const f of readdirSync(abs).filter((x) => x.endsWith('.md')).sort()) {
      try {
        records.push(parseSessionRecord(readFileSync(join(abs, f), 'utf-8')));
      } catch {
        /* 单文件坏不拖垮 */
      }
    }
  }
  return records;
}

/** 课已学完状态（显式确认制；coursesRead key = `<theme>/<file>`，墓碑取大者语义）。 */
function lessonsReadState(themeDir, themeName, progress) {
  const lessonsDir = join(themeDir, 'lessons');
  const lessonFiles = isDir(lessonsDir) ? readdirSync(lessonsDir).filter((f) => f.endsWith('.html')) : [];
  const lessonsDone = lessonFiles.filter((f) => {
    const seen = (progress?.coursesRead || {})[`${themeName}/${f}`];
    if (seen === undefined) return false;
    const tomb = (progress?.coursesReadTombstones || {})[`${themeName}/${f}`];
    return tomb === undefined ? true : seen > tomb;
  }).length;
  return { lessonsTotal: lessonFiles.length, lessonsDone };
}

// ── 布局解析 ──────────────────────────────────────────────────────────────

/**
 * 学习记录目录：轻结构优先（项目根 study/records、learning-records），
 * 任一存在就用项目根的；都不存在才回退主题包内旧布局。绝不两边同时读（迁移期会重复计数）。
 */
function resolveRecordDirs(projectRoot, themeDir) {
  const rootDirs = [join(projectRoot, 'study', 'records'), join(projectRoot, 'learning-records')].filter(isDir);
  if (rootDirs.length > 0) return rootDirs;
  return [join(themeDir, 'study', 'records'), join(themeDir, 'learning-records')].filter(isDir);
}

/** 口头流水文件：主题包内优先（老位置），再项目根；取第一个存在的。 */
function resolveOralAttemptsFile(projectRoot, themeDir) {
  const candidates = [
    join(themeDir, 'study', 'records', 'oral-attempts.json'),
    join(themeDir, 'study', 'oral-attempts.json'),
    join(projectRoot, 'study', 'records', 'oral-attempts.json'),
    join(projectRoot, 'study', 'oral-attempts.json'),
  ];
  return candidates.find((p) => existsSync(p)) ?? null;
}

// ── 对外接口 ─────────────────────────────────────────────────────────────

/**
 * 列主题：`<root>/examples/` 下的每个目录一条。
 *
 * 计数直接读 questions.json / flashcards.json 的数组长度；坏 JSON 只影响那一个字段（0 条），
 * 并 console.warn，绝不让整个列表炸。title 取 theme-config.json 的主题标题字段
 * （title / themeTitle / displayName / themeName / name 任一非空字符串），取不到回退 slug
 * （dev-intro 的 theme-config.json 就没有标题字段，正好走回退）。
 *
 * @param {string} root 项目根（也接受含 kit/examples 的仓库根，内部会收敛）
 * @returns {Array<{slug: string, title: string, questionCount: number, cardCount: number}>}
 */
export function listThemes(root) {
  const probed = findStudyRoot(root);
  if (!probed) return [];
  const examplesDir = join(probed.root, 'examples');
  let entries;
  try {
    entries = readdirSync(examplesDir, { withFileTypes: true });
  } catch (err) {
    console.warn(`[study/content] 读不了 examples/: ${examplesDir} (${err.message})`);
    return [];
  }

  const themes = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || !isSafeThemeSlug(entry.name)) continue;
    const slug = entry.name;
    const dir = join(examplesDir, slug);
    const questionsFile = join(dir, 'questions.json');
    const flashcardsFile = join(dir, 'flashcards.json');
    const configFile = join(dir, 'theme-config.json');
    // 一个主题目录至少要有题库/闪卡/显示配置之一，否则是无关目录（assets 之类）
    if (!existsSync(questionsFile) && !existsSync(flashcardsFile) && !existsSync(configFile)) continue;

    const config = readJsonObject(configFile);
    const title =
      ['title', 'themeTitle', 'displayName', 'themeName', 'name']
        .map((k) => config[k])
        .find((v) => typeof v === 'string' && v.trim()) ?? slug;

    themes.push({
      slug,
      title: String(title).trim(),
      questionCount: readJsonArray(questionsFile).length,
      cardCount: readJsonArray(flashcardsFile).length,
    });
  }
  return themes.sort((a, b) => a.slug.localeCompare(b.slug, 'zh-Hans-CN', { numeric: true }));
}

/**
 * 读一个主题的完整 ThemeData（contract.js 的 typedef）。
 *
 * 直读源文件 + 内存派生 theme/coverage，**不写任何文件**。
 * 主题目录不存在 → contract 的 emptyThemeData()（页面按空回退）；目录在但单文件坏 → 该字段空值。
 *
 * @param {string} root 项目根（内部收敛旧结构）
 * @param {string} slug 主题目录名
 * @returns {import('../../shared/contract.js').ThemeData}
 */
export function readThemeData(root, slug) {
  const probed = findStudyRoot(root);
  if (!probed || !isSafeThemeSlug(slug)) {
    if (typeof slug === 'string' && slug && !isSafeThemeSlug(slug)) {
      console.warn(`[study/content] 非法主题 slug，拒绝读取: ${JSON.stringify(slug)}`);
    }
    return emptyThemeData();
  }
  const projectRoot = probed.root;
  const themeName = String(slug);
  const themeDir = join(projectRoot, 'examples', themeName);
  // 双重防线：即使校验被绕过，解析后的目录必须仍是 examples/ 的直接子目录
  if (dirname(resolve(themeDir)) !== resolve(projectRoot, 'examples')) {
    console.warn(`[study/content] 主题路径逃逸 examples/，拒绝读取: ${themeDir}`);
    return emptyThemeData();
  }
  if (!isDir(themeDir)) return emptyThemeData();

  const questions = readJsonArray(join(themeDir, 'questions.json'));
  const flashcards = readJsonArray(join(themeDir, 'flashcards.json'));

  const rawPlan = readJson(join(themeDir, 'plan.json'), null);
  const plan =
    rawPlan && typeof rawPlan === 'object' && !Array.isArray(rawPlan)
      ? { ...rawPlan, units: Array.isArray(rawPlan.units) ? rawPlan.units : [] }
      : { units: [] };

  const themeConfig = readJsonObject(join(themeDir, 'theme-config.json'));

  const missionText = readText(join(themeDir, 'MISSION.md'));
  const examPoints = epNameMap(missionText);
  const examDays = epDayMap(missionText);

  const progress = readProgress(projectRoot);
  const records = readRecordsFrom(resolveRecordDirs(projectRoot, themeDir));
  const oralFile = resolveOralAttemptsFile(projectRoot, themeDir);
  const oralAttempts = mergeOralAttempts(
    oralFile ? parseOralAttempts(readText(oralFile)).attempts : [],
    oralAttemptsFromProgress(progress, themeName),
  );
  const coursesRead = lessonsReadState(themeDir, themeName, progress);

  const panorama = buildPanorama({
    questions,
    answers: progress.answers || {},
    srs: progress.srs || {},
    flashcards,
    epNames: examPoints,
    epDays: examDays,
    records,
    oralAttempts,
    coursesRead,
  });

  return {
    questions,
    flashcards,
    plan,
    themeConfig,
    theme: { theme: themeName, examPoints, examDays },
    // 老 coverage.json 落盘形状是 { theme, ...snapshot }；这里保持同一形状（只有 generatedAt 是现算时间）
    coverage: { theme: themeName, ...buildCoverageSnapshot(panorama, null) },
  };
}
