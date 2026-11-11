# task-03 · output（产出交接）

## 什么功能完成了

**试点出片与质检闭环**：vlookup-basic.mp4（17.6s，h264+aac）通过程序化质检
（流/时长/抽帧）+ 人工目检（字幕画面同步）双轨；SKILL.md 验收清单 4/4；出片
命令链入 package.json（`pnpm plan`/`pnpm video`/`pnpm qc`）。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `scripts/recorder/qc.mjs` | 质检：流齐全/时长偏差 <5% 断言 + 每步中点抽帧（预期对照表） |
| `package.json` | `plan`/`video`/`qc` 命令链 |
| `out/<id>/qc/step-*-mid.png` | 抽帧证据（4 张，人工目检通过） |

## 要点（hand-off 给下游）

1. **质检双轨**：qc.mjs 断言（可进 CI）+ 抽帧人工目检（CLI 绿≠画面对，本项目
   已多次靠截图抓到 bug）——两轨都要过才算出片完成。
2. **抽帧时机**：每步 holdMs 中点（避开步界切换瞬间）；预期对照表直接打 expect，
   目检者按表核字幕/画面。
3. **验收清单即门禁**：SKILL.md 四项（时长/对齐/流信息/公式结果）逐条勾；
   任一项不过 → 出片不成立。
4. **成片形态**：无废话讲解卡视频（DOM 重演 + TTS）；`--keep-raw` 留 clip 中间产物。

## 下游接线

- task-04 record.mjs（浏览器录屏式/抓窗式）+ 驱动层收尾 phase-6 脚本清单。
- phase-7 展示层：成品 mp4 入 showcase 登记（src/data/tutorials.json）。
