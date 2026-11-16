import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { zh } from './locales/zh';
import { en, enSingular } from './locales/en';
import { useProgress } from '../hooks/useProgress';
import type { UiLang } from '../types';

import type { TKey } from './locales/zh';
export type { TKey };

/** t(key, vars)：查当前语言词典 → 缺 key 回退 zh → 仍缺回退 key 名；{name} 占位符替换。 */
export type TFn = (key: TKey, vars?: Record<string, string | number>) => string;

/** 语言切换菜单（code + 语言自称名——永远用语言本身的名字显示，不翻译）。
 *  新形态只保留中英两种：宿主面板的语言跟着宿主走，不再支持 5 语。 */
export const LANGUAGES: { code: UiLang; label: string }[] = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
];

const DICTS: Record<UiLang, Record<TKey, string>> = { zh, en };

const LS_KEY = 'ask-lang';
const LS_UPDATED_KEY = 'ask-lang-updated-at';

export function normalizeLang(v: unknown): UiLang | null {
  return v === 'zh' || v === 'en' ? v : null;
}

function makeT(lang: UiLang): TFn {
  const dict = DICTS[lang] ?? DICTS.zh;
  const singular = lang === 'en' ? enSingular : null;
  return (key, vars) => {
    // 英文单数：n === 1 时优先用单数句，避免 "1 wrong answers" / "1 days"
    const one = singular && Number(vars?.n) === 1 ? singular[key] : undefined;
    let s = one ?? dict[key] ?? zh[key] ?? String(key);
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        s = s.split(`{${k}}`).join(String(v));
      }
    }
    return s;
  };
}

/** 首次访问（无存储偏好）按浏览器语言挑一个支持的语言；都不匹配回退 en。 */
function detectLang(): UiLang {
  try {
    const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const tag of tags) {
      const primary = String(tag).toLowerCase().split('-')[0];
      const hit = normalizeLang(primary);
      if (hit) return hit;
    }
  } catch { /* SSR / 隐私模式 */ }
  return 'en';
}

/** 读 localStorage 语言偏好。无值（首次访问）→ 按浏览器语言探测。 */
function readLocalLang(): UiLang {
  try {
    const hit = normalizeLang(localStorage.getItem(LS_KEY));
    if (hit) return hit;
  } catch { /* 配额/隐私模式 */ }
  return detectLang();
}

interface I18nCtxValue {
  lang: UiLang;
  setLang: (l: UiLang) => void;
  t: TFn;
}

const I18nCtx = createContext<I18nCtxValue | null>(null);

/** UI 语言 Provider（新形态）：
 *   - 初始语言优先级：宿主快照 settings.lang（initialLang）→ progress.lang（跨设备同步值）
 *     → 本地存储 → 浏览器语言 → en；
 *   - 切换语言：写本地 + 经 useProgress.setLang 写 progress（由宿主 merge 落盘，不直接碰 settings）；
 *   - 不再改 document.documentElement.lang / document.title（DSH 宿主页的 <html> 不归本面板管，
 *     面板自身要的语言标注由 StudyApp 根节点承载）。 */
export function I18nProvider({ children, initialLang }: { children: ReactNode; initialLang?: UiLang }) {
  const { progress, loaded, setLang: setLangProgress } = useProgress();
  const [lang, setLangState] = useState<UiLang>(() => normalizeLang(initialLang) ?? readLocalLang());

  // 快照 settings.lang 变了（切项目/宿主改设置）→ 跟过去；progress.lang 有值也算此类偏好。
  useEffect(() => {
    const fromSettings = normalizeLang(initialLang);
    if (fromSettings) {
      setLangState(fromSettings);
      try { localStorage.setItem(LS_KEY, fromSettings); } catch { /* */ }
    }
  }, [initialLang]);

  // progress 加载后：远端语言比本地更新（跨设备同步）时采用远端值（LWW，沿用老仲裁规则）。
  // 但宿主给了 settings.lang（initialLang）时以宿主为准：设置归 contract 的 settings.set 管，
  // 再让 progress.lang 用时间戳压回来会和 chrome 的语言菜单互相打架。
  useEffect(() => {
    if (!loaded) return;
    if (normalizeLang(initialLang)) return;
    const remoteLang = normalizeLang(progress.lang);
    const remoteTs = progress.langUpdatedAt ?? 0;
    if (!remoteLang) return;
    let localTs = 0;
    try { localTs = parseInt(localStorage.getItem(LS_UPDATED_KEY) ?? '0', 10) || 0; } catch { /* */ }
    if (remoteTs > localTs) {
      try {
        localStorage.setItem(LS_KEY, remoteLang);
        localStorage.setItem(LS_UPDATED_KEY, String(remoteTs));
      } catch { /* */ }
      setLangState(remoteLang);
    }
  }, [loaded, initialLang, progress.lang, progress.langUpdatedAt]);

  const t = useMemo(() => makeT(lang), [lang]);

  /** 切换语言：写本地 + 经 useProgress.setLang 写 progress（宿主侧持久化）。 */
  const setLang = useCallback((l: UiLang) => {
    const next = normalizeLang(l) ?? 'zh';
    const now = Date.now();
    try {
      localStorage.setItem(LS_KEY, next);
      localStorage.setItem(LS_UPDATED_KEY, String(now));
    } catch { /* */ }
    setLangState(next);
    setLangProgress(next);
  }, [setLangProgress]);

  return (
    <I18nCtx.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nCtx.Provider>
  );
}

/** 从 <I18nProvider> 取语言状态与 t()。必须在 <I18nProvider> 内调用。 */
export function useI18n(): I18nCtxValue {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error('useI18n must be used within <I18nProvider>');
  return ctx;
}
