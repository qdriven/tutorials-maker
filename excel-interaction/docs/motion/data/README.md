# data · 数据索引

> 本目录存放 `docs/motion/` 各课的配套数据：练习 prompt 与验收清单。每课一个子目录，命名与课程 ID 一致。

| 字段 | 值 |
| --- | --- |
| ID | `motion-data` |
| 顺序 | — |
| 短标题 | 数据索引 |
| 分类 | 数据 |
| 级别 | — |
| 时长 | — |
| 数据类型 | 数据 |
| 来源 | 各课 |

**故事**：每课有两个配套文件——`prompt.md`（给 Agent 的练习 prompt）与 `checklist.md`（验收清单）。课程文档通过相对路径引用它们，实现"课程 → 数据"解耦。

**学习目标**：学完能按课程 ID 找到对应的 prompt 与 checklist。

**技能**：数据索引、prompt、checklist

**摘要**：每课一个 `<id>/` 目录，含 `prompt.md` 与 `checklist.md`；课程文档用相对路径引用。

## 🎯 本课重点

- **重点用什么**：目录结构与命名约定。
- **完成什么**：能按课程 ID 定位数据文件。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 学习路径课 | `lessons/choose/`、`lessons/install/`、`lessons/first-animation/` | 01 模块三课 |
| 原则课 | `lessons/timing-easing/`、`lessons/choreography/`、`lessons/disney12/` | 02 模块三课 |
| 技术手法课 | `lessons/css-keyframes/`、`lessons/gsap/`、`lessons/remotion/`、`lessons/scroll-driven/`、`lessons/3d-webgl/` | 03 模块五课 |
| 实战课 | `lessons/gsap-skills/` … `lessons/iart-motion-skills/` | 04 模块 15 课 |

## 🧱 基础操作

1. **命名约定**：子目录名 = 课程 ID（小写连字符）。
2. **文件约定**：每目录含 `prompt.md`（练习 prompt）与 `checklist.md`（验收清单）。

## 🛠 实战操作

### 目录结构

```text
data/
├── README.md
└── lessons/
    ├── choose/
    │   ├── prompt.md
    │   └── checklist.md
    ├── install/
    ├── first-animation/
    ├── timing-easing/
    ├── choreography/
    ├── disney12/
    ├── css-keyframes/
    ├── gsap/
    ├── remotion/
    ├── scroll-driven/
    ├── 3d-webgl/
    ├── gsap-skills/
    ├── video-shotcraft/
    ├── transitions-dev/
    ├── anything2explainer/
    ├── oil-motion/
    ├── pixelfx/
    ├── motion-design-skill/
    ├── video-talkcraft/
    ├── ai-animation/
    ├── design-motion-principles/
    ├── spritesheet-generator/
    ├── motion-video-kit/
    ├── motionmaxxing/
    ├── claudedesignskills/
    └── iart-motion-skills/
```

### 验收

1. 每个课程 ID 都有对应目录。
2. 每个目录含 `prompt.md` 与 `checklist.md`。
3. 课程文档中的相对路径能正确解析到本目录。

## ✅ 总结

- 每课一个 `<id>/` 目录，含 `prompt.md` 与 `checklist.md`。
- 课程文档用相对路径引用，实现解耦。
