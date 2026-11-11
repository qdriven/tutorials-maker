# Phase 4 · 流水线层（含 phase-5 合并里程碑）

## 这个 phase 做什么

**合并里程碑（用户选定方案 C）**：phase-4 流水线 + phase-5 模板实现/试点出课连续推进，
结束直接查看完整效果。范围：`scripts/` 流水线（new.mjs / check-manifest.mjs / serve.mjs）、
handsontable 模板实现（真引擎 + 双主题 + 动效）、试点课 vlookup-basic 出课与浏览器
验收四点。文档构建（scripts/docs/）推迟到 phase-7 展示层统一做。

对齐 [build-checklist 阶段 4](../../../../excel-animation/docs/build-checklist.md)
与阶段 5；phase-5 目录的验收四点在 task-03 交付。

## tasks/

| task | 做什么 | 状态 |
| --- | --- | --- |
| [task-01-pipeline-scripts](tasks/task-01-pipeline-scripts/) | 流水线三脚本 + package.json 命令链 | ✅ |
| [task-02-handsontable-template](tasks/task-02-handsontable-template/) | handsontable 模板实现（真引擎/双主题/动效/确定性） | ✅ |
| [task-03-pilot-app-verify](tasks/task-03-pilot-app-verify/) | 试点出课 + 浏览器验收四点（截图取证） | ✅ |
| [task-04-handsontable-interactions](tasks/task-04-handsontable-interactions/) | Excel 级编辑交互四件（公式栏联动/拖选/点选插引用/函数建议） | ✅ |
| [task-05-formula-ime-normalize](tasks/task-05-formula-ime-normalize/) | 公式输入全角自动转换（中文 IME 防错） | ✅ |
| [task-06-formula-args](tasks/task-06-formula-args/) | 公式参数逐位说明 formulaArgs（契约单源三渲染） | ✅ |
| [task-07-step-detail](tasks/task-07-step-detail/) | 验收框逐步展示（当前步四要素+参数逐位大字号） | ✅ |
| [task-08-practice-step-hints](tasks/task-08-practice-step-hints/) | 手动练习步骤提示（练习态验收框全步清单） | ✅ |
| [task-09-step-accordion](tasks/task-09-step-accordion/) | 验收框全步折叠展示（accordion，非替换） | ✅ |
| [task-10-practice-anti-spoiler](tasks/task-10-practice-anti-spoiler/) | 练习态防剧透折叠 + 布局换边（面板左）+ 删指南卡 | ✅ |
| [task-11-summary-intro-outro](tasks/task-11-summary-intro-outro/) | 一句话总结/解释/收尾总结（summary 单源双产物） | ✅ |
| [task-12-theme-kimi-grid](tasks/task-12-theme-kimi-grid/) | UI 主题改格数同款（kimi token 重做 + HT 映射落点 + 金底表头带） | ✅ |
| [task-13-args-narration](tasks/task-13-args-narration/) | 公式参数逐位进口播（formulaArgs 口播，task-06 欠账清偿） | ✅ |
| [task-14-univer-onlyoffice-templates](tasks/task-14-univer-onlyoffice-templates/) | univer / onlyoffice 引擎模板（遗留 #3，univer 实测 SMOKE PASS / onlyoffice 诚实口径） | ✅ |

每个 task 目录三件套：`task.md`（做什么/功能/验证点）、`verify.md`（验证记录）、`output.md`（交接）。
构建方式见 [build-method.md](../../build-method.md)。查看效果：
`pnpm serve` → `http://localhost:4173/vlookup-basic/index.html`。
