# 04 · 提示词工程官方指南

> 资源: [Prompt engineering overview — platform.claude.com/docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
> 免费 · 预计 3 h · 难度 ★★☆

## 它讲什么

Anthropic 官方提示词工程指南（教程目录含多个章节），核心技术全部可用在 Claude Code 的日常对话里：

- **Be clear and direct**（清晰直接）：给足上下文、把任务说成序列、指定角色/受众
- **Use examples (multishot)**（示例）：示例是最高效的格式与风格控制
- **Let Claude think (chain of thought)**（思维链）：复杂任务先让它想步骤再动手
- **XML tags**（XML 标签）：结构化提示词，Claude 对 XML 特别敏感——这也是 CLAUDE.md 和各种 agent 提示词的标准写法
- **System prompts**（系统提示）：稳定不变的要求放系统位
- **Prefilling**（预填充）、长上下文技巧（把长文档放提示词**顶部**、查询放底部）等

## 怎么学

1. 按章节顺序通读，每章读完**立刻在 Claude Code 里做对照实验**：同一个任务，写一版"坏提示词"和一版"好提示词"，对比产出。
2. 重点消化三件事：
   - **结构化模板**：`<context>…</context> + <task>…</task> + <output_format>…</output_format>` 的骨架，直接改造你每天的日常任务
   - **示例的力量**：挑一个你常做的工作（如写周报/改文案），做 3 个示例喂给 agent，看风格是否稳定
   - **长上下文摆放**：文档在上、问题在下
3. 把指南里的技巧整理成一页**个人提示词 checklist**，贴在日常工作区。

## 学完你能

- 用结构化（XML/分节）方式写复杂任务，产出质量显著稳定
- 知道产出跑偏时该调哪里：清晰度 → 示例 → 思维链 → 系统位，逐层排查
- 为第 06 课做好准备：哪些要求值得"固化"进 CLAUDE.md

## 自测检查点

- [ ] 完成过至少 3 组"坏 vs 好"对照实验并留档
- [ ] 个人提示词 checklist ≥ 8 条
- [ ] 能解释为什么"给示例"比"写形容词"更有效

**上一阶段** ← [阶段一](../stage-01-foundations/README.md) · **下一课** → [05 · 交互式提示词课程](./05-interactive-prompt-tutorial.md)
