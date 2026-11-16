import type { Question } from '../types';

/** 题库 —— 可注入的活绑定（宿主经 RPC `snapshot` 的 `data.questions` 一次性下发）。
 *
 *  为什么用 `export let` 而非 `export const`：「构建期 JSON 产物」在新形态里不存在了，
 *  数据由宿主在挂载前灌进来（StudyApp 顶部的 applySnapshot()），页面在**同一次渲染**里
 *  就要读到真实数据。ESM 的具名导出是活绑定（live binding），页面侧 `import { questions }`
 *  的写法与老站逐字一致，赋值后自动可见——所以所有页面组件零改动。
 *
 *  读取时机约定：只允许在 render / 事件回调里读，不要在模块顶层把值拷进常量
 *  （那会在灌数据之前就固化空数组）。 */
export let questions: Question[] = [];

/** 宿主注入入口：仅 StudyApp.applySnapshot 调用。 */
export function setQuestions(value: Question[] | null | undefined): void {
  questions = Array.isArray(value) ? value : [];
}
