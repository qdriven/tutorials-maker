# 引擎能力矩阵与选择规则

三引擎：`handsontable`（Handsontable + HyperFormula）、`univer`、`onlyoffice`。
选错引擎 = 教程做不出来或假实现，**先查矩阵再写契约**。

## 能力矩阵

| 能力 | handsontable | univer | onlyoffice |
| --- | --- | --- | --- |
| 基础四则/求和（SUM/AVERAGE/MIN/MAX） | ✅ | ✅ | ✅ |
| IF / VLOOKUP / INDEX-MATCH | ✅（HyperFormula 域内） | ✅ | ✅ |
| 多工作表引用（Sheet2!A1） | ⚠️ 有限 | ✅ | ✅ |
| 动态数组（SORT/UNIQUE/SEQUENCE） | ❌ | ⚠️ 部分 | ✅ |
| FILTER / XLOOKUP | ❌ | ❌ | ✅（onlyoffice-only） |
| 原生数据透视 | ❌ | ❌ | ✅ |
| 原生图表 | ❌ | ⚠️ 有限 | ✅ |
| 依赖体积 / 启动 | 轻（vendored js） | 中（npm） | 重（npm，SDK 大） |
| 部署形态 | 纯前端单页 | 前端应用 | 前端应用 |

⚠️ = 有条件可用，写契约前先做最小复现验证；❌ = 别选，换引擎。

## 选择规则（按序命中）

1. 教程用到 **FILTER / XLOOKUP / 透视 / 图表** → `onlyoffice`，无条件。
2. 教程是 **多工作表引用 / 动态数组** → `univer`；若含 1 中函数 → `onlyoffice`。
3. 其余（单表基础公式、汇总、格式）→ `handsontable`（默认）。

## 边界口径（历史教训）

- **Handsontable 公式域 = HyperFormula**：不在 HyperFormula 函数表里的函数一律视为 ❌，
  不要"应该支持"式猜测——写契约前用最小样本实测。
- **跨表 SUM 是已知冻结问题**（旧域结论：先停止修改）：handsontable 引擎下涉及
  跨表求和的教程直接归 `univer`/`onlyoffice`，不要在 handsontable 上做变通实现。
- 引擎判定只看**教程内容需要什么能力**，不看"哪个实现好看"。

## 一致性锚点

引擎清单（3 个）与能力口径以本文件为准；[templates/](../templates/README.md) 三引擎
README 与之对齐（task-03 验证点之一）。
