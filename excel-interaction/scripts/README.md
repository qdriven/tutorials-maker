# scripts/ · 流水线脚本索引

> 一份课程契约（`courses/<id>.json`）驱动的全套脚本：**环境 → 生成 → 出片 → 质检 → 上架**。
> 零依赖口径——mjs 不装任何 npm 包（只用 node: 内置模块）；py 用系统 python 或
> LibreOffice 自带 python（UNO 绑定只有它带）。本文件是**索引**：每个脚本做什么、
> 怎么用、在流水线哪一步、状态如何。状态四档：
> **✅ 活跃**（流水线/校验/共用）· **🔧 手动档**（非自动化，按需）·
> **📦 一次性留档**（使命完成，取证性质）· **🗑 可清**（运行/调试产物）。

## 目录总览

```
scripts/
├── check.mjs / install.mjs / probe.mjs   环境检查 / 安装 / 探测共享（✅）
├── tutorial/     课程生成与契约校验（✅）
│   ├── new.mjs / check-manifest.mjs / engine-assets.mjs / sync-shared.mjs
│   ├── migrate-shared.mjs / patch-vivid-theme.mjs        一次性（📦）
│   └── smoke/    univer 引擎冒烟：setup + drive + 探针 + 测试课（✅）
├── recorder/     出片管线（✅）+ 手动档（🔧）+ 探针留档（📦）
│   ├── build-plan.mjs → render-video.mjs → qc.mjs        渲染式三连
│   ├── tts.mjs / bin.mjs / lo-paths.mjs                  共享模块
│   ├── uno-driver.py / hot-driver.py / drive-oo.py       三引擎驱动
│   ├── record.mjs / batch-capture.mjs                    录屏式手动档（🔧）
│   ├── probe/    鼠标校准（click-probe / cursor-diff）（✅）
│   └── uno-chart-probe*.py / debug-oo.py / probe4-*      探针与产物（📦/🗑）
├── batch/        批量课生成流水线（✅）
├── landing/      目录聚合 recipes.json + 新鲜度校验（✅）
├── chartref/     图表真对象 QC 基线（docbuilder）（✅）
├── showcase/     展示清单 tutorials.json 读写/校验（✅）
├── serve/        零依赖静态服务（✅）
└── docs/         空占位（.gitkeep，🗑 可清）
```

## 流水线（步骤）

### 1. 环境初始化（新机器一次）

```bash
pnpm check:env                  # 工具链检查（必需全过 exit 0）
pnpm install:env                # dry-run 打印安装计划（默认不执行）
pnpm install:env --apply        # 显式授权后执行
```

### 2. 新课上架（契约单源）

```bash
pnpm verify:manifest            # ① 契约校验（公式单源/参数逐位说明）
pnpm generate --id <id> --config courses/<id>.json   # ② 生成 apps/<id>/（生成物不手改）
pnpm recipes                    # ③ 聚合 landing 目录 recipes.json
# ④ 出片三连（见下）→ ⑤ 上架校验
pnpm verify                     # check:env + manifest + showcase + recipes 全绿
```

`new.mjs` 自动 upsert 展示清单（app 条目）；`render-video.mjs` 自动 upsert demo 条目。

### 3. 出片三连（渲染式默认）

```bash
pnpm plan  --config courses/<id>.json        # 契约 → out/<id>/plan.json + TTS 整轨
pnpm video --plan out/<id>/plan.json         # DOM 重演截帧 → ffmpeg 合成（含配音/字幕/步骤卡）
pnpm qc    --plan out/<id>/plan.json         # ffprobe 流信息 + 时长偏差 + 抽帧目检清单
```

### 4. 批量生成（确定性程序化，无 LLM 参与）

