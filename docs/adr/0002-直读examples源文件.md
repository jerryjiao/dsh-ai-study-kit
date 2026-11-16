# 0002 页面直读 examples 源 JSON，不走构建产物

## 状态

已采纳（2026-11-16）

## 上下文

旧 Vite 站的数据链路是三层：`examples/<theme>/*.json` →（`scripts/sync-examples.mjs` 转换）→ `src/data/*.json`（构建产物，不进 git）→ 页面 import。此外还有一份派生的 `theme.json`（考点、考试天数）与 `coverage.json`（考点覆盖情况）。

搬到 DSH 后这条链路有三个问题：

1. **装完即用**：插件是 npm 包，用户机器上没有 `kit/` 工具链，跑不了 `pnpm run build`，构建产物不可能存在。
2. **陈旧产物造成假红**：`src/data` 是快照，改了 `examples/` 没重新 sync 就会「改了题不生效」——这正是旧站排障表里的头号环境噪音。
3. **绝对路径外泄**：`theme.json` 生成时得显式 `delete themeMeta.dir`，否则构建机的家目录路径会被打进 bundle。

## 决定

Host 半**直接读 `<项目根>/examples/<theme>/` 下的源文件**：`questions/questions.json`、`flashcards.json`、`plan.json`、`theme-config.json`、`courses/`。

派生数据（`theme`、`coverage`）由 Host 半**现算**，不落盘、不进包。

## 后果

- 好处：装完即用，不需要任何构建步骤；改内容后在页面刷新就生效，「产物陈旧」这一整类排障场景消失。
- 好处：不再有生成物携带绝对路径的风险。
- 代价：每次打开面板要读一次磁盘（几个 JSON，毫秒级），且 Host 半要自己实现一份 `theme.json` / `coverage.json` 的派生逻辑，与 `kit/apps/quiz-app/scripts/` 里的实现互为镜像——两边算法若要改，得同时改（写入 `docs/DETAIL.md` 的差异清单）。
- 代价：`src/data/*.json` 的存在意义只剩旧站形态；按 ADR 0004 老站冻结后，这条链路整体退役。

## 备选方案

- **随包预构建，用户目录只放 progress**：否决，主题是用户自己的内容，不可能预构建。
- **首次打开时跑一次 sync**：否决，等于把工具链依赖塞回用户机器。
- **插件内嵌一份 sync 实现写产物**：否决，既有写盘风险又回到「产物陈旧」。
