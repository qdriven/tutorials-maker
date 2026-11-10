# 05 · 交互式提示词课程（GitHub 实操）

> 资源: [anthropics/prompt-eng-interactive-tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial)
> 免费 · 预计 4 h · 难度 ★★★（动手量最大的一课）

## 它讲什么

Anthropic 官方的**交互式提示词工程教程**——一组 Jupyter Notebook，从最简单的提示词开始，每格代码都能跑、每章结尾有练习题，逐章教你：清晰指令 → 分隔角色与数据 → 用输出格式约束 → 示例（few-shot）→ 避免幻觉 → 思维链 → XML 标签 → 复杂提示词的组装。它是第 04 课指南的"健身房版"：指南告诉你原则，这里让你**一格格跑出来肌肉记忆**。

## 怎么学

1. **搭环境**：

   ```bash
   git clone https://github.com/anthropics/prompt-eng-interactive-tutorial.git
   cd prompt-eng-interactive-tutorial
   pip install -r requirements.txt   # 需要 Anthropic API key
   jupyter notebook
   ```

   （仓库 README 有逐步说明；API key 从 [Anthropic Console](https://platform.claude.com/) 获取。）

2. **顺序跑完各章**，每格代码先猜结果再运行；练习题**必须自己做**——它们的评分机制会告诉你提示词哪里不合格。
3. 每章把"可迁移到 Claude Code 日常"的要点记一行，比如：XML 分节、few-shot 数量、让模型"先想后答"的触发语。
4. 结课后做一个综合练习：用学到的全部手法，为你真实工作里最复杂的重复任务写一个结构化提示词模板。

## 学完你能

- 从"会写提示词"到"会**设计**提示词"：分隔、约束、示例、思维链各就各位
- 有一套自己验证过的、能直接用的提示词模板库
- 看懂市面上各种 agent 提示词（包括本仓库 [rea-eng 教程](../../rea-eng/README.md)里的举证模板）为什么那么写

## 自测检查点

- [ ] 全部章节跑完，练习题全部通过
- [ ] 综合练习的模板在真实任务里用过 ≥ 3 次
- [ ] 能指出第 04 课指南与这门实操课中同一概念的两处不同表述

**上一课** ← [04 · 提示词工程官方指南](./04-prompt-engineering-guide.md) · **下一课** → [06 · CLAUDE.md 与记忆](./06-claude-md-memory.md)
