# univer 模板

**定位**：中间档——多工作表引用、更全函数域的教程；公式能力不够 onlyoffice 重需求时用。

## 能力边界（= engine-matrix）

- ✅ 基础公式 + IF/VLOOKUP/INDEX-MATCH + **多工作表引用**
- ⚠️ 动态数组部分支持（用前最小样本实测）；❌ FILTER/XLOOKUP、原生透视、图表有限
- 含 FILTER/XLOOKUP/透视/图表 → 一律换 onlyoffice。

## 依赖形态

- **预构建包** `dist/univer-kit.js`（IIFE，@univerjs/presets + preset-sheets-core 1.3.1，
  ~11.7MB minified + univer-kit.css）——离线可跑，生成时随模板拷入。
- 构建源在本目录 `kit-src/`（kit.js + 独立 package.json/lock，已入库；
  **仓库 pnpm-lock 永不为出片引擎引入依赖**）；改构建源后重新打包：

  ```
  cd kit-src && npm install   # 首次
  npx esbuild kit.js --bundle --format=iife --minify --outfile=../dist/univer-kit.js
  ```

- 启动比 handsontable 慢（画布渲染 + 公式引擎初始化 ~1s）。

## 生成后形态

```
apps/<id>/univer/
  dist/            # 预构建包（univer-kit.js / univer-kit.css，模板自带）
  engine.js        # 接线：同 handsontable 四 API（window.Engine）
```

## 引擎接线点（与 handsontable 同一最小 API）

| API | 语义 |
| --- | --- |
| `mount(el, sheets)` | 铺样例数据（支持多 sheet：`data.sheets[]`） |
| `setFormula(addr, formula)` | 真写公式（跨表引用走 `表名!A1` 记法） |
| `readValue(addr)` | 回读引擎计算结果 |
| `focusCell(addr)` | 聚焦/选中（程序化 activate 不发选区事件，engine.js 补发回调） |
| `getFormula` / `getContent` / `onChange` / `onSelection` / `getSelection` | 同 handsontable 口径 |

## 实现口径（task 落地实测，2026-11-09）

- **跨表真算已实测**：`=SUM(明细!B2:B4)`（中文表名）真算回读 3600 ✓（smoke：
  `scripts/tutorial/smoke/drive-univer.py`，lesson.js 全链路 自动播放/练习验收/公式栏联动 全过）。
- **异步落值**：`setFormula` 后立刻 `readValue` 回 null（公式引擎异步），~数百 ms 后落值。
  lesson.js 共享源已做兜底：step3 结果框固定 250/700ms 重读、练习验收等值落定再判
  （同步引擎零影响）。出片帧捕获在 step3 段内完成重读，画面只见值出现、不见空框。
- **画布引擎无单元格 DOM**：`#table-area [data-cell]` 挂点不存在——flash/鼠标编排选择器
  自然跳过；出片需要单元格光标入画时用 `--mouse`（抓窗式）或 handsontable 引擎。
- **表头带**（data 第 1 行金底）：✅ 已实现——kit.js `buildCellData` 给第 1 行全列内联
  `IStyleData`（金底 #ffca34 / 墨字 #363e40 / 加粗 / 居中，`ICellData.s` 直挂），
  与 handsontable 模板 `td.cell-head` 同观感（#16 闭环，univer 冒烟 SMOKE PASS 取证）；
  外壳（步骤面板/字幕条/结果区）走 theme.css kimi token。
- 事件钩子随实例走：`Lesson.reset()`=unmount+mount 后必须重挂（同 handsontable 教训）。
