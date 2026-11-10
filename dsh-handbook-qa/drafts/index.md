---
template: sheet
title: DeepSeek Harness Handbook 问答总目录
subtitle: 全书 15 个章节整理为 9 张中文问答页，一页一主题
file: dsh-handbook-qa-index
cols: 3
source: sandbaseai/deepseek-harness-handbook v0.5.261
---
总目录按「学习 → 构建 → 运维 → 排障」排列。每页 7-8 个问答面板，事实均出自 handbook 英文源文档（rc.2 / alpha.1 口径）。

## A 先读哪一页？
- 入门装环境：`getting-started.html`
- 理解运行时：`architecture.html`
- 写 Agent：`agent-patterns.html`
- 写插件：`plugin-development.html`
- 接外部系统：`integrations.html`
- 上线运维：`operations-security.html`
- 查资料选型：`reference-misc.html`
- 排障启动/网络：`troubleshooting-boot-web.html`
- 排障 Session/工具：`troubleshooting-session-tools.html`

## B 学习线：概念与架构 {span=2}
| 页面 | 覆盖章节 | 核心问题 |
|---|---|---|
| [入门与安装](getting-started.html) | what-is + getting-started（10 篇） | DSH 是什么、怎么装、怎么配 provider |
| [运行时架构](architecture.html) | architecture（9 篇） | 插件图、turn 生命周期、Session 存储、工具管线 |
| [参考与生态](reference-misc.html) | reference/guides/examples/recipes/ecosystem/updates（10 篇） | DSH vs Claude Code vs Codex、官方身份核验 |

## C 构建线：模式与扩展 {span=2}
| 页面 | 覆盖章节 | 核心问题 |
|---|---|---|
| [Agent 设计模式](agent-patterns.html) | agent-patterns（10 篇） | AGENTS.md、Skill、subagent、失败后继 |
| [插件开发](plugin-development.html) | plugin-development + tools（11 篇） | 第一个插件、schema 子集、子进程安全 |
| [集成](integrations.html) | integrations（11 篇） | MCP、ACP、SDK 交互、文件透传 |

## D 运维与排障线 {span=2}
| 页面 | 覆盖章节 | 核心问题 |
|---|---|---|
| [运维与安全](operations-security.html) | operations + security（10 篇） | 单写者、归档、token 计量、凭证威胁模型 |
| [排障：启动/Web/网络](troubleshooting-boot-web.html) | troubleshooting（12 篇精读） | 七层隔离顺序、npx 卡住、远程 403 |
| [排障：Session/工具](troubleshooting-session-tools.html) | troubleshooting（14 篇精读） | Session 中毒、profile 救砖、Windows 边界 |

## E 覆盖统计
- 源章节：15 个（含 2 篇顶级文档）。
- 问答页：9 张，共 71 个问答面板。
- troubleshooting 104 篇按症状索引分两页，精读 26 篇高频指南。
- 版本口径：rc.2（b150a551）与 alpha.1（cd5ef814），页内均标注核验状态。

## F 怎么用这套问答
- 顺序学习按 B → C → D 的表格行读。
- 遇到故障先开 `troubleshooting-boot-web.html` 的 A 面板（七层隔离顺序）。
- 页内面板标题即问题；命令与错误码保留英文原文，可直接复制。
- 事实与 handbook 源文档冲突时，以源文档为准并核对其标注的核验日期。

## G 源与更新
- 源仓库：`deepseek-harness-handbook`（本地 `deepseek-harness-handbook/` 目录）。
- 问答生成：answer-me-with-html skill，草稿在 `drafts/` 下可改后重渲染。
- handbook 处于开发者预览，问答页的版本敏感结论以页面内标注的核验日期为准。
