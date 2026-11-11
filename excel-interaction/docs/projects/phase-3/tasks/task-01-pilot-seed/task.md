# task-01 · 试点课选定与 seed 入库

## 做什么

选定 phase-3 试点课（build-checklist 建议**公式密集型**，如查找函数课——一次检验
引擎边界/TTS/字幕三个风险点），并把原始教程文本写入 `courses/seeds/`。

## 功能定义

- **选题**：VLOOKUP 查找匹配课（公式密集；VLOOKUP 在 handsontable/HyperFormula
  域内，正面检验 engine-matrix 的"函数域实测"主张；单表设计避开跨表冻结区）。
- **seed 教程文本** `courses/seeds/vlookup-basic.md`：主题、样例数据（员工表）、
  公式、操作步骤俱全的真实教程体文本（契约的来源原文，只读参考）。
- **选型分析留档**：为什么选这题、引擎为什么 handsontable、XLOOKUP 边界如何处理
  （进 verify/output）。

## 验证点

1. seed 文本四要素可提取（主题 / 数据 / 公式 / 步骤逐项能从文中指出）。
2. 公式函数在 handsontable 域内（VLOOKUP ∈ HyperFormula 函数表，engine-matrix ✅ 行）；
   跨表引用 0 处（避开 handsontable ⚠️ 区）。

## 前置与依赖

- phase-2 task-01（engine-matrix 是选型依据）；courses/seeds/ 目录（phase-1 就位）。

## 范围外

- 契约 JSON 编写（task-02）。
