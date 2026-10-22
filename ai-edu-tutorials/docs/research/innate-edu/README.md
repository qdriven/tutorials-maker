# Innate Edu 研究文档

**日期:** 2026-07-13

本目录包含 OpenMAIC 和 DeepTutor 的模块分析以及融合策略研究。

## 文档索引

| 文件 | 内容 |
|---|---|
| [openmaic-modules.md](./openmaic-modules.md) | OpenMAIC 全模块分析 — 生成管线、多Agent编排、播放引擎、Action引擎、AI Provider、音频系统、PDF处理、PBL、导出等 |
| [deeptutor-modules.md](./deeptutor-modules.md) | DeepTutor 全模块分析 — 核心Agent引擎、RAG知识库（7引擎）、三层记忆、掌握度追踪、Living Book、Co-Writer、18个IM渠道等 |
| [fusion-strategy.md](./fusion-strategy.md) | 融合策略 — 互补关系、目标架构、模块级融合方案、渐进式路线图、技术约束、竞品定位 |
| [resource-analysis.md](./resource-analysis.md) | 资源消耗分析 — 全量方案 vs 轻量化方案、三级降级策略、推荐架构 |
| [merge-architecture.md](./merge-architecture.md) | 合并架构 — 云RAG + 本地记忆 + 共享Living Book、社区使用场景、分层架构设计 |
| [parent-ux-lite-rag.md](./parent-ux-lite-rag.md) | 家长自建教程 + 轻量级RAG — 极简UX、SQLite FTS5/LanceDB嵌入式方案、零Python依赖 |
| [lite-rag-comparison.md](./lite-rag-comparison.md) | 轻量级RAG方案对比 — FTS5 vs LanceDB vs Qdrant Edge vs ChromaDB、推荐策略 |

## 核心结论

**OpenMAIC = 课堂呈现层**（怎么教）
**DeepTutor = 学习引擎层**（怎么学）
**Tauri = 桌面体验层**（在哪用）

三者组合形成 Innate Edu：既有丰富课堂体验，又有深度学习追踪的桌面教育应用。

> ⚠️ **资源约束:** 全量融合（1.2-3GB RAM）对个人用户不可行。推荐方案仅 **280-500MB**，聚焦 OpenMAIC + 课程包内嵌掌握度，DeepTutor 作为可选插件按需启动。详见 [resource-analysis.md](./resource-analysis.md)。

## 与当前项目的关系

当前 `ai-edu-tutorials` 已实现:
- ✅ Tauri 壳 + OpenMAIC bundled runtime 嵌入
- 🔧 DeepTutor CLI hook（代码就绪，待复现）
- ⏳ 课程包 schema 需扩展以关联两个系统

本文档为后续融合提供架构参考。
