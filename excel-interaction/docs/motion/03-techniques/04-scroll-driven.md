# 04 · 滚动驱动：scroll / mouse / touch 跟随

> 滚动驱动让动画"跟着用户的手指走"——内容不是按时间播，而是按滚动进度播。本课讲清原生 CSS scroll-driven 与 GSAP ScrollTrigger 两条路线。

| 字段 | 值 |
| --- | --- |
| ID | `scroll-driven` |
| 顺序 | 12 |
| 短标题 | 滚动驱动 |
| 分类 | 技术手法 |
| 级别 | 进阶 |
| 时长 | 20 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [oil-oil/oil-motion](https://github.com/oil-oil/oil-motion) |

**故事**：一个产品页往下滚，hero 图随滚动缓慢放大、标题字逐行淡出——这种"整页是一条时间轴"的体验，靠的是滚动驱动：动画进度 = 滚动位置。

**学习目标**：学完能用原生 CSS `animation-timeline` 或 GSAP ScrollTrigger 做滚动驱动动画，并知道鼠标/触摸驱动的差异。

**技能**：CSS `animation-timeline: scroll()`、`view-timeline`、GSAP ScrollTrigger、鼠标/触摸驱动

**摘要**：滚动驱动 = 动画进度绑定滚动位置；原生 `animation-timeline` 零依赖但兼容性有限，ScrollTrigger 功能全、兼容性好。鼠标/触摸驱动是滚动驱动的变体。

## 🎯 本课重点

- **重点用什么**：原生 CSS scroll-driven 与 GSAP ScrollTrigger 两条路线的取舍。
- **完成什么**：做一个"滚动到某区块时元素入场 + 跟随滚动缩放"的整页动效。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/scroll-driven/prompt.md](../data/lessons/scroll-driven/prompt.md) | 给 Agent 的滚动驱动练习 |

## 🧱 基础操作

1. **原生 CSS scroll-driven**：`animation-timeline: scroll(root)` 把动画进度绑定滚动；`view-timeline: view()` 绑定视口内元素。
2. **GSAP ScrollTrigger**：`scrollTrigger: { trigger, start, end }` 圈定触发区间，动画随滚动进度播放。
3. **鼠标/触摸驱动**：监听 `mousemove`/`pointermove`，把坐标映射为动画进度——比滚动驱动更自由，但要小心性能与降级。

## 🛠 实战操作

### 原生 CSS 路线（零依赖）

```css
.hero {
  animation: hero-zoom linear both;
  animation-timeline: scroll(root);
}
@keyframes hero-zoom {
  from { transform: scale(1); }
  to { transform: scale(1.3); }
}
```

### GSAP 路线（功能全）

```js
gsap.fromTo(".section-title",
  { y: 60, opacity: 0 },
  {
    y: 0, opacity: 1, ease: "none",
    scrollTrigger: { trigger: ".section", start: "top 70%", end: "top 20%", scrub: true },
  });
```

### 鼠标驱动（视差）

```js
window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
  layer.style.transform = `translateX(${x * 20}px)`;
});
```

### 验收

1. 滚动时动画进度是否平滑跟随（无跳变）。
2. 原生 `animation-timeline` 不支持时是否有 ScrollTrigger 兜底。
3. 鼠标驱动是否做了 `prefers-reduced-motion` 与节流。

## ✅ 总结

- 滚动驱动 = 动画进度绑定滚动位置；原生 CSS 零依赖、ScrollTrigger 功能全。
- 鼠标/触摸驱动是自由变体，注意性能与降级。
- 下一步：[05-3d-webgl.md](05-3d-webgl.md) 讲三维场景。
