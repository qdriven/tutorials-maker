# 05 · 网页交互动效

> 让界面"活起来"的轻量动效：hover、入场、滚动跟随，可组合、有降级（2,757⭐）。

| 字段 | 值 |
| --- | --- |
| ID | `oil-motion` |
| 顺序 | 05 |
| 短标题 | 网页交互动效 |
| 分类 | 实战课 |
| 级别 | 入门 |
| 时长 | 30 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [oil-oil/oil-motion](https://github.com/oil-oil/oil-motion) |

**故事**：oil-motion 关注的不是大场景，而是界面里的细节动效：hover 抬升、入场 stagger、滚动跟随。轻量、可组合，让网页交互有手感。

**学习目标**：学完能给一组卡片加 hover 抬升 + 入场 stagger，并写好降级守卫。

**技能**：hover 动效、入场 stagger、滚动跟随、降级守卫

**摘要**：oil-motion 做"界面活起来"的细节动效：hover、入场、滚动跟随，轻量可组合，有降级守卫。

## 🎯 本课重点

- **重点用什么**：hover、入场、滚动跟随等细节动效。
- **完成什么**：给一组卡片加 hover 抬升 + 入场 stagger。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/oil-motion/prompt.md](../data/lessons/oil-motion/prompt.md) | 给 Agent 的练习 prompt |
| 验收清单 | [../data/lessons/oil-motion/checklist.md](../data/lessons/oil-motion/checklist.md) | 验收清单 |

## 🧱 基础操作

1. **装 skill**：`npx skills add oil-oil/oil-motion`。
2. **读 skill 文档**：装完后让 Agent 读该 skill 的 SKILL.md，理解它约束了什么。
3. **发第一条 prompt**：用四要素（产出形态、时长/规模、动效类型、验收标准）。

## 🛠 实战操作

### 给一组卡片加 hover 抬升 + 入场 stagger

1. **建卡片组**：准备 4–6 张等高卡片。
2. **加 hover**：hover 时卡片抬升 + 阴影加深，时长 200–300ms。
3. **加 stagger**：入场时卡片逐个浮入，间隔 80–120ms。
4. **看产出**：刷新页面看入场，逐张 hover 看手感。

### 验收

1. 交互响应及时：hover 抬升在 300ms 内完成。
2. 动效不喧宾夺主：抬升幅度克制，不影响阅读。
3. 降级守卫存在：`prefers-reduced-motion` 时跳过动效直接显示。

## ✅ 总结

- oil-motion 做细节动效：hover、入场、滚动跟随。
- 轻量可组合：动效要短、要克制、要有降级。
- 下一步：[06-pixelfx.md](06-pixelfx.md)
