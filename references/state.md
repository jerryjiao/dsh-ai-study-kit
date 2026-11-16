# State Detection · 状态探测协议

> Step 1 的执行细节。所有命令**只读**，在**学习项目根目录**（含 `examples/` 的那层）执行。
> 没有任何一个字段允许凭猜测填写——每项都有对应命令，跑了才算数。

## 0. 找到学习项目

判据只有一条：**目录下有 `examples/`**（主题都住 `examples/<theme>/`）。不看 `package.json`、不看 `.git`。

```bash
test -d examples && echo "project=ok" || echo "project=MISSING"
ls examples/ 2>/dev/null   # 有哪些主题
```

探测顺序（命中即停，**只报命中的那一处和它的来源**）：

1. **当前目录**（cwd 及其上溯到 `examples/` 那层）；
2. **上次路径**——DSH 学习台会记住上次连接的项目根，读 `progress.json` 所在的同一层即可确认；
3. **`~/study-kit`**（约定俗成的默认位置）；
4. 都没有 → **让用户自己给路径**：在 DSH 学习台右上角「项目路径」填绝对路径即可连接。技能侧不猜测、不代填、不静默新建，也不存在「目录选择器 / 一键创建项目」这类入口——只把该填什么说清楚。

- 命中的目录里**没有 `examples/`** → 不是学习项目（可能是插件仓库、内容工具快照或随便一个目录），报「项目：不存在」并按 F1 建目录，不往里写东西。
- **见到 `<根>/kit/apps/quiz-app/` 这类旧形态** → 那是迁移前的老用户项目。照读照报，另起一句提示走 F13 迁移（备份 → copy → 验题目/答案计数 → 才删旧数据）；不要自己动手迁，也不要按老路径写任何新数据。
- **`kit/` 目录一律不是用户项目**：它是插件自带的内容工具与内容快照，用户项目是 `examples/` + `progress.json` + `study/` 三件。
- 多个候选同时存在（比如 `~/study-kit` 和 cwd 都像项目）→ **列清单问用户选哪份**，绝不静默挑一份；每份报路径 + 主题数 + `progress.json` 存在与否。

## 1. 主题

```bash
# 当前主题 = progress.json 的 theme 字段（学习台里选的就是它）；没记录就看唯一主题
THEME=$(node -e 'try{const p=require("./progress.json");process.stdout.write(p.theme||"")}catch{}' 2>/dev/null)
[ -n "$THEME" ] || THEME=$(ls examples | head -1)   # 兜底：只有一个主题，或让用户在学习台里选
test -d "examples/$THEME" && echo "theme=$THEME dir=ok" || echo "theme=$THEME dir=MISSING"
ls examples/   # 有哪些主题
```

- 主题就是 `examples/<slug>/` 一个目录；**当前主题是学习台的界面状态**（首页/答题/闪卡/全景顶栏切换，落在 `progress.json` 的 `theme` 字段），不是环境变量。别教用户设 `EXAMPLE_THEME`——那是旧 CLI/构建链的意识。
- `progress.json` 只有**一份**、在项目根；切主题不换进度文件、不丢数据（跨主题隔离由数据层按题/卡 id 交集做，见 §3）。
- 主题目录存在但内容是 dev-intro 原样（`questions.json` 里 id 前缀还是 GIT-/LNX-）→ 视为「新主题没做完」，提示走 F2 收尾。

## 2. 库存（题 / 闪卡 / 课 / 错题串讲）

```bash
export D="examples/$THEME"   # 主题目录（轻布局只有这一种形态）
node -e '
const fs = require("fs"), p = (f) => `${process.env.D}/${f}`;
const nq = () => { try { return JSON.parse(fs.readFileSync(p("questions.json"))).length } catch { return 0 } };
const nf = () => { try { return JSON.parse(fs.readFileSync(p("flashcards.json"))).length } catch { return 0 } };
const nl = () => { try { return fs.readdirSync(p("lessons")).filter(f => f.endsWith(".html")).length } catch { return 0 } };
const nw = () => { for (const d of ["study/wrong-questions", "wrong-questions"]) { try { const n = fs.readdirSync(p(d)).filter(f => /^cluster-.*\.html$/.test(f)).length; if (n) return n } catch {} } return 0 };
console.log(`questions=${nq()} flashcards=${nf()} lessons=${nl()} clusters=${nw()}`);
'
```

（主题名以 `THEME=...` 前缀传给单条命令；要扫别的主题就换前缀值。）

