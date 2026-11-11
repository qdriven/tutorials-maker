# 从零构建清单：全新目录 → 可出片的 Excel 教程生产线

> 按 [redo-plan.md](redo-plan.md) 的五层目录定义，从一个空目录一步步构建。**每步带验证点（✓ 通过才走下一步）**。环境以 Windows 11 实测为准，差异处注明。两种起点都适用：① 空目录全新搭；② 从旧仓复制 skill/脚本/内容资产（文中注明哪些可直接复制）。

## 阶段 0 · 环境前置（一次性）

- [ ] **Node.js ≥ 20 + pnpm 9** —— `node -v && pnpm -v`（build-plan.mjs 用 `--experimental-strip-types`，需 Node 22+ 或带该 flag 的 20+）
- [ ] **Python 3.x** —— `python --version`（驱动脚本 hot-driver.py / uno-driver.py）
- [ ] **ffmpeg + ffprobe** —— `ffmpeg -version && ffprobe -version`；不在 PATH 时记下绝对路径（后续 `--ffmpeg`/`--ffprobe` 显式传入，实测路径 `C:/ProgramData/chocolatey/lib/ffmpeg-full/tools/ffmpeg/bin/`）
- [ ] **表格引擎至少一个**：LibreOffice（渲染式默认，免费）/ Microsoft Excel / WPS（COM 真机）；浏览器端教程引擎（Handsontable/Univer）零系统依赖
- [ ] **TTS**：edge-tts（首选，神经语音）`pip install edge-tts`；离线兜底为 Windows TTS（sapi，零安装）
- [ ] **（hot 浏览器录屏式需要）** Playwright：`pip install playwright && playwright install chromium`；截图自检用 Chrome
- [ ] **（可选第四引擎）** Hyperframes：`npx hyperframes@0.9.11 --version`
- [ ] **（可选，真实鼠标录制）** OpenScreen：`openscreen --version`

✓ **验证**：以上每条命令都有版本输出；缺项标"可选"的不阻塞主线。

## 阶段 1 · 目录骨架（五层 + gitignore）

```bash
mkdir -p proj/{courses/seeds,skill,scripts/{tutorial,docs,serve},apps,out,src}
mkdir -p proj/docs/{method,research,skill-log}
```

- [ ] pnpm workspace：根 `package.json`（scripts 见阶段 8）+ `pnpm install`
- [ ] `.gitignore` 收敛为一条产物规则：`out/`、`dist/`、`node_modules/`、`**/*.log`
- [ ] git init 并首提交骨架

✓ **验证**：`git status` 干净；目录与五层模型一一对应（契约/技能/流水线/产物/记录）。

## 阶段 2 · 技能层 skill/（可从旧仓直接复制）

- [ ] 复制（或按文档重建）`skill/excel-tutorial-maker/`：SKILL.md + references/ + templates/（引擎模板 univer / handsontable / onlyoffice 三套）+ `course.*.example.json`
- [ ] 复制 `skill/excel-desktop-recorder/`：SKILL.md + scripts/（build-plan.mjs、render-video.mjs、record.mjs、tts.mjs、hot-driver.py、uno-driver.py、lo-paths.mjs）
- [ ] **P0 修缮**：SKILL.md >5K 的拆进 `references/`（触发即进上下文，越早拆越省）
- [ ] 依赖自检：`node scripts/tts.mjs --help`（或等价 smoke）；`python -c "import uno"` 视引擎

✓ **验证**：两个 skill 的目录结构完整；脚本无缺文件（对照 SKILL.md 的产物树）。

## 阶段 3 · 契约层 courses/（试点课先行）

- [ ] 选试点课（建议公式密集型，如查找函数课——一次检验引擎边界/TTS/字幕三个风险点）
- [ ] 写 `courses/<id>.json`：4 步指南每步「单元格地址 + 菜单路径 + 公式原文 + 验收结果」；原始教程文本入 `courses/seeds/`
- [ ] 引擎按能力矩阵选：纯公式/汇总/图表 → Handsontable+HyperFormula；动态数组/多表 → Univer；FILTER/XLOOKUP/原生透视 → OnlyOffice

✓ **验证**：契约 JSON 可被 `build-plan.mjs` 消费（阶段 5 会真跑）；4 步指南无空字段。

## 阶段 4 · 流水线层 scripts/（复制后改路径引用）

- [ ] 复制 `new.mjs` → `scripts/tutorial/`；`check-manifest.mjs` → `scripts/tutorial/`；文档构建 → `scripts/docs/`；`onlyoffice/server.mjs` → `scripts/serve/`
- [ ] **改内部路径引用**（从旧仓复制必做）：check-manifest 的 base/prefix 常量、new.mjs 的模板复制路径、SKILL.md/README 内相对链接
- [ ] 根 package.json 挂命令：
  ```json
  "verify:manifest": "node scripts/tutorial/check-manifest.mjs",
  "verify": "pnpm typecheck && pnpm lint && pnpm test && pnpm verify:manifest"
  ```

