# 04 · 万物解释动画

> 把任意概念或产品变成"问题引入 → 核心机制演示 → 总结"的解释型动画（2,967⭐）。

| 字段 | 值 |
| --- | --- |
| ID | `anything2explainer` |
| 顺序 | 04 |
| 短标题 | 万物解释动画 |
| 分类 | 实战课 |
| 级别 | 进阶 |
| 时长 | 30 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [Vincentwei1021/anything2explainer](https://github.com/Vincentwei1021/anything2explainer) |

**故事**：anything2explainer 把抽象概念变成解释动画：结构固定为问题引入、核心机制演示、总结。用简单图形加标注讲清机制，不堆特效。

**学习目标**：学完能为抽象概念写解释动画 prompt，并验收其结构是否完整。

**技能**：解释动画、结构三段式、图形简化、标注系统

**摘要**：解释动画 = 引入（为什么）→ 演示（怎么做）→ 总结（记住什么）。图形简化到位、标注清晰。

## 🎯 本课重点

- **重点用什么**：解释动画的三段结构与图形简化。
- **完成什么**：选一个抽象概念（如"缓存"）写解释动画 prompt。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/anything2explainer/prompt.md](../data/lessons/anything2explainer/prompt.md) | 给 Agent 的练习 prompt |
| 验收清单 | [../data/lessons/anything2explainer/checklist.md](../data/lessons/anything2explainer/checklist.md) | 验收清单 |

## 🧱 基础操作

1. **装 skill**：`npx skills add Vincentwei1021/anything2explainer`。
2. **读 skill 文档**：装完后让 Agent 读该 skill 的 SKILL.md，理解它约束了什么。
3. **发第一条 prompt**：用四要素（产出形态、时长/规模、动效类型、验收标准）。

## 🛠 实战操作

### 给"缓存"写解释动画

1. **定概念**：选一个抽象概念（如"缓存"），写一句"为什么需要它"。
2. **列三段**：引入（为什么慢）→ 演示（缓存怎么工作）→ 总结（记住什么）。
3. **画图形**：用简单图形（方块、箭头、笑脸/哭脸）表达读写命中与未命中。
4. **加标注**：每个图形配一行标注，动画里标注跟随出现。

### 验收

1. 结构完整：引入、演示、总结三段都在。
2. 图形简化到位：没有多余装饰，每个图形服务于一个信息点。
3. 标注清晰：标注跟随图形出现，时长够读完。

## ✅ 总结

- 解释动画的骨架是三段式：引入、演示、总结。
- 图形简化 + 标注是讲清抽象概念的关键。
- 下一步：[05-oil-motion.md](05-oil-motion.md)
