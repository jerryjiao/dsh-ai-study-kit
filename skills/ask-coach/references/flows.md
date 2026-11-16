# Flow Playbooks · 流程手册

> Step 3 按编号取用。每个流程：**目的 → 前置 → 步骤 → 完成标志**。
> 路径基准：**一律相对用户学习项目根**（`<项目>/`，F1 建的）。插件自带的工具与模板用 `<插件根>/` 前缀（`<插件根>/kit/...`）——那是内容工具快照，不是用户项目，别往里写数据。改文件前先看 SKILL.md 硬红线。
> 文中 `examples/<theme>/` 就是主题源目录，没有第二种形态。
> 公共约定：跨流程交棒只写编号（如「转 F13」），按下表定位文件；高频大流程已拆独立文件（内容只搬不删，与拆分时原 flows.md 的差异仅限同期修复与拆分直链，勿拿 HEAD 直接对拍），低频小流程留在本文件。

## 流程 → 文件（目录，不写行号——行号易漂移）

| 节名 | 住哪 |
|------|------|
| F1 初始化 · F2 开新主题 · F3 每日学习 | 本文件 |
| F4 错题串讲 | [`flows/F4.md`](flows/F4.md) |
| F5 做播客 | [`flows/F5.md`](flows/F5.md) |
| F6 产课 / 加课 | [`flows/F6.md`](flows/F6.md) |
| F7 改内容 · F8 内容自检 · F9 部署（已退役） | 本文件 |
| F10 陪练教学 | [`flows/F10.md`](flows/F10.md) |
| F11 考前冲刺 | [`flows/F11.md`](flows/F11.md) |
| F12 知识图谱投影 · F13 迁移与升级 | 本文件 |
| 体检 · 诊断 | 本文件 |

配套单源（不在本文件）：落盘契约一/契约二/契约三（COACH.md 与学习记录格式、口头答题流水写入口径、plan.json 计划单元状态维护）在 [`../../../references/contracts.md`](../../../references/contracts.md)——F4 产档案、F10 落盘、F11 收割、state.md §3/§7 探测共用；陪练教学法在 [`coach.md`](coach.md)——F10 用。

---

## F1 · 初始化项目（bootstrap，零 clone）

**目的**：从零到「DSH 学习台里看到自己的答题界面」。**用户不需要 GitHub、不需要 clone 仓库、不需要装依赖、不需要起服务**——插件自带内容快照，学习台是 DSH 自带 UI。

**定位插件里的内容快照**：本文件位于 `<插件根>/skills/ask-coach/references/flows.md`，向上三级即插件根，演示主题模板在 `<插件根>/kit/examples/dev-intro/`（找不到就问用户插件装在哪，别去猜绝对路径）。

**第 0 步 · 先探测再分支（写死，存量项目绝不盲拷）**：

```bash
# <项目> = 用户学习项目根（问一次，默认 ~/study-kit/）
test -d <项目>/examples && echo "project=ok" || echo "project=clean"
ls <项目>/examples 2>/dev/null
```

- **有 `examples/`（项目已初始化）** → 不拷贝、不覆盖，直接去第 3 步让用户连接；要加主题走 F2。
- **只有旧形态**（`<项目>/kit/apps/quiz-app/`、`<项目>/kit/examples/`、`<项目>/apps/quiz-app/`）→ **稳步迁移**：不执行任何拷贝，转 F13（备份 → copy → 校验题目/答案计数 → 才删旧数据）。
- **干净目录** → 走下面从零初始化。

**步骤**（仅干净目录）：

1. 选定用户学习项目目录（问一次，默认 `~/study-kit/`），建轻布局并放入演示主题：

   ```bash
   mkdir -p ~/study-kit/examples
   cp -r <插件根>/kit/examples/dev-intro ~/study-kit/examples/dev-intro
   ```

   轻布局就三件：`examples/<theme>/`（内容）、`progress.json`（进度，第一次答题时自动生成在项目根）、`study/`（学习痕迹，教练第一次落盘时建）。**没有 `kit/`、没有 `node_modules`、没有 `.env` 之外的运行时配置。**

2. 在学习台里连接项目：告诉用户打开 DSH 的学习台，在右上角**「项目路径」填上一步的绝对路径**（如 `~/study-kit`），回车即可。这一步是**用户操作**——插件没有「一键创建项目」或目录选择器，别宣称能代填、代建。

3. 确认四个视图都能渲染：**首页**（今日推荐 + 考点掌握度）、**答题**、**闪卡**、**全景**。

4. 告诉用户：这是 dev-intro 演示主题——内容全都不会用，学自己的东西走 F2。

**完成标志**：四个视图都能正常渲染、主题列表里能看到 `dev-intro`。之后默认接力 F2。