## 3. 进度（已答 / 未毕业错题 / 到期闪卡 / 课已学完）

**唯一来源**：项目根的 `progress.json`。没有后端、没有 API——学习台（首页/答题/闪卡/全景）和这里的探测读的是**同一份文件**，谁也不用「同步」。

```bash
CP=progress.json   # 就这一份；不在 apps/quiz-app/ 下，也不在主题目录里
test -f "$CP" && echo "progress=ok" || echo "progress=missing"   # missing 是正常态（新用户），不是故障
```

进度统计（口径与数据层 `src/host/study/progress.js` 的合并规则一致——墓碑=已删、随机沙盒不进主进度、错题毕业阈值随历史错次递增、SRS 按到期时间戳、**课已学完=显式确认制**（课程页点「✓ 学完了」才记入，打开不算；被撤销墓碑盖掉的不算，见下方代码）；**answers/srs 先与主题题/卡 id 集求交**——多主题隔离，其他主题的进度不混入）：

```bash
CP="$CP" THEME="$THEME" node -e '
const fs = require("fs");
const readIds = (f) => { try { return new Set(JSON.parse(fs.readFileSync(f)).map((x) => x.id)); } catch { return new Set(); } };
// 主题目录 = examples/<theme>；coursesRead 的 "<theme>/<file>" key 用 basename
const T = process.env.THEME;
const D = `examples/${T}`;
const NAME = T;
const qIds = readIds(`${D}/questions.json`);
const fcIds = readIds(`${D}/flashcards.json`);
let p;
try { p = JSON.parse(fs.readFileSync(process.env.CP, "utf-8")); } catch { p = null; }
if (!p) { console.log("progress=empty"); process.exit(0); }
const pass = (wc) => (wc <= 1 ? 1 : wc === 2 ? 2 : 3);
const now = Date.now();
const recs = Object.entries(p.answers || {}).filter(([id, r]) => !r.deletedAt && qIds.has(id));
const answered = recs.filter(([, r]) => !r.fromRandom).length;
const openWrong = recs.filter(([, r]) => r.streak !== undefined && r.streak < pass(r.wrongCount ?? 1));
const graded = recs.filter(([, r]) => !r.fromRandom && r.correct !== null);
const correct = graded.filter(([, r]) => r.correct === true).length;
const srsDue = Object.entries(p.srs || {}).filter(([id, s]) => !s.deletedAt && fcIds.has(id) && s.due <= now).length;
// 课已学完（显式确认制）：coursesRead 命中 lessons 目录清单，且未被撤销墓碑盖掉——
// coursesReadTombstones 同 key 时间戳 ≥ 记入时间戳 = 已撤销，不计入学完（与 progress.ts isCourseRead 同构：
// seen > tomb 才算；旧数据无墓碑 = 已确认保留）
const lessonFiles = (() => { try { return fs.readdirSync(`${D}/lessons`).filter((f) => f.endsWith(".html")); } catch { return []; } })();
const readSet = new Set(lessonFiles.filter((f) => {
  const seen = (p.coursesRead || {})[`${NAME}/${f}`];
  if (seen === undefined) return false;
  const tomb = (p.coursesReadTombstones || {})[`${NAME}/${f}`];
  return tomb === undefined ? true : seen > tomb;
}));
console.log(JSON.stringify({
  answered, openWrong: openWrong.length, wrongIds: openWrong.map(([id]) => id),
  accuracy: graded.length ? Math.round((correct / graded.length) * 100) + "%" : "n/a",
  srsDue,
  lessonsDone: `${readSet.size}/${lessonFiles.length}`,
}, null, 2));
'
```

`progress=empty` 是正常态（新用户/刚重置），不是故障，别进诊断流程。

**弱考点（考点掌握度，快照第 5 行）**：进度统计之外再跑一条——确定性派生，无 AI。报告脚本随**插件**分发（不在学习项目里），因此从插件快照跑、把项目路径传进去：

```bash
KIT=<插件根>/kit/apps/quiz-app          # 插件根 = 本文件上一级所在目录
node "$KIT/scripts/mastery-report.mjs" --theme "$PWD/examples/$THEME" --progress "$PWD/progress.json" --json
```

（`--theme` 传绝对路径 = 「外部主题包」形态，脚本认；`--progress` 必须显式传项目根那份 `progress.json`，别让脚本回落到 kit 自带的默认值。）

