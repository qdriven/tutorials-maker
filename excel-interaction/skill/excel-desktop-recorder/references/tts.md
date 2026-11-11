# TTS provider 与无废话规则

## provider 抽象

| provider | 声源 | 依赖 | 适用 |
| --- | --- | --- | --- |
| `edge`（首选） | Edge 神经语音（zh-CN 多音色） | `edge-tts`（pip）+ 网络 | 出片默认 |
| `sapi`（兜底） | Windows SAPI（Huihui/Zira Desktop） | 系统自带，离线 | 断网/非 Win 平台先实测 |
| `off` | 无配音 | 无 | 纯字幕版 |

- 统一接口：`speakSegment(text, provider, voice) → 音频文件 + 时长`；
  `buildNarration(plan, opts) → 逐段音频 + 总时长`（脚本随 phase-6 交付）。
- 默认音色：`zh-CN-XiaoxiaoNeural`（edge）/ `Microsoft Huihui Desktop`（sapi）；
  音色可换，但**换音色必须重测时长**（节奏由语音驱动）。
- **语速 `--rate`**（task-16 无废话节奏）：默认 `"+25%"` 加速口播
  （edge 透传 `--rate`，sapi 折算 `$s.Rate` 档）；`--rate "+0%"` 恢复原速。
  速率记入 plan.tts.rate，换速率必须重合成重测时长。

## 语音驱动节奏（核心算式）

```
stepDuration = max(minHoldMs, speechDurationMs + gapMs)
```

- `minHoldMs`：每步最低停留（默认 1200ms）。
- `gapMs`：步间静默（契约 narration.gapMs，默认 200ms——task-20 节奏收紧）。
- **先合成语音 → 拿真实时长 → 定帧数**，禁止先定帧数再塞语音（对不齐）。

## 无废话修剪规则（解说词派生，task-20 节奏收紧版）

从 4 步指南派生解说词：

1. **公式行不念**：`formula` 为 `=...` 的内容不进语音（画面上有，念出来是噪音）。
2. **brief 只念动作名**（菜单标题）：细节/预期不念——步骤卡已烧进视频（task-18），
   字幕条有全文，口播与动作齐步走（每步 -2s）。
3. **`--full` 逐字念**（标题：细节全文）。

实测参照（旧域同规则）：223.7s 全文朗读 → 147.8s 无废话（-34%），信息不丢关键步。
修剪只作用于语音；字幕/讲解卡显示四要素全文。

## 参数逐位口播（formulaArgs，规则 4）

- 契约 `formulaArgs` 的参数说明**进口播**（不止字幕）——挂在首个 `formula` 以 `=`
  开头的步骤（公式首次写入那一步），其余步骤不重复念。
- 派生文（task-16 紧凑式，brief 默认）：`参数：<标签>、<标签>…`——标签取
  `meaning` 首个 `：` 前缀（如 `查找值`、`列序数`），全文含义在画面/字幕里；
  brief 下**直接替代动作名**（task-20：公式步的教学点就是参数，动作名不念）。
- `--full` 逐字式：`<动作名>：<细节>。参数：<part> 是 <meaning>；…`；步骤自带
  `narration`（作者定稿）时不追加——作者全权。

## 开篇/收尾段口播（summary，规则 5）

- **开篇口播只念一句话总结**（`summary.oneLiner`）：SQL 解释（`summary.explain`）
  上屏不念——画面讲解卡/文章里有全文，念出来超时且是废话（task-16，<30s 口径）。
- 收尾总结（`summary.outro`）照念；`--full` 两段都逐字全念。

## 验收口径

- 总时长 ≈ Σ stepDuration（偏差 <5%）。
- 抽帧核对：字幕与当前步一致，音频不串步。
