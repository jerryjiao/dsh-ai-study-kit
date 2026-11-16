---
name: study-doctor
description: /study-doctor 一站式体检：串跑题库 QA/结构/四对齐前提的内容自检 + 环境探测（LLM/.env、项目路径、主题、进度与学习痕迹）+ 版本与契约完整性，出过红汇总报告与修复顺序。 One-stop health check: content gates plus environment and version probes.
disable-model-invocation: true
---

# /study-doctor 体检

出问题时、新主题建站后、发布前想快速确认状态——一句话跑完全部校验。主入口见 [`../ask-coach/SKILL.md`](../ask-coach/SKILL.md)。

1. **先探测**（只读）：按 [`../../references/state.md`](../../references/state.md) §1 解析激活主题（体检里的四对齐校验要主题目录）。
2. **进流程**：按 [`../ask-coach/references/flows.md`](../ask-coach/references/flows.md) **「体检（study-doctor）」** 节执行——内容自检（题库 QA / JSON 结构 / 排布表前提，命令与 F8 同源）+ 环境探测（LLM 三项、TTS、项目路径与主题清单、进度与 `study/records` 学习痕迹）+ 版本与契约完整性（插件快照 vs 最新发布、是否残留旧 `kit/` 布局、排布表/examPoint 标记/闪卡映射缺口——只报事实与补法，走 F13 补）逐项跑，按该节模板输出过/红汇总报告与**建议修复顺序**。

零新校验逻辑：全是对既有命令的编排聚合；发布前的最后一道门（含 build）仍走 /ask-coach 的 F8。

不是体检的活（想学 → /study-coach、错题串讲 → /study-recap、其他 → /ask-coach 路由），说一句该去哪。
