# GSAP官方skill · 练习 prompt

> 给 Agent 的练习指令。用四要素：产出形态、时长/规模、动效类型、验收标准。

## prompt

先安装 greensock/gsap-skills skill，并让 Agent 读其 SKILL.md。然后做一个滚动触发的复杂入场动画 demo，单页含标题、副标题、CTA 三段。动效类型：用 gsap.timeline 串行编排三段入场（标题 → 副标题 → CTA），timeline 挂 ScrollTrigger（trigger 为区块、start: top 80%），入场用 power2.out、强调用 back.out。用到的插件须 gsap.registerPlugin 注册，控制台无报错。验收标准：滚动到区块时三段顺序入场、触发位置正确。

## 使用方式

1. 装好对应 skill（见课程文档）。
2. 把上面的 prompt 发给 Agent。
3. 按 checklist.md 验收。
