# phase-6 · task-09 · output（产出交接）

## 什么功能完成了

**公式步逐参数高亮拆段**（遗留 #4 清账）——参数口播段从单段定帧改为按参数标签字数
占比切块，`Lesson.focusParam` + 步骤卡行金底随口播逐参数推进；总时长不变（只切驻留）。
DOM（交互动画课）与 ASS（烧卡视频）双实现同拍。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `scripts/recorder/build-plan.mjs` | `paramBlocks` 切块（标签字数权重，Σ=holdMs） |
| `scripts/recorder/hot-driver.py` | 渲染式块内连拍/块间切焦点；实时式按块等待 |
| `scripts/recorder/render-video.mjs` | ASS 步骤卡逐块 Dialogue（当前块行加粗金） |
| `templates/handsontable/lesson.js` + `theme.css` | `focusParam(i)` + `.sd-arg.is-focus`（共享源，全拷贝同步） |

## 要点（hand-off 给下游）

1. **权重口径 = 参数标签字数**（`max(1, label.length)`，末块吃余数）——标签越长口播越久、
   驻留越长；改 label 文案会改变块分布，属预期。
2. **帧→块映射确定性**：`b_frames = round(ms×fps/1000)` 逐块累加，抽帧质检可按
   帧号推算当时高亮哪个参数（见 verify.md 帧映射表）。
3. 双实现同拍：页面侧 `.sd-arg.is-focus`（focusParam 切类）、视频侧 ASS 行加粗金
   （render-video 逐块 Dialogue）——两处都只在首个公式步的参数行生效（多公式步
   参数只挂首步，task-06 口径不变）。
4. 拆段零时长代价：ΣparamBlocks = holdMs，整片时长与拆段前一字不差。

## 下游接线

- 新课 formulaArgs 标签写短句（3-6 字），块分布即自然；
- 出片质检抽帧可用帧映射表核对高亮顺序（参数1→参数N 逐块走）。
