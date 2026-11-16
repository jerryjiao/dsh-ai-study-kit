import type { Progress } from '../types';
import { emptyProgress, mergeProgress } from '../lib/progress';

/* ── 进度接缝：RPC 版 progressClient ────────────────────────────────────────
 *
 *  老实现是 HTTP（GET/POST /api/progress）+ 「无后端则锁本地模式」。新形态里
 *  宿主（DSH 主进程侧）一定在，数据走 RPC 请求/响应（src/shared/contract.js 的
 *  ENDPOINTS），因此：
 *    - isLocalMode() 恒 false（保留导出形状，老 UI 不需要判断分支）；
 *    - loadProgress() 优先用宿主在挂载时注入的 snapshot.progress（primeProgress），
 *      不再自己发一次 snapshot RPC；没有 prime 值时才退化去取 'snapshot'；
 *    - saveProgress() 走 'progress.save'（payload { progress }，响应 { progress }），
 *      串行链 / 3 次重试 / 失败入 pending 队列 / 成功 notify('saved') 的设计原样保留。
 *
 *  ⚠️ 隔离：localStorage 乐观缓存与 pending 队列都按「项目根 + 主题 slug」分桶
 *  （setProgressScope 由 StudyApp 在挂载时灌入）。切项目/切主题后不会读到、更不会
 *  回放上一个项目/主题的缓存快照——pending 里的记录带 scope 标记，跨 scope 一律丢弃。
 */

/** 宿主注入的 RPC 调用器：签名与 src/client/rpc.js 的 call 一致。 */
export type RpcCall = (endpoint: string, payload?: unknown) => Promise<any>;

/** 契约里的两个端点（与 src/shared/contract.js 的 ENDPOINTS 同值；此处内联避免把
 *  宿主侧的 JSDoc 契约模块拉进 client bundle 的依赖图）。 */
const ENDPOINT_SNAPSHOT = 'snapshot';
const ENDPOINT_SAVE = 'progress.save';

/** 乐观缓存 / 待重发队列的键前缀（后接 scope 哈希；见 setProgressScope）。 */
const LS_KEY = 'dsh-ai-study-kit-cache';
const PENDING_KEY = 'dsh-ai-study-kit-pending';

/** 同步状态回调：让 UI 层（useProgress）感知成功/失败/远端快照不合格。 */
type SyncListener = (status: 'saved' | 'error' | 'local' | 'remote-invalid') => void;
let syncListener: SyncListener | null = null;
export function setSyncListener(fn: SyncListener | null): void {
  syncListener = fn;
}
function notify(status: 'saved' | 'error' | 'local' | 'remote-invalid'): void {
  try { syncListener?.(status); } catch { /* 监听器异常不影响主流程 */ }
}

/* ── RPC 绑定 ──────────────────────────────────────────────────────────── */

let rpc: RpcCall | null = null;

/** 注入宿主 RPC 入口。StudyApp 在渲染函数体顶部**同步**调用（子组件同一次渲染就要能用）。 */
export function bindRpc(call: RpcCall | null | undefined): void {
  rpc = typeof call === 'function' ? call : null;
}

/* ── 作用域（项目 + 主题）隔离 ─────────────────────────────────────────── */

let scope = 'default';

/** FNV-1a 32 位：把绝对路径压成短哈希，避免 localStorage 键里塞长路径。 */
function hash(input: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36);
}

/** 设置进度缓存作用域：项目根 + 激活主题。StudyApp.applySnapshot 里随快照一起调用。 */
export function setProgressScope(next: { projectRoot?: string | null; theme?: string | null } | null): void {
  const root = next?.projectRoot ?? '';
  const theme = next?.theme ?? '';
  scope = `${hash(root)}-${encodeURIComponent(theme)}`;
}

function cacheKey(): string { return `${LS_KEY}:${scope}`; }
function pendingKey(): string { return `${PENDING_KEY}:${scope}`; }

/* ── 快照注入（宿主在挂载时给的初始绝对权威值） ───────────────────────── */

let primed: Progress | null = null;

/** 形状校验：远端/宿主快照必须 version===1 且有 answers，否则视为不合格（旧格式/损坏）。 */
export function isValidProgress(p: unknown): p is Progress {
  const v = p as Progress | null;
  return !!v && typeof v === 'object' && v.version === 1 && !!v.answers;
}

/** 把宿主 snapshot.progress 当作初始值：loadProgress() 立即 resolve 它，不再发 RPC。 */
export function primeProgress(p: Progress | null | undefined): void {
  const valid = isValidProgress(p) ? (p as Progress) : null;
  primed = valid;
  if (valid) writeLocal(valid);
}

/* ── 本地乐观缓存 ──────────────────────────────────────────────────────── */

function readLocal(): Progress {
  try {
    const raw = localStorage.getItem(cacheKey());
    if (!raw) return emptyProgress();
    const p = JSON.parse(raw) as Progress;
    if (!isValidProgress(p)) return emptyProgress();
    return p;
  } catch {
    return emptyProgress();
  }
}

