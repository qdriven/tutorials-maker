# phase-6 · task-07 · task（每步节奏收紧 -2s，用户 task-20）

## 背景（用户反馈原文）

> 视频的步骤间隔实践步骤实践减少2秒，目前太长了

即：视频里**每步的停留/间隔太长**，每步砍约 2 秒。口播是节奏的下限
（holdMs = max(minHoldMs, speechMs+gapMs)，片长被语音顶着）——要砍时长只能砍语音与间隔。

## 做什么

1. **brief 步骤口播改「动作名/参数清单」制**（build-plan.narrationForStep）：
   - 普通步只念**动作名**（菜单标题）——细节/预期不念（步骤卡已烧进视频，task-18，画面自明）；
   - 公式步只念**参数清单**（`参数：查找值、查找区域、列序数、匹配方式`），
     直接替代动作名——这一步的教学点就是参数，打字画面 + 步骤卡已给出动作名；
   - `--full` 逐字式不变（标题：细节。参数：…）。
2. **步间静默 400→200ms**（契约 `narration.gapMs`）。
3. 规则口径同步 `skill/excel-desktop-recorder/references/tts.md`；双课重出片。

## 功能清单

| 文件 | 改动 |
| --- | --- |
| `scripts/recorder/build-plan.mjs` | `narrationForStep` brief = 动作名/参数清单制（argNote 替代公式步动作名） |
| `courses/vlookup-basic.json` / `courses/sum-basic.json` | `narration.gapMs: 200` |
| `skill/excel-desktop-recorder/references/tts.md` | 规则 2/4 与 gapMs 口径更新 |

## 验证点

1. 重出片后每步 holdMs 约 -2s、总时长进一步下降（vlookup 27.5s→~20s、sum 25.1s→~17s），
   仍 <30s、漂移 <5%、步骤卡各 4 张不变。
2. 口播内容核对：`选中 E2` / `参数：查找值、…` / `回车确认` / `选中 E2 查看编辑栏`（plan.json）。
3. drive-02.py 全绿（四节/有声/console 0）；`pnpm verify` 全绿。
