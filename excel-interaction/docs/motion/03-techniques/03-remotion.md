# 03 · Remotion：用 React 组件渲染视频

> Remotion 把"写视频"变成"写 React 组件"——视频是声明式状态的时间切片。本课讲清它的核心模型与适用边界。

| 字段 | 值 |
| --- | --- |
| ID | `remotion` |
| 顺序 | 11 |
| 短标题 | Remotion |
| 分类 | 技术手法 |
| 级别 | 进阶 |
| 时长 | 20 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft)、[Vincentwei1021/video-talkcraft](https://github.com/Vincentwei1021/video-talkcraft) |

**故事**：以前做一条产品宣传片，要么用 AE 逐帧做，要么用模板套。Remotion 让这件事变成"用 React 组件描述每一帧"——视频是声明式状态的时间切片，改文案就是改 props，渲染就是 `npx remotion render`。

**学习目标**：学完能用 Remotion 把 React 组件渲染成 MP4，理解 Sequence、动画与渲染命令。

**技能**：`@remotion/react`、`<Sequence>`、`calculateMetadata`、`npx remotion render`

**摘要**：Remotion = React 组件 + 时间轴；`Sequence` 管时间窗口，动画用 Web 动画技术（CSS/GSAP），渲染出 MP4。

## 🎯 本课重点

- **重点用什么**：组件即帧、`Sequence` 时间窗口、渲染命令。
- **完成什么**：用 Remotion 渲染一条 5 秒的产品开场动画。

## ��� 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/remotion/prompt.md](../data/lessons/remotion/prompt.md) | 给 Agent 的 Remotion 练习 |

## 🧱 基础操作

1. **装 skill/脚手架**：`npx skills add Vincentwei1021/video-shotcraft` 或 `npx create-video`。
2. **组件即帧**：一个 React 组件 = 视频的一帧内容，props 驱动内容与动画。
3. **Sequence 管时间窗口**：`<Sequence from={0} durationInFrames={30}>` 在时间轴上圈定一段。
4. **渲染**：`npx remotion render Root out.mp4`。

## 🛠 实战操作

### 写一个开场组件

```jsx
import { Sequence, useCurrentFrame, useVideoConfig } from "remotion";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div>
      <Sequence from={0} durationInFrames={fps * 5}>
        <h1 style={{ opacity: frame / (fps * 5) }}>欢迎</h1>
      </Sequence>
    </div>
  );
};
```

### 渲染

```bash
npx remotion render Root out.mp4
```

### 验收

1. 渲染出的 MP4 时长是否与 `Sequence` 对齐。
2. 动画是否用 Web 动画技术（CSS/GSAP）而非视频专用工具。
3. 渲染速度是否可接受（可改分辨率/帧率做权衡）。

## ✅ 总结

- Remotion 把视频变成"React 组件 + 时间轴"，改内容就是改 props。
- `Sequence` 圈定时间窗口，动画复用 Web 技术，渲染一条命令。
- 下一步：[04-scroll-driven.md](04-scroll-driven.md) 讲滚动/鼠标/触摸驱动。
