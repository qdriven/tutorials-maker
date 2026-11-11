# task-12 · UI 主题改格数同款（kimi token 重做）

## 背景（用户反馈）

用户原话：「当前 UI themes 这个还不是很满意，期望变成 kimi 的格数的样式」。
此前把 kimi 解释成「中性编辑风（纸白/墨黑/橙红）」不满足期望——真身是格数/kimi-excel
的 Handsontable 教程视觉（`domains/excel-animation/src/standalone/public/showcase/themes/
theme-kimi.css` + `kimi.png`）：cream 纸面 / 墨 ink / 金 gold / 蓝 accent，纸面+墨线、
小圆角、无阴影无渐变。

## 做什么

1. **token 重做**（templates/handsontable/theme.css）：kimi 换格数色板——
   `--bg:#f8f8ea / --panel:#fcfcf2 / --sheet:#fefdf6 / --band:#efefdf / --fg:#363e40 /
   --soft:#6c7678 / --line / --accent:#48699b / --accent-strong:#36547f / --accent-soft /
   --gold:#ffca34 / --gold-soft:#fbe9ac / --code-bg·fg / --formula-bg·fg / --edit-bg`；
   小圆角 token（--radius 4px / --radius-control 3px）；字体换格数字体栈。
   green 主题补齐同套辅助 token（不破双主题契约，禁第三套）。
2. **组件层对齐**：caption-bar 墨底纸字、sd-sum 金左条+金调底、sd-step-no 金底墨字
   小方章、fx 墨线小方框、按钮墨线（▶ 主按钮墨底纸字）、弹层墨线无阴影。
3. **Handsontable `--ht-*` 全量映射**（照 theme-kimi.css 的 `.hot-grid` 块）：表头灰带、
   active 行列头（墨/金）、选区蓝、编辑底 #fffdf4、radius 0。**落点修正**：vendor 主题把
   `--ht-*` 声明在 `.ht-theme-main` 根上，旧的 `[data-theme]` 祖先层映射被元素自身声明
   盖掉（网格一直是 ht-theme-main 默认盘）——本次映射打到 `[data-theme] .ht-theme-main`。
   弹层挂 body 的变量可达性用 `:root` 默认盘 + `html:has(...)` 兜住。
4. **金底表头带**：契约 data 第 1 行约定为表头行（contract-schema 注明），engine.js
   renderer 给 r===0 打 `cell-head` 类（金底/墨字/加粗/居中）。

## 验证点

1. 计算样式探针：`.ht-theme-main` 上 `--ht-accent-color` = #48699b、`--ht-background-color`
   = #fefdf6、`--ht-header-row-active-background-color` = #ffca34（映射落点修正生效）；
   `?theme=green` 翻转联动（accent=#217346）。row-0 td 金底加粗（表头带）。
2. 截图目检（对照 kimi.png）：cream 纸面/墨线卡/金表头带/蓝选区/墨底字幕条——
   idle / step2 / practice / done + 表格区特写 + green 对照。
3. 回归：练习态防剧透 folds 不变、summary 框语义不变、console 零报错。
4. 出片重跑（主题进帧）：`pnpm plan` / `pnpm video` 漂移 <5% / `pnpm qc` 抽帧目检新主题。
