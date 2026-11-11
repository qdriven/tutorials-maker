# CSS keyframes · 验收清单

> 验收时逐条打勾。全部通过才算完成。

| # | 验收项 | 通过 |
| --- | --- | --- |
| 1 | keyframes 与 transition 分工正确：keyframes 只管入场，transition 只管交互态 | ☐ |
| 2 | stagger 用负延迟实现，卡片逐个错峰入场 | ☐ |
| 3 | 相邻卡片入场间隔在 30-80ms | ☐ |
| 4 | prefers-reduced-motion 降级守卫存在，开启后无动画直接呈现最终态 | ☐ |
