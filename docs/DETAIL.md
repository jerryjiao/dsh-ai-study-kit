# 详细设计与移植记录

本文记录 `dsh-ai-study-kit` 的完整设计：先把上游 `ai-study-kit` 的能力盘点清楚，再记录移植到 DSH 的映射（**skill 半边** + **学习台半边**）、文件清单、与上游的逐文件差异台账、验证方法，以及取舍记录。

> 一句话形态：上游是一个「独立答题站 + 五个学习教练 skill」；本插件把它改成「**DSH 全局学习台（页面由 DSH 承载）+ 同一套教练 skill**」，学习者不再需要 clone 仓库、装依赖、起 dev server / pm2。

## 1. 上游能力盘点（移植前）

上游 `ai-study-kit` 是一个「学习教练 skill 套件 + 答题站模板」。skill 操作的对象是**用户自己的学习项目**（一个纯数据目录，历史上由插件快照 `kit/` 复制而来）。

### 1.1 五个 skill

| skill | 职责 | 与原命令的关系 |
|-------|------|----------------|
| `ask-coach` | 主入口 / 路由。探测学习状态（项目、主题、进度、错题、到期闪卡、考期、版本）→ 生成快照 → 给推荐 → 落到具体流程执行。附带全部流程手册与 F1–F13 菜单。 | `/ask-coach` |
| `study-coach` | 陪练直入，坐下就学（F10 陪练教学）。 | `/study-coach`，等价于 ask-coach 的 F10 快捷 |
| `study-doctor` | 一站式体检：内容自检（题库 QA / 结构 / 排布表前提）+ 环境探测（LLM、TTS、项目路径、主题、进度与学习痕迹）+ 版本与契约完整性。 | `/study-doctor` |
| `study-recap` | 错题串讲直入（F4）。 | `/study-recap` |
| `study-podcast` | 播客直入（F5）。 | `/study-podcast` |

### 1.2 流程手册（F1–F13，主体在 `skills/ask-coach/references/`）

| 流程 | 名称 | 手册位置 |
|------|------|----------|
| F1 | 初始化项目（bootstrap：建轻目录 + 学习台连路径） | `flows.md` |
| F2 | 开新主题（new-theme） | `flows.md` |
| F3 | 每日学习（daily，在学习台里刷题） | `flows.md` |
| F4 | 错题串讲 | `flows/F4.md` |
| F5 | 做播客 | `flows/F5.md` |
| F6 | 产课 / 加课 | `flows/F6.md` |
| F7 | 改内容（content-edit，直改 `examples/<theme>/`） | `flows.md` |
| F8 | 内容自检（verify：qa / 结构 / 排布表前提） | `flows.md` |
| F9 | 部署（deploy，**已退役**：DSH 里没有部署这一步） | `flows.md` |
| F10 | 陪练教学 | `flows/F10.md` |
| F11 | 考前冲刺 | `flows/F11.md` |
| F12 | 知识图谱投影（graph projection） | `flows.md` |
| F13 | 迁移与升级（旧 `kit/` 布局 → 轻布局；插件本体更新） | `flows.md` |

另有 `skills/ask-coach/references/{coach.md,flows.md}`、`references/{contracts.md,state.md,voice.md}`（契约 / 状态探测 / 语气）作为支撑。

### 1.3 关键目录约定（移植后的目标形态）

- **用户学习项目 = 一个纯数据目录**（没有 `package.json`、没有 `node_modules`、没有服务）：
  - `<项目根>/examples/<theme>/` — 主题内容源（`questions.json`、`flashcards.json`、`MISSION.md`、`lessons/`、`theme-config.json`、`plan.json`）
  - `<项目根>/progress.json` — **唯一**进度文件（`answers` / `srs` / `theme` / `settings` / `oralAttempts` …）
  - `<项目根>/study/` — 学习痕迹（`records/` 学习档案与口述流水、`notes/`、`wrong-questions/`、`sprint/`）
