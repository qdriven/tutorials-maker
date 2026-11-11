# phase-4 · task-14 · output（产出交接）

## 什么功能完成了

**univer / onlyoffice 引擎模板**（遗留 #3 清账）——引擎矩阵三档全部有模板实现：
univer 端到端可用（跨表 SUM 真算 3600 实测、drive 全链 SMOKE PASS）；onlyoffice
按 docserver 方案落位（桥骨架沿用旧域已跑通实现，四 API 动作层待 docserver 实测，
诚实记档）。生成器 TPL_DIRS/VENDOR 接线双引擎。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `templates/univer/`（engine.js / index.html / dist/ / README） | 多表档：预构建 univer-kit + 四 API 接线 + 实测口径 |
| `templates/onlyoffice/`（engine.js / plugin/ / docs/ / README） | 全档：docserver + 插件桥 + 诚实验证状态 |
| `templates/handsontable/lesson.js` | 共享源异步兼容（null 兜底/延迟重读/练习态等值落定） |
| `scripts/tutorial/new.mjs` | VENDOR（univer/onlyoffice 空表）+ TPL_DIRS（dist / plugin+docs） |

## 要点（hand-off 给下游）

1. **引擎选择口径**（engine-matrix）：基础课→handsontable（默认、最轻）；
   多工作表引用/更全函数域→univer；FILTER/XLOOKUP/透视/图表→onlyoffice（唯一选择）。
   写契约时定 `engine` 字段，onlyoffice-only 函数出现即必须 onlyoffice。
2. **univer 异步语义**：setFormula 后 readValue 先 null 后落值——lesson.js 已兜底，
   新增引擎接线照抄「null-guard + 延迟重读 + 练习态等值落定」三件套。
3. **univer 构建源已入库**：`skill/excel-tutorial-maker/templates/univer/kit-src/`，重打包命令见
   templates/univer/README——**仓库 pnpm-lock 永不为出片引擎引依赖**。
4. **onlyoffice 启用 checklist**（README）：① 起 docserver（8080，docker run 命令在
   README）② 静态服务 ③ 打开 apps/<id>/index.html ④ 跑 drive 验收（onlyoffice 版待补）。
   四 API 动作层实测前不要对 onlyoffice 出片做承诺。
5. 画布引擎（univer/onlyoffice）无单元格 DOM——flash/页内鼠标选择器自然跳过；
   出片要单元格光标入画用 `--mouse`（抓窗式真实光标）或 handsontable 引擎。

## 下游接线

- 新课契约 `engine: univer | onlyoffice` 直接可生成（new.mjs 无模板缺失报错）；
- univer 课出片走渲染式/录屏式（画布无 DOM 挂点）；
- onlyoffice 实测 = 启 docserver 后跑 README「启用 checklist」四步，补 drive 取证。
