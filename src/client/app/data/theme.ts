/** 主题元信息 —— 可注入的活绑定（宿主经 RPC `snapshot` 的 `data.theme` 下发，
 *  shape = 老站 src/data/theme.json：{ theme, examPoints?, examDays? }）。
 *
 *  为什么是「可变的默认导出对象」而不是 `export let`：页面按老代码原样
 *  `import themeMeta from '../data/theme'`（老文件名 theme.json = JSON 默认导出），
 *  并以 `(themeMeta as {theme:string}).theme` 的形式**每次渲染现场读属性**。
 *  保持「同一个对象、原地改属性」即可让页面零改动地看到注入后的值。 */
export interface ThemeMeta {
  theme: string;
  /** 考点 → 显示名（theme.json 的 examPoints） */
  examPoints: Record<string, string>;
  /** 考点 → 学习日（theme.json 的 examDays） */
  examDays: Record<string, string>;
}

const themeMeta: ThemeMeta = { theme: '', examPoints: {}, examDays: {} };

export default themeMeta;

function asStringMap(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object') return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    if (typeof v === 'string') out[k] = v;
  }
  return out;
}

/** 注入：原地改 default 导出对象的属性（不要替换对象引用）。 */
export function setThemeMeta(value: Partial<ThemeMeta> | null | undefined): void {
  themeMeta.theme = typeof value?.theme === 'string' ? value.theme : '';
  themeMeta.examPoints = asStringMap(value?.examPoints);
  themeMeta.examDays = asStringMap(value?.examDays);
}
