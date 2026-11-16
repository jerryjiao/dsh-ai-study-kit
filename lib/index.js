// src/host/index.js
import { existsSync as existsSync4, readFileSync as readFileSync3, readdirSync as readdirSync2 } from "node:fs";
import { homedir } from "node:os";
import { dirname as dirname2, join as join4 } from "node:path";
import { fileURLToPath } from "node:url";

// src/shared/contract.js
var RPC_CHANNEL = "/dsh-ai-study-kit";
var RPC_AUTHORITY = "loopback";
var ENDPOINTS = {
  /** 读全量快照：项目/主题列表/当前主题内容/进度/偏好。页面启动与切主题后各调一次。 */
  snapshot: "snapshot",
  /** 写进度（整份 Progress），宿主权威合并后返回合并结果。 */
  saveProgress: "progress.save",
  /** 换项目根目录（用户在下拉里选或手填路径）。 */
  setProject: "project.set",
  /** 换激活主题（写回 progress.theme + 偏好）。 */
  setTheme: "theme.set",
  /** 改组偏好（每日新卡数等），patch 合并。 */
  setSettings: "settings.set"
};
var DEFAULT_SETTINGS = {
  extOn: true,
  autoAdvance: true,
  dailyNewCards: 20,
  lang: "zh"
};
var SETTINGS_KEYS = Object.keys(DEFAULT_SETTINGS);
function emptyThemeData() {
  return {
    questions: [],
    flashcards: [],
    plan: { units: [] },
    themeConfig: {},
    theme: { theme: "", examPoints: {}, examDays: {} },
    coverage: { theme: "", generatedAt: null, courseTaughtAll: false, points: [] }
  };
}
function emptySnapshot() {
  return {
    project: { root: "", source: "none", legacy: false },
    themes: [],
    theme: null,
    data: emptyThemeData(),
    progress: { version: 1, answers: {} },
    settings: { ...DEFAULT_SETTINGS },
    warnings: []
  };
}

// src/host/study/content.js
import { existsSync as existsSync3, readFileSync as readFileSync2, readdirSync, statSync as statSync2 } from "node:fs";
import { dirname, join as join3, resolve as resolve2 } from "node:path";

