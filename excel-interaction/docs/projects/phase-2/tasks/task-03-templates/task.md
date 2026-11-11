# task-03 · 引擎模板规格（templates/ 三套）

## 做什么

定 `skill/excel-tutorial-maker/templates/` 的**模板契约**：lesson DOM 契约（guide 4 步、
结果区、表格区）、theme token、动画挂点、确定性约束，以及三个引擎模板
（handsontable / univer / onlyoffice）各自的能力边界与生成后目录形态。

## 功能定义

- `templates/README.md` —— 模板契约总述（DOM 结构、step 状态机、theme token、
  动画挂点、确定性规则）——生成器与模板实现共同遵守的接口。
- `templates/{handsontable,univer,onlyoffice}/README.md` —— 每引擎：能力边界、
  依赖形态、生成后 `apps/<id>/` 目录形态、引擎接线点。
- 模板**实现代码**随生成器（phase-4/5）联调落地——本 task 交付契约与规格
  （契约先行，与 build-method 一致）。

## 验证点

1. templates/ 四件文档齐全（总契约 + 三引擎）。
2. 引擎能力边界与 task-01 的 engine-matrix.md 一致（引擎清单、边界口径不打架）。
3. 总契约覆盖：4 步指南 DOM、theme token、动画挂点、确定性约束四要素。

## 前置与依赖

- task-01（engine-matrix 是本 task 的一致性基准）。

## 范围外

- 模板实现代码（phase-5 联调）；主题 CSS 具体实现（phase-5）。
