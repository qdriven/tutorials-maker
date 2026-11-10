# 01 · 代理架构：How Claude Code Works

> 资源: [官方文档 How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) + [LangChain Blog](https://www.langchain.com/blog)（agent 架构文章集）
> 免费 · 预计 2 h · 难度 ★★☆

## 它讲什么

agent 不是聊天机器人。这一课建立两个心智模型：

1. **官方视角（How Claude Code Works）**——Claude Code 的运转方式：它是一个 agentic coding tool，核心是**收集上下文 → 采取行动（读写文件、跑命令）→ 校验结果 → 循环直到完成**的 agentic loop；围绕它的工具调用、权限与安全模型、上下文管理（CLAUDE.md、@ 文件引用）、plan mode 与不同权限模式。
2. **通用视角（LangChain Blog）**——agent 的通用定义与模式：LLM 用工具循环决策、编排（orchestration）、何时该用 agent 何时只用 workflow。用来对照理解"为什么 Claude Code 这么设计"。

## 怎么学

1. 通读 [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works)，边读边在本子上画出循环图：**输入 → 上下文组装 → 模型推理 → 工具调用 → 结果校验 → 循环/交付**。
2. 重点标注三块：**权限模型**（为什么每个文件写入/命令执行都可能要确认）、**上下文来源**（系统提示 + CLAUDE.md + 对话 + 工具结果）、**模式差异**（plan mode 不写盘、auto-accept 减少确认）。
3. 到 [LangChain Blog](https://www.langchain.com/blog) 找 agent 架构相关文章读 1–2 篇，回答：workflow 和 agent 的分界线是什么？
4. 打开终端跑 `claude`，随便让它"读一下这个仓库的 README 并总结"——观察它实际调了哪些工具、每步在做什么，对照你画的循环图。

## 学完你能

- 解释"agent = 模型 + 工具 + 循环 + 校验"
- 预判 Claude Code 在某个任务里大致会怎么行动、哪里会来问你
- 看懂后两阶段里 MCP/Skills 为什么长那样（它们都是往"工具"和"上下文"两个槽里插东西）

## 自测检查点

- [ ] 能不看笔记讲出 agentic loop 的四个环节
- [ ] 能说出 Claude Code 的上下文至少来自哪 3 处
- [ ] 知道 plan mode 和普通模式的本质区别（是否允许执行）

**下一课** → [02 · Claude Code 101](./02-claude-code-101.md)
