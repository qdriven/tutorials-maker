# 滚动驱动 · 练习 prompt

> 给 Agent 的练习指令。用四要素：产出形态、时长/规模、动效类型、验收标准。

## prompt

做一个滚动驱动的整页动效 demo，单页结构。动效类型：hero 区大图随页面滚动缓慢放大（scale 1→1.3），下方三行标题随滚动逐行淡出。请用原生 CSS animation-timeline: scroll() 实现；浏览器不支持时用 GSAP ScrollTrigger 兜底。若做鼠标驱动视差，须加节流与 prefers-reduced-motion 降级。验收标准：动画进度平滑跟随滚动位置，无跳变，兜底方案生效。

## 使用方式

1. 装好对应 skill（见课程文档）。
2. 把上面的 prompt 发给 Agent。
3. 按 checklist.md 验收。
