# Task log: edu-desktop-shell-spike

## 2026-07-09 — scaffold + opener UI

- **Agent:** cursor
- **做了:**
  - `bunx create-tauri-ui@latest desktop`（vite, shadcn base-nova, base-ui）
  - plugins: shell, dialog, store, opener, log
  - 壳 UI：OpenMAIC URL / 路径配置 + Save + Open classroom（opener）
  - ADR: `docs/project/spec/contracts/openmaic-embed.md`（MVP 外开）
  - docs/project + baseline note stubs
- **证据:** `desktop/src/App.tsx`, `desktop/src/lib/settings.ts`, `components.json` style=`base-nova`
- **给下一 Agent:** 跑 `bun run tauri dev`；另开 OpenMAIC `pnpm dev` 验收打开课堂；填 baselines
- **状态:** in_progress