**升级**（插件更新后）：不走本流程——轻布局没有 `kit/` 要重拷，内容工具随插件走；要迁移旧目录走 F13。

---

## F2 · 开新主题（new-theme）

**目的**：把用户想学的东西变成完整学习闭环。方法论铁律：**大纲定考什么 → 材料讲概念 → 做题验效果**——顺序不能反，不要上来就刷题。

**步骤**（1-3 各含问用户的确认点，其余直接做）：

1. **定大纲**：问清「学什么主题 + 学到什么程度 + 给谁学」。写成 `examples/<theme>/MISSION.md`（能力大纲，参照 `examples/dev-intro/MISSION.md` 的粒度）。主题名用 kebab-case（如 `react-basics`、`k8s-fundamentals`）。
   - **顺带问一句考期/交付日期**：有就写进 MISSION.md frontmatter `deadline: YYYY-MM-DD`（通用字段，无则整段省略）；用户不想定就不写、不追问——F11 考前冲刺靠它算倒计时，缺了只在快照亮 ⚠，不拦路。
2. **排考点**（产题前的确认点，必须和用户对齐再动笔）：在 MISSION.md 的「## 考点排布表」节排出 `考点id(EP-NN) | 考点 | 深度 | 题型×题量 | day | 闪卡数`：
   - **考点列填核心关键词**——四对齐校验按它做课程/闪卡覆盖与对账，必须是会出现在课程正文和题干里的词（如「暂存区」而不是「git 三区流转的心智模型」）。
   - 深度三档：掌握 / 理解 / 了解；了解级可以 0 卡。
   - 题量配比无硬规定，参考：single:multi:judge ≈ 5:3:2、难度 易:中:难 ≈ 3:5:2——**排布表说了算**。
   - day 是日程标签（D1、D2…），题的 day、闪卡的复习节奏都对齐它。
3. **收材料**：让用户给 2-5 个权威来源（官方文档 > 经典教材 > 博客），写进 `examples/<theme>/RESOURCES.md`（参照 dev-intro 的格式和使用规则）。没有材料就先别产课——AI 凭空讲课违反方法论。
4. **建骨架**（主题一律住项目根的 `examples/<theme>/`，轻布局没有第二种形态）：

   ```bash
   cp -r examples/dev-intro examples/<theme>
   rm examples/<theme>/lessons/*.html
   rm -rf examples/<theme>/study    # 清演示学习痕迹，study/ 子目录由教练产内容时自建
   # questions.json / flashcards.json 里的演示题卡后面整文件替换，无需逐条删
   ```

   项目里没有 dev-intro 可拷时，从插件快照拷：`cp -r <插件根>/kit/examples/dev-intro examples/<theme>`。

5. **产课程**（先看 `.env` 配没配 LLM——配在**项目根**的 `.env`）：写 `examples/<theme>/course-spec.json`（字段：theme/mission/audience/depth/lessonsCount/outline/resources，参照 dev-intro），然后从插件快照跑生成器：

   ```bash
   KIT=<插件根>/kit/apps/quiz-app
   node "$KIT/scripts/teach-generate.mjs" --theme "$PWD/examples/<theme>"
   ```

   没配 AI 就手写 `lessons/*.html`（结构参照现有课程：h1 + meta + lead + h2 小节 + callout + 互链）。

6. **产题**（照表直产，质量门全绿才算本步完成）：照排布表**逐考点**产 `examples/<theme>/questions.json`，整文件替换。Schema 见 `kit/apps/quiz-app/src/types.ts` 的 `Question` 接口。出题纪律：
   - id 用 `<前缀>-NNN` 全局唯一且稳定——进度按 id 存，重产题库保留旧 id 免丢答题历史。
   - `examPoint` 填考点 id（EP-NN）、`day` 对齐表的 day 列——四对齐校验按它们对账，表是权威。
   - `topic` 字段决定首页分组；多选 `answer` 数组必须全对才算对，不出「半对」歧义题。
   - 选项等长、格式不给线索——正确答案不能系统性更长、更规范或带格式提示。
   - 产完即跑质量门，红了对着报错改到绿（这些都是**开发者工具链**，在插件快照/仓库根跑，不在学习项目里跑）：
     ```bash
     node "$KIT/scripts/qa_questions.mjs" --file "$PWD/examples/<theme>/questions.json"
                                              # 最长即答案 / 答案分布 / 选项长度
     pnpm run scan          # 品牌零泄露（插件仓库开发态；脚本是上游 scripts/brand-scan.py，
                            # 本仓库脚本不全时按同一口径人工核）
     pnpm run check:alignment   # 排布表对账（examPoint/day/题量/卡数；同上，开发态）
     ```

