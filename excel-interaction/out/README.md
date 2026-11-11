# out/ · 媒体产物（不入库）

出片管线的媒体输出：讲解 mp4、配音 wav、中间帧、录制计划 JSON 等。
**本目录内容不入库**（gitignore 只保留本 README）；需要留存的成片复制到
展示层的 public 目录并登记清单。

- 产出阶段：[phase-6 · 出片](../docs/projects/phase-6/)

## 留存口径（2026-11-09 盘点定档）

| 分类 | 口径 | 例子 |
| --- | --- | --- |
| **结果** | 留——录制计划 + 成片 + 质检抽帧 | `<id>/plan.json`、`<id>/<id>.mp4`、`<id>/qc/` |
| **试验过程 / 中间物** | 删——可再生（重跑管线）或已有入库证据（shots 已拷 task 目录） | 中间帧、TTS 分段音频、录屏原始 webm、LO profile、探针产物 |
| **被文档引用的持久物** | 留 + **已收编入库**（2026-11-09，issue [#15](https://github.com/qdriven/agent-learning-workbench/issues/15)） | univer-kit 构建源、univer-smoke 验收工具、click-probe / cursor-diff 校准工具——已迁出 out/（见文末收编记录） |

## 当前构成

```
out/
├── README.md            ← 本文件（唯一入库物）
├── vlookup-basic/       ← 结果：plan.json + vlookup-basic.mp4 + qc/
├── sum-basic/           ← 结果：plan.json + sum-basic.mp4 + qc/
└── univer-smoke/        ← 媒体：univer-xsum.png（univer 冒烟验收截图）
```

## 清理记录 · 2026-11-09（235M → 17M）

| 已删（试验过程） | 当时做的事 |
| --- | --- |
| `*/frames/`（vlookup 85 帧、sum 各帧） | 渲染式出片的中间截帧 |
| `vlookup-basic/mouse-frames/` | 鼠标编排取证帧（关键帧已入 [task-10/shots](../docs/projects/phase-6/tasks/task-10-mouse-choreography/)） |
| `vlookup-basic/video-browser/` | 录屏式原始 webm（合成后即中间物） |
| `*/tts/` | TTS 分段 wav + narration 整轨（edge-tts 可再生） |
| `vlookup-basic/{lo-profile, plan-off.json}` + browser/capture/mouse-smoke 三个试验变体 mp4 | LO 缓存、关 TTS 试验 plan、三出片路径试验片 |
| `_probe/` 内 lo-profile-probe/ motion/ *.wav *.mp3 | LO profile 探针、动效探针、TTS 语速试验 |
| `_probe2/` 全部 | 声音复检探针（blk 帧 / served mp4 / 表页截图）——取证已入 docs（sound-check.png） |
| `oo-smoke.json` | 生成器 dry-run 用 onlyoffice 测试契约 |
| `univer-build/node_modules/`（187M） | esbuild 构建缓存（`npx esbuild` 按需拉取） |

| 已留 | 分类 |
| --- | --- |
| `vlookup-basic/plan.json` `vlookup-basic.mp4` `qc/` | 结果 |
| `sum-basic/plan.json` `sum-basic.mp4` `qc/` | 结果 |
| `univer-build/kit-src/` + `package*.json` | 持久物（构建源，#15 收编） |
| `univer-smoke/` | 持久物（验收工具，#15 收编） |
| `_probe/click-probe.py` `cursor-diff.py` | 持久物（校准工具，#15 收编） |

## 收编记录 · 2026-11-09（issue #15 闭环）

| 原 out/ 位置 | 现入库位置 | 说明 |
| --- | --- | --- |
| `univer-build/kit-src/` + `package*.json` | `skill/excel-tutorial-maker/templates/univer/kit-src/` | univer-kit 构建源（esbuild 重建 md5 与入库 dist 全同） |
| `univer-smoke/drive-univer.py` `probe-sel.py` | `scripts/tutorial/smoke/` | univer 全链验收工具 + smoke README |
| `univer-smoke/univer-xsum/`（课程专属物） | `scripts/tutorial/smoke/univer-xsum/` | 只入库 course.config.json + lesson.js；模板拷贝物由 setup.mjs 现取（消除拷贝漂移） |
| `_probe/click-probe.py` `cursor-diff.py` | `scripts/recorder/probe/` | 网格原点校准 / 光标像素取证（click-probe 的 uno-driver 相对路径已随迁修正） |

验收：新 clone 不依赖 out/ 即可重打包 univer-kit（md5 对账过）、跑 univer smoke（SMOKE PASS，
3600 跨表真算全链路）、跑网格校准（工具路径断言过；真机位校准随下一次出片执行）。
