# 06 · 真实案例

> 两个可追溯的真实案例：UCI 零售运营样本与 Apple FY2025 三表，配可下载的 CSV／Excel 练习材料。

来源：`src/data/realCases.ts`（由真实样本与 SEC 申报提取、核算，生成于 2026-10-27）。两个案例都提供可下载的 Excel／CSV 练习材料，数值为源数据或可复现的汇总，无虚构业务记录。

| 案例 | 数据 | 文档 |
| --- | --- | --- |
| UCI 零售运营 | Online Retail 20,000 行样本（2010-12-01 — 2011-12-09） | [retail-operations.md](retail-operations.md) |
| Apple FY2025 三表 | Form 10-K 利润表／资产负债表／现金流量表（USD millions） | [apple-finance.md](apple-finance.md) |

## 🎯 本课重点

- **重点用什么**：真实样本的“清洗 → 汇总 → 核对”动作（SUMIFS／COUNTIFS 按月汇总、数据透视表交叉核对）＋ 财报的三表勾稽（SUM 复算小计、IF＋ABS 校验平衡）。
- **完成什么**：在零售样本上复算出 380,271.22 英镑的样本销售额与 2011-11 的 51,989.37 英镑，在 Apple 案例上验通三条连接（净利润、期末现金 35,934、资产负债平衡 359,241＝285,508＋73,733）。

## 📦 配套数据

### 零售运营案例

| 数据 | 文件 | 规模 | 用途 |
| --- | --- | --- | --- |
| 样本规模与口径 | [retail-meta.csv](../data/real/retail-meta.csv) | 13 条指标 × 2 列 | 行数、金额、日期范围与样本 SHA-256 |
| 原始交易行样例 | [retail-preview.csv](../data/real/retail-preview.csv) | 8 行 × 12 列 | 带有效判定与行销售额的原始行样例 |
| 月度汇总 | [retail-monthly.csv](../data/real/retail-monthly.csv) | 13 行 × 7 列 | 有效行数、发票数、销售额、客单价、期间与环比 |
| 市场结构 | [retail-markets.csv](../data/real/retail-markets.csv) | 8 行 × 5 列 | 国家／地区的发票数、销售额、客单价与份额 |
| 商品排行 | [retail-products.csv](../data/real/retail-products.csv) | 8 行 × 6 列 | 商品编码、描述、数量、销售额、发票数与份额 |

### Apple FY2025 三表

| 数据 | 文件 | 规模 | 用途 |
| --- | --- | --- | --- |
| 关键事实速查 | [apple-facts.csv](../data/real/apple-facts.csv) | 20 行 × 2 列 | 收入、毛利、营业利润、净利、现金与资产负债关键指标 |
| 利润表 | [apple-income.csv](../data/real/apple-income.csv) | 11 行 × 7 列 | FY2024／FY2025 利润表科目（USD millions） |
| 资产负债表 | [apple-balance.csv](../data/real/apple-balance.csv) | 27 行 × 7 列 | FY2024／FY2025 资产负债表科目 |
| 现金流量表 | [apple-cashflow.csv](../data/real/apple-cashflow.csv) | 28 行 × 7 列 | FY2024／FY2025 现金流量表科目 |
| SEC 原始申报数据 | [Apple_2025_SEC原始数据.csv](../../../../../apps/server/samples/kimi-excel/Apple_2025_SEC原始数据.csv) | 96 行 × 30 列 | SEC EDGAR 结构化三表原始提取结果 |

### 完整原始样本

| 数据 | 文件 | 规模 | 用途 |
| --- | --- | --- | --- |
| 20,000 行原始交易 | [零售真实样本_20000行.csv](../../../../../apps/server/samples/kimi-excel/零售真实样本_20000行.csv) | 20,000 行 × 8 列 | 网页运营汇总对应的完整样本 |
| 500 行快速样例 | [零售真实样例_500行.csv](../../../../../apps/server/samples/kimi-excel/零售真实样例_500行.csv) | 500 行 × 8 列 | 快速练习用原始样例 |
| Excel 练习包 | [真实数据_Excel练习包.xlsx](../../../../../apps/server/samples/kimi-excel/真实数据_Excel练习包.xlsx) | 12 个工作表 | 原始样本、辅助索引、公式化汇总、2 个可编辑图表、12 个练习任务、Apple 三表及数据来源 |

