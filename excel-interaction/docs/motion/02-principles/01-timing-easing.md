# 01 · 时间与缓动：duration、easing、stagger 的取舍

> 动画"对不对"，七成在时间参数。本课讲清 duration、easing、stagger 三个核心参数的取舍规则。

| 字段 | 值 |
| --- | --- |
| ID | `timing-easing` |
| 顺序 | 5 |
| 短标题 | 时间与缓动 |
| 分类 | 动画原则 |
| 级别 | 入门 → 进阶 |
| 时长 | 15 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [LottieFiles/motion-design-skill](https://github.com/LottieFiles/motion-design-skill) |

**故事**：同样的淡入，200ms 显得"硬"，800ms 显得"慢"。动效导演的第一判断永远是"这个动作该多快"——不是越流畅越好，而是越合适越好。

**学习目标**：学完能给一个动效配上合适的 duration、easing 与 stagger，并说清理由。

**技能**：duration 分级、easing 选型、stagger 编排、`prefers-reduced-motion` 降级

**摘要**：duration 按场景分级（微交互 100-200ms、过渡 300-500ms、展示 600ms+）；easing 分进入/离开/强调；stagger 做层次。

## 🎯 本课重点

- **重点用什么**：duration 分级表、easing 三分类、stagger 间隔规则。
- **完成什么**：给一个动效配齐三个时间参数，并解释为什么。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/timing-easing/prompt.md](../data/lessons/timing-easing/prompt.md) | 给 Agent 的动效参数练习 |

## 🧱 基础操作

1. **duration 分级**：
   - 微交互（按钮、开关、工具提示）：100–200ms
   - 过渡（页面切换、面板展开）：300–500ms
   - 展示（Hero 入场、产品特写）：600ms+
   - 原则：越频繁的动作越短，越隆重的动作越长。
2. **easing 三分类**：
   - 进入（ease-out）：快速启动、缓慢收尾，适合元素入场。
   - 离开（ease-in）：缓慢启动、快速收尾，适合元素退场。
   - 强调（ease-in-out / spring）：两端慢中间快，适合强调与回弹。
3. **stagger 间隔**：多个元素依次入场时，间隔 30–80ms 形成层次；超过 120ms 显得拖沓。

## 🛠 实战操作

### 配齐三个参数

```css
/* 一个卡片列表的入场：duration 400ms、ease-out、stagger 50ms */
.card {
  opacity: 0;
  transform: translateY(12px);
  animation: card-in 400ms ease-out both;
}
@keyframes card-in {
  to { opacity: 1; transform: none; }
}
/* stagger 用负 animation-delay */
.card:nth-child(1) { animation-delay: -0.05s; }
.card:nth-child(2) { animation-delay: -0.10s; }
.card:nth-child(3) { animation-delay: -0.15s; }
```

### 降级

```css
@media (prefers-reduced-motion: reduce) {
  .card { animation: none; opacity: 1; transform: none; }
}
```

### 验收

1. 入场节奏是否符合 duration 分级。
2. 缓动方向是否正确（入场 ease-out，退场 ease-in）。
3. 系统开启"减少动态效果"时是否即时呈现。

## ✅ 总结

- duration 按场景分级：微交互 100-200ms、过渡 300-500ms、展示 600ms+。
- easing 三分类：进入 ease-out、离开 ease-in、强调 ease-in-out/spring。
- stagger 间隔 30-80ms；`prefers-reduced-motion` 时全部归零。
- 下一步：[02-choreography.md](02-choreography.md) 讲编排与镜头。
