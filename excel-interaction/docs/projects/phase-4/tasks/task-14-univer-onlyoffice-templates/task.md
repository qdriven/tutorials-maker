# phase-4 · task-14 · task（univer / onlyoffice 引擎模板，遗留 #3）

## 背景（deferred #3 原文）

> univer / onlyoffice 引擎模板：模板契约只落了 handsontable；引擎能力矩阵其余引擎
> 待补模板实现（来源 phase-2 task-03 模板规格）。

契约单源三产物要求按课程需求选引擎（engine-matrix：handsontable 基础档 /
univer 多表档 / onlyoffice 全档），但模板只有 handsontable——契约写 `engine: univer`
直接报「无此引擎模板」。本 task 补齐 univer 与 onlyoffice 两个模板实现 + 生成器接线。

## 做什么

1. **univer 模板**（`templates/univer/`）：
   - 预构建包 `dist/univer-kit.js`（IIFE，@univerjs/presets + preset-sheets-core
     1.3.1，~11.7MB minified + css）——esbuild 在 scratch `out/univer-build/` 打包，
     **仓库 pnpm-lock 永不为出片引擎引入依赖**；
   - `engine.js`：`window.Engine` 同 handsontable 最小四 API（mount/setFormula/
     readValue/focusCell + getFormula/getContent/onChange/onSelection）；
   - 多表 `data.sheets[]` 铺开、跨表公式真算（`表名!A1` 记法、中文表名）；
   - 异步公式引擎适配：setFormula 后立刻 readValue 回 null——lesson.js 共享源
     null 兜底 + 250/700ms 固定重读 + 练习态等值落定再判（同步引擎零影响）；
   - 事件钩子随实例走：`Lesson.reset()`=unmount+mount 后 `syncHooks()` 重挂；
   - `focusCell` 补发选区回调（程序化 `activate()` 不发 onSelection，只有真点击发）。
2. **onlyoffice 模板**（`templates/onlyoffice/`）：
   - **docserver 方案**（修正早期「npm SDK 打包」设想）：编辑器由 ONLYOFFICE
     Document Server 服务（`api.js` 按 `window.OO_DOC_SERVER` 加载），前端零 npm 依赖；
   - 通用插件桥（`plugin/`：host⇄插件 `postMessage` `{source:"oo-host"|"oo-tutorial"}`
     → `Asc.plugin.callCommand`，动作层 ping/seed/setValue/setFormula/getValue/
     getFormula/focus）；骨架沿用旧域 `apps/onlyoffice-excel` 已跑通实现；
   - `onChange` = 500ms 值差轮询（Docs API 无单元格变更事件，仅练习态用）；
   - `docs/blank.xlsx` 空文档 + seed 铺契约数据。
3. **生成器接线**（`scripts/tutorial/new.mjs`）：VENDOR 增 univer/onlyoffice 空表
   （预构建进模板 dist/，不走 node_modules）；TPL_DIRS 把模板自带目录
   （univer `dist/`、onlyoffice `plugin/ docs/`）一并拷入引擎层。

## 功能清单

| 文件 | 改动 |
| --- | --- |
| `templates/univer/` | engine.js / index.html / dist/（univer-kit）/ README（实测口径） |
| `templates/onlyoffice/` | engine.js / plugin/（桥）/ docs/blank.xlsx / index.html / README（诚实验证状态） |
| `templates/handsontable/lesson.js` | 共享源异步兼容（null 兜底 + 延迟重读 + 练习态等值落定） |
| `scripts/tutorial/new.mjs` | VENDOR/TPL_DIRS 双引擎接线 |

## 验证点

1. univer 跨表真算：`=SUM(明细!B2:B4)`（中文表名）→ 3600 真算回读；drive 全链
   （自动播放/练习验收/公式栏联动/reset 重挂）+ console 0 错。
2. 生成器双引擎产物结构正确（univer dist 拷入、onlyoffice plugin+docs 拷入），dry-run 后清理。
3. onlyoffice **诚实口径**：桥骨架沿用旧域已跑通实现；四 API 动作层待 docserver
   实测（本机 docker daemon 未运行）——README 记录验证状态与启用 checklist，不虚报。
