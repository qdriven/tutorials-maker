# GSAP · 练习 prompt

> 给 Agent 的练习指令。用四要素：产出形态、时长/规模、动效类型、验收标准。

## prompt

用 GSAP 做一个滚动触发的入场序列页面：一个 Hero 区块，包含主标题、副标题、CTA 按钮三个元素。用 gsap.timeline() 编排入场顺序：主标题 → 副标题 → CTA，依次淡入上移。用 ScrollTrigger 插件把 timeline 绑定到滚动上，当 Hero 区块进入视口时触发播放，离开视口后重置、可重复触发。缓动统一用 ease-out 并按元素分级：标题用较弱的缓动（如 power1.out），CTA 用较强的缓动（如 power3.out），让视觉焦点收束到按钮。记得在代码中显式注册插件（gsap.registerPlugin(ScrollTrigger)）。产出为单个 HTML 文件，用 CDN 引入 GSAP 即可。验收：滚动到该区块时标题、副标题、CTA 按顺序入场，缓动符合分级，离开再进入可重复触发。

## 使用方式

1. 装好对应 skill（见课程文档）。
2. 把上面的 prompt 发给 Agent。
3. 按 checklist.md 验收。
