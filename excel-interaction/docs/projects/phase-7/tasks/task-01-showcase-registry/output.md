# phase-7 · task-01 · output（产出交接）

## 什么功能完成了

**展示层（showcase 页 + 清单登记 + 清单校验）**——契约双产物终于「有橱窗」：
清单 `src/data/tutorials.json` 登记 demo/doc/app 三型条目，静态展示页清单驱动渲染
（动画课 iframe 预览 / 视频播放 / 文档链接），生成与出片链自动登记，清单校验并入
`pnpm verify`。实现走零依赖静态路线（对齐 build-checklist 阶段 7 口径，不起 React/Vite
构建链）。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `src/data/tutorials.json` | 展示层清单（app/demo/doc 三型，path 以域根为站点根） |
| `src/standalone/{index.html,showcase.css,showcase.js}` | 清单驱动展示页（零构建，格数同款样式，tab 过滤） |
| `src/standalone/public/showcase/` | 静态演示资源（讲解视频 mp4，出片链自动落位） |
| `scripts/showcase/registry.mjs` | 清单读写 + upsert（按 id 幂等） |
| `scripts/showcase/check-tutorials.mjs` | 清单校验（字段/唯一 id/type/前缀/文件存在/app 显式 index.html） |
| `scripts/tutorial/new.mjs` | 出课后 upsert app 条目 |
| `scripts/recorder/render-video.mjs` | 成品拷入 public/showcase/ + upsert demo 条目 |
| `package.json` / `scripts/serve/serve.mjs` | `pnpm showcase`（4174）/ `verify:showcase` 并入 verify；MIME 补 mp4/wav/md |

## 要点（hand-off 给下游）

1. **站点根 = 域根**：`pnpm showcase` = `serve --dir . --port 4174`，清单 path 以 `/`
   起步按域根解析（app→`/apps/`、demo→`/src/standalone/public/showcase/`、doc→`/`）。
2. **iframe 显式 index.html**：清单校验强制（目录 URL 会 404）。
3. **登记流**：new.mjs upsert app（description=summary.oneLiner）、render-video upsert
   demo（title=plan.title +「· 讲解视频」）——重跑幂等；doc 条目手工登记。
4. 展示页样式与模板 theme.css 同 token 语汇（格数：cream/ink/gold/blue、小圆角、无阴影）。

## 下游接线

- phase-8 收尾的「一图流」最后一步 = 登记（出片链已自动）；
- 新课出课 + 出片后自动出现在 showcase 页，无需手工登记（doc 条目除外）。
