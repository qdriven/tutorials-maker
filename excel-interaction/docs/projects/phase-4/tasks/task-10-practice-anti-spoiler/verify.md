# task-10 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

取证工具：[drive-10.py](drive-10.py)；截图 [shots/](shots/)；[result.json](result.json)；
出片抽帧 `out/vlookup-basic/qc/`（gitignored，`pnpm video`+`pnpm qc` 可复现）。

## 验证点 1 · 布局换边 + 指南卡删除

- **证据**：`result_left_of_table=true`（#result-area bbox.x < #table-area）；
  `guide_panel_count=0`（#guide-panel/.guide-card 元素为零）；
  shots/layout-auto-step2.png 与 practice-folded.png 目检——面板在左 300px、
  表格在右、底部无指南卡行、字幕条保留在底。
- **结论**：**PASS**

## 验证点 2 · 练习态防剧透（折叠语义）

- **证据**：practice() → `folds_practice_initial=[f,f,f,f]`（4 步全折叠，
  公式/参数/预期藏起）；点第 2 标题 → `folds_after_peek=[f,t,f,f]`（peek 偏好记住）；
  `Engine.setFormula('E2','=VLOOKUP(D2,A2:B5,2,0)')` → `folds_after_pass=[t,t,t,t]`
  + 字幕「✓ 验收通过：E2 显示 王五，公式真算真回读，与契约一致」（通过后自动全展开对照答案）。
  shots/practice-folded.png · practice-peek.png · practice-passed.png。
- **结论**：**PASS**

## 验证点 3 · 自动播放回归

- **证据**：gotoStep(2) → `folds_auto_step2=[f,t,f,f]`；重载页面回 auto 态
  （gotoStep 不切 mode）→ `folds_auto_after_reload=[f,t,f,f]`。
- **结论**：**PASS**

## 验证点 4 · 顺序切步累积缺陷（FAIL→机制取证→修复→复验）

- **FAIL 现场**：首跑驱动 8 项全绿，但出片抽帧 step-3-mid.png 目检发现
  ①②③ 三块**全展开**（应只有当前步）——顺序切步 1→2→3 折叠态累积。
  CLI 指标全绿但画面错，视觉取证才抓到（与 phase-4 task-02 两 bug 同教训）。
- **机制取证**（浏览器探针）：
  `{folds_after_seq_1_2: [true,true,false,false], toggle_fires_on_insert_open: true}`
  —— Chrome 对 innerHTML 插入的 `<details open>` 也派发 `toggle`，
  bindFolds 把渲染插入当用户点击写进 foldState，逐步累积。
- **修复**：bindFolds 改认 **summary 点击**（键盘激活同走 click；click 处理先于
  默认切换动作，`!d.open` 即目标态），弃用 toggle。
- **复验**：`folds_after_seq_1_3=[f,f,t,f]`（只当前步展开）、
  `folds_after_done=[f,f,f,f]`（done 全折叠）；重出片 step-3-mid.png 仅 ③ 展开（目检）。
- **结论**：**PASS**（修复后）

## 验证点 5 · 出片画面刷新

- **证据**：复用 plan.json（narration 不变）——首跑 `pnpm video` TimeoutError：
  hot-driver.py 等待选择器还是已删的 `#guide-panel .guide-card`（FAIL→
  改 `#step-detail details.sd-fold`→复验）；`pnpm video` ✓ 成品 17552ms vs
  ΣholdMs 17552ms（偏差 0.0%）；`pnpm qc` 抽帧 4 张全过，step-3-mid.png 目检
  新布局入片（面板左/表格右/无指南卡/字幕同步）。
- **结论**：**PASS**

## 验证点 6 · 回归

- **证据**：`pnpm verify` EXIT=0（环境 6/6 + 契约 1/1）；确定性 grep 干净
  （模板 JS 无 Math.random/setInterval/Date.now）；`console_errors: []`。
- **结论**：**PASS**
