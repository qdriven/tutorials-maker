# 03 · 页面转场库

> 专注页面/视图之间的过渡转场，让 SPA 路由切换有视觉连续性（6,010⭐）。

| 字段 | 值 |
| --- | --- |
| ID | `transitions-dev` |
| 顺序 | 03 |
| 短标题 | 页面转场库 |
| 分类 | 实战课 |
| 级别 | 入门 |
| 时长 | 30 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [Jakubantalik/transitions.dev](https://github.com/Jakubantalik/transitions.dev) |

**故事**：transitions.dev 只做一件事——页面与视图之间的过渡。它不追求全页动效，而是让路由切换有流畅的视觉连续性。轻量、易接入、降级后仍可用。

**学习目标**：学完能给两个路由页加一个滑动 + 淡入过渡，并知道降级守卫怎么写。

**技能**：页面转场、路由过渡、视觉连续性、降级守卫

**摘要**：transitions.dev 专注转场本身：让 SPA 路由切换有视觉连续性，降级后仍可用。

## 🎯 本课重点

- **重点用什么**：页面/视图之间的过渡转场。
- **完成什么**：给两个路由页加一个滑动 + 淡入的过渡。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/transitions-dev/prompt.md](../data/lessons/transitions-dev/prompt.md) | 给 Agent 的练习 prompt |
| 验收清单 | [../data/lessons/transitions-dev/checklist.md](../data/lessons/transitions-dev/checklist.md) | 验收清单 |

## 🧱 基础操作

1. **装 skill**：`npx skills add Jakubantalik/transitions.dev`。
2. **读 skill 文档**：装完后让 Agent 读该 skill 的 SKILL.md，理解它约束了什么。
3. **发第一条 prompt**：用四要素（产出形态、时长/规模、动效类型、验收标准）。

## 🛠 实战操作

### 给两个路由页加过渡

1. **装库**：`npm install transitions.dev`（或按 skill 文档）。
2. **包住路由**：用库的过渡组件包住两个路由页（A → B）。
3. **定动效**：A 向右滑出 + 淡出，B 从左滑入 + 淡入。
4. **看产出**：在两个路由间来回切换，观察过渡手感。

### 验收

1. 过渡流畅，无闪烁、无跳帧。
2. 方向与叙事一致（前进/后退方向相反）。
3. 降级守卫存在：无 JS 或 `prefers-reduced-motion` 时直接切换页面。

## ✅ 总结

- transitions.dev 专注转场本身，不做全页动效。
- 视觉连续性 = 方向 + 时长 + 缓动三者一致。
- 下一步：[04-anything2explainer.md](04-anything2explainer.md)
