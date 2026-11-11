# 配套数据索引

> 每个 lesson 目录对应一篇教程文档；目录里的 CSV 就是该课动手练习时打开的工作表。
> 数据由 `node scripts/excel-docs/generate-lesson-data.mjs` 从就地 domain `domains/excel-animation` 的课程定义直接导出，
> 因此“教程里的公式”与“数据文件里的行”始终一致。

## 🎯 本课重点

- **重点用什么**：按课程文档里的工作表名打开对应 CSV（Excel 可直接打开，或用“数据 → 从文本/CSV”导入）。
- **完成什么**：能说清“这一课用哪个文件、哪张表、哪些列”，并把公式里的区域范围对上真实行数。

## 📦 配套数据

| 数据目录 | 对应教程 | 文件 | 规模 |
| --- | --- | --- | --- |
| [`free-excel/`](lessons/free-excel/) | [05-workspace-lessons/01-free-excel.md](../05-workspace-lessons/01-free-excel.md) | `raw.csv`、`invoice-index.csv`、`summary.csv`、`report.csv` | 24 行 × 12 列；20 行 × 4 列；5 行 × 4 列；3 行 × 2 列 |
| [`luke-charts/`](lessons/luke-charts/) | [05-workspace-lessons/02-luke-charts.md](../05-workspace-lessons/02-luke-charts.md) | `monthly.csv`、`practice.csv` | 3 行 × 2 列；3 行 × 2 列 |
| [`alex-lookup/`](lessons/alex-lookup/) | [05-workspace-lessons/03-alex-lookup.md](../05-workspace-lessons/03-alex-lookup.md) | `products.csv`、`practice.csv` | 5 行 × 5 列；3 行 × 2 列 |
| [`dave-clean/`](lessons/dave-clean/) | [05-workspace-lessons/04-dave-clean.md](../05-workspace-lessons/04-dave-clean.md) | `orders.csv`、`practice.csv` | 8 行 × 5 列；3 行 × 2 列 |
| [`rohan-questions/`](lessons/rohan-questions/) | [05-workspace-lessons/05-rohan-questions.md](../05-workspace-lessons/05-rohan-questions.md) | `orders.csv`、`practice.csv` | 8 行 × 5 列；3 行 × 2 列 |
| [`maf-charts/`](lessons/maf-charts/) | [05-workspace-lessons/06-maf-charts.md](../05-workspace-lessons/06-maf-charts.md) | `markets.csv`、`practice.csv` | 5 行 × 2 列；2 行 × 2 列 |
| [`power-query/`](lessons/power-query/) | [05-workspace-lessons/07-power-query.md](../05-workspace-lessons/07-power-query.md) | `orders.csv`、`products.csv` | 3 行 × 5 列；5 行 × 5 列 |
| [`eda-outliers/`](lessons/eda-outliers/) | [05-workspace-lessons/08-eda-outliers.md](../05-workspace-lessons/08-eda-outliers.md) | `orders.csv`、`practice.csv` | 10 行 × 2 列；4 行 × 2 列 |
| [`plans/`](lessons/plans/) | [05-workspace-lessons/09-plans.md](../05-workspace-lessons/09-plans.md) | `plans.csv`、`practice.csv` | 3 行 × 4 列；5 行 × 2 列 |
| [`portfolio-dashboard/`](lessons/portfolio-dashboard/) | [05-workspace-lessons/10-portfolio-dashboard.md](../05-workspace-lessons/10-portfolio-dashboard.md) | `income.csv`、`balance.csv`、`cash.csv`、`dashboard.csv` | 4 行 × 2 列；4 行 × 2 列；6 行 × 2 列；4 行 × 2 列 |
| [`two-way-lookup/`](lessons/two-way-lookup/) | [05-workspace-lessons/11-two-way-lookup.md](../05-workspace-lessons/11-two-way-lookup.md) | `matrix.csv`、`practice.csv` | 3 行 × 4 列；5 行 × 2 列 |
| [`dynamic-arrays/`](lessons/dynamic-arrays/) | [05-workspace-lessons/12-dynamic-arrays.md](../05-workspace-lessons/12-dynamic-arrays.md) | `orders.csv`、`practice.csv` | 6 行 × 3 列；3 行 × 2 列 |
| [`text-date/`](lessons/text-date/) | [05-workspace-lessons/13-text-date.md](../05-workspace-lessons/13-text-date.md) | `customers.csv` | 2 行 × 6 列 |
| [`kpi-format/`](lessons/kpi-format/) | [05-workspace-lessons/14-kpi-format.md](../05-workspace-lessons/14-kpi-format.md) | `dashboard.csv` | 3 行 × 5 列 |
| [`dirty-data/`](lessons/dirty-data/) | [05-workspace-lessons/15-dirty-data.md](../05-workspace-lessons/15-dirty-data.md) | `dirty.csv` | 3 行 × 4 列 |
| [`inventory-reorder/`](lessons/inventory-reorder/) | [05-workspace-lessons/16-inventory-reorder.md](../05-workspace-lessons/16-inventory-reorder.md) | `inventory.csv` | 3 行 × 8 列 |
| [`supply-quality/`](lessons/supply-quality/) | [05-workspace-lessons/17-supply-quality.md](../05-workspace-lessons/17-supply-quality.md) | `suppliers.csv`、`analysis.csv` | 3 行 × 6 列；3 行 × 2 列 |
| [`customer-rfm/`](lessons/customer-rfm/) | [05-workspace-lessons/18-customer-rfm.md](../05-workspace-lessons/18-customer-rfm.md) | `orders.csv`、`summary.csv` | 7 行 × 4 列；3 行 × 5 列 |
| [`retail-operations-free-excel/`](lessons/retail-operations-free-excel/) | [06-real-cases/retail-operations.md](../06-real-cases/retail-operations.md) | `raw.csv`、`invoice-index.csv`、`summary.csv`、`report.csv` | 500 行 × 12 列；461 行 × 4 列；5 行 × 4 列；3 行 × 2 列 |
| [`chart-line/`](lessons/chart-line/) | [02-charts/01-line.md](../02-charts/01-line.md) | `chart.csv` | 6 行 × 2 列 |
| [`chart-column/`](lessons/chart-column/) | [02-charts/02-column.md](../02-charts/02-column.md) | `chart.csv` | 4 行 × 2 列 |
| [`chart-bar/`](lessons/chart-bar/) | [02-charts/03-bar.md](../02-charts/03-bar.md) | `chart.csv` | 5 行 × 2 列 |
| [`chart-pie/`](lessons/chart-pie/) | [02-charts/04-pie.md](../02-charts/04-pie.md) | `chart.csv` | 2 行 × 2 列 |
| [`chart-scatter/`](lessons/chart-scatter/) | [02-charts/05-scatter.md](../02-charts/05-scatter.md) | `chart.csv` | 10 行 × 2 列 |
| [`chart-histogram/`](lessons/chart-histogram/) | [02-charts/06-histogram.md](../02-charts/06-histogram.md) | `chart.csv` | 5 行 × 2 列 |
| [`chart-combo/`](lessons/chart-combo/) | [02-charts/07-combo.md](../02-charts/07-combo.md) | `chart.csv` | 6 行 × 3 列 |
| [`chart-stacked/`](lessons/chart-stacked/) | [02-charts/08-stacked.md](../02-charts/08-stacked.md) | `chart.csv` | 3 行 × 3 列 |