```bash
pnpm batch:charts                # 图表课流水线（转写→生成→校验→回归；--skip-video）
node scripts/batch/func-batch.mjs [--only id,id2] [--skip-video] [--dry-run]   # 函数课
node scripts/batch/l2-gen.mjs --dry-run          # L2 复合课契约（块→4 步展开）
node scripts/batch/aclass-gen.mjs                # L2 A 类场景课
node scripts/batch/capstone-gen.mjs              # L2 压轴课
```

### 5. 引擎验收

```bash
# univer（双表跨表冒烟）
node scripts/tutorial/smoke/setup.mjs && node scripts/serve/serve.mjs --dir scripts/tutorial/smoke --port 4323 &
python scripts/tutorial/smoke/drive-univer.py

# onlyoffice（四 API 端到端，需先 docker run docserver :8080 + 静态服务 :4173）
"C:/Program Files/LibreOffice/program/python.exe" ... # 见 drive-oo.py 头注释
python scripts/recorder/drive-oo.py

# 鼠标校准（新机位/新窗口尺寸先跑）
"C:/Program Files/LibreOffice/program/python.exe" scripts/recorder/probe/click-probe.py [grid_origin]
```

### 6. 模板改动后

```bash
node scripts/tutorial/sync-shared.mjs            # 模板共享源 → apps/_shared/<engine>/ 一键同步
```

## 脚本清单

### 根 · 环境（✅）

| 脚本 | 做什么 | 怎么用 |
| --- | --- | --- |
| `check.mjs` | 工具链检查（Node/pnpm/bun/Python/ffmpeg/ffprobe/edge-tts/表格引擎/Playwright/OpenScreen…） | `pnpm check:env`；`--json`（CI）`--only <组件>` `--help`；必需全过 exit 0 |
| `install.mjs` | 按组件清单生成/执行安装计划；已装跳过；**默认 dry-run** | `pnpm install:env [--apply] [--force] [--only …] [--list]`；包管理器自动探测（winget>choco>scoop / brew / apt>dnf>pacman） |
| `probe.mjs` | 环境探测共享模块（check/install 共用） | 被 import；spawn 版本探针 + exists 存在性探针（GUI 工具勿用 spawn，实测挂起） |

平台坑位表（.cmd 垫片 CVE-2024-27980、慢启动工具超时按已装处理、商店别名须 where 探测、winget 首用协议）见文末「平台注意事项」。

### tutorial/ · 课程生成与契约校验（✅）

| 脚本 | 做什么 | 怎么用 |
| --- | --- | --- |
| `new.mjs` | 课程生成器：契约 + 引擎模板 → `apps/<id>/`；upsert 展示清单 | `node scripts/tutorial/new.mjs --id <id> --config courses/<id>.json [--force]` |
| `check-manifest.mjs` | 契约校验：JSON/id/4 步四要素/checks/seed/engine·theme 枚举/公式单源/formulaArgs 逐位 | `pnpm verify:manifest`（全绿 exit 0） |
| `engine-assets.mjs` | 引擎共享资产逻辑（new/sync-shared 共用） | 被 import；只对 handsontable 走共享（逐课拷贝全同实证），onlyoffice/univer 逐课 |
| `sync-shared.mjs` | 构建/刷新 `apps/_shared/<engine>/`（改模板共享源后跑） | `node scripts/tutorial/sync-shared.mjs [--engine handsontable]` |
| `migrate-shared.mjs` | 📦 一次性：43 门课共享资产收进 `_shared/`（幂等可重跑，已完成） | 已跑完；留档 |
| `patch-vivid-theme.mjs` | 📦 一次性：vivid teal 色板落为第三套 theme（已完成） | 已跑完；留档 |
| `smoke/setup.mjs` | 组装 univer-xsum 测试课（模板拷贝物现取，消除拷贝漂移） | `node scripts/tutorial/smoke/setup.mjs` |
| `smoke/drive-univer.py` | univer 全链路冒烟（异步落值/自动播放/练习验收/公式栏联动） | `python …/drive-univer.py`（先 setup + 静态服务 :4323） |
| `smoke/probe-sel.py` | univer 选区事件探针（activate vs 真点击） | `python …/probe-sel.py` |

