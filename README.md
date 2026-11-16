<p align="center">
  <img src="assets/logo.png" alt="dsh-ai-study-kit logo — an open book with a learning spark" width="140">
</p>

<h1 align="center">dsh-ai-study-kit</h1>

<p align="center">把 AI 学习教练装进 DeepSeek Harness：一个内嵌「学习台」面板，加五个 <code>/study-*</code> 命令。</p>

<p align="center">
  <a href="https://jerryjiao.github.io/dsh-ai-study-kit/">官网</a> ·
  <a href="https://jerryjiao.github.io/dsh-ai-study-kit/docs/">文档</a> ·
  <a href="https://jerryjiao.github.io/dsh-ai-study-kit/changelog/">更新日志</a> ·
  <a href="CHANGELOG.md">CHANGELOG</a> ·
  <a href="docs/adr/">ADR</a>
</p>

![学习台首页：已答、正确率、错题、已看一屏看完](website/public/screenshots/home.png)

## 这是什么

插件有两半，共用同一份本地学习数据：

- **学习台（面板）**：答题站本体的 DSH 内嵌版。首页 / 答题 / 闪卡 / 全景四页，顶部二级 tab 切换，中英双语。题目、闪卡、课程直接读你的学习项目目录，进度写回同目录的 `progress.json`。
- **五个 skill 命令**：`/ask-coach` 是主入口（探测学习状态 → 快照 → 推荐 → 带执行），另外四个是它的直入快捷方式。

