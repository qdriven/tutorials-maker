# Skill 使用记录（skill-log）

> 每次用 skill 做**分析 / 验证 / 生产 / 修复**，都在这里留一条完整记录：用了哪个 skill、干什么、怎么干（可复制的命令）、结果（实测数据与产物）、结论与坑。这是仓库资产（人可读、可评审、随代码走），不是个人记忆。

## 记什么

| 记 | 不记 |
| --- | --- |
| skill 的实际调用（命令、参数、cwd） | skill 文档里已有的内容（记差异即可） |
| 实测数据（时长、体积、帧数、成功率） | 一次性调试噪音（rm、试探性 curl） |
| 踩坑与 workaround（含失败尝试） | 纯粹的计划/设想（那是 [redo-plan.md](../redo-plan.md) 的事） |
| 产物路径与验收结论 | 任何含密钥/个人信息的内容 |

一次 skill 使用 = 一条记录；同一任务反复迭代（如多次重跑出片）合并为一条，迭代过程写进「做法」。

## 条目格式

文件名：`YYYY-MM-DD-<skill>-<slug>.md`（同日同 skill 多条时 slug 区分；跨日重跑另起新条目）。

```markdown
---
date: 2026-11-04
skill: excel-desktop-recorder      # 用到的 skill（多个用逗号分隔，主责在前）
kind: verify                       # verify 验证 / analyze 分析 / produce 生产 / fix 修复
status: pass                       # pass / partial / fail
---

# 一句话标题

## 目标
这次使用要回答/交付什么。

## 做法
按实际执行顺序写命令与步骤（可复制重跑）；失败过的尝试也要留一行及其原因。

## 结果
实测数据（数字说话）+ 产物路径（写明是否入库/被 gitignore）。

## 结论与坑
可复用的结论、踩坑与 workaround、遗留差距。

## 关联
相关文档、清单条目、后续任务（用相对路径互链）。
```

## 索引与登记

- [INDEX.md](INDEX.md)：一行一条的时间线索引（新条目记得补一行）。
- showcase 登记：本 README 已在 `src/data/tutorials.json` 注册（doc 条目），新增条目不需要逐条登记——INDEX.md 是入口。
- 可选校验：条目多了以后可在 `scripts/tutorial/check-manifest.mjs` 旁加 `check-skill-log.mjs` 校验 frontmatter 字段齐全；现阶段约定先行，量大再脚本化。

## 与其他记录的分工

| 载体 | 定位 | 粒度 |
| --- | --- | --- |
| **skill-log（本目录）** | 每次 skill 使用的过程记录 | 一次使用一条 |
| `docs/research/`、`docs/motion/05-research/` | 调研**结论**文档（可引用本目录条目做证据） | 一个主题一篇 |
| Claude 个人 memory（仓库外） | 跨会话的机器向记忆 | 一个事实一条 |

调研文档写「结论」，skill-log 留「过程」——结论需要证据时链回本目录的条目。

## 维护约定

- **谁写**：执行 skill 的人（或 Agent）在使用完成后立即补写，趁命令与数据还在。
- **何时写**：分析、验证、生产、修复类使用都要写；日常琐碎查询不用。
- **失败也写**：`status: fail/partial` 的记录价值往往高于 pass——坑位清单就是这么攒出来的。
