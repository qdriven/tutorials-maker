# 01 · GSAP 官方 skill

> GSAP 官方亲自写的 Agent skill（17,699⭐），让 Agent 用 timeline 与 ScrollTrigger 做出专业级网页动效。

| 字段 | 值 |
| --- | --- |
| ID | `gsap-skills` |
| 顺序 | 01 |
| 短标题 | GSAP 官方 skill |
| 分类 | 实战课 |
| 级别 | 进阶 |
| 时长 | 30 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) |

**故事**：GSAP 是网页动效的事实标准，官方亲自下场为 Agent 写 skill：约束 timeline 编排、ScrollTrigger 滚动驱动、SplitText/MorphSVG 等插件用法，以及 React/Vue/Svelte 集成。所有插件已全部免费。

**学习目标**：学完能用 timeline 编排多动画序列、用 ScrollTrigger 做滚动驱动，并知道插件何时用、多框架如何接。

**技能**：timeline 编排、ScrollTrigger 滚动驱动、插件注册、React useGSAP、降级守卫

**摘要**：官方 skill 覆盖 GSAP 全 API：timeline 管编排、ScrollTrigger 管滚动、插件管高级效果、多框架管集成。

## 🎯 本课重点

- **重点用什么**：timeline 编排、ScrollTrigger 滚动驱动、插件与多框架集成。
- **完成什么**：用 timeline + ScrollTrigger 做一个滚动触发的入场动画序列。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/gsap-skills/prompt.md](../data/lessons/gsap-skills/prompt.md) | 给 Agent 的练习 prompt |
| 验收清单 | [../data/lessons/gsap-skills/checklist.md](../data/lessons/gsap-skills/checklist.md) | 验收清单 |

## 🧱 基础操作

1. **装 skill**：`npx skills add greensock/gsap-skills`。
2. **读 skill 文档**：装完后让 Agent 读该 skill 的 SKILL.md，理解它约束了什么。
3. **发第一条 prompt**：用四要素（产出形态、时长/规模、动效类型、验收标准）。

## 🛠 实战操作

### 滚动触发的入场序列

1. **注册插件**：让 Agent 确认用到的插件（如 ScrollTrigger）已 `gsap.registerPlugin(...)`。
2. **搭 timeline**：用 `gsap.timeline({ scrollTrigger: { trigger: el, start: "top 80%" } })` 串行编排标题、副标题、CTA。
3. **调缓动**：入场用 `power2.out`，强调用 `back.out`，离场用 `power2.in`。
4. **看产出**：Agent 产出后滚动页面，观察入场顺序与缓动手感。

### 验收

1. timeline 播放顺序正确（标题 → 副标题 → CTA）。
2. 缓动符合分级（入场 `power2.out`、强调 `back.out`）。
3. 用到的插件已注册，控制台无报错。

## ✅ 总结

- timeline 管编排、ScrollTrigger 管滚动驱动、插件管高级效果、useGSAP 管 React 集成。
- 官方 skill 是学 GSAP 正确姿势的最佳来源，插件已全部免费。
- 下一步：[02-video-shotcraft.md](02-video-shotcraft.md)
