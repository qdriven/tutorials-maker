# 05 · 在线实验台 18 个用例

> 18 个可动手做的实验台用例：从中文零售六步实战，到查找、清洗、条件汇总、合并与方案建模。

来源：`src/workspace/`（`catalog.ts`、`miniLessons.ts`、`extraLessons.ts`、`chineseRetailLesson.ts`、`retailLesson.ts`）。每个用例是基于 Univer 的可操作工作簿：先说明学习目标、故事任务、步骤与数据来源，再进入表格；任务面板统一给出"选工作表→定位单元格→输入内容→检查结果"的操作顺序。

`free-excel`（order 1）默认使用 24 行中文零售教学订单，也可切换 500 行或 20,000 行 UCI 真实样本；中文教学数据与公开真实数据明确区分。其余用例为单项技能实验，时长 6—9 分钟。

## 🎯 本课重点

- **重点用什么**：六步通用分析路径（定义问题 → 整理数据 → 补字段 → 汇总验证 → 选图 → 写结论），以及八类技能函数：`SUMIFS`、`COUNTIFS`、`XLOOKUP`、`VLOOKUP`、`TRIM＋CLEAN`、`IFERROR`、`AVERAGE／MAX`、`INDEX＋MATCH`。
- **完成什么**：18 课每课都有一份配套 CSV 与一张可核对的产出——从 01 的月度对比（10 月 ¥2,120／8 单，11 月 ¥2,690／12 单），到 09 的套餐比较（25GB 时 A＝89、B＝59、C＝79，最优方案 B）；学完能说清"用了哪个函数、写在哪个单元格、结果是多少、为什么"。
- **不覆盖什么**：不写宏（VBA）、不做 Python／SQL；教学模型的数据只用于练函数，不能当作真实业务结论。

## 📦 配套数据

| 课程 | 文件 | 规模 | 用途 |
| --- | --- | --- | --- |
| 01 free-excel | [raw.csv](../data/lessons/free-excel/raw.csv)、[invoice-index.csv](../data/lessons/free-excel/invoice-index.csv)、[summary.csv](../data/lessons/free-excel/summary.csv)、[report.csv](../data/lessons/free-excel/report.csv) | 24 行 × 12 列；20 行 × 4 列；5 行 × 4 列；3 行 × 2 列 | 中文零售订单明细、有效订单索引、月度汇总表与结论表 |
| 02 luke-charts | [monthly.csv](../data/lessons/luke-charts/monthly.csv)、[practice.csv](../data/lessons/luke-charts/practice.csv) | 3 行 × 2 列；3 行 × 2 列 | 三个月样本销售金额与练习区 |
| 03 alex-lookup | [products.csv](../data/lessons/alex-lookup/products.csv)、[practice.csv](../data/lessons/alex-lookup/practice.csv) | 5 行 × 5 列；3 行 × 2 列 | 商品主数据与三道查找题 |
| 04 dave-clean | [orders.csv](../data/lessons/dave-clean/orders.csv)、[practice.csv](../data/lessons/dave-clean/practice.csv) | 8 行 × 5 列；3 行 × 2 列 | 带空格与重复行的订单与清洗任务表 |
| 05 rohan-questions | [orders.csv](../data/lessons/rohan-questions/orders.csv)、[practice.csv](../data/lessons/rohan-questions/practice.csv) | 8 行 × 5 列；3 行 × 2 列 | 已清理地区的订单与三个业务问题 |
| 06 maf-charts | [markets.csv](../data/lessons/maf-charts/markets.csv)、[practice.csv](../data/lessons/maf-charts/practice.csv) | 5 行 × 2 列；2 行 × 2 列 | 前五市场销售金额与分析区 |
| 07 power-query | [orders.csv](../data/lessons/power-query/orders.csv)、[products.csv](../data/lessons/power-query/products.csv) | 3 行 × 5 列；5 行 × 5 列 | 待合并的订单与商品表 |
| 08 eda-outliers | [orders.csv](../data/lessons/eda-outliers/orders.csv)、[practice.csv](../data/lessons/eda-outliers/practice.csv) | 10 行 × 2 列；4 行 × 2 列 | 含空值与极端值的订单金额与探索任务表 |
| 09 plans | [plans.csv](../data/lessons/plans/plans.csv)、[practice.csv](../data/lessons/plans/practice.csv) | 3 行 × 4 列；5 行 × 2 列 | 三个套餐的规则表与比较区 |
| 10—18 | 见对应课内说明 | — | 第 10—18 课（看板、双向查找、动态数组、文本与日期、KPI 格式、脏数据、库存补货、供应链质量、客户 RFM）的配套数据在各课文档的"配套数据"小节里逐课列出 |

