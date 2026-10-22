> **归档（2026-07-10）：** 本文件为早期规划草稿，**已被 `docs/project/` 取代**。
> 现状以 [`docs/project/index.md`](../docs/project/index.md) 与 [ADR `openmaic-embed`](../docs/project/spec/contracts/openmaic-embed.md) 为准。
> 以下内容保留作历史参考，不再维护。

# 内嵌课堂与一体打包说明

## 目标形态

```text
┌──────────────────────────────────────────────┐
│ Tauri Desktop Window                          │
│ ┌─────────┬────────────────────────────────┐ │
│ │ Sidebar │ Child WebView (OpenMAIC)        │ │
│ │ 壳 UI   │ http://127.0.0.1:3230           │ │
│ └─────────┴────────────────────────────────┘ │
└──────────────────────────────────────────────┘
         ▲
         │ Rust 后台启动 bundled runtime (node server.js)
```

用户不再跳转系统浏览器；课堂在应用内子 WebView 中显示。

## 已实现

| 层 | 实现 |
|---|---|
| 前端嵌入 | `desktop/src/components/classroom-embed.tsx` 使用 Tauri 2 `Webview` 子视图 |
| 启动逻辑 | `ensure_openmaic_runtime_ready` 启动 bundled OpenMAIC 并做端口健康检查 |
| 权限 | `capabilities/default.json` 增加 webview create/show/hide/position/size |
| UI | `Runtime` 模块主区域显示内嵌课堂，侧边栏保留模块切换 |

## 开发模式

```bash
# Git Bash
cd /d/innate-works/projects/ai-edu-tutorials
./start-all.sh
```

- OpenMAIC 默认 `http://127.0.0.1:3000`（dev）
- Desktop 壳启动后会尝试内嵌；若 bundled runtime 不可用，会回退到 settings 中的 URL

## 生产一体打包

```powershell
# 1) 构建 OpenMAIC 生产运行时并复制到 Tauri resources
powershell -ExecutionPolicy Bypass -File .\build-openmaic-runtime.ps1

# 2) 构建桌面安装包（含 resources）
cd desktop
bun install
bun run tauri build
```

产物在 `desktop/src-tauri/target/release/bundle/`。

安装后用户无需配置：

1. 打开应用
2. Rust 自动启动 bundled runtime（3230）
3. 子 WebView 内嵌显示课堂

## 注意

- `build-openmaic-runtime.ps1` 在 Windows 上需 Git Bash 执行 OpenMAIC 子包构建（`rm -rf` 兼容）
- standalone 复制体积大，首次打包耗时较长
- 打包前需本机有 Node（运行 bundled `server.js`）
