import type { ThemeConfig } from '../lib/themeConfig';

/** 主题显示配置 —— 可注入的活绑定（老站 = src/data/theme-config.json，由 sync 从
 *  examples/<theme>/theme-config.json 拷来）。
 *
 *  改写成活绑定的原因：新形态没有构建期 JSON，配置由宿主经 RPC `snapshot` 的
 *  `data.themeConfig` 下发，且在「切换主题」后会变化。
 *  ⚠️ 消费侧有两个层次：
 *    1. 函数默认参数（topicLabel/layerOf/isPlanned/... 的 `cfg = themeConfig`）——
 *       调用时读绑定，天然是活的，无需刷新；
 *    2. 模块级派生长量（lib/themeConfig 的 LAYER_TOPICS、lib/topicOrder 的
 *       TOPIC_ORDER / SOURCE_LABELS）——它们只在模块初始化时算一次，
 *       必须在注入后调用 refreshThemeConfigDerived() / refreshTopicOrderDerived()
 *       重算（StudyApp.applySnapshot 已按此顺序调用）。
 *  空配置 = 全字段缺省回退语义（原样显示 topic/source、按字母序、无层概念）。 */
export let themeConfig: ThemeConfig = {};

export function setThemeConfig(value: ThemeConfig | null | undefined): void {
  themeConfig = value && typeof value === 'object' ? value : {};
}
