# verify · task-02 运行时基线

> 执行环境：Windows 11，2026-11-08。

### 1. Node ≥ 20 且 check.mjs 判 PASS

- 命令：`node -v`；`node scripts/check.mjs`
- 实际输出：`v24.15.0`；check 输出 `[PASS] Node.js（必需） v24.15.0`，计入"必需 6/6"
- 结论：**PASS**

### 2. pnpm 可执行、版本可读

- 命令：`pnpm -v`
- 实际输出：`12.14.0`（check.mjs 同步判 PASS）
- 备注：本机 pnpm 是 `.cmd` 垫片（`C:\Users\anyda\.local\opt\node\pnpm.cmd`），
  经 where 解析 + shell 执行探测成功（task-01 Bug 1 修复后）
- 结论：**PASS**

### 3. （可选）bun 可用 + 双运行时一致

- 命令：`bun -v`；`bun scripts/check.mjs --only node,bun`
- 实际输出：`1.3.6`（bash 下 `bun -v` 亦报 1.4.3——本机多份 bun/node 并存，
  check.mjs 按 PATH 解析到 1.3.6）；bun 运行 check 输出与 node 一致
- 结论：**PASS**（可选项已具备）

## 总结

3/3 PASS。运行时基线就绪。注意：本机 node/bun 存在多版本（fnm alias + .local/opt），
不同 shell 解析到的版本可能不同（v24.15.0 / v24.16.0、1.3.6 / 1.4.3 均出现过）——
版本基线以 ≥20 为准即可，不锁定小版本。
