# 05 · Agent 动画 Skill 调研

> 调研 15 个公开的 Agent 动画 Skill 仓库，用它们校准课程知识覆盖、挑练习素材——不是 GitHub 官方排名。

来源：`docs/motion/04-workspace-lessons/` 的 15 篇课程与 `docs/motion/data/lessons/` 的配套练习素材。调研目的是校准课程知识覆盖、挑选练习素材，不是 GitHub 官方排名；用例筛选优先考虑实际练习价值，不按 Star 机械排序。

## 🎯 本课重点

- **重点用什么**：去 GitHub 仓库里查三类东西——每个仓库覆盖的主题（网页动效／产品宣传片／口播视频／像素特效／动效原则／质量验收）、安装方式与 Agent 兼容性，以及仓库的许可条款。
- **完成什么**：为每个高频主题找到至少一个可直接动手的仓库出处，并记录它的原始链接与许可；引用素材时能把"仓库 → 文档 → 用例"串起来。

## 📦 配套数据

调研结论对应的练习素材（可直接复制给 Agent 开练）：

| 数据 | 文件 | 规模 | 用途 |
| --- | --- | --- | --- |
| 各课练习 prompt | [`../data/lessons/<id>/prompt.md`](../data/lessons/) | 每课 1 份 | 验证清单里各类主题的动手练习 |
| 各课验收清单 | [`../data/lessons/<id>/checklist.md`](../data/lessons/) | 每课 1 份 | 做完后逐条核对 |
| 素材索引 | [`../data/README.md`](../data/README.md) | 15 课 | lesson ↔ 教程 ↔ 数据文件对照表 |

数据说明：以上文件均为本项目编写的练习素材，参考各仓库的公开方法与许可；调研清单里的第三方仓库只做延伸阅读，不随本文档打包分发。

## 文档

- [sources.md](sources.md)：15 个仓库逐项清单（名称、链接、类型、关注点、结论）＋高频主题统计
- [remotion-hyperframes-top10.md](remotion-hyperframes-top10.md)：Remotion / Hyperframes 系 Agent Skill Top 10（2026-11 核验）——面向"把 Excel 教程做成程序化视频"的选型与落地结论
- [animation-repo-ecosystem-2026-11.md](animation-repo-ecosystem-2026-11.md)：动画制作 GitHub 全生态地图（2026-11-05 核验）——关键词澄清、7 个方向 45+5 个仓库清单、关键洞察与落地建议

## 高频主题速览

| 主题 | 命中仓库数 | 说明 |
| --- | --- | --- |
| 网页/UI 动效 | 8 | CSS keyframes、GSAP、转场、微交互、滚动驱动——最基础也最普遍 |
| 视频成片（Remotion 系） | 5 | 产品宣传片、口播视频、讲解视频；每帧代码渲染，可编辑 |
| 动效设计原则 | 4 | timing/easing/stagger、迪士尼 12 原则、克制与速度、可度量质检 |
| 质量验收 | 4 | 独立批评者、逐帧 QC、deliver-and-verify、打分 |
| 3D/WebGL | 3 | Three.js、R3F、Babylon.js、WebGPU |
| 像素/2D 特效 | 2 | 像素风特效库、精灵图生成与导出 |

## 与课程模块的关系

- 三组动画原则参考 LottieFiles/motion-design-skill 与 kylezantos/design-motion-principles：[../02-principles/](../02-principles/)
- 五种技术手法参考 gsap-skills、transitions.dev、oil-motion、claudedesignskills：[../03-techniques/](../03-techniques/)
- 各仓库主题在实验台中被重新设计为用例：[../04-workspace-lessons/](../04-workspace-lessons/)（每篇用例文档的"来源"字段给出对应仓库）
- 仓库清单与主题归并的完整表格：[sources.md](sources.md)

## ✅ 总结

- 调研目的有两个：校准课程知识覆盖（看有没有漏掉主题）和挑选练习素材（看有没有现成 skill 可用），不是排名。
- 15 个入选仓库覆盖六种类型：官方动画库 skill、产品/口播/讲解视频、UI 转场、网页交互动画、像素特效、动效原则与质量验收。
- 高频主题集中在网页/UI 动效（8）、视频成片（5）、动效原则（4）、质量验收（4）、3D/WebGL（3）、像素/2D（2）。
- 仓库主题已在实验台里被重新设计成用例，文档中的"来源"字段就是回到原仓库的线索。
- 第三方仓库各有许可，引用素材或改写内容前先看 [../06-credits.md](../06-credits.md) 的来源与许可说明。
