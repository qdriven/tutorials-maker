# output · task-02 最小 workspace（hand-off）

## 产出

| 文件 | 内容 |
| --- | --- |
| `package.json` | `@innate/excel-interaction@0.1.0`（private、type: module、零依赖） |
| `pnpm-lock.yaml`（外层） | 新增 `domains/excel-interaction: {}` importer 条目（additive） |

## 完成功能

项目成为 pnpm workspace 正式成员（外层 `domains/*` glob 自动覆盖），
`pnpm install` / `pnpm add` 依赖进出通道实测全通；脚本入口挂好
（`check:env` / `install:env` / `verify`，当前 verify 指向环境检查，phase-8 扩成全链）。

## 要点（交接）

1. **加依赖姿势**：`pnpm add <pkg>`（在本目录）即可，锁文件自动记 importer；
   零依赖状态下 pnpm 12 不写 importers（resolution skip），属正常现象。
2. **verify 脚本会成长**：后续阶段把 typecheck/lint/test/manifest 校验挂进来
   （build-checklist 阶段 8 的全链自检）。
3. 锁文件改动是本 task 的合法产物（新成员登记），提交时随本批一起。
