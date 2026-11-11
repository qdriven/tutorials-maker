# phase-4 · task-14 · verify（验证记录）

日期：2026-11-09。口径：命令 + 实际输出 + 结论，FAIL 也记。onlyoffice 未实测部分诚实标注。

## 验证点 1 · univer 跨表真算 + drive 全链（SMOKE PASS）

测试课 `out/univer-smoke/univer-xsum/`（scratch，不入库）：engine=univer，双表
汇总/明细，验收格公式 `=SUM(明细!B2:B4)`（中文表名跨表），4 步指南 + formulaArgs。

```
$ python out/univer-smoke/drive-univer.py
  同步探针：setFormula → readValue 真算回读 3600 ✓
  自动播放 4 步全落定 ✓｜练习态 onChange 验收 ✓｜公式栏联动（选区回调）✓
  reset() 后事件重挂 ✓｜console 错误 0
  SMOKE PASS
```

截图取证 `shots/shot-univer-xsum.png`：练习态完成——B2 显示 **3600**、编辑栏
`=SUM(明细!B2:B4)`、双表标签「汇总/明细」可见、验收栏「B2 显示 3600，公式真算真回读，
与契约一致」。跨表 SUM 真算达成（注意：此为 univer 引擎内跨表，与 handsontable
跨表 SUM 冻结事项无关）。

## 验证点 1b · 三个引擎语义坑（探针取证，FAIL→修复）

| 坑 | 取证 | 修复 |
| --- | --- | --- |
| 异步落值 | setFormula 后立刻 readValue 回 **null**（~数百 ms 后落值）；结果框曾显示字符串 `"null"` | lesson.js 共享源 null 兜底 + 250/700ms 固定重读 + 练习态等值落定再判（同步引擎零影响） |
| activate 不发选区事件 | `out/univer-smoke/probe-sel.py`：`after activate(): []`，真点击画布：`['C3']` | engine.js `focusCell` 补发 `selectionHandler(addr)`（对齐 handsontable 语义） |
| 事件钩子随实例走 | `Lesson.reset()`=unmount+mount 后 onChange/onSelection 全丢 | engine.js `syncHooks()` 重挂（同 handsontable 教训） |

画布引擎无单元格 DOM（`[data-cell]` 挂点不存在）——flash/鼠标编排选择器自然跳过，
属预期边界（README「实现口径」记档）。

## 验证点 2 · 生成器双引擎接线（dry-run）

```
$ node scripts/tutorial/new.mjs --id oo-smoke --config out/oo-smoke.json
  ✓ apps/oo-smoke/ 已生成（引擎 onlyoffice · …）
  落盘核对：index.html/lesson.js/theme.css/course.config.json ✓
  onlyoffice/engine.js ✓｜onlyoffice/plugin/{config.json,index.html,plugin.js,icon.png} ✓
  onlyoffice/docs/blank.xlsx ✓
（清理：git checkout -- src/data/tutorials.json && rm -rf apps/oo-smoke）
```

univer 同款走 TPL_DIRS 拷 `dist/`（univer-kit.js/css）——smoke 课即生成器产物形态。

## 验证点 3 · onlyoffice 诚实口径（未实测，如实记录）

- ✅ 桥骨架（postMessage + callCommand + 插件自启）沿用旧域 `apps/onlyoffice-excel`
  已跑通的实现（4 个演示课实拍）；
- ⚠️ **四 API 动作层未经 docserver 实测**：本机 docker CLI 在、daemon 未运行，
  拉起 docserver + 实测待办（README「验证状态」+「启用 checklist」）；
- `onChange` 无单元格事件（Docs API 边界）→ 500ms 值差轮询；`onSelection` 接口位保留不回抛；
- FILTER/XLOOKUP 等 onlyoffice-only 函数只允许出现在本模板课程里。

## 验证点 4 · 预构建包

```
$ cd out/univer-build && npx esbuild kit-src/kit.js --bundle --format=iife --minify \
    --outfile=../../skill/excel-tutorial-maker/templates/univer/dist/univer-kit.js
  → univer-kit.js 11.7MB minified + univer-kit.css（@univerjs/presets 1.3.1）
```

仓库 pnpm-lock 未动（构建在 scratch `out/` 用 npm `--no-workspaces`）。

## 结论

1/2/4 全过（univer 端到端可用）；3 中 onlyoffice 动作层**待 docserver 实测**——
不虚报，README 记录启用 checklist。
