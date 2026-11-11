# 模板契约（templates/）

生成器（phase-4/5）与模板实现共同遵守的接口。模板把 `courses/<id>.json` 变成
`apps/<id>/` 交互动画课；**本层只定契约，实现代码随生成器联调落地（phase-5）**。

## lesson DOM 契约

生成的动画课页面必须含两区一卡（id 稳定，动画与录制按此挂点；布局
为**步骤面板在左、表格在右**，出片画面同此布局）：

```html
<main id="lesson" data-theme="green" data-engine="handsontable">
  <aside  id="result-area">   <!-- 左侧栏·结果区/验收框：全步折叠面板（四要素+参数逐位）+ 验收回读 -->
  <section id="table-area">   <!-- 右侧·表格区：引擎渲染（Handsontable/Univer/OnlyOffice） -->
  <div    id="caption-bar">   <!-- 讲解卡/字幕条：当前步解说词（录屏出片同源） -->
</main>
```

## step 状态机与 DOM 同步

- 状态：`idle → step1 → step2 → step3 → step4 → done`（与
  [motion-spec](../references/motion-spec.md) 一致）。
- **每步 = 完整画面描述**：`{step, cell, formula, expect, value}`；
  切步 = 全量重渲染（状态 → DOM），入场动效只做一次，不靠动画倒带回放。
- 手动练习模式与自动播放共用状态机，仅推进来源不同（用户点击 vs 计时器）。

## theme token（CSS 变量实现）

| 变量 | 含义 | `kimi` | `green` | `vivid` |
| --- | --- | --- | --- | --- |
| `--bg` / `--panel` / `--sheet` / `--band` | 背景 / 卡片 / 表格纸面 / 行列头带 | cream #f8f8ea / #fcfcf2 / #fefdf6 / #efefdf | 浅灰白 / 白 / 白 / 灰绿 | | teal 纸面 #e9f1f2 / #f4fafb / #f7fcfc / #dcebec |
| `--fg` / `--soft` / `--line` | 主文字 / 次要 / 细线 | 墨 #363e40 / #6c7678 / 墨线 16% | 深灰 / 灰绿 / 深灰线 | | 深青墨 #014e60 / #436e7d / #d6e7e9 |
| `--accent`（+strong/soft） | 强调（选区/链接/当前步） | 蓝 #48699b | 品牌绿 #217346 | | 主青 #019b98（teal） |
| `--gold`（+soft） | 填充（表头带/步码/总结框） | 金 #ffca34 | 赭金 #c8862a | | teal-light #55ccc9（高亮填充位） |
| `--code-bg·fg` / `--formula-bg·fg` / `--edit-bg` | 字幕条 / 公式回显 / 编辑底 | 墨底纸字 / 蓝灰 / #fffdf4 | 深灰底纸字 / 绿灰 / 白 | | 青墨底纸字 / teal-soft / 白 |
| `--radius` / `--radius-control` | 卡片 / 控件圆角 | 4px / 3px（小圆角） | 8px / 6px | | 6px / 4px（中圆角） |
| `--font-ui` / `--font-mono` | UI / 公式字体 | Avenir Next+苹方+雅黑 / SFMono+Cascadia | 同左 | 同左 |

主题名来自契约 `theme` 字段；模板按上表出三套值，不得发明第四套（新主题须同时更新本表与 check-manifest 枚举）。

- **vivid = flashcard 同款**：teal 纸面 + 深青墨 + 主青强调，提取自 `examples/flashcard` 的 vivid-dsh 色板；高亮填充位用 teal-light，附新拟态柔影扩展 token。
- **kimi = 格数同款**：cream 纸面 + 墨线小圆角、无阴影无渐变；金作填充、蓝作强调。
- Handsontable 的 `--ht-*` 全量映射打在 `[data-theme] .ht-theme-main` 本体（vendor
  主题把 `--ht-*` 直接声明在该根上，祖先层映射会被元素自身声明盖掉）。
- **data 第 1 行约定为表头行**（engine.js renderer 打 `.cell-head`：金底/墨字/加粗/居中）。

## 动画挂点（确定性）

| 挂点 | 触发 | 动效（motion-spec 词汇） |
| --- | --- | --- |
| `#table-area [data-cell="<addr>"]` | 步骤聚焦该单元格 | `focus` |
| 同上（公式写入时） | step2/3 写公式 | `typeIn` → `flash` |
| `#result-area [data-result]` | 验收值生成 | `flash` |
| `#step-detail .sd-fold[data-step="<n>"]` | 切步（当前步入场） | `panelStep` |
| `.sd-arg[data-arg="<i>"]` | `Lesson.focusParam(i)`（出片逐参数高亮拆段） | `paramFocus`（状态切换，无入场动画） |

硬约束（同 motion-spec）：禁随机、禁无限循环、禁墙钟依赖、可由状态全量重渲染。

## 生成后目录形态（apps/<id>/，生成物不手改）

```
apps/<id>/
  index.html          # 入口（显式 index.html，目录 URL 会 404）
  course.config.json  # 契约副本（生成时拷入，只读）
  <engine>/           # 引擎接线（见各引擎 README）
  theme.css           # 主题 CSS（两套 token）
  lesson.js           # 状态机 + 动效（模板核心逻辑）
```

## 引擎子目录

- [handsontable/](handsontable/README.md) · [univer/](univer/README.md) · [onlyoffice/](onlyoffice/README.md)
- 能力边界一律以 [engine-matrix.md](../references/engine-matrix.md) 为准，三者不许打架。
