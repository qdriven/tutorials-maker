# phase-6 · task-08 · output（产出交接）

## 什么功能完成了

**抓窗式 intro/outro 段派发**（遗留 #1 清账）——uno-driver `--pace` 按
`plan.segments` 全量派发（intro 定格 / step 重演 / outro 定格），首尾总结口播段
参与 UNO 节奏，音画同拍；顺手闭环录屏式 intro 段吞时长 bug（19% 漂移 → 0.0%）。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `scripts/recorder/uno-driver.py` | 段派发三分支（intro/step/outro）+ `paceStartMs` 输出 |
| `scripts/recorder/hot-driver.py` | 实时路径 intro 段占满 holdMs（吞时长修复） |

## 要点（hand-off 给下游）

1. **三出片路径同节奏口径**：渲染式/录屏式/抓窗式都吃 `plan.segments` 全量，
   intro=复位空闲态定格、outro=完成态定格、step=动作段——新增段类型时三处同步。
2. **`paceStartMs` 是前摇对齐钩子**：uno-driver 开步墙钟时刻，合成侧用它裁片头
   （task-10 leadMs）；不要改其语义（epoch 毫秒、pace 循环开始前打点）。
3. intro 拍**首格**（cells 字典含表头行，vlookup 即 A1）、outro 拍 **checks[0] 格**——
   定格画面锚点，抽帧质检按此核对。
4. 录屏式 intro 必须 `remain` 等待占满 holdMs——漏掉就是整段吞时长（19% 漂移教训）。

## 下游接线

- task-10（鼠标编排）在段派发之上加光标：intro→首格、outro→验收格、step→操作格；
- 抓窗式质检抽帧锚点：intro 段内=首格选中、outro 段内=验收结果可见。
