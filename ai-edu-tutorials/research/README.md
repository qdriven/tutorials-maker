# Research

本目录是**调研与研究结论**的唯一存放处。产品事实（架构/规范/契约/Issue/任务）仍以 [`docs/project/`](../docs/project/index.md) 为准，两者职责不重叠。

```text
research/
  README.md                        # 本文件：研究索引
  ai-edu-community/                # 主题一：AI + 互动教育（社区/教程/兴趣型）深度调研
    README.md                      # 文件谱系 + 阅读顺序
    SUMMARY.md                     # 结论提炼（7 条洞察 + 优先级）
    ANALYSIS.md                    # 结论分析（对本仓现状的映射与差距）
    ACTIONS.md                     # 可执行操作清单（分层 + 验收）
    report/                        # 正式报告（唯一权威版本）
    sources/                       # 原始调研素材 + 分析中间产物
    drafts/                        # 已并入 report 的中间稿（归档备查）
```

## 主题索引

| 主题 | 位置 | 一句话 | 状态 |
|---|---|---|---|
| AI + 互动教育社区/教程模式 | [`ai-edu-community/`](./ai-edu-community/README.md) | 零服务器技术基座下的轻资产教育社区可行性 | 报告完成，结论已提炼 |
| OpenMAIC + DeepTutor 融合与部署 | [`../docs/research/ai-edu/`](../docs/research/ai-edu/openmaic-deeptutor-fusion-and-deployment.md) | 两仓组合的代码级架构与部署方案 | 已完成 |
| 轻量化资源与融合策略 | [`../docs/research/innate-edu/`](../docs/research/innate-edu/README.md) | 资源占用、融合策略、Lite-RAG 取舍 | 已完成 |
| 集成路线图（代码级） | [`../docs/together-learning/`](../docs/together-learning/README.md) | 契约 / 模块 / 架构 / 路线图 | 已完成 |

> `docs/research/` 保留的是**与本仓架构直接相关**的两份研究（`ai-edu/`、`innate-edu/`），因为 [`docs/together-learning/`](../docs/together-learning/README.md) 按路径引用它们。纯社区/市场调研一律放本目录。

## 约定

1. **一份报告，一个权威文件。** 报告只在 `report/` 下保留 `.md` + `.docx` 两个格式，不再出现 `-final`、`-renumbered` 等并行副本。
2. **中间产物不删除，只归档。** `drafts/` 存放已被合并进正式报告的中间稿，便于追溯"结论从哪来"。
3. **结论与事实分离。** `SUMMARY.md` 只写结论与置信度，`ANALYSIS.md` 写结论对本仓的映射，`ACTIONS.md` 写可执行动作；三者不重复正文。
4. **原始素材带来源。** `sources/` 下的调研笔记保留可验证数据来源与引用标记，改结论时先改素材再改报告。
