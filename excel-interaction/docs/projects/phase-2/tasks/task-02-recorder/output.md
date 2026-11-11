# task-02 · output（产出交接）

## 什么功能完成了

**录屏出片技能 `skill/excel-desktop-recorder/` 的契约层建成**：SKILL.md（2778B 入口）+
references 三件（模式矩阵 / TTS 与无废话规则 / 坑位表）。技能定义了「同一份课程契约 →
录制计划 → 真机执行 → 逐帧渲染 → 无废话讲解 mp4」的完整方法，与教程生成技能
双向交叉、同源 `courses/<id>.json`。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `skill/excel-desktop-recorder/SKILL.md` | 入口：同源契约声明、三模式速查、无废话节奏、4 步流程、验收清单 |
| `references/modes.md` | 模式×引擎矩阵（含 hot）、探测顺序（excel>wps>LO>hot）、录制计划与脚本职责划分 |
| `references/tts.md` | provider 抽象（edge 首选/sapi 兜底/off）、语音驱动节奏算式、无废话修剪三规则 |
| `references/pitfalls.md` | 7 条出片坑位（OpenScreen 注解黑块、GUI 探测、.cmd spawn、concat 尾帧等）+ 探测通用规则 |

## 要点（hand-off 给下游）

1. **视频专属参数不进契约**（模式/引擎/画幅走命令行或 plan.json）——契约双产物纯净性。
2. **先 TTS 后定时长**是硬顺序：`stepDuration = max(minHold, speech + gap)`；
  先定帧数再塞语音必错位（pitfalls #7）。
3. **无废话三规则**：公式行不念、只取第一子句、42 字截断（`--full` 才逐字）；
   只剪语音，字幕/讲解卡保留四要素全文。
4. **默认渲染式**：确定性、锁屏可跑；抓窗式只在解锁会话；浏览器录屏式仅 hot。
5. **坑位表是实现 checklist**：phase-6 写出片脚本时逐条对照，别重新踩。

## 下游接线

- task-03 引擎模板：渲染式的 DOM 重演主体（hot 引擎页）源自模板。
- phase-6 出片：按 modes.md 的脚本职责划分交付 build-plan/render-video/record/tts。
