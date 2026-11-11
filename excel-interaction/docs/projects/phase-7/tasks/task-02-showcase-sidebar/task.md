# phase-7 · task-02 · task（sidebar 完整教程展示层，用户 task-17）

## 背景（用户反馈原文）

> 目前是 card 形式展示，现在需要变成 sidebar 形式展示，同时关于如何构建部分放在最后一部分，
> 变成一个完整的教程。
> 「契约单源双产物：交互动画课 + 无废话讲解视频 · 清单驱动展示」这部分全部改成无废话 excel 教程。

三点：① 卡片栅格 → **sidebar** 布局；② 「如何构建」放**最后一部分**，页面成为**完整教程**；
③ 品牌/副标题整框换成**「无废话 Excel 教程」**。

## 做什么

1. **sidebar 布局**：左栏 品牌「无废话 Excel 教程」+ 课程列表（清单 type=app）+ 本课目录锚点
   + 参考文档（清单 type=doc）；右栏 = 一课一篇完整教程文章，点课程切换。
2. **完整教程文章结构**（固定六节，如何构建收尾）：
   概览（一句话/解释）→ 动画演示（讲解视频自动播放）→ 分步讲解（4 步 + 参数逐位行）
   → 动手练习（内嵌动画课，自动播一遍后练习）→ 总结 → **如何构建**（一图流四步命令，
   带当前课 id，照抄能造下一节课 + 文档链接）。
3. **双源驱动**：清单 `src/data/tutorials.json`（课程/视频/文档条目）+
   `apps/<id>/course.config.json`（契约单源，正文与动画课同源）。
4. **品牌全线替换**：index.html 标题/副标题、README 头、package.json description、
   清单 demo 描述、render-video 登记文案 → 「无废话 Excel 教程」口径。

## 功能清单

| 文件 | 改动 |
| --- | --- |
| `src/standalone/index.html` | sidebar 骨架 + 「无废话 Excel 教程」品牌（整页重写） |
| `src/standalone/showcase.js` | 卡片/tab → sidebar + 完整教程文章渲染（重写） |
| `src/standalone/showcase.css` | 栅格卡片 → sidebar + 章节文章样式（重写，同格数 token） |
| `README.md` / `package.json` / `src/data/tutorials.json` / `render-video.mjs` | 品牌/描述换「无废话 Excel 教程」 |

## 验证点

1. 文章六节顺序固定：overview → video → steps → practice → summary → **build（最后）**。
2. 视频自动播放（muted + play() 兜底）；参数行只挂首个公式步（口播规则 4 同口径）。
3. sidebar 课程切换换源（标题/正文/命令块 id 跟随）。
4. 截图目检格数风格成立；console 0 错误；`pnpm verify:showcase` 全绿。
