# Agent 工作约定

项目事实一律读 `docs/project/`，本文件只做入口。

## 入口

1. 每次会话先读 [`docs/project/index.md`](docs/project/index.md)
2. 再读当前 [`docs/project/issues/<id>.md`](docs/project/issues/)
3. 再读 [`docs/project/tasks/issues/<id>.md`](docs/project/tasks/issues/) **最后一条**

## 事实来源

- 范围与验收：[`docs/project/spec/README.md`](docs/project/spec/README.md)
- 规范：[`docs/project/spec/conventions.md`](docs/project/spec/conventions.md)
- 架构：[`docs/project/spec/architecture.md`](docs/project/spec/architecture.md)

## 交付

- 在独立分支 `feature/<issue>-<agent>` 工作
- 完成后在对应 `tasks/issues/<id>.md` **追加**一条
- 通过 PR 合并（有 remote 时）

## 禁止

- 不要创建 `.agents/` 或第二套 spec/tasks
- 不要 fork / 改造 `OpenMAIC-Project`（Electron）当主壳
- 不要合并 OpenMAIC 与 DeepTutor 源码进本仓
- 不要并行修改他人 in_progress 的同一 issue

## 本地路径（开发机）

| 资产 | 路径 |
|---|---|
| 本仓 | `D:\innate-works\projects\ai-edu-tutorials` |
| OpenMAIC | `D:\copy-modify\ai-edu\OpenMAIC` |
| DeepTutor | `D:\copy-modify\ai-edu\DeepTutor` |
| Idea | `D:\innate-works\innate-works\ideas\exploring\ai-edu-interactive-tutorials` |
