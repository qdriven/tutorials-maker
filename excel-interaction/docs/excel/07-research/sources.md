# 调研来源清单

> 10 个公开 GitHub 教程／练习仓库的逐项清单与高频主题归并——查出处、查许可、查能练什么。

来源：`src/data/course.ts` 中的 `repos` 与 `researchTopics`。所有链接指向公开 GitHub 仓库；调研页保留原始仓库链接，精选榜单不是 GitHub 官方排名。

## 🎯 本课重点

- **重点用什么**：去哪儿查什么——GitHub 仓库的原始链接（README 与 Release）、每个仓库覆盖的主题（公式／图表／透视表／Power Query）与练习素材类型，以及仓库的许可条款。
- **完成什么**：为每个高频主题找到至少一个可动手的出处，并记录“仓库 → 主题 → 对应课程用例”的映射；需要真实数据时知道去哪下载、许可允许怎么用。

## 📦 配套数据

下列真实数据文件可直接下载，用于验证清单里“数据清洗／整理”“图表与可视化”两类主题：

| 数据 | 文件 | 规模 | 用途 |
| --- | --- | --- | --- |
| 20,000 行原始交易 | [零售真实样本_20000行.csv](../../../../../apps/server/samples/kimi-excel/零售真实样本_20000行.csv) | 20,000 行 × 8 列 | 真实公开样本，配合“数据清洗／整理”主题练习 |
| 500 行快速样例 | [零售真实样例_500行.csv](../../../../../apps/server/samples/kimi-excel/零售真实样例_500行.csv) | 500 行 × 8 列 | 快速练习用原始样例 |
| Excel 练习包 | [真实数据_Excel练习包.xlsx](../../../../../apps/server/samples/kimi-excel/真实数据_Excel练习包.xlsx) | 12 个工作表 | 原始样本、辅助索引、公式化汇总、2 个可编辑图表与 12 个练习任务 |
| SEC 原始申报数据 | [Apple_2025_SEC原始数据.csv](../../../../../apps/server/samples/kimi-excel/Apple_2025_SEC原始数据.csv) | 96 行 × 30 列 | 真实公开财务数据，配合“图表与可视化／数据透视表”主题练习 |
| 配套数据索引 | [../data/README.md](../data/README.md) | 9 个真实案例 CSV | UCI 零售样本与 Apple 三表的整理表索引 |

数据说明：以上文件为公开真实数据，来源与许可见 [../08-credits.md](../08-credits.md)；清单里的第三方仓库仅作延伸阅读，其素材各自的许可以仓库页面为准。

## 仓库清单