7. **产卡**：照排布表的闪卡数列配 `examples/<theme>/flashcards.json`，整文件替换。`闪卡数 ≥ 1` 的考点至少 1 张卡覆盖该考点关键词（四对齐方向 3）；0 卡考点必须是大纲声明的了解级。

8. **切到新主题**：在学习台顶栏选它即可——当前主题记在 `progress.json` 的 `theme` 字段，**没有环境变量要改**。首页分组顺序等呈现定制走主题包 `theme-config.json`（可选，缺什么回退什么；字段照 `examples/dev-intro/theme-config.json`）。

9. **校验**：走 F8（内容自检），全绿才算完成。

**完成标志**：F8 全过 + 学习台顶栏切到新主题后四个视图都是新内容。接力 F3 开始学。

---

## F3 · 每日学习（daily）

**目的**：今天这 20-60 分钟学什么。顺序来自方法论：**先复习（记忆在衰退）→ 再建概念（学没学过的课）→ 后做题验效果 → 错题毕业**。

**前置**：学习台已连接项目（右上「项目路径」= 本项目根，首页显示主题）。没连上就先回 F1 —— 这里没有要起的服务。

**⭐ 断档回归场景（#120，断档 ≥ 3 天）**：快照出现「🔁 断档回归 · 先热身再续站」行时（有计划无计划主题都会出——无 plan.json 主题 noop 也带 `regression.warmup`），本流程从**热身一题**开局（不是直接进步骤 1）——报出 `regression.warmup` 的题号与考点（「先热身：EP-02 分支 · GIT-005，一题找回手感」），学习者答完这题热身即完成，再按下面步骤 1-5 正常续站。带 `regression.shift.available=true` 时顺带报**可重排**建议（#125 升级为可执行重排：执行入口与自动重排同一——`reschedule.command`，教练场景 `--dry-run` 出建议、学习者点头后写回 = 可否决，或 `--auto` 明示自动；无计划主题 `shift` 恒 null，无此段）；无 deadline 主题建议用中性语气（零催办）。

**步骤**（按快照数据依次执行，向用户报每步做什么）：

1. **到期闪卡 > 0** → 先去「闪卡」tab 清到期卡。评分口径：想不起来=again（重学），迟疑但对=hard，流畅对=good，秒答=easy。
2. **有未学过的课**（课程 tab 里没读过的节）→ 先读课，读完对应题集再刷。这是「先建概念再验效果」。
3. **有未答题** → 「答题」tab 刷对应题集。答错自动进错题本，不用手记。
4. **未毕业错题 > 0** → 练习页顶部入口「重做本题集/错题」重练。毕业规则：

   | 历史错次 | 需要连续答对 |
   |---------|-------------|
   | 1 次 | 1 次 |
   | 2 次 | 2 次 |
   | 3 次及以上 | 3 次 |

5. 收尾建议：未毕业错题攒到 ≥3 → 提示走 F4 串讲；题全答完且正确率高 → 提示 F5 播客巩固。

**完成标志**：到期卡清零 + 本次计划的题集刷完。向用户报一句本次战绩（刷了几题、对几题、错题剩几道）。

---

## F7 · 改内容（content-edit）

**目的**：改题/改课/改卡/改日程，同时守住**四对齐**（课程讲的、题考的、闪卡记的、错题展开的，围绕同一套考点）。

**操作链（顺序固定，跳步必脱节）**：

```
改 MISSION.md 学习目标 / 考点排布表（表是权威：考点、题量、day 变了，题卡跟着对齐）
  → 改 examples/<theme>/lessons/*.html（课程）
  → 改 examples/<theme>/questions.json（题的 day/examPoint/题量 对齐排布表）
  → 改 examples/<theme>/flashcards.json（照表配卡）
  → 跑校验（F8：qa_questions + 品牌词自查 + 排布表对账）
```

**纪律**：

- 只改主题源目录 `examples/<theme>/` 里的源文件——学习台直读它，改完刷新即生效。**没有同步产物、没有构建步骤**：插件快照里的 `kit/apps/quiz-app/` 是内容工具（开发者侧），不是用户项目的一部分，别把数据写进去。
- 改题保留旧 id、只改内容——进度按 id 存，换 id 等于丢这题的答题历史。
- 删题是允许的：进度里残留的陈旧 id 会被错题/看题统计自动过滤，不用清理。
- day 标签重排不影响已答进度（进度不按 day 存），放心调日程。

**完成标志**：改动落盘 + F8 全绿。

---

## F8 · 内容自检（verify）

**目的**：改完内容/题卡后确认没坑自己。**学习台没有「发布」这一步**——主题文件改完刷新即生效，所以这里不是上线门禁，是自查清单。

