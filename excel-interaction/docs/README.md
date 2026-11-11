# docs/ · 文档中心

> 本项目的全部文档集中在 docs/ 下，按 **projects（执行过程）** 与 **modules（模块功能）** 两大类组织；
> 各模块自己的 README/用法文档留在模块目录内，不收进 docs/。

## 目录组织

```
docs/
├── README.md        ← 本文件：文档组织说明（放什么、怎么放、怎么新增）
├── index.md         ← 文档索引（全部文档的清单）
├── build-method.md  ← 整体构建方式（任务分解 / 记录保存 / 验证保存）
├── pipeline.md      ← 流水线构成（契约单源三产物总览 + 遗留跟踪）
├── projects/        ← 项目执行过程文件
│   ├── index-log.md     执行流水（append-only，按实践顺序）
│   └── phase-N/         每个 phase 一个目录
│       ├── README.md        这个 phase 做什么
│       └── tasks/task-XX/   每个 task 一个目录
│           ├── task.md      计划：做什么、功能、验证点
│           ├── verify.md    证据：逐验证点的执行记录
│           └── output.md    交接：产出与要点（hand-off）
└── modules/         ← 模块功能描述文件（一模块一文件）
    └── scripts.md       初始化脚本模块（check / install）的功能描述
```

## 两大类的分工

| 目录 | 放什么 | 不放什么 |
| --- | --- | --- |
| **projects/** | 项目**执行过程**的全部记录：执行流水（index-log）、各 phase 的做什么（README）与 task 三件套（task/verify/output） | 模块的功能说明（那是 modules/ 的事） |
| **modules/** | 各模块的**功能描述**：职责、组成、接口概要、模块间关系（一模块一文件，如 `scripts.md`） | 用法手册（留在模块目录内，如 `scripts/README.md`） |

**原则**：过程进 projects/，功能进 modules/，**用法/README 跟模块走**——
模块目录里的 README 是操作手册，docs/modules/ 里的文件是功能描述卡片，两者互链不重复。

## 约定

- **phase 目录**与 [excel-animation 的 build-checklist](../../excel-animation/docs/build-checklist.md)
  阶段一一对应（phase-0 环境配置 … phase-8 记录收尾）。
- **task 三件套**的格式、index-log 的条目格式、verify 的记录规则，见
  [build-method.md](build-method.md)（唯一事实源，这里只做导航）。
- **新增文档**：执行过程类进 `projects/` 并在 [index.md](index.md) 登记；模块功能描述进
  `modules/`（`<模块名>.md`）；模块 README 留在模块目录。改了组织约定先改本文件。
