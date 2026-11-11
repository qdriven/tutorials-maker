---
name: excel-tutorial-maker
description: 把任意 Excel 教程（Markdown/纯文本/网页正文）转成课程契约 courses/<id>.json，并按引擎能力矩阵生成交互动画课（Handsontable+HyperFormula / Univer / OnlyOffice）。当用户要求"把这篇 Excel 教程做成可交互课""生成 Excel 操作指南课""做一个 Excel 实机动画课"时使用。
---

# excel-tutorial-maker：任意 Excel 教程 → 实机交互动画课

## 输入与输出

- **输入**：教程文本（md / txt / 粘贴 / 网页正文）。必须能看出：主题、样例数据、公式、操作步骤。
- **输出**：`courses/<id>.json` 课程契约（**唯一事实源**，手写/手改），再由生成器（phase-4/5）产出 `apps/<id>/` 交互动画课。
- **同源双产物**：同一份契约交 [excel-desktop-recorder](../excel-desktop-recorder/SKILL.md) 出讲解视频——契约里不写任何单产物字段。

## 核心契约（摘要）

- **4 步指南**：每步四要素——单元格地址、菜单路径、公式原文、验收结果。详细 schema 见 [references/contract-schema.md](references/contract-schema.md)。
- **公式参数逐位说明**（`formulaArgs`）：公式每个位置的参数一句话说明，教程文字/字幕/练习提示同源渲染。
- **一句话总结/解释/收尾总结**（`summary`）：一句话说清作用（最简单的话）→ 解释（SQL 等价式最方便）→ 动画 → 结束再总结；课内开篇拍/收尾框与出片口播首尾段同源。
- **公式真写进单元格**，结果从单元格回读，禁止用动画假装计算结果。
- **数据/公式/验收三处一致**：契约 data、guide.formula、checks 必须互相对得上。

## 引擎选择（速查）

| 内容特征 | 引擎 | 备注 |
| --- | --- | --- |
| 基础公式/汇总/求和 | `handsontable` | 默认；轻，公式域有限 |
| 多表引用/更全函数 | `univer` | 中间档 |
| FILTER/XLOOKUP/原生透视/图表 | `onlyoffice` | 功能全，重 |

完整能力矩阵与边界（如 Handsontable 不支持哪些函数）见 [references/engine-matrix.md](references/engine-matrix.md)。

## 工作流程（4 步）

1. **解析教程**：提取主题、样例数据、公式、步骤 → 草拟契约骨架。
2. **定引擎与主题**：按能力矩阵选引擎；主题 `kimi`（格数同款）或 `green`（Excel 绿）。
3. **写契约** `courses/<id>.json`：对照 [examples/course.example.json](examples/course.example.json) 逐字段写。
4. **生成与验收**：跑生成器（`scripts/tutorial/`，phase-4/5 交付）→ 按下方清单验收动画课。

## 验收清单

- [ ] 4 步指南每步四要素齐全（地址/菜单/公式/验收）
- [ ] 公式参数逐位说明（formulaArgs）齐全，part 与公式原文对得上
- [ ] summary 三句齐全：一句话（最简单的话）/ 解释 / 收尾总结，都简短
- [ ] 公式与验收结果和教程原文一致
- [ ] 生成课可交互跑通，公式真算、结果真读
- [ ] 主题与动效符合 [references/motion-spec.md](references/motion-spec.md)（确定性可重放）

## 参考

- 契约 schema：[references/contract-schema.md](references/contract-schema.md)
- 引擎能力矩阵：[references/engine-matrix.md](references/engine-matrix.md)
- 动效规格：[references/motion-spec.md](references/motion-spec.md)
- 模板契约：[templates/README.md](templates/README.md)（task-03 交付）
