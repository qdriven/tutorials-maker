# phase-7 · task-04 · output（产出交接）

## 什么功能完成了

**展示层快速预览 + 视频有声修复**（用户 task-21 反馈闭环）——文档/清单 JSON/讲解视频
一律点开即页内预览（markdown 渲染 / JSON 折叠树 / 内嵌播放器）；首屏视频不再被
「解静音误暂停」杀死，手势后有声，🔊 按钮兜底。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `src/standalone/showcase.js` | setSound 手势门控/解锁；openPreview + mdRender + jsonView；演示视频组 |
| `src/standalone/showcase.css` | 🔊 按钮、#preview 层、.md/.json-view 样式 |
| `src/standalone/index.html` | demo-links、#preview 骨架、可点清单 |
| `docs/projects/phase-7/tasks/task-02-showcase-sidebar/drive-02.py` | 声音回归 + 预览三类检查点（含真实首访语义伪造） |

## 要点（hand-off 给下游）

1. **Chromium 铁律**：无用户交互时程序化解静音会被**拒绝并把视频暂停**
   （`Unmuting failed and the element was paused instead`）——任何「autoplay muted
   起播后 JS 解静音」的写法都踩坑；正确姿势 = 手势门控（`navigator.userActivation`
   或首次 pointerdown/keydown）+ 可见 🔊 兜底。已固化在 setSound/bindUnlock。
2. **`navigator.userActivation` 在自动化上下文是假激活**（hasBeenActive 恒 true），
   与真实首访相反——UI 验收必须 init script 伪造真实语义，否则检查结果随机。
3. **快速预览组件口径**：内容不裸链文件——.md 渲染、.json 折叠树、mp4 内嵌，
   「新窗口打开原文」留逃生口；新增内容类型（如 yaml/csv）进 previewDoc 分流即可。
4. 演示视频一键快览在 sidebar「演示视频」组；文章四节结构不动（task-19 口径）。

## 下游接线

- 新 doc/demo 清单条目自动进预览（按扩展名分流）；视频自动带 🔊 与手势出声；
- 取证驱动 drive-02.py 已固化 17 检查点（声音 4 + 预览 3 + 既有 10）；
- 修复只动展示层；出片链（mp4 音轨）本来就正常，别去动 render-video。
