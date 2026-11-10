# 第一阶段 · 理解架构和基础知识

> 原文定位：代理架构 → Claude Code 101 → 实战演练
> 目标：建立 agent 的**心智模型**，会用 Claude Code 完成日常任务。

## 本阶段为什么排第一

原文的逻辑：不理解 agent 架构，后面所有功能（MCP、Skills、Hooks）都只是"玄学按钮"。先用两篇资料看懂 agent 循环，再用官方课程把 Claude Code 用起来。

## 课程

| 课 | 内容 | 资源 |
|---|---|---|
| [01](./01-agent-architecture.md) | 代理架构：agent 循环、工具调用、权限模型 | [How Claude Code Works](https://code.claude.com/docs/en/how-claude-code-works) + [LangChain Blog](https://www.langchain.com/blog) |
| [02](./02-claude-code-101.md) | Claude Code 101：安装、会话、日常命令 | [anthropic.skilljar.com/claude-code-101](https://anthropic.skilljar.com/claude-code-101) |
| [03](./03-claude-code-in-action.md) | Claude Code in Action：真实工作流现场演示 | [anthropic.skilljar.com/claude-code-in-action](https://anthropic.skilljar.com/claude-code-in-action) |

## 阶段出口检查

- [ ] 能白板画出 agent 的"收集上下文 → 行动 → 校验 → 重复"循环
- [ ] Claude Code 装好，能完成一次"读懂一个陌生仓库并改一个 bug"
- [ ] 知道在什么场景该切换 plan mode / 自动接受等权限模式
