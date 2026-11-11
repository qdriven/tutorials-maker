# task-01 · output（产出交接）

## 什么功能完成了

**试点课选定（VLOOKUP 查找匹配课）+ 原始教程文本入库**：`courses/seeds/vlookup-basic.md`
——含主题、员工表样例数据、核心公式、4 步操作步骤、常见错误与进阶提示的完整教程体
文本，是试点契约的唯一来源原文。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `courses/seeds/vlookup-basic.md` | 试点 seed：VLOOKUP 按工号查姓名（单表员工表设计） |

## 要点（hand-off 给 task-02）

1. **为什么选这题**：公式密集（build-checklist 建议的查找函数课）；VLOOKUP 正面检验
   handsontable/HyperFormula 函数域主张；TTS/字幕风险点在 phase-6 一并检验。
2. **引擎判定**：handsontable——VLOOKUP 在域内 ✅、全单表 0 跨表引用（避开 ⚠️/冻结区）。
3. **XLOOKUP 边界故事**：seed 进阶提示提及 XLOOKUP，但契约**取 VLOOKUP 路线**；
   将来若做 XLOOKUP 课，按 engine-matrix 规则 1 直接定 onlyoffice。
4. **数据定稿**（契约 data 直接取此）：员工表 A1:E5——工号/姓名/部门/查询工号/查询姓名；
   D2=1003，期望 E2=`VLOOKUP(D2,A2:B5,2,0)` → 王五。
5. **步骤定稿**：选中 E2 → 输入公式 → 回车确认 → 复核（编辑栏核对 + D2 改 1001 联动张三）。

## 下游接线

- task-02：从本 seed 提炼 `courses/vlookup-basic.json` 契约（4 步指南四要素）。
- phase-5/6：试点出课与出片都用这课。
