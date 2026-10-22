# Conventions

## 包与工具

- `desktop/`：bun + Vite；`bun run tauri dev`
- Rust：edition 2021；commands 放 `src-tauri/src/lib.rs`（后续可拆模块）
- UI 组件：优先 `bunx shadcn@latest add <comp>`（保持 `base-nova` / base-ui）

## 路径别名

- `@/` → `desktop/src/`

## Git

- 分支：`feature/<issue-id>-<agent>`
- 不强制 push；用户要求再提交

## 外部运行时

- OpenMAIC / DeepTutor **不** vendoring；用绝对路径配置或环境变量
- 默认开发路径见根 `AGENTS.md`
