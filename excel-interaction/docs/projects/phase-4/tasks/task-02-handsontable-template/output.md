# task-02 · output（产出交接）

## 什么功能完成了

**handsontable 模板从契约变为可运行实现**：`skill/excel-tutorial-maker/templates/handsontable/`
四件（index.html / engine.js / lesson.js / theme.css）+ vendored Handsontable 18.1.2 /
HyperFormula 3.5.0。公式真算真回读、4 步状态机 + 动效词汇、自动播放/手动练习双模式、
kimi/green 双主题 token、确定性约束全部落地。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `templates/handsontable/index.html` | 三区一卡 DOM + 公式栏（fx echo）+ 控制钮 |
| `templates/handsontable/engine.js` | mount/setFormula/readValue/focusCell 四 API + getFormula/onChange/unmount（练习与驱动用） |
| `templates/handsontable/lesson.js` | 4 步状态机（gotoStep 可确定性重放）+ focus/typeIn/flash/panelStep 动效 + 自动播放/手动练习 + 验收判定 |
| `templates/handsontable/theme.css` | kimi/green token + `--ht-*` 联动 + 动效关键帧 |

## 要点（hand-off 给下游）

1. **两把 license 钥匙各归其位**：HT `non-commercial-and-evaluation`、HF `gpl-v3`
   ——搞混会整块 license 错误框（本次实测踩中）。
2. **HF getCellFormula 自带 `=`**：回读勿再拼 `=`（练习验收判负的根因）。
3. **测试钩子**：`window.Lesson.{play,gotoStep,finish,reset,practice,state}` +
   `window.Engine.*`——浏览器验收/录屏出片（渲染式重演）都走这套确定性接口。
4. **练习验收 = 值 + 公式双比对**（normalizeFormula 去空白大写后精确比对）。
5. **动效精修空间**：本版为合并里程碑的「基础完整动效」，逐帧时长调优可后续迭代。

## 下游接线

- task-03：new.mjs 复制本模板 → 浏览器验收四点。
- phase-6 渲染式出片：DOM 重演主体即本模板页面，Lesson.gotoStep 是逐拍驱动口。
- univer/onlyoffice 模板：规格已定（templates/README），实现待各引擎课立项。
