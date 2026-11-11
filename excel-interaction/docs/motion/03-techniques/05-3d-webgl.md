# 05 · 3D / WebGL：Three.js、R3F、Babylon.js 选型

> 三维动效是网页动效的高配：需要 WebGL 渲染管线。本课讲清三个主流库的适用边界与 Agent 工作流。

| 字段 | 值 |
| --- | --- |
| ID | `3d-webgl` |
| 顺序 | 13 |
| 短标题 | 3D / WebGL |
| 分类 | 技术手法 |
| 级别 | 进阶 |
| 时长 | 20 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) |

**故事**：网页上的"产品 360° 旋转展示"、"滚动穿过三维空间"——这类动效背后是 WebGL 渲染管线。Three.js 是底层库，R3F 是 React 封装，Babylon.js 偏游戏/引擎向。选哪个，取决于你的 React 依赖与场景复杂度。

**学习目标**：学完能在 Three.js / R3F / Babylon.js 间选型，并知道 Agent 怎么用它们产出三维动效。

**技能**：Three.js、React Three Fiber、Babylon.js、WebGL、GLSL

**摘要**：Three.js 底层灵活、R3F 贴合 React、Babylon.js 引擎向；三维动效 = 场景/相机/几何体/材质/光照/动画循环。

## 🎯 本课重点

- **重点用什么**：三个库的适用边界与 Agent 工作流。
- **完成什么**：用 R3F 搭一个可旋转的三维卡片，并说明为什么选它。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/3d-webgl/prompt.md](../data/lessons/3d-webgl/prompt.md) | 给 Agent 的 3D 练习 |

## 🧱 基础操作

1. **Three.js（底层）**：`Scene` + `Camera` + `Renderer` + `requestAnimationFrame` 循环，灵活但样板代码多。
2. **R3F（React 封装）**：`<Canvas>` + JSX 写场景，声明式、与 React 状态打通，适合 React 项目。
3. **Babylon.js（引擎向）**：内置物理、光照、材质系统，适合复杂交互/游戏化场景。

## 🛠 实战操作

### R3F 搭一个可旋转卡片

```jsx
import { Canvas } from "@react-three/fiber";
import { useRef, useEffect } from "react";

const Card = () => {
  const ref = useRef();
  useEffect(() => {
    let raf;
    const loop = () => { ref.current.rotation.y += 0.01; raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <mesh ref={ref}><boxGeometry args={[2, 3, 0.1]} /><meshStandardMaterial color="#6cf" /></mesh>;
};

export default () => (
  <Canvas><ambientLight /><directionalLight position={[5, 5, 5]} /><Card /></Canvas>
);
```

### 选型表

| 需求 | 首选 | 理由 |
| --- | --- | --- |
| React 项目里的三维点缀 | R3F | 声明式、与 React 状态打通 |
| 完全自定义渲染管线 | Three.js | 底层灵活、无抽象 |
| 游戏化/物理交互 | Babylon.js | 内置物理与材质系统 |

### 验收

1. 三维场景是否随滚动/鼠标交互（见 [04-scroll-driven.md](04-scroll-driven.md)）。
2. 是否做了移动端降级（关停重效果或降几何体复杂度）。
3. Agent 产出的 3D 代码是否可直接运行、无缺失依赖。

## ✅ 总结

- Three.js 底层灵活、R3F 贴合 React、Babylon.js 引擎向。
- 三维动效 = 场景/相机/几何体/材质/光照/动画循环；选型看 React 依赖与场景复杂度。
- 下一步：进入 [../04-workspace-lessons/](../04-workspace-lessons/) 用真实仓库做 15 个实战课。
