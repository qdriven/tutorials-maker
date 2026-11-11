# phase-6 · task-10 · output（产出交接）

## 什么功能完成了

**三模式鼠标编排**（遗留 #2 清账）——抓窗式真实 OS 光标（smoothstep 滑行 + 真实点击，
精确落格 4/4）、录屏式/渲染式页内光标层（`Lesson.mouse` + 点击涟漪，随段移动）、
前摇裁剪（paceStartMs→leadMs 音画对齐）。`--mouse` 为 opt-in，产品视频保持无鼠标基线。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `scripts/recorder/uno-driver.py` | `Mouse` 类（SetProcessDPIAware / glide / click / cell_xy）+ `--mouse` `--grid-origin` |
| `scripts/recorder/hot-driver.py` | `--mouse` + `mouse_act` 页内光标派发 |
| `scripts/recorder/record.mjs` | `--mouse` 贯通 + `-draw_mouse 1` + leadMs 前摇裁剪 |
| `scripts/recorder/render-video.mjs` | `--mouse` 透传帧渲染 |
| `templates/handsontable/lesson.js` / `theme.css` | `Lesson.mouse` API + `#mouse-cursor` 光标层（共享源全拷贝） |
| `apps/vlookup-basic/`、`apps/sum-basic/` | lesson.js/theme.css 拷贝同步 |

## 要点（hand-off 给下游）

1. **坐标口径 = 屏幕物理 px**：`SetProcessDPIAware()` 必须在 Mouse init 首行、
   先于任何 GDI/User 调用——晚一步就已进入虚拟化坐标系，全链偏 ÷1.5（150% 缩放）。
   UNO `getPosSize()` 天然物理 px，网格原点 `--grid-origin`（实测 72,195）按物理 px 校准。
2. **每段光标目标锚点**：step→本步单元格、intro→首格（cells 含表头行！vlookup=A1）、
   outro→checks[0] 格；页内版同语义（公式步特例→`#formula-bar`）。
3. **leadMs 前摇裁剪是音画对齐的前提**：gdigrab 先起录、UNO 后开步，冷启动前摇
   0.6-5s 不裁则口播错位 + 尾段被 `-shortest` 裁掉。`paceStartMs` 语义见 task-08。
4. **产品片无鼠标基线不动**：`--mouse` 只用于「像人操作」的进阶出片；smoke 测试注意
   render-video step-6 会自动拷贝覆盖 showcase 产品片（还原教训见 verify.md）。
5. 模板共享源（lesson.js/theme.css）改动必须同步 templates 三份 + apps 全部拷贝——
   漏一处即静默 no-op（本 task 首跑教训）。

## 下游接线

- 抓窗式出片：`node scripts/recorder/record.mjs --config courses/<id>.json --capture --mouse`；
- 渲染式带光标：`render-video.mjs --plan … --mouse`；产品出片不带；
- 新机位/新窗口尺寸先跑 `scripts/recorder/probe/click-probe.py` 校 `--grid-origin`，再出片。