| 仓库 | 类型 | 关注点 | 结论 |
| --- | --- | --- | --- |
| [datawhalechina/free-excel](https://github.com/datawhalechina/free-excel) | 中文系统教程 | 数据格式、表合并、文本／逻辑／查找函数、可视化、透视与看板。 | 中文内容完整，强调实践与理解；已有网页和 Markdown 两种版本。 |
| [lukebarousse/Excel_Data_Analytics_Course](https://github.com/lukebarousse/Excel_Data_Analytics_Course) | 完整课程＋工作簿 | 基础、公式、图表、透视表、Power Query、Power Pivot。 | 进阶路径最完整，适合用来校准课程知识覆盖。 |
| [AlexTheAnalyst/Excel-Tutorial](https://github.com/AlexTheAnalyst/Excel-Tutorial) | 练习工作簿 | 数据清洗、条件格式、图表、常用函数、XLOOKUP 与项目数据。 | 按主题拆分练习文件，适合边操作边学。 |
| [DaveOnData/DataCleaningWithExcel](https://github.com/DaveOnData/DataCleaningWithExcel) | 清洗专题 | IF、快速填充、VLOOKUP／XLOOKUP、数据透视表。 | 把查找函数放回数据清洗流程，而不是孤立讲语法。 |
| [rohanmistry231/Practice-Datasets-for-Excel](https://github.com/rohanmistry231/Practice-Datasets-for-Excel) | 15 组练习数据 | 销售、时间序列、市场与金融数据，以及配套分析问题。 | 问题先于工具，适合练习从业务问题倒推分析步骤。 |
| [maf345/data-analysis-viz-excel](https://github.com/maf345/data-analysis-viz-excel) | 透视与图表练习 | 基础图表、高级图表、透视表案例与练习解答。 | 图表练习覆盖集中，适合做操作型补充材料。 |
| [DaveOnData/ExcelPowerQueryTutorial](https://github.com/DaveOnData/ExcelPowerQueryTutorial) | Power Query 专题 | 示例列、自定义列、条件列、分组、嵌套表与表合并。 | 把重复清洗变成可刷新流程，是从手工到自动化的关键一步。 |
| [DaveOnData/ExploratoryDataAnalysisWithExcel](https://github.com/DaveOnData/ExploratoryDataAnalysisWithExcel) | 7 个 EDA 工作簿 | 按系列文件逐步完成探索性数据分析。 | 强调探索过程，适合补充“先看数据，再下结论”的训练。 |
| [shadsluiter/ExcelExamples](https://github.com/shadsluiter/ExcelExamples) | 示例文件 | 通信套餐、库存等电子表格问题解决示例。 | 用具体业务表理解建模，而不是只记菜单位置。 |
| [Balasubramanian-pg/Excel-Portfolio-Project](https://github.com/Balasubramanian-pg/Excel-Portfolio-Project) | 项目集 | 公式、透视表、Power Query、动态看板与自动化项目。 | 展示从函数基础到完整项目的组合方式；项目叙述需自行复核。 |

## 高频主题归并（researchTopics）

| 主题 | 命中数 | 说明 |
| --- | --- | --- |
| 练习文件／项目素材 | 10 | 所有入选样本都提供工作簿、数据集或项目材料 |
| 函数与公式 | 6 | 查找、逻辑、文本、自定义列与计算字段 |
| 图表与可视化 | 6 | 从图表类型到完整看板 |
| 数据清洗／整理 | 6 | 格式、去重、文本处理、合并与转换 |
| 数据透视表 | 5 | 分组汇总、透视图表与业务分析 |
| Power Query | 3 | 可刷新的清洗、合并与自动化流程 |

## 在课程中的落地

| 仓库 | 对应用例／模块 |
| --- | --- |
| datawhalechina/free-excel | [../05-workspace-lessons/01-free-excel.md](../05-workspace-lessons/01-free-excel.md)、[../05-workspace-lessons/12-dynamic-arrays.md](../05-workspace-lessons/12-dynamic-arrays.md) |
| lukebarousse/Excel_Data_Analytics_Course | [../04-basics/](../04-basics/)、[../05-workspace-lessons/02-luke-charts.md](../05-workspace-lessons/02-luke-charts.md)、[../05-workspace-lessons/13-text-date.md](../05-workspace-lessons/13-text-date.md) |
| AlexTheAnalyst/Excel-Tutorial | [../05-workspace-lessons/03-alex-lookup.md](../05-workspace-lessons/03-alex-lookup.md)、[../05-workspace-lessons/11-two-way-lookup.md](../05-workspace-lessons/11-two-way-lookup.md)、[../05-workspace-lessons/14-kpi-format.md](../05-workspace-lessons/14-kpi-format.md) |
| DaveOnData/DataCleaningWithExcel | [../05-workspace-lessons/04-dave-clean.md](../05-workspace-lessons/04-dave-clean.md) |
| rohanmistry231/Practice-Datasets-for-Excel | [../05-workspace-lessons/05-rohan-questions.md](../05-workspace-lessons/05-rohan-questions.md) |
| maf345/data-analysis-viz-excel | [../05-workspace-lessons/06-maf-charts.md](../05-workspace-lessons/06-maf-charts.md) |
| DaveOnData/ExcelPowerQueryTutorial | [../05-workspace-lessons/07-power-query.md](../05-workspace-lessons/07-power-query.md) |
| DaveOnData/ExploratoryDataAnalysisWithExcel | [../05-workspace-lessons/08-eda-outliers.md](../05-workspace-lessons/08-eda-outliers.md) |
| shadsluiter/ExcelExamples | [../05-workspace-lessons/09-plans.md](../05-workspace-lessons/09-plans.md) |
| Balasubramanian-pg/Excel-Portfolio-Project | [../05-workspace-lessons/10-portfolio-dashboard.md](../05-workspace-lessons/10-portfolio-dashboard.md) |

实验台扩展用例还参考了 [ojalp26/Cleaning-dirty-data-samples](https://github.com/ojalp26/Cleaning-dirty-data-samples)、[MisterAare/Supply-chain-analysis-with-excel](https://github.com/MisterAare/Supply-chain-analysis-with-excel)、[DaveOnData/DataAnalysisWithExcel](https://github.com/DaveOnData/DataAnalysisWithExcel)（见 [../08-credits.md](../08-credits.md)）。

## ✅ 总结

- 这份清单是"去哪儿查"的索引：10 个仓库覆盖了中文系统教程、完整课程、练习工作簿与专题练习四种类型。
- 高频主题共 6 类，练习素材（10）最普遍，其次是函数与公式（6）、图表与可视化（6）、数据清洗（6）、数据透视表（5）、Power Query（3）。
- 每个仓库都已落到实验台的具体用例上，用例文档的"来源"字段就是回到原仓库的线索。
- 榜单不是官方排名，筛选依据是实际练习价值；仓库内容与项目叙述仍需自行复核。
- 第三方素材的使用与再分发受各自许可约束，引用前请查看仓库页面与 [../08-credits.md](../08-credits.md)。
