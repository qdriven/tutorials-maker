# src/ · 展示层（standalone web）

展示层应用：showcase 页（清单驱动展示动画课、视频、文档）与静态演示资源
（public/showcase/）。iframe 一律写显式 `index.html`（目录 URL 会 404）。

- 清单：[data/tutorials.json](data/tutorials.json)（app 由 `new.mjs` upsert、demo 由
  `render-video.mjs` 落 public/showcase/ 后 upsert）；校验 `pnpm verify:showcase`。
- 查看：`pnpm showcase` → `http://localhost:4174/src/standalone/index.html`。
- 建设阶段：[phase-7 · 展示层](../docs/projects/phase-7/)
