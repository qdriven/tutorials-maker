# task-12 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

取证工具：[drive-12.py](drive-12.py)；截图 [shots/](shots/)；[result.json](result.json)；
出片抽帧 `out/vlookup-basic/qc/`（gitignored）。

## 验证点 1 · 格数 token + Handsontable 映射落点

- **证据**：`.ht-theme-main` 计算样式探针——`--ht-accent-color`=rgb(72,105,155)（#48699b）、
  `--ht-background-color`=rgb(254,253,246)（#fefdf6）、`--ht-header-background-color`=
  rgb(239,239,223)（#efefdf）、`--ht-header-row-active-background-color`=rgb(255,202,52)
  （#ffca34）；bodyBg=rgb(248,248,234)（cream）、captionBg=rgb(54,62,64)（墨）。
  表头带：`#grid td.cell-head` 金底 rgb(255,202,52)/700/居中/「工号」。
- **结论**：**PASS**

## 验证点 2 · 画面目检（对照 kimi.png）+ 双主题联动

- **证据**：shots/theme-idle.png · theme-step2.png · theme-done.png · theme-grid.png 目检
  ——cream 纸面、金表头带、灰行列头带、蓝选区（E2 边框+填充柄）、墨线小圆角卡、
  金步码方章、总结框金左条、墨底纸字字幕条，与格数视觉一致；
  `?theme=green` 翻转联动（accent=rgb(33,115,70)、表头带赭金 #c8862a），
  theme-green.png 目检双主题不破。
- **结论**：**PASS**

## 验证点 3 · 回归（防剧透 / summary 语义 / console）

- **证据**：`folds_practice=[f,f,f,f]`（练习态防剧透不变）；done 态
  `done_panel_head="✓ 演示完成"`、`done_has_outro_box=true`、字幕 ✓+总结 全文；
  `console_errors: []`。
- **结论**：**PASS**

## 验证点 4 · 出片重跑（主题进帧）+ 全链回归

- **证据**：`pnpm plan` 6 段 41136ms（开篇/4 步/收尾口播整轨对齐）；`pnpm video`
  41136ms vs ΣholdMs 41136ms（偏差 **0.0%**）；`pnpm qc` 6 抽帧全过，
  intro-mid/outro-mid 目检新主题入帧 + 字幕同步；`pnpm verify` EXIT=0
  （环境 6/6 + 契约 1/1）；确定性 grep 干净。
- **结论**：**PASS**

## 过程记录（两处踩坑，一处产品缺陷顺手修）

1. **`--ht-*` 映射落点坑（产品隐形缺陷，修正）**：vendor ht-theme-main 把 `--ht-*`
   直接声明在 `.ht-theme-main` 根上——旧 `[data-theme]` 祖先层映射被元素自身声明盖掉，
   网格其实一直走 ht-theme-main 默认盘。本次映射打到 `[data-theme] .ht-theme-main`
   本体（探针复验值精确命中格数色板才收口）。
2. **reset() 残留练习态（task-08 引入练习态后潜伏，顺手修）**：首跑 theme-done.png 左栏仍是
   「✍ 手动练习」头而字幕已 ✓ 收尾——reset() 不清 mode，且 stepDetailHTML 的
   practice 分支先于 step===5。修复：reset() 置 `mode="auto"`（重置回空闲态，
   出片 reset=确定性空闲帧）。复验 `reset_clears_practice=true`、
   `done_panel_head="✓ 演示完成"`。
3. **取证工具小修（非产品）**：GBK 控制台打 ✓/✗ 崩 UnicodeEncodeError——
   drive-12.py 补 `sys.stdout.reconfigure(encoding="utf-8")`。
