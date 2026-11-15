# 详细设计与移植记录

本文记录 `dsh-ai-study-kit` 的完整设计：先是上游 `ai-study-kit` 的能力盘点，再是移植到 DSH 的映射、文件清单、与上游的唯一差异、验证方法，以及取舍记录。

## 1. 上游能力盘点（移植前）

上游 `ai-study-kit` 是一个「学习教练 skill 套件 + 答题站模板」。它的全部能力落在一套 skill 上，skill 操作的对象是**用户自己的学习项目**（默认 `~/study-kit/`，由插件快照 `kit/` 复制而来）。

### 1.1 五个 skill

| skill | 职责 | 与原命令的关系 |
|-------|------|----------------|
| `ask-coach` | 主入口 / 路由。探测学习状态（进度、错题、到期闪卡、考期、版本）→ 生成快照 → 给推荐 → 落到具体流程执行。附带全部流程手册与 F1–F13 菜单。 | `/ask-coach` |
| `study-coach` | 陪练直入，坐下就学（F10 陪练教学）。 | `/study-coach`，等价于 ask-coach 的 F10 快捷 |
| `study-doctor` | 一站式体检：品牌扫描 / 题库 QA / 四对齐 / 测试 + 环境探测、诊断。 | `/study-doctor` |
| `study-recap` | 错题串讲直入（F4）。 | `/study-recap` |
| `study-podcast` | 播客直入（F5）。 | `/study-podcast` |

### 1.2 流程手册（F1–F13，主体在 `ask-coach/references/`）

| 流程 | 名称 | 手册位置 |
|------|------|----------|
| F1 | 初始化项目（bootstrap，零 clone，把 `kit/` 快照复制成用户项目） | `flows.md` |
| F2 | 开新主题（new-theme） | `flows.md` |
| F3 | 每日学习（daily） | `flows.md` |
| F4 | 错题串讲 | `flows/F4.md` |
| F5 | 做播客 | `flows/F5.md` |
| F6 | 产课 / 加课 | `flows/F6.md` |
| F7 | 改内容（content-edit） | `flows.md` |
| F8 | 校验发布（verify） | `flows.md` |
| F9 | 部署（deploy） | `flows.md` |
| F10 | 陪练教学 | `flows/F10.md` |
| F11 | 考前冲刺 | `flows/F11.md` |
| F12 | 知识图谱投影（graph projection） | `flows.md` |
| F13 | 升级（upgrade，ADR-0006） | `flows.md` |

另有 `references/{coach.md,flows.md}`、`references/{contracts.md,state.md,voice.md}`（契约 / 状态探测 / 语气）作为支撑。

### 1.3 关键目录约定

- `<插件根>`：`skills/ask-coach/references/flows.md` 向上三级，即插件根。
- 快照：`<插件根>/kit/`，版本文件 `<插件根>/kit/kit-version.json`。
- 用户项目：F1 用 `cp -r <插件根>/kit <项目>/kit` 建出，默认 `~/study-kit/`。
- 升级（F13）：备份 `progress.json` / `theme.json` / `.env` → `rm -rf <项目>/kit && cp -r <插件根>/kit <项目>/kit` → 回拷。
- 运行：用 `pnpm` / `node` 跑项目里的 `scripts`。

## 2. 移植到 DSH 的映射

DSH 的宿主插件没有「命令即 markdown」的机制，只有 **skill 注册**。因此映射如下：

| 上游概念 | DSH 落地 |
|----------|----------|
| 插件目录里的 `skills/<name>/SKILL.md` | `ctx.skills.register({ name, description, content, resourceBase, invocation, ... })` |
| `disable-model-invocation: true`（只给用户斜杠调用） | `invocation: { modelInvocable: false, userInvocable: true }` |
| skill 正文里的相对路径（`../../references/…` 等） | `resourceBase: { kind: 'directory', path: <skillDir> }`，DSH 渲染时打印绝对 base，正文相对路径按 base 解析 |
| 随包快照 `kit/` | 原样放在 bundle 根 `kit/`，`<插件根>/kit` 的约定继续成立 |
| 三份宿主 manifest（`.claude-plugin` / `.codex-plugin` / `.zcode-plugin`） | 不需要，改由 `package.json` 的 `dsh.bundle.patch` + `cordis.patch.yml` 声明 |

`lib/index.js` 的运行逻辑：

1. `pkgRoot()` = `lib/` 的上一级。
2. `skillDefinitions()` 遍历 `skills/` 下每个子目录，读 `SKILL.md`。
3. `parseFrontmatter()` 只解析本项目实际用到的扁平行（`name` / `description` / `disable-model-invocation`），剥掉 frontmatter，返回正文。
4. `apply(ctx)` 在 `ctx.effect(...)` 内逐个 `ctx.skills.register(...)`，返回清理函数（插件卸载时逐个 `dispose()`）。
5. 无运行时依赖：只用 `node:fs` / `node:path` / `node:url`。

## 3. 文件清单

