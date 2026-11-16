// 兼容入口：常量 + 中英文案（组件按 lang 取，页面不再直接写死中文）
export {
  PRODUCT,
  REPO_URL,
  LICENSE,
  VERSION,
  INSTALL_CMD,
  type Lang,
} from './site-constants';

import { getSite } from './site-content';

export { getSite, langPath, shotPath, alternatePath, type SiteContent } from './site-content';

/** 中文前置条件（zh 页面直接引用；英文页面用 getSite('en').meta.prereq） */
export const PREREQ = getSite('zh').meta.prereq;