- **项目探测顺序**：`cwd` → 学习台记住的上次路径 → `~/study-kit` → 用户在学习台右上「项目路径」手填。判据只有一条：目录下有 `examples/`。旧形态（`<项目>/kit/apps/quiz-app/`、`<项目>/kit/examples/`、`<项目>/apps/quiz-app/`）会被识别为 `legacy` 并提示走 F13 迁移。
- **`kit/` 是插件自带的内容工具快照**（`kit/apps/quiz-app/scripts/*` 的产课/产题/报告脚本 + `kit/examples/dev-intro` 演示主题，版本 `kit/kit-version.json` = `0.28.0`），**不是用户项目**：学习者不进去改内容、不往里写进度。
- 学习者**不再**启动独立 dev server / `pnpm run server` / pm2；页面由 DSH 提供，数据层直接读上面三个位置。

## 2. 移植到 DSH 的映射

### 2.1 skill 半边

DSH 的宿主插件没有「命令即 markdown」的机制，只有 **skill 注册**。因此映射如下：

| 上游概念 | DSH 落地 |
|----------|----------|
| 插件目录里的 `skills/<name>/SKILL.md` | `ctx.skills.register({ name, description, content, resourceBase, invocation, ... })` |
| `disable-model-invocation: true`（只给用户斜杠调用） | `invocation: { modelInvocable: false, userInvocable: true }` |
| skill 正文里的相对路径（`../../references/…` 等） | `resourceBase: { kind: 'directory', path: <skillDir> }`，DSH 渲染时打印绝对 base，正文相对路径按 base 解析 |
| 随包快照 `kit/` | 原样放在 bundle 根 `kit/`，`<插件根>/kit` 的约定继续成立 |
| 三份宿主 manifest（`.claude-plugin` / `.codex-plugin` / `.zcode-plugin`） | 不需要，改由 `package.json` 的 `dsh.bundle.patch` + `cordis.patch.yml` 声明 |

`lib/index.js`（构建产物，源码在 `src/`）的运行逻辑：

1. `pkgRoot()` = `lib/` 的上一级；插件版本从 `package.json` 读（失败回落 `0.0.0`）。
2. `skillDefinitions()` 遍历 `skills/` 下每个子目录，读 `SKILL.md`。
3. `parseFrontmatter()` 只解析本项目实际用到的扁平行（`name` / `description` / `disable-model-invocation`），剥掉 frontmatter，返回正文。
4. `apply(ctx)` 先在 `ctx.effect(...)` 内逐个 `ctx.skills.register(...)` 注册 5 个 skill（注册中途抛错则回滚已注册的），返回清理函数；再 `ctx.inject(['connection', 'webServer'], …)` 在子上下文里 `child.effect(...)` 挂学习台的 RPC 服务（状态域里记住项目路径，插件卸载时释放）。
5. 无运行时依赖：只用 Node 内置模块（`node:fs` / `node:path` / `node:url`）+ DSH 客户端包（页面侧）。

### 2.2 学习台半边（宿主 + 页面）

| 层 | 位置 | 职责 |
|----|------|------|
| 契约 | `src/shared/contract.js` | 宿主与页面共用的单一契约：`RPC_CHANNEL = '/dsh-ai-study-kit'`、`RPC_AUTHORITY = 'loopback'`、`ENDPOINTS = { snapshot, 'progress.save', 'project.set', 'theme.set', 'settings.set' }`、`Snapshot`/`ThemeData` 形状、`DEFAULT_SETTINGS` 与 `SETTINGS_KEYS` 白名单、空数据工厂 |
| 宿主 | `src/host/index.js`、`src/host/study/{project,content,progress}.js` | RPC 注册与信封校验（坏 payload 报 `invalid progress payload`）；项目探测；主题内容读取；进度读-合并-写 |
| 页面 | `src/client/app/**`（`StudyApp.tsx` + `pages/{Home,Practice,Flashcards,FlashcardsHome,Panorama,Courses}.tsx` + `api/`、`hooks/`、`lib/`、`i18n/`）、`src/client/{rpc.js,chrome.jsx,icon.jsx,index.jsx}`、`src/client/app.css` | 四个视图：**首页**（今日、推荐、进度概览）、**答题**、**闪卡**、**全景**（+ 课程页）；顶栏选主题 / 右上填「项目路径」 |
| 构建 | `scripts/build.mjs`（`build` / `build:client`） | esbuild 打包：`src/host` → `lib/index.js`，`src/client` → `lib/client.js` |
| 声明 | `package.json` 的 `dsh.client` | `platform: 'web'`，注入 `@deepseek-ai/dsh-client-{connection,runtime,locale,ui-layout,ui-sidebar}` |

