# 术语表

本仓库同时有三种「东西」容易混：插件本体、kit 仓库、用户的学习项目。下面按这个顺序定义，后面的词都挂在它们身上。

## 三种实体

**插件（dsh-ai-study-kit）**
随 DSH 安装的那个 npm 包。双半结构：
- **Host 半**（`lib/index.js`，Node）——注册 5 个 skill、读写用户项目磁盘、算派生数据。
- **Client 半**（`lib/client.js`，浏览器）——学习台界面，经 `window.__ModuleLoader__` 由宿主加载。

两半通过一条 RPC 通道 `dsh-ai-study-kit` 说话（authority `loopback`）。

**kit（内容工具链）**
仓库里的 `kit/` 目录，`kit/apps/quiz-app/` 下有 `scripts/`（生成题、同步示例、播客、图谱）、`test/`、`examples/`。这一套是**开发者工具**：改内容、跑校验、出构建产物时需要它。**普通用户不装也不需要它。**

**学习项目（study project）**
用户自己的一个目录，只装数据，结构固定为：

```
<项目根>/examples/<theme>/     # 一个主题一个目录（questions/questions.json、flashcards.json、plan.json、theme-config.json、courses/）
<项目根>/progress.json         # 唯一进度真源
<项目根>/study/                # 私有记录：profile.json、misconceptions.json、oral-attempts.json、*.md
```

判据：有 `examples/`、**没有** `package.json`。反过来 `package.json name=ai-study-kit` 或 `AGENTS.md` 是 **kit 仓库**的判据——这两个判据不能混，混了 agent 就会把用户数据目录当仓库去 `git pull`。

**旧结构（legacy layout）**：集成前拷贝出来的项目，数据在 `kit/apps/quiz-app/examples/` 与 `kit/apps/quiz-app/progress.json`。只用于识别与迁移，不是长期形态（见 ADR 0003）。

## 学习台

**学习台（Study Desk）**：插件 Client 半提供的那个主面板，注册在 DSH 的 `main` 槽（key `'ai-study-kit'`）+ `sidebar.panellist` 侧栏图标。四个二级 tab：**首页 / 答题 / 闪卡 / 全景**。

**main 面板**：DSH 中栏那块被侧栏入口选中的面板。契约明写它不绑会话（`conversation` 这个保留 key 才绑）。所以学习台是全局的——在哪个会话里点开都是同一份进度。

**panellist**：左侧栏的图标行，每个图标对应一个 main 面板，`id` 即 main 的 key。

## 内容模型

**主题（theme）**：一套备考范围，一个目录。目录名即 theme slug（如 `dev-intro`、`ruankao-arch`）。当前主题记在 `progress.json` 的 `theme` 字段。

**示例主题（dev-intro）**：`kit/examples/dev-intro/`，虚构的 git/Linux 入门内容（10 题 4 卡），与任何真实专业领域零耦合。用途是脱敏演示与截图（见 ADR 0005）。

**考点（exam point，EP）**：`theme-config.json` 里声明的可考知识点，有 id、标题、所属分区。题目通过 `ep` 字段挂到考点上。

**全景（panorama）**：按考点铺开的学习地图，每个 EP 有四种状态之一（未开始 / 学过 / 在练 / 已掌握），叠加掌握度百分比与近期作答轨迹。

**覆盖率（coverage）**：由考点状态派生出来的汇总数字。**派生数据，不落盘**——Host 半现算，避免像 `src/data/coverage.json` 那样出现陈旧产物。

**毕业（graduate）**：一个主题的达标判据，`theme-config.json` 的 `streakToPass`（连续答对 N 题）。达到即视为该主题学完。

## 进度

**progress.json**：进度真源，`version:1`。字段：
`answers{<题 id>:{selected,correct,submittedAt,streak,wrongCount}}`、`srs{<卡 id>:{ease,interval,reps,due,phase,stepIdx,lapses}}`、`coursesRead`、`read`、`oralAttempts[]`、`theme`、`lang`、`settings{extOn,autoAdvance,dailyNewCards}`。

**合并规则（merge rule）**：两份 Progress 合并时逐题取更新的那份——`answers` 比 `submittedAt`，其余比 `updatedAt`。沿用 `kit/apps/quiz-app/server/progressStore.ts` 的语义，插件里重写成一份 Host 侧实现。这不是并发防御（集成后只有一个写入者），只是为了迁移旧文件和 agent 手改文件时不互相覆盖。

**SRS**：闪卡的间隔重复状态，SM-2 变体，`phase` 区分 learning / review，四档评分（again / hard / good / easy）。

## 被淘汰的说法

- ~~「后端 / server / :8787」~~ —— 集成后不存在。页面由 Host 半直接供数，没有 HTTP 服务。
- ~~「pnpm dev / pnpm run server」~~ —— 开发不再需要起站点；改界面走插件的 build + 重装。
- ~~「src/data 构建产物」~~ —— 页面直读 `examples/` 源 JSON，`src/data/*.json` 只属于旧的 Vite 站形态。
