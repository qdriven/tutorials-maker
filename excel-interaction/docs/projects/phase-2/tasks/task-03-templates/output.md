# task-03 · output（产出交接）

## 什么功能完成了

**引擎模板契约（templates/）定稿**：总契约（lesson DOM、step 状态机、theme token、
动画挂点、生成后目录形态）+ 三引擎模板 README（能力边界、依赖形态、接线 API）。
生成器（phase-4/5）与模板实现（phase-5）共同遵守这份接口——契约先行，实现后补。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `skill/excel-tutorial-maker/templates/README.md` | 模板契约：三区一卡 DOM、状态机全量重渲染、theme token 两套、动画挂点表、apps/<id>/ 目录形态 |
| `templates/handsontable/README.md` | 默认档：vendored js 依赖、四 API、HyperFormula 真算要求 |
| `templates/univer/README.md` | 中间档：多表引用、npm 打包形态、同一四 API |
| `templates/onlyoffice/README.md` | 功能全档：onlyoffice-only 函数归此、透视/图表扩展点 |

## 要点（hand-off 给下游）

1. **三区一卡 DOM id 稳定**（#table-area/#result-area/#guide-panel/#caption-bar）——
   动效与录屏出片都按此挂点，改 id 等于破坏两个下游。
2. **切步 = 状态全量重渲染**：动画只做入场，回放/手动练习不靠动画倒带（确定性根基）。
3. **三引擎共用最小四 API**（mount/setFormula/readValue/focusCell）——lesson.js 状态机
   引擎无关，onlyoffice 多两个扩展点。
4. **能力边界单源**：engine-matrix.md 是唯一口径，模板 README 只锚定不复述细节。
5. **实现代码是 phase-5 的活**：vendored 依赖、打包、CSS 变量实现都不在本 task。

## 下游接线

- phase-4 流水线：`scripts/tutorial/new.mjs` 按本契约生成 `apps/<id>/`。
- phase-5 生成动画课：模板实现 + 引擎接线 + 主题 CSS，按本契约验收。
- phase-6 出片：渲染式录制的 DOM 重演主体即本 DOM 契约。
