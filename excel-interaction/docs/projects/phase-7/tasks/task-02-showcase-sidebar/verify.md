# phase-7 · task-02 · verify（验证记录）

日期：2026-11-08。取证驱动 `drive-02.py`（Playwright，全量输出在 `result.json`）。

## 验证点 1 · 文章六节顺序（如何构建收尾）

```
$ python docs/projects/phase-7/tasks/task-02-showcase-sidebar/drive-02.py
  {"点": "文章六节顺序", "值": ["sec-overview", "sec-video", "sec-steps", "sec-practice", "sec-summary", "sec-build"]}
  {"点": "本课目录条目数", "值": 6}
  {"点": "如何构建命令块", "值": 4}
```

**结论：PASS**——固定六节、`sec-build` 末位；目录 6 条；一图流命令块 4 个（契约/生成/出片/自检）。

## 验证点 2 · 视频自动播放 + 参数行挂点

```
  {"点": "视频自动播放（muted+paused?）", "值": {"muted": true, "paused": false, "dur": 27}}
  {"点": "分步讲解步数", "值": 4}
  {"点": "公式参数行数", "值": 4}
```

**结论：PASS**——`paused: false` 自动播放成立；vlookup 4 参数行只挂第 2 步（首个公式步）。
**FAIL 修正记录**：① 初版 `paused: true`（autoplay 属性被拦）→ `bindVideoDurations` 里
`v.play()` 兜底后 `paused: false`；② 初版参数行 12 条（每个公式步都挂 4 行）→ 改「只挂首个
公式步」（与口播规则 4 同口径）后 4 条。

## 验证点 3 · sidebar 切课换源

```
  {"点": "动手练习 iframe", "值": "/apps/vlookup-basic/index.html"}
  {"点": "切课后标题", "值": "SUM 求和：把一片区域加总"}
  {"点": "切课后 active", "值": "SUM 求和：把一片区域加总"}
```

**结论：PASS**——点 SUM 后文章整篇换源（标题/正文/命令块 id= sum-basic），active 态跟随。

## 验证点 4 · 截图目检 + console + 清单校验

- `shots/shot-top.png`：sidebar 品牌「无废话 Excel 教程」+ 课程金色 active + 概览卡 + 视频播放中。
- `shots/shot-build.png`：总结卡（口播式前缀已去重）+ 如何构建四步墨底命令块 + 文档链接收尾。
- `shots/shot-sum-course.png`：SUM 完整教程整页（六节齐全，视频角标「讲解视频 25 秒」）。
- console 0 条错误/告警。

```
$ pnpm verify
  ✓ 清单校验通过：6 条（app/demo/doc）（环境 6/6、契约 2/2 同绿）
```

**结论：PASS**。
