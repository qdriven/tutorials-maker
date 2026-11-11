# Phase 3 · 契约层

## 这个 phase 做什么

立 `courses/` 契约层：试点课 `courses/<id>.json`（4 步指南——单元格地址 + 菜单路径 +
公式原文 + 验收结果）+ 原始教程文本入 `courses/seeds/`；引擎按能力矩阵选型
（公式/汇总 → Handsontable+HyperFormula；动态数组/多表 → Univer；FILTER/XLOOKUP/原生透视 → OnlyOffice）。

对齐 [build-checklist 阶段 3 · 契约层](../../../../excel-animation/docs/build-checklist.md)。

## tasks/

| task | 做什么 | 状态 |
| --- | --- | --- |
| [task-01-pilot-seed](tasks/task-01-pilot-seed/) | 试点课选定（VLOOKUP 查找课）与 seed 教程入库 | ✅ |
| [task-02-pilot-contract](tasks/task-02-pilot-contract/) | 试点契约 courses/vlookup-basic.json + 登记 | ✅ |
| [task-03-sum-course](tasks/task-03-sum-course/) | 第二门课 SUM（契约通用性验证） | ✅ |

每个 task 目录三件套：`task.md`（做什么/功能/验证点）、`verify.md`（验证记录）、`output.md`（交接）。
构建方式见 [build-method.md](../../build-method.md)。
