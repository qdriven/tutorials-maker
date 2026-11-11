# 08 · 数据与素材来源（Credits）

> 这一页回答两个问题：数据从哪儿来、能不能用、我们改了什么。

来源：应用根目录 `CREDITS.md`。

## 🎯 本课重点

- **重点用什么**：去哪儿查什么——UCI Machine Learning Repository 的数据集页面与 DOI、SEC EDGAR 的原始申报页（Accession No. 可直接定位文件）、以及各 GitHub 仓库与开源组件的许可条款。
- **完成什么**：为每一份用到的数据找到官方出处与许可，并能照本页写清“原始来源 → 我们的改动 → 使用边界”；需要原始文件时知道去哪里下载。

## 📦 配套数据

本页涉及的可下载真实数据文件（完整清单见 [data/README.md](data/README.md)）：

| 数据 | 文件 | 规模 | 用途 |
| --- | --- | --- | --- |
| 20,000 行原始交易 | [零售真实样本_20000行.csv](../../../../apps/server/samples/kimi-excel/零售真实样本_20000行.csv) | 20,000 行 × 8 列 | UCI Online Retail 的 20,000 行公开样本（CC BY 4.0） |
| 500 行快速样例 | [零售真实样例_500行.csv](../../../../apps/server/samples/kimi-excel/零售真实样例_500行.csv) | 500 行 × 8 列 | 快速练习用原始样例 |
| Excel 练习包 | [真实数据_Excel练习包.xlsx](../../../../apps/server/samples/kimi-excel/真实数据_Excel练习包.xlsx) | 12 个工作表 | 原始样本、辅助索引、公式化汇总、2 个可编辑图表、12 个练习任务、Apple 三表及数据来源 |
| SEC 原始申报数据 | [Apple_2025_SEC原始数据.csv](../../../../apps/server/samples/kimi-excel/Apple_2025_SEC原始数据.csv) | 96 行 × 30 列 | SEC EDGAR 结构化三表原始提取结果 |
| 真实案例整理表 | [data/real/retail-meta.csv](data/real/retail-meta.csv) | 13 条指标 × 2 列 | UCI 零售样本的规模与口径（行数、金额、日期范围、SHA-256） |
| 真实案例整理表 | [data/real/apple-facts.csv](data/real/apple-facts.csv) | 20 行 × 2 列 | Apple FY2025／FY2024 三表关键指标速查（USD millions） |

数据说明：以下各节的出处与许可表述是引用素材时的依据，请原样保留；真实数据只描述样本与申报口径，样本 ≠ 公司全貌。

## UCI Online Retail

- 数据集：Online Retail，Daqing Chen / UCI Machine Learning Repository
- 官方页面：https://archive.ics.uci.edu/dataset/352/online+retail
- DOI：https://doi.org/10.24432/C5BW33
- 许可：Creative Commons Attribution 4.0 International（CC BY 4.0）
- 本网站使用的 20,000 行 CSV 样本镜像：https://github.com/gulertan/Consumer-Analytics-with-R/blob/main/online_retail_sample.csv
- 样本 SHA-256：`219f7f5ec2c2927068b7c510ed01bad8323528c6647732dc0613330f4f90d2f0`
- 获取与核算日期：2026-10-27

改动与衍生内容：增加有效行、行销售额、月份和商品标记；按发票、月份、国家／地区和统一商品编码汇总；生成中文教学说明、公式化 Excel 工作簿和图表。原始 20,000 行 CSV 同时提供，便于复核。样本不是完整数据集，分析结果不外推。

## Apple Inc. FY2025 Form 10-K

- 来源：SEC EDGAR / Apple Inc.
- Accession No.：0000320193-25-000079
- 申报日期：2025-10-31
- 报告期截至：2025-09-27
- 原始申报：https://www.sec.gov/Archives/edgar/data/320193/0000320193-25-000079-index.html
- 网站与练习包使用单位：USD millions
- 获取与核算日期：2026-10-27

衍生内容：保留英文原科目，将原始美元值换算为百万美元展示；用 Excel 公式复算小计、净利润连接、期末现金连接和资产负债平衡；增加中文学习说明。未修改申报事实，未将教学简化模型冒充真实公司数据。

## 实验台扩展用例来源

- 双向查找与条件格式：[AlexTheAnalyst/Excel-Tutorial](https://github.com/AlexTheAnalyst/Excel-Tutorial)
- 动态数组与场景化教学：[datawhalechina/free-excel](https://github.com/datawhalechina/free-excel)
- 文本与日期函数：[lukebarousse/Excel_Data_Analytics_Course](https://github.com/lukebarousse/Excel_Data_Analytics_Course)
- 脏数据清洗：[ojalp26/Cleaning-dirty-data-samples](https://github.com/ojalp26/Cleaning-dirty-data-samples)
- 库存与供应链：[MisterAare/Supply-chain-analysis-with-excel](https://github.com/MisterAare/Supply-chain-analysis-with-excel)
- 客户 RFM：[DaveOnData/DataAnalysisWithExcel](https://github.com/DaveOnData/DataAnalysisWithExcel)

用例按上述项目的公开主题重新设计。中文订单、客户、库存与供应商数据为明确标注的教学模型，不冒充公开企业原始数据。公开真实数据另标来源；市场名称的中文显示翻译不改变原始数值。用例筛选优先考虑实际练习价值，不按 Star 机械排序。

## Excel 基础课程目录

- Luke Barousse — Excel for Data Analytics：https://github.com/lukebarousse/Excel_Data_Analytics_Course
- 基础页使用其公开八章目录作为课程结构参考，重新编写中文解释与演示；未复制其付费 Problem Workbooks 或课程素材。

## 在线表格与文件处理

- Univer Sheets（Apache License 2.0）：在线单元格、公式、工作表与移动触控编辑；未使用 Pro 功能。
- ExcelJS（MIT License）：浏览器内 XLSX 导入导出。
- Papa Parse（MIT License）：浏览器内 CSV 解析。

## 界面与图表

- 图标：Lucide（ISC License）
- 图表组件：Recharts（MIT License）
- 其他界面与教学文本为本项目生成；未使用第三方摄影图片。

## 相关内容

- 真实案例数据：[06-real-cases/](06-real-cases/)　调研仓库清单：[07-research/sources.md](07-research/sources.md)
- 配套数据索引：[data/README.md](data/README.md)
- 返回索引：[README.md](README.md)

## ✅ 总结

- 每份真实数据都有可核验的出处：UCI 数据集页与 DOI、SEC EDGAR 申报页与 Accession No.、样本 SHA-256 与获取日期（均为 2026-10-27）。
- 许可各不相同：UCI Online Retail 为 CC BY 4.0；开源组件分别按 Apache 2.0（Univer）、MIT（ExcelJS、Papa Parse、Recharts）、ISC（Lucide）使用。
- 衍生内容都已写明改了什么、没改什么：保留原始英文科目、不修改申报事实、不把教学简化模型冒充真实公司数据。
- 边界同样重要：样本不是完整数据集，真实数据不外推为公司的完整经营结果。
- 引用素材时请连同本页的来源与许可表述一起带上，原始文件在 `apps/server/samples/kimi-excel/` 可直接下载复核。