数据说明：

- 零售案例只描述所使用的 20,000 行公开样本，不外推为完整公司的经营结果。样本销售金额是有效行 `Quantity × UnitPrice` 之和，不等于公司净收入；原始数据没有访问漏斗、渠道成本或利润字段，因此不虚构这些指标。
- 财务案例来自 Apple Inc. FY2025 Form 10-K，金额单位为 USD millions。网页用于报表学习与复算，不替代完整年报及附注。真实股东权益变化不能只用净利润和分红解释，还需结合回购、股权激励与其他综合收益。

## 🧱 基础操作

1. **先读口径**：零售看“有效行 / 无效行 / 日期范围 / SHA-256”，财务看“单位 USD millions / 报告期 / Accession No.”。
2. **先清洗再汇总**：零售按取消单、非正数量／单价、缺客户 ID 三类规则标出无效行；财务按科目原名对齐，不改英文科目。
3. **汇总要能交叉核对**：零售用 SUMIFS／COUNTIFS 与数据透视表各算一遍月度销售额；财务用 SUM 复算各表小计。
4. **结论要带数字**：每个观察都写成“指标 + 数值 + 口径”，例如“2011-11 销售额 51,989.37 英镑（完整月份）”。
5. **守住边界**：样本 ≠ 公司全貌，报表节选 ≠ 年报附注，引用时一并写清。

## 🛠 实战操作

可下载练习材料位于应用 `public/downloads/`：

- `真实数据_Excel练习包.xlsx`：12 个工作表，含原始样本、辅助索引、公式化汇总、2 个可编辑图表、12 个练习任务、Apple 三表及数据来源
- `零售真实样例_500行.csv`：快速练习用原始样例
- `零售真实样本_20000行.csv`：网页运营汇总对应的完整样本
- `Apple_2025_SEC原始数据.csv`：SEC EDGAR 结构化三表原始提取结果

工作簿的 80,311 个公式已通过 LibreOffice 重算与缓存校验，无公式错误；月度、市场、商品和财务结果另经独立数据复核。网页答案对应 20,000 行样本，不对应 500 行快速文件。

两篇案例的完整步骤与复算表见：

- [retail-operations.md](retail-operations.md)：样本概览、原始行样例、月度汇总、市场结构、商品排行与可练习的观察
- [apple-finance.md](apple-finance.md)：关键事实、利润表、资产负债表、现金流量表与三表勾稽练习

## 相关内容

- 在真实样本上走完六步：[../05-workspace-lessons/01-free-excel.md](../05-workspace-lessons/01-free-excel.md)
- 月度趋势用例：[../05-workspace-lessons/02-luke-charts.md](../05-workspace-lessons/02-luke-charts.md)　市场结构用例：[../05-workspace-lessons/06-maf-charts.md](../05-workspace-lessons/06-maf-charts.md)
- 配套数据索引：[../data/README.md](../data/README.md)
- 数据来源与许可：[../08-credits.md](../08-credits.md)

## ✅ 总结

- 两个案例的数值都来自真实公开来源：UCI Online Retail 的 20,000 行样本与 Apple FY2025 Form 10-K 申报数据，无虚构业务记录。
- 零售案例的复算路径是“定口径 → 标无效行 → 按月／按国家／按商品汇总 → 与样本合计交叉核对”。
- 财务案例的复算路径是“SUM 复算小计 → 净利润连接 → 期末现金连接 → 资产负债平衡”，三条连接都能用公式固定下来。
- 引用时必须带上口径与边界：样本不等于公司全貌，部分月份与 USD millions 单位都不能省略。
- 想继续动手，就从配套数据表下载对应 CSV 或 Excel 练习包，再照着两篇案例的“实战操作”一节复算一遍。