- 判据（v1.2，#119：题主证 + 口述/闪卡任一超题证据）：考点（题库 `examPoint`，EP-NN）下题全答对、无未毕业错题，且满足任一超题证据——口述达标（该考点已有口述数据且口头四态 = 掌握）或映射闪卡（`flashcards.json` 可选 `examPoint`）全部毕业（SRS phase=review，可选替代通道）= 掌握；**无口述数据不阻塞**：从不使用闪卡的学习者题全对即掌握（SRS 彻底可选）。有未毕业错题、当前答错、或口述判弱（负面优先）= 弱；部分作答无负面、或题全对但口述未达标且闪卡未全毕业 = 进行中。口述四态由口头流水现算进判据（见下条）。判据与学习台全景页同口径（数据层 `src/host/study/content.js` 的 `buildPanorama`，喂给它的口述证据与这里同一份：流水文件 ∪ `progress.oralAttempts`）。考点名从 MISSION 排布表解析。
- `--progress` 文件不存在 = 空进度全部 untouched，不是故障。
- **口头四态与口头弱项（v0.14，同一份 `--json` 的 `oral` 字段）**：口头答题流水（`study/records/oral-attempts.json` 唯一真源 ∪ `progress.oralAttempts` 副本——两处都由数据层并流、四元组去重不重复计数；`oral.fromProgress` 报进度侧贡献条数）里的每个口头目标——排布表全部考点 ∪ 流水里的裸知识点（聊天新学、无题的概念）——判纯口头四态（近 5 次加权正确率 + 置信度封顶 1 次 0.5 / 2 次 0.8；无流水目标 = 未开始）。输出消费：`oral.weakRanked` 与 `oral.targets[].status` 进快照「弱考点」行的口头弱项——推荐时点名（「拥塞控制口头问 2 对 2、加权 0.8 还没到掌握线，再抽两轮」）。口头弱与题库弱**负面优先**：任一弱即弱；题没刷过时口头最多算「进行中」——推荐先补题。
- **知识图信号（v0.14，同一份 `--json` 的 `graph` 字段）**：传 `--graph <graph.json 路径>`（或环境变量 `KNOWFLOW_GRAPH_JSON`）时，报告装载 knowflow 知识图并给出 `graph.nodes`（节点四态 + 口头统计）与映射计数；配合 `--write-projection` 产出只读投影文件供图着色（flows.md F12）。**前置关系**：`graph.weakPrereqs` 是每个弱考点的前置链（`[{kind:'ep'|'node', id, name, mastery}]`，mastery 非 mastered 即「前置还弱」）；`graph.weakOrdered` 是尊重前置顺序的推荐序（前置先学）——推荐与陪练开场点名时用它取代裸 `weakRanked` 顺序，理由从「刷 EP-12」具体到「前置概念 EP-01 还弱，先补它」。无图 / 无映射 → `graph.loaded = false`，静默降级为纯考点口径（无前置字段），不是故障。
- 输出消费：`summary.weak` 与 `weakRanked`（弱点排序：未毕业多者先）进快照「弱考点」行；`points[].profile` 带 grill 串讲记下的错因（来自 `study/records/profile.json`，学习者私有，目录语义见 §7）——推荐时点名引用，让理由从「错题多」变成「EP-03 连错 2 次，错因：权限位组合不熟」。`points[].flashOpenIds` 列出该考点未毕业的闪卡（推荐刷闪卡时点名）；判据与学习台首页「考点掌握度」面板同口径。
- **口述错因台账（#132，同一份 `--json` 的 `misconceptions` 字段）**：`study/records/misconceptions.json`（学习者私有可选；条目与写入口径见 [`contracts.md`](contracts.md) 契约二「口述错因台账」）存在且有本主题条目时输出：顶层 `misconceptions`（total / open·corrected·recurred 计数 / byEp / byNode / `unlocated` 未定位桶）+ `points[].misconceptions`（口述来源错因，与 `points[].profile` 的题 id 来源按 EP 双源合流）。状态由后续口述流水派生（最近一次后续口述答对 = corrected、同根因再现 = recurred），不改写旧条目。**快照「弱考点」行点名时台账错因与档案错因同引**——observed 事实与 diagnosis 推断分开引述（「EP-03 上次把 4 说成读权限，判断根因：权限位与八进制对应记反」），接续纠偏不必从头解释同一误区。无台账 / 坏台账 / 条目全属他主题 → 字段静默缺席、探测照旧，输出与没有该功能前零变化；台账不进掌握判据（v1.2 语义不变）。
- **隔期复测候选（#133，同一份 `--json` 的 `retest` 字段）**：从台账 open 条目 + 口述流水纯派生（判据单源 `kit/apps/quiz-app/scripts/lib/retest.mjs` 的 `deriveRetest`，决议 #129 三条件：open + 口头四态非 mastered + 当天该目标无口述——多通道同目标去重；无固定间隔，时机 = 下一次会话）。`retest.pick` = 本会话唯一复测目标（多目标取四态最弱一个，其余 `candidates` 留教练内部视角、不向学习者陈列）；候选带出题依据（open 条目 observed/diagnosis，最新在前——沿 diagnosis 出同根因变体，缺省回退 observed）。消费方：F10 第 0 步第 3 条抽背位（#134 起自动并入——与 srsDue 到期卡同池合计 ≤3 题，编排优先级见 F10 第 0 步）与 F10「隔期复测」节（显式复习请求「考考我 / 复测上次错的」的话术与结果闭环细则）；零闪卡可用（不依赖 srsDue）。**快照「隔期复测」行（#134）**：`retest.pick` 非 null → 快照在「弱考点」行后追加一行——`隔期复测: <EP-XX 名字>（上次说错：<observed 摘要>｜判断根因：<diagnosis 摘要>）· 口头 问 N 对 M <weak/进行中> · 今天还没考过`；`pick:null`（有台账但全 corrected / 当天已答 / 已 mastered）→ 该行省略，学习者显式请求复习时才按 `excluded` 计数如实说「没有待复测的目标」；无台账 / 坏台账 → 字段与该行双双缺席（输出与功能前零变化）。复测结果照旧写进既有口述流水（不新增通道、不新增 source 枚举），不进掌握判据。