✓ **验证**：`pnpm verify:manifest` 能跑通（空清单/示例清单均可，重点是路径解析对）。

## 阶段 5 · 生成动画课（试点）

- [ ] 生成：`node scripts/tutorial/new.mjs --id <id> --config courses/<id>.json --port <端口>`
- [ ] 起服务手验：`pnpm dev:standalone` → 开 `http://localhost:4024/excel-animation/showcase`
- [ ] 验收四点：4 步指南与画面对齐 / 公式真算真回读 / 动效完整 / 主题符合（kimi 编辑风或 Excel 绿）

✓ **验证**：教程应用可交互跑完一课；`pnpm test` 全绿。

## 阶段 6 · 出片（视频 + TTS）

```bash
cd skill/excel-desktop-recorder
node --experimental-strip-types scripts/build-plan.mjs \
  --config ../../apps/<id>/src/course.config.ts --out out/plan.json
node scripts/render-video.mjs --plan out/plan.json --out out/<id>.mp4 --tts edge
```

- [ ] 渲染式出片（默认，锁屏/CI 可跑）；要真实鼠标：会话解锁用 `record.mjs` 抓窗式，锁屏用 `--engine hot`
- [ ] TTS：`--tts edge` 首选 / `--tts sapi` 离线兜底；无废话修剪为默认（公式行不念、第一子句、42 字截断），逐字用 `--tts-full`
- [ ] 质检：ffprobe 看流信息（h264+aac）；抽 3–5 帧核对字幕/画面同步（文字层用 ffmpeg drawtext/ass，别用 OpenScreen 注解——黑块 bug）

✓ **验证**：mp4 存在且时长 ≈ 各步语音时长之和；抽帧核对通过。

## 阶段 7 · 展示层 src/（登记 + 展示）

- [ ] standalone web（React + TanStack Router + vite.standalone.config：port 4024、`/docs` `/skill` 中间件直出）
- [ ] 视频/演示入 `src/standalone/public/showcase/`；`src/data/tutorials.json` 登记（demo/shots/skill/doc/app 五型；app 条目由 new.mjs 自动 upsert）
- [ ] **Vite public 目录注意**：iframe src 必须写显式 `index.html`（目录 URL 会 404）

✓ **验证**：`pnpm verify:manifest` ✓（逐条核文件存在/前缀/包名/端口）；showcase 页各 tab 可见可点。

## 阶段 8 · 记录与收尾

- [ ] 本次构建/验证补 [skill-log](skill-log/) 记录（一次使用一条：目标/做法/结果/结论与坑）
- [ ] 全链自检：`pnpm verify`（typecheck → lint → test → manifest）
- [ ] 根 README / docs/README 写清「一图流」：契约 → 生成 → 出片 → 登记 四步命令

✓ **验证**：verify 全绿；skill-log 有条目；新人按本清单可独立复现。

## 一分钟自检（全部完成后）

```bash
pnpm verify                                            # 全链绿
curl -s -o /dev/null -w "%{http_code}" \
  http://localhost:4024/excel-animation/showcase       # 200
ls out/*.mp4 && ffprobe out/<id>.mp4                   # 成片存在且可播
```

## 附录 · 常见坑（实测）

| 坑 | 处置 |
| --- | --- |
| ffmpeg 不在 PATH，tts.mjs 报「找不到 ffmpeg」 | `--ffmpeg` 显式传绝对路径 |
| vite optimizeDeps 首启慢/错删缓存 | 冷启动首屏慢属正常；异常时删 `node_modules/.vite` 重启 |
| 旧进程占端口（Windows） | `netstat -ano \| grep 4024` → `taskkill //F //PID <pid>` |
| OpenScreen 看不到浏览器窗口 | 首启对话框挡着；浏览器带 `--no-first-run --no-default-browser-check` 重启 |
| concat 合成尾帧丢失 | concat demuxer 的 duration 行后重复最后一行 |
| 样式类未定义导致纸色字配纸色底 | Tailwind 同属性冲突按生成顺序定胜负——同属性工具类别同时挂 base 与分支 |
| 跨表 SUM 课 / "execl" 拼写 / kimi-excel 残留 | 都是刻意保留的边界，不要"顺手修" |

## 总结

- **顺序**：环境 → 骨架 → 技能 → 契约 → 流水线 → 生成 → 出片 → 登记 → 记录；试点课先行，核心课验收后批量。
- **每步一验**：清单里 9 个验证点全过才算构建完成；`pnpm verify` 是最后一道闸。
- **可复制资产**：skill/ 与 scripts/ 从旧仓复制即用（记得改路径引用）；契约与内容按需沿用或新写。