// src/host/study/project.js
import { existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
var EXAMPLES_DIR = "examples";
var LEGACY_PARENTS = [
  ["kit", "apps", "quiz-app"],
  ["kit"],
  ["apps", "quiz-app"]
];
function isDir(p) {
  if (!p) return false;
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}
function findStudyRoot(candidate) {
  if (!candidate || typeof candidate !== "string") return null;
  const abs = resolve(candidate);
  if (!isDir(abs)) return null;
  if (isDir(join(abs, EXAMPLES_DIR))) return { root: abs, legacy: false };
  for (const parts of LEGACY_PARENTS) {
    const base = join(abs, ...parts);
    if (isDir(join(base, EXAMPLES_DIR))) return { root: base, legacy: true };
  }
  return null;
}
function detectProject({ remembered, cwd, home } = {}) {
  const candidates = [
    [remembered, "remembered"],
    [cwd, "cwd"],
    [home ? join(home, "study-kit") : "", "home"]
  ];
  for (const [candidate, source] of candidates) {
    const hit = findStudyRoot(candidate);
    if (hit) return { root: hit.root, source, legacy: hit.legacy };
  }
  return { root: "", source: "none", legacy: false };
}

// src/host/study/progress.js
import { existsSync as existsSync2, readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import { join as join2 } from "node:path";
var PROGRESS_FILE = "progress.json";
var EMPTY_PROGRESS = { version: 1, answers: {}, read: {} };
function isValidProgress(x) {
  return !!x && typeof x === "object" && !Array.isArray(x) && x.version === 1 && !!x.answers && typeof x.answers === "object" && !Array.isArray(x.answers);
}
function progressPath(root) {
  return join2(String(root || ""), PROGRESS_FILE);
}
function recTs(r) {
  return r.deletedAt ?? r.submittedAt;
}
function srsTs(s) {
  return s.deletedAt ?? s.updatedAt;
}
function mergeTimestampMap(a, b) {
  const out = {};
  for (const k of /* @__PURE__ */ new Set([...Object.keys(a ?? {}), ...Object.keys(b ?? {})])) {
    const x = a?.[k] ?? 0;
    const y = b?.[k] ?? 0;
    out[k] = x >= y ? x : y;
  }
  return out;
}
function mergeSrs(a, b) {
  const out = {};
  for (const k of /* @__PURE__ */ new Set([...Object.keys(a ?? {}), ...Object.keys(b ?? {})])) {
    const x = a?.[k];
    const y = b?.[k];
    if (x && y) out[k] = srsTs(x) >= srsTs(y) ? x : y;
    else out[k] = x || y;
  }
  return out;
}
function mergeSrsMeta(a, b) {
  if (!a && !b) return void 0;
  if (!a) return b;
  if (!b) return a;
  if (a.newTodayDate === b.newTodayDate) {
    return { newTodayDate: a.newTodayDate, newToday: Math.max(a.newToday, b.newToday) };
  }
  return a.newTodayDate > b.newTodayDate ? a : b;
}
function mergeLww(local, remote, valueKey, tsKey) {
  if (!local?.[valueKey] && !remote?.[valueKey]) return {};
  if (!local?.[valueKey]) return { [valueKey]: remote[valueKey], [tsKey]: remote[tsKey] };
  if (!remote?.[valueKey]) return { [valueKey]: local[valueKey], [tsKey]: local[tsKey] };
  return (local[tsKey] ?? 0) >= (remote[tsKey] ?? 0) ? { [valueKey]: local[valueKey], [tsKey]: local[tsKey] } : { [valueKey]: remote[valueKey], [tsKey]: remote[tsKey] };
}
function mergeOralAttempts(...lists) {
  const seen = /* @__PURE__ */ new Set();
  const merged = [];
  for (const e of lists.flat()) {
    if (!e || typeof e !== "object") continue;
    const key = `${e.target}\0${e.correct}\0${e.at}\0${e.source ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(e);
  }
  return merged.sort((x, y) => x.at - y.at);
}
function mergeOralAttemptsField(a, b) {
  if (!a?.length && !b?.length) return void 0;
  return mergeOralAttempts(a ?? [], b ?? []);
}
function emptyCopy() {
  return { ...EMPTY_PROGRESS, answers: {} };
}
function readProgressState(root) {
  const file = progressPath(root);
  if (!existsSync2(file)) {
    return { progress: emptyCopy(), ok: true, status: "missing", file };
  }
  let text;
  try {
    text = readFileSync(file, "utf-8");
  } catch (err) {
    return { progress: emptyCopy(), ok: false, status: "unreadable", file, detail: err.message };
  }
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    return { progress: emptyCopy(), ok: false, status: "corrupt", file, detail: err.message };
  }
  if (!isValidProgress(parsed)) {
    return { progress: emptyCopy(), ok: false, status: "invalid-shape", file };
  }
  return { progress: parsed, ok: true, status: "ok", file };
}
function readProgress(root) {
  const state = readProgressState(root);
  if (!state.ok) {
    console.warn(
      `[study/progress] ${state.status}\uFF0C\u6309\u7A7A\u8FDB\u5EA6\u964D\u7EA7\uFF08\u4FDD\u5B58\u4F1A\u88AB\u62D2\u7EDD\uFF0C\u8BF7\u5148\u5907\u4EFD/\u4FEE\u590D\uFF09: ${state.file}` + (state.detail ? ` (${state.detail})` : "")
    );
  }
  return state.progress;
}
function mergeProgress(local, remote) {
  const L = isValidProgress(local) ? local : { ...EMPTY_PROGRESS };
  const R = isValidProgress(remote) ? remote : { ...EMPTY_PROGRESS };
  const answers = {};
  for (const k of /* @__PURE__ */ new Set([...Object.keys(L.answers ?? {}), ...Object.keys(R.answers ?? {})])) {
    const a = L.answers?.[k];
    const b = R.answers?.[k];
    if (a && b) answers[k] = recTs(a) >= recTs(b) ? a : b;
    else answers[k] = a || b;
  }
  const oralAttempts = mergeOralAttemptsField(L.oralAttempts, R.oralAttempts);
  return {
    version: 1,
    answers,
    ...oralAttempts ? { oralAttempts } : {},
    read: mergeTimestampMap(L.read, R.read),
    readTombstones: mergeTimestampMap(L.readTombstones, R.readTombstones),
    coursesRead: mergeTimestampMap(L.coursesRead, R.coursesRead),
    coursesReadTombstones: mergeTimestampMap(L.coursesReadTombstones, R.coursesReadTombstones),
    srs: mergeSrs(L.srs, R.srs),
    srsMeta: mergeSrsMeta(L.srsMeta, R.srsMeta),
    ...mergeLww(
      { theme: L.theme, themeUpdatedAt: L.themeUpdatedAt },
      { theme: R.theme, themeUpdatedAt: R.themeUpdatedAt },
      "theme",
      "themeUpdatedAt"
    ),
    ...mergeLww(
      { lang: L.lang, langUpdatedAt: L.langUpdatedAt },
      { lang: R.lang, langUpdatedAt: R.langUpdatedAt },
      "lang",
      "langUpdatedAt"
    ),
    ...mergeLww(
      { settings: L.settings, settingsUpdatedAt: L.settingsUpdatedAt },
      { settings: R.settings, settingsUpdatedAt: R.settingsUpdatedAt },
      "settings",
      "settingsUpdatedAt"
    )
  };
}
function writeProgress(root, incoming) {
  if (!isValidProgress(incoming)) throw new Error("invalid progress payload");
  const file = progressPath(root);
  const state = readProgressState(root);
  if (!state.ok) {
    const err = new Error(
      `refusing to overwrite ${state.status} progress file (\u5907\u4EFD/\u4FEE\u590D\u540E\u518D\u4FDD\u5B58): ${file}`
    );
    err.code = "EPROGRESS_CORRUPT";
    err.status = state.status;
    err.file = file;
    if (state.detail) err.detail = state.detail;
    throw err;
  }
  const merged = mergeProgress(state.progress, incoming);
  const tmp = `${file}.tmp`;
  writeFileSync(tmp, JSON.stringify(merged), "utf-8");
  try {
    renameSync(tmp, file);
  } catch (err) {
    try {
      unlinkSync(tmp);
    } catch {
    }
    throw err;
  }
  return merged;
}

// src/host/study/content.js
function isDir2(p) {
  try {
    return statSync2(p).isDirectory();
  } catch {
    return false;
  }
}
function readText(file) {
  try {
    return readFileSync2(file, "utf-8");
  } catch {
    return "";
  }
}
function readJson(file, fallback, label = file) {
  if (!existsSync3(file)) return fallback;
  try {
    return JSON.parse(readFileSync2(file, "utf-8"));
  } catch (err) {
    console.warn(`[study/content] \u574F JSON\uFF0C\u6309\u7A7A\u503C\u56DE\u9000: ${label} (${err.message})`);
    return fallback;
  }
}
function readJsonArray(file) {
  const v = readJson(file, []);
  return Array.isArray(v) ? v : [];
}
function readJsonObject(file, label) {
  const v = readJson(file, {}, label);
  return v && typeof v === "object" && !Array.isArray(v) ? v : {};
}
function isSafeThemeSlug(slug) {
  if (typeof slug !== "string") return false;
  if (!slug || slug !== slug.trim()) return false;
  if (slug === "." || slug === "..") return false;
  if (/[/\\]/.test(slug)) return false;
  if (/[\u0000-\u001f\u007f]/.test(slug)) return false;
  if (slug.includes(":")) return false;
  if (slug.startsWith(".")) return false;
  return true;
}
function streakToPass(wrongCount) {
  if (wrongCount <= 1) return 1;
  if (wrongCount === 2) return 2;
  return 3;
}
function isOpenWrong(r) {
  if (!r || r.streak === void 0) return false;
  return r.streak < streakToPass(r.wrongCount ?? 1);
}
function epNameMap(missionText) {
  const map = {};
  if (!missionText) return map;
  for (const m of missionText.matchAll(/^\|\s*(EP-\d+)\s*\|\s*([^|]+?)\s*\|/gm)) {
    map[m[1]] = m[2].trim();
  }
  return map;
}
function epDayMap(missionText) {
  const map = {};
  if (!missionText) return map;
  for (const m of missionText.matchAll(/^\|\s*(EP-\d+)\s*\|[^|]*\|[^|]*\|[^|]*\|\s*([^|]*?)\s*\|/gm)) {
    const day = m[2].trim();
    if (day && !/^[—\-–~]+$/.test(day)) map[m[1]] = day;
  }
  return map;
}
function isFlashGraduated(s) {
  return !!s && s.deletedAt === void 0 && s.phase === "review";
}
function oralStatusOf(oralByEp, ep) {
  if (!oralByEp) return void 0;
  const v = typeof oralByEp.get === "function" ? oralByEp.get(ep) : oralByEp[ep];
  return v === "untouched" ? void 0 : v ?? void 0;
}
function countNeutral(ids, answers) {
  let n = 0;
  for (const id of ids) {
    const r = answers[id];
    if (r && r.deletedAt === void 0 && !r.fromRandom && r.correct === null) n++;
  }
  return n;
}
function masteryByExamPoint({ questions, answers = {}, epNames = {}, flashcards = [], srs = {}, oralByEp = null }) {
  const flashByEp = /* @__PURE__ */ new Map();
  for (const f of flashcards) {
    if (!f.examPoint) continue;
    if (!flashByEp.has(f.examPoint)) flashByEp.set(f.examPoint, []);
    flashByEp.get(f.examPoint).push(f.id);
  }
  const groups = /* @__PURE__ */ new Map();
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
      if (!r || r.deletedAt !== void 0 || r.fromRandom) continue;
      answered++;
      if (r.correct === true) correctNow++;
      if (isOpenWrong(r)) openWrongIds.push(id);
    }
    const flashIds = flashByEp.get(ep) ?? [];
    const flashOpenIds = flashIds.filter((id) => !isFlashGraduated(srs[id]));
    const oral = oralStatusOf(oralByEp, ep);
    const oralData = oral !== void 0;
    const beyondOK = !oralData || oral === "mastered" || flashIds.length > 0 && flashOpenIds.length === 0;
    const hasNegative = openWrongIds.length > 0 || correctNow + countNeutral(ids, answers) < answered;
    let status;
    if (answered === 0 && oral !== "weak") status = "untouched";
    else if (hasNegative || oral === "weak") status = "weak";
    else if (answered === ids.length && correctNow === ids.length && beyondOK) status = "mastered";
    else status = "inProgress";
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
      status
    });
  }
  return { points, untracked };
}
var ORAL_SOURCES = ["recall", "recite", "case"];
var ORAL_WEIGHTS = [0.5, 0.7, 0.85, 0.95, 1];
var ORAL_CAPS = { 1: 0.5, 2: 0.8 };
var ORAL_MASTER_AT = 0.85;
var ORAL_WEAK_BELOW = 0.5;
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
    if (!e || typeof e !== "object") {
      out.skipped++;
      continue;
    }
    if (typeof e.target !== "string" || !e.target.trim()) {
      out.skipped++;
      continue;
    }
    if (typeof e.correct !== "boolean") {
      out.skipped++;
      continue;
    }
    if (typeof e.at !== "number" || !Number.isFinite(e.at)) {
      out.skipped++;
      continue;
    }
    out.attempts.push({
      target: e.target.trim(),
      correct: e.correct,
      at: e.at,
      source: ORAL_SOURCES.includes(e.source) ? e.source : null
    });
  }
  return out;
}
function mergeOralAttempts2(a = [], b = []) {
  const seen = /* @__PURE__ */ new Set();
  const merged = [];
  for (const e of [...a, ...b]) {
    const key = `${e.target}\0${e.correct}\0${e.at}\0${e.source ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(e);
  }
  return merged.sort((x, y) => x.at - y.at);
}
function resolveOralTarget(target, { epNames = {}, graphMap = null, graphNodes = null } = {}) {
  const raw = String(target ?? "").trim();
  const epm = raw.match(/^(EP-\d+)\b/);
  if (epm) {
    return { ep: epm[1], node: null, name: raw.slice(epm[1].length).trim() || epNames[epm[1]] || epm[1], via: "ep", resolved: true };
  }
  if (graphMap) {
    const byNode = graphMap.byNode?.get(raw);
    if (byNode) return { ep: byNode.ep, node: byNode.node, name: byNode.label || raw, via: "node", resolved: true };
    const byLabel = graphMap.byLabel?.get(raw);
    if (byLabel) return { ep: byLabel.ep, node: byLabel.node, name: raw, via: "node", resolved: true };
  }
  if (graphNodes) {
    const byId = graphNodes.byId?.get(raw);
    if (byId) return { ep: null, node: byId.id, name: byId.label || raw, via: "node", resolved: true };
    const byLabel = graphNodes.byLabel?.get(raw);
    if (byLabel) return { ep: null, node: byLabel.id, name: raw, via: "node", resolved: true };
  }
  for (const [ep, name2] of Object.entries(epNames)) {
    if (name2 === raw) return { ep, node: null, name: raw, via: "name", resolved: true };
  }
  return { ep: null, node: null, name: raw, via: null, resolved: false };
}
function aggregateOral(attempts = [], opts = {}) {
  const byEp = /* @__PURE__ */ new Map();
  const byNode = /* @__PURE__ */ new Map();
  const byName = /* @__PURE__ */ new Map();
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
function oralMastery(attempts = []) {
  const sorted = [...attempts].sort((a, b) => a.at - b.at);
  const n = sorted.length;
  const correct = sorted.filter((a) => a.correct).length;
  if (n === 0) return { asked: 0, correct: 0, score: null, status: "untouched" };
  const k = Math.min(ORAL_WEIGHTS.length, n);
  const recent = sorted.slice(-k);
  const weights = ORAL_WEIGHTS.slice(-k);
  const wSum = weights.reduce((s, w) => s + w, 0);
  let score = recent.reduce((s, a, i) => s + weights[i] * (a.correct ? 1 : 0), 0) / wSum;
  const cap = ORAL_CAPS[n];
  if (cap !== void 0) score = Math.min(score, cap);
  const status = !sorted[n - 1].correct || score < ORAL_WEAK_BELOW ? "weak" : score >= ORAL_MASTER_AT ? "mastered" : "inProgress";
  return { asked: n, correct, score: Math.round(score * 1e3) / 1e3, status };
}
function groupOralAttempts(attempts = [], opts = {}) {
  const byEp = /* @__PURE__ */ new Map();
  const byNode = /* @__PURE__ */ new Map();
  const byName = /* @__PURE__ */ new Map();
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
function oralAttemptsFromProgress(progress, theme) {
  if (!progress || !Array.isArray(progress.oralAttempts)) return [];
  const scoped = progress.oralAttempts.filter(
    (a) => a && typeof a === "object" && (a.theme === void 0 || a.theme === null || a.theme === theme)
  );
  return parseOralAttempts(JSON.stringify(scoped)).attempts;
}
function splitEp(name2) {
  const m = name2.match(/^(EP-\d+)\s+(.+)$/);
  return m ? { ep: m[1], name: m[2] } : { ep: null, name: name2 };
}
function parseSessionRecord(text) {
  const out = { legacy: true, id: null, topic: null, mode: null, status: null, passed: [], wrongPoints: [], todos: [], oral: [] };
  if (!text) return out;
  let body = text;
  if (text.startsWith("---")) {
    const end = text.indexOf("\n---", 3);
    if (end !== -1) {
      const fmText = text.slice(3, end);
      body = text.slice(text.indexOf("\n", end + 1) + 1);
      out.legacy = false;
      for (const line of fmText.split("\n")) {
        const m = line.match(/^([a-zA-Z-]+)\s*:\s*(.*)$/);
        if (!m) continue;
        const val = m[2].trim().replace(/^["']|["']$/g, "");
        if (m[1] === "id") out.id = /^-?\d+$/.test(val) ? Number(val) : val || null;
        else if (m[1] === "topic") out.topic = val || null;
        else if (m[1] === "mode") out.mode = val || null;
        else if (m[1] === "status") out.status = val || null;
      }
    }
  }
  const sections = /* @__PURE__ */ new Map();
  let current = null;
  for (const line of body.split("\n")) {
    const h = line.match(/^##\s+(.*)$/);
    if (h) {
      current = h[1].trim();
      if (!sections.has(current)) sections.set(current, []);
      continue;
    }
    if (current && line.trim()) sections.get(current).push(line);
  }
  for (const line of sections.get("\u5DF2\u8FC7\u8003\u70B9") ?? []) {
    const m = line.match(/^[-*]\s*(.+)$/);
    if (!m) continue;
    const [rawName, rawGolden] = m[1].split(/·\s*金句[：:]/, 2);
    const { ep, name: name2 } = splitEp(rawName.trim());
    out.passed.push({ ep, name: name2, golden: rawGolden ? rawGolden.trim().replace(/^[「"]|["」]$/g, "") || null : null });
  }
  for (const line of sections.get("\u9519\u7684\u70B9") ?? []) {
    const m = line.match(/^[-*]\s*(.+)$/);
    if (m) out.wrongPoints.push(m[1].trim());
  }
  for (const line of sections.get("\u5F85\u529E") ?? []) {
    const m = line.match(/^[-*]\s*\[([ xX])\]\s*(.+)$/);
    if (m) out.todos.push({ text: m[2].trim(), done: m[1].toLowerCase() === "x" });
  }
  for (const line of sections.get("\u53E3\u5934\u9898\u8BA1\u6570") ?? []) {
    const m = line.match(/^[-*]\s*(.+?)[：:]\s*问\s*(\d+)\s*对\s*(\d+)\s*$/);
    if (!m) continue;
    const { ep, name: name2 } = splitEp(m[1].trim());
    out.oral.push({ ep, name: name2, asked: Number(m[2]), correct: Number(m[3]) });
  }
  return out;
}
function buildPanorama({
  questions,
  answers = {},
  srs = {},
  flashcards = [],
  epNames = {},
  epDays = {},
  records = [],
  oralAttempts = [],
  coursesRead = { lessonsTotal: 0, lessonsDone: 0 }
}) {
  const oralGroups = groupOralAttempts(oralAttempts, { epNames });
  const oralStatusByEp = /* @__PURE__ */ new Map();
  for (const [ep, attempts] of oralGroups.byEp) oralStatusByEp.set(ep, oralMastery(attempts).status);
  const { points } = masteryByExamPoint({ questions, answers, epNames, flashcards, srs, oralByEp: oralStatusByEp });
  const taughtByEp = /* @__PURE__ */ new Map();
  const recordHits = (entry) => {
    if (!entry) return [];
    const targets = /* @__PURE__ */ new Set();
    if (entry.ep) targets.add(entry.ep);
    if (entry.name) {
      for (const [ep, name2] of Object.entries(epNames)) {
        if (name2 === entry.name) targets.add(ep);
      }
    }
    return [...targets];
  };
  for (const rec of records || []) {
    for (const passed of rec.passed || []) {
      for (const ep of recordHits(passed) ?? []) taughtByEp.set(ep, true);
    }
  }
  const oralByEp = /* @__PURE__ */ new Map();
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
  dayOrder.sort((a, b) => a.localeCompare(b, "zh-Hans-CN", { numeric: true }));
  const groupMap = /* @__PURE__ */ new Map();
  for (const p of points) {
    const day = epDays[p.ep] || "\u672A\u6392\u7A0B";
    if (!groupMap.has(day)) groupMap.set(day, []);
    const oral = oralByEp.get(p.ep) ?? null;
    groupMap.get(day).push({
      ep: p.ep,
      name: p.name,
      taught: taughtByEp.has(p.ep) || courseTaughtAll,
      practiced: !!(p.answered > 0 || oral && oral.asked > 0),
      mastered: p.status === "mastered",
      status: p.status,
      answered: p.answered,
      total: p.total,
      openWrong: p.openWrongIds.length,
      oral,
      oralStatus: p.oralStatus
    });
  }
  const groupKeys = [...groupMap.keys()].sort((a, b) => {
    if (a === "\u672A\u6392\u7A0B") return 1;
    if (b === "\u672A\u6392\u7A0B") return -1;
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
        mastered: pts.filter((x) => x.mastered).length
      }
    };
  });
  const all = groups.flatMap((g) => g.points);
  return {
    summary: {
      examPoints: all.length,
      taught: all.filter((x) => x.taught).length,
      practiced: all.filter((x) => x.practiced).length,
      mastered: all.filter((x) => x.mastered).length
    },
    courseTaughtAll,
    groups
  };
}
var POINT_KEYS = ["ep", "taught", "practiced", "mastered", "oral", "oralStatus"];
var ORAL_KEYS = ["asked", "correct"];
var ORAL_STATUS_VALUES = ["mastered", "inProgress", "weak"];
function buildCoverageSnapshot(panorama, graphEdges = null) {
  const out = {
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    courseTaughtAll: !!panorama.courseTaughtAll,
    points: (panorama.groups ?? []).flatMap(
      (g) => (g.points ?? []).map((p) => {
        const pt = {
          ep: p.ep,
          taught: !!p.taught,
          practiced: !!p.practiced,
          mastered: !!p.mastered,
          oral: p.oral ? { asked: p.oral.asked, correct: p.oral.correct } : null,
          oralStatus: ORAL_STATUS_VALUES.includes(p.oralStatus) ? p.oralStatus : null
        };
        for (const k of Object.keys(pt)) if (!POINT_KEYS.includes(k)) delete pt[k];
        if (pt.oral) {
          for (const k of Object.keys(pt.oral)) if (!ORAL_KEYS.includes(k)) delete pt.oral[k];
        }
        return pt;
      })
    )
  };
  if (Array.isArray(graphEdges) && graphEdges.length > 0) {
    out.graph = { edges: graphEdges.map((e) => ({ from: e.from, to: e.to, prerequisite: !!e.prerequisite })) };
  }
  return out;
}
function readRecordsFrom(dirs) {
  const records = [];
  const seen = /* @__PURE__ */ new Set();
  for (const dir of dirs) {
    const abs = resolve2(dir);
    if (seen.has(abs)) continue;
    seen.add(abs);
    if (!isDir2(abs)) continue;
    for (const f of readdirSync(abs).filter((x) => x.endsWith(".md")).sort()) {
      try {
        records.push(parseSessionRecord(readFileSync2(join3(abs, f), "utf-8")));
      } catch {
      }
    }
  }
  return records;
}
function lessonsReadState(themeDir, themeName, progress) {
  const lessonsDir = join3(themeDir, "lessons");
  const lessonFiles = isDir2(lessonsDir) ? readdirSync(lessonsDir).filter((f) => f.endsWith(".html")) : [];
  const lessonsDone = lessonFiles.filter((f) => {
    const seen = (progress?.coursesRead || {})[`${themeName}/${f}`];
    if (seen === void 0) return false;
    const tomb = (progress?.coursesReadTombstones || {})[`${themeName}/${f}`];
    return tomb === void 0 ? true : seen > tomb;
  }).length;
  return { lessonsTotal: lessonFiles.length, lessonsDone };
}
function resolveRecordDirs(projectRoot, themeDir) {
  const rootDirs = [join3(projectRoot, "study", "records"), join3(projectRoot, "learning-records")].filter(isDir2);
  if (rootDirs.length > 0) return rootDirs;
  return [join3(themeDir, "study", "records"), join3(themeDir, "learning-records")].filter(isDir2);
}
function resolveOralAttemptsFile(projectRoot, themeDir) {
  const candidates = [
    join3(themeDir, "study", "records", "oral-attempts.json"),
    join3(themeDir, "study", "oral-attempts.json"),
    join3(projectRoot, "study", "records", "oral-attempts.json"),
    join3(projectRoot, "study", "oral-attempts.json")
  ];
  return candidates.find((p) => existsSync3(p)) ?? null;
}
function listThemes(root) {
  const probed = findStudyRoot(root);
  if (!probed) return [];
  const examplesDir = join3(probed.root, "examples");
  let entries;
  try {
    entries = readdirSync(examplesDir, { withFileTypes: true });
  } catch (err) {
    console.warn(`[study/content] \u8BFB\u4E0D\u4E86 examples/: ${examplesDir} (${err.message})`);
    return [];
  }
  const themes = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || !isSafeThemeSlug(entry.name)) continue;
    const slug = entry.name;
    const dir = join3(examplesDir, slug);
    const questionsFile = join3(dir, "questions.json");
    const flashcardsFile = join3(dir, "flashcards.json");
    const configFile = join3(dir, "theme-config.json");
    if (!existsSync3(questionsFile) && !existsSync3(flashcardsFile) && !existsSync3(configFile)) continue;
    const config = readJsonObject(configFile);
    const title = ["title", "themeTitle", "displayName", "themeName", "name"].map((k) => config[k]).find((v) => typeof v === "string" && v.trim()) ?? slug;
    themes.push({
      slug,
      title: String(title).trim(),
      questionCount: readJsonArray(questionsFile).length,
      cardCount: readJsonArray(flashcardsFile).length
    });
  }
  return themes.sort((a, b) => a.slug.localeCompare(b.slug, "zh-Hans-CN", { numeric: true }));
}
function readThemeData(root, slug) {
  const probed = findStudyRoot(root);
  if (!probed || !isSafeThemeSlug(slug)) {
    if (typeof slug === "string" && slug && !isSafeThemeSlug(slug)) {
      console.warn(`[study/content] \u975E\u6CD5\u4E3B\u9898 slug\uFF0C\u62D2\u7EDD\u8BFB\u53D6: ${JSON.stringify(slug)}`);
    }
    return emptyThemeData();
  }
  const projectRoot = probed.root;
  const themeName = String(slug);
  const themeDir = join3(projectRoot, "examples", themeName);
  if (dirname(resolve2(themeDir)) !== resolve2(projectRoot, "examples")) {
    console.warn(`[study/content] \u4E3B\u9898\u8DEF\u5F84\u9003\u9038 examples/\uFF0C\u62D2\u7EDD\u8BFB\u53D6: ${themeDir}`);
    return emptyThemeData();
  }
  if (!isDir2(themeDir)) return emptyThemeData();
  const questions = readJsonArray(join3(themeDir, "questions.json"));
  const flashcards = readJsonArray(join3(themeDir, "flashcards.json"));
  const rawPlan = readJson(join3(themeDir, "plan.json"), null);
  const plan = rawPlan && typeof rawPlan === "object" && !Array.isArray(rawPlan) ? { ...rawPlan, units: Array.isArray(rawPlan.units) ? rawPlan.units : [] } : { units: [] };
  const themeConfig = readJsonObject(join3(themeDir, "theme-config.json"));
  const missionText = readText(join3(themeDir, "MISSION.md"));
  const examPoints = epNameMap(missionText);
  const examDays = epDayMap(missionText);
  const progress = readProgress(projectRoot);
  const records = readRecordsFrom(resolveRecordDirs(projectRoot, themeDir));
  const oralFile = resolveOralAttemptsFile(projectRoot, themeDir);
  const oralAttempts = mergeOralAttempts2(
    oralFile ? parseOralAttempts(readText(oralFile)).attempts : [],
    oralAttemptsFromProgress(progress, themeName)
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
    coursesRead
  });
  return {
    questions,
    flashcards,
    plan,
    themeConfig,
    theme: { theme: themeName, examPoints, examDays },
    // 老 coverage.json 落盘形状是 { theme, ...snapshot }；这里保持同一形状（只有 generatedAt 是现算时间）
    coverage: { theme: themeName, ...buildCoverageSnapshot(panorama, null) }
  };
}

// src/host/index.js
var name = "ai-study-kit";
var inject = ["skills"];
var PLUGIN = "dsh-ai-study-kit";
var STATE_NAME = "dsh_study_kit";
function here() {
  return dirname2(fileURLToPath(import.meta.url));
}
function pkgRoot() {
  return join4(here(), "..");
}
function readVersion() {
  try {
    return JSON.parse(readFileSync3(join4(pkgRoot(), "package.json"), "utf8")).version ?? "0.0.0";
  } catch {
    return "0.0.0";
  }
}
function skillsRoot() {
  return join4(pkgRoot(), "skills");
}
function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(String(raw ?? ""));
  if (!match) return { data: {}, body: String(raw ?? "") };
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z0-9_-]+):\s?([\s\S]*)$/.exec(line);
    if (!kv) continue;
    let value = kv[2].trim();
    if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    data[kv[1]] = value;
  }
  return { data, body: String(raw).slice(match[0].length).replace(/^\s*\n/, "") };
}
function skillDefinitions() {
  const root = skillsRoot();
  const dirs = readdirSync2(root, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  const version = readVersion();
  const defs = [];
  for (const dir of dirs) {
    const file = join4(root, dir, "SKILL.md");
    if (!existsSync4(file)) continue;
    const { data, body } = parseFrontmatter(readFileSync3(file, "utf8"));
    if (!data.description) throw new Error(`skill "${dir}" (${file}) \u7F3A\u5C11 description`);
    const disableModel = data["disable-model-invocation"] === "true";
    defs.push({
      name: data.name || dir,
      description: data.description,
      content: body,
      resourceBase: { kind: "directory", path: join4(root, dir) },
      invocation: { modelInvocable: !disableModel, userInvocable: true },
      source: "runtime",
      metadata: { plugin: PLUGIN, version, skillDir: dir }
    });
  }
  return defs;
}
function normalizeSettings(progress) {
  const stored = progress?.settings && typeof progress.settings === "object" ? progress.settings : {};
  return {
    ...DEFAULT_SETTINGS,
    ...stored,
    lang: progress?.lang === "en" || stored.lang === "en" ? "en" : DEFAULT_SETTINGS.lang
  };
}
function createStudyService({ logger, state = {}, cwd = process.cwd(), home = homedir() } = {}) {
  state ??= {};
  let selectedProject = null;
  const warn = (message) => logger?.warn?.(`${PLUGIN}: ${message}`);
  function resolveProject() {
    const remembered = state?.projectRoot ?? null;
    return selectedProject ?? detectProject({ remembered, cwd, home });
  }
  function snapshot() {
    const project = resolveProject();
    if (!project.root) {
      const empty = emptySnapshot();
      return { ...empty, warnings: ["\u6CA1\u6709\u627E\u5230\u5B66\u4E60\u9879\u76EE\uFF1A\u8BF7\u9009\u62E9\u4E00\u4E2A\u542B examples/ \u7684\u76EE\u5F55"] };
    }
    const root = project.root;
    const themes = listThemes(root);
    const progress = readProgress(root) ?? {};
    const usable = themes.some((item) => item.slug === progress.theme);
    const theme = usable ? progress.theme : themes[0]?.slug ?? null;
    const settings = normalizeSettings(progress);
    const data = theme ? readThemeData(root, theme) : emptyThemeData();
    const warnings = [];
    if (project.legacy) {
      warnings.push("\u8FD9\u662F\u65E7\u7248\u5E03\u5C40\uFF08examples/ \u57CB\u5728 kit/ \u4E0B\uFF09\uFF0C\u5EFA\u8BAE\u6309 docs/adr/0003 \u8FC1\u79FB\u5230\u8F7B\u7ED3\u6784");
    }
    if (!themes.length) warnings.push("\u9879\u76EE\u91CC\u8FD8\u6CA1\u6709\u4E3B\u9898\uFF1Aexamples/ \u662F\u7A7A\u7684");
    return {
      project: { root, source: project.source, legacy: project.legacy },
      themes,
      theme,
      data,
      progress: { ...progress, theme, settings, lang: settings.lang },
      settings,
      warnings
    };
  }
  async function rememberProject(root) {
    if (state) state.projectRoot = root;
    if (!state?.global) return;
    try {
      await state.global.set({ ...state.global.get() ?? {}, projectRoot: root });
    } catch (error) {
      warn(`\u8BB0\u4F4F\u9879\u76EE\u8DEF\u5F84\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4F7F\u7528\uFF09\uFF1A${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return {
    snapshot,
    async saveProgress(payload) {
      const root = resolveProject().root;
      if (!root) throw badRequest("\u8FD8\u6CA1\u6709\u9009\u4E2D\u5B66\u4E60\u9879\u76EE");
      const incoming = payload?.progress;
      if (!incoming || typeof incoming !== "object") throw badRequest("progress.save \u9700\u8981 progress \u5BF9\u8C61");
      if (incoming.version !== 1 || !incoming.answers || Array.isArray(incoming.answers)) throw badRequest("invalid progress payload");
      if (payload.root && payload.root !== root) throw badRequest("\u9879\u76EE\u5DF2\u5207\u6362\uFF0C\u62D2\u7EDD\u4FDD\u5B58\u65E7\u9879\u76EE\u8FDB\u5EA6");
      const merged = writeProgress(root, incoming);
      return { progress: merged };
    },
    async setProject(payload) {
      const candidate = typeof payload?.root === "string" ? payload.root.trim() : "";
      if (!candidate) throw badRequest("project.set \u9700\u8981 root \u8DEF\u5F84");
      const found = findStudyRoot(candidate.replace(/^~(?=$|\/)/, homedir()));
      if (!found) throw badRequest(`\u8FD9\u4E2A\u76EE\u5F55\u4E0D\u50CF\u5B66\u4E60\u9879\u76EE\uFF08\u91CC\u9762\u6CA1\u6709 examples/\uFF09\uFF1A${candidate}`);
      selectedProject = { ...found, source: "manual" };
      await rememberProject(found.root);
      return snapshot();
    },
    async setTheme(payload) {
      const root = resolveProject().root;
      if (!root) throw badRequest("\u8FD8\u6CA1\u6709\u9009\u4E2D\u5B66\u4E60\u9879\u76EE");
      const slug = typeof payload?.theme === "string" ? payload.theme.trim() : "";
      if (!slug) throw badRequest("theme.set \u9700\u8981 theme");
      const themes = listThemes(root);
      if (!themes.some((item) => item.slug === slug)) throw badRequest(`\u4E3B\u9898\u4E0D\u5B58\u5728\uFF1A${slug}`);
      const base = readProgress(root) ?? {};
      const merged = mergeProgress(base, { ...base, theme: slug, themeUpdatedAt: Math.max(Date.now(), (base.themeUpdatedAt ?? 0) + 1) });
      await writeProgress(root, merged);
      return snapshot();
    },
    async setSettings(payload) {
      const root = resolveProject().root;
      if (!root) throw badRequest("\u8FD8\u6CA1\u6709\u9009\u4E2D\u5B66\u4E60\u9879\u76EE");
      const patch = payload?.patch;
      if (!patch || typeof patch !== "object") throw badRequest("settings.set \u9700\u8981 patch \u5BF9\u8C61");
      const base = readProgress(root) ?? {};
      const current = normalizeSettings(base);
      const allowed = {};
      for (const [key, value] of Object.entries(patch)) {
        if (["extOn", "autoAdvance"].includes(key) && typeof value === "boolean") allowed[key] = value;
        else if (key === "dailyNewCards" && Number.isInteger(value) && value >= 0 && value <= 1e3) allowed[key] = value;
        else if (key === "lang" && ["zh", "en"].includes(value)) allowed[key] = value;
        else throw badRequest(`\u8BBE\u7F6E\u503C\u65E0\u6548\uFF1A${key}`);
      }
      const next = { ...current, ...allowed };
      const now = Math.max(Date.now(), (base.settingsUpdatedAt ?? 0) + 1, (base.langUpdatedAt ?? 0) + 1);
      const merged = mergeProgress(base, {
        ...base,
        settings: next,
        settingsUpdatedAt: now,
        ...patch.lang === "zh" || patch.lang === "en" ? { lang: patch.lang, langUpdatedAt: now } : {}
      });
      await writeProgress(root, merged);
      return { progress: merged, settings: next };
    }
  };
}
function badRequest(message) {
  const error = new Error(message);
  error.code = "bad_request";
  return error;
}
function resolveRpcRegistrar(connection, owner) {
  if (!connection) return void 0;
  const { register } = connection;
  if (typeof register === "function") {
    return { handle: (channel, handler, options) => register.call(connection, owner, channel, handler, options) };
  }
  return connection.rpc;
}
function registerStudyRpc(service, connection, owner, logger) {
  const rpc = resolveRpcRegistrar(connection, owner);
  if (!rpc?.handle) {
    logger?.warn?.(`${PLUGIN}: connection \u670D\u52A1\u4E0D\u53EF\u7528\uFF0C\u5B66\u4E60\u53F0\u9762\u677F\u62FF\u4E0D\u5230\u6570\u636E`);
    return void 0;
  }
  const handler = async (endpoint, payload) => {
    try {
      switch (endpoint) {
        case ENDPOINTS.snapshot:
          return envelope(await service.snapshot());
        case ENDPOINTS.saveProgress:
          return envelope(await service.saveProgress(payload));
        case ENDPOINTS.setProject:
          return envelope(await service.setProject(payload));
        case ENDPOINTS.setTheme:
          return envelope(await service.setTheme(payload));
        case ENDPOINTS.setSettings:
          return envelope(await service.setSettings(payload));
        default:
          throw badRequest(`\u672A\u77E5\u7AEF\u70B9\uFF1A${endpoint}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      logger?.warn?.(`${PLUGIN}: ${endpoint} \u5931\u8D25\uFF1A${message}`);
      return {
        ok: false,
        error: { code: error?.code ?? "internal", message: message.slice(0, 500) }
      };
    }
  };
  let pending;
  try {
    pending = rpc.handle(RPC_CHANNEL, handler, { authority: RPC_AUTHORITY });
  } catch (error) {
    logger?.warn?.(`${PLUGIN}: RPC \u6CE8\u518C\u5931\u8D25\uFF1A${error instanceof Error ? error.message : String(error)}`);
    return void 0;
  }
  return Promise.resolve(pending).then((dispose) => () => dispose?.());
}
function envelope(value) {
  return { ok: true, value };
}
async function openState(ctx, logger) {
  const storageDomain = tryService(ctx, "storageDomain");
  if (!storageDomain?.open) return null;
  try {
    const domain = await storageDomain.open({
      name: STATE_NAME,
      version: 1,
      global: {
        // 宿主只校验形状；不用 zod，避免为一个字符串引入依赖。
        schema: {
          parse(value) {
            if (!value || typeof value !== "object" || Array.isArray(value)) {
              throw new TypeError("state \u5FC5\u987B\u662F\u5BF9\u8C61");
            }
            return value;
          },
          safeParse(value) {
            const ok = Boolean(value) && typeof value === "object" && !Array.isArray(value);
            return ok ? { success: true, data: value } : { success: false };
          }
        },
        initial: { projectRoot: null }
      },
      tables: {}
    });
    const global = domain.global;
    const current = global?.get?.() ?? {};
    return {
      global,
      projectRoot: typeof current.projectRoot === "string" ? current.projectRoot : null
    };
  } catch (error) {
    logger?.warn?.(
      `${PLUGIN}: \u72B6\u6001\u57DF\u6253\u4E0D\u5F00\uFF08\u8FD9\u6B21\u4E0D\u8BB0\u5FC6\u9879\u76EE\u8DEF\u5F84\uFF09\uFF1A${error instanceof Error ? error.message : String(error)}`
    );
    return null;
  }
}
function tryService(ctx, name2) {
  try {
    return ctx?.[name2];
  } catch {
    return void 0;
  }
}
function apply(ctx, config = {}) {
  const logger = typeof ctx?.logger === "function" ? ctx.logger(PLUGIN) : ctx?.logger;
  ctx.effect(() => {
    const disposers = [];
    try {
      const defs = skillDefinitions();
      for (const definition of defs) {
        disposers.push(ctx.skills.register(definition));
      }
      logger?.info?.(`ai-study-kit: \u6CE8\u518C\u4E86 ${defs.length} \u4E2A\u6280\u80FD`);
    } catch (error) {
      for (const dispose of disposers.splice(0).reverse()) {
        try {
          dispose?.();
        } catch {
        }
      }
      throw error;
    }
    return () => {
      for (const dispose of disposers.reverse()) {
        try {
          dispose?.();
        } catch {
        }
      }
    };
  });
  ctx.inject(["connection", "webServer"], (child) => {
    child.effect(
      async () => {
        const state = await openState(child, logger) ?? {};
        if (typeof config?.projectRoot === "string" && !state.projectRoot) {
          state.projectRoot = config.projectRoot;
        }
        const service = createStudyService({ logger, state });
        const stopRpc = registerStudyRpc(service, tryService(child, "connection"), child, logger);
        logger?.info?.("ai-study-kit: \u5B66\u4E60\u53F0 RPC \u5DF2\u6302\u8F7D");
        return async () => {
          const dispose = await Promise.resolve(stopRpc).catch(() => void 0);
          dispose?.();
        };
      },
      `${PLUGIN}: study desk rpc`
    );
  });
}
export {
  apply,
  createStudyService,
  inject,
  name,
  parseFrontmatter,
  pkgRoot,
  readVersion,
  skillDefinitions,
  skillsRoot
};
//# sourceMappingURL=index.js.map