**考点全景（「报进度」，v0.13）**：进度统计之外的第二条派生——每考点三信号，按排布表 day 分组：

```bash
node "$KIT/scripts/mastery-report.mjs" --theme "$PWD/examples/$THEME" --progress "$PWD/progress.json" --panorama --json
```

- 三信号：**讲过** = 契约二学习记录（格式单源 [`contracts.md`](contracts.md)——`study/records/*.md` 的已过考点，显式 EP 前缀或考点名精确匹配）∪ 课已学完（全部课读完才点亮课程通道——部分读完不归因到考点，宁少报不虚报）；**练过** = 该考点有答题记录，或口头问答 > 0（弱信号；v0.14 起口头计数唯一真源 = 口头答题流水 `study/records/oral-attempts.json`，旧记录手写「口头题计数」节照读合并）；**掌握** = 掌握度四态判据不变。无 records、无流水、无进度时只报客观侧（答题驱动或全 false），不虚报。
- 聊天层**永远现算最新**（每次报进度重跑本命令）；学习台全景页每次打开/刷新直接读同一批源文件（答题进度、口述流水、学习记录），没有「等快照」的时滞——两端口径一致，不会互相打脸。
- **全景卡模板**（数字全部来自实测 JSON，按此渲染后紧跟一句推荐）：

  ```
  🗺️ 考点全景 · <theme>（已讲 X/N · 已练 Y/N · 已掌握 Z/N）
    <D1>｜已讲 x/n · 已练 y/n · 已掌握 z/n
      ✓讲 ✓练 ·掌  EP-01 暂存区（答 3/5 · 口头 2/3 · 未毕业错题 1）
      …（✓=亮 ·=未亮，逐考点一行；口头/错题仅在有值时带）
    <D2>｜…
  👉 下一步：<点名最该补的考点（弱考点优先，引用 mastery 报告）+ 一句为什么>
  ```

**学习计划（plan.json，快照「计划」行）**：进度/弱考点之外的第三条派生信号。主题可选数据 `plan.json`（带日程的学习计划：`deadline` + `units[]`，单元状态四态 planned/in-progress/done/paused 由学习流程维护——写入口径单源在 [`contracts.md`](contracts.md) 契约三，探测只读不改；派生值现算不写回，分层决策见仓库 ADR-0009）。有无计划一条命令自己会说，不要先 ls 试探再决定跑不跑：

```bash
node "$KIT/scripts/plan-report.mjs" --theme "$PWD/examples/$THEME" --progress "$PWD/progress.json" --json
```

