# VLOOKUP 对比 XLOOKUP：向右查、向左查与缺失值

> 同一张商品表上做三种查找实验，把 VLOOKUP 与 XLOOKUP 的参数差异一次看清。

来源：`src/sections/LookupLab.tsx`（查找实验）。同一张商品表，分别尝试向右查、向左查和缺失值处理。公式、结果与限制同时呈现。参考：[Microsoft XLOOKUP 文档](https://support.microsoft.com/en-us/excel/functions/xlookup-function)。

## 🎯 本课重点

- **重点用什么**：XLOOKUP 的第 4 参数直接写未匹配时的返回值（“未匹配”）；VLOOKUP 的第 3 参数是列序号，精确匹配要显式写 FALSE，找不到时靠 IFERROR 包裹；XLOOKUP 的查找数组与返回数组彼此独立，所以能向左查。
- **完成什么**：查出 P-103 的商品名“咖啡豆”、P-104 的单价 150，并在编码 P-999 不存在时显示“未匹配”而不是 `#N/A`。

## 📦 配套数据

| 工作表 / 数据 | 文件 | 规模 | 用途 |
| --- | --- | --- | --- |
| 商品表 | [products.csv](../data/lessons/alex-lookup/products.csv) | 5 行 × 5 列 | 查找用的主数据（数据区 `A2:E6`） |
| 查询练习 | [practice.csv](../data/lessons/alex-lookup/practice.csv) | 3 行 × 2 列 | 记录三道查找题的答案 |

数据说明：商品表（与 [../01-learning-path/README.md](../01-learning-path/README.md) 相同）：A SKU、B 商品、C 类别、D 单价、E 库存，数据区 `A2:E6`。商品主数据为明确标注的教学模型，用于练习函数参数。

## 🧱 基础操作

1. VLOOKUP 语法：`=VLOOKUP(查找值, table_array, 列序号, [匹配方式])`。查找值必须位于 `table_array` 的第一列，否则查不到。
2. 精确匹配要显式写 FALSE（第 4 参数）；不写会走近似匹配，可能返回一个“看起来合理”却错误的结果。
3. XLOOKUP 语法：`=XLOOKUP(查找值, 查找数组, 返回数组, [未匹配值], [匹配模式], [搜索方式])`，第 4 参数就是“查不到时返回什么”。
4. VLOOKUP 只能向右查；XLOOKUP 的查找数组与返回数组可以各自指定，因此天然支持向左查。
5. 列位置变化时 VLOOKUP 的列序号要跟着维护；XLOOKUP 不依赖返回列的序号。
6. 错误处理属于分析口径：未匹配、空字符串和 0 的含义不同，不要一律替换成 0。

## 🛠 实战操作

三个查找场景（同一张商品表）：

| 场景 | 查找值 | VLOOKUP 公式 → 结果 | XLOOKUP 公式 → 结果 |
| --- | --- | --- | --- |
| 向右查 | `P-102` | `=VLOOKUP("P-102",$A$2:$D$6,2,FALSE)` → 精品茶 | `=XLOOKUP("P-102",$A$2:$A$6,$B$2:$B$6,"未匹配")` → 精品茶 |
| 向左查 | `冷萃咖啡` | `=VLOOKUP("冷萃咖啡",$A$2:$E$6,1,FALSE)` → `#N/A`（无法直接向左查） | `=XLOOKUP("冷萃咖啡",$B$2:$B$6,$A$2:$A$6,"未匹配")` → P-101 |
| 缺失值 | `P-999` | `=IFERROR(VLOOKUP("P-999",$A$2:$D$6,2,FALSE),"未匹配")` → 未匹配（借助 IFERROR） | `=XLOOKUP("P-999",$A$2:$A$6,$B$2:$B$6,"未匹配")` → 未匹配（第 4 参数） |

说明：

- 向右查：两者都能完成。VLOOKUP 的第 3 参数是列序号，精确匹配要显式写 FALSE。
- 向左查：VLOOKUP 只从 table_array 的第一列查找；XLOOKUP 的查找数组与返回数组可以彼此独立。
- 缺失值：错误处理也属于分析口径：未匹配、空字符串和 0 的含义不同，不要一律替换成 0。

在配套的查询练习表里逐题落地（三行练习题见 [practice.csv](../data/lessons/alex-lookup/practice.csv)）：

| 单元格 | 题目 | 公式 | 预期结果 |
| --- | --- | --- | --- |
| 查询练习 B2 | P-103 的商品名 | `=XLOOKUP("P-103",商品表!$A$2:$A$6,商品表!$B$2:$B$6,"未匹配")` | 咖啡豆 |
| 查询练习 B3 | P-104 的单价 | `=VLOOKUP("P-104",商品表!$A$2:$E$6,4,FALSE)` | 150 |
| 查询练习 B4 | P-999 的库存 | `=XLOOKUP("P-999",商品表!$A$2:$A$6,商品表!$E$2:$E$6,"未匹配")` | 未匹配 |

注意 B3：商品表共 5 列，单价在第 4 列，所以列序号写 4；精确匹配要写 FALSE。

### VLOOKUP 与 XLOOKUP 关键区别

| 比较点 | VLOOKUP | XLOOKUP |
| --- | --- | --- |
| 精确匹配 | 用 FALSE 显式指定 | 默认精确匹配 |
| 向左查找 | 不直接支持 | 支持 |
| 未找到处理 | 常配合 IFERROR | 第 4 参数直接指定 |
| 返回多列 | 通常需要多个公式或其他技巧 | 返回数组可一次溢出多列 |
| 列位置变化 | 列序号可能需要维护 | 不依赖返回列序号 |

## 相关内容

- 查找实操用例：[../05-workspace-lessons/03-alex-lookup.md](../05-workspace-lessons/03-alex-lookup.md)、[../05-workspace-lessons/11-two-way-lookup.md](../05-workspace-lessons/11-two-way-lookup.md)
- 5 个函数用例：[README.md](README.md)　返回公式实验：[sumifs.md](sumifs.md)

## ✅ 总结

- 查找函数的核心差别在参数：VLOOKUP 用“列序号”指定返回哪一列，XLOOKUP 用“返回数组”指定，两个数组可以独立。
- XLOOKUP 的第 4 参数就是未匹配时的返回值，本课统一写成“未匹配”，比把错误包成 0 更诚实。
- VLOOKUP 精确匹配必须显式写 FALSE，否则近似匹配会给出错误答案。
- 向左查与多列返回优先用 XLOOKUP；沿用 VLOOKUP 时用 IFERROR 兜底。
- 本课成果：P-103 → 咖啡豆、P-104 → 150、P-999 → 未匹配，三题全部可复核。