| 路径 | 文件数 | 说明 |
|------|--------|------|
| `skills/` | 17 | 五个 skill 的 `SKILL.md` + `agents/openai.yaml` + `ask-coach/references/`（含 `flows/F4,F5,F6,F10,F11.md`） |
| `kit/` | 204 | 完整答题站快照（`apps/`、`examples/`、`kit-version.json`），版本 `0.28.0` |
| `references/` | 3 | `contracts.md` / `state.md` / `voice.md` |
| `lib/` | 1 | `index.js`（插件入口） |
| `locale/` | 2 | `en.json` / `zh.json` |
| `test/` | 1 | `plugin.test.mjs` |
| 根 | — | `package.json`、`cordis.patch.yml`、`icon.png`、`CHANGELOG.md`、`README.md`、`LICENSE` |

`skills/`、`kit/`、`references/`、`icon.png`、`CHANGELOG.md` 均从上游插件目录原样拷贝。

## 4. 与上游的内容差异（两类，共 4 个文件）

拷入的 `skills/`、`kit/`、`references/`、`icon.png`、`CHANGELOG.md` 默认原样保留。只有以下两类必要改动，均在 `test/plugin.test.mjs` 的上游一致性用例白名单中：

**（a）链接修正（1 个文件）**

- `skills/ask-coach/references/flows/F10.md`：把一处写错的反向链接 `](../voice.md)` 改为 `](../../../../references/voice.md)`。

原因：`voice.md` 在插件根的 `references/` 下，原写法会指向 `skills/ask-coach/references/voice.md`（不存在）。迁移后资源基址就是 skill 目录，旧链接同样解析不到，故按正确相对路径修正。

**（b）隐私清洗（3 个文件）**

把上游部署示例/测试里出现的服务器用户名 `u` 替换为中性占位 `example-user`（不改变语义，仅去标识）：

- `skills/ask-coach/references/flows.md`（F9 部署段的自定义主题路径示例）
- `kit/apps/quiz-app/scripts/lib/theme-path.mjs`（注释里的外部主题路径示例）
- `kit/apps/quiz-app/scripts/lib/theme-path.test.mjs`（同一示例的用例）

除以上 4 个文件外，其余拷入文件与上游逐字节一致（由 `AI_STUDY_KIT_SRC` 完整性用例校验，且断言上述文件中已不含原始用户名）。

## 5. 验证方法与结果

`npm test` 共 11 个用例，全部通过：

1. 导出 cordis bundle 形状（`name` / `inject` / `apply`）。
2. `package.json` 声明 `dsh.bundle.patch`，且 `main` 与 patch 文件存在。
3. `cordis.patch.yml` 的 `id` / `name` 与包名一致。
4. `skillDefinitions()` 返回 5 个 skill，策略、`resourceBase`、`metadata` 正确。
5. 每个 skill 目录名与其 frontmatter `name` 一致，且符合 kebab-case 正则。
6. frontmatter 解析保留中文标点，正文从 markdown 标题开始。
7. `apply()` 经 `ctx.effect` 注册 5 个 skill，卸载时全部 dispose。
8. `skills/` 与 `references/` 里所有相对 markdown 链接都能解析到真实文件（0 断链）。
9. `kit/kit-version.json` 版本与 `CHANGELOG.md` 标题对齐（`0.28.0`）。
10. `icon.png` 是真 PNG，locale 元数据完整。
11. 拷入的 `skills/` / `kit/` / `references/` 与上游路径集合一致、逐字节一致（白名单为第 4 节列出的 4 个文件）。

### 真实环境安装验证

在 DSH 中以本地目录方式安装本 bundle，`plugin_manager list_plugins` 显示本插件 `fiberPhase=active`，即 `apply()` 已执行、5 个 skill 注册成功；验证后卸载，不污染 profile。（若目标环境不允许安装本地插件，则以 `npm test` 全部通过为功能验证依据，安装步骤按 README 手动执行。）

## 6. 取舍记录

- **只做 Host 半边，不做浏览器半边**：上游能力全是 skill 驱动的文本/流程，没有前端界面需求。做成纯 skill 插件即可完整承载，避免引入 web 构建与额外依赖。
- **`kit/` 原样整包携带而非按需下载**：保证离线可用、版本可复现，`<插件根>/kit` 的路径约定零改动。
- **`invocation` 映射 `disable-model-invocation`**：忠实保留「只给用户斜杠入口、不自动进模型目录」的原语义。
- **零运行时依赖**：只用 Node 内置模块，降低安装与审计成本。
- **完整性用测试锁定**：用 `AI_STUDY_KIT_SRC` 做上游逐字节比对，保证「功能无遗漏、内容无漂移」可被持续验证。

## 7. 隐私检查

- 不含姓名、邮箱、电话、住址、身份证号等个人隐私信息。
- 已清除上游示例里出现的个人服务器用户名（见第 4 节（b））。
- 不含任何密钥、令牌、`.env` 真实值或私有服务地址。
- `LICENSE` 版权方写为 `dsh-ai-study-kit contributors`，非个人。
