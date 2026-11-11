# task-01 · 初始化脚本（check / install）与用法文档

## 做什么

交付 Phase 0 的核心工具：`scripts/check.mjs`（环境检查）与 `scripts/install.mjs`
（环境安装），以及用法文档 `scripts/README.md`。后续所有 phase 的环境自检都走这两个入口。

## 功能定义

- **check.mjs**：检查 11 个组件（Node/pnpm/bun/Python/ffmpeg/ffprobe/edge-tts/表格引擎/
  Playwright/Hyperframes/OpenScreen）的存在性与版本；人读表格 + `--json` 机器可读；
  `--only` 过滤；退出码反映必需组件是否就绪。
- **install.mjs**：按组件清单生成安装计划（自动探测包管理器：winget/choco/scoop、
  brew、apt/dnf/pacman）；默认 dry-run，`--apply` 显式执行；`--list` / `--only` / `--help`。
- **共同约束**：零依赖（只用 node: 内置模块）；同一份 .mjs 兼容 Node ≥ 18 与 bun；
  Windows / Linux / macOS 通用。

## 验证点

1. `node scripts/check.mjs` 在本机跑通，必需组件状态与人工核对一致，退出码正确。
2. `node scripts/install.mjs` dry-run 打印计划且无副作用；`--list` / `--help` 可用。
3. `bun scripts/check.mjs` 与 node 运行结果一致（双运行时兼容）。
4. `--json` 输出可被 JSON.parse。
5. 已知坑处理正确：Windows `.cmd` 垫片可探测（pnpm/npx）；商店执行别名可探测
   （OpenScreen）；GUI 工具不挂起探针。

## 前置与依赖

- Node ≥ 18 或 bun 任一即可执行（自举：脚本自身的运行要求）。
- 无其他前置 task。

## 范围外

- 不安装任何工具（那是 install.mjs 的职责，且默认 dry-run）；
- 不涉及教程生成/出片工具链（phase-2 之后）。
