import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

/** 主题偏好三态：浅色 / 深色 / 跟随系统（prefers-color-scheme）。
 *
 *  ⚠️ 新形态（DSH 面板）里「深色」不归本应用管：
 *   - 宿主页的 <html>/<body> 属于 DSH 全局，本面板**绝不**改 document.documentElement；
 *   - 面板根节点 `.dsh-study-root`（src/client/index.jsx 渲染）承载暗色：chrome.jsx 在它上面
 *     toggle `.dark`，src/client/app.css 的 `.dark` 令牌块随之覆盖；
 *   - 开关存在宿主约定键 `dsh-ai-study-kit-theme` 里，chrome 写 `'1'`/`'0'`，本 Provider 只读同一键
 *     并以根节点上的实际 `.dark` 类为准（MutationObserver 跟随），**不抢着改** —— 避免两边打架。
 *
 *  老实现的 `setMode → useProgress.setTheme` 被删除：契约里 progress.theme 是「学习主题 slug」
 *  （见 src/shared/contract.js），写 UI 明暗进去会污染内容主题选择。 */
export type ThemeMode = 'light' | 'dark' | 'system';

/** 与 chrome.jsx 共用的键（值为 '1' = 深色，'0' = 浅色；兼容 'light'/'dark'/'system' 写法）。 */
const LS_KEY = 'dsh-ai-study-kit-theme';
/** 面板内广播模式变更的事件名（chrome 可监听；不监听也不会坏）。 */
export const THEME_EVENT = 'dsh-ai-study-kit:theme';
const DEFAULT_MODE: ThemeMode = 'system';
/** 面板根节点选择器（与 src/client/index.jsx 渲染的容器一致）。 */
const ROOT_SELECTOR = '.dsh-study-root';

interface ThemeCtxValue {
  mode: ThemeMode;               // 用户选择的模式（'system' = 跟随系统）
  resolvedDark: boolean;         // 实际是否深色（以根节点上的 .dark 类为准）
  setMode: (m: ThemeMode) => void;
}

const ThemeCtx = createContext<ThemeCtxValue | null>(null);

function resolveDark(mode: ThemeMode, systemDark: boolean): boolean {
  if (mode === 'dark') return true;
  if (mode === 'light') return false;
  return systemDark; // system
}

/** 读存储：chrome 的 '1'/'0' 优先，也认 'light'/'dark'/'system'。无值 → system。 */
function readLocalMode(): ThemeMode {
  try {
    const v = localStorage.getItem(LS_KEY);
    if (v === '1') return 'dark';
    if (v === '0') return 'light';
    if (v === 'light' || v === 'dark' || v === 'system') return v;
  } catch { /* 配额/隐私模式 */ }
  return DEFAULT_MODE;
}

/** 写存储：对 chrome 保持 '1'/'0' 兼容（boolean 语义），system 也落 '0' 由系统解析兜底。 */
function writeLocalMode(mode: ThemeMode, systemDark: boolean): void {
  try {
    localStorage.setItem(LS_KEY, resolveDark(mode, systemDark) ? '1' : '0');
  } catch { /* 配额 */ }
}

/** 读根节点上当前的 .dark 状态（根还没挂出来时返回 null）。 */
function rootIsDark(): boolean | null {
  if (typeof document === 'undefined') return null;
  const el = document.querySelector(ROOT_SELECTOR);
  return el ? el.classList.contains('dark') : null;
}

/** 把模式落到根节点（只碰 `.dsh-study-root`，永远不碰 <html>）。 */
function applyToRoot(mode: ThemeMode, systemDark: boolean): void {
  if (typeof document === 'undefined') return;
  const el = document.querySelector(ROOT_SELECTOR);
  if (!el) return;
  el.classList.toggle('dark', resolveDark(mode, systemDark));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(readLocalMode);
  const [systemDark, setSystemDark] = useState(
    () => typeof window !== 'undefined'
      && !!window.matchMedia?.('(prefers-color-scheme: dark)').matches,
  );
  const [darkOnRoot, setDarkOnRoot] = useState<boolean | null>(() => rootIsDark());

  // 系统主题变化：仅在 'system' 模式下影响解析结果（chrome 同样监听）。
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // 以根节点 .dark 类为准：chrome 菜单改了类，这里状态跟得上。
  useEffect(() => {
    if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') return;
    setDarkOnRoot(rootIsDark());
    const el = document.querySelector(ROOT_SELECTOR);
    if (!el) return;
    const obs = new MutationObserver(() => setDarkOnRoot(rootIsDark()));
    obs.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // 外部（chrome 菜单 / 其他标签页）改了这个键 → 同步状态
  useEffect(() => {
    const sync = () => setModeState(readLocalMode());
    window.addEventListener('storage', (e) => { if (e.key === LS_KEY) sync(); });
    window.addEventListener(THEME_EVENT, sync);
    return () => window.removeEventListener(THEME_EVENT, sync);
  }, []);

  const resolvedDark = darkOnRoot ?? resolveDark(mode, systemDark);

  /** 切换模式：写本地键 + 落到根节点 + 广播事件（不写 progress：那是内容主题）。 */
  const setMode = useCallback((m: ThemeMode) => {
    writeLocalMode(m, systemDark);
    setModeState(m);
    applyToRoot(m, systemDark);
    setDarkOnRoot(rootIsDark());
    try {
      window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: m }));
    } catch { /* 老浏览器/禁用环境忽略 */ }
  }, [systemDark]);

  return (
    <ThemeCtx.Provider value={{ mode, resolvedDark, setMode }}>
      {children}
    </ThemeCtx.Provider>
  );
}

/** 从 ThemeProvider 取主题状态。必须在 <ThemeProvider> 内调用。 */
export function useTheme(): ThemeCtxValue {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>');
  return ctx;
}