数据流（没有 HTTP 服务）：

- 页面启动 → `ENDPOINTS.snapshot` 一次拿全量（项目 / 主题列表 / 当前主题内容 / 进度 / 偏好 / warnings），切主题后再调一次。**没有服务器推送**，要新数据就再调。
- 答题/闪卡写进度 → `ENDPOINTS['progress.save']` 上传**快照**，宿主做「读-合并-写」（`mergeProgress`，按记录时间戳取新、墓碑优先、`oralAttempts` 四元组去重），返回合并结果。
- 换项目 / 换主题 / 改偏好 → `project.set` / `theme.set` / `settings.set`（偏好走 `SETTINGS_KEYS` 白名单 patch）。
- 主题内容与学习痕迹由宿主**直读文件**派生（`theme` / `coverage` 在内存里算，不落盘）：`examples/<theme>/questions.json` 等是唯一内容源，无同步产物、无 build。

### 2.3 学习者路径 vs 开发者路径

- **学习者**：五个斜杠命令 + 自然语言 → 建轻目录 → 在学习台「项目路径」填绝对路径 → 四视图学习。`pnpm` / `npm` / `git` / `cp` 家族对学习者是**可跑不可派**（agent 可以代跑并口述，但不把工具链命令派给用户敲）。
- **开发者**（本仓库）：`npm test`、`npm run build`（`build:client`）、`npm run dev:install`、`npm run screenshots`、`npm run website:dev|build`；上游的 `scan`（品牌扫描，`scripts/brand-scan.py`）与 `check:alignment`（四对齐，`scripts/bidirectional-check.py`）属**开发态工具链**，仓库里带这两个 python 脚本时照旧跑，没带时技能文档要求 agent 按同一口径人工核（不派给学习者）。

## 3. 文件清单

| 路径 | 文件数 | 说明 |
|------|--------|------|
| `skills/` | 17 | 5 个 `SKILL.md` + `agents/openai.yaml` + `ask-coach/references/`（含 `flows/{F4,F5,F6,F10,F11}.md`） |
| `kit/` | 204 | 内容工具快照：`apps/quiz-app/`（脚本/类型/样式，无 node_modules、无构建产物）+ `examples/dev-intro/` 演示主题 + `kit-version.json`（`0.28.0`） |
| `references/` | 3 | `contracts.md` / `state.md` / `voice.md`（上游在 `skills/references/`，本仓库上提到根） |
| `src/` | 70 | `host/`（RPC 与数据层）、`client/`（页面）、`shared/`（两端共用契约） |
| `lib/` | 3 | 构建产物：`index.js`（宿主）、`client.js`（页面）、`index.js.map`；**不要手改** |
| `test/` | 2 | `plugin.test.mjs`（bundle/技能/上游差异台账）、`study-service.test.mjs`（宿主数据层） |
| `scripts/` | 4 | `build.mjs`、`dev-install.mjs`、`verify-host-data.mjs`、`screenshots/` |
| `locale/` | 2 | `en.json` / `zh.json` |
| 根 | — | `package.json`、`cordis.patch.yml`、`icon.png`、`CHANGELOG.md`、`README.md`、`LICENSE`、`GLOSSARY.md`、`docs/`、`website/`、`assets/` |

