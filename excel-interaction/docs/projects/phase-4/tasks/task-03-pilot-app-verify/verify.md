# task-03 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

取证工具：[drive.py](drive.py)（Playwright 驱动，确定性逐拍 `Lesson.gotoStep`）；
截图在 [shots/](shots/)；机器可读结果 [result.json](result.json)。
最终复验 JSON（两处 bug 修复后）：

```json
{"readValue_E2": "王五", "getFormula_E2": "=VLOOKUP(D2,A2:B5,2,0)",
 "practice_caption": "✓ 验收通过：E2 显示 王五，公式真算真回读，与契约一致",
 "practice_debug": {"f": "=VLOOKUP(D2,A2:B5,2,0)", "v": "王五"},
 "console_errors": []}
```

## 验收点 1 · 4 步指南与画面对齐

- **证据**：shots/step1–4.png 逐拍截图——每拍指南卡当前步高亮（data-step 契约挂点）、
  讲解卡四要素全文、画面动作对应（step1 焦点 E2 / step2 公式栏 typeIn 完成 /
  step3 E2 显示 王五 / step4 编辑栏回显公式）。
- **结论**：**PASS**（人眼核 4 张截图，卡/讲解/画面三方一致）

## 验收点 2 · 公式真算真回读

- **证据**：result.json——`readValue_E2 = "王五"`（HF 真算）；`getFormula_E2 =
  "=VLOOKUP(D2,A2:B5,2,0)"`（真回读，单 `=`）；手动练习输入公式后 caption
  「✓ 验收通过：…公式真算真回读，与契约一致」（shots/practice-pass.png）。
- **结论**：**PASS**（算=王五、读回公式原文、练习模式值+公式双比对通过）

## 验收点 3 · 动效完整

- **证据**：step1→4→done 截图序列完整走到 ✓ 验收通过（shots/step-done.png）；
  `console_errors: []`（全程无 JS 报错）；确定性静态检查见 task-02 verify。
- **结论**：**PASS**（4 步动效走完无卡死；状态机可 gotoStep 任意重放）

## 验收点 4 · 主题符合

- **证据**：shots/step3.png（kimi：纸白底/橙红强调）与 shots/theme-green.png
  （`?theme=green`：浅灰白底/品牌绿强调）——同一课两套 token 全页截图对照。
- **结论**：**PASS**（双主题渲染正确，契约 theme + URL 覆盖均生效）

## 过程中发现并修复的 2 个 bug（FAIL→修复→复验 PASS）

1. **`==VLOOKUP` 双等号**（练习验收判负）：HF getCellFormula 自带 `=`，engine.js 又拼一个
   → 首轮 practice_caption 为「✗ 未通过…公式 ==VLOOKUP(...)」；修复 getFormula 原样回读。
2. **HT license 错误框**：licenseKey 误用 HF 的 `gpl-v3` → 表格区渲染 "license key is
   invalid"（首轮截图可见）；修复为 HT `non-commercial-and-evaluation` + HF `gpl-v3`。
   修复靠**看截图**发现——CLI 数据全绿但画面是错误框，视觉取证不可省。

## 总结

验收四点 4/4 PASS + 2 bug 修复闭环（首轮 ✗/错误框 → 复验全绿 + 截图为证）。
