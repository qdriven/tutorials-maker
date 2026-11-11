# task-02 · 试点契约编写（courses/vlookup-basic.json）

## 做什么

按 excel-tutorial-maker 的契约 schema 从 seed 教程提炼试点契约
`courses/vlookup-basic.json`，并在 `courses/README.md` 登记。

## 功能定义

- **契约** `courses/vlookup-basic.json`：4 步指南每步四要素（cell/menu/formula/expect）、
  data（员工表样例）、checks（验收）、narration（brief 节奏）；引擎 handsontable、
  主题 kimi（与示例 green 互补，两套 token 各有真实用例）。
- **登记**：courses/README.md 增加契约清单（id / 主题 / 引擎 / seed 对应）。
- **一致性**：data / guide.formula / checks 三处互相对得上；与 seed 教程内容一致。

## 验证点

1. JSON 可解析；4 步指南无空字段（cell/menu/formula/expect 全非空）。
2. 三处一致：checks 的公式=guide 的公式，checks 的 value 与 data 可算出的结果一致
   （脚本实算 1200+…类比对，数字说话）。
3. 引擎选型合规：VLOOKUP ∈ handsontable 能力行、无跨表引用（对照 engine-matrix）。

## 前置与依赖

- task-01（seed 是契约来源）；phase-2 契约 schema（字段语义基准）。

## 范围外

- build-plan.mjs 消费验证（阶段 5 真跑，build-checklist 明示）；
- 生成器/模板实现（phase-4/5）。