```bash
KIT=<插件根>/kit/apps/quiz-app
# ① 题库质量（最长即答案 / 答案分布 / 选项长度）——直接对主题文件跑：
node "$KIT/scripts/qa_questions.mjs" --file "$PWD/examples/<theme>/questions.json"
# ② 结构自检：JSON 能解析 + 计数合理（题数、考点数、答案数）
node -e '
const fs=require("fs");
const D=`examples/<theme>`;
const qs=JSON.parse(fs.readFileSync(`${D}/questions.json`,"utf-8"));
const fc=JSON.parse(fs.readFileSync(`${D}/flashcards.json`,"utf-8"));
const eps=new Set(qs.map(q=>q.examPoint).filter(Boolean));
console.log(`题 ${qs.length} · 答案 ${qs.reduce((n,q)=>n+(Array.isArray(q.answer)?q.answer.length:1),0)} · 考点 ${eps.size} · 卡 ${fc.length}`);
'
# ③ 四对齐（排布表对账：考点覆盖 / 题量 / 题型 / day / 闪卡数）
grep -c '^## 考点排布表' "examples/<theme>/MISSION.md" || echo "table=missing（无表则跳过对账，建议补表）"
```

③ 读主题 `MISSION.md` 的「## 考点排布表」做契约校验：考点覆盖（题↔课）+ 题量/题型/day/闪卡数对账。无排布表的主题跳过对账并打 ⚠（建议补表）。**四对齐的命令落在插件仓库的开发态工具链（`pnpm run check:alignment`）——学习者项目里没有这个脚本，别派给用户，agent 自己按表核或跑插件侧脚本都行。**

**失败处理**：① 红了→按报告改题目（选项等长、打散答案分布）；② JSON 解析失败→读报错修字段；③ 对账不符→表是权威，补题/改 `examPoint`/`day` 对齐表，0 卡考点在表里声明了解级。

**完成标志**：①② 必过、③ 过或已注明「无表跳过」。向用户报每项一行结论。

---

## F9 · 部署（deploy，已退役）

**这一节不再有步骤。** 集成进 DSH 之后没有「部署」这件事：学习台的 UI 由 DSH 提供，数据在用户自己的项目目录里，**没有云服务器、没有 pm2、没有 `:8787` 服务、没有 `EXAMPLE_THEME` 环境变量**——历史上那套（clone 到服务器 → pm2 起进程 → env 注入主题 → curl `/api/health` 验收）属于独立答题站时代，整节作废。

用户问「怎么上线 / 怎么部署 / 手机怎么用」时的口径：

- **换设备**：把学习项目目录（`examples/` + `progress.json` + `study/`）同步过去（git / 网盘都行），在新机器装上 DSH 插件，学习台右上「项目路径」重指向即可。**同一时刻只在一边写**——`progress.json` 靠时间戳合并，但两边各写一份不同副本没有意义。
- **公网分享 / 多人共用**：本插件不提供，如实说没有这个能力，别绕回旧 pm2 流程。
- **更新插件本体** → F13。

**完成标志**：用户理解了「学习台随 DSH 跑，不需要部署」，不再追问上线步骤。

---

## F12 · 知识图谱投影（graph projection，v0.14）

**目的**：把本仓的学习状态（题库掌握度 + 口头四态）投影到外部知识库 knowflow 的图上（节点着色）——知识住 knowflow，学习状态住本仓，桥只传一份**只读投影文件**，绝不回写知识页（ADR-0005）。

**什么时候用**：用户想「在知识图谱上看见掌握情况 / 图着色 / 学的东西连成网」；或陪练中建立了新概念想同步图上状态。**没装 knowflow / 没有图的用户永远走不到这里**——所有图功能静默降级为纯考点口径，不报错、不唠叨。

**两仓边界**：knowflow 的图 = wiki 页 + wikilink → `graph.json`（学习者手动采集合成，本仓**零摄取**）；本仓的信号 = progress / SRS / 口头答题流水。两者靠**考点节点映射**对上。

### 第 1 步 · 找图与映射（缺任一 → 静默降级，直接说明即可）

```bash
# 图位置：问用户 knowflow 仓库的 graph.json 路径（或环境变量 KNOWFLOW_GRAPH_JSON）
test -f "$GRAPH" && echo graph=ok || echo graph=missing
# 映射文件（学习者私有，随 study/records/ 不上站不提交）：
ls "$THEME_DIR/study/records/graph-map.json" 2>/dev/null || echo map=none
```

两者都在 → 继续；缺任一 → 本流程不可用（不是故障）：
- 有图无映射 → 先走第 2 步建映射。
- 无图 → 告诉用户图功能需要 knowflow 知识库（`graph.json`），本仓不接管知识采集。

