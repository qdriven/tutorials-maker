# Apple FY2025 三表案例（Form 10-K）

> 用 Apple FY2025 Form 10-K 的三张报表做一次复算：把净利润、期末现金、资产负债平衡三条连接亲手算通。

来源：`src/data/realCases.ts` 中 `appleIncome`、`appleBalance`、`appleCashFlow`、`appleFacts`。数据取自 Apple Inc. FY2025 Form 10-K（SEC EDGAR，Accession No. `0000320193-25-000079`），报告期截至 2025-09-27，申报日期 2025-10-31。金额单位：USD millions。用于报表学习与复算，不替代完整年报及附注。

## 🎯 本课重点

- **重点用什么**：SUM 复算各表小计（如营业费用合计＝研发＋销售、一般及管理费用），IF＋ABS 做勾稽校验，跨表引用核对期末现金。
- **完成什么**：算出 FY2025 毛利润 195,201、净利润 112,010（USD millions），并验证三条连接成立：111,482＋15,195−120,686＋29,943＝35,934＝期末现金＝资产负债表现金；359,241＝285,508＋73,733。

## 📦 配套数据

| 数据 | 文件 | 规模 | 用途 |
| --- | --- | --- | --- |
| 关键事实速查 | [apple-facts.csv](../data/real/apple-facts.csv) | 20 行 × 2 列 | 收入、毛利、营业利润、净利、现金与资产负债关键指标 |
| 利润表 | [apple-income.csv](../data/real/apple-income.csv) | 11 行 × 7 列 | FY2024／FY2025 利润表科目（USD millions） |
| 资产负债表 | [apple-balance.csv](../data/real/apple-balance.csv) | 27 行 × 7 列 | FY2024／FY2025 资产负债表科目 |
| 现金流量表 | [apple-cashflow.csv](../data/real/apple-cashflow.csv) | 28 行 × 7 列 | FY2024／FY2025 现金流量表科目 |
| SEC 原始申报数据 | [Apple_2025_SEC原始数据.csv](../../../../../apps/server/samples/kimi-excel/Apple_2025_SEC原始数据.csv) | 96 行 × 30 列 | SEC EDGAR 结构化三表原始提取结果（含申报号、财年、概念与科目标签） |
| Excel 练习包 | [真实数据_Excel练习包.xlsx](../../../../../apps/server/samples/kimi-excel/真实数据_Excel练习包.xlsx) | 12 个工作表 | 含 Apple 三表、公式化汇总与练习任务 |

数据说明：金额单位为 USD millions，来自 Apple Inc. FY2025 Form 10-K（Accession No. `0000320193-25-000079`），用于报表学习与复算，不替代完整年报及附注；真实股东权益变化不能只用净利润和分红解释，还需结合回购、股权激励与其他综合收益。

数据来源：

- 原始申报：https://www.sec.gov/Archives/edgar/data/320193/0000320193-25-000079-index.html
- Accession No.：`0000320193-25-000079`　获取与核算日期：2026-10-27
- 下载：`Apple_2025_SEC原始数据.csv`、`真实数据_Excel练习包.xlsx`

衍生内容说明见 [../08-credits.md](../08-credits.md)。

## 🧱 基础操作

1. **导入三表**：把 `apple-income.csv`、`apple-balance.csv`、`apple-cashflow.csv` 分别放进“利润表”“资产负债表”“现金流量表”三张工作表，行序与本文一致，便于逐行对照。
2. **统一单位**：全部数值已是 USD millions，不要再除以 1,000,000；需要换算成美元时再乘 1,000,000。
3. **复算小计**：毛利润 ＝ 净销售额 − 销售成本；营业费用合计 ＝ 研发费用 ＋ 销售、一般及管理费用；营业利润 ＝ 毛利润 − 营业费用合计。
4. **做平衡校验**：用 `IF(ABS(资产总计 − 负债合计 − 股东权益合计) < 0.1, "Check", "Error")`，FY2025 应返回 `Check`。
5. **跨表取数**：期末现金直接引用现金流量表的期末余额，再与资产负债表的“现金及现金等价物”比对，两处都应是 35,934。

## 🛠 实战操作

### 关键事实（appleFacts）

| 指标 | 数值（USD millions） |
| --- | --- |
| 净销售额 FY2024 / FY2025 | 391,035 / 416,161 |
| 毛利润 FY2025 | 195,201 |
| 营业利润 FY2025 | 133,050 |
| 净利润 FY2024 / FY2025 | 93,736 / 112,010 |
| 资产总计 FY2024 / FY2025 | 364,980 / 359,241 |
| 流动资产 / 流动负债 FY2025 | 147,957 / 165,631 |
| 负债合计 / 股东权益合计 FY2025 | 285,508 / 73,733 |
| 现金及现金等价物 FY2025 | 35,934 |
| 经营／投资／筹资现金流 FY2025 | 111,482 / 15,195 / −120,686 |
| 现金净变动 FY2025 | 5,991（期初 29,943 → 期末 35,934） |

