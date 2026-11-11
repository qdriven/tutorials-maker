# 格数｜Excel 教程（离线可读版）

> 与 [`domains/excel-animation/`](../../../../domains/excel-animation/) 交互式课程同源、可离线阅读的课程文档。该课程是一个中文、响应式的交互学习网站：入门部分用简化订单模型讲解通用方法；运营与财务部分使用可追溯的真实样本和正式财报，并提供可直接下载的 Excel／CSV 练习材料。本目录把课程内容重组为可离线阅读的模块文档。

## 🎯 本课重点

- **重点用什么**：一条通用分析路径（六步）、八类图表选型、六组常用函数、四类实战操作（清洗／汇总／查找／建模），每一课都用可下载的 CSV 练习数据。
- **完成什么**：能独立完成“定义问题 → 整理数据 → 补字段 → 汇总核对 → 选图 → 写结论”，并把每个结论追溯到一张工作表里的具体单元格。
- **不覆盖什么**：不做宏（VBA）、不写 Python／SQL、不讲打印排版；真实数据只描述样本口径，不外推为公司全貌。

## 📦 配套数据

| 数据 | 位置 | 说明 |
| --- | --- | --- |
| 每课练习数据 | [`data/lessons/<lesson-id>/`](data/lessons/) | 与教程一一对应的 CSV（由课程源码导出，公式与行数始终一致） |
| 数据索引 | [`data/README.md`](data/README.md) | lesson ↔ 教程文档 ↔ 数据文件对照表 |
| 真实案例整理表 | [`data/real/`](data/real/) | UCI 零售样本的月度／市场／商品汇总、Apple 三表科目 |
| 完整原始样本 | [`零售真实样本_20000行.csv`](../../../../apps/server/samples/kimi-excel/零售真实样本_20000行.csv)、[`零售真实样例_500行.csv`](../../../../apps/server/samples/kimi-excel/零售真实样例_500行.csv)、[`真实数据_Excel练习包.xlsx`](../../../../apps/server/samples/kimi-excel/真实数据_Excel练习包.xlsx)、[`Apple_2025_SEC原始数据.csv`](../../../../apps/server/samples/kimi-excel/Apple_2025_SEC原始数据.csv) | 20,000 行零售样本、500 行精简样本、Excel 练习包、SEC 原始申报数据 |

## 🖥 实机运行

[`apps/univer-excel/`](../../apps/univer-excel/) 把本课程的四个核心动作放进真实开源表格引擎：销售额逐行写入单元格后读回画图、参数写入后用真公式引擎计算、四步清洗改写工作表、RFM 评分与客群回写。启动 `pnpm dev:univer`，打开 <http://localhost:5190>。

需要**原生数据透视表**和可拖拽的真实图表时，用并行的 OnlyOffice 版 [`apps/onlyoffice-excel/`](../../apps/onlyoffice-excel/)：先用 `pnpm onlyoffice:start`（或 `docker compose -f apps/onlyoffice-excel/docker-compose.yml up -d`）启动 Docker 里的 Document Server，再 `pnpm dev:onlyoffice`，打开 <http://localhost:5193>。它沿用同一份课程契约，VLOOKUP / XLOOKUP / IF 写进真实单元格，第四模块通过 `InsertPivotNewWorksheet` 生成真实透视表。Univer 版本不受影响。

希望**完全不启动 Docker**、又保留真实公式计算时，用纯前端版 [`apps/handsontable-excel/`](../../apps/handsontable-excel/)（Handsontable + HyperFormula）：`pnpm dev:handsontable`，打开 <http://localhost:5194>。公式由 HyperFormula 计算，客群汇总用 `COUNTIF` / `SUMIF`，图表是结果区预览；许可证边界见该目录 README。

想把任意一篇 Excel 教程（Markdown / 纯文本 / 网页）做成同样的实机课，使用 `excel-tutorial-maker` 技能，完整流程见 [`skill/excel-tutorial-maker/SKILL.md`](../../skill/excel-tutorial-maker/SKILL.md)。已验证的第二个课程是零售运营案例，生成在 [`apps/excel-tutorial-retail-ops/`](../../apps/excel-tutorial-retail-ops/)，启动 `pnpm dev:retail-ops`；第三个是查找函数课（VLOOKUP / XLOOKUP / IF 真实写入单元格），生成在 [`apps/excel-tutorial-lookup-lab/`](../../apps/excel-tutorial-lookup-lab/)，启动 `pnpm dev:lookup-lab`。

## 目录总览

| 模块 | 内容 | 目录 |
| --- | --- | --- |
| 01 学习路径 | 六步通用分析路径（定义问题→整理→补字段→汇总→图表→结论） | [01-learning-path/](01-learning-path/) |
| 02 图表 | 8 类常见 Excel 图表的选型、示例与误用对比 | [02-charts/](02-charts/) |
| 03 公式 | 查找实验（VLOOKUP／XLOOKUP）与 5 个公式用例 | [03-formulas/](03-formulas/) |
| 04 基础 | Excel 基础八章（Luke Barousse 公开大纲重编） | [04-basics/](04-basics/) |
| 05 实验台 | 18 个在线实验台用例（故事／步骤／技能） | [05-workspace-lessons/](05-workspace-lessons/) |
| 06 真实案例 | UCI 零售运营样本、Apple FY2025 三表 | [06-real-cases/](06-real-cases/) |
| 07 调研 | GitHub 教程／练习仓库调研与主题归并 | [07-research/](07-research/) |
| 08 致谢 | 数据与素材来源、许可 | [08-credits.md](08-credits.md) |
| 09 数据 | 每课配套数据文件与索引 | [data/](data/) |

