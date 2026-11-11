# 03 · 查找与公式实验

> 五个函数对应五种动作：求和、计数、判断、提取、清理；每个动作配一份真实可跑的数据。

来源：`src/data/course.ts` 中的 `functionLessons`，以及 `src/sections/LookupLab.tsx` 的 VLOOKUP／XLOOKUP 对比实验。函数不是语法清单，而是五种动作：求和、计数、判断、提取、清理。统一示例表：A 订单号、B 日期、C 地区、D 渠道、E SKU、F 类别、G 销售额。

| 函数 | 动作 | 文档 |
| --- | --- | --- |
| SUMIFS | 按多个条件求和 | [sumifs.md](sumifs.md) |
| COUNTIFS | 按多个条件计数 | [countifs.md](countifs.md) |
| IF | 按判断返回标记 | [if.md](if.md) |
| FILTER | 动态提取匹配行 | [filter.md](filter.md) |
| TRIM＋CLEAN | 清理不可见字符 | [trim-clean.md](trim-clean.md) |

查找专题：[lookup-vlookup-xlookup.md](lookup-vlookup-xlookup.md) —— 同一张商品表上做向右查、向左查与缺失值实验，并对比 VLOOKUP 与 XLOOKUP 的差异。

在在线实验台里动手练习：[../05-workspace-lessons/03-alex-lookup.md](../05-workspace-lessons/03-alex-lookup.md)（查找）、[../05-workspace-lessons/05-rohan-questions.md](../05-workspace-lessons/05-rohan-questions.md)（SUMIFS／COUNTIFS）、[../05-workspace-lessons/12-dynamic-arrays.md](../05-workspace-lessons/12-dynamic-arrays.md)（FILTER／UNIQUE／SORT）。

## 🎯 本课重点

- **重点用什么**：五类函数的参数骨架——SUMIFS／COUNTIFS 的「区域, 条件」成对参数、IF 的「判断, 真值, 假值」三段结构、FILTER 的「数据区, 条件, 未匹配值」、TRIM＋CLEAN 的嵌套顺序，再加 XLOOKUP 的第 4 参数。
- **完成什么**：每个函数都在配套数据上跑出可复核的数字——华东＋线上 ¥1,760、华北大额 1 笔、KPI 达成率 0.92、FILTER 溢出 3 行、清洗后华东 3 笔。

## 📦 配套数据

| 文档 | 工作表 / 数据 | 文件 | 规模 | 用途 |
| --- | --- | --- | --- | --- |
| [sumifs.md](sumifs.md)、[countifs.md](countifs.md) | 订单 | [orders.csv](../data/lessons/rohan-questions/orders.csv) | 8 行 × 5 列 | 条件汇总与计数的明细数据（数据区 `A2:E9`） |
| [sumifs.md](sumifs.md)、[countifs.md](countifs.md) | 问题清单 | [practice.csv](../data/lessons/rohan-questions/practice.csv) | 3 行 × 2 列 | 记录华东销售额／订单数／平均订单额 |
| [filter.md](filter.md) | 订单 | [orders.csv](../data/lessons/dynamic-arrays/orders.csv) | 6 行 × 3 列 | 动态提取的明细数据（数据区 `A2:C7`） |
| [filter.md](filter.md) | 动态结果 | [practice.csv](../data/lessons/dynamic-arrays/practice.csv) | 3 行 × 2 列 | 记录筛选／去重／排序三类结果 |
| [if.md](if.md) | 经营看板 | [dashboard.csv](../data/lessons/kpi-format/dashboard.csv) | 3 行 × 5 列 | KPI 达成率与预警等级（数据区 `A2:E4`） |
| [trim-clean.md](trim-clean.md) | 订单 | [orders.csv](../data/lessons/dave-clean/orders.csv) | 8 行 × 5 列 | 含首尾空格与重复订单号的脏数据（数据区 `A2:E9`） |
| [trim-clean.md](trim-clean.md) | 清洗任务 | [practice.csv](../data/lessons/dave-clean/practice.csv) | 3 行 × 2 列 | 记录清理、查重与复核结果 |
| [lookup-vlookup-xlookup.md](lookup-vlookup-xlookup.md) | 商品表 | [products.csv](../data/lessons/alex-lookup/products.csv) | 5 行 × 5 列 | 查找用的主数据（数据区 `A2:E6`） |
| [lookup-vlookup-xlookup.md](lookup-vlookup-xlookup.md) | 查询练习 | [practice.csv](../data/lessons/alex-lookup/practice.csv) | 3 行 × 2 列 | 记录三道查找题的答案 |

