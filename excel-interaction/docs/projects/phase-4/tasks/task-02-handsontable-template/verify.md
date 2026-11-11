# task-02 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

## 验证点 1 · HyperFormula 真算（node 实测）

- **命令**：`node --input-type=module -e "…HyperFormula…setCellContents('=VLOOKUP(D2,A2:B5,2,0)')…getCellValue…"`（vlookup-basic 数据）
- **实际输出**：
  ```
  VLOOKUP(D2=1003,A2:B5,2,0) = "王五" | formula = "=VLOOKUP(D2,A2:B5,2,0)" | PASS
  ```
- **结论**：**PASS**（公式真算 = 王五，与契约 checks.value 一致；数字说话）。
  该输出同时暴露第一个 bug 线索：**HF 的 getCellFormula 自带 `=` 前缀**
  → engine.js getFormula 又拼 `=` 产生 `==VLOOKUP(...)`，练习验收判负
  （详见 task-03 verify；已在 engine.js 修复）。

## 验证点 2 · DOM 契约齐全

- **命令**：node 脚本核 index.html 关键标记 + engine.js 挂点
- **实际输出**：
  ```
  id="table-area" PASS / id="result-area" PASS / id="guide-panel" PASS
  id="caption-bar" PASS / data-theme PASS / data-engine PASS
  data-cell 挂点(engine.js): PASS
  ```
- **结论**：**PASS**（三区一卡 + data-theme/data-engine + data-cell 动画挂点全就位）

## 验证点 3 · 确定性静态检查

- **命令**：node 脚本查 lesson.js 是否含随机/周期定时器/墙钟令牌
- **实际输出**：
  ```
  首轮：无 Math.random FAIL / 无 setInterval FAIL / 无 Date.now PASS
  （命中的是文件头注释里"禁 Math.random / 禁 setInterval"字面量；代码本体干净）
  改注释措辞后复验：
  无 Math.random: PASS / 无 setInterval: PASS / 无 Date.now: PASS
  ```
- **结论**：**PASS**（typeIn 用递归 setTimeout，可被 clearTimers 打断；动效全部有限时长）

## 附：浏览器实测暴露的第二个 bug（修复留档）

- Handsontable 构造传 `licenseKey: "gpl-v3"` → 表格区渲染成
  **"The license key for Handsontable is invalid."** 错误框（task-03 截图首轮可见）。
  逆包查校验逻辑：HT 认 `non-commercial-and-evaluation`（或商用 key），
  `gpl-v3` 是 **HyperFormula** 的钥匙。修复：HT 用 `non-commercial-and-evaluation`、
  HF 保留 `gpl-v3`，两把钥匙各归其位（engine.js 注释已写明）。

## 总结

3/3 PASS（含 2 个 bug 的发现-修复记录；修复后由 task-03 浏览器复验闭环）。
