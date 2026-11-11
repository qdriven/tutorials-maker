# 调研来源清单

> 15 个公开的 Agent 动画 Skill 仓库逐项清单与高频主题归并——查出处、查许可、查能练什么。

来源：`docs/motion/04-workspace-lessons/` 的 15 篇课程与 `docs/motion/data/lessons/` 的配套练习素材。所有链接指向公开 GitHub 仓库；调研页保留原始仓库链接，精选榜单不是 GitHub 官方排名。

## 🎯 本课重点

- **重点用什么**：去哪儿查什么——GitHub 仓库的原始链接（README 与 Release）、每个仓库覆盖的主题（网页动效／产品宣传片／口播视频／像素特效／动效原则）与安装方式，以及仓库的许可条款。
- **完成什么**：为每个高频主题找到至少一个可动手的出处，并记录"仓库 → 主题 → 对应课程用例"的映射；需要练习素材时知道去哪下载、许可允许怎么用。

## 📦 配套数据

下列练习素材可直接使用，用于验证清单里各类主题：

| 数据 | 文件 | 规模 | 用途 |
| --- | --- | --- | --- |
| 各课练习 prompt 模板 | [`../data/lessons/<id>/prompt.md`](../data/lessons/) | 每课 1 份 | 复制给 Agent 即可开练 |
| 各课验收清单 | [`../data/lessons/<id>/checklist.md`](../data/lessons/) | 每课 1 份 | 做完后逐条核对 |
| 素材索引 | [`../data/README.md`](../data/README.md) | 15 课 | lesson ↔ 教程 ↔ 数据文件对照表 |

数据说明：以上文件均为本项目编写的练习素材，参考各仓库的公开方法与许可；清单里的第三方仓库只做延伸阅读，不随本文档打包分发。

## 仓库清单