- **`status: "noop"`（无 plan.json → reason missing；损坏 → broken）**：快照**跳过「计划」行**（dev-intro 即此基准）。noop 不是故障、不进诊断流程。**例外**：noop 输出仍带 `regression` 字段（热身挑题只吃题库+进度+考点四态，不吃 plan）——`regression.active=true`（断档 ≥ 3 天）时**回归动作行照出**（只有热身一题，`shift` 恒 null：无计划无日程可挪），判据同下面「断档回归动作」。
- **`status: "ok"` → 拼快照「计划」行**，字段全从本命令实测，不许编：
  - **覆盖**：`coverage.done/total`；当前单元 `coverage.current` 取 `<id> <title>`（`current` 为 null = 全完成或只剩搁置，如实报）。
  - **节奏·日历对照**：`calendarDiff.diffDays` + `state`——`behind` 报「落后 N 天」（N = −diffDays，锚逾期单元的最大 plannedDate；逐单元拖龄在 `overdue[].daysOverdue`，追问再展开）、`slack` 报「富余 N 天」、`due-today` 报「下一单元今天到期」、`cleared` 报「日程已清空」；`available=false`（计划里没有任何可解析的 `plannedDate`）→ 该段省略，不硬凑。
  - **断档**：`gap.daysSinceLastContact`（距最后一次学习接触的自然日数，answers/srs/课学完/口述四通道取最大，按本主题题/卡 id 集隔离；口述 = 主题包流水 ∪ `progress.oralAttempts` 回流副本并流——**微块口述题完成当天即算触达**，断档 0 天 = 今天已学过，v0.26 #123）；`available=false` → 报「无接触记录」，**不是 0 天**。
  - **断档回归动作（#120，断档 ≥ `regression.threshold`（3 天）才触发）**：`regression.active=true` 时快照在「计划」行后追加**回归动作行**（noop 主题无「计划」行时直接跟在上一行后），动作固定「先热身再续站」（与 学习台首页回归卡同一套动作——无计划主题 学习台侧也只出热身行，两侧一致）——
    - **热身一题**：`regression.warmup`（`questionId` + `ep`/`name` + 选站依据 `reason`：schedule=落后日程 / weak=薄弱 / structural=结构序 / fallback=回退）。推荐语带题号与考点名（「先热身：EP-02 分支 · GIT-005，一题找回手感」），学习者答完这题即完成热身；`warmup=null`（题库无计划内题）如实报「无可挑题」。
    - **可重排建议（#120 起、#125 升级为可执行重排）**：`regression.shift`——`available=true` 报「按实测速率（近 `windowDays` 天约 `daysPerUnit` 天/单元），剩余 `remaining` 单元约需 `estimatedDays` 天，可重排：确认后整体后移 `shiftDays` 天」。执行入口与自动重排**同一**（`report.reschedule.command`，计划生成器 `plan-generate` 按实测速率重写剩余单元 `plannedDate`）：教练场景先 `--dry-run` 出建议、学习者点头后去掉 flag 写回——**可否决**（不点头就不写，计划原样）；或 `--auto` 明示自动。`reason=no-rate`（长断档常见：近窗零完成）静默省略该段，`no-target`（无对照日）同理——绝不编数字；noop 主题 `shift` 恒 null，该段整段省略（无计划无日程可挪，不出「后移」话头）。
    - 无 deadline 主题的建议用中性语气（「比剩余日程多 N 天，可考虑整体后移」），不出「落后」类催办字样（零催办原则，同上）。
    - `regression.active=false`（断档 < 3 天的正常间隔）时**回归动作行整行省略**——输出与没有该功能前零变化。
  - **重排判定与视图（`reschedule` 字段，v0.27 #125）**：`needed=true`（behind=存在逾期单元 / gap=断档回归且后移建议可算，判据单源 `lib/plan-generate.mjs` shouldReschedule）→ 快照建议重排（确认后 agent 跑 `reschedule.command`，或 `--auto` 明示自动）；`view` 非空（最新重排审计 ≤ 7 天）→ 快照出「已重排：下一站 X，日期 Y」钩子行——债务红字退场的宣告面（学习台首页/全景同判据），审计历史全留 plan.json（`rescheduled[]`，可追溯）。
  - **下站预告（`next` 字段，v0.26 #124）**：与断档无关**恒出**（ok 与 noop 都有）——会话收尾开环预告的判据源：`{ep, name, reason, action: 'oral-3', minutes: 5}`，选站与热身同一套三级判据（落后日程 > 补弱 > 结构序，即下一站推荐口径），与题站会话总结页预告行（`src/lib/nextHook.ts`）同判据两侧一致。消费方：F10 收尾（站收尾与微块收尾固定产出一句话预告 + 落 `next-hook.json`，见 [`contracts.md`](contracts.md) 契约二「下站预告」）。`null`（全掌握/题库无考点标记）→ 如实收「下次开新篇」，不编预告。
  - **deadline**：`plan.deadline`（可选；未设就不报这一段）。
  - **单元状态概览**：`coverage.byStatus` 四态计数——快照行不逐个列，用户追问剩余单元时用 `coverage.remaining` 展开（含 in-progress 与 paused：搁置了也是没完成）。
