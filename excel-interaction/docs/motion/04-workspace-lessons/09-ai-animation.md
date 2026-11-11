# 09 · HTML 动画合集

> 17 个单文件 HTML 动画 skill 的合集：3D 可视化、PPT 风格演示、UI 美化。把它当"效果灵感库"用——挑一个、装一个、复现一个。

| 字段 | 值 |
| --- | --- |
| ID | `ai-animation` |
| 顺序 | 09 |
| 短标题 | HTML 动画合集 |
| 分类 | 实战课 |
| 级别 | 入门 |
| 时长 | 30 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [Unclecheng-li/AI_Animation](https://github.com/Unclecheng-li/AI_Animation) |

**故事**：与其从零想"做什么动画"，不如先翻现成的效果库。AI_Animation 把 17 个单文件 HTML 动画打包成 skill：3D 可视化、PPT 风格演示、UI 美化，每个自包含、装一个用一个。本课用它练"效果灵感库"的用法：挑 3 个喜欢的效果复现，记录关键参数，沉淀成自己的动效参数表。

**学习目标**：学完能从合集中挑选效果、让 Agent 复现并记录关键参数，建立自己的动效参数表。

**技能**：效果选型，单文件 HTML 动画，参数记录，灵感库，复现

**摘要**：17 个自包含 HTML 动画 skill 的合集，覆盖 3D 可视化/PPT 演示/UI 美化；当效果灵感库用，挑 3 个复现并记录参数。

## 🎯 本课重点

- **重点用什么**：效果选型 + 复现 + 参数记录三件事，把合集当灵感库而非终点。
- **完成什么**：从合集挑 3 个效果复现，形成一份带参数记录的动效参数表。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/ai-animation/prompt.md](../data/lessons/ai-animation/prompt.md) | 给 Agent 的复现练习 prompt |
| 验收清单 | [../data/lessons/ai-animation/checklist.md](../data/lessons/ai-animation/checklist.md) | 验收清单 |

## 🧱 基础操作

1. **装 skill**：`npx skills add Unclecheng-li/AI_Animation`（合集型，按需装其中单个效果 skill）。
2. **读 skill 文档**：装完后让 Agent 读 SKILL.md，浏览 17 个效果的清单与适用场景。
3. **发第一条 prompt**：用四要素（产出形态、时长/规模、动效类型、验收标准）。

## 🛠 实战操作

### 挑 3 个效果复现

1. **挑**：从 17 个效果中挑 3 个（建议覆盖不同类型：3D 可视化 / 演示 / UI 美化）。
2. **复现**：给 Agent 发 prompt，要求按原效果复现，产出单文件 HTML。
3. **记参数**：让 Agent 记录每个效果的关键参数（时长、缓动、循环方式、颜色/尺寸变量）。
4. **存档**：把 3 个 demo 与参数记录汇成一份动效参数表。

### 验收

1. 复现效果接近原效果：动效类型、节奏、观感与原效果一致（允许配色微调）。
2. 记录了关键参数：每个效果都有时长 / 缓动 / 循环方式 / 变量的记录。
3. 降级守卫存在：复现的 demo 带 `prefers-reduced-motion` 降级或明确注释说明。

## ✅ 总结

- 合集型仓库的正确用法是"灵感库"：挑 → 复现 → 记参数，而不是照搬全部。
- 单文件 HTML 动画自包含、易复现，是练手的好载体。
- 下一步：[10-design-motion-principles.md](10-design-motion-principles.md)