### 第 2 步 · 建考点节点映射（agent 提议 → 学习者逐条确认，绝不代确认）

映射文件 `study/records/graph-map.json`（`{ version: 1, updatedAt, mappings: [{ node, ep, label }] }`，node = knowflow 节点相对路径，ep = EP-NN）：

1. **提议**：加载图节点（graph.json 的 id/label）与主题排布表考点（EP-NN + 考点名），按 label ↔ 考点名提出候选映射清单（节点路径、EP、双方名称并列展示）。
2. **确认**：逐条请学习者点头/改/弃——**宁可漏映射也不错配**（未映射节点仍可经口头流水独立判掌握，只是不并入考点视图）；按标题模糊匹配的「看起来像」不算确认。
3. **落盘**：写入 `study/records/graph-map.json`（已有条目合并，学习者否决的不再提议）。学习者的确认本身是数据——agent 不悄悄改它。

**红线**：绝不把 EP 或学习状态写进 knowflow 的 wiki 页面（知识库渗学习元数据，ADR-0005 明拒）。

### 第 3 步 · 产出投影（掌握度现算 → 只读文件）

```bash
KIT=<插件根>/kit/apps/quiz-app; THEME="$PWD/examples/<theme>"
node "$KIT/scripts/mastery-report.mjs" --theme "$THEME" --progress "$PWD/progress.json" --graph "$GRAPH" --write-projection --json
```

- 产物：`<graph.json 同目录>/mastery-projection.json`（`{ version: 1, generatedAt, source, nodes: [{ id, mastery, oral: { asked, correct } }] }`）——只读、可重复生成；graph.json 本体与知识页零改动，flowtest 等其他消费方零感知。
- 节点四态口径：映射节点 = 题库四态（v1.2，已含口述通道）∪ 口头四态合流（负面证据优先）；未映射节点 = 纯口头通道。图与映射缺任一 → `graph.loaded = false`，报告自动退回纯考点口径。
- 四态→颜色的映射规则由 knowflow 侧定义（本仓不越界）；学习者重新跑一次本命令即刷新着色数据。

**完成标志**：投影文件落盘在图目录旁 + `--json` 的 `graph.projection.written = true`。提示用户在 knowflow 侧重新生成/打开图谱看节点着色。

### 只干 / 绝不干

- **只干**：找图与映射、提议映射待确认、现算产出只读投影。
- **绝不干**：回写 knowflow 的 graph.json / wiki 页；代学习者确认映射；在无图环境下硬造图信号（降级是特性不是故障）。

---

## F13 · 迁移与升级（migrate & upgrade）

**目的**：两件事——**迁移**旧形态项目到轻布局，**更新**插件本体。轻布局项目升级不碰数据：内容工具随插件分发，用户手里只有 `examples/` + `progress.json` + `study/`。

**什么时候用**：

- F1 第 0 步探到旧形态（`<项目>/kit/apps/quiz-app/`、`<项目>/kit/examples/`、`<项目>/apps/quiz-app/`）→ 走迁移节。
- 用户说「升级 / 更新 / 项目旧了 / 页面还是老内容」→ 先判形态，再决定走哪节。
- state.md §8 报**本体落后**（插件快照 v<x> → 最新 v<y>）→ 只走插件更新节。

**什么时候不用**：

- 干净目录 → F1。
- 已经是轻布局（有 `examples/`、没有 `kit/`）→ **没有迁移步骤**，最多做插件更新。
- 改内容 → F7；F13 不代写内容。

### 第 0 步 · 判形态（只读）

```bash
P=<项目>
test -d "$P/examples" && echo "layout=light" || echo "layout=unknown"
test -d "$P/kit/apps/quiz-app" && echo "legacy=kit-apps-quiz-app"
test -d "$P/kit/examples" && echo "legacy=kit-examples"
test -d "$P/apps/quiz-app" && echo "legacy=apps-quiz-app"
```

`layout=light` → 直接跳到「插件更新」节。命中 `legacy=*` → 走迁移节，旧根 `L` = 含 `examples/` 的那一层（`kit/` 或 `kit/apps/quiz-app/` 或 `apps/quiz-app/`）。

### 迁移节 · 备份 → copy → 验计数 → 才删旧

三条铁律：**先备份**、**copy 不 move**、**计数对上了才动旧数据**。任何一步拿不准就停下问用户。

1. **看清旧数据在哪**（只读）：

   ```bash
   ls "$L/examples"                                       # 旧主题包
   ls -l "$L/progress.json" "$L/apps/quiz-app/progress.json" 2>/dev/null   # 旧进度（两种历史位置）
   ls -d "$L"/examples/*/study/records 2>/dev/null        # 旧学习痕迹（主题包内）
   ls -d "$L/study" 2>/dev/null                           # 旧学习痕迹（根级）
   ```

