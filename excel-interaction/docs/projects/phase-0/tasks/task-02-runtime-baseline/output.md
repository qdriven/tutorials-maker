# output · task-02 运行时基线（hand-off）

## 产出

无新增文件（环境确认类 task）——环境状态见 verify.md。

## 完成功能

Node ≥ 20 / pnpm / bun 三件运行时就绪，`node scripts/check.mjs` 退出码 0，
初始化脚本双运行时验证通过。

## 要点（交接）

1. **多版本并存**：本机经 fnm 管理 node，PATH 上多条目（node.cmd / fnm alias node.exe /
   .local/opt/node）；新 shell 的生效版本可能不同，但均 ≥ 20，不影响基线。
2. **pnpm 是 .cmd**：任何自写脚本要探测/调用 pnpm 时，直 spawn 会 EINVAL——
   用 check.mjs 的 where + shell 方案（task-01 output.md 有口诀）。
3. 后续 phase 的 npm 侧安装入口统一走 pnpm（工作区），全局小工具用 npm 全局装。
