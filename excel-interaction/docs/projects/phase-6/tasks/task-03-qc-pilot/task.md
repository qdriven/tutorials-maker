# task-03 · 试点出片与质检（qc + 验收清单闭环）

## 做什么

vlookup-basic 成品质检闭环：ffprobe 流信息 + 时长偏差 + 抽帧 3–5 张核对字幕/画面
同步（人工目检留证），对照 SKILL.md 验收清单 4 项逐一核对；出片命令链入
package.json（plan/video/qc）。

## 功能定义

1. **qc.mjs**：读 plan + 成品——流齐全断言（有配音必有音频流/纯字幕必无）、
   时长偏差 <5% 断言、每步中点抽帧到 out/<id>/qc/（打印预期对照表）。
2. **抽帧目检**：帧图人工核对——字幕（caption 四要素全文）与当前步一致、
   公式/结果画面与契约一致、参数逐位在画面内。
3. **命令链**：package.json `plan`/`video`/`qc` 三脚本（`pnpm video -- --plan …`）。

## 验证点

1. `node scripts/recorder/qc.mjs --plan out/vlookup-basic/plan.json` 全绿（数字输出）。
2. 抽帧 3+ 张目检：step-2 编辑态/step-3 王五/step-4 复核态字幕画面同步（截图留证）。
3. 验收清单 4 项逐条勾（时长/对齐/流信息/公式结果一致）。
4. 回归：`pnpm verify` EXIT=0。

## 前置与依赖

- task-02（成品 mp4）。

## 范围外

- record.mjs 与驱动层（task-04）。