2. **备份到项目里的隐藏目录**（不动原文件）：

   ```bash
   B="$P/.backup-$(date +%Y%m%d)"
   mkdir -p "$B"
   cp -r "$L/examples" "$B/examples"
   cp "$L/progress.json" "$B/progress.json" 2>/dev/null || cp "$L/apps/quiz-app/progress.json" "$B/progress.json"
   [ -d "$L/study" ] && cp -r "$L/study" "$B/study"
   ls -R "$B" | head -20
   ```

3. **copy 到轻布局**（`-n` 不覆盖已有同主题）：

   ```bash
   mkdir -p "$P/examples"
   cp -Rn "$L"/examples/. "$P/examples"/
   cp -n "$L/progress.json" "$P/progress.json" 2>/dev/null || cp -n "$L/apps/quiz-app/progress.json" "$P/progress.json"
   [ -d "$L/study" ] && cp -Rn "$L"/study/. "$P/study"/
   ```

   主题包内的学习痕迹随 `examples/` 一起拷过来了（住 `examples/<theme>/study/`，数据层会回退读，见 state.md §7）——所以不丢，也不必手工搬。

4. **验计数（这是删旧数据的唯一许可证）**——逐主题比题数/答案数/卡数，进度比 answers/srs 条数：

   ```bash
   OLD="$L/examples" NEW="$P/examples" node -e '
   const fs=require("fs"),path=require("path");
   const {OLD,NEW}=process.env;
   const cnt=(a)=>Array.isArray(a)?a.reduce((n,q)=>n+(Array.isArray(q.answer)?q.answer.length:(q.answer!=null?1:0)),0):0;
   const load=(r,t,f)=>{try{return JSON.parse(fs.readFileSync(path.join(r,t,f),"utf-8"))}catch{return null}};
   for(const t of fs.readdirSync(NEW)){
     const d=path.join(NEW,t); if(!fs.statSync(d).isDirectory())continue;
     const oq=load(OLD,t,"questions.json"), nq=load(NEW,t,"questions.json");
     const of=load(OLD,t,"flashcards.json"), nf=load(NEW,t,"flashcards.json");
     const same=(oq?.length??0)===(nq?.length??0)&&cnt(oq)===cnt(nq)&&(of?.length??0)===(nf?.length??0);
     console.log(t,`旧 ${oq?.length??0}题/${cnt(oq)}答案/${of?.length??0}卡`,`新 ${nq?.length??0}题/${cnt(nq)}答案/${nf?.length??0}卡`,same?"OK":"MISMATCH");
   }
   '
   node -e 'const fs=require("fs");for(const f of process.argv.slice(1)){try{const p=JSON.parse(fs.readFileSync(f,"utf-8"));console.log(f,"answers",Object.keys(p.answers||{}).length,"srs",Object.keys(p.srs||{}).length)}catch(e){console.log(f,"读不了")}}' "$L/progress.json" "$P/progress.json"
   ```

   任何一项 `MISMATCH` 或条数不等 → **停**，回第 3 步查漏拷/覆盖，绝不进入下一步。

5. **三验全 OK 才处置旧数据**——先改名，不 `rm`：

   ```bash
   mv "$L" "$P/.legacy-$(date +%Y%m%d)"
   ```

   跟用户说：「旧目录改名保留了，用几天没问题再让我删」——删除永远是用户确认后的单独动作。

6. 让用户把学习台右上「项目路径」改成 `<项目>`（若原来指旧路径），确认首页/答题/闪卡/全景四视图正常。

### 插件更新节

轻布局**没有 `kit/` 要重拷**，更新只管插件本体（数据全在插件外部，不迁移）：

- **先探版本**：`cat <插件根>/kit/kit-version.json` 与 `curl --max-time 3 -sf "${ASK_KIT_VERSION_URL:-https://aistudykit.dev/version.json}"`。快照 ≥ 最新 → 已最新，不动；快照旧 → 继续。探测失败按软失败处理：注一句，别报错阻塞。
- **Route A（插件市场装的）**：明说「**刷新插件是你工具里的 UI 操作，我代不了**」，给出 DSH 里插件/市场的刷新或重装入口（`dsh-ai-study-kit`），刷新完回来说一声再复探。
- **Route B（agent 装的）**：幂等重跑安装流程（下载覆盖安装），跑完复探。
- **更新后**：项目数据不用动（`progress.json` / `examples/` / `study/` 都在插件外）；让用户刷新学习台，报新版本号。

