# task-01 · 五层目录骨架落位

## 做什么

建立项目的五层目录骨架（对齐 [build-method.md](../../../../build-method.md) 的分层模型与
phase-1 README 的规划）：契约 `courses/`、技能 `skill/`、流水线 `scripts/` 子结构、
产物 `apps/` + `out/`、展示 `src/`；每个顶层模块目录带 README（readme 跟模块走约定）。

## 功能定义

- `courses/` + `courses/seeds/`：课程契约唯一事实源（json 契约 + 原始教程文本）。
- `skill/`：技能层（教程生成、录屏出片两套技能，phase-2 建设）。
- `scripts/tutorial/` `scripts/docs/` `scripts/serve/`：流水线子结构（phase-4 填充）；
  现有初始化脚本（check/install/probe）留在 `scripts/` 根。
- `apps/`：生成的教程应用（生成物，不手改）；`out/`：媒体产物（视频/配音/帧，gitignore）。
- `src/`：展示层（standalone web，phase-7 建设）。

## 验证点

1. 五层目录全部就位，`find` 树与模型一一对应（含 courses/seeds、scripts 三个子目录）。
2. 每个顶层模块目录（courses/skill/scripts/apps/out/src）有 README 且说明「放什么」。

## 前置与依赖

- 无（phase-0 环境已就绪）。

## 范围外

- 各层的实际内容（phase-2…7）；模板/生成器（phase-4）。
