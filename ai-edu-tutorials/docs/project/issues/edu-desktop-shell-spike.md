# edu-desktop-shell-spike

**Status:** in_progress  
**Track:** B (Desktop)  
**Updated:** 2026-07-09

## 目标

Tauri 2 壳可打开并进入一节本地 OpenMAIC 课堂。

## 已完成

- [x] 仓：`D:\innate-works\projects\ai-edu-tutorials`
- [x] `create-tauri-ui` Vite 脚手架（shadcn `base-nova` + `@base-ui/react`）
- [x] plugins：opener, log, shell, dialog, store
- [x] docs/project 初始化

## 待做

- [ ] 壳 UI：配置 OpenMAIC URL；「打开课堂」按钮
- [ ] store 持久化配置
- [ ] （可选）提示启动 OpenMAIC
- [ ] ADR 半页：外开 vs 内嵌 WebView

## 验收

- [ ] `bun run tauri dev` 能打开并进入一节已有 OpenMAIC 课堂

## 不做

- Electron 对照
- 完整课程库
- DeepTutor 集成

## 日志

见 `docs/project/tasks/issues/edu-desktop-shell-spike.md`
