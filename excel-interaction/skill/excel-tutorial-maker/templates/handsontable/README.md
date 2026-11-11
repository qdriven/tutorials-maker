# handsontable 模板

**定位**：默认引擎——单表基础公式/汇总/格式类教程，最轻、启动最快。

## 能力边界（= engine-matrix）

- ✅ SUM/AVERAGE/MIN/MAX、IF/VLOOKUP/INDEX-MATCH（HyperFormula 函数域内）
- ⚠️ 多工作表引用有限；❌ 动态数组溢出展示（UNIQUE/FILTER 单格回读首值）、透视、真图表对象
- ✅ **图表模拟层**（chart-layer.js）：契约 `chart` + guide `action:"chart"` 触发画布渲染
  （line/bar/pie），数据取自契约可断言（`data-chart-drawn` 属性）；真图表对象基线另出
  （scripts/chartref/ Document Builder，QC 用）——见 templates/README.md 图表课口径
- **跨表 SUM 直接换引擎**（univer/onlyoffice），不在本模板做变通。

## 依赖形态

- 前端：Handsontable + HyperFormula，**vendored js**（构建时拷入 `apps/<id>/<engine>/vendor/`，
  不走 CDN——离线可跑、版本锁定）。
- 无后端、无构建步骤要求（生成物直接可开）。

## 生成后形态

```
apps/<id>/handsontable/
  vendor/          # handsontable.full.min.js + handsontable.min.css + ht-theme-main.min.css
  #              # + hyperformula.full.min.js + hyperformula-enGB.js（函数表语言包）
  #              # （v18 包布局：CSS 在 styles/，无 sourcemap）
  engine.js        # 接线：data.sheets → 表格；写公式/回读值 API
  formula-assist.js # 编辑交互：点选插引用 + 函数建议弹层
```

## 引擎接线点（lesson.js 调用的最小 API）

| API | 语义 |
| --- | --- |
| `mount(el, sheets)` | 按契约 data 铺样例数据 |
| `setFormula(addr, formula)` | 真写公式进单元格 |
| `readValue(addr)` | 从单元格回读计算结果（验收用） |
| `focusCell(addr)` | 聚焦/选中（动效挂点） |

实现要点：公式必须走 HyperFormula 真算，`readValue` 读引擎结果而非手算值。
练习/驱动附加 API（非最小契约，供手动练习验收与逐拍重放）：`getFormula`（HF 回读公式
**自带 `=`，勿再拼接**）、`onChange`、`unmount`。license 两把钥匙各归其位：
Handsontable 用 `non-commercial-and-evaluation`，HyperFormula 用 `gpl-v3`（搞混会整块
license 错误框）。实现见 [engine.js](engine.js) / [lesson.js](lesson.js) / [theme.css](theme.css)。

## 编辑交互（Excel 级四件）

| 交互 | 行为 | 实现 |
| --- | --- | --- |
| 公式栏联动 | 点/选中任意格 → fx 显示该格内容（公式原样/字面值原样） | engine.onSelection → lesson.js |
| 拖选/填充柄 | 拖选范围、Shift 扩选、填充柄 | HT selection 模型（fillHandle 显式开启） |
| 点选插引用 | 编辑公式时单击插 `D2`、拖选插 `A2:B5`（编辑不中断） | formula-assist.js point mode |
| 函数建议 | 输入 `=`/前缀弹函数表建议，↑↓ 选、Tab 插 `FUNC(`、Esc 关 | formula-assist.js + HF 函数表（418 项） |
| 全角自动转换 | 中文 IME 输 `＝（），：；＂` 等公式即时转半角；引号内字面量、文本格原样 | formula-assist.js `normalizeFormula` + engine.setFormula 兜底 |

验收框折叠面板/字幕/练习提示的**参数逐位说明**从契约 `formulaArgs` 渲染（lesson.js），
口径见 [references/contract-schema.md](../../references/contract-schema.md)。

HT 生命周期坑（实现必读）：`afterSelectionEnd` 去选以 (-1,-1) 触发须防空；
**无 `afterFinishEditing` 钩子**（编辑态用 `getActiveEditor().isOpened()`）；
编辑器 textarea 跨编辑复用；HF 函数表取数「先直接取、取不到再 registerLanguage」
（HT 插件装配时已注册 enGB，顺序反了必空表）。
