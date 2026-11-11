# phase-6 · task-08 · task（抓窗式 intro/outro 段派发，遗留 #1）

## 背景（deferred #1 原文）

> 抓窗式 intro/outro 节奏：uno-driver（抓窗式）只重演 4 步，summary 首尾口播段不参与
> UNO 节奏；生产出片一律渲染式（pitfalls #6），抓窗式要跟上需补段派发。

即抓窗式只按 4 个操作步重演 UNO 动作，`plan.segments` 里的 intro（开篇总结口播）
与 outro（收尾验收口播）两段**没有对应画面节奏**——首尾口播播完时画面已经走完 4 步
空等/抢跑，音画错位。本 task 补齐段派发，让抓窗式与渲染式/录屏式同吃全量 segments。

## 做什么

1. **uno-driver `--pace` 全量段派发**：按 `plan.segments` 的 `kind` 分派——
   - `intro`：复位后的空闲态即开篇拍画面，定格占满 `holdMs`（无动作）；
   - `step`：原有 4 步 UNO 重演（输入/回车/选中）不变；
   - `outro`：完成态定格（结果已算出、验收格选中），占满 `holdMs`；
   - 输出 `paced`（逐段实际驻留）+ `paceStartMs`（开步墙钟时刻，前摇对齐钩子，
     task-10 的 leadMs 裁剪用它）。
2. **顺手闭环：录屏式 intro 段吞时长 bug**（验证时发现，同属首尾段节奏）：
   hot-driver 实时路径 intro 段无 `remain` 等待——复位一完就进第 1 步，intro 的
   holdMs 整段被吞（实测 15960ms vs ΣholdMs 19728ms，漂移 19%）。补 intro
   else-branch 剩余等待，与 outro 同款「占满 holdMs」。

## 功能清单

| 文件 | 改动 |
| --- | --- |
| `scripts/recorder/uno-driver.py` | `--pace` 段派发（intro/step/outro 三分支）+ `paceStartMs` 输出 |
| `scripts/recorder/hot-driver.py` | 实时路径 intro 段补 `remain` 等待（占满 holdMs） |

## 验证点

1. 抓窗式重放段清单含 intro + 4 步 + outro（`paced` 全量），首尾段画面定格正确：
   intro 拍首格、outro 拍验收结果（抽帧核对）。
2. 音画对齐：合成片总长 = ΣholdMs，漂移 <5%；首尾口播不再空等/抢跑。
3. 录屏式 intro 修复后整片漂移 0.0%（对照修复前 19%）。
