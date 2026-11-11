# 动效｜Agent 动画 Skill 教程（离线可读版）

> 与调研文档同源、可离线阅读的课程文档。调研了 15 个公开的 **Agent 动画 Skill** 仓库（教 AI coding agent 做动画效果的 skill），用它们校准课程知识覆盖、挑练习素材——不是 GitHub 官方排名。

本目录把课程内容重组为可离线阅读的模块文档。每篇教程统一为"🎯 本课重点 → 📦 配套数据 → 🧱 基础操作 → 🛠 实战操作 → ✅ 总结"的结构。

## 🎯 本课重点

- **重点用什么**：一条学习路径（选 skill → 安装 → 第一个动画）、三组动画原则（timing/easing、stagger/编排、迪士尼 12 原则）、五种技术手法（CSS keyframes、GSAP、滚动驱动、Remotion、3D/WebGL），以及 15 个仓库的逐课实验。
- **完成什么**：能按目标选对 skill、装对方式、写出可验收的 prompt，并把每个结论追溯到原仓库的具体文档。
- **不覆盖什么**：不做 3D 建模/骨骼绑定、不教视频剪辑软件操作、不讲后端渲染集群；真实素材只描述样本口径，不外推为完整生产流程。

## 📦 配套数据

| 数据 | 位置 | 说明 |
| --- | --- | --- |
| 每课练习素材 | [`data/lessons/<id>/`](data/lessons/) | 与教程一一对应的 prompt 模板与验收清单 |
| 数据索引 | [`data/README.md`](data/README.md) | lesson ↔ 教程文档 ↔ 数据文件对照表 |

## 目录总览

| 模块 | 内容 | 目录 |
| --- | --- | --- |
| 01 学习路径 | 怎么选 skill、怎么装、怎么跑第一个动画 | [01-learning-path/](01-learning-path/) |
| 02 动画原则 | timing/easing、stagger/编排、迪士尼 12 原则 | [02-principles/](02-principles/) |
| 03 技术手法 | CSS keyframes、GSAP、滚动驱动、Remotion、3D/WebGL | [03-techniques/](03-techniques/) |
| 04 实验台 | 15 个仓库逐课实验（故事/步骤/技能） | [04-workspace-lessons/](04-workspace-lessons/) |
| 05 调研 | 15 个 GitHub 仓库调研与主题归并 | [05-research/](05-research/) |
| 06 致谢 | 数据与素材来源、许可 | [06-credits.md](06-credits.md) |
| 07 数据 | 每课配套数据文件与索引 | [data/](data/) |

## 每篇教程长什么样

所有教程文档统一为同一套结构，方便按同一节奏读：

1. **🎯 本课重点** —— 开头就说清"重点用什么（skill／手法）"和"完成什么（可验证的产出）"。
2. **📦 配套数据** —— 指向本课要打开的素材，并写明口径与边界。
3. **🧱 基础操作** —— 第一次做也能跟上的前置操作与语法。
4. **🛠 实战操作** —— 具体到 prompt、代码与预期结果。
5. **✅ 总结** —— 结尾回顾本课重点与产出。

## 完整目录（Table of Contents）

### [01-learning-path/](01-learning-path/) — 学习路径

- [01-choose.md](01-learning-path/01-choose.md) — 按目标选 skill：网页动效、产品宣传片、口播视频、像素特效、动效原则
- [02-install.md](01-learning-path/02-install.md) — 安装与加载：npx skills add、SKILL.md 格式、多 Agent 兼容
- [03-first-animation.md](01-learning-path/03-first-animation.md) — 第一个动画：从一句 prompt 到可验收的成片

### [02-principles/](02-principles/) — 动画原则

- [README.md](02-principles/README.md) — 原则总览与三套哲学
- [01-timing-easing.md](02-principles/01-timing-easing.md) — 时间与缓动：duration、easing、stagger 的取舍
- [02-choreography.md](02-principles/02-choreography.md) — 编排与镜头：动线、转场、反 PPT 镜头系统
- [03-disney12.md](02-principles/03-disney12.md) — 迪士尼 12 原则 → UI 动效的适配

### [03-techniques/](03-techniques/) — 技术手法

- [README.md](03-techniques/README.md) — 手法总览与选型表
- [01-css-keyframes.md](03-techniques/01-css-keyframes.md) — CSS keyframes + transition：零依赖的确定性动画
- [02-gsap.md](03-techniques/02-gsap.md) — GSAP：timeline、ScrollTrigger、插件与多框架
- [03-remotion.md](03-techniques/03-remotion.md) — Remotion：用 React 组件渲染视频
- [04-scroll-driven.md](03-techniques/04-scroll-driven.md) — 滚动/鼠标/触摸驱动：让动画跟着交互走
- [05-3d-webgl.md](03-techniques/05-3d-webgl.md) — 3D/WebGL：Three.js、R3F、Babylon.js 的选型

### [04-workspace-lessons/](04-workspace-lessons/) — 15 课实验台

- [README.md](04-workspace-lessons/README.md) — 实验台总览
- [01-gsap-skills.md](04-workspace-lessons/01-gsap-skills.md) — greensock/gsap-skills：官方 GSAP skill
- [02-video-shotcraft.md](04-workspace-lessons/02-video-shotcraft.md) — Vincentwei1021/video-shotcraft：产品宣传片
- [03-transitions-dev.md](04-workspace-lessons/03-transitions-dev.md) — Jakubantalik/transitions.dev：UI 转场库
- [04-anything2explainer.md](04-workspace-lessons/04-anything2explainer.md) — Vincentwei1021/anything2explainer：讲解视频
- [05-oil-motion.md](04-workspace-lessons/05-oil-motion.md) — oil-oil/oil-motion：网页交互动画
- [06-pixelfx.md](04-workspace-lessons/06-pixelfx.md) — patch-gg/pixelfx：像素特效库
- [07-motion-design-skill.md](04-workspace-lessons/07-motion-design-skill.md) — LottieFiles/motion-design-skill：动效原则
- [08-video-talkcraft.md](04-workspace-lessons/08-video-talkcraft.md) — Vincentwei1021/video-talkcraft：口播视频
- [09-ai-animation.md](04-workspace-lessons/09-ai-animation.md) — Unclecheng-li/AI_Animation：HTML 动画合集
- [10-design-motion-principles.md](04-workspace-lessons/10-design-motion-principles.md) — kylezantos/design-motion-principles：动效原则
- [11-spritesheet-generator.md](04-workspace-lessons/11-spritesheet-generator.md) — NO6KIKO/gorest：2D 精灵图生成
- [12-motion-video-kit.md](04-workspace-lessons/12-motion-video-kit.md) — echris6/motion-video-kit：商业视频
- [13-motionmaxxing.md](04-workspace-lessons/13-motionmaxxing.md) — Tejashmakwana/motionmaxxing：动效质量
- [14-claudedesignskills.md](04-workspace-lessons/14-claudedesignskills.md) — freshtechbro/claudedesignskills：3D/WebGL 栈
- [15-iart-motion-skills.md](04-workspace-lessons/15-iart-motion-skills.md) — iart-ai/motion-skills：动效合集

### [05-research/](05-research/) — GitHub 仓库调研

- [README.md](05-research/README.md) — 调研说明与高频主题速览
- [sources.md](05-research/sources.md) — 15 个仓库逐项清单与主题归并

### [06-credits.md](06-credits.md) — 致谢

- 数据与素材来源、许可说明

### [data/](data/) — 配套数据

- [README.md](data/README.md) — 每课配套数据索引
