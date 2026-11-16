/**
 * 学习项目探测（Host 半，纯 node 内置模块，无第三方依赖）。
 *
 * 「学习项目」= 用户自己的一个纯数据目录（见 GLOSSARY.md / ADR 0003）：
 *
 *   <项目根>/examples/<theme>/   主题数据（questions.json、flashcards.json、plan.json、theme-config.json、lessons/）
 *   <项目根>/progress.json       唯一进度真源
 *   <项目根>/study/              学习者私有记录
 *
 * 判据只看的是一条：**存在 examples/ 目录**。这里刻意不检查 package.json：插件装在有
 * package.json 的用户目录里也能工作（GLOSSARY 里那条判据是给 agent 认「kit 仓库」用的，不是
 * 给宿主探测数据目录用的）。
 *
 * 旧结构（legacy）识别：集成前的学习项目从 kit 仓库里拷出来，examples/ 埋在仓库路径下——
 * `kit/apps/quiz-app/examples/`（ADR 0003 写的旧位置）或 `kit/examples/`（本仓库的 kit 布局，
 * sync-examples 的 REPO_ROOT 就是 kit/）。命中时把 root 收敛到「含 examples/ 的那一层」，
 * 这样 content.js / progress.js 永远只需要关心 `<root>/examples/<slug>` 与 `<root>/progress.json`。
 * legacy=true 只用于提示迁移，不影响读取。
 */

import { existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

/** examples/ 目录名（主题数据的固定入口）。 */
const EXAMPLES_DIR = 'examples';

/**
 * 旧结构候选（相对传入目录）：命中第一个存在的，root 收敛到含 examples/ 的那一层。
 * 顺序按「越靠近仓库根越具体」排：kit/apps/quiz-app 布局优先，再退到 kit 布局。
 */
const LEGACY_PARENTS = [
  ['kit', 'apps', 'quiz-app'],
  ['kit'],
  ['apps', 'quiz-app'],
];

/** 目录存在性（坏路径 / 权限错误一律 false，不抛错——探测流程要能穿过不存在的候选）。 */
function isDir(p) {
  if (!p) return false;
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}

/**
 * 把一个候选路径解析成学习项目根。
 * @param {string} candidate 用户填的 / 记住的 / 推算出的目录
 * @returns {{root: string, legacy: boolean} | null} 不是学习项目时 null
 */
export function findStudyRoot(candidate) {
  if (!candidate || typeof candidate !== 'string') return null;
  const abs = resolve(candidate);
  if (!isDir(abs)) return null;
  // 现行轻结构：目录本身就是项目根
  if (isDir(join(abs, EXAMPLES_DIR))) return { root: abs, legacy: false };
  // 旧结构：项目根在仓库路径下，examples/ 不直接在候选目录里
  for (const parts of LEGACY_PARENTS) {
    const base = join(abs, ...parts);
    if (isDir(join(base, EXAMPLES_DIR))) return { root: base, legacy: true };
  }
  return null;
}

/**
 * 是否是学习项目（现行或旧结构都算）。
 * @param {string} root 待探测目录
 * @returns {boolean}
 */
export function isStudyProject(root) {
  return findStudyRoot(root) !== null;
}

/**
 * 按既定顺序探测学习项目。
 *
 * 顺序（用户最终确认，2026-11-16）：remembered → cwd → `<home>/study-kit`。先命中先返回；全不命中返回
 * `{root:'', source:'none', legacy:false}`（不抛错，页面按空项目回退）。
 *
 * @param {object} p
 * @param {string} [p.remembered] 上次记住的项目根（偏好里存的路径）
 * @param {string} [p.cwd] 会话工作目录
 * @param {string} [p.home] 用户家目录（DSH 进程的 HOME）
 * @returns {{root: string, source: 'remembered'|'home'|'cwd'|'none', legacy: boolean}}
 */
export function detectProject({ remembered, cwd, home } = {}) {
  // 顺序（用户最终确认，2026-11-16，纠正 task-2 初稿的 cwd 优先）：
  // remembered → cwd → home。
  // remembered 必须最先：学习台是全场局面板，没有「会话」概念，cwd 只能是宿主进程的启动目录，
  // 经常与学习项目无关；用户手选/上次记住的路径才是他的意图，不能被无关 cwd 覆盖。
  const candidates = [
    [remembered, 'remembered'],
    [cwd, 'cwd'],
    [home ? join(home, 'study-kit') : '', 'home'],
  ];
  for (const [candidate, source] of candidates) {
    const hit = findStudyRoot(candidate);
    if (hit) return { root: hit.root, source, legacy: hit.legacy };
  }
  return { root: '', source: 'none', legacy: false };
}

/** 供宿主做「用户手填路径」校验时复用（与 detectProject 的判定同一份逻辑）。 */
export { isDir as isDirectory };
