# 07 · 动效设计原则

> LottieFiles 出品的动效原则 skill：时间、缓动、编排、情感意图——不教你写代码，而是教 Agent"像动效导演一样思考"。

| 字段 | 值 |
| --- | --- |
| ID | `motion-design-skill` |
| 顺序 | 07 |
| 短标题 | 动效设计原则 |
| 分类 | 实战课 |
| 级别 | 入门 |
| 时长 | 30 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [LottieFiles/motion-design-skill](https://github.com/LottieFiles/motion-design-skill) |

**故事**：同样是"弹一下"，设计师的弹和你随手写的 ease 区别在哪？LottieFiles 的 skill 给出答案：时间分配、缓动曲线、编排层次、情感意图四层约束，并把迪士尼 12 原则适配到 UI 动效。它不产出代码，而是给 Agent 定审美基准——适合作为每个动效项目的"默认价值观"。

**学习目标**：学完能用四层约束（timing / easing / 编排 / 意图）评审一段动效，并给出可落地的改进点。

**技能**：timing，easing，编排节奏，情感意图，动效评审

**摘要**：时间、缓动、编排、意图四层约束 + 迪士尼 12 原则 UI 适配；是审美基准而非代码库，任何动画系统通用。

## 🎯 本课重点

- **重点用什么**：timing、easing、编排、意图四层原则约束，以及评审（audit）的用法。
- **完成什么**：用该 skill 给一段粗糙动效做原则评审，输出可落地改进点。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/motion-design-skill/prompt.md](../data/lessons/motion-design-skill/prompt.md) | 给 Agent 的动效评审练习 |
| 验收清单 | [../data/lessons/motion-design-skill/checklist.md](../data/lessons/motion-design-skill/checklist.md) | 验收清单 |

## 🧱 基础操作

1. **装 skill**：`npx skills add LottieFiles/motion-design-skill`。
2. **读 skill 文档**：装完后让 Agent 读 SKILL.md，理清四层约束与迪士尼 12 原则的对应关系。
3. **发第一条 prompt**：用四要素（产出形态、时长/规模、动效类型、验收标准）。

## 🛠 实战操作

### 粗糙动效的原则评审

1. **备素材**：准备或让 Agent 写一段"能动但粗糙"的动画（如无缓动的弹跳入场）。
2. **开评审**：让 Agent 按四层约束逐条评审：timing（时长分配是否合理）、easing（曲线是否自然）、编排（元素层次是否清晰）、意图（这段动效表达什么情感）。
3. **提改进**：要求每个问题给出可落地改进（如"入场从 linear 改为 ease-out，时长 0.6s"）。
4. **重渲染**：让 Agent 按改进点重做，对比前后差异。

### 验收

1. 评审覆盖 timing / easing / 编排 / 意图四层，不漏层。
2. 每个改进点可落地（含具体数值或曲线），不是"再打磨一下"式空话。
3. 有降级意识：评审结论兼顾 `prefers-reduced-motion` 等降级路径。

## ✅ 总结

- 动效设计原则是审美基准：时间、缓动、编排、意图四层约束，任何动画系统通用。
- LottieFiles 把迪士尼 12 原则适配到 UI，适合给 Agent 设定"默认价值观"。
- 下一步：[08-video-talkcraft.md](08-video-talkcraft.md)
