# Remotion · 练习 prompt

> 给 Agent 的练习指令。用四要素：产出形态、时长/规模、动效类型、验收标准。

## prompt

用 Remotion 把一个 React 产品介绍组件渲染成 5 秒的产品开场动画 MP4。组件内用 <Sequence> 管理各元素的时间窗口：Logo 在 0-2 秒入场，产品名在 1-3 秒淡入，Slogan 在 2.5-5 秒展开。动画全部用 Web 技术实现（CSS transform/opacity 或 React 状态驱动），不引入视频素材。渲染时用 npx remotion render 导出 MP4，总时长与 Sequence 窗口对齐、恰好 5 秒。产出为一个可复现的 Remotion 项目（含 package.json 与渲染命令说明）以及最终的 MP4 文件。验收：MP4 时长 5 秒，各元素按 Sequence 窗口依次出现，渲染命令可一键复跑。

## 使用方式

1. 装好对应 skill（见课程文档）。
2. 把上面的 prompt 发给 Agent。
3. 按 checklist.md 验收。
