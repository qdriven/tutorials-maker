# 02 · GSAP：timeline、ScrollTrigger、插件与多框架

> GSAP 是网页动效的事实标准，官方亲自下场写 Agent skill。本课讲清 timeline、ScrollTrigger 与插件生态。

| 字段 | 值 |
| --- | --- |
| ID | `gsap` |
| 顺序 | 10 |
| 短标题 | GSAP |
| 分类 | 技术手法 |
| 级别 | 进阶 |
| 时长 | 20 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) |

**故事**：GSAP 已全免费（含 SplitText、MorphSVG 等 former Club 插件），官方用 skill 教 Agent 正确的 GSAP 用法——从 core API 到 timeline、ScrollTrigger、插件、React/Vue/Svelte 集成。

**学习目标**：学完能用 timeline 编排多动画、用 ScrollTrigger 做滚动驱动、知道插件生态与多框架集成方式。

**技能**：`gsap.to`/`gsap.from`、`gsap.timeline`、`ScrollTrigger`、插件、React/Vue/Svelte

**摘要**：timeline 管编排、ScrollTrigger 管滚动驱动、插件管高级效果；官方 skill 覆盖全 API 与多框架。

## 🎯 本课重点

- **重点用什么**：timeline 编排、ScrollTrigger 滚动驱动、插件与多框架集成。
- **完成什么**：用 GSAP 写一个滚动触发的时间线动画，并知道何时用插件。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/gsap/prompt.md](../data/lessons/gsap/prompt.md) | 给 Agent 的 GSAP 练习 |

## 🧱 基础操作

1. **装 skill**：`npx skills add greensock/gsap-skills`。
2. **core API**：`gsap.to(target, { x: 100, duration: 1, ease: "power2.out" })`。
3. **timeline**：`gsap.timeline().to(a, {...}).to(b, {...})` 串行编排。
4. **ScrollTrigger**：`gsap.to(el, { scrollTrigger: { trigger: el, start: "top 80%" }, x: 100 })`。

## 🛠 实战操作

### 滚动触发的时间线

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: { trigger: "#hero", start: "top 80%" },
});
tl.from(".title", { y: 40, opacity: 0, duration: 0.6, ease: "power2.out" })
  .from(".subtitle", { y: 20, opacity: 0, duration: 0.4 }, "-=0.2")
  .from(".cta", { scale: 0.9, opacity: 0, duration: 0.4 }, "-=0.2");
```

### 插件与多框架

- 插件：SplitText（文字拆分）、MorphSVG（SVG 形变）、MotionPath（路径动画）——均已免费。
- 多框架：React 用 `gsap/react` 的 `useGSAP`；Vue/Svelte 见官方 skill 文档。

### 验收

1. 滚动到触发点时 timeline 是否按顺序播放。
2. 缓动是否符合 [timing-easing](../02-principles/01-timing-easing.md) 分级。
3. 是否注册了用到的插件。

## ✅ 总结

- timeline 管编排，ScrollTrigger 管滚动驱动，插件管高级效果。
- GSAP 已全免费，官方 skill 覆盖 core API 到多框架集成。
- 下一步：[03-remotion.md](03-remotion.md) 讲用 React 渲染视频。
