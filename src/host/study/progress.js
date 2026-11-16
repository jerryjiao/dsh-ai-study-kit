/**
 * 进度读写（Host 半，纯 node 内置模块）。
 *
 * 语义全部照搬老 server（`kit/apps/quiz-app/server/progressStore.ts`）与老前端
 * （`kit/apps/quiz-app/src/lib/progress.ts` 的 mergeProgress）：
 *
 *   read:  `<root>/progress.json` → 缺失 → 空进度；**损坏/形状非法/读不了** → 空进度**降级**（只读场景
 *          不能让首页白屏），但状态会记在 readProgressState 里，写盘时拒绝覆盖（见 write）。
 *   merge: answers 按 submittedAt（墓碑 deletedAt 优先）取新；srs 按 updatedAt（墓碑优先）取新；
 *          read/readTombstones/coursesRead/coursesReadTombstones 每 key 取 max；
 *          settings 按 settingsUpdatedAt 整块 LWW；theme/lang 各自 *UpdatedAt LWW；
 *          oralAttempts 并集 + 四元组去重 + at 升序（单边缺失取存在者，双边空不产出键）。
 *   write: read-merge-write + tmp 文件 + rename 原子替换 → 返回合并后的完整 Progress。
 *          ⚠️ 前提：盘上已有文件必须可解析且形状合法。若现有文件损坏/非法/读不了，**拒绝写入**并抛
 *          `code='EPROGRESS_CORRUPT'` 的错误——降级读出来的空进度一旦 merge 再落盘，等于把用户
 *          全部历史静默清零。正确处置是提示用户备份/修复（或显式恢复）后再保存。
 *
 * 为什么必须 read-merge-write：多端/多 tab 并发时，客户端提交的是**快照**而不是全量真相，
 * 直接覆盖会丢掉另一端刚写的记录。老 server 的做法（读盘 → merge → tmp → rename）原样保留。
 *
 * Progress 形状（模块内部只承诺这些字段，多余字段一律原样带回）：
 *   { version:1, answers:{[id]:AnswerRecord}, read:{[id]:ts},
 *     readTombstones?, coursesRead?, coursesReadTombstones?, srs?, srsMeta?,
 *     oralAttempts?, theme?, themeUpdatedAt?, lang?, langUpdatedAt?, settings?, settingsUpdatedAt? }
 */