**完成标志**：项目是轻布局（`test -d <项目>/examples` 且无 `<项目>/kit`）· 迁移时 题/答案/卡/进度条数 全部 OK 且旧目录已改名备份 · 更新后快照版本 = 最新发布 · 学习台四视图正常。

---

## 体检（study-doctor）

**目的**：一句话把**内容自检 + 环境探测 + 版本/契约探测**串成一份汇总报告——每项过/红 + 建议修复顺序。零新逻辑：内容门跑 F8 的命令，环境项跑 state.md 的探测命令，体检只做编排聚合。新主题建好后、出问题时、想快速确认状态都从这儿进。

**与 F8 的分工**：F8 是内容自查清单（改完题卡就跑）；体检是**诊断视图**——多探环境（LLM/TTS/项目路径/主题/学习痕迹）与版本漂移、契约完整性，红项给修复顺序。

**步骤**（逐项记 ✅/❌，数字全部来自实测）：

1. **内容自检**（同 F8）：

   ```bash
   KIT=<插件根>/kit/apps/quiz-app
   node "$KIT/scripts/qa_questions.mjs" --file "$PWD/examples/<theme>/questions.json"   # 题库质量
   node -e 'const fs=require("fs"),D=`examples/<theme>`;const q=JSON.parse(fs.readFileSync(`${D}/questions.json`,"utf-8"));const f=JSON.parse(fs.readFileSync(`${D}/flashcards.json`,"utf-8"));console.log(`题 ${q.length} 卡 ${f.length}`)'   # 结构
   grep -c '^## 考点排布表' "examples/<theme>/MISSION.md" || echo "table=missing"          # 四对齐前提
   ```

2. **环境探测**（只读；缺什么补什么）：

   ```bash
   test -f .env && grep -cE '^(LLM_BASE_URL|LLM_API_KEY|LLM_MODEL)=..' .env   # LLM 三项，=3 配齐
   grep -cE '^TTS_PROVIDER=..' .env 2>/dev/null                                # TTS 有无（播客用，可缺）
   ls examples/                                                                # 主题清单（空 = 没建主题）
   test -f progress.json && node -e 'const p=require("./progress.json");console.log("answers",Object.keys(p.answers||{}).length,"theme",p.theme||"(未设)")' || echo "progress=missing（还没答过题）"
   ls study/records/ 2>/dev/null | head                                        # 学习痕迹（没有 = 还没陪练过，正常）
   ```

3. **版本漂移 + 契约完整性**（只读、只报事实与补法、不代修）：

   ```bash
   # ① 版本：插件快照 vs 最新发布；旧项目残留才比项目版本（state.md §8）
   cat <插件根>/kit/kit-version.json
   curl --max-time 3 -sf "${ASK_KIT_VERSION_URL:-https://aistudykit.dev/version.json}" || echo "latest=unknown"
   cat <项目>/kit/kit-version.json 2>/dev/null || echo "project-version=none（轻布局常态）"
   test -d <项目>/kit && echo "legacy-layout=yes"          # 命中 → 走 F13 迁移
   # ② 契约完整性：排布表 / 题库考点标记 / 闪卡映射（D = examples/<theme>）
   THEME_DIR="$D" node -e '
   const fs = require("fs");
   const D = process.env.THEME_DIR;
   const qs = JSON.parse(fs.readFileSync(`${D}/questions.json`, "utf-8"));
   const fc = JSON.parse(fs.readFileSync(`${D}/flashcards.json`, "utf-8"));
   console.log(`questionsTagged=${qs.filter((q) => q.examPoint).length}/${qs.length} flashcardsMapped=${fc.filter((c) => c.examPoint).length}/${fc.length}`);
   '
   # ③ 复习闭环契约（只读）：口述错因台账有无与条数
   grep -c '"status"' study/records/misconceptions.json 2>/dev/null || echo "misconceptions=none"
   ```

   - **版本三态**：快照 = 最新 → 本体最新；快照旧于最新 → **本体落后**（先刷新插件，Route A/B 见 F13「插件更新节」）；`latest=unknown` → 注一句「最新版探测失败」，按本地版本照报，不进红项。轻布局**没有项目版本文件是正常的**，不报「版本未知」。
   - **旧形态警报**：`legacy-layout=yes` → 明确建议走 F13 迁移（迁移要备份+copy+验计数，别自己动手删）。
   - **没有「实例」这一形态**：学习台不部署、不监听端口，所以不 curl 任何 `/api/health`，也不存在「实例版本」判读。**绝不比 JS bundle 哈希判版本。**
   - 契约缺口判定：`table=missing` = 排布表缺失；`questionsTagged` 低于全量 = 掌握度/全景的考点维度失明；`flashcardsMapped=0` 而排布表声明有卡 = 掌握度退纯题维度。补法见 F13 第 5 步表（只报事实，不虚报也不代修），已落盘条目不回填。
   - **错因台账**：`misconceptions=none` = 未建，**正常态**，不进缺口、不催建（下次口述判错自然首建）；有条目报条数，`unlocated` 偏多时点名排布表/图映射缺口。
   - 全绿项目：两项报 ✅，不输出多余噪音。

