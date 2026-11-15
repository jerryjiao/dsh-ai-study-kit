# dsh-ai-study-kit

**AI 学习教练 for DeepSeek Harness** — 把 [`ai-study-kit`](#来源与致谢) 的五个学习教练 skill 打包成 DSH 插件，并随包携带完整答题站快照 `kit/`。

装好后在 DSH 里直接用 `/ask-coach`、`/study-coach`、`/study-doctor`、`/study-recap`、`/study-podcast` 五个命令。

## 五个命令

| 命令 | 直入什么 |
|------|----------|
| `/ask-coach` | 主入口：探测学习状态（进度、错题、到期闪卡、考期、版本）→ 快照 + 推荐 → 带执行；其余四件都是它的直入快捷方式 |
| `/study-coach` | 陪练直入：坐下就学（F10 陪练教学） |
| `/study-doctor` | 一站式体检：品牌扫描 / 题库 QA / 四对齐 / 测试 + 环境探测 |
| `/study-recap` | 错题串讲直入（F4） |
| `/study-podcast` | 播客直入（F5） |

五个 skill 都是**用户斜杠调用**（`userInvocable`），默认不自动进模型目录（对应原工程的 `disable-model-invocation: true`）。部分宿主会给命令加插件命名空间前缀，如 `/dsh-ai-study-kit:ask-coach`。

## 安装

本插件是标准的 DSH bundle（`package.json` 里声明 `dsh.bundle.patch`）。

- **直接从 GitHub 安装**：`dsh plugin add github:jerryjiao/dsh-ai-study-kit`。
- **本地目录安装**（开发 / 未发布时）：在 DSH 的插件管理页添加本地插件，指向本仓库根目录；或在终端用 `dsh plugin add /绝对路径/dsh-study-kit`。
- **按包名安装**（发布到 npm 后）：`dsh plugin add dsh-ai-study-kit`。

安装后插件进入 `active` 即表示五个 skill 已注册成功。

## 仓库结构

```
dsh-study-kit/
├── package.json          # DSH bundle 清单（dsh.bundle.patch 指向 cordis.patch.yml）
├── cordis.patch.yml      # 把本插件 insert 进 DSH
├── lib/index.js          # 插件入口：读取 skills/*/SKILL.md 并注册
├── skills/               # 五个 skill（SKILL.md + 参考资料），随包分发
├── kit/                  # 完整答题站快照（apps/quiz-app 等，版本见 kit/kit-version.json）
├── references/           # 契约 / 状态探测 / 语气参考
├── locale/               # en / zh 元数据
├── test/plugin.test.mjs  # node:test 测试
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
- Node.js：`>=20`

## 开发与测试

```bash
npm test
```

测试覆盖：bundle 清单与 cordis patch 一致性、五个 skill 的注册策略与 `resourceBase`、frontmatter 解析、`apply()` 注册与卸载、正文内相对链接全部可达、`kit` 版本与 CHANGELOG 对齐、icon 与 locale 完整性；设置 `AI_STUDY_KIT_SRC=<上游插件目录>` 时还会逐字节比对拷入的 `skills/`、`kit/`、`references/` 与上游一致（少数已记录的链接修正与隐私清洗见 [docs/DETAIL.md](./docs/DETAIL.md)）。

## 来源与致谢

本插件的 skill 正文、`kit/` 快照与 `references/` 均来自开源项目 **ai-study-kit**（MIT），原样搬运、不改一行运行代码。移植到 DSH 的部分（bundle 清单、`lib/index.js`、测试、文档）同样以 MIT 发布。详见 [LICENSE](./LICENSE)。

## 许可证

[MIT](./LICENSE)