import { existsSync, readFileSync, renameSync, unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/** 进度文件名（与 ADR 0003 轻结构一致：<项目根>/progress.json）。 */
export const PROGRESS_FILE = 'progress.json';

const EMPTY_PROGRESS = { version: 1, answers: {}, read: {} };

/** 老 server 的形状校验：必须是对象、version===1、answers 是对象（非数组）。 */
function isValidProgress(x) {
  return (
    !!x &&
    typeof x === 'object' &&
    !Array.isArray(x) &&
    x.version === 1 &&
    !!x.answers &&
    typeof x.answers === 'object' &&
    !Array.isArray(x.answers)
  );
}

function progressPath(root) {
  return join(String(root || ''), PROGRESS_FILE);
}

// ── 合并小工具（镜像 src/lib/progress.ts） ────────────────────────────────

/** 答题记录定序时间戳：墓碑优先（删除意图参与竞争，这样「重做」类删除能穿透 read-merge-write）。 */
function recTs(r) {
  return r.deletedAt ?? r.submittedAt;
}

/** SRS 定序时间戳：墓碑优先。 */
function srsTs(s) {
  return s.deletedAt ?? s.updatedAt;
}

/** 每 key 取 max（read / readTombstones / coursesRead / coursesReadTombstones 共用）。 */
function mergeTimestampMap(a, b) {
  const out = {};
  for (const k of new Set([...Object.keys(a ?? {}), ...Object.keys(b ?? {})])) {
    const x = a?.[k] ?? 0;
    const y = b?.[k] ?? 0;
    out[k] = x >= y ? x : y;
  }
  return out;
}

/** srs 每 key 按 srsTs 取新（相等取 local）。 */
function mergeSrs(a, b) {
  const out = {};
  for (const k of new Set([...Object.keys(a ?? {}), ...Object.keys(b ?? {})])) {
    const x = a?.[k];
    const y = b?.[k];
    if (x && y) out[k] = srsTs(x) >= srsTs(y) ? x : y;
    else out[k] = x || y;
  }
  return out;
}

/** srsMeta：同日取 newToday 较大者，异日取 newTodayDate 字典序（=时间序）较大者。 */
function mergeSrsMeta(a, b) {
  if (!a && !b) return undefined;
  if (!a) return b;
  if (!b) return a;
  if (a.newTodayDate === b.newTodayDate) {
    return { newTodayDate: a.newTodayDate, newToday: Math.max(a.newToday, b.newToday) };
  }
  return a.newTodayDate > b.newTodayDate ? a : b;
}

/** 通用 LWW（theme / lang / settings 共用）：两边都无 → {}；单边 → 取存在侧；双边按时间戳取新（相等取 local）。
 *  「无」用**假值**判断（与老 mergeTheme/mergeLang/mergeSettings 的 `!a?.theme` 一致：
 *  空字符串 / null / 0 都算没写过，不产生半残字段）。 */
function mergeLww(local, remote, valueKey, tsKey) {
  if (!local?.[valueKey] && !remote?.[valueKey]) return {};
  if (!local?.[valueKey]) return { [valueKey]: remote[valueKey], [tsKey]: remote[tsKey] };
  if (!remote?.[valueKey]) return { [valueKey]: local[valueKey], [tsKey]: local[tsKey] };
  return (local[tsKey] ?? 0) >= (remote[tsKey] ?? 0)
    ? { [valueKey]: local[valueKey], [tsKey]: local[tsKey] }
    : { [valueKey]: remote[valueKey], [tsKey]: remote[tsKey] };
}

/** 口头流水四元组去重 + at 升序（镜像 src/lib/oral.ts mergeOralAttempts）。 */
function mergeOralAttempts(...lists) {
  const seen = new Set();
  const merged = [];
  for (const e of lists.flat()) {
    if (!e || typeof e !== 'object') continue;
    const key = `${e.target}\u0000${e.correct}\u0000${e.at}\u0000${e.source ?? ''}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(e);
  }
  return merged.sort((x, y) => x.at - y.at);
}

/** 口头流水字段合并：两边都空 → 不产出键（旧 progress 文件形状零变化）。 */
function mergeOralAttemptsField(a, b) {
  if (!a?.length && !b?.length) return undefined;
  return mergeOralAttempts(a ?? [], b ?? []);
}

// ── 读 ────────────────────────────────────────────────────────────────────

/** 空进度副本（每次新对象，避免调用方改到共享常量）。 */
function emptyCopy() {
  return { ...EMPTY_PROGRESS, answers: {} };
}

/**
 * 读进度并**带状态**：这是给宿主 RPC 层用的版本（首页快照的 warnings 可以据此提示用户）。
 *
 * status：
 *   ok            文件不存在或合法（不存在 = 全新项目，正常态）
 *   missing       文件不存在（ok:true）
 *   corrupt       JSON 解析失败（ok:false）
 *   invalid-shape 能解析但 version!==1 或 answers 非对象（ok:false）
 *   unreadable    文件在但读不了（权限/IO，ok:false）
 *
 * @param {string} root 项目根
 * @returns {{progress: object, ok: boolean, status: string, file: string, detail?: string}}
 */
export function readProgressState(root) {
  const file = progressPath(root);
  if (!existsSync(file)) {
    return { progress: emptyCopy(), ok: true, status: 'missing', file };
  }
  let text;
  try {
    text = readFileSync(file, 'utf-8');
  } catch (err) {
    return { progress: emptyCopy(), ok: false, status: 'unreadable', file, detail: err.message };
  }
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    return { progress: emptyCopy(), ok: false, status: 'corrupt', file, detail: err.message };
  }
  if (!isValidProgress(parsed)) {
    return { progress: emptyCopy(), ok: false, status: 'invalid-shape', file };
  }
  return { progress: parsed, ok: true, status: 'ok', file };
}

/**
 * 读进度（降级版）。文件缺失、JSON 损坏、形状非法（version!==1 或 answers 非对象）都返回空进度，
 * **绝不抛错**——首页快照依赖它，一个坏文件不该让整页白屏。
 *
 * 注意：这里的「空进度」只用于**展示降级**。保存路径必须走 writeProgress，它会先检查
 * readProgressState，坏文件直接拒绝写入（否则会把损坏历史静默覆盖成空库）。
 *
 * @param {string} root 项目根
 * @returns {object} Progress
 */
export function readProgress(root) {
  const state = readProgressState(root);
  if (!state.ok) {
    console.warn(
      `[study/progress] ${state.status}，按空进度降级（保存会被拒绝，请先备份/修复）: ${state.file}` +
        (state.detail ? ` (${state.detail})` : ''),
    );
  }
  return state.progress;
}

// ── 合并 ──────────────────────────────────────────────────────────────────

/**
 * 合并本地与远端进度（local = 磁盘/基线，remote = 本次提交）。**逐字照搬**老
 * `mergeProgress(local, remote)`（src/lib/progress.ts）：返回对象的键集合固定，
 * read/readTombstones/coursesRead/coursesReadTombstones/srs 恒为对象（空则 {}）。
 *
 * @param {object} local
 * @param {object} remote
 * @returns {object} Progress
 */
export function mergeProgress(local, remote) {
  const L = isValidProgress(local) ? local : { ...EMPTY_PROGRESS };
  const R = isValidProgress(remote) ? remote : { ...EMPTY_PROGRESS };

  const answers = {};
  for (const k of new Set([...Object.keys(L.answers ?? {}), ...Object.keys(R.answers ?? {})])) {
    const a = L.answers?.[k];
    const b = R.answers?.[k];
    if (a && b) answers[k] = recTs(a) >= recTs(b) ? a : b;
    else answers[k] = a || b;
  }

  const oralAttempts = mergeOralAttemptsField(L.oralAttempts, R.oralAttempts);

  return {
    version: 1,
    answers,
    ...(oralAttempts ? { oralAttempts } : {}),
    read: mergeTimestampMap(L.read, R.read),
    readTombstones: mergeTimestampMap(L.readTombstones, R.readTombstones),
    coursesRead: mergeTimestampMap(L.coursesRead, R.coursesRead),
    coursesReadTombstones: mergeTimestampMap(L.coursesReadTombstones, R.coursesReadTombstones),
    srs: mergeSrs(L.srs, R.srs),
    srsMeta: mergeSrsMeta(L.srsMeta, R.srsMeta),
    ...mergeLww(
      { theme: L.theme, themeUpdatedAt: L.themeUpdatedAt },
      { theme: R.theme, themeUpdatedAt: R.themeUpdatedAt },
      'theme',
      'themeUpdatedAt',
    ),
    ...mergeLww(
      { lang: L.lang, langUpdatedAt: L.langUpdatedAt },
      { lang: R.lang, langUpdatedAt: R.langUpdatedAt },
      'lang',
      'langUpdatedAt',
    ),
    ...mergeLww(
      { settings: L.settings, settingsUpdatedAt: L.settingsUpdatedAt },
      { settings: R.settings, settingsUpdatedAt: R.settingsUpdatedAt },
      'settings',
      'settingsUpdatedAt',
    ),
  };
}

/**
 * 写进度：read-merge-write + tmp+rename 原子替换（同老 server progressStore.ts）。
 *
 * 两类拒绝（都抛错、都不落盘）：
 *   1. incoming 形状非法 → `invalid progress payload`（老 server 同款）。静默吞掉会让页面
 *      显示「保存成功」却没落盘。
 *   2. 盘上现有 progress.json 损坏/非法/读不了 → `code='EPROGRESS_CORRUPT'`。这是本实现比老
 *      server 更严的一条：老 server 读坏文件也返回空进度，随后 merge 落盘 = 静默清零历史。
 *      这里宁可不保存，让上层把错误透给用户（备份/修复/显式重置后再存）。
 *
 * @param {string} root 项目根
 * @param {object} incoming 客户端提交的进度快照（可只带部分字段）
 * @returns {object} 合并后的完整 Progress（= 落盘内容）
 */
export function writeProgress(root, incoming) {
  if (!isValidProgress(incoming)) throw new Error('invalid progress payload');
  const file = progressPath(root);
  const state = readProgressState(root);
  if (!state.ok) {
    const err = new Error(
      `refusing to overwrite ${state.status} progress file (备份/修复后再保存): ${file}`,
    );
    err.code = 'EPROGRESS_CORRUPT';
    err.status = state.status;
    err.file = file;
    if (state.detail) err.detail = state.detail;
    throw err;
  }
  const merged = mergeProgress(state.progress, incoming);
  const tmp = `${file}.tmp`;
  writeFileSync(tmp, JSON.stringify(merged), 'utf-8');
  try {
    renameSync(tmp, file);
  } catch (err) {
    try {
      unlinkSync(tmp);
    } catch {
      /* 清理失败不掩盖原始错误 */
    }
    throw err;
  }
  return merged;
}

// ── 便捷纯函数（镜像 src/lib/progress.ts，供宿主 RPC 层组合） ─────────────

/** 空进度。 */
export function emptyProgress() {
  return { version: 1, answers: {}, read: {} };
}

/** 记一次答题（纯函数，不落盘）。调用方随后 writeProgress(root, next)。 */
export function applyAnswer(progress, id, record) {
  const base = isValidProgress(progress) ? progress : emptyProgress();
  return { ...base, answers: { ...base.answers, [id]: record } };
}
