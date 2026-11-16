/** 宿主设置接缝：把面板内「学习偏好变更」回传给宿主（contract: settings.set）。
 *
 *  老站把 extOn / autoAdvance / dailyNewCards / lang 都存在 progress.settings 里（跟着进度跨设备同步）。
 *  新形态里这些是**宿主设置**（src/shared/contract.js 的 DEFAULT_SETTINGS），宿主是唯一权威：
 *  - 读：StudyApp 用快照 settings 播种 progress.settings（见 seedProgress），页面代码不用改；
 *  - 写：useProgress 内部在改完本地 progress 后调 persistHostSettings(patch) 通知宿主。
 *  面板可能在没有宿主回调的降级环境下跑（单测/预览），所以这里允许 null —— 只写本地，不报错。 */

type HostSetSettings = (patch: Record<string, unknown>) => Promise<unknown> | void;

let setSettings: HostSetSettings | null = null;

/** 绑定宿主的 settings.set 回调（StudyApp 在渲染前同步调用；传 null 解绑）。 */
export function bindHostSettings(fn: HostSetSettings | null | undefined): void {
  setSettings = typeof fn === 'function' ? fn : null;
}

/** 把设置 patch 回传宿主；宿主未接线时静默忽略（本地 progress 仍已更新）。 */
export function persistHostSettings(patch: Record<string, unknown>): void {
  if (!setSettings) return;
  try {
    void Promise.resolve(setSettings(patch)).catch(() => { /* 宿主侧失败不回滚本地乐观值 */ });
  } catch { /* 同步抛错同样忽略 */ }
}