数据说明：每课目录下的 CSV 就是该课动手练习时打开的工作表（文件名＝工作表 ID），由 `node scripts/excel-docs/generate-lesson-data.mjs` 从 `domains/excel-animation` 的课程定义直接导出，因此"教程里的公式"与"数据文件里的行"始终一致。完整对照表见 [../data/README.md](../data/README.md)。

## 🧱 基础操作

1. **工作簿的结构**：每个用例都是多工作表工作簿——原始数据表加一张练习／答案表；公式里用 `工作表名!区域` 跨表引用（如 `=SUMIFS(订单!$E$2:$E$9,订单!$C$2:$C$9,"华东")`）。
2. **数据区从第 2 行开始**：CSV 第 1 行是表头。区域范围必须盖住全部数据行（例如 24 行订单写 `$J$2:$J$25`，8 行订单写 `$A$2:$A$9`），少写一行就会漏统计。
3. **填表四步**：选工作表 → 定位单元格 → 输入内容 → 检查结果。题目里给出的单元格地址和预期值就是校验标准。
4. **绝对引用与相对引用**：需要下拉填充的公式，查找值用相对引用（`B2`），固定区域用 `$` 锁定（`商品表!$A$2:$A$6`）。
5. **先核对口径再算结果**：教学模型的数据量很小，先手工把合计、计数、极值算一遍，再看公式结果对不对。
6. **导出与留档**：支持导出含公式、计算结果与数据来源的 XLSX，导入导出都在浏览器本地完成。

## 🛠 实战操作

1. **按顺序学**：先做 [01-free-excel.md](01-free-excel.md) 的六步完整实战，再按"汇总 → 图表 → 查找 → 清洗 → 条件汇总 → 结构 → 合并 → 探索 → 建模"的顺序做单项用例；后面的用例都是把六步里的某一步单独练透。
2. **每课三步走**：打开该课的配套 CSV → 照"实战操作"里的单元格地址写公式 → 用表里的预期结果核对（不一致就回去查区域范围）。
3. **先做基础课再进阶课**：02—06 是入门／基础（6—8 分钟），07—09 是进阶（7—8 分钟），10—18 是综合项目与专项练习（6—9 分钟）。
4. **每个用例都要留下产出**：03 的三道查找题答案、04 的清洗结果、05 的三个业务问题数字、08 的四个探索结论、09 的最优套餐名——这些是"学过了"的证据。
5. **一次只做一课**：同一课里先完成 story 与学习目标，再进表格；做不出来的用例回头看 [../01-learning-path/](../01-learning-path/) 的六步方法论。

### 用例目录

