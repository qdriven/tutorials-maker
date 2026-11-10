# 第三阶段 · 自动化和连接真实世界

> 原文定位：MCP 协议 → Skills 技能
> 目标：让 Claude Code 从"会聊天写码的助手"变成"**接得上外部世界的自动化平台**"。

## 本阶段为什么排第三

前两个阶段里，agent 的能力边界是"模型自带的工具 + 你的项目文件"。真实工作要碰数据库、浏览器、设计工具、API——MCP 负责接**工具**，Skills 负责装**方法论**。学完这两课，你就能看懂本仓库 [references/rea](../../references/rea/README.md)、[design-studio](../../design-studio/README.md) 里所有工具的接入原理。

## 课程

| 课 | 内容 | 资源 |
|---|---|---|
| [07](./07-mcp.md) | MCP：模型上下文协议——接数据库/API/浏览器 | [code.claude.com/docs/en/mcp](https://code.claude.com/docs/en/mcp) |
| [08](./08-skills.md) | Skills：把工作流打包成可复用技能 | [code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills) |

## 阶段出口检查

- [ ] 装好并实测过一个 MCP server（如文件系统或浏览器）
- [ ] 写过（而不只是装过）一个自己的 skill
- [ ] 能给同事讲清"什么时候用 MCP，什么时候用 Skill，什么时候两者都要"