| 仓库 | 类型 | 关注点 | 结论 |
| --- | --- | --- | --- |
| [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | 官方动画库 skill | GSAP 全 API：timeline、ScrollTrigger、插件、React/Vue/Svelte、性能。 | 官方出品，覆盖最全；GSAP 已全免费（含 SplitText/MorphSVG），是网页动效的首选底座。 |
| [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) | 产品宣传片 skill | 真实页面截图 → 150 个镜头配方 → Remotion 动画成片 → 剪辑/音效/逐帧质检。 | 把"网页动效"升级为"产品宣传片"；每帧都是代码，可编辑可复用。 |
| [Jakubantalik/transitions.dev](https://github.com/Jakubantalik/transitions.dev) | UI 转场库 + skill | 43+ 预制 CSS 转场，复制即用，含 `prefers-reduced-motion` 守卫。 | 转场质量高、可直接粘贴进任意项目；是"小而精"的典范。 |
| [Vincentwei1021/anything2explainer](https://github.com/Vincentwei1021/anything2explainer) | 讲解视频 skill | 任意主题 → 调研 → 旁白 → 分镜 → Remotion 渲染 → 多智能体 QC。 | 把"做动画"扩展为"做讲解视频"；多智能体分工 + 定量 QC 是方法论亮点。 |
| [oil-oil/oil-motion](https://github.com/oil-oil/oil-motion) | 网页交互动画 skill | 滚动、鼠标、拖动、触摸、设备方向驱动的连续动画。 | 中文文档，专注"动画跟着交互走"；与滚动驱动网页动效直接对口。 |
| [patch-gg/pixelfx](https://github.com/patch-gg/pixelfx) | 像素特效库 + skill | 244 个像素风特效（火焰/爆炸/魔法/天气），可导出精灵图。 | 像素游戏特效的代码化；"起草→渲染→看→精修"的迭代方法可迁移。 |
| [LottieFiles/motion-design-skill](https://github.com/LottieFiles/motion-design-skill) | 动效原则 skill | 时间、缓动、编排、情感意图；迪士尼 12 原则适配 UI。 | 哲学先行、实现无关；教 Agent"像动效导演一样思考"，任何动画系统通用。 |
| [Vincentwei1021/video-talkcraft](https://github.com/Vincentwei1021/video-talkcraft) | 口播视频 skill | 字级配音同步、108 张动效配方卡、七层反 PPT 镜头系统、三重验收。 | 口播稿 + 成品配音 → 动效成片；"锁在人声上"的帧级同步是核心。 |
| [Unclecheng-li/AI_Animation](https://github.com/Unclecheng-li/AI_Animation) | HTML 动画 skill 合集 | 17 个单文件 HTML 动画 skill：3D 可视化、PPT 风格演示、UI 美化。 | 中文生态里最成体系的合集；每个 skill 自包含，装一个用一个。 |
| [kylezantos/design-motion-principles](https://github.com/kylezantos/design-motion-principles) | 动效原则 skill | 三重视角（克制与速度／产品打磨／表现力），build 与 audit 双模式。 | 把动效原则拆成可按项目语境加权的三套哲学；还能反向审查现有动画。 |
| [NO6KIKO/gorest-2d-animation-spritesheet-generator](https://github.com/NO6KIKO/gorest-2d-animation-spritesheet-generator) | 2D 精灵图生成 | 概念/参考图 → 动画就绪场景、预览、可复用游戏素材；无 UI 工作流。 | 把"生成素材"变成"Agent 改工具"；AGENTS.md + 工作流文档是范式。 |
| [echris6/motion-video-kit](https://github.com/echris6/motion-video-kit) | 商业视频 skill | 独立批评者质量循环、动效语法（6 规则 + 16 机制）、音频规则、Three.js 模式。 | 研究 28 部 SaaS 宣传片后的方法论；"builder ≠ judge"的 Gauntlet 循环。 |
| [Tejashmakwana/motionmaxxing](https://github.com/Tejashmakwana/motionmaxxing) | 动效质量 skill | 把 AI 生成的动效视频"整容"成动效设计师水准；关键帧度量与打分。 | 反向工作流：先有素材再提升质量；可度量、可打分的质检思路。 |
| [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | 3D/WebGL 设计 skill 栈 | 27 插件 / 22 skill：Three.js、GSAP、R3F、Framer Motion、Babylon.js。 | 前端设计 skill 大合集；动画只是其中一层，适合做技术选型参考。 |
| [iart-ai/motion-skills](https://github.com/iart-ai/motion-skills) | 动效 skill 合集 | 56 个动效 skill：动态字卡、数据图表、讲解、TikTok/Reels、3D/WebGL。 | 覆盖面最广的合集；"渲染一帧 → 截图 → 自检"的 deliver-and-verify 循环。 |

## 高频主题归并（researchTopics）

| 主题 | 命中数 | 说明 |
| --- | --- | --- |
| 网页/UI 动效 | 8 | CSS keyframes、GSAP、转场、微交互、滚动驱动——最基础也最普遍 |
| 视频成片（Remotion 系） | 5 | 产品宣传片、口播视频、讲解视频；每帧代码渲染，可编辑 |
| 动效设计原则 | 4 | timing/easing/stagger、迪士尼 12 原则、克制与速度、可度量质检 |
| 像素/2D 特效 | 2 | 像素风特效库、精灵图生成与导出 |
| 3D/WebGL | 3 | Three.js、R3F、Babylon.js、WebGPU |
| 质量验收 | 4 | 独立批评者、逐帧 QC、deliver-and-verify、打分 |

## 在课程中的落地

| 仓库 | 对应用例／模块 |
| --- | --- |
| greensock/gsap-skills | [04-workspace-lessons/01-gsap-skills.md](../04-workspace-lessons/01-gsap-skills.md)、[03-techniques/02-gsap.md](../03-techniques/02-gsap.md) |
| Vincentwei1021/video-shotcraft | [04-workspace-lessons/02-video-shotcraft.md](../04-workspace-lessons/02-video-shotcraft.md)、[01-learning-path/03-first-animation.md](../01-learning-path/03-first-animation.md) |
| Jakubantalik/transitions.dev | [04-workspace-lessons/03-transitions-dev.md](../04-workspace-lessons/03-transitions-dev.md)、[03-techniques/01-css-keyframes.md](../03-techniques/01-css-keyframes.md) |
| Vincentwei1021/anything2explainer | [04-workspace-lessons/04-anything2explainer.md](../04-workspace-lessons/04-anything2explainer.md) |
| oil-oil/oil-motion | [04-workspace-lessons/05-oil-motion.md](../04-workspace-lessons/05-oil-motion.md)、[03-techniques/04-scroll-driven.md](../03-techniques/04-scroll-driven.md) |
| patch-gg/pixelfx | [04-workspace-lessons/06-pixelfx.md](../04-workspace-lessons/06-pixelfx.md) |
| LottieFiles/motion-design-skill | [04-workspace-lessons/07-motion-design-skill.md](../04-workspace-lessons/07-motion-design-skill.md)、[02-principles/](../02-principles/) |
| Vincentwei1021/video-talkcraft | [04-workspace-lessons/08-video-talkcraft.md](../04-workspace-lessons/08-video-talkcraft.md) |
| Unclecheng-li/AI_Animation | [04-workspace-lessons/09-ai-animation.md](../04-workspace-lessons/09-ai-animation.md) |
| kylezantos/design-motion-principles | [04-workspace-lessons/10-design-motion-principles.md](../04-workspace-lessons/10-design-motion-principles.md)、[02-principles/](../02-principles/) |
| NO6KIKO/gorest-2d-animation-spritesheet-generator | [04-workspace-lessons/11-spritesheet-generator.md](../04-workspace-lessons/11-spritesheet-generator.md) |
| echris6/motion-video-kit | [04-workspace-lessons/12-motion-video-kit.md](../04-workspace-lessons/12-motion-video-kit.md) |
| Tejashmakwana/motionmaxxing | [04-workspace-lessons/13-motionmaxxing.md](../04-workspace-lessons/13-motionmaxxing.md) |
| freshtechbro/claudedesignskills | [04-workspace-lessons/14-claudedesignskills.md](../04-workspace-lessons/14-claudedesignskills.md)、[03-techniques/05-3d-webgl.md](../03-techniques/05-3d-webgl.md) |
| iart-ai/motion-skills | [04-workspace-lessons/15-iart-motion-skills.md](../04-workspace-lessons/15-iart-motion-skills.md) |

## ✅ 总结

- 这份清单是"去哪儿查"的索引：15 个仓库覆盖了官方动画库 skill、产品/口播/讲解视频、UI 转场、网页交互动画、像素特效、动效原则与质量验收六种类型。
- 高频主题共 6 类，网页/UI 动效（8）最普遍，其次是视频成片（5）、动效原则（4）、质量验收（4）、3D/WebGL（3）、像素/2D（2）。
- 每个仓库都已落到实验台的具体用例上，用例文档的"来源"字段就是回到原仓库的线索。
- 榜单不是官方排名，筛选依据是实际练习价值；仓库内容与项目叙述仍需自行复核。
- 第三方素材的使用与再分发受各自许可约束，引用前请查看仓库页面与 [../06-credits.md](../06-credits.md) 的来源与许可说明。
