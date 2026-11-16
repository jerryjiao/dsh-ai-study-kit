import type { PlanFile } from '../types';

/** 学习计划 —— 可注入的活绑定（宿主经 RPC `snapshot` 的 `data.plan` 下发）。
 *  缺失时回退空计划 `{ units: [] }`（消费端按「无计划面」回退），语义见 types.PlanFile。
 *  活绑定理由见 data/questions.ts 顶部注释。 */
export let plan: PlanFile = { units: [] };

export function setPlan(value: PlanFile | null | undefined): void {
  plan = value && typeof value === 'object' && Array.isArray((value as PlanFile).units)
    ? (value as PlanFile)
    : { units: [] };
}
