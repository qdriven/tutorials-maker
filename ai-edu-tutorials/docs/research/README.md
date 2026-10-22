# Docs / Research

本目录只保留**与本仓架构直接相关**的两份研究。纯市场/社区调研已迁至仓库根的 [`research/`](../../research/README.md)。

| 目录 | 内容 | 与本仓的关系 |
|---|---|---|
| [`ai-edu/`](./ai-edu/openmaic-deeptutor-fusion-and-deployment.md) | OpenMAIC + DeepTutor 融合与部署的代码级方案 | 架构决策依据 |
| [`innate-edu/`](./innate-edu/README.md) | 模块拆解、融合策略、资源分析、Lite-RAG 取舍、家长 UX | [`../together-learning/`](../together-learning/README.md) 的策略级输入 |

> **为什么这两份留在这里：** `docs/together-learning/` 按路径引用了 `docs/research/innate-edu/`，迁走会打断引用。其余研究统一放 `research/`。
>
> **新增研究放哪：** 市场/方向/用户类研究 → `research/<主题>/`；直接决定本仓架构的技术研究 → 本目录。