### recorder/ · 出片管线（✅ + 🔧 + 📦）

| 脚本 | 做什么 | 状态/用法 |
| --- | --- | --- |
| `build-plan.mjs` | 契约 → 录制计划 plan.json + TTS 整轨（出片第一步） | ✅ `pnpm plan --config … [--tts edge\|sapi\|off] [--rate] [--mode render\|capture\|browser] [--engine] [--size] [--min-hold] [--full]` |
| `render-video.mjs` | 渲染式出片：DOM 重演截帧 → ffmpeg（+配音/字幕/步骤卡烧录） | ✅ `pnpm video --plan … [--app] [--port 4321] [--no-ass] [--keep-raw]` |
| `qc.mjs` | 出片质检：ffprobe + 时长偏差 + 抽帧目检清单 | ✅ `pnpm qc --plan … [--video] [--shots 4]` |
| `tts.mjs` | 配音合成（provider 抽象）：edge 神经语音 / sapi 离线 / off 字幕 | ✅ 共享模块；`speakSegment`/`buildNarration` API；`--provider --text --out` |
| `bin.mjs` | 外部工具解析（ffmpeg/ffprobe/python；.cmd 垫片坑位对齐） | ✅ 共享模块 |
| `lo-paths.mjs` | LibreOffice 路径探测（文件存在为准，不跑 --version） | ✅ 共享模块 |
| `uno-driver.py` | LibreOffice Calc UNO 驱动：起/连桥、铺数据、公式真算重演、回读 checks、插图表、鼠标精确落格 | ✅ **必须用 LO 自带 python**；`python.exe uno-driver.py --plan out/<id>/plan.json` |
| `hot-driver.py` | hot 引擎（web 课程页）逐帧驱动：确定性重演 + 多帧连拍/录屏 | ✅ render-video 的捕获端；`python hot-driver.py --url … --plan … --frames …` |
| `drive-oo.py` | onlyoffice 四 API 端到端验收（playwright；8/8 连跑两轮取证） | ✅ onlyoffice 启用 checklist ④ |
| `probe/click-probe.py` | 鼠标编排坐标标定（点格心 → UNO 回读真实选中格） | ✅ 新机位先跑校 `--grid-origin`（LO python） |
| `probe/cursor-diff.py` | 两帧 diff 找光标质心（标定取证） | ✅ `python cursor-diff.py a.png b.png` |
| `record.mjs` | 录屏式出片两档：浏览器录屏（playwright）/ 抓窗实录（gdigrab） | 🔧 手动档（capture 需解锁会话；自动化一律渲染式）`--mode browser\|capture` |
| `batch-capture.mjs` | P2 批量抓窗式出片 | 🔧 手动批量（真软件质感）`[--only] [--skip-done]` |
| `uno-chart-probe.py` … `probe4.py` | 📦 四轮 UNO 图表 API 探针（区域选择/插入路线/类型服务名/Vertical 语义——结论已沉淀模板 README） | 留档可读，不入流水线 |
| `probe4-capture.mjs` | 📦 探针 4 窗口截帧（配合 probe4 对照） | 留档 |
| `debug-oo.py` | 📦 #14 插件加载链诊断（失败请求/console/iframe 状态） | 留档备用（onlyoffice 排障） |
| `demo-tour.mjs` | 网站介绍演示视频：90s 有声全站导览 + 推近/拉远/平移镜头 + 转场 | ✅ `node scripts/recorder/demo-tour.mjs [--rate] [--no-caption]`→ showcase 资产 |
| `debug-oo.png` `probe4-shot.png` `probe4.log` `uno-chart-probe.json` | 🗑/📦 调试与探针产物（截图/日志/探针数据） | 建议迁 `out/` 或随探针留档；`uno-chart-probe.json` 是探针输出可留 |
| `.probe-profile/` | 🗑 LibreOffice 图标缓存（已 gitignore，占磁盘） | 可随时删，LO 会重建 |