## 4. 与上游的具体差异（记录差异台账）

上游 `ai-study-kit` 与本仓库不是「逐字节一致」，而是**受控差异**：集成必然改写文档（独立答题站 → DSH 学习台）。所以 `test/plugin.test.mjs` 的上游完整性用例从「逐字节全等」改成**记录差异 allowlist**：

1. **路径映射**（`UPSTREAM_MAP`）：`skills/` ↔ 上游 `skills/`；`references/` ↔ 上游 `skills/references/`（上提到根）；`kit/apps/quiz-app` ↔ 上游 `apps/quiz-app`；`kit/examples` ↔ 上游 `examples/`。
2. **快照裁剪规则**（`prune`，每条带理由）：上游有、快照故意不带的文件必须命中规则，否则用例失败 —— `assets-src/`、`public/study/`、`src/data/`（sync 产物）、`progress.json`（运行时数据）、`dist/`、`node_modules/`、`*.tsbuildinfo`、`vite.config.{js,d.ts}`、`examples/software-designer/`（上游多出的演示主题，快照只带 `dev-intro`）、`examples/*/study/`（演示用户数据）。
3. **逐文件差异台账**（`UPSTREAM_DIFFS`）：**未登记的字节差异一律让用例失败**；登记项在测试输出里打印「文件 @行号 + 理由」。当前 17 条：

| # | 文件 | 差异内容 |
|---|------|----------|
| 1 | `skills/ask-coach/SKILL.md` | 快照字段（版本/服务 → 项目/学习台/主题来自 `progress.json`）、意图路由前置（F3 不再要 `pnpm dev`、F9 退役）、硬红线 1–4 改写（去 `EXAMPLE_THEME`、`src/data` 同步产物、发布门） |
| 2 | `skills/ask-coach/references/coach.md` | 品牌自查措辞：学习项目里没有 `scan` 脚本，按同口径自查，去发布门禁 |
| 3 | `skills/ask-coach/references/flows.md` | F1 建轻目录 + 学习台连路径；F2/F7 只改 `examples/<theme>/`、产课/产题脚本走 `kit/` 快照并显式传绝对主题；F8 由四门校验改为内容自检；F9 部署整节退役（无 pm2 / 无 `:8787` / 无 `EXAMPLE_THEME`）；F13 由「覆盖升级」改为「迁移（备份 → copy → 验计数 → 才删旧）+ 插件更新」；体检去 `:8787` 探活与 sync 新鲜度；诊断表按新故障重写；F12 报告脚本走 `kit/` 快照 |
| 4 | `skills/ask-coach/references/flows/F4.md` | 前置去「后端在线」；学习者档案改 `<项目根>/study/records/profile.json`（旧位置回退读）；CLI 标注旧 `SERVER → /api/progress` 形态跑不通；去 `scan` + `build` 门禁 |
| 5 | `skills/ask-coach/references/flows/F5.md` | 播客脚本路径改 `<插件根>/kit/apps/quiz-app/scripts/podcast-generate.mjs` + 绝对 `--input` |
| 6 | `skills/ask-coach/references/flows/F6.md` | 产课脚本路径同上（`teach-generate.mjs`） |
| 7 | `skills/ask-coach/references/flows/F10.md` | 链接修正 `](../voice.md)` → `](../../../../references/voice.md)`；口头流水改**纯落盘**（删 `POST /api/oral-attempts`、删 `accepted` 断言）；`study/` 学习痕迹改项目根；报告/计划脚本走 `kit/` 快照并显式传 `--progress` |
| 8 | `skills/ask-coach/references/flows/F11.md` | 去「`scan` 零命中随 build 上站」，改「落盘即在学习台可见」 |
| 9–12 | `skills/{study-coach,study-doctor,study-podcast,study-recap}/SKILL.md` | 分流措辞与前置：答题站 → 学习台「答题」视图；体检描述改内容自检 + 环境探测 + 版本/契约；错题串讲前置去「后端在线（`pnpm run server`）」 |
| 13 | `references/state.md` | 探测协议：项目判据改 `examples/`（cwd → 上次路径 → `~/study-kit` → 手填）、主题取 `progress.json.theme`、库存/进度直读 `examples/` 与根 `progress.json`（删 `/api/health`、`/api/progress` curl 与临时文件回落）、报告脚本走 `kit/` 并显式传 `--theme`/`--progress`、记录目录改根 `study/records`、版本三态去「项目 `kit/` 版本」与「部署实例」，仓库本体改判 `git` 落后 |
| 14 | `references/contracts.md` | 契约二学习记录目录改 `<项目根>/study/records`；口述改**纯文件写入**（无回流 API、无 `{ok,accepted,skipped}`）；台账 / `next-hook.json` 落项目根；`plan-generate` 走 `kit/` 快照 |
| 15 | `references/voice.md` | 仅引用路径：`references/` 上提到根后 `../ask-coach/...` → `../skills/ask-coach/...`（口吻口径一字未动） |
| 16–17 | `kit/apps/quiz-app/scripts/lib/theme-path.mjs`、`theme-path.test.mjs` | 隐私清洗：上游示例里的服务器用户名替换为中性占位 |