- **与「陪练」行考期的口径区分**：本行的 deadline 是**学习计划期限**（plan.json）；「陪练」行的「距考期」是 **MISSION.md frontmatter deadline**——两个源两个行，不互替不合并（F11 冲刺的硬前置始终是后者）。
- `--progress` 显式传项目根的 `progress.json`（同 §3 的 `$CP`）；`--theme` 传 `examples/<theme>` 的绝对路径（外部主题包形态，脚本认）。速率外推（`projection`）快照行**不消费**——窗口 14 天无完成事件时脚本诚实降级不硬算；用户追问「照这个速度来得及吗」再引用其 `available/note`。

## 4. AI 配置（只报配齐与否，绝不回显值）

```bash
test -f .env && grep -cE '^(LLM_BASE_URL|LLM_API_KEY|LLM_MODEL)=..' .env   # =3 才算配齐
grep -cE '^TTS_PROVIDER=..' .env 2>/dev/null                                # TTS 有无（播客合成音频用）
echo "study-lang=${STUDY_LANG:-zh}"                                         # 可选：AI CLI 生成内容语言，缺省中文
```

`.env` 不存在或计数 < 3 → AI 缺配。生成内容语言（可选项，不配不算缺）：非中文学习者建议显式设——CLI 带 `--lang zh|en|es|ru`、或会话前置 `STUDY_LANG` 环境变量（上式已探当前值）；agent 直产路径（../skills/ask-coach/references/flows/F4.md、F6.md）生成内容语言直接跟随用户对话语言。分项就绪矩阵（哪个流程还差什么，一眼可见）：

| 能力 | LLM 三项 | 还需要 |
|------|----------|--------|
| F6 产课（teach） | 必需 | — |
| F4 串讲（grill CLI 路径） | 必需 | 项目根 `progress.json`（脚本直接读文件） |
| F5 播客（podcast） | 必需 | TTS 可选——缺则 `--no-tts` 只出逐字稿，不算阻塞 |

答题站/闪卡/考点掌握报告（mastery-report）不受影响（零 LLM）。补配走 `cp .env.example .env` 后填 `LLM_BASE_URL` / `LLM_API_KEY` / `LLM_MODEL` 三项（播客合成音频另加 `TTS_PROVIDER`）——插件用户填好即可用；贡献者形态的 provider 细节见仓库 `docs/configuration.md`。

## 5. 学习台

- **没有要起的服务**：首页/答题/闪卡/全景是 DSH 全局学习台的一部分，UI 在会话侧、数据在宿主侧，随 DSH 运行，不监听端口。不存在 `pnpm dev` / `pnpm run server` / `pm2` 这类进程，健康检查也不是 curl 一个 URL。
- **连线判据 = 项目路径连上了没有**：学习台右上角「项目路径」填的就是 §0 找到的那个目录。连上 → 顶部能看到主题与「已答 N」；没连上/连错 → 页面显示空主题或提示选项目。技能侧要做的只有一件事：把正确路径告诉用户填（不代填、不宣称能一键创建）。
- **快照「学习台」行**：`已连接 ✅ · <主题> · 项目 <路径>`，或 `未连接`（此时照跑探测，报告里注明数据来自文件、UI 尚未连上）。

## 6. 意图

从用户原话里提取，对照 SKILL.md 的意图路由表。用户只说了模糊的「学一会儿/继续」→ 走推荐算法，不追问。

## 7. 陪练与考期（快照第 8 行）

学习痕迹住**项目根**的 `study/` 伞目录，进度档案在项目根 `study/records/`（F10 逐考点写，只留本地）。旧项目里可能在主题包内 `<D>/study/records/` 或根级 `learning-records/`——都照读照报，数据层的解析顺序是「项目根 `study/records` → 项目根 `learning-records` → 主题包内旧位置」（三者只取先命中的一组，绝不两边同时读，避免迁移期重复计数）。

