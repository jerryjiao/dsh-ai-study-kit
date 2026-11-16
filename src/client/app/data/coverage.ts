import type { CoverageSnapshot } from '../lib/panorama';

/** 覆盖快照 —— 可注入的活绑定（宿主经 RPC `snapshot` 的 `data.coverage` 下发）。
 *  缺失时回退「空覆盖」：无考点、无图，全景退化为纯进度视图（不应崩）。
 *  ⚠️ 恒为合法 CoverageSnapshot 形状，消费端（buildPanorama）不再判 null。 */
export const EMPTY_COVERAGE: CoverageSnapshot = {
  theme: '',
  generatedAt: '',
  courseTaughtAll: false,
  points: [],
  graph: null,
};

export let coverage: CoverageSnapshot = EMPTY_COVERAGE;

export function setCoverage(value: CoverageSnapshot | null | undefined): void {
  coverage = value && typeof value === 'object' && Array.isArray((value as CoverageSnapshot).points)
    ? (value as CoverageSnapshot)
    : { ...EMPTY_COVERAGE, points: [] };
}
