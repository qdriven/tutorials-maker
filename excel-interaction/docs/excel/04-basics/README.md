# 04 · Excel 基础八章

> 按 Luke Barousse 的 Excel for Data Analytics 公开八章大纲，把工作簿、公式、图表、表格、透视表与三件桌面高级工具串成一条"看得懂 → 算得出 → 看得明 → 汇得拢"的练习路线。

来源：`src/data/basics.ts` 中的 `basicChapters`。按 Luke Barousse 的 Excel for Data Analytics 公开八章大纲重新编排（中文解释与演示，未复制其付费练习工作簿）。每章说明学习目标、核心概念，并链接到对应实验用例。

| 章 | 短标题 | 文档 |
| --- | --- | --- |
| 01 | 工作簿入门 | [01-workbook-basics.md](01-workbook-basics.md) |
| 02 | 公式与函数 | [02-formulas-functions.md](02-formulas-functions.md) |
| 03 | 图表 | [03-charts.md](03-charts.md) |
| 04 | 表格进阶 | [04-tables.md](04-tables.md) |
| 05 | 数据透视表 | [05-pivot-tables.md](05-pivot-tables.md) |
| 06 | 高级分析 | [06-advanced-analysis.md](06-advanced-analysis.md) |
| 07 | Power Query | [07-power-query.md](07-power-query.md) |
| 08 | Power Pivot | [08-power-pivot.md](08-power-pivot.md) |

高阶章节（06—08）明确标注为 Excel 桌面功能导览；网页演示不冒充 Solver、Power Query、Power Pivot 或 DAX 引擎。

## 🎯 本课重点

- **重点用什么**：`Ctrl＋T` 把当前区域创建为 Excel 表、`SUMIFS`／`COUNTIFS` 做条件汇总、插入 → 组合图，以及模块末尾的常用快捷键（`Alt＋=` 自动求和、`Ctrl＋方向键` 跳到数据区边缘、`F4` 切换绝对／混合引用）。
- **完成什么**：能在自己的一份明细表上依次完成"看得懂 → 算得出 → 看得明 → 汇得拢"四步，并对每一步说清它解决了什么问题。

## 📦 配套数据

| 数据 | 文件 | 规模 | 用途 |
| --- | --- | --- | --- |
| 原始订单明细 | [raw.csv](../data/lessons/free-excel/raw.csv) | 24 行 × 12 列 | 第 01、04 章：工作簿对象与 Excel 表对象 |
| 商品主数据 | [products.csv](../data/lessons/alex-lookup/products.csv) | 5 行 × 5 列 | 第 02 章：查找函数与公式写法 |
| 月度收入序列 | [chart.csv](../data/lessons/chart-line/chart.csv) | 6 行 × 2 列 | 第 03 章：折线图（看趋势） |
| 月度收入与利润率 | [chart.csv](../data/lessons/chart-combo/chart.csv) | 6 行 × 3 列 | 第 03 章：组合图（量率同看） |
| 业务问题订单 | [orders.csv](../data/lessons/rohan-questions/orders.csv) | 8 行 × 5 列 | 第 05 章：按地区／渠道汇总 |
| 月度汇总表 | [summary.csv](../data/lessons/free-excel/summary.csv) | 5 行 × 4 列 | 第 05 章：汇总结果的表格结构 |
| 套餐价格表 | [plans.csv](../data/lessons/plans/plans.csv) | 3 行 × 4 列 | 第 06 章：方案比较建模 |
| 套餐比较练习区 | [practice.csv](../data/lessons/plans/practice.csv) | 5 行 × 2 列 | 第 06 章：填答案与自动取最低方案 |
| 待补全订单 | [orders.csv](../data/lessons/power-query/orders.csv) | 3 行 × 5 列 | 第 07 章：合并查询的左表 |
| 商品主数据 | [products.csv](../data/lessons/power-query/products.csv) | 5 行 × 5 列 | 第 07 章：合并查询的右表 |
| 利润表 | [income.csv](../data/lessons/portfolio-dashboard/income.csv) | 4 行 × 2 列 | 第 08 章：跨表指标与利润率 |
| 资产负债表 | [balance.csv](../data/lessons/portfolio-dashboard/balance.csv) | 4 行 × 2 列 | 第 08 章：资产负债平衡校验 |
| 现金流量表 | [cash.csv](../data/lessons/portfolio-dashboard/cash.csv) | 6 行 × 2 列 | 第 08 章：期末现金复算 |

