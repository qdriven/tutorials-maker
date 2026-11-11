# task-04 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

取证工具：[drive-interactions.py](drive-interactions.py)（Playwright 真鼠标/键盘）；
截图 [shots/](shots/)；机器可读结果 [result.json](result.json)。最终全绿 JSON：

```json
{"echo_click_B2": "张三", "echo_click_E2": "=VLOOKUP(D2,A2:B5,2,0)",
 "selection": ["A2", "B5"], "fill_handle_visible": true,
 "editor_after_type": "=SUM(", "editor_after_range": "=SUM(A2:B5",
 "editor_after_click": "=SUM(A2:B5D2",
 "suggest_visible": true, "suggest_items": ["VLOOKUP"], "editor_after_tab": "=VLOOKUP(",
 "practice_caption": "✓ 验收通过：E2 显示 王五，公式真算真回读，与契约一致",
 "console_errors": []}
```

## 验证点 1 · 公式栏随选中联动

- **证据**：点 B2（字面值格）→ fx 显示 `张三`；点 E2（公式格）→ fx 显示
  `=VLOOKUP(D2,A2:B5,2,0)`（shots/formula-bar-link.png）。
- **结论**：**PASS**（公式原样、字面值原样，Excel 公式栏语义）

## 验证点 2 · 范围拖选 + 填充柄

- **证据**：真鼠标拖 A2→B5 → `Engine.getSelection() = ["A2","B5"]`；
  填充柄元素可见（fill_handle_visible=true，shots/range-select.png）。
- **结论**：**PASS**

## 验证点 3 · 编辑公式时点选插引用（point mode）

- **证据**：双击 E2 编辑、Ctrl+A 后输入 `=SUM(`（editor_after_type）→ 拖选 A2:B5 →
  编辑框变 `=SUM(A2:B5`（shots/point-mode.png）→ 单击 D2 → 追加 `D2`
  （`=SUM(A2:B5D2`）。全程编辑不中断。
- **结论**：**PASS**（拖选插范围、单击插单元格，两种引用都插到光标处）

## 验证点 4 · 函数建议弹层

- **证据**：编辑中输入 `=VL` → 弹层可见且含 `VLOOKUP`（suggest_items，
  shots/intellisense.png）→ Tab → 编辑框变 `=VLOOKUP(`。
- **结论**：**PASS**（前缀过滤 + Tab 插入 `FUNC(`；函数表 418 项来自 HyperFormula）

## 验证点 5 · 回归

- **证据**：练习模式输入 `=VLOOKUP(D2,A2:B5,2,0)` → `✓ 验收通过…公式真算真回读`；
  `console_errors: []`；确定性 grep（随机/周期定时器/墙钟）3/3 PASS。
- **结论**：**PASS**

## 过程中发现并修复的 3 个 bug（FAIL→修复→复验 PASS）

1. **assist 加载即崩**：`HyperFormula.getRegisteredFunctionNames()` 必须传语言码，
   少参抛 ExpectedValueOfType → 整个 formula-assist 加载失败（点选/弹层全死、
   误判为"HT 不支持"）。
2. **去选抛错炸断事件链**：HT `afterSelectionEnd` 以 (-1,-1) 触发去选 → `toA1(-1,-1)`
   拼出 `'0'` → parseAddr 抛错 ×9（抓栈定位），连锁破坏 dblclick 开编辑。
3. **函数表取数顺序**：HT formulas 插件装配时已注册 enGB 语言，脚本再
   `registerLanguage` 必抛 "already registered" → try/catch 吞掉后函数表恒空、弹层
   不出；改为「先取、取不到再注册」双保险后 418 项就位。
   另：HT **没有 `afterFinishEditing` 钩子**（editing 标志卡死会劫持后续 dblclick）——
   编辑态改以 `getActiveEditor().isOpened()` 权威判断。

## 总结

验收四点 + 回归 5/5 PASS；3 bug 修复闭环（抓栈/探针/截图三管齐下定位）。