除上述 17 个文件外，映射内的其余文件**与上游逐字节一致**；文件集也必须一致（除命中裁剪规则的上游文件）。用例还会做两项定向回归：`F10.md` 的链接必须指向存在的 `references/voice.md`；`skills/`、`references/` 里不得残留 `/home/<user>/…` 形式的个人绝对路径。

## 5. 验证方法与结果

`npm test`（`node --test test/*.test.mjs`）共 22 个用例，当前 **21 通过 + 1 跳过**（跳过项需 `AI_STUDY_KIT_SRC` 环境变量才跑）：

`test/plugin.test.mjs`（11）：

1. 导出 cordis bundle 形状（`name` / `inject` / `apply`）。
2. `package.json` 声明 `dsh.bundle.patch`，`main` 与 patch 文件存在。
3. `cordis.patch.yml` 的 `id` / `name` 与包名一致。
4. `skillDefinitions()` 返回 5 个 skill，策略、`resourceBase`、`metadata` 正确。
5. 每个 skill 目录名与其 frontmatter `name` 一致（kebab-case）。
6. frontmatter 解析保留中文标点，正文从 markdown 标题开始。
7. `apply()` 注册 5 个 skill 且卸载全部 dispose；同时断言向 `connection` + `webServer` 注入学习台 RPC。
8. `skills/` 与 `references/` 里所有相对 markdown 链接都能解析（0 断链）。
9. `kit/kit-version.json` 与 `CHANGELOG.md` 标题对齐（`0.28.0`）。
10. `icon.png` 是真 PNG，locale 元数据完整。
11. **上游比对（记录差异 allowlist）**：路径映射 + 文件集一致 + 裁剪规则 + 未登记差异失败 + 定向回归（见第 4 节）。

`test/study-service.test.mjs`（11）：宿主数据层的项目探测（cwd/remembered/home/手填）、主题列举与 slug 校验、进度读-合并-写（时间戳取新、墓碑、`oralAttempts` 去重）、坏 `progress.json` 拒绝覆盖（`EPROGRESS_CORRUPT`）、未选项目时写操作拒绝等。

跑上游比对：

```bash
AI_STUDY_KIT_SRC=/path/to/ai-study-kit npm test
```

实测输出会打印每条差异的文件与首行不同处，例如 `diff skills/ask-coach/references/flows.md @line 4: …`，共 17 条，用例通过。没有该环境变量时用例 skip（不联网、不依赖外部仓库）。

### 真实环境安装验证

