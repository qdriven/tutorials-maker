# 09 · 社区完整指南（Claude Code Ultimate Guide）

> 资源: [FlorianBruniaux/claude-code-ultimate-guide](https://github.com/FlorianBruniaux/claude-code-ultimate-guide)
> 免费 · 预计 4 h · 难度 ★★★

## 它讲什么

社区维护的综合指南，定位是"最全面的 Claude Code 指南"：覆盖 agentic workflows、hooks、skills、MCP、配置与进阶用法——正好补齐前三阶段没有深入的两个硬核话题：

- **Hooks**：在工具调用前后插入你自己的 shell 命令（自动 lint、禁止动某些目录、提交前强制检查……）
- **Agentic workflows**：多会话协作、subagent、任务分解与编排的社区实践

## 怎么学

1. clone 或在线通读，**跳过你已熟练的部分**（前两个阶段学过的 basics 直接到进阶章）：
   ```bash
   git clone https://github.com/FlorianBruniaux/claude-code-ultimate-guide.git
   ```
2. 重点精读 **hooks** 章节，做两个实验：
   - 写一个 PostToolUse hook：每次 Claude 编辑 `.ts` 文件后自动跑 lint；
   - 写一个 PreToolUse hook：拦截对 `infrastructure/` 目录的一切写入。
3. 精读 agentic workflows 章，把"多会话/subagent"模式用到你手头最大的一个任务上。
4. 把指南里与你现有工作流冲突或重复的部分列出来——这就是你的"个性化配置清单"。

## 学完你能

- 用 hooks 给 Claude Code 装上"自动安全带和传送带"
- 在大任务里组织多个会话/subagent，而不是单线程聊天
- 有一套贴着自己习惯的进阶配置

## 自测检查点

- [ ] 写过并启用 ≥ 2 个 hooks（含一个拦截类）
- [ ] 用 subagent/多会话完成过一个复杂任务
- [ ] 个性化配置清单已落地进项目或用户配置

**上一阶段** ← [阶段三](../stage-03-automation-mcp/README.md) · **下一课** → [10 · Awesome Claude Code](./10-awesome-claude-code.md)
