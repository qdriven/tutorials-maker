# scripts/tutorial/smoke/ · 引擎模板冒烟（univer 先行）

univer 引擎模板的全链路冒烟（挂载→自动播放→验收回读→练习 onChange→选区联动）
与选区事件探针。测试课 **univer-xsum**（双表跨表 SUM=3600）只入库课程专属物
（`course.config.json` / `lesson.js`），模板拷贝物（index.html / theme.css /
univer/engine.js / univer/dist/*）运行前现取——共享源唯一 =
`skill/excel-tutorial-maker/templates/univer/`，不存在会漂移的拷贝。

## 跑法

```bash
cd domains/excel-interaction
node scripts/tutorial/smoke/setup.mjs                        # 组装 univer-xsum
node scripts/serve/serve.mjs --dir scripts/tutorial/smoke --port 4323 &
python scripts/tutorial/smoke/drive-univer.py                # 全链路冒烟（playwright chromium）
python scripts/tutorial/smoke/probe-sel.py                   # 选区事件探针（可选）
```

截图输出到 `out/univer-smoke/`（媒体口径，不入库）。

## 工具

| 工具 | 做什么 |
| --- | --- |
| `drive-univer.py` | sync-probe（setFormula 后立即 readValue 的异步落值语义）→ `Lesson.play()` 全链路（自动播放/练习验收/公式栏联动）→ 期望结果 3600 |
| `probe-sel.py` | `activate()` 不发选区事件 vs 真点击画布的事件差（engine.js `focusCell` 补发 `selectionHandler` 的实证） |
| `setup.mjs` | 从模板组装 univer-xsum 可运行态（唯一共享源，消除拷贝漂移） |
| `univer-xsum/` | 测试课专属物：course.config.json + lesson.js（双表跨表 SUM 测试数据） |