## 每篇教程长什么样

所有教程文档统一为同一套结构，方便按同一节奏读：

1. **🎯 本课重点** —— 开头就说清“重点用什么（函数／操作）”和“完成什么（可验证的产出）”。
2. **📦 配套数据** —— 指向本课要打开的 CSV，并写明口径与边界。
3. **🧱 基础操作** —— 第一次做也能跟上的前置操作与函数语法。
4. **🛠 实战操作** —— 具体到单元格、公式与预期结果。
5. **✅ 总结** —— 结尾回顾本课重点与产出。

## 完整目录（Table of Contents）

### [01-learning-path/](01-learning-path/) — 六步通用分析路径

- [README.md](01-learning-path/README.md) — 路径总览与配套教学数据
- [01-question.md](01-learning-path/01-question.md) — 先定义问题，不急着打开图表
- [02-clean.md](01-learning-path/02-clean.md) — 把数据整理成可计算的明细表
- [03-enrich.md](01-learning-path/03-enrich.md) — 补齐分析所需字段
- [04-summarize.md](01-learning-path/04-summarize.md) — 先汇总，再交叉核对总数
- [05-visualize.md](01-learning-path/05-visualize.md) — 按问题选择图表，而非按外观
- [06-conclude.md](01-learning-path/06-conclude.md) — 把图表翻译成可复核的结论

### [02-charts/](02-charts/) — 8 类图表

- [README.md](02-charts/README.md) — 图表选型总览
- [01-line.md](02-charts/01-line.md) — 折线图（看趋势）
- [02-column.md](02-charts/02-column.md) — 簇状柱形图（比类别）
- [03-bar.md](02-charts/03-bar.md) — 条形图（做排名）
- [04-pie.md](02-charts/04-pie.md) — 饼图／环形图（看占比）
- [05-scatter.md](02-charts/05-scatter.md) — XY 散点图（找关系）
- [06-histogram.md](02-charts/06-histogram.md) — 直方图（看分布）
- [07-combo.md](02-charts/07-combo.md) — 组合图（量率同看）
- [08-stacked.md](02-charts/08-stacked.md) — 堆积柱形图（看构成变化）

### [03-formulas/](03-formulas/) — 查找与公式实验

- [README.md](03-formulas/README.md) — 五种函数动作总览
- [lookup-vlookup-xlookup.md](03-formulas/lookup-vlookup-xlookup.md) — VLOOKUP 对比 XLOOKUP：向右查、向左查与缺失值
- [sumifs.md](03-formulas/sumifs.md) — SUMIFS（按多个条件求和）
- [countifs.md](03-formulas/countifs.md) — COUNTIFS（按多个条件计数）
- [if.md](03-formulas/if.md) — IF（按判断返回标记）
- [filter.md](03-formulas/filter.md) — FILTER（动态提取匹配行）
- [trim-clean.md](03-formulas/trim-clean.md) — TRIM＋CLEAN（清理不可见字符）

### [04-basics/](04-basics/) — Excel 基础八章

- [README.md](04-basics/README.md) — 八章总览与键盘快捷键
- [01-workbook-basics.md](04-basics/01-workbook-basics.md) — 工作簿入门
- [02-formulas-functions.md](04-basics/02-formulas-functions.md) — 公式与函数
- [03-charts.md](04-basics/03-charts.md) — 图表
- [04-tables.md](04-basics/04-tables.md) — 表格进阶
- [05-pivot-tables.md](04-basics/05-pivot-tables.md) — 数据透视表
- [06-advanced-analysis.md](04-basics/06-advanced-analysis.md) — 高级分析
- [07-power-query.md](04-basics/07-power-query.md) — Power Query
- [08-power-pivot.md](04-basics/08-power-pivot.md) — Power Pivot

### [05-workspace-lessons/](05-workspace-lessons/) — 18 个在线实验台用例

