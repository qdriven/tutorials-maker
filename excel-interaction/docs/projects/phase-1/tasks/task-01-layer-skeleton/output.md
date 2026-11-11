# output · task-01 五层目录骨架（hand-off）

## 产出

| 目录/文件 | 内容 |
| --- | --- |
| `courses/` + `courses/seeds/` | 契约层骨架（+ courses/README.md） |
| `skill/` | 技能层骨架（+ README.md） |
| `scripts/{tutorial,docs,serve}/` | 流水线子结构（.gitkeep 占位） |
| `apps/` / `out/` / `src/` | 产物与展示层骨架（各 + README.md） |

## 完成功能

五层目录一次落位，各顶层模块目录带「放什么」README（readme 跟模块走）；
docs/ 既有组织（projects/modules）不受影响，构成完整的项目骨架。

## 要点（交接）

1. **目录纪律**：手改内容只进 `courses/`（契约）；`apps/` 与 `out/` 是生成物，不手改。
2. **scripts/ 根**留给初始化脚本（check/install/probe），`scripts/{tutorial,docs,serve}`
   是 phase-4 流水线的预留位——生成器/校验/服务脚本各归各位。
3. 各 README 已链到对应 phase；模块功能卡片（docs/modules/）随各层建设再补。