数据说明：每个数据目录对应一个在线实验用例的练习工作表，CSV 就是动手练习时打开的那几张表，由 `node scripts/excel-docs/generate-lesson-data.mjs` 从 `domains/excel-animation` 的课程定义导出，因此文档里的公式与数据文件里的行始终一致。中文订单、商品主数据、套餐与业务问题订单是教学模型（刻意保留取消单、异常数量、异常价格与重复订单）；第 08 章的 Apple FY2025 三表是 Form 10-K 真实申报值，单位 USD millions。两类数据口径不同，不要混着引用。

## 🧱 基础操作

1. **对象层级**：工作簿（Workbook）→ 工作表（Worksheet）→ 单元格（Cell）→ 区域（Range）。地址写成 `表名!A1`，跨表引用前必须先确认工作表名。
2. **Ribbon 与菜单**：Excel 的功能按"插入""公式""数据""视图"分组；同一件事在 Ribbon 和右键菜单里都能找到，但路径不同会导致同事讲不清。
3. **快捷键是效率也是口径**：`Ctrl＋C`／`Ctrl＋V` 复制粘贴、`Ctrl＋Z`／`Ctrl＋Y` 撤销重做、`Ctrl＋T` 把当前区域创建为 Excel 表、`Alt＋=` 插入自动求和、`Ctrl＋方向键` 跳到当前数据区域边缘、`F4` 重复上一步（编辑引用时切换绝对／混合引用）。
4. **八章的推进顺序**：对象（第 01 章）→ 公式（第 02 章）→ 图表（第 03 章）→ 表对象（第 04 章）→ 汇总透视（第 05 章）→ 反推与方案（第 06 章）→ 可刷新的清洗（第 07 章）→ 跨表模型（第 08 章）。
5. **三条通用底线**：先定义问题再动表；公式必须可复算并能追溯到源列；结论要写清口径与边界。

## 🛠 实战操作

八章共用一条主线，每一章都落在这份 24 行 × 12 列的中文订单明细上：

| 步骤 | 章节 | 关键动作 | 落在哪份数据 |
| --- | --- | --- | --- |
| 看得懂 | [第 01 章](01-workbook-basics.md) | 说清工作簿／工作表／单元格／区域，用 `Ctrl＋方向键` 找到数据区边缘 | [raw.csv](../data/lessons/free-excel/raw.csv) |
| 算得出 | [第 02 章](02-formulas-functions.md) | 用 `XLOOKUP`／`VLOOKUP` 在商品主数据里查找，理解相对与绝对引用 | [products.csv](../data/lessons/alex-lookup/products.csv) |
| 看得明 | [第 03 章](03-charts.md) | 插入折线图看趋势、组合图量率同看，逐项检查标题、坐标轴与图例 | [chart-line](../data/lessons/chart-line/chart.csv)、[chart-combo](../data/lessons/chart-combo/chart.csv) |
| 汇得拢 | [第 04、05 章](04-tables.md) | `Ctrl＋T` 转 Excel 表、加条件格式，再用条件汇总复现透视表的行列与值 | [raw.csv](../data/lessons/free-excel/raw.csv)、[orders.csv](../data/lessons/rohan-questions/orders.csv) |
| 算得准 | [第 06—08 章](06-advanced-analysis.md) | 套餐成本建模反推方案、合并查询补全单价、三表勾稽校验 | [plans.csv](../data/lessons/plans/plans.csv)、[power-query/orders.csv](../data/lessons/power-query/orders.csv)、[portfolio-dashboard/cash.csv](../data/lessons/portfolio-dashboard/cash.csv) |

进阶三章（06—08）的实操边界不变：它们演示的是"公式与数据组织的思路"，Solver、Power Query 引擎、Power Pivot／DAX 引擎需在 Excel 桌面版完成。

## 相关内容

- 通用分析方法：[../01-learning-path/](../01-learning-path/)
- 图表与公式：[../02-charts/](../02-charts/)、[../03-formulas/](../03-formulas/)
- 章内"去做……"链接指向 [../05-workspace-lessons/](../05-workspace-lessons/) 的在线实验
- 配套数据总索引：[../data/README.md](../data/README.md)

## ✅ 总结

- 八章的共同主线是"从明细到结论"，每一步都要求口径可复核。
- `Ctrl＋T`、`Alt＋=`、`Ctrl＋方向键`、`F4` 是贯穿全模块的四个高频快捷键。
- 教学模型数据（中文订单、商品、套餐）与真实公开数据（Apple FY2025 Form 10-K）分开存放，引用时看清口径。
- 第 06—08 章是 Excel 桌面功能导览，网页演示不冒充 Solver、Power Query、Power Pivot 或 DAX 引擎。
