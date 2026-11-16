import { useMemo } from 'react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StudyTabs } from '../chrome.jsx';
import { Home } from './pages/Home';
import { Practice } from './pages/Practice';
import { FlashcardsHome } from './pages/FlashcardsHome';
import { Flashcards } from './pages/Flashcards';
import { Panorama } from './pages/Panorama';
import { ProgressProvider, useProgress } from './hooks/useProgress';
import { ThemeProvider } from './lib/theme';
import { I18nProvider } from './i18n';
import { ConfirmProvider } from './components/ConfirmDialog';
import { bindRpc, primeProgress, setProgressScope } from './api/progressClient';
import { bindHostSettings } from './api/hostBridge';
import { setQuestions } from './data/questions';
import { setFlashcards } from './data/flashcards';
import { setPlan } from './data/plan';
import { setCoverage } from './data/coverage';
import { setThemeMeta } from './data/theme';
import { setThemeConfig } from './data/theme-config';
import { setCourses } from './data/courses';
import { refreshThemeConfigDerived } from './lib/themeConfig';
import { refreshTopicOrderDerived } from './lib/topicOrder';
import { normalizeLang } from './i18n';

/** 宿主快照（src/shared/contract.js 的 Snapshot；这里只用到的字段，全部可缺省 —— 坏数据必须回退不崩）。 */
export interface Snapshot {
  project?: { root?: string; source?: string; legacy?: boolean };
  themes?: { slug: string; title: string; questionCount: number; cardCount: number }[];
  theme?: string | null;
  data?: {
    questions?: unknown;
    flashcards?: unknown;
    plan?: unknown;
    themeConfig?: unknown;
    theme?: unknown;
    coverage?: unknown;
  };
  progress?: unknown;
  settings?: { extOn?: boolean; autoAdvance?: boolean; dailyNewCards?: number; lang?: string };
  warnings?: string[];
}

export interface StudyAppProps {
  snapshot: Snapshot;
  /** 宿主 RPC 调用器（createRpc 的 call）。缺省时进度退回「只读本地缓存」的降级模式。 */
  call?: (endpoint: string, payload?: unknown) => Promise<any>;
  onSetProject?: (root: string) => Promise<unknown> | void;
  onSetTheme?: (slug: string) => Promise<unknown> | void;
  onSetSettings?: (patch: Record<string, unknown>) => Promise<unknown> | void;
}

/**
 * 把快照里的主题数据灌进各 data/* 的活绑定模块。
 * ⚠️ 必须在渲染树之前**同步**调用（不是 useEffect）：子组件首帧就要读到数据；
 * 模块级派生常量（LAYER_TOPICS / TOPIC_ORDER / SOURCE_LABELS）也要在这里重算。
 * 幂等：同一快照重复调用只是重写同样的值。
 */
export function applySnapshot(snapshot: Snapshot | null | undefined): void {
  const data = snapshot?.data ?? {};
  setThemeMeta(data.theme as { theme?: string; examPoints?: Record<string, string>; examDays?: Record<string, string> } | undefined);
  setThemeConfig(data.themeConfig as object | undefined);
  refreshThemeConfigDerived();
  refreshTopicOrderDerived();
  setQuestions(data.questions as any[] | undefined);
  setFlashcards(data.flashcards as any[] | undefined);
  setPlan(data.plan as { units?: unknown[] } | undefined);
  setCoverage(data.coverage as never);
  // 契约里没有课程清单（本期课程页不接入）→ 恒空， Panoramas 的课程链接自然为空。
  setCourses(undefined);
}

/** 用宿主 settings 播种 progress.settings：老页面全部从 progress.settings 读偏好
 *  （Practice 的拓展题开关、Flashcards 的每日新卡额度），而新形态的权威设置是 snapshot.settings。
 *  已有 progress.settings 的字段优先（用户在面板内改过的值不能被旧设置盖掉），缺的用宿主值补。 */
function seedProgress(progress: unknown, settings: Snapshot['settings']): unknown {
  if (!settings) return progress;
  const base = (progress && typeof progress === 'object' ? progress : {}) as Record<string, unknown>;
  const prev = (base.settings && typeof base.settings === 'object' ? base.settings : {}) as Record<string, unknown>;
  const seeded: Record<string, unknown> = { ...prev };
  if (seeded.extOn === undefined && typeof settings.extOn === 'boolean') seeded.extOn = settings.extOn;
  if (seeded.autoAdvance === undefined && typeof settings.autoAdvance === 'boolean') seeded.autoAdvance = settings.autoAdvance;
  if (seeded.dailyNewCards === undefined && typeof settings.dailyNewCards === 'number') seeded.dailyNewCards = settings.dailyNewCards;
  return { ...base, settings: seeded };
}

/** 等进度就绪：加载期间只给一行占位（页面普遍假设 progress 已到）。 */
function RoutesGate() {
  const { loaded } = useProgress();
  if (!loaded) return <div className="p-8 text-center text-text-muted">…</div>;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/practice/:mode" element={<Practice />} />
      {/* /read 已并入 Practice 的看题模式，旧链接重定向到首页 */}
      <Route path="/read" element={<Navigate to="/" replace />} />
      <Route path="/flashcards" element={<FlashcardsHome />} />
      <Route path="/flashcards/review" element={<Flashcards />} />
      <Route path="/panorama" element={<Panorama />} />
    </Routes>
  );
}

/**
 * 学习台主面板（DSH 客户端插件形态）。
 * 结构与老站一致（进度 → 语言 → 主题 → 确认框 → 路由），但：
 *  - 路由用 MemoryRouter（宿主页面里没有地址栏，也没有 basename）；
 *  - 顶部导航交给宿主提供的 StudyTabs（chrome.jsx），本组件只负责给它透传回调；
 *  - 数据与进度都来自宿主快照/RPC（见 applySnapshot + progressClient），不再走 HTTP/构建期 JSON；
 *  - 不碰 <html>、不接管暗色（宿主根容器 .dsh-study-root 自己带 .dark）。
 */
export function StudyApp({ snapshot, call, onSetProject, onSetTheme, onSetSettings }: StudyAppProps) {
  // 同步注入：同一次 render 里子组件即读得到数据/进度
  setProgressScope({ projectRoot: snapshot?.project?.root ?? '', theme: snapshot?.theme ?? '' });
  bindRpc(call);
  bindHostSettings(onSetSettings);
  primeProgress(seedProgress(snapshot?.progress, snapshot?.settings) as never);
  applySnapshot(snapshot);

  const initialLang = useMemo(() => normalizeLang(snapshot?.settings?.lang), [snapshot?.settings?.lang]);

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-bg-app text-text-primary overflow-hidden">
      <ProgressProvider>
        <I18nProvider initialLang={initialLang}>
          <ThemeProvider>
            <ConfirmProvider>
              <MemoryRouter initialEntries={['/']}>
                <StudyTabs
                  snapshot={snapshot}
                  onSetProject={onSetProject}
                  onSetTheme={onSetTheme}
                  onSetSettings={onSetSettings}
                />
                <main className="flex-1 min-h-0 overflow-auto">
                  <RoutesGate />
                </main>
              </MemoryRouter>
            </ConfirmProvider>
          </ThemeProvider>
        </I18nProvider>
      </ProgressProvider>
    </div>
  );
}
