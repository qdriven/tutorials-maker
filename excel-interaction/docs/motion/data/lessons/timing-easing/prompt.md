# 时长与缓动 · 练习 prompt

> 给 Agent 的练习指令。用四要素：产出形态、时长/规模、动效类型、验收标准。

## prompt

为一个卡片列表入场设计完整的时间参数方案：列表共 5 张卡片。按 duration 分级——卡片入场属"过渡"级，统一 400ms（300-500ms 区间），主标题等展示元素用 600ms。easing 按三分类选用：入场用 ease-out（进入）、退场用 ease-in（离开）、需强调的首卡用 ease-in-out。5 张卡片用 stagger 依次入场，间隔 50ms（30-80ms 区间）。产出为时长/缓动参数说明，附 CSS 关键帧示例与 prefers-reduced-motion 降级守卫。验收：参数符合分级与三分类、stagger 在 30-80ms、降级后即时呈现。

## 使用方式

1. 装好对应 skill（见课程文档）。
2. 把上面的 prompt 发给 Agent。
3. 按 checklist.md 验收。
