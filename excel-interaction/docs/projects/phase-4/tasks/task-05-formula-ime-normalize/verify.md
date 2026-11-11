# task-05 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

取证工具：[drive-ime.py](drive-ime.py)（Playwright 真键盘输入全角字符）；
截图 [shots/](shots/)；机器可读结果 [result.json](result.json)。全绿 JSON（要点摘录）：

```json
{"A_editor_live": "=SUM(123,456)", "A_value": 579,
 "B_editor_live": "=VLOOKUP(D2,A2:B5,2,0)", "B_value": "王五",
 "C_editor_live": "销售部，市场部", "C_value": "销售部，市场部",
 "D_editor_live": "=\"价格，单位\"", "D_value": "价格，单位",
 "E_formula": "=SUM(1,2)", "E_value": 3,
 "regression_caption": "✓ 验收通过：E2 显示 王五，公式真算真回读，与契约一致",
 "console_errors": []}
```

## 验证点 1 · 全角公式输入自动转换并真算

- **命令**：双击 E3 输入 `＝SUM（１２３，４５６）`（IME 全角），回车；再对 E2 输
  `＝VLOOKUP（D2，A2:B5，2，0）`。
- **实际输出**：输入过程实时回读编辑框 `=SUM(123,456)`（shots/ime-live-conversion.png
  画面同步确认）→ 回车后 `readValue('E3')=579`（123+456 真算）；VLOOKUP 路线
  `=VLOOKUP(D2,A2:B5,2,0)` → `readValue('E2')=王五`。
- **结论**：**PASS**（输入即转、提交即算）

## 验证点 2 · 文本格保真

- **证据**：B2 输 `销售部，市场部` → 编辑框原样（全角逗号未转）→ 提交后回读
  `销售部，市场部`（shots/ime-text-preserved.png）。
- **结论**：**PASS**（不以 = 开头的值完全不转换）

## 验证点 3 · 字面量保真

- **证据**：输 `＝＂价格，单位＂` → 编辑框 `="价格，单位"`（引号转半角、引号内
  全角逗号保留，shots/ime-literal-quote.png）→ 回车后回读 `价格，单位`。
- **结论**：**PASS**（引号内字面量保真口径成立）

## 验证点 4 · 提交路径兜底

- **证据**：`Engine.setFormula('E5', '＝SUM（１，２）')` 直接喂全角 →
  `getFormula('E5')='=SUM(1,2)'`、`readValue('E5')=3`。
- **结论**：**PASS**（自动化/练习路径同样被兜住）

## 验证点 5 · 回归

- **证据**：练习验收 `✓ …公式真算真回读，与契约一致`；`console_errors: []`；
  确定性 grep（Math.random/setInterval/Date.now 字面量）3/3 干净。
- **结论**：**PASS**

## 过程记录

实现一次成型，6 项验证首跑全绿（无 FAIL 记录）。
