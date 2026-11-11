# 01 · CSS keyframes + transition：零依赖的确定性动画

> 纯 CSS 动画没有运行时依赖、行为确定、可单步调试——是教学与生产都首选的底层手法。本课讲清 keyframes、transition 与负延迟 stagger。

| 字段 | 值 |
| --- | --- |
| ID | `css-keyframes` |
| 顺序 | 9 |
| 短标题 | CSS keyframes 与 transition |
| 分类 | 技术手法 |
| 级别 | 入门 |
| 时长 | 15 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [Jakubantalik/transitions.dev](https://github.com/Jakubantalik/transitions.dev)、[oil-oil/oil-motion](https://github.com/oil-oil/oil-motion) |

**故事**：本仓库自己的教程动画（hero 轨道、事件胶囊、流式光标）全部用纯 CSS keyframes 实现，没有引入任何动画库。原因：教学动画要求确定性、可单步、可降级——CSS 恰好全部满足。

**学习目标**：学完能用 keyframes 写循环动画、用 transition 写交互动画、用负延迟做 stagger。

**技能**：`@keyframes`、`animation` 简写、`transition`、负 `animation-delay`、`prefers-reduced-motion`

**摘要**：keyframes 管循环与关键帧，transition 管状态切换；负延迟让多元素错峰入场；`prefers-reduced-motion` 统一降级。

## 🎯 本课重点

- **重点用什么**：keyframes 与 transition 的分工、负延迟 stagger、降级守卫。
- **完成什么**：用纯 CSS 写一个带 stagger 入场的卡片列表，并加降级守卫。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/css-keyframes/prompt.md](../data/lessons/css-keyframes/prompt.md) | 给 Agent 的 CSS 动画练习 |

## 🧱 基础操作

1. **keyframes 管循环**：`@keyframes name { from {} to {} }` 定义关键帧，`animation: name 4s ease-in-out infinite` 应用。
2. **transition 管状态**：`transition: opacity .3s ease` 让属性变化平滑过渡，配合 class 切换或 `:hover`。
3. **负延迟 stagger**：`animation-delay: -0.8s` 让动画从中间开始，多元素用不同负延迟错峰。

## 🛠 实战操作

### 写一个 stagger 入场

```css
@keyframes card-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}
.card {
  opacity: 0;
  animation: card-in 400ms ease-out both;
}
.card:nth-child(1) { animation-delay: -0.05s; }
.card:nth-child(2) { animation-delay: -0.10s; }
.card:nth-child(3) { animation-delay: -0.15s; }
```

### 降级守卫

```css
@media (prefers-reduced-motion: reduce) {
  .card { animation: none; opacity: 1; transform: none; }
}
```

### 验收

1. 入场节奏是否符合 duration 分级（见 [../02-principles/01-timing-easing.md](../02-principles/01-timing-easing.md)）。
2. stagger 间隔是否在 30–80ms。
3. 降级后是否即时呈现。

## ✅ 总结

- keyframes 管循环与关键帧，transition 管状态切换，二者分工明确。
- 负延迟是 stagger 的零成本实现；`prefers-reduced-motion` 是必备守卫。
- 纯 CSS 无运行时依赖，适合教学与确定性场景。
- 下一步：[02-gsap.md](02-gsap.md) 讲复杂时间线。