| 顺序 | ID | 标题 | 分类 | 级别 | 时长 | 文档 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `free-excel` | 六步完整实战：中文零售运营分析 | 综合实战 | 由易到难 | 15—25 分钟 | [01-free-excel.md](01-free-excel.md) |
| 2 | `luke-charts` | 月度趋势：从汇总到折线图 | 图表与汇总 | 入门 | 6 分钟 | [02-luke-charts.md](02-luke-charts.md) |
| 3 | `alex-lookup` | 商品主数据：VLOOKUP 与 XLOOKUP | 查找函数 | 基础 | 7 分钟 | [03-alex-lookup.md](03-alex-lookup.md) |
| 4 | `dave-clean` | 订单清洗：空格、重复与查找 | 数据清洗 | 基础 | 8 分钟 | [04-dave-clean.md](04-dave-clean.md) |
| 5 | `rohan-questions` | 从业务问题倒推汇总公式 | 条件汇总 | 基础 | 7 分钟 | [05-rohan-questions.md](05-rohan-questions.md) |
| 6 | `maf-charts` | 市场结构：排序、条形图与占比 | 图表与结构 | 基础 | 6 分钟 | [06-maf-charts.md](06-maf-charts.md) |
| 7 | `power-query` | 合并查询：从商品表补全订单 | 合并与转换 | 进阶 | 8 分钟 | [07-power-query.md](07-power-query.md) |
| 8 | `eda-outliers` | 探索数据：平均值、极值与异常复核 | 探索性分析 | 进阶 | 7 分钟 | [08-eda-outliers.md](08-eda-outliers.md) |
| 9 | `plans` | 方案比较：用量变化后选哪个套餐 | 业务建模 | 进阶 | 8 分钟 | [09-plans.md](09-plans.md) |
| 10 | `portfolio-dashboard` | Apple 小型看板：指标与三表校验 | 综合项目 | 进阶 | 9 分钟 | [10-portfolio-dashboard.md](10-portfolio-dashboard.md) |
| 11 | `two-way-lookup` | 双向查找：按商品与月份取数 | 查找进阶 | 进阶 | 7 分钟 | [11-two-way-lookup.md](11-two-way-lookup.md) |
| 12 | `dynamic-arrays` | 动态数组：筛选、去重与排序 | 动态函数 | 进阶 | 7 分钟 | [12-dynamic-arrays.md](12-dynamic-arrays.md) |
| 13 | `text-date` | 文本与日期：拆分客户资料并生成月份 | 文本与日期 | 基础 | 6 分钟 | [13-text-date.md](13-text-date.md) |
| 14 | `kpi-format` | KPI 预警：把达成率转成可行动的状态 | 条件格式与判断 | 基础 | 6 分钟 | [14-kpi-format.md](14-kpi-format.md) |
| 15 | `dirty-data` | 脏数据清洗：金额、文本与类型转换 | 数据清洗 | 基础 | 8 分钟 | [15-dirty-data.md](15-dirty-data.md) |
| 16 | `inventory-reorder` | 库存补货：用补货点与建议量管理缺货 | 供应链与库存 | 进阶 | 7 分钟 | [16-inventory-reorder.md](16-inventory-reorder.md) |
| 17 | `supply-quality` | 供应链质量：缺陷率与单位运输成本 | 供应链分析 | 进阶 | 8 分钟 | [17-supply-quality.md](17-supply-quality.md) |
| 18 | `customer-rfm` | 客户 RFM：找出需要重点维护的客户 | 客户运营 | 进阶 | 8 分钟 | [18-customer-rfm.md](18-customer-rfm.md) |

### 能力说明

- 支持单元格编辑、公式重算、多工作表、撤销／重做、公式向下填充和任务校验。
- 支持导入 CSV／XLSX：识别零售字段后继续引导；其他文件进入自由编辑。
- 支持导出含公式、计算结果与数据来源的 XLSX。导入导出在浏览器本地完成，不上传文件。
- 手机端使用 Univer 移动触控插件，并提供"任务引导／在线表格"切换与任务输入面板。

导入导出聚焦数据、公式和基础样式；不保证完整复刻原文件的原生图表、透视表及全部 Excel 功能。编辑中的工作簿不会自动上传或跨设备同步，刷新前应导出保存。

## 相关内容

- 六步方法论：[../01-learning-path/](../01-learning-path/)
- 公式与图表基础：[../03-formulas/](../03-formulas/)、[../02-charts/](../02-charts/)
- 真实样本与口径：[../06-real-cases/retail-operations.md](../06-real-cases/retail-operations.md)
- 配套数据索引：[../data/README.md](../data/README.md)　返回站点目录：[../README.md](../README.md)

## ✅ 总结

- 本模块 18 课是一条完整路径：01 六步实战打底，02—09 逐项练技能，10—18 做综合项目。
- 每课都有配套 CSV，文件里的行数与教程里公式的区域范围一一对应——写公式前先数行。
- 产出要可核对：每个单元格都有预期值（03 的"咖啡豆／150／未匹配"、05 的"2,000／3／约 666.67"、09 的"A＝89、B＝59、C＝79，最优 B"）。
- 先做数据质量再做分析，先算总量再选图表，先问口径再写结论——这是 18 课共同的顺序。
- 教学模型只用于练函数与练口径；真实样本的结论也只代表样本，不等于公司全貌。
