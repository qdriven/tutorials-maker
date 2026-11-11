# phase-7 · task-02 · output（产出交接）

## 什么功能完成了

**展示层 sidebar 化 + 完整教程文章 + 「无废话 Excel 教程」品牌**（用户 task-17 反馈闭环）——
展示页从「卡片橱窗」变成「一课一篇完整教程」：概览 → 动画演示 → 分步讲解 → 动手练习 →
总结 → 如何构建（最后），左栏 sidebar 导航（课程/目录/文档）。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `src/standalone/index.html` | sidebar 骨架 + 品牌（无废话 Excel 教程） |
| `src/standalone/showcase.js` | 清单 + 契约双源 → 教程文章渲染（切课/目录锚点/视频自动播） |
| `src/standalone/showcase.css` | 格数 token 体系的 sidebar + 章节样式 |
| `docs/projects/phase-7/tasks/task-02-showcase-sidebar/` | 三件套 + drive-02.py + result.json + shots/ |

## 要点（hand-off 给下游）

1. **正文单源**：文章与动画课共用 `apps/<id>/course.config.json`——改契约即改文章，
   无第二份文案要同步。清单 `tutorials.json` 只管条目（课/视频/文档）与描述。
2. **参数行挂点**与口播规则 4 同口径：只在**首个公式步**展开 `formulaArgs` 逐位行。
3. **视频自动播放**：`autoplay muted` 属性 + `v.play()` 兜底（个别策略拦属性时救回）；
   切课重建 DOM 后重新绑定。
4. 「如何构建」命令块带**当前课 id**——复制即造下一节课（README 一图流同口径）。
5. 品牌口径：一切用户可见文案用「无废话 Excel 教程」；内部技术文档保留「单源双产物」
   架构术语（append-only 流水不改写）。

## 下游接线

- 新课自动出现在 sidebar（清单 upsert 链不变：new.mjs 登记 app、render-video 登记 demo）；
- 后续加课无需改展示层代码；
- 悬挂边角（非本 task）：窄屏 <900px 转顶部横排已留样式，真机移动视图未细调。
