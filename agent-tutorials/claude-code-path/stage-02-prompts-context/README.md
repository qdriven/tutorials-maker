# 第二阶段 · 掌握提示词和上下文

> 原文定位：提示词工程官方指南 → 交互式提示词课程 → CLAUDE.md 和记忆
> 目标：让 agent 的产出质量变得**可复制**——靠方法，不靠运气。

## 本阶段为什么排第二

阶段一里你大概率已经体会到：同一个任务，描述方式不同结果天差地别。原文把这排在架构之后、自动化之前，因为**提示词和上下文是所有 agent 能力的燃料**——MCP 和 Skills 再强，喂不对也没用。

## 课程

| 课 | 内容 | 资源 |
|---|---|---|
| [04](./04-prompt-engineering-guide.md) | 提示词工程官方指南：清晰指令、示例、思维链、XML 标签 | [platform.claude.com/docs prompt-engineering](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) |
| [05](./05-interactive-prompt-tutorial.md) | 交互式提示词课程：Jupyter 逐步实操 | [anthropics/prompt-eng-interactive-tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) |
| [06](./06-claude-md-memory.md) | CLAUDE.md 与记忆：项目级持久上下文 | [code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory) |

## 阶段出口检查

- [ ] 写任务描述时有意识使用"清晰指令 + 示例 + 输出格式"三件套
- [ ] 把重复性要求沉淀进了 CLAUDE.md，而不是每次重打
- [ ] 能说清"什么信息该进提示词、什么该进 CLAUDE.md、什么该做成 Skill"（第三阶段的伏笔）