- [README.md](05-workspace-lessons/README.md) — 用例目录表（id／顺序／标题／分类／级别／时长）
- [01-free-excel.md](05-workspace-lessons/01-free-excel.md) — 六步完整实战：中文零售运营分析
- [02-luke-charts.md](05-workspace-lessons/02-luke-charts.md) — 月度趋势：从汇总到折线图
- [03-alex-lookup.md](05-workspace-lessons/03-alex-lookup.md) — 商品主数据：VLOOKUP 与 XLOOKUP
- [04-dave-clean.md](05-workspace-lessons/04-dave-clean.md) — 订单清洗：空格、重复与查找
- [05-rohan-questions.md](05-workspace-lessons/05-rohan-questions.md) — 从业务问题倒推汇总公式
- [06-maf-charts.md](05-workspace-lessons/06-maf-charts.md) — 市场结构：排序、条形图与占比
- [07-power-query.md](05-workspace-lessons/07-power-query.md) — 合并查询：从商品表补全订单
- [08-eda-outliers.md](05-workspace-lessons/08-eda-outliers.md) — 探索数据：平均值、极值与异常复核
- [09-plans.md](05-workspace-lessons/09-plans.md) — 方案比较：用量变化后选哪个套餐
- [10-portfolio-dashboard.md](05-workspace-lessons/10-portfolio-dashboard.md) — Apple 小型看板：指标与三表校验
- [11-two-way-lookup.md](05-workspace-lessons/11-two-way-lookup.md) — 双向查找：按商品与月份取数
- [12-dynamic-arrays.md](05-workspace-lessons/12-dynamic-arrays.md) — 动态数组：筛选、去重与排序
- [13-text-date.md](05-workspace-lessons/13-text-date.md) — 文本与日期：拆分客户资料并生成月份
- [14-kpi-format.md](05-workspace-lessons/14-kpi-format.md) — KPI 预警：把达成率转成可行动的状态
- [15-dirty-data.md](05-workspace-lessons/15-dirty-data.md) — 脏数据清洗：金额、文本与类型转换
- [16-inventory-reorder.md](05-workspace-lessons/16-inventory-reorder.md) — 库存补货：用补货点与建议量管理缺货
- [17-supply-quality.md](05-workspace-lessons/17-supply-quality.md) — 供应链质量：缺陷率与单位运输成本
- [18-customer-rfm.md](05-workspace-lessons/18-customer-rfm.md) — 客户 RFM：找出需要重点维护的客户

### [06-real-cases/](06-real-cases/) — 真实案例

- [README.md](06-real-cases/README.md) — 案例总览、数据边界与练习材料
- [retail-operations.md](06-real-cases/retail-operations.md) — UCI 零售运营（20,000 行样本：清洗明细、月度趋势、市场结构、商品排行）
- [apple-finance.md](06-real-cases/apple-finance.md) — Apple FY2025 三表（利润表、资产负债表、现金流量表与勾稽）

### [07-research/](07-research/) — GitHub 教程调研

- [README.md](07-research/README.md) — 调研总览与高频主题
- [sources.md](07-research/sources.md) — 10 个仓库清单与主题归并

### 其他

- [08-credits.md](08-credits.md) — 数据与素材来源、许可与衍生内容说明
- [data/README.md](data/README.md) — 配套数据索引（lesson ↔ 教程 ↔ 数据文件）

## 课程核心内容

- 六步通用分析路径，支持保存完成状态
- 8 类常见 Excel 图表的可切换示例与误用对比
- VLOOKUP／XLOOKUP 的向右查、向左查和缺失值实验
- SUMIFS、COUNTIFS、IF、FILTER、TRIM＋CLEAN 用例
- 四步入门订单复盘（明确标注为虚构教学模型）
- 真实运营样例：20,000 行 UCI 零售交易样本、清洗明细、月度趋势、市场结构与商品排行
- 真实财务样例：Apple FY2025 Form 10-K 利润表、资产负债表、现金流量表与三表勾稽
- 10 个 GitHub 教程／练习仓库调研及高频主题归并

## 学习建议

1. 先走 [01-learning-path/](01-learning-path/) 建立分析顺序，再按需查阅 [02-charts/](02-charts/) 与 [03-formulas/](03-formulas/)。
2. 系统补基础看 [04-basics/](04-basics/)；动手练习按 [05-workspace-lessons/](05-workspace-lessons/) 的目录挑用例（每篇含重点、操作步骤、配套数据与预期结果）。
3. 动手前先到 [data/](data/) 下载对应 CSV，用 Excel 打开后再照着“实战操作”一节写公式。
4. 用 [06-real-cases/](06-real-cases/) 的真实数据复盘方法；引用数据时注意各页“数据说明／口径”。
5. 扩展学习素材见 [07-research/sources.md](07-research/sources.md)；引用请保留 [08-credits.md](08-credits.md) 的来源信息。

## 数据与边界

零售案例只描述所使用的 20,000 行公开样本，不外推为完整公司的经营结果。样本销售金额是有效行 `Quantity × UnitPrice` 之和，不等于公司净收入。财务案例金额单位为 USD millions，用于报表学习与复算，不替代完整年报及附注。中文教学订单／客户／库存数据为明确标注的教学模型。详见 [06-real-cases/README.md](06-real-cases/README.md) 与 [08-credits.md](08-credits.md)。

## ✅ 总结

- 基础操作与方法路径在 [04-basics/](04-basics/) 与 [01-learning-path/](01-learning-path/)，实际例子在 [05-workspace-lessons/](05-workspace-lessons/) 与 [06-real-cases/](06-real-cases/)。
- 每一篇都写明“重点用什么 / 完成什么”，结尾都有总结，动手前先看“📦 配套数据”。
- 数据与教程同源：由 `pnpm docs:excel:data` 从应用源码导出，`pnpm docs:excel:check` 校验文档结构、数据链接与文件存在性。
