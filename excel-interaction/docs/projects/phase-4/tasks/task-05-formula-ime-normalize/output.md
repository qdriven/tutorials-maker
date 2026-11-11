# task-05 · output（产出交接）

## 什么功能完成了

**公式上下文全角→半角自动转换**（中文 IME 防错）：用户在中文输入法下输
`＝SUM（１２３，４５６）` 这类全角公式，输入即转 `=SUM(123,456)`、提交即算，
用户无感。文本格原样、引号内字面量保真。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `templates/handsontable/formula-assist.js` | `normalizeFormula`（引号感知全角→半角）+ input 监听即时转换（=/＝ 开头才转） |
| `templates/handsontable/engine.js` | `setFormula` 提交路径兜底再过一次转换（自动化/练习路径） |
| `docs/.../task-05/drive-ime.py` | 验收驱动（6 项，真键盘输全角）+ shots/ 5 张 + result.json |

## 要点（hand-off 给下游）

1. **转换口径**：U+FF01–U+FF5E 全角块 → ASCII（÷0xFEE0），全角空格 → 半角空格；
   引号（`"`/`＂`）切换字面量模式，**引号内不转**（`＂价格，单位＂` →
   `"价格，单位"`，内层 `，` 保留）。
2. **光标安全**：逐字符 1:1 替换 + 只改 `ta.value`，替换后光标位置天然不动；
   触发条件是「首个非空字符为 =/＝」——文本值永不触发。
3. **两条路径都要转**：编辑器 input 监听（用户手打）+ `Engine.setFormula`
   兜底（练习/驱动喂入）；只做其一会漏。
4. **与 lesson.js `normalizeFormula` 同名不同物**：那个是验收比对用
   （去空白+大写），这个是输入转换用——勿混。

## 下游接线

- task-06 公式参数说明同轮完成（guide 卡片/字幕/练习提示渲染 formulaArgs）。
- phase-6 出片：录屏画面里学员打公式的镜头不再出全角废稿，讲解词不用避讳 IME 话题。
