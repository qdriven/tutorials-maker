# phase-7 · task-01 · 展示层（showcase 页 + 清单登记 + 清单校验）

对应执行清单「task-14 · Phase 7 展示层」。

## 背景

phase-7 README：standalone web（展示页 + 静态演示）：视频/演示入
`src/.../public/showcase/`，清单（tutorials.json 一类）登记 demo/doc/app 条目，
清单校验通过；iframe src 写显式 `index.html`（目录 URL 会 404）。
对齐 build-checklist 阶段 7（登记/展示/校验口径），实现走本域零依赖路线
（静态展示页，不起 React/Vite 构建链）。

## 做什么

1. **清单** `src/data/tutorials.json`：demo/doc/app 三型条目（vlookup-basic 课 +
   讲解视频 + 契约 schema/项目索引文档），path 以域根为站点根。
2. **展示页** `src/standalone/`（index/showcase.css/showcase.js，零构建、格数同款
   样式）：清单驱动卡片 + tab 过滤；app=iframe 预览（显式 index.html）+ 新窗口；
   demo=video 播放；doc=链接。
3. **登记流**：`new.mjs` 出课后 upsert app 条目；`render-video.mjs` 成品拷入
   `src/standalone/public/showcase/` + upsert demo 条目（按 id 幂等）。
4. **清单校验** `scripts/showcase/check-tutorials.mjs`：逐条核字段/唯一 id/type/
   前缀（app→/apps/、demo→/src/standalone/public/showcase/、doc→/）/文件存在/
   app 显式 index.html；并入 `pnpm verify`。
5. **服务**：`pnpm showcase`（serve --dir . --port 4174，站点根=域根）；serve.mjs
   MIME 补 mp4/wav/md。

## 验证点

1. 清单校验：`pnpm verify:showcase` 绿；负向 fixture 8 处违规全拦 EXIT=1。
2. 登记流幂等：new.mjs 重跑 upsert 不增条目（4→4）；render-video 落 public/showcase/
   + demo upsert。
3. 浏览器实见：showcase 页 4 卡可见可点、tab 过滤、iframe 载入动画课（显式
   index.html）、视频/文档链接 200；截图取证。
4. 回归：`pnpm verify` EXIT=0。
