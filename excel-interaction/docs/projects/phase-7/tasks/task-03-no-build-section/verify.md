# phase-7 · task-03 · verify（验证记录）

日期：2026-11-08。取证驱动 `drive-02.py`（已更新检查点，输出在 `result.json`）。

```
$ python docs/projects/phase-7/tasks/task-02-showcase-sidebar/drive-02.py
  {"点": "文章四节顺序（分步/构建已移除）", "值": ["sec-overview","sec-video","sec-practice","sec-summary"]}
  {"点": "分步讲解节不存在", "值": true}
  {"点": "如何构建节不存在", "值": true}
  {"点": "页面无构建命令文本", "值": true}
  {"点": "本课目录条目数", "值": 4}
  {"点": "视频有声播放（muted+paused）", "值": {"muted": false, "paused": false, "dur": 28}}
  {"点": "切课后标题", "值": "SUM 求和：把一片区域加总"}
  console: 0 条

$ pnpm verify
  ✓ sum-basic.json ✓ vlookup-basic.json —— 2 份契约，2 通过 / 0 失败
  ✓ 清单校验通过：6 条（app/demo/doc）
```

目检 `../task-02-showcase-sidebar/shots/shot-summary.png`：文章以「总结」收尾，
无构建命令块；sidebar 目录 4 条。

**结论：PASS**（全部检查点绿，console 0 条）。
