# 01 · 按目标选 Skill

> 动画 Skill 不是"一个工具"，而是"一类工具箱"。先想清楚你要做什么，再选对应的 skill——选错了，装十个也不如装对一个。

| 字段 | 值 |
| --- | --- |
| ID | `choose` |
| 顺序 | 1 |
| 短标题 | 按目标选 Skill |
| 分类 | 学习路径 |
| 级别 | 入门 |
| 时长 | 10 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [docs/motion/05-research/sources.md](../05-research/sources.md) |

**故事**：你要给一个产品做"滚动时跟着动的网页动效"。如果装了一个专注"产品宣传片"的 skill，Agent 会试图给你渲染 MP4——方向错了。先定目标，再选 skill，事半功倍。

**学习目标**：学完能把"我想做的动画"映射到正确的 skill 类别，并说出每类 skill 的代表性仓库。

**技能**：需求分类、skill 选型、阅读 README 的安装段

**摘要**：动画 skill 按"产出形态"分五类：网页动效、产品宣传片、口播视频、像素特效、动效原则。每类对应不同的仓库与安装方式。

## 🎯 本课重点

- **重点用什么**：按"产出形态"给 15 个调研仓库分五类，每类记住 1-2 个代表仓库与安装方式。
- **完成什么**：拿到一个动画需求，能先说出"这是网页动效还是视频成片"，再指到具体仓库。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 仓库清单 | [../05-research/sources.md](../05-research/sources.md) | 15 个仓库的类型、关注点、结论 |
| 练习 prompt | [../data/lessons/choose/prompt.md](../data/lessons/choose/prompt.md) | 给 Agent 的需求分类练习 |

## 🧱 基础操作

1. **读 README 的前三段**：每个仓库的 README 开头都会说"它做什么、给谁用、怎么装"。安装段（`npx skills add ...`）是最需要先看到的。
2. **看产出形态**：问自己"我要的是网页上能交互的动效，还是可以直接发给客户的视频文件？"——前者选网页动效类，后者选视频成片类。
3. **看 Agent 兼容**：多数 skill 用 `SKILL.md` 格式（[agentskills.io](https://agentskills.io)），兼容 Claude Code、Codex、Cursor、Windsurf、Copilot 等 40+ Agent。装之前确认你的 Agent 支持该格式。

## 🛠 实战操作

### 五类 Skill 选型表

| 你想做的 | 类别 | 代表仓库 | 安装方式 |
| --- | --- | --- | --- |
| 网页上能交互的动效（滚动、鼠标、微交互） | 网页动效 | [oil-oil/oil-motion](https://github.com/oil-oil/oil-motion)、[Jakubantalik/transitions.dev](https://github.com/Jakubantalik/transitions.dev) | `npx skills add oil-oil/oil-motion` |
| 用 GSAP 做复杂时间线动画 | 网页动效（官方库） | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | `npx skills add greensock/gsap-skills` |
| 产品宣传片（真实页面 → 视频） | 产品宣传片 | [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) | 把仓库地址交给 Agent |
| 口播稿 + 配音 → 动效成片 | 口播视频 | [Vincentwei1021/video-talkcraft](https://github.com/Vincentwei1021/video-talkcraft) | 把仓库地址交给 Agent |
| 任意主题 → 讲解视频 | 讲解视频 | [Vincentwei1021/anything2explainer](https://github.com/Vincentwei1021/anything2explainer) | 把仓库地址交给 Agent |
| 像素游戏特效（火焰、爆炸、魔法） | 像素特效 | [patch-gg/pixelfx](https://github.com/patch-gg/pixelfx) | 见仓库 README |
| 2D 精灵图 / 游戏素材生成 | 像素特效 | [NO6KIKO/gorest-2d-animation-spritesheet-generator](https://github.com/NO6KIKO/gorest-2d-animation-spritesheet-generator) | 见仓库 README |
| 想知道"动画该怎么做才对" | 动效原则 | [LottieFiles/motion-design-skill](https://github.com/LottieFiles/motion-design-skill)、[kylezantos/design-motion-principles](https://github.com/kylezantos/design-motion-principles) | `npx skills add LottieFiles/motion-design-skill` |
| 想要一整套动效 skill 合集 | 合集 | [Unclecheng-li/AI_Animation](https://github.com/Unclecheng-li/AI_Animation)、[iart-ai/motion-skills](https://github.com/iart-ai/motion-skills) | 按仓库 README 逐个安装 |
| 3D/WebGL 动效网站 | 3D/WebGL | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `/plugin marketplace add freshtechbro/claudedesignskills` |

### 操作步骤

1. **写下你的需求**：用一句话说清"给谁看、在哪看、什么形式"。例："给产品官网做滚动驱动的 Hero 动效，在浏览器里看。"
2. **对照选型表**：这句话里"滚动驱动""浏览器里看"指向网页动效类 → oil-motion 或 gsap-skills。
3. **打开仓库 README**：确认安装段与你的 Agent 兼容，再安装。
4. **跑一遍安装**：见 [02-install.md](02-install.md)。

## ✅ 总结

- 动画 skill 按产出形态分五类：网页动效、产品宣传片、口播视频、像素特效、动效原则（外加 3D/WebGL 与合集两个横切类别）。
- 选 skill 的第一步是分清"网页动效"与"视频成片"——前者产出可交互的网页，后者产出 MP4。
- 每个仓库的 README 安装段是必读的；装之前确认 Agent 兼容 `SKILL.md` 格式。
- 下一步：[02-install.md](02-install.md) 讲怎么装、怎么加载、怎么验证装好了。
