# Architecture

## 目标形态

```text
┌─────────────────────────────────────────────┐
│  Tauri 2 Shell (desktop/)                    │
│  React + shadcn/base-ui · course library UI  │
│  shell / dialog / store plugins              │
└───────────────┬─────────────────────────────┘
                │ open URL / sidecar spawn
┌───────────────▼───────────────┐  ┌──────────────────────────┐
│ OpenMAIC (external)           │  │ DeepTutor (external)     │
│ localhost:3000 classroom      │  │ CLI / API · KB / mastery │
└───────────────────────────────┘  └──────────────────────────┘
```

## MVP 嵌入策略（spike）

1. **Dev：** 用户或脚本先起 OpenMAIC（`pnpm dev`）；壳内「打开课堂」用 `opener` / 内嵌 WebView 导航到 `http://127.0.0.1:3000`
2. **Store：** 记住 OpenMAIC 根路径与端口（`tauri-plugin-store`）
3. **后置：** sidecar 自动拉起 OpenMAIC / 打包 standalone

## 不采用

- Electron OpenMAIC-Project 主进程
- 把 `@openmaic/renderer` 整包重写进壳（工程过重，后置评估）

## 代码落点

| 区域 | 路径 |
|---|---|
| UI | `desktop/src/` |
| Rust commands | `desktop/src-tauri/src/lib.rs` |
| 课程包约定 | 待 `edu-manifest-format` |
| Baseline 笔记 | `notes/baselines/` |