### 利润表（appleIncome）

| 项目 | 英文科目 | FY2024 | FY2025 | 说明 |
| --- | --- | --- | --- | --- |
| 净销售额 | Net sales | 391,035 | 416,161 | 完整财年；含产品与服务 |
| 销售成本 | Cost of sales | 210,352 | 220,960 | 报表以正数列示成本 |
| **毛利润** | Gross margin | 180,683 | 195,201 | 净销售额－销售成本 |
| 研发费用 | Research and development | 31,370 | 34,550 | |
| 销售、一般及管理费用 | Selling, general and administrative | 26,097 | 27,601 | |
| **营业费用合计** | Total operating expenses | 57,467 | 62,151 | 研发＋销售、一般及管理费用 |
| **营业利润** | Operating income | 123,216 | 133,050 | 毛利润－营业费用 |
| 其他收入／（费用）净额 | Other income/(expense), net | 269 | −321 | 负数表示净费用 |
| **税前利润** | Income before provision for income taxes | 123,485 | 132,729 | 营业利润＋其他净额 |
| 所得税费用 | Provision for income taxes | 29,749 | 20,719 | |
| **净利润** | Net income | 93,736 | 112,010 | 同时出现在现金流量表起点 |

### 资产负债表（appleBalance）

| 项目 | 英文科目 | FY2024 | FY2025 | 说明 |
| --- | --- | --- | --- | --- |
| 现金及现金等价物 | Cash and cash equivalents | 29,943 | 35,934 | 与现金流量表期末余额一致 |
| 流动有价证券 | Marketable securities | 35,228 | 18,763 | |
| 应收账款净额 | Accounts receivable, net | 33,410 | 39,777 | |
| 供应商非贸易应收款 | Vendor non-trade receivables | 32,833 | 33,180 | |
| 存货 | Inventories | 7,286 | 5,718 | |
| 其他流动资产 | Other current assets | 14,287 | 14,585 | |
| **流动资产合计** | Total current assets | 152,987 | 147,957 | 上述流动资产之和 |
| 非流动有价证券 | Marketable securities | 91,479 | 77,723 | |
| 固定资产净额 | Property, plant and equipment, net | 45,680 | 49,834 | |
| 其他非流动资产 | Other non-current assets | 74,834 | 83,727 | |
| **非流动资产合计** | Total non-current assets | 211,993 | 211,284 | 上述非流动资产之和 |
| **资产总计** | Total assets | 364,980 | 359,241 | 流动＋非流动资产 |
| 应付账款 | Accounts payable | 68,960 | 69,860 | |
| 其他流动负债 | Other current liabilities | 78,304 | 66,387 | |
| 递延收入 | Deferred revenue | 8,249 | 9,055 | |
| 商业票据 | Commercial paper | 9,967 | 7,979 | 采用与流动负债合计一致的主表行 |
| 一年内到期长期债务 | Term debt | 10,912 | 12,350 | |
| **流动负债合计** | Total current liabilities | 176,392 | 165,631 | 上述流动负债之和 |
| 非流动长期债务 | Term debt | 85,750 | 78,328 | |
| 其他非流动负债 | Other non-current liabilities | 45,888 | 41,549 | |
| **非流动负债合计** | Total non-current liabilities | 131,638 | 119,877 | 长期债务＋其他非流动负债 |
| **负债合计** | Total liabilities | 308,030 | 285,508 | 流动＋非流动负债 |
| 普通股及资本公积 | Common stock and additional paid-in capital | 83,276 | 93,568 | |
| 累计亏损 | Accumulated deficit | −19,154 | −14,264 | 负号保留；不是“未分配利润为正” |
| 其他综合收益累计损失 | Accumulated other comprehensive loss | −7,172 | −5,571 | 负号保留 |
| **股东权益合计** | Total shareholders’ equity | 56,950 | 73,733 | 普通股及资本公积＋累计亏损＋其他综合收益 |
| **负债和股东权益总计** | Total liabilities and shareholders’ equity | 364,980 | 359,241 | 应等于资产总计 |

### 现金流量表（appleCashFlow）

