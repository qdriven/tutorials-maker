# 3D/WebGL 设计栈 · 练习 prompt

> 给 Agent 的练习指令。用四要素：产出形态、时长/规模、动效类型、验收标准。

## prompt

用 claudedesignskills（3D/WebGL 栈）搭一个可旋转的三维卡片。产出形态：1 个 React + React Three Fiber 组件；规模：1 个可旋转立方体卡片 + 光照。请用 R3F 的 `<Canvas>` 写场景，加 `ambientLight` + `directionalLight`，用 `requestAnimationFrame`（或 `useFrame`）驱动旋转。做移动端降级——关停重效果或降几何体复杂度。这是横切技术（见 03-techniques/05-3d-webgl.md）：先确认 React 依赖与场景复杂度，再在 Three.js / R3F / Babylon.js 间选型。验收标准见 checklist.md。

## 使用方式

1. 装好对应 skill（见课程文档）。
2. 把上面的 prompt 发给 Agent。
3. 按 checklist.md 验收。
