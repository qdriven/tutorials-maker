# 14 · 3D/WebGL 设计栈

> 这个仓库是 3D/WebGL 设计动效的 skill 合集：Three.js / R3F / Babylon.js 选型与工作流一网打尽——1,212 颗星，是进入 3D 动效的技术地图。

| 字段 | 值 |
| --- | --- |
| ID | `claudedesignskills` |
| 顺序 | 14 |
| 短标题 | 3D/WebGL 设计栈 |
| 分类 | 实战课 |
| 级别 | 进阶 |
| 时长 | 30 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) |

**故事**：网页动效的尽头是 3D，但 Three.js 与 R3F 怎么选、Babylon.js 何时用、移动端如何降级，都是坑。这个仓库把 27 个插件 / 22 个 skill 组织成 3D/WebGL 设计栈，让 Agent 按场景选型，而不是从零手写 WebGL。

**学习目标**：学完能用 R3F 搭一个可旋转的三维卡片，处理移动端降级与基础交互，代码可直接运行。

**技能**：R3F，Three.js，三维场景，交互控制，移动端降级

**摘要**：3D/WebGL 的选型与工作流是横切技术。本课用 R3F 搭可旋转三维卡片，验收可交互、有降级、能直接跑。

## 🎯 本课重点

- **重点用什么**：R3F（React Three Fiber）搭建三维场景与交互控制；选型参考 [../03-techniques/05-3d-webgl.md](../03-techniques/05-3d-webgl.md)。
- **完成什么**：一个可旋转的三维卡片组件，支持移动端降级，代码可直接运行。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/claudedesignskills/prompt.md](../data/lessons/claudedesignskills/prompt.md) | 给 Agent 的练习 prompt |
| 验收清单 | [../data/lessons/claudedesignskills/checklist.md](../data/lessons/claudedesignskills/checklist.md) | 验收清单 |

## 🧱 基础操作

1. **装 skill**：`npx skills add freshtechbro/claudedesignskills`（或该仓库的实际安装方式）。
2. **读 skill 文档**：装完后让 Agent 读该 skill 的 SKILL.md，理解它约束了什么（库选型、工作流、性能约束）。
3. **发第一条 prompt**：用四要素（产出形态、时长/规模、动效类型、验收标准）。

## 🛠 实战操作

### 用 R3F 搭可旋转三维卡片

1. **装依赖**：在项目里装 `three`、`@react-three/fiber`、`@react-three/drei`。
2. **写卡片组件**：用 `mesh` + `boxGeometry` 建卡片，`useFrame` 驱动自动旋转，`OrbitControls` 提供拖拽交互。

```jsx
function Card() {
  const ref = useRef();
  useFrame((_, delta) => (ref.current.rotation.y += delta * 0.5));
  return (
    <mesh ref={ref}>
      <boxGeometry args={[2, 3, 0.05]} />
      <meshStandardMaterial color="#60a5fa" />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight />
      <directionalLight position={[5, 5, 5]} />
      <Card />
      <OrbitControls />
    </Canvas>
  );
}
```

3. **加降级**：检测 WebGL 不可用时渲染静态 2D 预览图；系统开启"减少动态效果"时停掉自动旋转。
4. **跑起来**：`npm run dev` 打开页面，验证拖拽旋转与移动端降级。

### 验收

1. 三维场景可交互：拖拽可旋转视角，卡片自动旋转，光照正常。
2. 移动端降级：无 WebGL 环境显示 2D 静态预览，不报错、不白屏。
3. 代码可直接运行：复制进 React 项目即可启动，无版本/依赖问题。

## ✅ 总结

- 3D/WebGL 的选型与工作流是横切技术：本课的 R3F 卡片是入口，深水区看 [../03-techniques/05-3d-webgl.md](../03-techniques/05-3d-webgl.md)。
- 移动端降级与 `prefers-reduced-motion` 是 3D 页面的必做项，不是可选优化。
- 下一步：[15-iart-motion-skills.md](15-iart-motion-skills.md)
