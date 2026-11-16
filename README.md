<p align="center">
  <img src="assets/logo.png" alt="dsh-ai-study-kit logo — an open book with a learning spark" width="160">
</p>

# dsh-ai-study-kit

**AI 学习教练 for DeepSeek Harness** — 把 [`ai-study-kit`](#来源与致谢) 的五个学习教练 skill 打包成 DSH 插件，并随包携带完整答题站快照 `kit/`；答题站已集成成 DSH 内的 **「学习台」面板**（首页 / 答题 / 闪卡 / 全景）。

装好后在 DSH 里直接用 `/ask-coach`、`/study-coach`、`/study-doctor`、`/study-recap`、`/study-podcast` 五个命令，侧栏还会多一个「学习台」图标。

官网：<https://jerryjiao.github.io/dsh-ai-study-kit/>

## 五个命令

| 命令 | 直入什么 |
|------|----------|
| `/ask-coach` | 主入口：探测学习状态（进度、错题、到期闪卡、考期、版本）→ 快照 + 推荐 → 带执行；其余四件都是它的直入快捷方式 |
| `/study-coach` | 陪练直入：坐下就学（F10 陪练教学） |
| `/study-doctor` | 一站式体检：品牌扫描 / 题库 QA / 四对齐 / 测试 + 环境探测 |
| `/study-recap` | 错题串讲直入（F4） |
| `/study-podcast` | 播客直入（F5） |

五个 skill 都是**用户斜杠调用**（`userInvocable`），默认不自动进模型目录（对应原工程的 `disable-model-invocation: true`）。部分宿主会给命令加插件命名空间前缀，如 `/dsh-ai-study-kit:ask-coach`。

## 学习台（答题站四页）

侧栏「学习台」是答题站本体的 DSH 内嵌版，四个页面共用顶部二级 tab：

| 页面 | 做什么 |
|------|--------|
| 首页 | 已答 / 正确率 / 错题 / 已看一屏看完；继续上次、错题重练、随机 10 题、按主题闯关都在这里起步 |
| 答题 | 单选、多选、判断题当场判分；错了给解析，多选题全对才算对 |
| 闪卡 | 按到期时间排队，翻面看答案，评完「忘了 / 模糊 / 记得」下一张什么时候来就定了 |
| 全景 | 考点按「已掌握 / 在学 / 薄弱 / 未接触」四态着色，下一站推荐直接跳去补 |

- **数据直接读写你的学习项目根目录**：题目、闪卡、课程从 `<项目根>/examples/<主题>/` 的源 JSON 读取（不走构建产物、不需要 sync 步骤）；进度读-合并-写回 `<项目根>/progress.json`（tmp + rename 原子替换，文件损坏时拒写而不是重置）。
- **不需要单独起动网页服务**：页面与宿主经本机回环 RPC 通信，不占端口、不设代理。
- **中英双语**：界面右上角切换语言，选择会记住。
- **项目探测**：依次尝试当前工作目录 → 上次记住的路径 → `~/study-kit`，都没有就弹出目录选择器。集成前从 kit 仓库拷出来的旧布局（`kit/apps/quiz-app/examples`、`kit/examples`）会被识别并提示迁移，只识别不回写。

## 安装

本插件是标准的 DSH bundle（`package.json` 里声明 `dsh.bundle.patch`）。

- **直接从 GitHub 安装**：`dsh plugin --profile web add github:jerryjiao/dsh-ai-study-kit`（`dsh plugin` 强制要求 `--profile`，`web` 换成你的 profile 名）。
- **本地目录安装**（开发 / 未发布时）：在 DSH 的插件管理页添加本地插件，指向本仓库根目录；或在终端用 `dsh plugin --profile web add /绝对路径/dsh-study-kit`。
- **按包名安装**（发布到 npm 后）：`dsh plugin --profile web add dsh-ai-study-kit`。

安装后插件进入 `active` 即表示五个 skill 已注册成功；Web 平台还会同时加载学习台客户端（`package.json` 的 `dsh.client`，`platform: web`），不需要额外配置。

## 仓库结构

```
dsh-study-kit/
├── package.json          # DSH bundle 清单（dsh.bundle.patch 指向 cordis.patch.yml，dsh.client 声明学习台前端）
├── cordis.patch.yml      # 把本插件 insert 进 DSH
├── lib/index.js          # Host 入口：读取 skills/*/SKILL.md 并注册，挂载学习台服务
├── lib/client.js         # 学习台浏览器端构建产物（由 src/client 打包，勿手改）
├── src/host/             # 学习台 Host 侧：项目探测、examples 读取、progress.json 读写、槽注册
├── src/client/           # 学习台浏览器端源码：四页面、顶部 tab、i18n（en/zh）、状态管理
├── skills/               # 五个 skill（SKILL.md + 参考资料），随包分发
├── kit/                  # 完整答题站快照（apps/quiz-app 等，版本见 kit/kit-version.json）
├── references/           # 契约 / 状态探测 / 语气参考
├── locale/               # en / zh 元数据
├── docs/adr/             # 架构决策 0001–0005（学习台集成、数据源、项目布局、去服务化、截图纪律）
├── scripts/              # build（host + client 打包）、dev-install、screenshots
├── website/              # Astro 官网（首页 / 文档 / 更新日志），部署到 GitHub Pages
├── test/                 # node:test：plugin.test.mjs + study-service.test.mjs
├── CHANGELOG.md
└── LICENSE
```

## 工作原理

`lib/index.js` 在 `apply(ctx)` 里对每个 `skills/<name>/SKILL.md`：

1. 剥掉顶部 YAML frontmatter，取出 `name` / `description` / `disable-model-invocation`；
2. 用 `ctx.skills.register(...)` 注册，正文即技能正文；
3. 把 **skill 目录本身**作为 `resourceBase`（`{ kind: 'directory', path }`）。

因为资源基址就是 skill 目录，正文里所有相对路径（`../../references/*.md`、`../ask-coach/…`、`<插件根>/kit/…`）都能按 DSH 打印的绝对 base 正常解析——和原始插件的目录布局一模一样。

无运行时依赖：只用 `node:fs` / `node:path` / `node:url`。不收集数据、不写工作区之外、不含任何密钥或个人隐私信息。

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

测试覆盖：bundle 清单与 cordis patch 一致性、五个 skill 的注册策略与 `resourceBase`、frontmatter 解析、`apply()` 注册与卸载、正文内相对链接全部可达、`kit` 版本与 CHANGELOG 对齐、icon 与 locale 完整性；学习台侧覆盖槽注册（`main` + `sidebar.panellist`）、四页渲染、双语资源、`examples/` 读取与路径逃逸校验、`progress.json` 合并写回与损坏拒写。设置 `AI_STUDY_KIT_SRC=<上游插件目录>` 时还会逐字节比对拷入的 `skills/`、`kit/`、`references/` 与上游一致（少数已记录的链接修正与隐私清洗见 [docs/DETAIL.md](./docs/DETAIL.md)）。

## 来源与致谢

本插件的 skill 正文、`kit/` 快照与 `references/` 均来自开源项目 **ai-study-kit**（MIT），原样搬运、不改一行运行代码。移植到 DSH 的部分（bundle 清单、`lib/index.js`、测试、文档）同样以 MIT 发布。详见 [LICENSE](./LICENSE)。

## 许可证

[MIT](./LICENSE)
