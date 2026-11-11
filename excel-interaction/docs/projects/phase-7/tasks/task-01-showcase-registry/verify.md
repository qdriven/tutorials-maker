# phase-7 · task-01 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

取证工具：[drive-01.py](drive-01.py)；截图 [shots/](shots/)；[result.json](result.json)。

## 验证点 1 · 清单校验（正/负向）

- **命令**：`node scripts/showcase/check-tutorials.mjs` · `node scripts/showcase/check-tutorials.mjs --config out/_fixture/bad-tutorials.json`
- **实际输出**：正向 `✓ 清单校验通过：4 条（app/demo/doc）`；负向 fixture 8 处违规全拦
  （app 未显式 index.html / 文件不存在 / id 重复 / demo 前缀不符 / 未知 type / doc 不存在），
  `EXIT=1`。
- **结论**：**PASS**

## 验证点 2 · 登记流幂等

- **命令**：`node scripts/tutorial/new.mjs --id vlookup-basic … --force` · `pnpm video -- --plan out/vlookup-basic/plan.json`
- **实际输出**：new.mjs upsert 后清单仍 4 条（app 条目 description 更新为 oneLiner，
  不新增）；render-video 输出 `展示层已登记 demo: vlookup-basic-video`，成品拷入
  `src/standalone/public/showcase/vlookup-basic.mp4`（1.0MB），清单仍 4 条。
- **结论**：**PASS**

## 验证点 3 · 浏览器实见（showcase 页）

- **证据**：result.json——`card_count=4`、类型分布
  `app:vlookup-basic / demo:vlookup-basic-video / doc:contract-schema / doc:project-index`；
  `iframe_src=/apps/vlookup-basic/index.html`（显式 index.html）且 `iframe_lesson_theme=kimi`
  （课内 DOM 真载入）；视频/两文档 GET 全 200；tab 过滤 `demo=1 / doc=2 / all=4`；
  `console_errors=[]`。shots/showcase-all.png · showcase-app.png · showcase-demo.png 目检
  ——格数同款（金 chip/墨线卡/cream 纸面），iframe 预览动画课、视频播放器、文档链接可点。
- **结论**：**PASS**

## 验证点 4 · 回归

- **证据**：`pnpm verify` EXIT=0（环境 6/6 + 契约 1/1 + 清单 4 条）。
- **结论**：**PASS**