function writeLocal(p: Progress): void {
  try { localStorage.setItem(cacheKey(), JSON.stringify(p)); } catch { /* 配额/隐私模式：忽略 */ }
}

/* ── pending 队列（失败快照，带 scope 标记；跨 scope 丢弃） ─────────────── */

interface PendingEntry { scope: string; progress: Progress }

function readPendingAll(): PendingEntry[] {
  try {
    const raw = localStorage.getItem(pendingKey());
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const out: PendingEntry[] = [];
    for (const item of parsed) {
      // 新格式 { scope, progress }；老格式（裸 Progress）没有 scope，直接丢——
      // 那是上个形态（HTTP/旧键名）遗留的数据，回放会污染当前项目。
      if (item && typeof item === 'object' && (item as PendingEntry).scope === scope && isValidProgress((item as PendingEntry).progress)) {
        out.push({ scope, progress: (item as PendingEntry).progress });
      }
    }
    return out;
  } catch {
    return [];
  }
}

function readPending(): Progress[] {
  return readPendingAll().map((e) => e.progress);
}

function writePending(queue: Progress[]): void {
  try {
    if (queue.length === 0) {
      localStorage.removeItem(pendingKey()); // 队列清空就连键一起删，别留 '[]' 噪声
      return;
    }
    const entries: PendingEntry[] = queue.map((progress) => ({ scope, progress }));
    localStorage.setItem(pendingKey(), JSON.stringify(entries));
  } catch { /* 忽略配额 */ }
}

function enqueuePending(p: Progress): void {
  const queue = readPending();
  queue.push(p);
  writePending(queue);
}

/* ── RPC 调用 + 重试 ───────────────────────────────────────────────────── */

const RETRY_DELAYS_MS = [1000, 2000];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => { setTimeout(resolve, ms); });
}

/** 单次保存：返回宿主回写的权威 progress（宿主可能做了跨端 merge），无有效回值时返回 null。 */
async function postOnce(p: Progress): Promise<Progress | null> {
  if (!rpc) throw new Error('RPC 未绑定（StudyApp 未收到 call prop）');
  const res = await rpc(ENDPOINT_SAVE, { progress: p });
  const returned = (res as { progress?: unknown } | null)?.progress;
  return isValidProgress(returned) ? (returned as Progress) : null;
}

async function postWithRetry(p: Progress): Promise<Progress | null> {
  let lastError: unknown = null;
  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    try {
      return await postOnce(p);
    } catch (err) {
      lastError = err;
      const wait = RETRY_DELAYS_MS[attempt];
      if (wait === undefined) break;
      await delay(wait);
    }
  }
  throw lastError ?? new Error('progress.save 失败');
}

/* ── 对外 API（签名与老站逐字一致） ─────────────────────────────────────── */

/** 本地模式：宿主一定在，恒 false（保留导出供老 UI 的兼容分支使用）。 */
export function isLocalMode(): boolean {
  return false;
}

/** 加载：优先用挂载时注入的 snapshot.progress；没有则退化为取 'snapshot' RPC。
 *  远端快照与本地乐观缓存 merge 后返回（保留"GET 期间乐观写入不被覆盖"的老语义）。 */
export async function loadProgress(): Promise<Progress> {
  if (primed) {
    const p = primed;
    writeLocal(p);
    notify('saved');
    return p;
  }
  const cached = readLocal();
  if (!rpc) {
    notify('error');
    return cached;
  }
  try {
    const snapshot = (await rpc(ENDPOINT_SNAPSHOT)) as { progress?: unknown } | null;
    const remote = snapshot?.progress;
    if (!isValidProgress(remote)) {
      notify('remote-invalid');
      return cached;
    }
    const merged = mergeProgress(cached, remote);
    writeLocal(merged);
    notify('saved');
    return merged;
  } catch {
    // 宿主暂时拿不到快照：本浏览器缓存兜底，banner 提示（非本地模式）
    notify('error');
    return cached;
  }
}

/** flush pending 队列：把所有本 scope 的快照逐个发给宿主（宿主侧 merge）。 */
export async function flushPending(): Promise<boolean> {
  const queue = readPending();
  if (queue.length === 0) return true;
  try {
    for (const snap of queue) {
      const persisted = await postWithRetry(snap); // 每个快照独立重试
      if (persisted) writeLocal(persisted);
    }
    writePending([]);
    notify('saved');
    return true;
  } catch {
    notify('error');
    return false;
  }
}

/** 保存：先写本地乐观缓存，再串行发 RPC（宿主为权威）。
 *  串行化保证写入顺序 = 调用顺序（并发 RPC 会乱序覆盖）；失败重试 3 次后入 pending。 */
let saveChain: Promise<void> = Promise.resolve();
export function saveProgress(p: Progress): Promise<void> {
  writeLocal(p); // 乐观：立即写本地
  saveChain = saveChain
    .then(async () => {
      const persisted = await postWithRetry(p);
      if (persisted) writeLocal(persisted); // 宿主可能 merge 过：以回写值为缓存真值
      notify('saved');
    })
    .catch(() => {
      enqueuePending(p);
      notify('error');
    });
  return saveChain;
}
