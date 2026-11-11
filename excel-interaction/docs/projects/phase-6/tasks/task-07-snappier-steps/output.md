# phase-6 · task-07 · output（产出交接）

## 什么功能完成了

**讲解视频每步节奏收紧约 2 秒**（用户 task-20 反馈闭环）——步骤口播改「动作名/参数清单」
制、步间静默 200ms；双课 27.5s/25.1s → **19.7s/17.3s**，仍带 4 张步骤卡与有声整轨。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `scripts/recorder/build-plan.mjs` | `narrationForStep` brief=动作名/参数清单制；full 逐字式含参数 |
| `courses/vlookup-basic.json` / `courses/sum-basic.json` | `narration.gapMs: 200` |
| `skill/excel-desktop-recorder/references/tts.md` | 无废话规则 2/4 + gapMs 口径 |
| `out/<id>/<id>.mp4`（重出片）+ 展示层登记 | 新节奏成品（render-video 自动拷贝/登记） |

## 要点（hand-off 给下游）

1. **口播是节奏下限**：holdMs = max(minHoldMs, speechMs+gapMs)——想砍时长先砍语音字数，
   砍 gapMs 只省 0.2s/步。步骤卡（task-18）承担细节后，口播只留动作骨架。
2. **公式步口播 = 参数清单**（`参数：<标签>、…`）替代动作名——教学点在参数；
   普通步只念菜单标题。`--full` 仍逐字（标题：细节。参数：…）。
3. **口径锚**：<30s 是上限不是目标；当前 19.7s/17.3s 若再加快，从 intro/outro 下手
   （用户已留 deferred：intro/outro 节奏）。
4. 步骤卡不占时长、随段常驻；`--no-ass` 出无卡版不变。

## 下游接线

- 新课默认吃 `narration.gapMs: 200`（契约里写）+ brief 动作名/参数清单制；
- 取证驱动 drive-02.py 检查点不变（四节/有声/console 0），dur 徽标随片长浮动属正常；
- 规则口径单源 `references/tts.md`，改口播派生先改文档再改 build-plan。
