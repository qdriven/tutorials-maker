# task-02 · handsontable 模板实现（真引擎 + 双主题 + 动效）

## 做什么

把 phase-2 定稿的模板契约变成**可运行实现**：`skill/excel-tutorial-maker/templates/handsontable/`
（index.html / engine.js / lesson.js / theme.css）+ vendored Handsontable/HyperFormula。
本 task 属 phase-4+5 合并里程碑。

## 功能定义

- **engine.js**：契约四 API——`mount(el, sheets)` / `setFormula(addr, formula)` /
  `readValue(addr)` / `focusCell(addr)`，Handsontable + HyperFormula **真算真回读**
  （练习模式校验附加 `getFormula(addr)`）。
- **lesson.js**：4 步状态机（idle→step1..4→done）+ 动效词汇（focus/typeIn/flash/panelStep）
  + 自动播放与手动练习双模式（共用状态机）+ 练习验收（对照 checks）。
  **确定性**：禁 Math.random / 禁无限循环 / 禁墙钟依赖。
- **theme.css**：kimi / green 两套 token（--bg/--fg/--accent/--font），`?theme=` 可覆盖。
- **index.html**：三区一卡 DOM 契约（#table-area/#result-area/#guide-panel/#caption-bar）。
- **vendored 依赖**：handsontable + hyperformula 入 devDeps，生成时拷入
  `apps/<id>/handsontable/vendor/`（离线可跑、版本锁定）。

## 验证点

1. HyperFormula 在 node 实算 `=VLOOKUP(D2,A2:B5,2,0)`（vlookup-basic 数据）→ `王五`（数字说话）。
2. DOM 契约齐全（三区一卡 id + data-theme/data-engine 标记）；动画挂点标记存在。
3. 确定性静态检查：lesson.js 无 `Math.random`/`setInterval` 无限循环/`Date.now` 画面依赖。

## 前置与依赖

- phase-2 task-03 模板契约（接口基准）；phase-3 试点契约（数据用例）。

## 范围外

- univer / onlyoffice 模板实现（各引擎课立项时再做，规格已就位）；
- 浏览器端验收四点（task-03）。
