# 04 · 实战课（15 个仓库逐条精读）

> 调研了 15 个 top GitHub 仓库，每个对应一课：装 skill → 发 prompt → 验收 → 迭代。本模块是"Agent 动画 skill"调研的落地部分。

| 字段 | 值 |
| --- | --- |
| ID | `workspace-lessons` |
| 顺序 | 14 |
| 短标题 | 实战课总览 |
| 分类 | 实战课 |
| 级别 | 入门 → 进阶 |
| 时长 | 每课 20–40 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [05-research/sources.md](../05-research/sources.md) 中的 15 个仓库 |

**故事**：前三个模块讲了原则与手法，本模块直接上真实仓库：每个仓库装一个 skill、发一条 prompt、看 Agent 产出什么动画，再按验收清单打分。这是"调研 → 课程"闭环的最后一环。

**学习目标**：学完能把任意一个 Agent 动画 skill 装起来、用起来、评起来。

**技能**：skill 安装、prompt 四要素、验收清单、迭代

**摘要**：15 课覆盖五大类：网页动效、产品宣传片、口播视频、动效原则、像素/2D 特效（另含 3D/WebGL 横切）。每课结构一致：装 skill → 发 prompt → 验收 → 迭代。

## 🎯 本课重点

- **重点用什么**：15 课的统一结构与每课的验收标准。
- **完成什么**：按顺序跑完 15 课，每课产出一个可验收的动画 demo。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 调研清单 | [../05-research/sources.md](../05-research/sources.md) | 15 仓库的来源与结论 |
| 各课数据 | `../data/lessons/<id>/` | 每课的 prompt 与 checklist |

## 🧱 基础操作

1. **读来源**：先看 [../05-research/sources.md](../05-research/sources.md) 的 15 仓库表与高频主题归并。
2. **装 skill**：每课先 `npx skills add <owner>/<repo>`（见 [../01-learning-path/02-install.md](../01-learning-path/02-install.md)）。
3. **发 prompt**：用 prompt 四要素（见 [../01-learning-path/03-first-animation.md](../01-learning-path/03-first-animation.md)）。

## 🛠 实战操作

### 15 课目录

| 课 | 仓库 | 类型 |
| --- | --- | --- |
| 01 | [gsap-skills](01-gsap-skills.md) | 网页动效 |
| 02 | [video-shotcraft](02-video-shotcraft.md) | 产品宣传片 |
| 03 | [transitions.dev](03-transitions-dev.md) | 网页动效 |
| 04 | [anything2explainer](04-anything2explainer.md) | 解释动画 |
| 05 | [oil-motion](05-oil-motion.md) | 网页动效 |
| 06 | [pixelfx](06-pixelfx.md) | 像素特效 |
| 07 | [motion-design-skill](07-motion-design-skill.md) | 动效原则 |
| 08 | [video-talkcraft](08-video-talkcraft.md) | 口播视频 |
| 09 | [AI_Animation](09-ai-animation.md) | 网页动效 |
| 10 | [design-motion-principles](10-design-motion-principles.md) | 动效原则 |
| 11 | [spritesheet-generator](11-spritesheet-generator.md) | 2D/像素 |
| 12 | [motion-video-kit](12-motion-video-kit.md) | 商业成片 |
| 13 | [motionmaxxing](13-motionmaxxing.md) | 动效质量 |
| 14 | [claudedesignskills](14-claudedesignskills.md) | 3D/WebGL |
| 15 | [iart-motion-skills](15-iart-motion-skills.md) | skill 合集 |

### 操作步骤

1. **按顺序跑**：01–15 覆盖从基础到综合，建议按序。
2. **每课四步**：装 skill → 发 prompt → 按 checklist 验收 → 不满意则迭代。
3. **记录产出**：每课产出一个 demo，作为课程成果集。

## ✅ 总结

- 15 课覆盖五大类 + 3D 横切，每课结构一致：装 skill → 发 prompt → 验收 → 迭代。
- 先读调研清单，再按序跑课，每课留 demo。
- 下一步：从 [01-gsap-skills.md](01-gsap-skills.md) 开始。