数据说明：原文统一示例表为 7 列（A 订单号、B 日期、C 地区、D 渠道、E SKU、F 类别、G 销售额），各课配套的数据文件按该用例的真实列给出（订单表 5 列、动态数组订单表 3 列、KPI 看板 5 列、商品表 5 列），公式与单元格地址以配套数据文件为准，原课程公式保留在各课的说明里。

## 🧱 基础操作

1. 先把业务问题写成一句可复算的话（“华东＋线上卖了多少”），再挑函数。
2. 用到的每个条件区域要和求和区域同高，行数一致才不出错。
3. 文本条件加引号（`"华东"`），比较条件写成字符串（`">=1000"`）。
4. 公式向下填充前先用 `$` 锁定区域，避免条件区域跟着跑偏。
5. 出错先想容错：XLOOKUP 第 4 参数、IFERROR、FILTER 的未匹配返回值。
6. 每个函数都要留一个能复核的结果（对总数、对手工筛选），不然没法确认公式是对的。

## 🛠 实战操作

建议按“查找 → 汇总 → 判断 → 提取 → 清理”的顺序做一遍，每一步都有确定答案可对：

| 顺序 | 文档 | 动手做的事 | 预期结果 |
| --- | --- | --- | --- |
| 1 | [lookup-vlookup-xlookup.md](lookup-vlookup-xlookup.md) | 向右查、向左查、缺失值三题 | 精品茶／P-101／未匹配；练习题 咖啡豆、150、未匹配 |
| 2 | [sumifs.md](sumifs.md) | 用 SUMIFS 算华东＋线上，再改成只要华东 | ¥1,760；¥2,000 |
| 3 | [countifs.md](countifs.md) | 数华北大额订单，再查订单号是否重复 | 1 笔；SO-1004 出现 2 次 |
| 4 | [if.md](if.md) | 算达成率并给看板分层预警 | 0.92 → 预警；1.2 → 双达标；高于上限 |
| 5 | [filter.md](filter.md) | 用 FILTER 提取大额订单，再叠加地区条件 | 3 行（首条 SO-003）→ 2 行（SO-003、SO-006） |
| 6 | [trim-clean.md](trim-clean.md) | 清理文本、查重、复核记录 | 华东；TRUE；800 |

## 相关内容

- 查找实操用例：[../05-workspace-lessons/03-alex-lookup.md](../05-workspace-lessons/03-alex-lookup.md)、[../05-workspace-lessons/11-two-way-lookup.md](../05-workspace-lessons/11-two-way-lookup.md)
- 条件汇总实操：[../05-workspace-lessons/05-rohan-questions.md](../05-workspace-lessons/05-rohan-questions.md)
- 动态数组三件套：[../05-workspace-lessons/12-dynamic-arrays.md](../05-workspace-lessons/12-dynamic-arrays.md)
- 分层预警实操：[../05-workspace-lessons/14-kpi-format.md](../05-workspace-lessons/14-kpi-format.md)
- 清洗流程用例：[../05-workspace-lessons/04-dave-clean.md](../05-workspace-lessons/04-dave-clean.md)、[../05-workspace-lessons/15-dirty-data.md](../05-workspace-lessons/15-dirty-data.md)
- 返回目录：[../README.md](../README.md)

## ✅ 总结

- 五个函数对应五种动作：求和、计数、判断、提取、清理；先拆问题，再选函数。
- 参数骨架记住三句：条件成对、IF 三段、FILTER 三参数。
- 每个函数都要能落到一个具体数字上：¥1,760、1 笔、0.92、3 行、3 笔。
- 数据是前提：空格和重复订单会让汇总失真，先清洗再统计。
- 每个用例都有配套 CSV 与练习表，做完可以直接对答案。