```bash
# 项目根 study/（轻布局）；R 指向实际有 records 的那层
ls study/records/ 2>/dev/null | sort || echo "records=none"
cat study/records/next-hook.json 2>/dev/null || echo "next-hook=none"   # 未认领的下站预告（#124；格式见 contracts.md 契约二）
grep -c '"status"' study/records/misconceptions.json 2>/dev/null || echo "misconceptions=none"   # 口述错因台账条数（#132；observed/diagnosis 与写入口径见 contracts.md 契约二）
test -d learning-records && echo "legacy=learning-records"
test -d "$D/study/records" && echo "legacy=theme-study"
grep -m1 '^mode:' "$D/COACH.md" 2>/dev/null        # 教学模式；COACH.md 缺失=静默（F10 首跑自建），不进快照
grep -m1 '^deadline:' "$D/MISSION.md" 2>/dev/null  # 考期 YYYY-MM-DD，没有就亮 ⚠
```

**读哪条记录**：在 `study/records/`（或旧目录 `learning-records/`）里找最新的**进行中**站——新格式看记录 frontmatter `status: in-progress`；无 frontmatter 的旧记录按 [`contracts.md`](contracts.md) 契约二的兼容规则识别：文件名带 `-in-progress` 后缀、或正文含「待办」节，也算进行中（只报事实，不要求手工补格式）。多条进行中取编号（文件名前缀 NN）最大的。

**快照第 8 行三形态**（只报事实，不解析语义）：

| 条件 | 形态 |
|------|------|
| 有进行中记录 | `进行中 <NN>·<topic> · 待办 N 条 · 模式 <mode>` |
| 有记录但无进行中 | `无进行中站（上次完成 <最近 done 记录的 topic>）`；没有 done 记录就只报 `无进行中站` |
| 无 `study/records/` 且无根级 `learning-records/` | `未启用` |

- `topic` 取记录 frontmatter，旧格式无 frontmatter 时用文件名 slug；`N` = 该记录「## 待办」清单里未勾选（`- [ ]`）的条数。
- `mode` 取值顺序：记录 frontmatter `mode`（用户可能中途换过）→ COACH.md frontmatter `mode` → 报「未设」。
- **未认领的下站预告（#124）**：`next-hook.json` 有内容 = 上次会话收尾留了预告（`{ep, name, minutes, leftAt}`，格式见 [`contracts.md`](contracts.md) 契约二「下站预告」）→ F10 第 0 步开场认领（「上次说好下次练 EP-XX，今天从它开始？」）。认领前对当前全景：该考点已掌握 → 跳过不认领（预告过期不是欠账）；`next-hook=none` → 什么都不说，零变化。
- **口述错因台账（#132）**：`misconceptions.json` 有内容（探测行报条数）= 上次会话留下了口述错因记忆——快照「陪练」行带 `错因台账 N 条`；条目里是学习者实际说错什么（observed 事实）+ 教练判断的根因（diagnosis 推断）。派生态（未清 / 已纠正 / 复发）不在这里数——报数用 §3 `mastery-report --json` 的 `misconceptions` 字段（status 由后续口述流水现算）。`misconceptions=none` → 什么都不说，零变化。

**考期（deadline）**：读 MISSION.md frontmatter `deadline: YYYY-MM-DD`——

- **缺失**：快照第 8 行追加 `⚠ deadline 未配置`。原则是不静默跳过、也不反复唠叨：F11 考前冲刺以 deadline 为硬前置，入口处会当场拦下引导补（见 flows.md F11 第 1 步），快照的 ⚠ 就是为那一刻准备的。
- **有值**：算倒计时并在快照体现为 `距考期 <N> 天`（N = 今天到 deadline 的整天数；N ≤ 7 即推荐算法第 7 条的 F11 触发档）；已过期的报 `考期已过 N 天`，同样只报事实。

**旧布局兼容**：探测遇根级 `learning-records/` → 按本节同样的判定规则照读照报（进不进行中、待办数、模式都照算），并在快照或报告追加一句提示：`检测到旧目录 learning-records/，可一次性迁入 study/records/（F10 兼容识别，迁移自愿）`。只提示不代迁，一次会话提一遍即可。

## 8. kit 版本（快照「版本」行，ADR-0006）

轻布局项目**没有 `kit/`**——内容工具随插件分发，用户项目只有 `examples/` + `progress.json` + `study/`。所以「版本」行探两处 + 一个软信号：插件快照版本、最新发布、以及旧项目残留的 kit 版本（只对迁移前的项目有意义）。

