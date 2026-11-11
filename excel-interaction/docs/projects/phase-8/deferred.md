# 遗留清单（phase-8 移交）

phase-0~7 收口时挂账的未做/待办项。新批次按 build-method 立 task 三件套执行；
本清单 append-only，销账时在条目后标注（✅ + index-log 号）。

## 功能欠账

| # | 条目 | 说明 | 来源 |
| --- | --- | --- | --- |
| 1 | 抓窗式 intro/outro 节奏 | uno-driver（抓窗式）只重演 4 步，summary 首尾口播段不参与 UNO 节奏；生产出片一律渲染式（pitfalls #6），抓窗式要跟上需补段派发 | ✅ #32（phase-6 task-08）· 来源 task-11 已知边界 |
| 2 | 抓窗式鼠标编排 | 真实鼠标轨迹/点击节奏编排（抓窗式的精细驱动），录屏式观感进阶 | ✅ #34（phase-6 task-10）· 来源 phase-6 record.mjs 挂账 |
| 3 | univer / onlyoffice 引擎模板 | 模板契约只落了 handsontable；引擎能力矩阵其余引擎待补模板实现 | ✅ #35（phase-4 task-14）· 来源 phase-2 task-03 模板规格（onlyoffice 四 API 动作层待 docserver 实测，task-14 诚实记档） |
| 4 | 逐参数高亮动画（拆段驻留） | 参数口播段现为单段定帧（~24s）；进阶为逐参数高亮拆段，画面随口播推进 | ✅ #33（phase-6 task-09）· 来源 task-13 已知取舍 |
| 5 | 第二门课 SUM | `courses/sum-basic.json`（可选新课，验证契约通用性） | ✅ #25（phase-3 task-03） |
| 6 | 口播时长微调 | 开篇 ~15s / 收尾 ~8.5s 嫌长——改 summary 文案即可收短（作者侧），不改派生规则 | ✅ #26（phase-6 task-05：语速 +25% / 开篇只念一句话 / 收尾收短，60.5s→27.5s） |

## 仓库事务

| # | 条目 | 说明 |
| --- | --- | --- |
| 7 | PR / 分支整理 | 当前分支 `chore/drop-local-webshell-and-hallmark` 混有用户 webshell 删除提交；excel-interaction 各批次提交已按域圈定，PR 拆分待用户定夺（跟踪 [#18](https://github.com/qdriven/agent-learning-workbench/issues/18)）→ ✅ #37（PR #13 合并 main，含壳删除补提交 59aa816；接线欠账转 [#20](https://github.com/qdriven/agent-learning-workbench/issues/20)）→ ✅ #38（#20 闭环：壳接线退场，standalone 先行） |
| 8 | 旧域在飞改动 | `domains/excel-animation/`、`shells/webshell/`、`pnpm-lock.yaml` 的未提交改动是用户在飞工作，全程未触碰，归属用户处置（跟踪 [#19](https://github.com/qdriven/agent-learning-workbench/issues/19)）。2026-11-09 更新：shells/webshell + pnpm-lock 已随 #37 提交合并，现存飞 = excel-animation/* 修改与 workspace/README.md 删除 |

## 后续跟踪（GitHub issues，2026-11-09 建立）

本清单之外的待办/欠账统一进 GitHub issues（总览见 [pipeline.md 附录](../../pipeline.md)）：

| issue | 内容 | 来源 |
| --- | --- | --- |
| [#14](https://github.com/qdriven/agent-learning-workbench/issues/14) | onlyoffice 四 API 动作层 docserver 实测 + drive 验收 | 上表 #3 残留（task-14 诚实记档） |
| [#15](https://github.com/qdriven/agent-learning-workbench/issues/15) | out/ 参照物入库（univer-kit 构建源 / smoke 工具 / 校准工具）→ ✅ #39（kit-src 入 templates/univer、smoke 入 scripts/tutorial、probe 入 scripts/recorder） | out/ 盘点发现（[out/README](../../../out/README.md)） |
| [#16](https://github.com/qdriven/agent-learning-workbench/issues/16) | univer 金底表头带自绘主题 | univer README 记档 |
| [#17](https://github.com/qdriven/agent-learning-workbench/issues/17) | onlyoffice renderPivot / renderChart 扩展位 | onlyoffice README 记档 |

### L2 后续内容总盘点（2026-11-10）

单函数 recipe 三轮量产收官（27 门）后的全部待做内容、难点分析与逐场景
解决方案，见 [sprints/sprint-l2-composite-lessons.md](../../sprints/sprint-l2-composite-lessons.md)
（P1-L2 复合课 / P2 抓窗式出片 / P3 走查验证 / P4-P8 引擎能力 / P9 动效进阶 GSAP / P10 仓库事务）。

### 图表能力三方案定调（2026-11-09，A+C 落地 / B 缓行）

图表课（docs/excel/02-charts 8 门）采用「A 画布模拟 + C Document Builder 基线」：
课页动画用 chart-layer.js 模拟渲染（数据取自契约可断言），真 Excel 图表对象基线用
Document Builder（免 Docker headless）产出（scripts/chartref/，待装 docbuilder.exe 实测）。
Docker docserver + renderChart（#17）降为缓行——只在需要「浏览器内交互真图表」时启动。
方法论沉淀（复用判据 + 数据到图表自动化分析）见
[chart-capability-strategy.md](../modules/chart-capability-strategy.md)。
