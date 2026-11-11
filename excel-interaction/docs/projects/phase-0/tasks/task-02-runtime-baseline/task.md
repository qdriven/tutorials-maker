# task-02 · 运行时基线：Node ≥ 20 + pnpm（+ bun 可选）

## 做什么

确认脚本与流水线的运行时基线就绪：**Node.js ≥ 20**（必需）、**pnpm**（必需，
工作区与脚本入口）、**bun**（可选，初始化脚本的第二运行时）。

## 功能定义

- Node：所有 .mjs 脚本（check/install 及后续 new.mjs、build-plan.mjs 等）的执行环境。
- pnpm：依赖安装、`verify` 系列命令入口。
- bun：`bun scripts/*.mjs` 等价运行（零依赖脚本双运行时支持）。

## 验证点

1. `node -v` ≥ 20，`scripts/check.mjs` 对 Node.js 判 PASS（退出码计入必需项）。
2. `pnpm -v` 可执行且版本可读。
3. （可选加分）`bun -v` 可用，且 `bun scripts/check.mjs` 与 node 行为一致。

## 前置与依赖

- 无（本 task 是最底层基线）。

## 范围外

- Node 版本管理方式（nvm/fnm/系统安装）不做要求，能执行即可。