```bash
# 插件快照版本：本文件插件形态在 <插件根>/references/state.md（向上一级即插件根）；手动安装在 <安装根>/skills/references/state.md（向上两级即安装根，kit 同层）
cat <插件根>/kit/kit-version.json

# 旧项目残留（迁移前的老用户项目才可能有）——有就报，并提示走 F13 迁移
cat <项目>/kit/kit-version.json 2>/dev/null || echo "project-version=none"
```

- **两处都有**（含旧项目）→ 按号判断落后与否（不做语义化比较）；落后时报「落后 N 版」——N 优先读 `<插件根>/CHANGELOG.md` 数版本号；取不到 CHANGELOG 时降级为只报两处版本号、不数 N。快照行指 F13。
- **轻布局项目无版本文件 → 正常**，报「随插件 v<x>」，不报「版本未知」、不进诊断。
- 版本号相等 → 「已对齐」。

**第二处 · 最新发布（本体信号，spec #99 假绿探测）**：本地文件在插件本体落后于最新发布时仍报「已对齐」（假绿）。第二处探官网版本产物：

```bash
# URL 可用 ASK_KIT_VERSION_URL 覆盖（演练指桩 / 离线内网两用）；file:// 桩 curl 直读
curl --max-time 3 -sf "${ASK_KIT_VERSION_URL:-https://aistudykit.dev/version.json}" || echo "latest=unknown"
```

- **探测时机三站**：① /ask-coach Step 1（快照「版本」行的本体信号）；② F13 第 1 步复探（flows.md——绝不把项目对齐到旧快照）；③ 体检版本行（flows.md「体检」节）。其余场合不探。
- **软失败语义**：超时 / 解析失败（`latest=unknown`、非 JSON、无 `version` 字段）→ 注一句「最新版探测失败」，照报本地版本，**绝不报错、绝不阻塞**——快照「只读 ≤1 分钟」的离线性不因网络破。
- **判读**（同本地按号口径，不做语义化比较）：最新发布 = 快照版本 → 本体最新；快照版本在 `<插件根>/CHANGELOG.md` 版本序列里早于最新发布，或最新发布不在序列里（快照还不认识的已发布版）→ **本体落后**——报「快照 v<x> → 最新 v<y>」，引导先刷新插件本体（它是 F13 的前置，Route A/B 见 flows.md F13 第 1 步）；快照版本晚于最新发布（未发版的开发态）→ 本体最新。

**没有「部署实例」这一形态**：学习台不部署、不起进程、不监听端口，用户看到的就是 DSH 里那一个 UI，版本由插件渠道决定——所以不存在「实例自报版本」「实例落后于最新发布」这类判读，也不需要 curl 任何 `/api/health`。历史教训保留一句：**绝不比 JS bundle 哈希判版本**（同 commit 跨机器构建哈希必不同，会把同源误判成「线上是旧的」）。

**仓库本体形态（仓库 checkout 当项目用，贡献者 / 开发态）**：仓库本体没有 `examples/` 之外的轻布局、也没装插件——探 **git 落后程度**：

```bash
git fetch -q origin && git rev-list --count HEAD..origin/main 2>/dev/null || echo "behind=unknown"
```

- 输出数字 N → N = 0 报「仓库本体 · 与 origin/main 同步」；N > 0 报「仓库本体 · 落后 origin/main N 提交」，更新走 agent 代跑 git pull + 重建（意图路由表「升级/更新」仓库本体支线，路径见 flows.md F13「什么时候不用」）。
- `behind=unknown`（无 origin 远端 / fetch 失败 / origin/main 不存在）→ **同一软失败协议**：注一句「落后探测失败」，报「仓库本体」两个字，绝不报错、绝不阻塞。fetch 失败时不拿旧的 origin/main 参考算数（上面命令的 `&&` 链保证——fetch 不通一律 `behind=unknown`，不报过期数字）。
- git fetch / pull / rev-list 是工具链命令：agent 代跑可叙述，不派发给学习者手敲（CONTEXT.md「用户命令 / 工具链命令」的「可跑不可派」）。

## 快照之外的加分项（顺手看，不强制）

- `progress.json` 与 `study/` 在版本控制里（用户项目常有 git）→ 提一句「学习痕迹已被 git 跟踪，介意隐私就加 `.gitignore`」。
- 课程页白屏/空列表而题库正常 → 该主题目录缺 `lessons/`，或正看的主题不是当前 `progress.json` 的 `theme`（在学习台顶栏切回来即可）。