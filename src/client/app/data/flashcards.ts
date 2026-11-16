import type { Flashcard } from '../types';

/** 闪卡 —— 可注入的活绑定（宿主经 RPC `snapshot` 的 `data.flashcards` 下发）。
 *  语义见 data/questions.ts 顶部注释：活绑定保证页面 `import { flashcards }` 零改动。 */
export let flashcards: Flashcard[] = [];

export function setFlashcards(value: Flashcard[] | null | undefined): void {
  flashcards = Array.isArray(value) ? value : [];
}
