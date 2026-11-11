# task-01 · 教程生成技能（excel-tutorial-maker）

## 做什么

建设**教程生成技能**：`skill/excel-tutorial-maker/`——SKILL.md（≤5K 入口契约）+
`references/`（深知识按需加载）+ `examples/`（示例课程契约）。把任意 Excel 教程
转成课程契约并指向交互动画课的生成。

## 功能定义

- **SKILL.md**：技能入口——输入/输出、核心契约摘要、引擎速查、4 步工作流程、验收清单。
  **体积 ≤5K**（P0 教训：旧域 44.5K SKILL.md 触发即全量进上下文，progressive disclosure）。
- **references/**（三件）：
  - `contract-schema.md` —— 课程契约 schema（4 步指南四要素、数据、公式、验收、主题 token）
  - `engine-matrix.md` —— 三引擎能力矩阵与选择规则（含 Handsontable 公式边界）
  - `motion-spec.md` —— 动效规格（确定性可重放、单步时长、禁随机/无限循环）
- **examples/course.example.json** —— 一份可解析的完整示例契约（4 步指南齐四要素）。

## 验证点

1. SKILL.md ≤5K（wc -c 实测）。
2. references 三件齐全，且都被 SKILL.md 以相对链接引用、链接可达。
3. `examples/course.example.json` JSON 解析通过，4 步指南每步含四要素字段。

## 前置与依赖

- task-01（phase-1 目录骨架，skill/ 已就位）。

## 范围外

- 生成器实现（new.mjs，phase-4/5）；引擎模板代码（task-03 定规格，实现随 phase-5 联调）。
