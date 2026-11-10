# 08 · Skills 技能系统（把方法论打包复用）

> 资源: [Skills — code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills)
> 免费 · 预计 2 h · 难度 ★★★

## 它讲什么

Skill = 一个带 `SKILL.md` 的文件夹：**给 agent 的"操作手册 + 配套脚本/模板"**，在需要时按需加载（progressive disclosure，省上下文）。与 MCP 的分工：MCP 给 agent 新**工具**，Skill 教 agent 新**方法**（工作流、规范、检查清单、领域知识）。

文档覆盖：

- **结构**：`SKILL.md`（YAML frontmatter：`name` / `description`——description 写得好坏直接决定会不会被触发）+ 可选的 `scripts/`、`references/`、`assets/`
- **安装渠道**：插件市场（`/plugin marketplace add …`）、`npx skills add <repo>` 跨 agent 安装、手动放 `~/.claude/skills/` 或项目 `.claude/skills/`
- **斜杠命令**：装好的 skill 常带 `/命令` 入口
- **自建 skill**：从空 SKILL.md 到结构化指令的完整写法

## 怎么学

1. 通读文档，重点体会 **progressive disclosure**：SKILL.md 只放"什么时候用 + 怎么开始"，细节放 references 按需读。
2. **装一个真实 skill 玩透**——建议 [diagram-design](https://github.com/cathrynlavery/diagram-design)（本仓库 [design-studio/10](../../design-studio/10-diagram-design.md) 有详细教程）：

   ```bash
   npx skills add cathrynlavery/diagram-design
   ```

   观察它装的文件结构（SKILL.md + references + scripts），对照文档理解每一层。

3. **自建你的第一个 skill**：把你第 06 课 CLAUDE.md 里"最长的那节工作流"抽出来，做成 `~/.claude/skills/<你的技能>/SKILL.md`——写清 frontmatter description（何时触发）、步骤、注意事项；配上一个 `scripts/` 小脚本更佳。
4. 触发测试：新开会话，用自然语言描述那个场景，确认 skill 被自动加载（或 `/技能名` 手动调用）。

## 学完你能

- 写出"会自己被触发"的 skill（description 是关键）
- 把团队里重复性流程沉淀成技能包，随仓库共享（`.claude/skills/` 进 Git）
- 看懂本仓库所有教程里 "skill / plugin / marketplace" 的关系

## 自测检查点

- [ ] 装过 ≥ 1 个第三方 skill 并完成真实任务
- [ ] 自建 skill 被自然语言成功触发过 ≥ 3 次
- [ ] 能讲清 MCP（工具）与 Skill（方法）的选择标准

**上一课** ← [07 · MCP](./07-mcp.md) · **下一阶段** → [第四阶段 · 社区指南和专业进阶](../stage-04-community-advanced/README.md)
