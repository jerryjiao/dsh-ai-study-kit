/** 课程清单 —— 可注入的活绑定（老站 shape = src/data/courses.json：
 *  { theme, lessons: [{ file, title, topic? }] }）。
 *
 *  本次新形态**不接入课程页**（快照契约里没有课程数据），因此这里恒为空清单：
 *  全景页仍按老代码读 `coursesMeta.lessons` 派生「课→考点」的覆盖来源，
 *  空数组 = 无课程来源、只剩答题/闪卡证据（语义正确，不是静默降级为错误数据）。 */
export interface CourseLesson {
  file: string;
  title: string;
  topic?: string;
}

export interface CoursesMeta {
  theme: string;
  lessons: CourseLesson[];
}

const coursesMeta: CoursesMeta = { theme: '', lessons: [] };

export default coursesMeta;

/** 注入课程清单（保留导出名不变；后续若契约加了 courses，只需在 applySnapshot 里调用它）。 */
export function setCourses(value: Partial<CoursesMeta> | null | undefined): void {
  coursesMeta.theme = typeof value?.theme === 'string' ? value.theme : '';
  coursesMeta.lessons = Array.isArray(value?.lessons)
    ? (value!.lessons as CourseLesson[]).filter((l) => l && typeof l.file === 'string' && typeof l.title === 'string')
    : [];
}