插件不联网、不收集数据，学习内容只在你本机。技能正文、答题站快照来自开源项目 [ai-study-kit](#来源与致谢)。

## 快速开始

### 1. 安装

```bash
dsh plugin --profile web add \
  github:jerryjiao/dsh-ai-study-kit
```

`web` 换成你的 profile 名（`dsh plugin` 强制要求 `--profile`）。装完插件状态为 `active` 即成功：侧栏出现「学习台」图标，五个 `/study-*` 命令可用。

### 2. 打开学习台

点侧栏「学习台」。插件会按顺序找你的学习项目根目录：

1. 上次记住的路径（你手选过的优先，学习台是全场局面板，不被无关的工作目录带偏）；
2. DSH 当前工作目录（若里面有 `examples/`）；
3. `~/study-kit`；
4. 都没有就弹目录选择器。

想先看效果：克隆本仓库后把项目根指向仓库里的 `kit/`，就能打开自带的示例主题 `dev-intro`。

### 3. 用起来

首页给「继续上次 / 错题重练 / 随机 10 题 / 按主题闯关」四个入口；答题页当场判分给解析；闪卡按到期时间排队；全景页按掌握程度给考点着色并推荐下一站。

## 学习项目长什么样

项目根是你放学习内容的目录，插件只认这个结构：

```
我的学习项目/                    ← 项目根，位置随意
├── examples/
│   └── git-basics/              ← 一个主题一个目录
│       ├── questions.json       # 题目：单选 / 多选 / 判断
│       ├── flashcards.json      # 闪卡：正面 / 背面 / 考点
│       ├── plan.json            # 学习计划（可选）
│       ├── theme-config.json    # 主题标题等展示配置
│       ├── MISSION.md           # 排布表：考点 → EP / day
│       └── lessons/*.html       # 课程页
└── progress.json                ← 进度，插件自动创建并合并写回
```

- 题目字段示例：`{ id, type, topic, day, examPoint, question, options, answer, analysis }`，`type` 取 `single` / `multiple` / `judge`。
- 各文件作用与直读约定见 [docs/DETAIL.md](./docs/DETAIL.md)；整个示例主题可直接抄 `kit/examples/dev-intro` 当模板。
- 想让教练按流程开新主题，用 `/study-coach` 的 F2 流程（流程表见 `skills/ask-coach/references/`）。

## 学习台

| 页面（顶部 tab） | 做什么 |
|------|--------|
| 首页 | 已答 / 正确率 / 错题 / 已看一屏看完；继续上次、错题重练、随机 10 题、按主题闯关都在这里起步 |
| 答题 | 单选、多选、判断题当场判分；错了给解析，多选题全对才算对 |
| 闪卡 | 按到期时间排队，翻面看答案，评完「忘了 / 模糊 / 记得」下一张什么时候来就定了 |
| 全景 | 考点按「已掌握 / 在学 / 薄弱 / 未接触」四态着色，下一站推荐直接跳去补 |

![答题页：当场判分并给解析](website/public/screenshots/practice.png)

几个实现上的取舍：

- **直读源文件**：从 `<项目根>/examples/<主题>/` 读 JSON 和 HTML，不走构建产物，改完题目刷新即生效，没有 sync 步骤（[ADR 0002](./docs/adr/0002-直读examples源文件.md)）。
- **无服务、无端口**：页面与宿主走本机回环 RPC，不启 HTTP 服务、不设代理（[ADR 0004](./docs/adr/0004-切除服务层保留内容流水线.md)）。
- **进度写回是原子的**：读 → 合并 → 写临时文件 → rename；`progress.json` 损坏或形状不对时拒写并报 `EPROGRESS_CORRUPT`，绝不重置你的记录。
- **中英双语**：界面右上角切换，选择会记住。
- **旧布局只提示不改**：集成前从 kit 仓库拷出来的布局（`kit/apps/quiz-app/examples`、`kit/examples`）能被识别并提示迁移，插件不会动你的文件。

更多截图（闪卡、全景、深色）：[官网 · 学习台长什么样](https://jerryjiao.github.io/dsh-ai-study-kit/#shots)。

## 五个命令

| 命令 | 直入什么 |
|------|----------|
| `/ask-coach` | 主入口：探测学习状态（进度、错题、到期闪卡、考期、版本）→ 快照 + 推荐 → 带执行 |
| `/study-coach` | 陪练直入：坐下就学（F10 陪练教学） |
| `/study-doctor` | 一站式体检：品牌扫描 / 题库 QA / 四对齐 / 测试 + 环境探测 |
| `/study-recap` | 错题串讲直入（F4） |
| `/study-podcast` | 播客直入（F5） |

五个 skill 都是**用户斜杠调用**（`userInvocable`），默认不自动进模型目录（对应原工程的 `disable-model-invocation: true`）。部分宿主会给命令加插件命名空间前缀，如 `/dsh-ai-study-kit:ask-coach`。

## 安装的三种方式

- **GitHub 直装**（推荐）：`dsh plugin --profile web add github:jerryjiao/dsh-ai-study-kit`
- **本地目录**（开发 / 未发布）：插件管理页添加本地插件指向仓库根目录，或 `dsh plugin --profile web add /绝对路径/dsh-study-kit`
- **按包名**（发布到 npm 后）：`dsh plugin --profile web add dsh-ai-study-kit`

本插件是标准 DSH bundle：`package.json` 的 `dsh.bundle.patch` 指向 `cordis.patch.yml`，`dsh.client` 声明学习台前端资源。卸载：`dsh plugin --profile web remove dsh-ai-study-kit`。

## 遇到问题

- **侧栏没有「学习台」**：插件没进 `active`。去插件管理页看状态，或 `dsh plugin --profile web list`。
- **命令带前缀**：部分宿主会给命令加插件命名空间，试试 `/dsh-ai-study-kit:ask-coach`。
- **提示找不到学习项目**：确认所选目录下有 `examples/<主题>/`，或让教练用 F2 流程开新主题。
- **旧布局提示迁移**：把 `kit/apps/quiz-app/examples` 或 `kit/examples` 下的主题挪进项目根的 `examples/`；插件只提示，不动你的文件。

## 仓库结构

```
dsh-study-kit/
├── package.json          # bundle 清单（patch、client）
├── cordis.patch.yml      # 把本插件 insert 进 DSH
├── lib/index.js          # Host 入口：注册 skills
├── lib/client.js         # 学习台前端产物（勿手改）
├── src/host/             # 项目探测、读 examples、写进度
├── src/client/           # 四页、tab、i18n、状态管理
├── skills/               # 五个 skill（含参考资料）
├── kit/                  # 答题站快照 + 示例 dev-intro
├── references/           # 契约 / 状态探测 / 语气
├── locale/               # en / zh 元数据
├── docs/adr/             # 架构决策 0001–0005
├── scripts/              # build、dev-install、截图
├── website/              # Astro 官网（三页）
├── test/                 # node:test 两个测试文件
├── CHANGELOG.md
└── LICENSE
```

## 工作原理

`lib/index.js` 在 `apply(ctx)` 里对每个 `skills/<name>/SKILL.md` 剥掉 frontmatter，用 `ctx.skills.register(...)` 注册，并把 **skill 目录本身**作为 `resourceBase`。因为基址就是 skill 目录，正文里的相对路径（`../../references/*.md`、`<插件根>/kit/…`）按 DSH 打印的绝对 base 原样解析，和原工程布局一致。

学习台半边：`ctx.slots.inject('main')` + `ctx.slots.inject('sidebar.panellist')` 注册面板与侧栏入口，前端由 `src/client` 打包成 `lib/client.js`，与宿主经回环 RPC 通信。设计取舍与决策记录见 [docs/adr/](./docs/adr/)。

## 兼容性

- DSH：`>=0.2.1-rc.5 <0.3.0`
- Node.js：`^22.19.0 || >=24.0.0`（构建与测试；插件运行时只用 Node 内置模块）

## 开发与测试

```bash
npm test              # 全部 node:test 用例
npm run build         # 重新打包 lib/index.js 与 lib/client.js（src/ → lib/）
npm run website:build # 构建官网到 website/dist/
npm run screenshots   # 用 Playwright 重拍官网截图（需自备隔离的 DSH profile）
```

测试覆盖：bundle 清单与 cordis patch 一致性、五个 skill 的注册策略与 `resourceBase`、frontmatter 解析、`apply()` 注册与卸载、正文内相对链接全部可达、`kit` 版本与 CHANGELOG 对齐、icon 与 locale 完整性；学习台侧覆盖槽注册（`main` + `sidebar.panellist`）、四页渲染、双语资源、`examples/` 读取与路径逃逸校验、`progress.json` 合并写回与损坏拒写。设置 `AI_STUDY_KIT_SRC=<上游插件目录>` 时会逐字节比对拷入的 `skills/`、`kit/`、`references/` 与上游一致（已记录的链接修正与隐私清洗见 [docs/DETAIL.md](./docs/DETAIL.md)）。

## 文档

- [官网](https://jerryjiao.github.io/dsh-ai-study-kit/)：功能概览与截图
- [文档页](https://jerryjiao.github.io/dsh-ai-study-kit/docs/)：安装、学习项目结构、数据格式
- [更新日志](CHANGELOG.md) / [网站版](https://jerryjiao.github.io/dsh-ai-study-kit/changelog/)
- [详细设计与移植记录](./docs/DETAIL.md)：上游能力盘点、映射、差异台账、验证方法
- 架构决策：
  - [ADR 0001 学习台注册为 main 面板](./docs/adr/0001-学习台注册为-main-面板.md)
  - [ADR 0002 直读 examples 源文件](./docs/adr/0002-直读examples源文件.md)
  - [ADR 0003 学习项目轻结构](./docs/adr/0003-学习项目轻结构.md)
  - [ADR 0004 切除服务层、保留内容流水线](./docs/adr/0004-切除服务层保留内容流水线.md)
  - [ADR 0005 截图使用虚构数据与临时 HOME](./docs/adr/0005-截图使用虚构数据与临时HOME.md)

## 来源与致谢

skill 正文、`kit/` 快照与 `references/` 来自开源项目 **ai-study-kit**（MIT），原样搬运、不改一行运行代码。移植到 DSH 的部分（bundle 清单、`lib/index.js`、学习台、测试、文档）同样以 MIT 发布。详见 [LICENSE](./LICENSE)。

## 许可证

[MIT](./LICENSE)
