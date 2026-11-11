# task-01 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

## 验证点 1 · seed 文本四要素可提取

- **命令**：node 脚本对 `courses/seeds/vlookup-basic.md` 逐项正则核对（主题/数据/公式/步骤）
- **实际输出**：
  ```
  1a 主题: PASS
  1b 数据: PASS
  1c 公式: PASS
  1d 步骤: PASS
  ```
- **结论**：**PASS**（主题段、员工表样例数据〔1003→王五〕、核心公式
  `=VLOOKUP(D2,A2:B5,2,0)`、4 步操作步骤〔选中→输入→确认→复核〕逐项可指出）

## 验证点 2 · 函数域合规、无跨表引用

- **命令**：node 脚本对照 engine-matrix.md 能力行 + seed 全文查 `Sheet!` 式跨表引用
- **实际输出**：
  ```
  2a VLOOKUP handsontable 行: PASS
  2b 跨表引用: 0 处 PASS
  ```
- **结论**：**PASS**（VLOOKUP ∈ handsontable「IF / VLOOKUP / INDEX-MATCH ✅」行；
  跨表引用 0 处，避开 handsontable ⚠️ 区与跨表 SUM 冻结区）

## 总结

2/2 PASS。选题决策留档：seed 进阶提示提及 XLOOKUP（onlyoffice-only），
契约取 VLOOKUP 路线留 handsontable——XLOOKUP 课若立项须直接定 onlyoffice
（engine-matrix 规则 1）。