| 项目 | 英文科目 | FY2024 | FY2025 | 说明 |
| --- | --- | --- | --- | --- |
| 净利润 | Net income | 93,736 | 112,010 | 与利润表一致 |
| 折旧与摊销 | Depreciation and amortization | 11,445 | 11,698 | 非现金费用调整 |
| 股权激励费用 | Share-based compensation expense | 11,688 | 12,863 | 非现金费用调整 |
| 其他非现金调整 | Other | −2,266 | −89 | |
| 应收账款变动 | Accounts receivable, net | −3,788 | −6,682 | 沿用报表现金流符号 |
| 供应商非贸易应收款变动 | Vendor non-trade receivables | −1,356 | −347 | |
| 存货变动 | Inventories | −1,046 | 1,400 | |
| 其他资产变动 | Other current and non-current assets | −11,731 | −9,197 | |
| 应付账款变动 | Accounts payable | 6,020 | 902 | |
| 其他负债变动 | Other current and non-current liabilities | 15,552 | −11,076 | |
| **经营活动产生的现金** | Cash generated by operating activities | 118,254 | 111,482 | 上述经营项目之和 |
| 购买有价证券 | Purchases of marketable securities | −48,656 | −24,407 | |
| 有价证券到期收回 | Proceeds from maturities of marketable securities | 51,211 | 40,907 | |
| 出售有价证券收回 | Proceeds from sales of marketable securities | 11,135 | 12,890 | |
| 购置固定资产 | Payments for acquisition of property, plant and equipment | −9,447 | −12,715 | 资本开支为现金流出 |
| 其他投资活动 | Other | −1,308 | −1,480 | |
| **投资活动产生／（使用）的现金** | Cash generated by investing activities | 2,935 | 15,195 | 上述投资项目之和 |
| 股权奖励净结算相关税款 | Payments for taxes related to net share settlement of equity awards | −5,441 | −5,960 | |
| 支付股息及等价物 | Payments for dividends and dividend equivalents | −15,234 | −15,421 | |
| 回购普通股 | Repurchases of common stock | −94,949 | −90,711 | 理解权益变化不可忽略回购 |
| 发行长期债务所得 | Proceeds from issuance of term debt, net | 0 | 4,481 | |
| 偿还长期债务 | Repayments of term debt | −9,958 | −10,932 | |
| 商业票据净变动 | Proceeds from/(Repayments of) commercial paper, net | 3,960 | −2,032 | |
| 其他筹资活动 | Other | −361 | −111 | |
| **筹资活动使用的现金** | Cash used in financing activities | −121,983 | −120,686 | 上述筹资项目之和 |
| **现金净增加／（减少）** | Increase/(Decrease) in cash, cash equivalents, and restricted cash and cash equivalents | −794 | 5,991 | 经营＋投资＋筹资 |
| 期初现金及受限现金 | Cash, cash equivalents, and restricted cash and cash equivalents, beginning balances | 30,737 | 29,943 | |
| **期末现金及受限现金** | Cash, cash equivalents, and restricted cash and cash equivalents, ending balances | 29,943 | 35,934 | 与资产负债表现金及现金等价物一致 |

### 三表勾稽练习

网页与练习工作簿用 Excel 公式复算以下连接（对应实验 [../05-workspace-lessons/10-portfolio-dashboard.md](../05-workspace-lessons/10-portfolio-dashboard.md)）：

1. **净利润连接**：利润表净利润 = 现金流量表起点（FY2025：112,010）。
2. **期末现金连接**：经营＋投资＋筹资＋期初现金 = 期末现金（111,482＋15,195−120,686＋29,943＝35,934），且等于资产负债表现金及现金等价物。
3. **资产负债平衡**：资产总计 = 负债合计＋股东权益合计（359,241＝285,508＋73,733）。

学习提示：真实股东权益变化不能只用净利润和分红解释，还需结合回购（FY2025 −90,711）、股权激励与其他综合收益。

## 相关内容

- 模块总览与数据边界：[README.md](README.md)
- 另一篇真实案例：[retail-operations.md](retail-operations.md)
- 对应的看板实验：[../05-workspace-lessons/10-portfolio-dashboard.md](../05-workspace-lessons/10-portfolio-dashboard.md)
- 数据来源与许可：[../08-credits.md](../08-credits.md)

## ✅ 总结

- 单位先说清：本页所有金额都是 USD millions，来自 FY2025 Form 10-K，不要再二次换算，也不要用它替代完整年报与附注。
- 利润表链条可复算：416,161 − 220,960 = 195,201（毛利润），195,201 − 62,151 = 133,050（营业利润），再到 112,010（净利润）。
- 现金流量表三段相加 ＋ 期初现金 ＝ 期末现金：111,482＋15,195−120,686＋29,943＝35,934，与资产负债表现金一致。
- 资产负债平衡成立：359,241＝285,508＋73,733；用 IF＋ABS 写成公式，就能每次取数后自动复检。
- 权益变化不能只用净利润和分红解释，还要看回购（FY2025 −90,711）、股权激励与其他综合收益。
