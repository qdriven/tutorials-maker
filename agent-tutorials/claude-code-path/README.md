# Claude Code 学习路线 — 4 阶段 12 课

> 大纲依据：小樱 (@xiaoying_eth) 的推文[《谷歌前 CEO 揭露的秘密》](https://x.com/xiaoying_eth/status/2114251420023267829)——按"架构基础 → 提示词上下文 → 自动化连接 → 社区进阶"的递进逻辑组织的免费资源路线图。
> 原文存档（含全部已验证链接）: [docs/inbox/xiaoying-claude-code-free-roadmap.md](../docs/inbox/xiaoying-claude-code-free-roadmap.md)
> 全部资源**免费**；12 个资源 = 12 课，每课一个文件，4 个阶段各一个目录。

---

## 路线的逻辑（为什么是这个顺序）

原文的编排不是资源清单，而是一条**能力递进线**：

1. **阶段一 · 理解架构和基础知识** —— 先知道 agent 是什么、Claude Code 怎么运转（心智模型）
2. **阶段二 · 掌握提示词和上下文** —— 再学会"喂对东西"：提示词工程 + 项目记忆（CLAUDE.md）
3. **阶段三 · 自动化和连接真实世界** —— 然后让它接上外部世界：MCP 工具协议 + Skills 技能系统
4. **阶段四 · 社区指南和专业进阶** —— 最后用社区沉淀和官方学院把面铺开、持续进阶

## 课程地图

| 阶段 | 课 | 资源 | 类型 | 预计用时 |
|---|---|---|---|---|
| 一 | [01](./stage-01-foundations/01-agent-architecture.md) | [代理架构：How Claude Code Works](https://code.claude.com/docs/en/how-claude-code-works) + [LangChain Blog](https://www.langchain.com/blog) | 官方文档 + 博客 | 2 h |
| 一 | [02](./stage-01-foundations/02-claude-code-101.md) | [Claude Code 101](https://anthropic.skilljar.com/claude-code-101) | 官方课程 | 2 h |
| 一 | [03](./stage-01-foundations/03-claude-code-in-action.md) | [Claude Code in Action](https://anthropic.skilljar.com/claude-code-in-action) | 官方演示课 | 1.5 h |
| 二 | [04](./stage-02-prompts-context/04-prompt-engineering-guide.md) | [提示词工程官方指南](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) | 官方文档 | 3 h |
| 二 | [05](./stage-02-prompts-context/05-interactive-prompt-tutorial.md) | [交互式提示词课程](https://github.com/anthropics/prompt-eng-interactive-tutorial) | GitHub 实操 | 4 h |
| 二 | [06](./stage-02-prompts-context/06-claude-md-memory.md) | [CLAUDE.md 与记忆](https://code.claude.com/docs/en/memory) | 官方文档 | 1.5 h |
| 三 | [07](./stage-03-automation-mcp/07-mcp.md) | [MCP 协议](https://code.claude.com/docs/en/mcp) | 官方文档 | 2 h |
| 三 | [08](./stage-03-automation-mcp/08-skills.md) | [Skills 技能系统](https://code.claude.com/docs/en/skills) | 官方文档 | 2 h |
| 四 | [09](./stage-04-community-advanced/09-ultimate-guide.md) | [社区完整指南](https://github.com/FlorianBruniaux/claude-code-ultimate-guide) | 社区开源指南 | 4 h |
| 四 | [10](./stage-04-community-advanced/10-awesome-claude-code.md) | [Awesome Claude Code](https://github.com/hesreallyhim/awesome-claude-code) | 社区资源合集 | 1 h + 持续 |
| 四 | [11](./stage-04-community-advanced/11-anthropic-academy.md) | [Anthropic 学院](https://anthropic.skilljar.com)（13 门官方课程，免费带证书） | 官方课程平台 | 按需 |
| 四 | [12](./stage-04-community-advanced/12-official-docs.md) | [完整官方文档](https://code.claude.com/docs/en/overview) | 官方文档 | 常驻参考 |

总计约 **23 小时**（第 10/11/12 课为持续性资源，不计满）。

## 环境准备（开课前）

- [ ] Claude 订阅（Pro/Max）或 Anthropic Console API key
- [ ] 安装 Claude Code：`npm install -g @anthropic-ai/claude-code` 后终端运行 `claude`（详见[官方文档](https://code.claude.com/docs/en/overview)）
- [ ] Node.js ≥ 18；Git 基础
- [ ] （第 05 课需要）Python + Jupyter 环境：`pip install jupyter`

## 每课的结构

每课都回答四个问题：**它讲什么 → 怎么学（具体步骤）→ 学完你能做什么 → 自测检查点**。检查点全打勾再进下一课。

## 与本仓库其他教程的关系

- 学完第 07/08 课（MCP/Skills），就能理解 [references/rea](../references/rea/README.md)、[design-studio](../design-studio/README.md) 里所有工具的接入原理——它们全是 MCP server 或 agent skill；
- 第 06 课的 CLAUDE.md 纪律与本仓库 `AGENTS.md` 类配置同源。

## 目录结构

```
claude-code-path/
├── README.md                        ← 你在这里（总大纲）
├── stage-01-foundations/            第一阶段：理解架构和基础知识
│   ├── 01-agent-architecture.md     代理架构
│   ├── 02-claude-code-101.md        Claude Code 101
│   └── 03-claude-code-in-action.md  实战演练
├── stage-02-prompts-context/        第二阶段：掌握提示词和上下文
│   ├── 04-prompt-engineering-guide.md  提示词工程官方指南
│   ├── 05-interactive-prompt-tutorial.md 交互式提示词课程
│   └── 06-claude-md-memory.md       CLAUDE.md 和记忆
├── stage-03-automation-mcp/         第三阶段：自动化和连接真实世界
│   ├── 07-mcp.md                    MCP 协议
│   └── 08-skills.md                 Skills 技能
└── stage-04-community-advanced/     第四阶段：社区指南和专业进阶
    ├── 09-ultimate-guide.md         社区完整指南
    ├── 10-awesome-claude-code.md    Awesome 合集
    ├── 11-anthropic-academy.md      Anthropic 学院
    └── 12-official-docs.md          完整官方文档
```