### batch/ · 批量生成（✅）

| 脚本 | 做什么 | 怎么用 |
| --- | --- | --- |
| `chart-batch.mjs` | 图表课批量流水线：转写→生成→校验→回归 | `pnpm batch:charts[:full]`；`[--only id,id2] [--skip-video] [--dry-run]` |
| `func-batch.mjs` | 函数课批量流水线（10 门单函数课：转写→生成→出片→上架） | `node scripts/batch/func-batch.mjs [--only] [--skip-video] [--dry-run]` |
| `l2-gen.mjs` | L2 复合课契约生成器（块定义 → 4 步/块展开 → 契约+seed） | `node scripts/batch/l2-gen.mjs [--dry-run]` |
| `aclass-gen.mjs` | L2 A 类场景课批量生成（power-query/eda/plans/二维查找/补货/加权/文本日期） | `node scripts/batch/aclass-gen.mjs` |
| `capstone-gen.mjs` | L2 压轴课批量生成（retail-ops/apple-finance/free-excel） | `node scripts/batch/capstone-gen.mjs` |

公式全部过 HyperFormula 终验探针后才进生成（见 index-log 批量记录）。

### landing/ · 目录聚合（✅）

| 脚本 | 做什么 | 怎么用 |
| --- | --- | --- |
| `recipes-lib.mjs` | 聚合逻辑（build CLI 与 new.mjs 钩子共用）：courses/*.json → src/data/recipes.json | 被 import |
| `build-recipes.mjs` | 目录聚合 CLI | `pnpm recipes` |
| `check-recipes.mjs` | 新鲜度校验：重建比对逐字节 + live app 路径存在 + 占位卡 id 不冲突 | `pnpm check:recipes`（verify 链一环） |

### chartref/ · 图表真对象 QC 基线（✅）

| 脚本 | 做什么 | 怎么用 |
| --- | --- | --- |
| `line-chart.docbuilder` | Document Builder 脚本：生成带**真折线图对象**的 xlsx 基线（免 Docker headless） | `docbuilder.exe line-chart.docbuilder` → line-chart.xlsx |
| `check-chartref.mjs` | 基线校验：xlsx 存在 + zip 内 chart 对象 + 数据引用覆盖契约 | `node scripts/chartref/check-chartref.mjs` |
| `README.md` | 本模块说明 | — |

### showcase/ · 展示清单（✅）

| 脚本 | 做什么 | 怎么用 |
| --- | --- | --- |
| `registry.mjs` | tutorials.json 读写（app 由 new.mjs upsert、demo 由 render-video upsert，幂等） | 被 import |
| `check-tutorials.mjs` | 展示清单校验（文件存在/前缀/iframe 显式 index.html） | `pnpm verify:showcase [--config …]` |

### serve/ · 静态服务（✅）

| 脚本 | 做什么 | 怎么用 |
| --- | --- | --- |
| `serve.mjs` | 零依赖静态文件服务（查看生成课/冒烟/驱动验收共用） | `node scripts/serve/serve.mjs [--dir apps] [--port 4173]`；`pnpm serve` / `pnpm showcase`(:4174) |

## 平台注意事项

| 事项 | 说明 |
| --- | --- |
| Windows `.cmd` 垫片 | pnpm / npx 是 .cmd；Node ≥18.20 禁止直 spawn .cmd（CVE-2024-27980），用 where 解析真实 exe（bin.mjs/probe.mjs 已处理） |
| 慢启动工具 | pnpm/npx 冷启动数秒；探针超时按"已安装但响应慢"处理（不报缺失，防误重装） |
| Windows 商店执行别名 | WindowsApps 别名 `existsSync` 探不到，须 where/which |
| GUI 工具探测 | OpenScreen `--version` 挂起 GUI——只做存在性探针 |
| LibreOffice UNO | 只有 LO 自带 python 带 uno 绑定：`"C:/Program Files/LibreOffice/program/python.exe"` |
| LO 探测 | 不跑 `soffice --version`（Windows 阻塞且残留进程）；版本读文件资源（lo-paths.mjs） |
| UNO 桥收尾 | `desktop.terminate` 后进程可能残留——调用方补 `taskkill //PID //T //F` |
| 公式分隔符 | UNO 用 `;`（to_uno_formula 转换）；真算真回读，禁手算 |
| 仓库 pnpm-lock | 永不为出片引擎引入依赖（univer-kit 构建源是独立 npm 项目） |

## 可抽取的 office 操作能力（2026-11-10 盘点）

这套脚本沉淀的「办公文档操作」能力远超本项目，可抽取复用（按价值排序）：

| 能力 | 沉淀在哪 | 可抽成什么 |
| --- | --- | --- |
| **电子表格四 API 抽象**（mount / setFormula / readValue / focusCell + getFormula/getContent/onChange/onSelection/getSelection） | 三引擎各自实现且语义对齐（handsontable / univer / onlyoffice 桥） | 跨引擎表格操作标准接口——换引擎不换调用方 |
| **LibreOffice Calc UNO 操作层** | `uno-driver.py`：起/连桥、铺数据、A1/区域解析、公式真算、回读、插图表（类型服务名/Vertical 语义已实证）、鼠标精确落格（mm100↔px）、gdigrab 截帧 | `office/uno.py`——任意 xls/xlsx 读写/公式/图表/宏替身 |
| **OnlyOffice 插件桥操作层** | `drive-oo.py` + 模板 engine.js 桥：postMessage 协议 → callCommand 动作层（ping/seed/setValue/setFormula/getValue/getFormula/focus）、串行队列（并发争用实证）、就绪等待、fileOrigin/CORS 配套 | `office/oo-bridge`——OnlyOffice 编辑器自动化/协作编辑验收 |
| **xlsx 真对象生成** | `line-chart.docbuilder`（Document Builder API，免 Docker headless） | 报表/图表文件生成 |
| **web 表格引擎驱动** | `hot-driver.py` / `probe-sel.py`（playwright 确定性重演、逐拍推进、多帧连拍、选区事件探针） | web 应用表格自动化/回归测试 |
| **配音合成** | `tts.mjs`（edge/sapi 双 provider、22050Hz wav、时长实测、holdMs 补静音拼接） | 任意课件/视频配音 |
| **操作类视频出片** | `render-video.mjs`（帧序列→ffmpeg、concat 尾帧坑口径、tpad 冻结、TTS 挂载、字幕/步骤卡烧录） | 任意「软件操作演示」视频生成 |
| **镜头语言** | `demo-tour.mjs`（推近/拉远/平移 CSS transform 逐帧插值、元素坐标对准、淡入淡出） | 演示视频拍摄 |
| **Windows 工具链 util** | `bin.mjs` / `lo-paths.mjs` / `probe.mjs`（.cmd 垫片坑、GUI 探针、文件资源版本） | 通用环境探测/工具解析 |

**抽取形态建议**：(a) 仓库内库化 `packages/office-kit/`；(b) skill 化（仿 `excel-animation/skill/excel-desktop-recorder`，脚本+手册打包，跨仓复用）；(c) 独立仓。最小可行切口 = **四 API 接口 + UNO/OO 两个后端**（表内数据/公式的读写真算），出片与配音是第二刀。

> ⚠️ 本节是**能力盘点与设想，纯文档记录**：现行流水线不改——不引入新脚本、不做抽取/抽象
> （2026-11-10 用户口径：流水线没采用的就不要去采用）。要抽取时另立任务（三件套）再动手。
