# 07 · MCP 协议（连接真实世界）

> 资源: [MCP — code.claude.com/docs/en/mcp](https://code.claude.com/docs/en/mcp)
> 免费 · 预计 2 h · 难度 ★★★

## 它讲什么

MCP（Model Context Protocol，模型上下文协议）是让 Claude Code 接入外部工具与数据源的开放标准。一个 MCP server 暴露一组 **tools / resources / prompts**，Claude Code 当客户端调用。文档覆盖：

- **传输与安装**：本地 stdio server（`claude mcp add <name> -- <command>`）与远程 HTTP/SSE server；项目级 `.mcp.json` 随仓库共享配置
- **常见 server**：文件系统、GitHub、数据库（Postgres/SQLite）、浏览器自动化（Playwright/Puppeteer）、Slack、Sentry 等
- **认证**：OAuth 流程、环境变量管理
- **排错**：`/mcp` 命令查看连接状态与工具列表

## 怎么学

1. 通读文档，弄懂三件事的分工：**tool**（agent 可调用的动作）、**resource**（可读的数据）、**prompt**（预置提示词）。
2. **上手装第一个 server**——建议 Playwright（浏览器），效果最直观：

   ```bash
   claude mcp add playwright -- npx -y @playwright/mcp@latest
   ```

   重启会话后对 Claude 说："打开 example.com 截个图告诉我页面上有什么"——它就该动真浏览器了。

3. 再装一个**项目级**的：在项目 `.mcp.json` 里加一个 server，提交进 Git，让队友 clone 即得（配置格式见文档）。
4. 排错演练：故意写错一条配置，用 `/mcp` 看报错，学会读连接状态。
5. 对照学习：本仓库 [references/README.md](../../references/README.md) 里 REA 与 dembrandt 两个真实 MCP server 的接入方式，验证你学到的配置语法。

## 学完你能

- 独立为项目接入任意 MCP server，并管理本地/项目/用户三种作用域
- 看 `mcp__server__tool` 形式的工具名不再陌生
- 判断一个需求是否需要自研 MCP server（下一课与 Skills 的分工）

## 自测检查点

- [ ] 装好 ≥ 2 个 MCP server 并完成过真实任务
- [ ] 项目 `.mcp.json` 已提交且队友可用
- [ ] 会用 `/mcp` 诊断连接问题

**上一阶段** ← [阶段二](../stage-02-prompts-context/README.md) · **下一课** → [08 · Skills](./08-skills.md)
