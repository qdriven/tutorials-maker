# Phase 0 · 环境配置

## 这个 phase 做什么

把 Excel Interaction 的**工具链环境**配齐并验证到位（对齐
[build-checklist 阶段 0 · 环境前置](../../../../excel-animation/docs/build-checklist.md)），
并交付两个**初始化脚本**（scripts/check.mjs 环境检查、scripts/install.mjs 环境安装）
作为后续所有 phase 的环境自检入口。

完成后应达到：`node scripts/check.mjs` 必需组件全过（exit 0），任意机器可按
[scripts/README.md](../../../scripts/README.md) 复现。

## tasks/ 任务清单

| task | 做什么 | 状态 |
| --- | --- | --- |
| [task-01-init-scripts](tasks/task-01-init-scripts/) | 初始化脚本（check / install）与用法文档 | ✅ |
| [task-02-runtime-baseline](tasks/task-02-runtime-baseline/) | 运行时基线：Node ≥ 20 + pnpm（+ bun 可选） | ✅ |
| [task-03-python](tasks/task-03-python/) | Python 3（驱动脚本运行时） | ✅ |
| [task-04-media-pipeline](tasks/task-04-media-pipeline/) | 媒体工具链：ffmpeg + ffprobe | ✅ |
| [task-05-table-engine](tasks/task-05-table-engine/) | 表格引擎：LibreOffice / Excel / WPS 任一 | ✅ |
| [task-06-tts](tasks/task-06-tts/) | 语音合成：edge-tts 首选 / sapi 离线兜底 | ✅ |
| [task-07-optional-stack](tasks/task-07-optional-stack/) | 可选组件：Playwright / Hyperframes / OpenScreen | ✅ |

每个 task 目录内：`task.md`（做什么/功能/验证点）、`verify.md`（验证记录）、`output.md`（交接）。