在 DSH 0.2.2-rc.3 中以本地目录方式安装本 bundle（`plugin_manager install_bundle`，pnpm 以 link 方式挂载本地目录），`plugin_manager list_plugins` 显示 `dsh-ai-study-kit` 的 `fiberPhase=active`，即 `apply()` 已执行、5 个 skill 注册成功；同一 bundle 以 GitHub 形式安装（`plugin_manager install_bundle target="github:jerryjiao/dsh-ai-study-kit"`）也得到 `fiberPhase=active`，说明站点给出的 `dsh plugin add github:owner/repo` 安装路径成立。验证后均用 `plugin_manager remove_bundle` 卸载，不污染 profile。（若目标环境不允许安装本地插件，则以 `npm test` 全部通过为功能验证依据，安装步骤按 README 手动执行。）

## 6. 取舍记录

- **两半都做进插件，不保留独立服务**：页面（`src/client`）与宿主数据层（`src/host`）都随插件走，学习者的项目只是一个数据目录 —— 没有 dev server、没有 `:8787`、没有 pm2，也没有「部署」这一步。
- **数据层读文件，不做数据库/HTTP API**：`examples/<theme>/`、`progress.json`、`study/` 就是权威存储；宿主读完在内存派生 `theme`/`coverage`，不落中间产物（上游 `src/data/*.json` 这类 sync 产物整类消失）。
- **进度写用「读-合并-写 + tmp→rename」并拒绝覆盖坏文件**：多标签/多设备并发时页面提交的是快照，直接覆盖会丢另一边的记录；而 `progress.json` 解析失败时**拒绝写**（报 `EPROGRESS_CORRUPT`）而不是按空进度重置——重置会静默清零用户历史。
- **技能与页面共用同一份目录约定**：判据统一为「目录下有 `examples/`」，所以技能建的目录、学习台探测的目录、报告脚本读的目录是同一个，不会出现「技能说有项目、页面说没项目」。
- **`kit/` 整包携带而非按需下载**：内容工具（产课/产题/串讲/报告脚本）离线可用、版本可复现（`kit-version.json`），但它是**工具快照**不是用户项目：学习者不往里写数据，升级靠插件更新而不是覆盖用户目录。
- **`invocation` 映射 `disable-model-invocation`**：忠实保留「只给用户斜杠入口、不自动进模型目录」的原语义；已有 5 个 skill 全部注册，不因集成退化。
- **零运行时依赖（宿主侧）**：只用 Node 内置模块与 DSH 客户端包，降低安装与审计成本。
- **上游完整性用「记录差异 allowlist」而非全量字节相等**：集成必然改写文档，若继续要求逐字节相等，要么测试必红、要么有人偷偷关掉它；改成「未登记差异即失败 + 每条差异写明理由」后，既能挡住上游漂移，也能让每处改写都有据可查（第 4 节的 17 条）。

## 7. 隐私检查

- 不含姓名、邮箱、电话、住址、身份证号等个人隐私信息。
- 已清除上游示例里出现的个人服务器用户名（见第 4 节台账第 16–17 条，且上游比对用例断言 `skills/`、`references/` 里不再出现 `/home/<user>/…`）。
- 不含任何密钥、令牌、`.env` 真实值或私有服务地址。
- `LICENSE` 版权方写为 `dsh-ai-study-kit contributors`，非个人。

## 8. Logo

- 源文件 [assets/logo.svg](../assets/logo.svg)：512×512 矢量，圆角深海蓝底 + 打开的白色书 + 青绿学习火花 + 底部成长弧线；不依赖任何字体或外链。
- 导出 `assets/logo.png`（512×512，透明圆角外缘）用于 README；`icon.png`（256×256）为其缩放版，作为 DSH 插件图标与条目 icon。
- 渲染方式可复现：用无头 Chrome 以 `--window-size=512,512 --default-background-color=00000000` 截取 SVG，再用 `sips -z 256 256` 生成 icon。
