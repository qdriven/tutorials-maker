# phase-7 · task-04 · verify（验证记录）

日期：2026-11-09。口径：命令 + 实际输出 + 结论，FAIL 也记。

## 验证点 0 · 声音根因（诊断留档）

```
$ ffmpeg -i src/standalone/public/showcase/{vlookup,sum}-basic.mp4 -af volumedetect -f null NUL
  vlookup: mean_volume -20.8 dB / max_volume -3.7 dB   ← mp4 有解说声
  sum:     mean_volume -20.4 dB / max_volume -3.5 dB   ← mp4 有解说声
$ curl -sI .../vlookup-basic.mp4 | grep -i cache
  Cache-Control: no-store                            ← 不是缓存陈旧
$ python out/_probe2/probe-sound.py   （旧代码）
  vlookup: {"muted": false, "paused": true, "t": 0}   ← 首屏卡死不动
  console: Unmuting failed and the element was paused instead
           because the user didn't interact with the document before.
```

**结论：根因定案**——文件有声；`playing` 里程序化解静音在无用户交互时被 Chromium
**拒绝并把视频暂停**，首屏（未点击过）既无解说也不播放。sum 有声只是因为切课点击
恰好是手势。修复 = 手势门控解静音 + 🔊 按钮 + 首次点击全局解锁。

## 验证点 1 · 无手势自播 + 手势出声（回归检查）

```
$ python docs/projects/phase-7/tasks/task-02-showcase-sidebar/drive-02.py
  首屏无手势：视频静音自播（快速预览，未被解静音误暂停）
    {"muted": true, "paused": false, "t": 1.1, "dur": 20}
  🔊 开声按钮可见（手势前） true
  手势后有声播放 {"muted": false, "paused": false, "t": 1.6, "dur": 20}
  开声后 🔊 按钮隐藏 true
  切课后视频有声播放 {"muted": false, "paused": false, "t": 0.8, "dur": 17}
```

**结论：PASS**——手势前画面照播（内容可快速预览）+ 🔊 引导；任何点击即出声；不再被暂停。

## 验证点 2 · 快速预览三类

```
  演示视频快速预览（页内播放器） {"open": true, "muted": false, "paused": false, "dur": 20}
  文档 markdown 渲染（h1/表格/代码块/段落） {"h1": 1, "h2": 8, "table": 2, "code": 7, "p": 10}
  清单 JSON 渲染（折叠树） {"tree": 8, "keys": 32, "rawPre": 0}
```

抽帧目检 `shots/shot-preview-md.png`（契约 schema 渲染：标题/加粗行内码/JSONC 代码块）、
`shots/shot-preview-json.png`（tutorials.json 折叠树：对象{2}→items 数组[6]）、
`shots/shot-top.png`（金色 🔊 按钮浮于视频字幕条上方）。markdown 是渲染件非裸文本，
JSON 是折叠树非裸 JSON（rawPre 0）。

**结论：PASS**——「直接访问 json 文件」已改为组件化预览，原文可「新窗口打开」兜底。

## 验证点 3 · 既有口径不回退 + 全量校验

```
  文章四节顺序 [sec-overview, sec-video, sec-practice, sec-summary] ✓
  分步/构建节不存在 ✓ · 页面无构建命令文本 ✓ · 目录 4 条 ✓ · console 0 条
$ pnpm verify
  必需 6/6 通过 · 2 份契约 2 通过 / 0 失败 · 清单 6 条通过
```

**结论：PASS**。

## FAIL 记录（修复闭环）

1. **自动化假激活导致首检歧义**：Playwright 上下文里 `navigator.userActivation.hasBeenActive`
   从一开始就是 true（与真实首访浏览器相反），解静音是否被 UA 回滚成随机竞态
   （同一代码两轮取到 muted:false 与 muted:true）。
   **修复**：drive-02 加 init script 按真实语义伪造该值（首触前 false、首次真实输入后恒 true），
   「手势前静音 → 点击出声」走成确定性检查；`setSound` 加 setTimeout(done,0) 兜底
   解静音被回滚的场景（保画面 + 亮按钮）。
