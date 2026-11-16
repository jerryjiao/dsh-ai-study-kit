/**
 * 宿主 ↔ 页面 的单一契约（两端都 import 本文件，禁止各写一份）。
 *
 * 通道用 loopback 权威：学习台只服务本机 DSH 页面，不对外暴露。
 * 端点全部是「请求 → 响应」一问一答；没有服务器推送（页面需要新数据就再调一次）。
 */

/** connection.rpc 通道名（客户端 call 与宿主 handle 必须一致）。 */
export const RPC_CHANNEL = '/dsh-ai-study-kit';

/** 只允许本机页面调用。 */
export const RPC_AUTHORITY = 'loopback';

/** 端点名。用常量对象避免两端字符串漂移。 */
export const ENDPOINTS = {
  /** 读全量快照：项目/主题列表/当前主题内容/进度/偏好。页面启动与切主题后各调一次。 */
  snapshot: 'snapshot',
  /** 写进度（整份 Progress），宿主权威合并后返回合并结果。 */
  saveProgress: 'progress.save',
  /** 换项目根目录（用户在下拉里选或手填路径）。 */
  setProject: 'project.set',
  /** 换激活主题（写回 progress.theme + 偏好）。 */
  setTheme: 'theme.set',
  /** 改组偏好（每日新卡数等），patch 合并。 */
  setSettings: 'settings.set',
};

/**
 * 快照形状（Host 生产，页面消费）。字段缺失时页面按空数据回退，绝不抛错。
 * @typedef {object} Snapshot
 * @property {{root: string, source: 'remembered'|'home'|'cwd'|'manual'|'none', legacy: boolean}} project
 *   项目根、探测来源、是否旧结构（kit/apps/quiz-app 布局，仅提示迁移）。
 * @property {Array<{slug: string, title: string, questionCount: number, cardCount: number}>} themes
 *   可用主题列表（examples/<slug>/）。
 * @property {string|null} theme 当前激活主题 slug。
 * @property {ThemeData} data 当前主题内容（无主题时为空数据）。
 * @property {object} progress 进度快照（version 1）。
 * @property {object} settings 偏好 {extOn, autoAdvance, dailyNewCards, lang}。
 * @property {string[]} warnings 非致命问题（缺文件、主题为空、旧结构提示…），页面显示为提示条。
 */

/**
 * @typedef {object} ThemeData
 * @property {Array<object>} questions 题库（examples/<theme>/questions.json）
 * @property {Array<object>} flashcards 闪卡
 * @property {{units: Array<object>}} plan 学习计划（缺失时 {units: []}）
 * @property {object} themeConfig 主题显示配置（缺失时 {}）
 * @property {{theme: string, examPoints: Record<string,string>, examDays: Record<string,string>}} theme
 *   由 MISSION.md 排布表派生（等价于老 src/data/theme.json）。
 * @property {object} coverage 考点覆盖快照（等价于老 src/data/coverage.json）。
 */

/** 默认偏好（与老实现 settings 默认值一致）。 */
export const DEFAULT_SETTINGS = {
  extOn: true,
  autoAdvance: true,
  dailyNewCards: 20,
  lang: 'zh',
};

/** 偏好里允许被 patch 的键（白名单，防止页面写进任意字段）。 */
export const SETTINGS_KEYS = Object.keys(DEFAULT_SETTINGS);

/** 快照里「没有项目 / 没有主题」时的空数据，两端口径一致。 */
export function emptyThemeData() {
  return {
    questions: [],
    flashcards: [],
    plan: { units: [] },
    themeConfig: {},
    theme: { theme: '', examPoints: {}, examDays: {} },
    coverage: { theme: '', generatedAt: null, courseTaughtAll: false, points: [] },
  };
}

/** 空快照：宿主在读不到项目时也能给页面一个合法响应。 */
export function emptySnapshot() {
  return {
    project: { root: '', source: 'none', legacy: false },
    themes: [],
    theme: null,
    data: emptyThemeData(),
    progress: { version: 1, answers: {} },
    settings: { ...DEFAULT_SETTINGS },
    warnings: [],
  };
}
