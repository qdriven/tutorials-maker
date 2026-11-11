# CSS keyframes · 练习 prompt

> 给 Agent 的练习指令。用四要素：产出形态、时长/规模、动效类型、验收标准。

## prompt

用纯 CSS（不引入任何 JS 动效库）写一个卡片列表入场动画页面：共 6-8 张卡片，整体做带 stagger 的入场效果。用 @keyframes 定义卡片的入场动画（位移 + 透明度），用负延迟（animation-delay 取负值，配合 CSS 变量或 nth-child 递增）实现卡片逐个错峰出现，相邻卡片间隔控制在 30-80ms。注意 keyframes 与 transition 的分工：keyframes 只管入场动画，transition 只管悬停等交互态。最后加 prefers-reduced-motion 媒体查询降级守卫，用户开启"减少动态"时跳过动画直接显示最终态。产出为单个 HTML 文件，双击即可在浏览器运行。验收：加载后卡片依次入场、间隔 30-80ms，悬停有过渡反馈，开启系统减少动态后无动画直接呈现。

## 使用方式

1. 装好对应 skill（见课程文档）。
2. 把上面的 prompt 发给 Agent。
3. 按 checklist.md 验收。
