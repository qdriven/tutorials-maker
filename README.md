# tutorials-maker

这个项目期望做成是：
1. 一个不同 edu 相关的资源整合，use case 的网站
2. 初期的 use case 和资源都是自己去获得，主要都是通过自己挑选获得

因此这个应用就包括了：
1. 不同的内容模块
2. 具体的课程资源的一个内容聚合

## 项目构成

| 目录 | 说明 |
| --- | --- |
| [excel-interaction/](excel-interaction/) | **无废话 Excel 教程**——契约驱动的实机教程工厂：一份 `courses/<id>.json` 同时产出交互动画课（44 门）+ 30 秒有声讲解视频（47 支） |
| [docs/](docs/) | 项目文档：research 研究、inbox 收集、**build-it-own 自己造轮子系列制作复盘** |
| [agent-learning-workbench/](agent-learning-workbench/) | 子模块：agent 学习工作台 |
| [handbook-style-clone/](handbook-style-clone/) | 手册风格克隆实验 |

## 制作复盘（build-it-own）

「从零自己做出来」的项目，第一视角记录**为了什么 → 怎么做的 → 结果 → 怎么尝试 → 批量流水线**：

- [excel-interaction 制作复盘](docs/build-it-own/excel-interaction/README.md) ·
  [时间线](docs/build-it-own/excel-interaction/timeline.html) ·
  [Slides](docs/build-it-own/excel-interaction/slides.html)

## excel-interaction 快速开始

```bash
cd excel-interaction
node scripts/check.mjs    # 环境体检
pnpm verify               # 全链自检（环境 + 契约 + 展示层清单）
pnpm serve                # 交互动画课 → http://localhost:4173/<id>/index.html
pnpm showcase             # 全站展示层 → http://localhost:4174/src/standalone/index.html
```

详细构建方式见 [excel-interaction/README.md](excel-interaction/README.md) 与
[docs/build-it-own/excel-interaction/README.md](docs/build-it-own/excel-interaction/README.md)。