## 真实案例数据

| 文件 | 规模 | 说明 |
| --- | --- | --- |
| [`real/retail-preview.csv`](real/retail-preview.csv) | 8 行 × 12 列 | 原始交易行样例，含有效判定与行销售额 |
| [`real/retail-monthly.csv`](real/retail-monthly.csv) | 13 行 × 7 列 | 月度汇总：有效行、发票数、销售额、客单价、环比 |
| [`real/retail-markets.csv`](real/retail-markets.csv) | 8 行 × 5 列 | 各国家／地区的订单数、销售额、客单价、占比 |
| [`real/retail-products.csv`](real/retail-products.csv) | 8 行 × 6 列 | 商品排行：数量、销售额、订单数、占比 |
| [`real/retail-meta.csv`](real/retail-meta.csv) | 13 行 × 2 列 | UCI 零售样本的规模与口径（行数、金额、日期范围、SHA-256） |
| [`real/apple-income.csv`](real/apple-income.csv) | 11 行 × 7 列 | Apple FY2025／FY2024 利润表科目（USD millions） |
| [`real/apple-balance.csv`](real/apple-balance.csv) | 27 行 × 7 列 | Apple FY2025／FY2024 资产负债表科目 |
| [`real/apple-cashflow.csv`](real/apple-cashflow.csv) | 28 行 × 7 列 | Apple FY2025／FY2024 现金流量表科目 |
| [`real/apple-facts.csv`](real/apple-facts.csv) | 20 行 × 2 列 | 三表关键指标速查（收入、毛利、净利、现金、资产负债） |

完整原始数据（未拆表）：

- [`apps/server/samples/kimi-excel/零售真实样本_20000行.csv`](../../../../../apps/server/samples/kimi-excel/零售真实样本_20000行.csv) — 20,000 行公开样本
- [`apps/server/samples/kimi-excel/零售真实样例_500行.csv`](../../../../../apps/server/samples/kimi-excel/零售真实样例_500行.csv) — 500 行精简样本
- [`apps/server/samples/kimi-excel/真实数据_Excel练习包.xlsx`](../../../../../apps/server/samples/kimi-excel/真实数据_Excel练习包.xlsx) — Excel 练习包
- [`apps/server/samples/kimi-excel/Apple_2025_SEC原始数据.csv`](../../../../../apps/server/samples/kimi-excel/Apple_2025_SEC原始数据.csv) — SEC EDGAR 原始申报数据

## ✅ 总结

- 数据不是另写一份：全部从应用源码导出，改动课程定义后重新跑一次生成脚本即可同步。
- 每篇教程的“配套数据”一节都指向这里的文件，链接失效时 `pnpm docs:excel:check` 会直接报错。
- 教学模型数据（中文订单、客户、库存等）与真实公开数据（UCI 零售、SEC 申报）分开存放，引用时注意口径。

