# 10 · 动效原则库

> 动效原则的系统整理：三重视角（克制与速度／产品打磨／表现力），build 与 audit 双模式。与 07 课互补——本课偏"原则推导与案例对照"。

| 字段 | 值 |
| --- | --- |
| ID | `design-motion-principles` |
| 顺序 | 10 |
| 短标题 | 动效原则库 |
| 分类 | 实战课 |
| 级别 | 入门 |
| 时长 | 30 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [kylezantos/design-motion-principles](https://github.com/kylezantos/design-motion-principles) |

**故事**：动效原则不是背条款，而是理解每条原则背后的"为什么"，才能在不同项目语境里加权。design-motion-principles 把原则拆成三套哲学：克制与速度、产品打磨、表现力，并提供 build 与 audit 双模式——既能从原则出发做动效，也能反向审查现有动效。本课用它给一个产品页动效做对照审查。

**学习目标**：学完能用原则库逐条对照审查一个真实动效，发现偏差并给出修正建议。

**技能**：三重视角原则，build/audit 双模式，案例对照，偏差分析，修正建议

**摘要**：三套动效哲学（克制/打磨/表现力）可按项目语境加权；build 与 audit 双模式，既能做动效也能审动效。

## 🎯 本课重点

- **重点用什么**：三重视角原则 + audit 模式，用原则库做对照审查。
- **完成什么**：用原则库给一个产品页动效做对照审查，输出偏差清单与修正建议。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/design-motion-principles/prompt.md](../data/lessons/design-motion-principles/prompt.md) | 给 Agent 的对照审查练习 |
| 验收清单 | [../data/lessons/design-motion-principles/checklist.md](../data/lessons/design-motion-principles/checklist.md) | 验收清单 |

## 🧱 基础操作

1. **装 skill**：`npx skills add kylezantos/design-motion-principles`。
2. **读 skill 文档**：装完后让 Agent 读 SKILL.md，理清三套哲学各自的适用语境与 audit 模式流程。
3. **发第一条 prompt**：用四要素（产出形态、时长/规模、动效类型、验收标准）。

## 🛠 实战操作

### 产品页动效的对照审查

1. **备素材**：准备或让 Agent 写一个带多段动效的产品页（如 hero 入场 + 卡片 hover + 滚动渐入）。
2. **开 audit**：让 Agent 进入 audit 模式，按三套哲学逐条对照：克制与速度（是否过度运动）、产品打磨（细节是否到位）、表现力（是否有记忆点）。
3. **记偏差**：每条原则下记录"符合 / 偏差 / 缺失"，偏差附具体表现（如"卡片 hover 用了 0.8s，超过克制阈值"）。
4. **给修正**：每条偏差给修正建议，标注影响的是哪套哲学的权重。

### 验收

1. 逐条对照原则：三套哲学均有覆盖，不是只评一条。
2. 发现并记录偏差：偏差有具体表现描述，不是"感觉不好"式判断。
3. 给出修正建议：每条偏差有可执行的修正方向，并说明权衡了哪套哲学的权重。

## ✅ 总结

- 原则库的价值在"推导与加权"：三套哲学按项目语境取舍，比背单条条款更实用。
- audit 模式是动效审查的利器：逐条对照、记录偏差、给修正建议。
- 下一步：[11-spritesheet-generator.md](11-spritesheet-generator.md)
