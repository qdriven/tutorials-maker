# task-03 · output（产出交接）

## 什么功能完成了

**试点课 vlookup-basic 端到端出课并验收四点全过**：`node scripts/tutorial/new.mjs`
生成 `apps/vlookup-basic/`（handsontable + kimi），浏览器真实跑完一课——自动播放
4 步动画 → 手动练习输入公式 → ✓ 验收；双主题对照；全程零 JS 报错。
**「查看效果」里程碑达成。**

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `apps/vlookup-basic/`（生成物） | 试点动画课：http://localhost:4173/vlookup-basic/index.html |
| [drive.py](drive.py) | 浏览器验收驱动（Playwright，确定性逐拍取证） |
| [shots/](shots/) | 验收截图 8 张（step1-4 / done / practice / theme-green） |
| [result.json](result.json) | 机器可读验收结果 |

## 要点（hand-off 给下游）

1. **查看方式**：`pnpm serve`（或 `node scripts/serve/serve.mjs --dir apps --port 4173`）
   → 开 `http://localhost:4173/vlookup-basic/index.html`（文件协议下 fetch 契约会被拦，
   必须走 http）。
2. **确定性驱动口**：`window.Lesson.gotoStep(n)` / `finish()` / `practice()`——
   phase-6 渲染式出片逐拍截图直接用这套。
3. **视觉取证的教训**：两轮 bug（双等号、license 错误框）都是**看截图**才抓到的，
   CLI 指标全绿不等于画面正确——出片质检（抽帧核对）同理。
4. **动效为「基础完整」**：focus/typeIn/flash/panelStep 四词汇齐、时长达标（单步 ≤1.2s）；
   逐帧精修与更多动效词汇留给后续迭代。
5. **univer/onlyoffice 模板未实现**（规格就位）——立项对应引擎课时再做。

## 下游接线

- phase-6 出片：同一契约 → 录制计划 → 渲染式出片（DOM 重演用本模板页面）。
- phase-7 展示层：apps/vlookup-basic 与 out/ 视频登记进 tutorials.json 展示。
- phase-8 记录收尾：本次构建经验（license 钥匙、HF 双等号、视觉取证）入 skill-log。
