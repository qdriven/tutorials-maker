# phase-7 · task-04 · task（快速预览组件 + 视频有声修复，用户 task-21）

## 背景（用户反馈原文）

> 请修改这两个demo视频确保所有的内容都可以快速预览和第一个vlookup视频一样
> schema 展示这些内容还是直接访问了json文件这个需要使用markdown preview 组件查看
> 或者json schema文件需要使用一个html 解析器可以非常清楚的查看
> 问题视频是没有任何解说的声音，为什么，请检查

四点归一：**展示层所有内容要能页内快速预览**（视频/文档/清单 JSON 都像第一条 vlookup
视频那样点开即看），文档不能裸链文件；外加 **视频没有解说声音** 要查根因并修。

## 做什么

1. **声音根因修复**（实测定案）：mp4 音轨一直有声（volumedetect mean -20dB）——根因是
   `playing` 事件里程序化解静音，**用户没交互过时 Chromium 拒绝解静音并把视频暂停**
   （console：`Unmuting failed and the element was paused instead`），首屏视频既不动也没声。
   修法：手势门控解静音（`navigator.userActivation`）+ 全局首次 pointerdown/keydown 解锁
   + `🔊 开启解说声音` 按钮兜底 + 解静音被回滚时保画面/亮按钮。
2. **快速预览组件**（#preview 层）：所有内容点开即页内预览，不裸链新窗口——
   `.md` 走 markdown 渲染（标题/表格/代码块/行内码/列表/引用）、`.json` 走 HTML
   JSON 折叠树渲染器、mp4 走内嵌播放器；保留「新窗口打开原文」逃生口。
3. **入口**：sidebar 新增「演示视频」组（两条讲解视频一键快览）；参考文档改预览层；
   侧脚「清单」可点 → tutorials.json 折叠树。

## 功能清单

| 文件 | 改动 |
| --- | --- |
| `src/standalone/showcase.js` | setSound 手势门控 + 解锁/bindVideos；openPreview + mdRender + jsonView；演示视频组 |
| `src/standalone/showcase.css` | 🔊 按钮、#preview 层、.md/.json-view 样式（格数 token） |
| `src/standalone/index.html` | demo-links 导航、#preview 骨架、侧脚清单链接 |
| `docs/.../drive-02.py` | 声音回归（真实首访语义伪造）+ 预览三类检查点 |

## 验证点

1. 首屏无手势：视频**静音自播不被误暂停**（muted:true, paused:false）+ 🔊 可见；
   任意点击后 muted:false, paused:false（有声）。
2. 快速预览三类：文档 markdown 渲染（h1/表格/代码块非裸文本）、清单 JSON 折叠树
   （rawPre 0）、演示视频页内播放。
3. 既有口径不回退：四节顺序/无分步/无构建/切课/`pnpm verify` 全绿。