4. **按模板输出报告**：

   ```
   🩺 体检报告
   内容（改完题卡就该全绿）：
     题库质量 … ✅ / ❌ <哪条约束红>
     结构 … ✅ 题 N 卡 N / ❌ JSON 解析失败
     四对齐前提 … ✅ 有排布表 / ⚠ 无表（对账跳过）
   环境（缺什么补什么）：
     LLM 三项 … 配齐 ✅ / 缺（影响 F6 产课、F5、F10 深度模式；补法：项目根 .env 填 LLM_BASE_URL / LLM_API_KEY / LLM_MODEL）
     TTS … 有 / 无（F5 可 --no-tts 只出逐字稿，不算阻塞）
     项目路径 … <路径>（examples/ ok / MISSING）
     主题 … <theme>（N 个主题 / 空 = 还没建）
     进度 … answers N �� theme <x> / 还没有 progress.json（正常）
     学习痕迹 … study/records 有 N 个文件 / 还没陪练过（正常）
   版本与契约（只报事实与补法）：
     版本 … ✅ 随插件 v<x>（本体最新）/ ⚠ 本体落后（快照 v<x> → 最新 v<y>，先刷新插件）/ 最新版探测失败（注一句）
     布局 … ✅ 轻布局 / ⚠ 旧形态（有 kit/，走 F13 迁移）
     契约完整性 … ✅ 无缺口 / ⚠ <排布表缺失 · 题缺考点标记 N/M · 卡缺映射 N/M>（补法见 F13 第 5 步）· 错因台账：<未建（正常态）｜N 条，未定位 M 条>
   建议修复顺序：<只列红项，按下面的固定优先级>
   ```

5. **修复顺序**（固定优先级，只报红项）：**本体漂移**（先刷新插件——旧插件跑新文档会撞墙）→ **旧布局**（走 F13 迁移，备份+copy+验计数）→ **内容门红**（按 F8 失败处理改源文件）→ **契约缺口**（F13 第 5 步引导补，学习者的活）→ **.env 缺项** → **项目路径没连**。

**完成标志**：报告已输出（有红则修复顺序已给出）。修复后重跑体检确认转绿。

---

## 诊断（troubleshoot）

| 症状 | 根因 | 处置 |
|------|------|------|
| 课程页白屏 / 没课 | 主题包缺 `lessons/` 或当前主题不是这个 | 看 `ls examples/<theme>/lessons`；空就去 F6 产课；有课却白屏→确认学习台顶栏选的主题 = 改课的那个主题 |
| 进度「丢了」 | 项目路径指错 / 换过目录 | 先看学习台右上「项目路径」是不是同一个项目（不同目录各有自己的 `progress.json`）；`ls -l <项目>/progress.json` 看有没有被覆盖成小文件 |
| progress.json 写坏 | 手编 / 异常写入 | 数据层检测到坏文件会**拒绝覆盖**并报 `EPROGRESS_CORRUPT`（不是自动重置，别骗用户说「已保护性重置」）；**别手修**——从 `.backup-*` 或版本库取回，或让用户在 app 内用重置入口重开 |
| 改了题/课不生效 | 改错了位置（写进 `<插件根>/kit/`），或改的不是当前主题 | 只改 `<项目>/examples/<theme>/`；改完刷新学习台即生效（**没有同步产物、没有 build**）；确认顶栏主题 |
| CLI 报「LLM 配置不完整」 | `.env` 缺项 | `cp .env.example .env`，填 `LLM_BASE_URL` / `LLM_API_KEY` / `LLM_MODEL` 三项 |
| grill 报拉不到错题 | 快照显示 `openWrong=0`（确实没错题） | 没有服务可起——`grill-wrong.mjs` 直读 `<项目>/progress.json`；先去刷题或重练错题，再跑 |
| LLM 返回 JSON 解析失败 | 模型输出跑偏 | 脚本已内置容错+重试；仍失败换模型（改 `.env` 的 `LLM_MODEL`；provider 细节见仓库 `docs/configuration.md`） |
| 品牌词命中（`pnpm run scan`） | 主题内容里出现真实企业名 | 按命中文件行号中性化（「某车企」「某大厂」或删例）；技术专名（开源技术栈）可人工确认保留 |

处置完让用户复现原操作确认修复，然后建议重跑一次 Step 1 快照。
