# Phase 7 · 展示层

## 这个 phase 做什么

standalone web（展示页 + 静态演示）：视频/演示入 `src/.../public/showcase/`，
清单（tutorials.json 一类）登记 demo/doc/app 条目，清单校验通过；
注意 iframe src 写显式 `index.html`（目录 URL 会 404）。

对齐 [build-checklist 阶段 7 · 展示层](../../../../excel-animation/docs/build-checklist.md)。

## tasks/

| task | 做什么 | 状态 |
| --- | --- | --- |
| [task-01-showcase-registry](tasks/task-01-showcase-registry/) | 展示层：showcase 页 + 清单登记（app/demo/doc）+ 清单校验 | ✅ |
| [task-02-showcase-sidebar](tasks/task-02-showcase-sidebar/) | sidebar 完整教程 + 「无废话 Excel 教程」品牌（task-17） | ✅ |
| [task-03-no-build-section](tasks/task-03-no-build-section/) | 去「如何构建」——教程页只放教程（task-19） | ✅ |
| [task-04-quick-preview-and-sound](tasks/task-04-quick-preview-and-sound/) | 快速预览组件（md/JSON/视频）+ 视频有声修复（task-21） | ✅ |

每个 task 目录三件套：`task.md`（做什么/功能/验证点）、`verify.md`（验证记录）、
`output.md`（交接）。构建方式见 [build-method.md](../../build-method.md)。
查看效果：`pnpm showcase` → `http://localhost:4174/src/standalone/index.html`。
