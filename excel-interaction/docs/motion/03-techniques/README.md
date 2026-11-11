# 03 · 技术手法总览

> 同一个动效可以用不同技术实现：CSS keyframes、GSAP、滚动驱动、Remotion、3D/WebGL。本模块讲清五种手法的适用边界与选型表。

| 字段 | 值 |
| --- | --- |
| ID | `techniques` |
| 顺序 | 8 |
| 短标题 | 技术手法总览 |
| 分类 | 技术手法 |
| 级别 | 入门 → 进阶 |
| 时长 | 10 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [greensock/gsap-skills](https://github.com/greensock/gsap-skills)、[oil-oil/oil-motion](https://github.com/oil-oil/oil-motion)、[freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) |

**故事**：做"滚动时跟着动的网页动效"，用纯 CSS 也能做，但要做"滚动到某点触发时间线动画"，GSAP ScrollTrigger 更顺手。技术选型不是"哪个新"，而是"哪个匹配需求"。

**学习目标**：学完能按需求在五种手法中选型，并说出每种手法的边界。

**技能**：CSS keyframes、GSAP、滚动驱动、Remotion、3D/WebGL、选型

**摘要**：五种手法：CSS keyframes（零依赖确定性）、GSAP（时间线+插件）、滚动驱动（交互跟随）、Remotion（React 渲染视频）、3D/WebGL（三维场景）。

## 🎯 本课重点

- **重点用什么**：五种手法的适用边界与选型表。
- **完成什么**：拿到一个动效需求，能先排除不适用手法，再选最匹配的。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 手法文档 | [01-css-keyframes.md](01-css-keyframes.md)、[02-gsap.md](02-gsap.md)、[03-remotion.md](03-remotion.md)、[04-scroll-driven.md](04-scroll-driven.md)、[05-3d-webgl.md](05-3d-webgl.md) | 五种手法的细节 |

## 🧱 基础操作

1. **读五种手法**：五篇子文档各讲一种，先通读再选型。
2. **按需求排除**：先问"要不要视频成片"——要则 Remotion；再问"要不要三维"——要则 3D/WebGL；最后在 CSS/GSAP/滚动驱动里选。

## 🛠 实战操作

### 选型表

| 需求 | 首选手法 | 代表仓库 |
| --- | --- | --- |
| 零依赖、确定性、可单步的循环动画 | CSS keyframes | transitions.dev、oil-motion |
| 复杂时间线、ScrollTrigger、插件动画 | GSAP | gsap-skills |
| 动画跟随滚动/鼠标/触摸 | 滚动驱动（CSS scroll-driven 或 GSAP） | oil-motion |
| 用 React 组件渲染视频文件 | Remotion | video-shotcraft、video-talkcraft |
| 三维场景、WebGL 动效网站 | Three.js / R3F / Babylon.js | claudedesignskills |

### 操作步骤

1. **定产出**：网页还是视频。
2. **定维度**：二维还是三维。
3. **定交互**：是否需要跟随滚动/鼠标。
4. **查表选型**：对照选型表找首选手法，再进对应子文档。

## ✅ 总结

- 五种手法各有边界：CSS 零依赖、GSAP 强时间线、滚动驱动跟交互、Remotion 出视频、3D/WebGL 管三维。
- 选型顺序：先产出（网页/视频），再维度（二维/三维），再交互（是否跟随）。
- 下一步：进入五篇子文档逐条学习。
