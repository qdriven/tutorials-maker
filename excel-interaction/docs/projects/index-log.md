# index-log · 执行流水

> 按实践顺序追加（append-only）。每条：范围 / 动作 / 要点 / 文档索引。格式约定见 [build-method.md](../build-method.md)。

## 2026-11-08 · #1 · 环境探测（真实数据采集）

- 范围：项目级（phase-0 前置）
- 动作：批量探测 node/pnpm/bun/python/ffmpeg/ffprobe/edge-tts/表格引擎/Playwright/Hyperframes/OpenScreen 的版本与安装位置；清理探测中挂起的 OpenScreen GUI 进程（PID 54880）。
- 要点：拿到一手数据（node v24.15.0、pnpm 12.14.0、bun 1.3.6、python 3.14.7、ffmpeg 8.0-full、edge-tts 7.3.1、LibreOffice 在 `C:/Program Files/LibreOffice/program/soffice.exe`（不在 PATH）、WPS/Excel 未定位到可执行文件）；**发现 `openscreen --version` 会拉起 GUI 并挂起**——后续探针设计据此改为存在性检查。
- 文档索引：无（数据直接进入各 task 的 verify.md）

## 2026-11-08 · #2 · 项目骨架与整体构建方式落档

- 范围：项目级
- 动作：创建 `domains/excel-interaction/`（.gitignore 加 `!domains/excel-interaction`，否则被 `domains/*` 规则忽略）；写 [README.md](../../README.md)（做什么）、[build-method.md](../build-method.md)（任务分解 / 记录保存 / 验证保存）、[index.md](../index.md)（文档索引）；建 phase-0…phase-8 目录骨架。
- 要点：构建方式三条先行——任务分解（项目→phase→task 三件套）、记录（index-log 流水 append-only）、验证（verify.md 逐验证点，数字说话，FAIL 也记）；phase 目录与 excel-animation 的 build-checklist 阶段一一对应。
- 文档索引：[README.md](../../README.md) · [build-method.md](../build-method.md) · [index.md](../index.md) · [phase-0/README.md](phase-0/README.md)（及 phase-1…8/README.md）

## 2026-11-08 · #3 · task-01 初始化脚本编写与自检（修复 3 个 Windows 坑）

- 范围：phase-0 / task-01-init-scripts
- 动作：写 `scripts/check.mjs`（环境检查）与 `scripts/install.mjs`（环境安装，dry-run 默认）+ [scripts/README.md](../../scripts/README.md)；本机自检迭代三轮。
- 要点：自检暴露并修复 3 个 bug——① Windows `.cmd` 垫片（pnpm/npx）直 spawn 报 EINVAL（CVE-2024-27980）且 where 多行混排 → 候选排序（.exe > .cmd > 跳过 sh 垫片）+ .cmd 经 shell；② WindowsApps 商店执行别名 existsSync 探不到（OpenScreen 假阴性）→ 存在性探针改 where/which；③ 探针不查退出码（Hyperframes 假阳性）→ `status !== 0` 判缺失。另修 install.mjs 可选标签重复。
- 文档索引：[scripts/README.md](../../scripts/README.md) · [task.md](phase-0/tasks/task-01-init-scripts/task.md) · [verify.md](phase-0/tasks/task-01-init-scripts/verify.md) · [output.md](phase-0/tasks/task-01-init-scripts/output.md)

## 2026-11-08 · #4 · phase-0 task-02…07 环境验证与三件套落档

- 范围：phase-0 / task-02…07
- 动作：以 `node scripts/check.mjs`（必需 6/6，exit 0）为主证据 + 补充人工探测（SAPI 音色枚举、LibreOffice 版本探针、pip 版本、WPS/Excel 路径核查），逐 task 写三件套。
- 要点：SAPI 中文音色确认（Microsoft Huihui Desktop）；LibreOffice 满足"任一引擎"但不在 PATH（交接注明用绝对路径）；WPS 仅有版本目录（疑似更新缓存）、Excel 常见路径未见——如实记 WARN，真实鼠标录制暂不可用；Hyperframes 可选缺失（预期内）。bash 传 PowerShell 脚本块 `$_` 会被展开（单引号包裹解决），坑位已记入 task-06。
- 文档索引：[phase-0/README.md](phase-0/README.md) · [task-02](phase-0/tasks/task-02-runtime-baseline/) … [task-07](phase-0/tasks/task-07-optional-stack/) 各 verify.md / output.md

## 2026-11-08 · #5 · review：结构 / 文档 / 脚本一致性审查

- 范围：项目级（构建方式 + phase-0 + 初始化脚本）
- 动作：全量相对链接检查（80 条）；脚本边界用例（`--only` 无匹配、`--help`、全量复跑）；文档一致性核对（状态表 / 验证点覆盖 / 三件套齐备）。
- 要点：发现并修复 2 处——① phase-0…8 的 README 共 9 条坏链（`../../build-method.md`、`../../scripts/README.md` 层级写错，应为 `../`）→ 修复后 80 链 0 坏；② check.mjs `--only` 无匹配时假报"环境就绪"（exit 0）→ 改为提示可用 id 并 exit 2。复验全绿：check.mjs 必需 6/6 exit 0、边界 exit 2、双运行时一致。遗留观察（非 bug，已记入对应 verify.md）：node/bun 多版本漂移、WPS/Excel 未定位、Hyperframes 可选缺失。
- 文档索引：[build-method.md](../build-method.md) · [scripts/README.md](../../scripts/README.md) · [phase-0/tasks/task-01-init-scripts/verify.md](phase-0/tasks/task-01-init-scripts/verify.md)

## 2026-11-08 · #6 · 文档重组：docs/projects + docs/modules 两分

- 范围：项目级（excel-interaction 独立新项目，文档组织重定义）
- 动作：执行过程文件迁入 `docs/projects/`（index-log、phase-0…8 整体移入）；元文档迁入 `docs/` 根（build-method.md、index.md）；新建 `docs/README.md`（组织说明）与 `docs/modules/scripts.md`（模块功能描述卡片）；全量相对链接修复并复验（96 链 0 坏，含一处四级路径修正）。
- 要点：组织原则定为**过程进 projects/、功能进 modules/、用法/README 跟模块走**（scripts/README.md 留在 scripts/ 不动）；module 卡片（功能/接口/关系）与模块 README（操作手册）互链不重复；根 README 只留项目定位与导航。
- 文档索引：[docs/README.md](../README.md) · [docs/index.md](../index.md) · [docs/modules/scripts.md](../modules/scripts.md)

## 2026-11-08 · #7 · install 已安装自动跳过（探测共享化 + 超时语义修正）

- 范围：scripts/ 模块（install.mjs 行为增强 + probe.mjs 抽取）
- 动作：install.mjs 对已安装且满足要求的组件自动跳过（`--force` 可强制重装）；探测逻辑从 check.mjs 抽出为共享模块 `probe.mjs`（零依赖不变）；修一个实测暴露的探针缺陷并更新 [scripts/README.md](../../scripts/README.md) 与 [modules/scripts.md](../modules/scripts.md)。
- 要点：skip 判定用与 check 相同的探测，避免"装没装"两套标准。实测发现 **pnpm 冷启动 4.4s+（经 .cmd 垫片更慢）会超 8s 探针**，ETIMEDOUT 被误判缺失（会诱导 install 重装已装组件）——修正为：超时按"已安装但响应慢"处理（found=true + 标注），探针超时放宽到 20s。复验：check 必需 6/6 exit 0；install 跳过 9 项已安装、仅计划 hyperframes 1 项缺失；pnpm 探针 3/3 稳定读到 12.14.0。
- 文档索引：[scripts/README.md](../../scripts/README.md) · [modules/scripts.md](../modules/scripts.md)

## 2026-11-08 · #8 · phase-1 目录骨架执行（3 task 全过）

- 范围：docs/projects/phase-1（task-01 五层骨架 / task-02 最小 workspace / task-03 产物规则）
- 动作：五层目录落位（courses/seeds、skill、scripts/{tutorial,docs,serve}、apps、out、src）+ 各模块 README；根 package.json（`@innate/excel-interaction`，零依赖）并实测依赖进出通道；`.gitignore` 产物规则（out/* + README 例外）；全验证点留档 verify/output 三件套。
- 要点：pnpm 12 对零依赖成员不写 importers（resolution skip，属正常）——用 `pnpm add --lockfile-only ms` 实测通道后移除，锁文件留 `domains/excel-interaction: {}`（additive）；build-checklist 的「git init 首提交」按适配口径 SKIP（外层仓库统一管理，`!domains/excel-interaction` 例外已验证生效）；readme 跟模块走约定执行（6/6 顶层模块目录带 README）。
- 文档索引：[phase-1/README.md](phase-1/README.md) · [task-01](phase-1/tasks/task-01-layer-skeleton/) · [task-02](phase-1/tasks/task-02-workspace/) · [task-03](phase-1/tasks/task-03-artifact-rules/)

## 2026-11-08 · #9 · phase-2 技能层执行（3 task 全过）

- 范围：docs/projects/phase-2（task-01 教程生成技能 / task-02 录屏出片技能 / task-03 引擎模板规格）
- 动作：建成 `skill/excel-tutorial-maker/`（SKILL.md 2904B + references 三件 + examples/course.example.json）与 `skill/excel-desktop-recorder/`（SKILL.md 2778B + references 三件）；定 `templates/` 模板契约（总契约 + handsontable/univer/onlyoffice 三引擎 README）；新增 [modules/skill.md](../modules/skill.md) 技能层模块卡片；状态面同步（phase-2 README / index / 项目 README / 根 README）。
- 要点：P0 教训落实——SKILL.md 双双 ≤5K（2904B/2778B），深知识全进 references/（progressive disclosure）；契约双产物规则定死（`courses/<id>.json` 唯一事实源、单产物字段禁入契约，双向交叉引用核对 PASS）；引擎能力边界单源（engine-matrix.md 为口径，模板 README 只锚定不复述），跨表 SUM 冻结结论归 univer/onlyoffice；出片节奏硬顺序（先 TTS 后定时长）与无废话三规则（公式行不念/第一子句/42 字截断）入 tts.md；坑位表 7 条从旧域 skill-log 沉淀（OpenScreen 注解黑块、GUI 探测挂起等）供 phase-6 实现对照。task-01 验证时留 2 处前向引用（task-02/03 产物），phase 末全量链检查归零复核。
- 文档索引：[phase-2/README.md](phase-2/README.md) · [task-01](phase-2/tasks/task-01-tutorial-maker/) · [task-02](phase-2/tasks/task-02-recorder/) · [task-03](phase-2/tasks/task-03-templates/) · [modules/skill.md](../modules/skill.md)

## 2026-11-08 · #10 · phase-3 契约层执行（2 task 全过）

- 范围：docs/projects/phase-3（task-01 试点选题与 seed / task-02 试点契约）
- 动作：选定 VLOOKUP 查找匹配课为试点（公式密集型，build-checklist 建议的查找函数课路线）；seed 教程入 `courses/seeds/vlookup-basic.md`；试点契约 `courses/vlookup-basic.json`（4 步指南四要素 + 员工表 data + checks + brief narration，引擎 handsontable、主题 kimi）；courses/README.md 增契约清单登记；状态面同步（phase-3 README / index / 项目 README / 根 README）。
- 要点：引擎选型故事——seed 进阶提示提及 XLOOKUP（onlyoffice-only）但契约取 VLOOKUP 路线留 handsontable（域内 ✅、全单表 0 跨表引用，避开 ⚠️/冻结区）；契约成色数字说话——4 步 0 空字段、checks.formula 与 guide 单源一致、checks.value 按 VLOOKUP 语义在 data 上实算比对（D2=1003→王五）PASS；seed 步骤 4 的「改 D2 联动」按 schema 4 步固定结构归并为非破坏性复核（编辑栏回显），联动演示归手动练习自由操作，保 checks 与初态一致；主题定 kimi 与示例契约 green 互补（两套 theme token 各有真实用例，phase-5 都要出）。「可被 build-plan.mjs 消费」按 build-checklist 明示口径留待阶段 5 真跑。
- 文档索引：[phase-3/README.md](phase-3/README.md) · [task-01](phase-3/tasks/task-01-pilot-seed/) · [task-02](phase-3/tasks/task-02-pilot-contract/) · [courses/README.md](../../courses/README.md)

## 2026-11-08 · #11 · phase-4+5 合并里程碑执行（3 task 全过，试点课可交互查看）

- 范围：docs/projects/phase-4（task-01 流水线脚本 / task-02 handsontable 模板实现 / task-03 试点出课与验收四点）；phase-5 按用户选定方案 C 併入本里程碑（phase-5 README 留併入说明，任务三件套不重复立）。
- 动作：流水线三脚本建成（new.mjs 生成器 / check-manifest.mjs 清单校验 / serve.mjs 静态服务）+ package.json 命令链；handsontable 模板实现落地（vendored Handsontable 18.1.2 + HyperFormula 3.5.0、engine.js 四 API 真算真回读、lesson.js 4 步状态机+四动效词汇+自动播放/手动练习、kimi/green 双主题 token）；new.mjs 生成 `apps/vlookup-basic/` 并浏览器（Playwright drive.py）验收四点全过——截图 8 张 + result.json 留证；templates/handsontable/README 与实现口径同步。
- 要点：**用户确认「查看效果」时点选方案 C（4+5 合并一次到位）**，调整了原 phase 边界（phase-4 原仅脚本、效果在 phase-5）。实测抓出并修复 2 bug：① HF `getCellFormula` 自带 `=` 被再拼一次 → `==VLOOKUP` 致练习验收判负（改原样回读）；② Handsontable licenseKey 误用 HF 的 `gpl-v3` → 表格区渲染 license 错误框（HT 认 `non-commercial-and-evaluation`、HF 认 `gpl-v3`，两把钥匙各归其位）。**两 bug 都是看截图才抓到的**（CLI 指标全绿但画面错），视觉取证不可省——出片抽帧质检同理。另：v18 包布局 CSS 在 styles/（无 full.min.css/sourcemap）；Windows bash `kill $SRV` 不杀 node 残留致 EADDRINUSE 两次，须 netstat+taskkill 收尾；文档构建 scripts/docs/ 推迟到 phase-7。验收四点证据：指南逐拍对齐（step1-4.png）、真算真回读（readValue=王五 + 手动练习 ✓）、动效完整（done + 零 console 报错）、双主题（kimi/green 截图对照）。
- 文档索引：[phase-4/README.md](phase-4/README.md) · [task-01](phase-4/tasks/task-01-pipeline-scripts/) · [task-02](phase-4/tasks/task-02-handsontable-template/) · [task-03](phase-4/tasks/task-03-pilot-app-verify/) · [phase-5/README.md](phase-5/README.md)

## 2026-11-08 · #12 · task-04 handsontable 模板 Excel 级交互增强（用户反馈闭环）

- 范围：docs/projects/phase-4/tasks/task-04-handsontable-interactions（公式栏联动 / 拖选填充柄 / 点选插引用 / 函数建议弹层）
- 动作：新组件 `formula-assist.js`（point mode + 函数建议弹层）+ engine.js（onSelection/getContent/getSelection、跨重挂载钩子、fillHandle）+ lesson.js 公式栏联动 + theme.css 弹层/选区样式；vendor 增 `hyperformula-enGB.js`（函数表语言包）；new.mjs 引擎目录复制通用化；Playwright drive-interactions.py 真鼠标/键盘取证（4 张截图 + result.json）。
- 要点：用户反馈「公式不能自动跳出、不能像 Excel 选范围操作」，经 AskUserQuestion 定路线 A（增强 handsontable，约八成 Excel 仿真度；完整引擎交互留 univer/onlyoffice 课）。**三轮 bug 修复全靠数据/截图/抓栈**：① `getRegisteredFunctionNames()` 要传语言码（少参抛 ExpectedValueOfType）→ assist 整体加载失败；② HT `afterSelectionEnd` 去选以 (-1,-1) 触发、`toA1(-1,-1)` 拼出 `'0'` 致 parseAddr 抛错 ×9 炸断事件链（抓栈定位）；③ HT 插件装配已注册 enGB 语言、脚本再 registerLanguage 必抛"already registered"→ 函数表恒空——改「先取、取不到再注册」后 418 项就位；另实证 **HT 无 `afterFinishEditing` 钩子**（editing 标志卡死会劫持 dblclick），编辑态改用 `getActiveEditor().isOpened()`。终态 5/5 PASS（张三/公式联动、A2:B5 拖选+填充柄、`=SUM(A2:B5` 点插、VLOOKUP 弹层+Tab 插入、练习回归 ✓ + 零 console 报错）。
- 文档索引：[task-04](phase-4/tasks/task-04-handsontable-interactions/) · [templates/handsontable/README.md](../../skill/excel-tutorial-maker/templates/handsontable/README.md)

## 2026-11-08 · #13 · task-05 公式输入全角自动转换（中文 IME 防错，用户反馈闭环）

- 范围：docs/projects/phase-4/tasks/task-05-formula-ime-normalize（公式上下文全角→半角）
- 动作：formula-assist.js 增 `normalizeFormula`（引号感知）+ input 监听即时转换（=/＝ 开头才转）；engine.setFormula 提交路径兜底；Playwright drive-ime.py 真键盘输全角取证（shots/ 5 张 + result.json）。
- 要点：用户反馈「中英文输入法切换、中文符号输入容易把公式打错」——口径定为**公式上下文转换**：U+FF01–U+FF5E÷0xFEE0、全角空格转半角、引号切换字面量模式（`＂价格，单位＂`→`="价格，单位"`，内层 `，` 保真）、文本格永不触发（首字符非 =/＝ 不转）。逐字符 1:1 替换光标天然不动；两条路径都要转（input 监听管手打、setFormula 管练习/驱动喂入，只做其一会漏）。验证 6 项首跑全绿：全角 SUM→579 真算、全角 VLOOKUP→王五、文本 `销售部，市场部` 原样、字面量保真、setFormula 兜底、练习回归 ✓ + 零 console 报错。
- 文档索引：[task-05](phase-4/tasks/task-05-formula-ime-normalize/)

## 2026-11-08 · #14 · task-06 公式参数逐位说明 formulaArgs（用户反馈闭环）

- 范围：docs/projects/phase-4/tasks/task-06-formula-args（契约字段 + 三处渲染 + 清单校验）
- 动作：contract-schema.md 增 formulaArgs 定义（part/meaning，顺序=参数顺序）；试点/示例契约回填（VLOOKUP 4 条、SUM 1 条）；lesson.js 三处同源渲染（guide 卡片参数行 / caption「｜参数 …」/ 手动练习与✗提示）+ theme.css 样式；check-manifest 增一致性校验；SKILL.md 契约摘要与验收清单补项；Playwright drive-args.py 取证（shots/ 3 张 + result.json）。
- 要点：用户反馈「公式函数每一个位置给的参数没有说明，要在教程/文字或验收里加上提示」——落法定**契约单源三渲染**：参数说明只写 formulaArgs，卡片/字幕/练习提示都派生，且只对 formula 以 `=` 开头的 guide 步渲染（定位步不渲染）；meaning 人工从教程提炼、明示不查表自动生成（保契约手改属性）。校验两向实测：正例 EXIT=0、反例（part 不在公式原文中）EXIT=1。浏览器实见 4 条逐位说明（D2 查找值 / A2:B5 查找区域 / 2 列序数 / 0 匹配方式）+ 回归 ✓。录像出片的参数口播将从同一字段派生（phase-6）。
- 文档索引：[task-06](phase-4/tasks/task-06-formula-args/) · [contract-schema.md](../../skill/excel-tutorial-maker/references/contract-schema.md)

## 2026-11-08 · #15 · task-07 验收框逐步展示（用户反馈闭环）+ 主题口径澄清

- 范围：docs/projects/phase-4/tasks/task-07-step-detail（验收框逐步展示 step-detail）
- 动作：#result-area 增 `#step-detail`——当前步四要素 + 参数 1..N 逐位大字号逐条展示（状态机 render 全量刷新）；练习态显示目标/参考/参数/提示，空闲/完成态有引导；theme.css 样式随主题 token；Playwright drive-steps.py 取证（shots/ 4 张 + result.json）。
- 要点：用户反馈「在验收框里面每一个步骤展示会更方便让人看清楚」——定位为**逐条细读位**（guide 4 卡保留为全局概览，两处同源契约）。参数行仅公式步渲染（定位步不渲染）；300px 验收框 overflow-y auto 防溢出。同轮澄清**主题口径**（用户问答）：`kimi` 仅内部 token 代号，风格本身是中性表格格子编辑器审美（编辑风），对外不称「kimi 的样式」——contract-schema/theme.css 表述已改中性口径，机器 token 暂留兼容。验证 4 项首跑全绿（逐步展示/练习态/完成态+回归/双主题）+ `pnpm verify` EXIT=0。
- 文档索引：[task-07](phase-4/tasks/task-07-step-detail/)

## 2026-11-08 · #16 · phase-6 出片管线全链执行（4 task 全过，试点课三式出片）

- 范围：docs/projects/phase-6（task-01 计划与 TTS / task-02 渲染式出片 / task-03 抽帧质检 / task-04 录屏式与抓窗式驱动）
- 动作：`scripts/recorder/` 建成——build-plan.mjs（无废话三规则派生口播 + 语音驱动节奏 holdMs）+ tts.mjs（sapi/edge/off 三 provider、逐段定长拼 narration.wav）+ hot-driver.py（Playwright：Lesson.reset → gotoStep 1-4 状态累积 → 整页截帧/实时录像）+ render-video.mjs（帧→定长片段→concat→混 narration，ffprobe 自检）+ qc.mjs（流断言/漂移<5%/逐步抽帧比对）+ record.mjs（browser/capture 两式）+ uno-driver.py（LibreOffice-python UNO 驱动）+ lo-paths.mjs/bin.mjs（soffice/ffmpeg/python 解析）；package.json 增 `plan`/`video`/`qc` 命令链。
- 要点：**试点课三式出片全过**——渲染式 0.0% 漂移（默认，锁屏/CI 可跑）、浏览器录屏式 0.6%、抓窗式 0.0%（gdigrab `title=` 精确窗题、实见王五入镜）。节奏数字：holdMs = max(1200, speechMs+800)，4 步 3704/4808/4232/4808ms、总长 17552ms 与 narration.wav 精确对齐。首跑抓出「第一子句切分漏全角逗号」致 20.6s（步骤 1/4 未截断）→ 切分集补 `，` 后 17.6s（FAIL→修复→复验留档）。Windows 坑一批全录 verify：native curl `-o /dev/null` exit 23（改 NUL、只看响应码）；PowerShell 窗题 GBK 乱码（OutputEncoding=UTF8）；`soffice --version` 阻塞（改读文件版本资源）；UNO profile URI 须绝对（`Path.resolve()`）；gdigrab 标题过滤须精确 `LibreOffice Calc`（Start Center 撞车 -22）；record.mjs exit 监听须 spawn 后立刻挂（否则漏 mux）。确定性 grep 干净（模板 JS 无 Math.random/setInterval/Date.now）。
- 文档索引：[phase-6/README.md](phase-6/README.md) · [task-01](phase-6/tasks/task-01-plan-and-tts/) · [task-02](phase-6/tasks/task-02-render-video/) · [task-03](phase-6/tasks/task-03-qc-pilot/) · [task-04](phase-6/tasks/task-04-record-and-drivers/)

## 2026-11-08 · #17 · task-08 手动练习步骤提示（用户反馈闭环）

- 范围：docs/projects/phase-4/tasks/task-08-practice-step-hints（练习态验收框逐步提示）
- 动作：练习态 stepDetailHTML 输出 4 步指南全清单（cell·menu 标题 + 公式 + 参数逐位 + 预期 + 目标/操作提示行），内容结构（步骤分组/参数行）复用 task-06 逐位样式定型；Playwright drive-hints.py 取证（shots/ 2 张 + result.json）。
- 要点：用户贴出 4 步 guide 卡内容后反馈「这部分内容也可以在验收框中展示，是一种提示会更好，手工练习的时候更清楚」——练习态=全步清单静态提示（不随操作推进）、参数逐位在每个公式步下逐条挂。驱动教训：**gotoStep 不切 mode**，验 auto 态视图须重载页面（首跑截到练习视图取证无效→重载复验，FAIL→修复→复验留档）。验证 4/4：提示标题×4、参数行 12、预期行×4、练习真算 ✓ + 零 console 报错。
- 文档索引：[task-08](phase-4/tasks/task-08-practice-step-hints/)

## 2026-11-08 · #18 · task-09 验收框全步折叠展示（用户澄清闭环，非替换）

- 范围：docs/projects/phase-4/tasks/task-09-step-accordion（全步常驻折叠面板）
- 动作：lesson.js 增 `foldItems`/`bindFolds`/`foldState`（原生 details/summary 折叠面板，4 步常驻）；默认折叠态随模式（auto=当前步展开+current 橙标、practice=全展开、idle/完成=全折叠），用户点击独立切换并记住偏好，reset() 清零保出片确定性；验收回读行固定保留（非替换）；theme.css `.sd-fold` 样式；Playwright drive-fold.py 取证（shots/ 3 张 + result.json）。
- 要点：用户澄清「**每一个步骤都需要在验收框展示，只是折叠的问题，不是替换**」——纠正 task-07 的替换式（只显当前步）：4 步标题永远可见、当前步展开、点击任意展开/折叠（实测 `[f,t,t,f]`→点第 2→`[f,f,t,f]` 独立切换）。三块分区各司其职（步骤面板/回读/guide 卡）。4 项首跑全绿：items_count=4、折叠态随步切换、点击偏好、练习全展开 + `pnpm verify` EXIT=0。
- 文档索引：[task-09](phase-4/tasks/task-09-step-accordion/) · [task-08](phase-4/tasks/task-08-practice-step-hints/)

## 2026-11-08 · #19 · task-10 练习态防剧透 + 布局换边 + 删指南卡（用户反馈闭环）

- 范围：docs/projects/phase-4/tasks/task-10-practice-anti-spoiler（折叠语义/布局/删指南卡）
- 动作：练习态默认 4 步全折叠（点标题 peek、验收通过自动全展开）；步骤面板全局挪左侧边栏 300px、表格在右（两区一卡布局契约入 templates/README.md）；`#guide-panel` 4 张指南卡整行删除（HTML/CSS/渲染代码），panelStep 动效改挂折叠面板当前步；hot-driver.py 等待选择器同步（旧锚点 30s 超时）；Playwright drive-10.py 取证（shots/ 4 张 + result.json）+ 出片画面刷新（video 0.0% 漂移 + qc 4 抽帧）。
- 要点：用户反馈「选中手动练习之后所有的[内容]都要收起来，直到用户点击展开或者通过才展开，然后手动练习这个放到左边栏，最下方内容可以不需要了」——两处指代经 AskUserQuestion 带布局预览澄清（全局统一换边 / 删指南卡）。**首跑驱动 8 项全绿但出片抽帧目检发现顺序切步折叠态累积**（1→2→3 三块全展开）：机制探针实证 **Chrome 对插入的 `<details open>` 也派发 toggle**，bindFolds 误当用户偏好累积——改认 summary 点击（`!d.open` 即目标态）复验全绿（`folds_after_seq_1_3=[f,f,t,f]`）。与 task-02「看截图才抓到 bug」同教训：CLI 指标全绿≠画面对，视觉取证不可省。验证点全 PASS：布局换边/指南卡清零、练习防剧透（f,f,f,f→peek→通过全开+✓）、自动播放回归、出片刷新 0.0%、`pnpm verify` EXIT=0 + 确定性 grep 干净。
- 文档索引：[task-10](phase-4/tasks/task-10-practice-anti-spoiler/) · [templates/README.md](../../skill/excel-tutorial-maker/templates/README.md)

## 2026-11-08 · #20 · task-11 一句话总结/解释/收尾总结（用户反馈闭环）

- 范围：docs/projects/phase-4/tasks/task-11-summary-intro-outro（契约 summary 字段 + 课内开篇/收尾 + 出片首尾段）
- 动作：契约增 `summary`（oneLiner/explain/outro 三句作者定稿，contract-schema/SKILL.md/示例契约同步）；lesson.js 开篇拍（play 先驻留 4s 一句话+解释）+ summary 框常驻自动态顶部 + done「总结」框 + 字幕接线；build-plan 时间线 segments（intro→4 步→outro，首尾段 TTS 口播原文）；hot-driver/render-video/qc/record 按 segments 时间线派发合成质检。Playwright drive-11.py 取证（shots/ 3 张 + result.json）+ 出片刷新（video 0.0% 漂移 + qc 抽帧 6 张）。
- 要点：用户反馈「需要一句话总结 vlookup 作用，用最简单的话说明，然后解释，然后最后动画结束后再总结……总之要简短，SQL 方式更方便说明」——教学结构定型**一句话→解释(SQL 等价式)→动画→结束再总结**，收尾总结用用户原话整理（「用关键字段的值，在范围里找到匹配的那一行，取回那一行的其他字段」）。契约 summary 单源双产物：课内开篇拍/常驻框/收尾框 + 出片口播首尾段同源；summary 可选，缺省退回纯 4 步。两处取证修正留档（evaluate 会 await play() 返回的 Promise→观测须丢弃返回值；finish 前须走完第 3 步否则 ✗ 入镜）。验证点全 PASS：开篇框/驻留 step=0、常驻可回读、done 总结框+✓ 字幕、练习防剧透不变、出片 41136ms 0.0% 漂移 6 抽帧目检、`pnpm verify` EXIT=0。
- 文档索引：[task-11](phase-4/tasks/task-11-summary-intro-outro/) · [contract-schema.md](../../skill/excel-tutorial-maker/references/contract-schema.md)

## 2026-11-08 · #21 · task-12 UI 主题改格数同款（用户反馈闭环）

- 范围：docs/projects/phase-4/tasks/task-12-theme-kimi-grid（templates/handsontable 主题层 + engine.js 表头带 + 文档口径）
- 动作：theme.css kimi token 重做为格数色板（cream #f8f8ea / ink #363e40 / gold #ffca34 / blue #48699b + sheet/band/line/code/formula/edit 辅助 token + 小圆角 4px/3px），green 补齐同套辅助 token（双主题契约不破）；组件层对齐（金步码方章/总结框金左条/fx 墨线方框/▶ 墨底主按钮/弹层墨线无阴影/墨底字幕条）；Handsontable `--ht-*` 全量映射（表头灰带/active 墨·金/选区蓝/编辑底/radius 0）；engine.js renderer 给 data 第 1 行打 `.cell-head` 金底表头带。Playwright drive-12.py 取证（计算样式探针 + shots/ 6 张 + result.json）+ 出片刷新（video 0.0% 漂移 + qc 抽帧 6 张）。
- 要点：用户反馈「当前 UI themes 还不是很满意，期望变成 kimi 的格数的样式」——此前把 kimi 解释为中性编辑风（纸白/墨黑/橙红）不满足期望，真身=格数/kimi-excel 的 Handsontable 教程视觉（参考 domains/excel-animation .../showcase/themes/theme-kimi.css + kimi.png）。两处踩坑留档：① `--ht-*` 映射落点——vendor 主题把变量直接声明在 `.ht-theme-main` 根上，旧 `[data-theme]` 祖先层映射一直被元素自身声明盖掉（网格走默认盘），映射须打 `.ht-theme-main` 本体并以计算样式探针复验；② reset() 残留练习态（task-08 后潜伏）——practice→reset 面板仍「手动练习」头，修 reset() 置 mode="auto"（重置=空闲态，出片确定性）。验证点全 PASS：格数 token 精确命中/金底表头带/双主题翻转联动/防剧透 folds 不变/done 面板+总结框/console 零报错/出片 41136ms 0.0% 漂移 6 抽帧目检/`pnpm verify` EXIT=0。
- 文档索引：[task-12](phase-4/tasks/task-12-theme-kimi-grid/) · [templates/README.md](../../skill/excel-tutorial-maker/templates/README.md)

## 2026-11-08 · #22 · task-13 公式参数逐位进口播（task-06 欠账清偿）

- 范围：docs/projects/phase-4/tasks/task-13-args-narration（build-plan 解说词派生 + tts.md 规则 4 + 契约文档）
- 动作：build-plan.mjs 增 `argsNoteFor`（formulaArgs 单源派生、锁定首个公式步）+ `narrationForStep(g, full, argNote)` 追加参数段（不走无废话修剪 2–3、仍剔公式片段、作者定稿不追加）；tts.md 增规则 4「参数逐位口播」；contract-schema formulaArgs 节落到具体派生规则；build-plan 补直接执行守卫（import 可测）。node 派生断言 7 例 + plan/video/qc 复跑取证。
- 要点：task-06 output 承诺「录像出片的参数口播——narration 派生规则归 recorder 技能」，本次清账——参数说明从只进字幕补到也进口播。挂步约定：**首个 `formula` 以 = 开头的步骤**（公式首次写入那一步），其余步不重复念。派生文 `参数：<part> 是 <meaning>；…`。时长影响：第 2 步 +19.3s（口播 23.4s），总 41.1s→60.5s——参数是教学核心全量保留，嫌长改契约 meaning 文案（与 summary 同法）。验证点全 PASS：派生断言（挂步/全量/非挂步不变/作者覆盖/--full/无 args 返 null）、plan 时间线、出片 0.0% 漂移 6 抽帧、`pnpm verify` EXIT=0。
- 文档索引：[task-13](phase-4/tasks/task-13-args-narration/) · [tts.md](../../skill/excel-desktop-recorder/references/tts.md)

## 2026-11-08 · #23 · phase-7 task-01 展示层（showcase 页 + 清单登记 + 清单校验）

- 范围：docs/projects/phase-7/tasks/task-01-showcase-registry（src/ 展示层 + scripts/showcase + 登记流接线）
- 动作：清单 src/data/tutorials.json（app/demo/doc 三型，path 以域根为站点根）；零构建静态 showcase 页（src/standalone/，清单驱动卡片 + tab 过滤 + iframe 预览/视频/文档链，格数同款样式）；登记流——new.mjs 出课 upsert app 条目、render-video.mjs 成品拷入 src/standalone/public/showcase/ + upsert demo 条目（registry.mjs 按 id 幂等）；清单校验 check-tutorials.mjs（字段/唯一 id/type/前缀/文件存在/app 显式 index.html）并入 `pnpm verify`；`pnpm showcase`（serve --dir . --port 4174）+ serve MIME 补 mp4/wav/md。Playwright drive-01.py 取证（shots/ 3 张 + result.json）。
- 要点：对齐 build-checklist 阶段 7 口径（登记/展示/校验、iframe 显式 index.html——目录 URL 会 404），实现走本域零依赖静态路线（不起 React/Vite 构建链）。**站点根=域根**：app iframe 直指 /apps/<id>/index.html（生成物免拷贝），demo 入 /src/standalone/public/showcase/。登记流幂等实证：new.mjs/出片链重跑清单 4→4 条不涨。验证点全 PASS：清单校验正/负向（负向 fixture 8 处违规全拦 EXIT=1）、登记流幂等、浏览器实见（4 卡可点/iframe 真载入 data-theme=kimi/资源全 200/tab 过滤 1/2/4/console 零报错）、`pnpm verify` EXIT=0（环境+契约+清单）。
- 文档索引：[phase-7 task-01](phase-7/tasks/task-01-showcase-registry/) · [src/README.md](../../src/README.md)

## 2026-11-08 · #24 · phase-8 task-01 记录与收尾（一图流 / 全链自检 / 遗留移交）

- 范围：docs/projects/phase-8/tasks/task-01-closeout（根 README + deferred.md + 状态面）
- 动作：根 README 新增「一图流」（契约 → 生成 → 出片 → 登记 四步命令）+ 快速开始补 verify/showcase + Phase 总览 7/8 状态收口；docs/projects/phase-8/deferred.md 遗留清单移交（功能欠账 6 项 + 仓库事务 2 项，append-only 销账制）；docs/index.md 与 phase-8 README 状态面同步；全链自检留档。
- 要点：项目 phase-0~8 全链收口——一图流即标准流（契约单源 → 生成自动登记 app → 出片自动落 showcase + 登记 demo → verify/showcase 收口）。全链自检三件全绿：`pnpm verify` EXIT=0（环境 6/6 + 契约 1/1 + 清单 4 条）、showcase URL 200、成片 ffprobe h264+aac 60.5s ≈ ΣholdMs。遗留清单挂账：①抓窗式 intro/outro 节奏 ②抓窗式鼠标编排 ③univer/onlyoffice 模板 ④逐参数高亮动画 ⑤SUM 第二门课 ⑥口播时长微调 ⑦PR/分支整理（待用户定夺）⑧旧域在飞改动归属（用户处置）——下一批次按 build-method 从 deferred.md 取项立 task。
- 文档索引：[phase-8 task-01](phase-8/tasks/task-01-closeout/) · [deferred.md](phase-8/deferred.md) · [根 README](../../README.md)

## 2026-11-08 · #25 · phase-3 task-03 第二门课 SUM（契约通用性验证，deferred #5 销账）

- 范围：docs/projects/phase-3/tasks/task-03-sum-course（courses/seeds/sum-basic.md + courses/sum-basic.json + 全链跑通）
- 动作：SUM 求和课 seed 与契约入库（月度数据 1200/1500/900、4 步指南、formulaArgs 单参数 B2:B4、summary 三句、checks=3600）；按一图流跑全链——manifest 校验 → 生成（自动登记 app）→ plan（参数口播规则 4 挂第 2 步）→ video/qc（自动落 showcase + 登记 demo）→ `pnpm verify`。
- 要点：**契约通用性成立**——第二门课零模板/脚本改动，纯 courses/sum-basic.json 驱动出交互动画课 + 讲解视频 + showcase 登记；教学结构（一句话→解释(SQL)→动画→收尾总结）与参数逐位口播对新课开箱即用。出片 44496ms 0.0% 漂移、qc 6 抽帧目检（step-3 帧：C2 真算 3600/参数逐位/格数主题）。验证点全 PASS：2 契约 2 通过、清单 6 条、`pnpm verify` EXIT=0。
- 文档索引：[phase-3 task-03](phase-3/tasks/task-03-sum-course/) · [courses/sum-basic.json](../../courses/sum-basic.json)

## 2026-11-08 · #26 · phase-6 task-05 动作出片 + <30s 收紧（task-16，用户反馈闭环）

- 范围：phase-6 / task-05-motion-fast-video
- 动作：hot-driver.py 渲染式改多帧捕获（不 await 触发 + 8fps 连拍窗口 min(holdMs,2400ms)），render-video.mjs 帧序列重放 + tpad 冻结补满 holdMs；tts.mjs/build-plan.mjs 加 `--rate`（默认 +25%）与 edge 重试；规则 4 参数口播改紧凑式 `参数：<标签>、…`，新增规则 5 开篇只念一句话（SQL 解释上屏不念）；契约 gapMs 800→400、vlookup 收尾收短；两门课重出片。
- 要点：vlookup 60.5s→**27.5s**、sum 44.5s→**25.1s**（均 <30s，漂移 0.0%）；typeIn 动画真实入片（t=8.7s 帧=公式半截+光标，t=9.5s 完整，见 shots/）；FAIL 闭环 2 条——edge-tts 偶发超时单段降级 sapi 混声（加重试 2 次后全段 edge）、md5 区分不了动作与编码噪声（改抽帧目检为准）。
- 文档索引：[task-05](phase-6/tasks/task-05-motion-fast-video/)（task.md / verify.md / output.md + shots/）

## 2026-11-08 · #27 · phase-7 task-02 展示层 sidebar 完整教程（task-17，用户反馈闭环）

- 范围：phase-7 / task-02-showcase-sidebar
- 动作：showcase 页卡片栅格重写为 sidebar（品牌+课程列表+本课目录+参考文档）+ 一课一篇完整教程文章（概览→动画演示→分步讲解→动手练习→总结→**如何构建收尾**，一图流命令带当前课 id）；正文双源驱动（tutorials.json 条目 + course.config.json 契约单源）；品牌全线换「无废话 Excel 教程」（index.html / README 头 / package.json / 清单描述 / render-video 登记文案）。
- 要点：drive-02.py 取证 9 检查点全绿（六节顺序 build 末位、视频自动播放 paused:false、参数行只挂首个公式步 4 条、切课换源、console 0 错误）；FAIL 闭环 2 条——autoplay 属性被拦（`v.play()` 兜底）、参数行误挂每个公式步 12 条（改挂首个公式步）；总结卡去「总结：」口播前缀重复。
- 文档索引：[task-02](phase-7/tasks/task-02-showcase-sidebar/)（task.md / verify.md / output.md + drive-02.py / result.json / shots/）

## 2026-11-08 · #28 · phase-6 task-06 步骤讲解入片 + 视频有声（task-18，用户反馈闭环）

- 范围：phase-6 / task-06-step-cards-in-video（含 phase-7 展示层配合改动）
- 动作：展示文章删「分步讲解」节（六节→五节）；render-video 新增 buildStepCards——每动作段悬浮步骤卡（金头「第 N 步·单元格·菜单」+ 公式 + 参数逐位[首个公式步] + 预期，数据单源 plan.steps + 契约 formulaArgs），默认烧入（--no-ass 关）；修「视频没有声音」——mp4 音轨本身有声（volumedetect -20.6dB），根因是展示页 autoplay muted 起播未解除静音，改 playing 事件即 muted=false。
- 要点：双课各 4 张步骤卡入片、时长不变（27.5s/25.1s，漂移 0.2%/0.0%）；FAIL 闭环 3 条——ASS BorderStyle=3 盒色实现不一（libass=OutlineColour）致墨底墨字不可见（字奶油/盒双墨位兼容修复）、右对齐逐行盒锯齿（改左对齐）、`-vf ass=D:/…` 盘符冒号转义坑（合成 cwd=workDir + 相对路径绕开）；drive-02.py 检查点更新（五节/无分步节/有声播放 muted:false）全绿。
- 文档索引：[task-06](phase-6/tasks/task-06-step-cards-in-video/)（task.md / verify.md / output.md + shots/card-step2.png）

## 2026-11-08 · #29 · phase-7 task-03 去「如何构建」——教程页只放教程（task-19，用户反馈闭环）

- 范围：phase-7 / task-03-no-build-section
- 动作：showcase 文章删「如何构建」节（四步命令块 + 文档链接），四节定稿 概览→动画演示→动手练习→总结；showcase.css 清死样式（.build-* 与 task-18 遗留 .step/.arg）；一图流命令只留 README/docs。drive-02.py 检查点固化（四节 / 无构建节 / 页面无 `pnpm plan` 文本）。
- 要点：**口径反转留档**——task-17 曾定「如何构建放最后一节」，task-19 用户改为「构建内容不进教程/视频页面」；记忆已同步修正，后续勿再往教程页加命令块/开发者入口。全部检查点绿、console 0 条、`pnpm verify` 全绿。
- 文档索引：[task-03](phase-7/tasks/task-03-no-build-section/)（task.md / verify.md / output.md）

## 2026-11-09 · #30 · phase-6 task-07 每步节奏收紧 -2s（task-20，用户反馈闭环）

- 范围：phase-6 / task-07-snappier-steps
- 动作：brief 步骤口播改「动作名/参数清单」制——普通步只念菜单标题、公式步只念 `参数：<标签>、…`（替代动作名，细节/预期交给步骤卡）；契约 gapMs 400→200；tts.md 规则 2/4 同步；双课重出片（apps 重生成 + 重 plan + 重渲 + qc）。
- 要点：**口播是节奏下限**——holdMs=max(minHoldMs, speechMs+gapMs)，砍时长先砍语音字数；vlookup 27.5s→**19.7s**（4 步各 -1.2~2.2s）、sum 25.1s→**17.3s**，漂移 0.0%/0.4%、步骤卡各 4 张不变、drive-02.py/`pnpm verify` 全绿。自查拦截 1 条：narrationForStep 改写时 --full 分支早返回丢参数口播（与 tts.md 规则 4 相悖），修后才出片。
- 文档索引：[task-07](phase-6/tasks/task-07-snappier-steps/)（task.md / verify.md / output.md）

## 2026-11-09 · #31 · phase-7 task-04 快速预览组件 + 视频有声修复（task-21，用户反馈闭环）

- 范围：phase-7 / task-04-quick-preview-and-sound
- 动作：声音根因定案并修复——mp4 音轨一直有声（volumedetect -20dB），根因是 `playing` 里程序化解静音在无交互时被 Chromium 拒绝并**把视频暂停**（`Unmuting failed and the element was paused instead`）；改手势门控解静音（userActivation）+ 首次 pointerdown/keydown 全局解锁 + 🔊 开声按钮兜底 + 解静音回滚兜底。快速预览组件 #preview：.md 走 markdown 渲染、.json 走 HTML 折叠树、mp4 内嵌播放，不再裸链文件（保留「新窗口打开原文」）；sidebar 新增「演示视频」组，侧脚清单可点开折叠树。
- 要点：**Chromium 铁律留档**——「autoplay muted 起播后 JS 解静音」必踩坑，解静音只在用户手势后做；**自动化上下文 userActivation 是假激活**（hasBeenActive 恒 true），UI 验收要 init script 伪造真实首访语义否则结果随机（两轮取到不同 muted 态）。drive-02.py 17 检查点全绿（声音 4 + 预览 3 + 既有 10）、console 0、`pnpm verify` 全绿。
- 文档索引：[task-04](phase-7/tasks/task-04-quick-preview-and-sound/)（task.md / verify.md / output.md）

## 2026-11-09 · #32 · phase-6 task-08 抓窗式 intro/outro 段派发（遗留 #1 清账）

- 范围：phase-6 / task-08-uno-segment-dispatch
- 动作：uno-driver `--pace` 按 plan.segments 全量派发（intro 复位空闲态定格 / step 重演 / outro 完成态定格），首尾总结口播段参与 UNO 节奏；输出 paceStartMs（前摇对齐钩子）。顺手闭环录屏式 intro 吞时长 bug——hot-driver 实时路径 intro 分支无 remain 等待，intro holdMs 整段被吞。
- 要点：三出片路径（渲染/录屏/抓窗）同吃全量 segments，intro 拍首格（cells 含表头行）、outro 拍 checks[0] 格；录屏式 bug 实测 15960ms vs ΣholdMs 19728ms（漂移 19% FAIL）→ 补等待后 0.0%；抓窗式整片漂移 0.0%，抽帧核对 t=2.5 首格 A1、t=17.5 验收 E2+王五 与 plan 时间轴一致。
- 文档索引：[task-08](phase-6/tasks/task-08-uno-segment-dispatch/)（task.md / verify.md / output.md + shots/）

## 2026-11-09 · #33 · phase-6 task-09 逐参数高亮拆段（遗留 #4 清账）

- 范围：phase-6 / task-09-param-highlight-blocks
- 动作：build-plan 把公式步驻留按参数标签字数占比切 paramBlocks（Σ=holdMs，末块吃余数）；lesson.js `focusParam(i)` + `.sd-arg.is-focus` 金底加粗（共享源全拷贝）；hot-driver 块内连拍/块间切焦点；render-video ASS 步骤卡逐块 Dialogue（当前块行加粗金）——画面随口播逐参数推进，总时长不变。
- 要点：vlookup 第 2 步块分布 969/1291/969/1291ms（标签 3:4:3:4 字权重）；帧→块映射确定性（fps=8 时 8/10/8/10 帧），抽帧 seg-2-004 参数1 金底、seg-2-030 参数4 金底、seg-2-010 参数2，逐块推进属实；片长 19728ms 与拆段前一字不差（零时长代价）；DOM 与 ASS 双实现同拍，只在首个公式步参数行生效（task-06 口径不变）。
- 文档索引：[task-09](phase-6/tasks/task-09-param-highlight-blocks/)（task.md / verify.md / output.md + shots/）

## 2026-11-09 · #34 · phase-6 task-10 鼠标编排（遗留 #2 清账）

- 范围：phase-6 / task-10-mouse-choreography
- 动作：三模式鼠标编排——抓窗式真实 OS 光标（Mouse 类：smoothstep 滑行 + 真实点击 + cell_xy 网格定位，--grid-origin 物理 px 校准 72,195）、录屏式/渲染式页内光标层（Lesson.mouse.act + #mouse-cursor + 点击涟漪）、record.mjs 前摇裁剪（paceStartMs→leadMs，-ss 片头对齐）+ gdigrab `-draw_mouse 1`；`--mouse` opt-in（产品片保持无鼠标基线）。
- 要点：**DPI 虚拟化陷阱**——非 DPI-aware 进程 SetCursorPos 走逻辑 px（150% 缩放 ÷1.5）而 UNO getPosSize 是物理 px，混用偏 1-2 行（首跑 A2/E2 点成 A3/E4，probe 4 miss）；`SetProcessDPIAware()` 置于 init 首行（先于任何 GDI/User 调用）后 probe 4/4、像素差分热点 (147,256)=A1/(659,277)=E2 与计算点重合。附带教训：probe 复位点击误触任务栏（改空闲格）；apps 拷贝滞后致页内光标静默失效（共享源改动必须同步全部拷贝）；render-video step-6 自动拷贝覆盖过产品片（已还原，smoke 测试须防）。
- 文档索引：[task-10](phase-6/tasks/task-10-mouse-choreography/)（task.md / verify.md / output.md + shots/）

## 2026-11-09 · #35 · phase-4 task-14 univer / onlyoffice 引擎模板（遗留 #3 清账）

- 范围：phase-4 / task-14-univer-onlyoffice-templates
- 动作：univer 模板落地（预构建 univer-kit dist 11.7MB，esbuild scratch 打包、pnpm-lock 不动；engine.js 四 API + 多表/跨表 + syncHooks 重挂 + focusCell 补发选区）；onlyoffice 模板按 docserver 方案落地（插件 postMessage/callCommand 桥 + seed + 500ms 值差轮询 onChange，骨架沿用旧域已跑通实现）；生成器 VENDOR/TPL_DIRS 双引擎接线；lesson.js 共享源异步兼容（null 兜底 + 250/700ms 重读 + 练习态等值落定）。
- 要点：univer 跨表真算 `=SUM(明细!B2:B4)`→3600 SMOKE PASS（自动播放/练习验收/公式栏联动/reset 重挂/console 0）；三语义坑取证修复（异步落值回 null 致结果框显示 "null"、activate 不发选区事件 probe `[]` vs 真点击 `['C3']`、reset 丢钩子）；生成器 dry-run onlyoffice 产物结构正确（plugin+docs 落盘）后清理。**onlyoffice 四 API 动作层未经 docserver 实测**（docker daemon 未运行）——README 诚实记验证状态 + 启用 checklist，不虚报。
- 文档索引：[task-14](phase-4/tasks/task-14-univer-onlyoffice-templates/)（task.md / verify.md / output.md + shots/）

## 2026-11-09 · #36 · 遗留跟踪 issue 化 + out/ 盘点清理 + 流水线构成文档

- 范围：docs/pipeline.md、out/README.md、deferred.md 跟踪段、GitHub issues #14-#19
- 动作：deferred 与各模板 README 记档的待办统一建 GitHub issues——#14 onlyoffice docserver 实测闭环、#15 out/ 参照物入库（univer-kit 构建源/smoke 工具/校准工具住 gitignored out/，机器一丢即丢源）、#16 univer 金底表头带、#17 onlyoffice 透视/图表扩展位、#18 PR 整理（=deferred #7）、#19 旧域在飞（=deferred #8）；out/ 盘点按「结果留 / 试验删 / 被引用持久物留+收编」清理（235M→17M，中间帧/TTS 音频/录屏 webm/探针产物/构建缓存删，plan+mp4+qc 留）；流水线构成 review 落档 pipeline.md（契约单源三产物：生成/出片/展示/质量四层 + 命令速查 + 口径边界 + 遗留跟踪附录）。
- 要点：**out/ 不是纯垃圾桶**——构建源与验收工具被模板 README 引用却 gitignored（issue #15 收编前已保全在 out/ 原位）；deferred #1-#6 已完成销账项按 issue 惯例不建条目；deferred.md 追加「后续跟踪」段与 #7/#8 issue 链接，跟踪面从 md 单点扩到 GitHub issues 双写。
- 文档索引：[pipeline.md](../pipeline.md)（流水线构成）+ [out/README.md](../../out/README.md)（盘点口径与清理记录）+ [deferred.md](phase-8/deferred.md)（后续跟踪段）

## 2026-11-09 · #37 · 分支收口合并 main（PR #13）——deferred #7 销账

- 范围：全仓（chore/drop-local-webshell-and-hallmark → main，PR #13）
- 动作：按用户拍板「带上一起合」——工作区未提交的壳删除（shells/webshell 41 文件）+ pnpm-lock 变更补一笔提交（59aa816）：d21dbbb 删壳曾被 fb32205 回填、PR #13 净 diff 中 shells 相关为零，本意改动一直没进提交；27+1 笔经 PR #13 合并 main（merge commit），分支本地/远端删除，工作副本切回 main。
- 要点：合并带已知红（用户拍板接受）——根 verify 的打包面锁文件校验（excel-interaction 未入就地域白名单，check 脚本只认 excel-animation）+ PR #13 预告的 verify-flags 壳接线红；接线 5 处 + 校验白名单转 issue #20 跟踪。excel-animation 在飞改动与 workspace/README.md 删除按用户决定保留不动（issue #19 存续）。工作副本清理只清分支与运行垃圾，用户在飞改动零触碰。
- 文档索引：[deferred.md](phase-8/deferred.md)（#7 销账 / #8 现状标注）+ [PR #13](https://github.com/qdriven/agent-learning-workbench/pull/13) + [issue #20](https://github.com/qdriven/agent-learning-workbench/issues/20)

## 2026-11-09 · #38 · 壳接线退场——standalone 先行（issue #20 闭环）

- 范围：全仓接线（plugins.registry.yaml / pnpm-workspace.yaml / package.json / scripts/check-seam.mjs / .oxfmtignore / README / build-agent-tutorial SKILL / update-innate-deps 注释 / examples standalone 注释 / apps/server 日志）
- 动作：按用户拍板「目前不需要任何 shell 的东西，直接 standalone 先做」拆壳接线——registry `shell:` 键、workspace `shells/*` 成员、package.json 壳入口（dev / dev:web / dev:empty / dev:cli / verify-flags 五个脚本）、check-seam 规则 1（壳接缝比对）、.oxfmtignore 壳条目；README 架构行与实机运行块、SKILL 架构树/图标注/步骤 5、CI 注释同步 standalone 口径，另清 5 处「webshell」措辞（4 个 standalone 入口注释 + server 启动日志）。
- 要点：锁文件红闭环——check-seam 规则 2 判据由「registry 就地 domain 白名单」改为「importer 路径随 git 入库」，excel-interaction（就地源码、devDeps handsontable/hyperformula）与 excel-animation 及其 5 个 apps 全部认作合法；verify-flags（壳 site-features 旗标校验）随壳退场，verify:codegen 只留锁文件规则。gen 冒烟证实 registry 无 `shell:` 键可用（4 个接缝文件照常出）。验收全链绿：typecheck / lint / test（41+7）/ verify:codegen / verify:manifest（21 条）——lint 首跑 RTK 包装器假红，bypass 复核真绿。standalone 冒烟：examples/pi dev:standalone 起 vite 7.3.7（[::1]:4022，2.7s ready），curl 返回 zh-CN 文档头，按 PID 清树收干净。tech-stack.md 系 fb32205 已删文件，SKILL 悬空引用一并清除；issue #20 所列 docs/tech-stack.md 实无文件可改。
- 文档索引：[issue #20](https://github.com/qdriven/agent-learning-workbench/issues/20) + [deferred.md](phase-8/deferred.md)（#7 补标）+ README.md / docs/skills/build-agent-tutorial/SKILL.md（口径同步）

## 2026-11-09 · #39 · out/ 参照物收编入库（issue #15 闭环）

- 范围：excel-interaction 的 out/ 持久物 → 入库路径（kit-src / smoke / probe 三组）+ 引用面同步
- 动作：三组被文档引用的持久物迁出 gitignored out/——univer-kit 构建源（kit.js + 独立 package.json/lock）入 `skill/excel-tutorial-maker/templates/univer/kit-src/`；univer 冒烟工具（drive-univer.py / probe-sel.py）与测试课专属物（course.config.json / lesson.js）入 `scripts/tutorial/smoke/`；校准工具（click-probe.py / cursor-diff.py）入 `scripts/recorder/probe/`。测试课的模板拷贝物（index.html / theme.css / engine.js / dist 12M）不入库——setup.mjs 运行前从模板现取（md5 实证拷贝同源），共享源唯一、消除拷贝漂移。引用面同步：univer/onlyoffice 模板 README、task-10/14 output 下游接线、out/README 收编记录；.gitignore 盖组装产物 + 构建源注释更新。
- 要点：验收三口径——① 重打包：kit-src `npm install` + `esbuild --minify` 重建的 kit.js/kit.css md5 与入库 dist 全同（7314cd44 / fdfb7eae，确定性重建）；② univer smoke：**SMOKE PASS**（sync-probe null→3600 异步落值语义、play-result 3600 跨表真算、练习验收、console 0 错误）；③ 网格校准：click-probe 的 uno-driver 相对路径随迁修正（parents[2]→parents[1]）+ 路径断言过，真机位校准随下一次出片执行。历史 task 取证记录（verify.md 等）旧路径保留不动；out/ 归纯媒体口径（成片 + plan + qc + 截图）。
- 文档索引：[issue #15](https://github.com/qdriven/agent-learning-workbench/issues/15) + [out/README](../../../out/README.md)（收编记录）+ [smoke README](../../../scripts/tutorial/smoke/README.md)

## 2026-11-10 · #40 · L2 后续内容总盘点入档（sprint 文档）

- 范围：docs/sprints/sprint-l2-composite-lessons.md + docs/index.md + phase-8/deferred.md
- 动作：单函数 recipe 三轮收官（27 门在架/27 支视频/8 分类）后，把全部待后续内容写成
  sprint 任务底稿——P1-L2 复合场景课（18 实验台+2 真实案例）/ P2 抓窗式出片 / P3 走查验证
  口径 / P4-P8 引擎能力（#14/#16/#17 + 函数边界 + 跨表）/ P9 动效进阶（GSAP 对比）/ P10 仓库事务。
- 要点：**难点七条**（4 步单公式刚性→N 步化改造面、练习单点监听→顺序状态机、跨表
  sheets[0] 缺口、视频时长形态三选一、引擎函数边界、转写不宜纯脚本、真实数据规模）；
  **20 场景逐个方案**（A 单表多公式/B 跨表/C 图表/D 引擎边界/E 已被原子课覆盖五类，
  含优先级排序：合集页零成本先验证需求 → dave-clean 试点 → dirty-data/RFM → 跨表旗舰
  → free-excel/apple-finance 压轴）；**GSAP（用户口述 grasp）对比**入档——零依赖+帧确定性
  是现选，paused+seek 是未来接入动效进阶的标准姿势。
- 文档索引：[sprint-l2-composite-lessons.md](../sprints/sprint-l2-composite-lessons.md) + index.md 项目级表 + deferred.md 后续盘点段

## 2026-11-10 · #41 · L2 阶段 1+2 试点 + P3 走查（N 步契约地基 · dave-clean · 走查通过）

- 范围：skill/excel-tutorial-maker/templates/handsontable/lesson.js（共享源）·
  scripts/tutorial/check-manifest.mjs · courses/dave-clean.json + seeds · src/standalone/home.html ·
  docs/sprints/sprint-l2-composite-lessons.md（执行进度）
- 动作：**阶段 1 N 步契约地基**——lesson.js 由 4 步硬编码改 N 步状态机（每公式 4 步一块，
  `(n-1)%4` 块位映射选中/输入/确认/复核，N=4 时与旧课逐位等价）；finish() 复合课逐块验收
  （3/3 文案）、practice() 顺序状态机（practiceCheck 推进，只认当前块单元格，通过才放行下一块）、
  argsText/argsRows 按块隔离参数（formulaArgs 支持 step 绑定，缺省挂首个公式步兼容旧契约）、
  caption/按钮/done 态全部 N 化；check-manifest 改「4 的倍数 ≥4」+ checks 数 ≤ 块数校验。
- **阶段 2 试点 dave-clean**（L2 首门，场景实战分类）：3 公式 12 步（TRIM+CLEAN 洗文本 →
  COUNTIF 查重 → XLOOKUP 抽查复核），单表形态（跨表待阶段 3）；真浏览器全链——
  自动播放 step=13、3/3 逐块验收（F2=华东/F3=true/F4=800）、顺序练习 1/3→2/3→3/3 逐块放行、
  出片 47.9s 偏差 0.0%、qc 14 帧全过。
- **P3 走查三问全过**：①搜索 vlookup 命中 ②3 次点击（搜索→▶20s 视频播放中→✋练习）
  ③练习输入公式验收通过（E2=王五）→ 判定分支：**走查通过，进入 L2 批量转写**。
- 要点：**回归 28/28 全绿**（存量 27 门零迁移，向后兼容硬指标达标）；P3 首跑暴露 home.html
  两处语法损伤（blocked 卡补丁残留多余 `}` 与未转义引号——静态检查没跑，真浏览器抓出），
  修复过 node --check；回归脚本对 12 步课需自适应等待（固定 14s 会截断长课，按 N 计算 waitMs）。
- 文档索引：[sprint 执行进度](../sprints/sprint-l2-composite-lessons.md)（§8）+ 本文档

## 2026-11-10 · #42 · L2 Sprint 全量完成——9 门复合/压轴课 + 跨表引擎 + 合集页 + 收口

- 范围：sprint-l2-composite-lessons.md（status → done）· scripts/batch/{l2-gen,capstone-gen}.mjs ·
  skill templates（engine/lesson/chart-layer/theme 共享源）· courses/{dirty-data,customer-rfm,
  portfolio-dashboard,luke-charts,maf-charts,retail-ops,apple-finance,free-excel}.json ·
  scripts/landing/{recipes-lib,check-recipes}.mjs · src/standalone/home.html · issue #14 留言
- 动作：**阶段 2**（l2-gen 程序化 4 步/块展开）dirty-data 16 步 4/4 含 F2 链式依赖、
  customer-rfm 16 步 RFM 三维度+AND 合成；**阶段 3 跨表引擎**——engine.js 多表挂载
  （HT 初始化后 addSheet 副表，规避 formulas 插件绑定错位）、中文表名单引号口径
  （`='利润表'!B2` 探针实证，无引号 #ERROR!）、lesson.js 参考表渲染、chart-layer/finish
  支持 `表名!区域`；portfolio-dashboard 3/3 三块跨表、luke-charts 跨表 SUM+跨表图表
  drawn 正确、练习态公式全过自动出图；**阶段 4** maf-charts SUM+条形、retail-ops UCI
  真实数据 10 行子集 4/4；**压轴** free-excel 全类型 4 块 16 步（TEXT 环节按记档绕过）、
  apple-finance 三表勾稽 3/3（毛利 195201/三表差 0/IF+ABS 平衡，2 参考表）；
  **合集页** 3 合集 9 成员（E 类零成本）+ check-recipes 合集引用校验；
  **视频形态定稿选 B**（原子分段+桥接卡，L2 实测 34-62s/支复用现有管线）；
  **阶段 5** blocked 8 项边界+16 项已解锁清单随 #14 留言移交。
- 要点：finish() 重构为「值必验+公式按锚点分流+图表断言」三合一（数据锚点跳公式比对，
  图表+真公式复合课两头都验）；practice() 图表分流（锚点→框选、真公式→顺序+全过出图）；
  capstone-gen/l2-gen 双模板使 A 类剩余 7 场景可直接批量。**全量回归 36/36**（真浏览器
  自适应等待）、verify 四段绿（36 契约/73 清单/recipes+合集）、**36 门在架 36 视频全亮**。
- 文档索引：[sprint §8 执行进度](../sprints/sprint-l2-composite-lessons.md)（status: done）+ [issue #14 留言](https://github.com/qdriven/agent-learning-workbench/issues/14#issuecomment-6749509659)

## 2026-11-10 · #43 · A 类 7 场景批量转正（阶段 2 收尾）+ engine 空值语义修复

- 范围：scripts/batch/aclass-gen.mjs（新）· courses/{power-query,eda-outliers,plans,
  two-way-lookup,inventory-reorder,supply-quality,text-date}.json + seeds ·
  skill templates/handsontable/engine.js（buildMatrix null 修复）· docs/sprints §8
- 动作：**A 类 7 场景全部转正**（sprint 阶段 2 收尾）——探针先行 25 项（修正 2 处：
  XLOOKUP 嵌套需 3 参 `INDEX(...,1,MATCH)`；探针自身行号错位复测）→ aclass-gen 程序化
  4 步/块展开 → 43 契约全过 → 生成 → 真浏览器验证 → 出片 50-76s/支 qc 全过。
  7 门：power-query（跨表 XLOOKUP 合并+链式计算列，2 表）、eda-outliers（AVERAGE/MAX/
  COUNTBLANK/IF 探索四查）、plans（MAX(0,..) 套餐建模×3+INDEX/MATCH 挑最优，16 步链式）、
  two-way-lookup（双 MATCH 交叉+XLOOKUP 变体+IF 阈值）、inventory-reorder（补货点模型
  3 块链式）、supply-quality（加权口径四算，链式）、text-date（LEFT/MID/RIGHT+FIND 拆分，
  TEXT 月份环节 blocked 记档）。
- **engine.js 空值语义修复**：buildMatrix 缺失格 `""`→`null`——HyperFormula 实测
  `""` 不算 blank（COUNTBLANK 返回 0），null 才是真空格；eda-outliers E4 由 0→1 修复。
  共享源同步全部 apps，**43/43 回归零破坏**。
- 要点：**终态 43 门在架 43 支视频 ▶ 全亮、3 合集、9 分类（场景实战 15 门）**；
  verify 四段绿（43 契约/88 清单条目）；sprint §8 更新、A 类待办销账。
- 文档索引：[sprint §8](../sprints/sprint-l2-composite-lessons.md)（A 类完成销账）

## 2026-11-10 · #44 · P2 抓窗式 LibreOffice 出片——uno-driver 图表/区域动作 + 10 门真机录屏

- 范围：scripts/recorder/{uno-driver.py, batch-capture.mjs, uno-chart-probe*.py, probe4-capture.mjs} ·
  out/*/**-capture.mp4（10 门）· docs/sprints §8
- 动作：**UNO 三能力探针实证**（不猜接口）——①区域选择 `controller.select(getCellRangeByName)`
  ②图表插入 `Charts.addNewByName + getEmbeddedObject().setDiagram`（Line/Bar/Pie/XY/Area 五服务全过）
  ③**探针4 双图对照 + gdigrab 截帧**实证 `BarDiagram.Vertical` 语义：**True→横条、False→竖柱**
  （与直觉相反）；chart-column/bar/stacked 契约 type 都是 bar 不可靠 → **图型/方向按 guide 菜单文本定**
  （簇状柱形/条形/堆积/直方关键词分派，堆积另设 Stacked=True）。
- uno-driver 改造：`parse_range` 区域地址（图表课 A1:B7 选中，mouse.cell_xy 同步取左上角）；
  `insert_chart`（菜单定型 + 数据区右侧落位）；`to_uno_formula` 表分隔 `!`→`.`（跨表公式真机可算）；
  **多表铺数**（跨表课全部 sheet 进真机）；`norm_formula` 跨表引用归一（UNO 回读剥单引号+`!`改`.`——
  portfolio B2/B3 值对但 ok=false，探针定位口径差）；锚点 checks（`formula="="+cell`）跳公式比对。
- 出片：`batch-capture.mjs` 批量 8 门 + 手动 2 门 = **10 门 `*-capture.mp4` 全过**（sum-basic 回归、
  portfolio-dashboard 跨表、chart-line/bar/column/pie/scatter/histogram/combo/stacked）；
  各门 qc 抽帧验方向（横条 ✓ 竖柱 ✓，chart-bar 状态栏实算 6690）；时长与 ΣholdMs 偏差 0%。
- 要点：gdigrab 窗口标题探测沿用 record.mjs PowerShell UTF-8 口径（GBK 控制台中文标题乱码会找不到窗）；
  探针脚本（uno-chart-probe*.py）留 scripts/recorder/ 作接口实证资产。
- 文档索引：[sprint §8 P2 行](../sprints/sprint-l2-composite-lessons.md)

## 2026-11-10 · #45 · #16 闭环——univer 画布金底表头带（kit.js 自绘主题）

- 范围：skill/excel-tutorial-maker/templates/univer/{kit-src/kit.js, dist/univer-kit.js, README.md} ·
  scripts/tutorial/smoke/（冒烟取证）· GitHub issue #16（评论+关闭）
- 动作：**#16 金底表头带落地**——`buildCellData` 给 data 第 1 行（约定表头行）全列 26 格
  内联 `IStyleData` 直挂 `ICellData.s`（typed 定义实证 `s?: IStyleData | string`）：
  金底 `bg:#ffca34` + 墨字 `cl:#363e40` + 加粗 `bl:1` + 居中 `ht/vt:2`——与 handsontable
  `td.cell-head` 同观感；有值格叠样式、空格也铺（整行金底非只数据格）。
- 要点：**确定性重建三段取证**——①改前 esbuild 重建 md5=`7314cd44`/`fdfb7eae`（与 #39
  记录全同，构建链零漂移）②改后 js→`de0ce940`（css 不变，证明改动只影响 js）③univer 冒烟
  **SMOKE PASS**（sync-probe 异步落值/跨表 SUM=3600/自动播放/练习验收/console 0 错误全过）
  + 截图 `out/univer-smoke/univer-xsum.png` 第 1 行整行金底目检。
- 三引擎表头带口径至此统一：handsontable ✅（cell-head）/ univer ✅（本次）/ onlyoffice ⚠️
  （docserver 依赖，随 #14）。
- 文档索引：[univer README 表头带节](../../skill/excel-tutorial-maker/templates/univer/README.md) + [issue #16](https://github.com/qdriven/agent-learning-workbench/issues/16)（已关闭）

## 2026-11-10 · #46 · #14 闭环——onlyoffice docserver 四 API 端到端实测 8/8

- 范围：skill/excel-tutorial-maker/templates/onlyoffice/{engine.js, plugin/plugin.js,
  plugin/translations/*, README.md} · scripts/recorder/{drive-oo.py, debug-oo.py} ·
  courses/oo-test.json（#14 实测课）· scripts/serve/serve.mjs（CORS）· docs/sprints §8 ·
  GitHub issue #14
- 动作：**四 API 端到端验收 `drive-oo.py` 8/8 连跑两轮**——seed 铺数 → setFormula 真算
  （SUM=3600）→ getValue 回读 → getFormula 编辑栏 → focus → 练习态 500ms 轮询验收
  （外部文档改动经插件桥检出 → 缓存刷新 → 验收通过）→ console 零错误。
  测试课 oo-test 出片 ▶（17.2s，偏差 0.4%），recipes 44 门在架 44 视频。
- **实测钉死 8 条边界并全部回写模板**（每条都是探针/对账定位，不猜）：
  1. **callCommand 并发争用**（diag-burst 探针：连发 6 条只回执 1 条）→ engine `send()`
     改**串行队列**——这是轮询 Promise.all 永不 settle、练习验收卡死的根因；
  2. 插件 ready 晚于 document ready（seed 抢跑报"未就绪"）→ send 内 15s 等就绪重试；
  3. Docker 容器内 localhost=自身（"下载失败"）→ `document.url` 走
     `?fileOrigin=http://host.docker.internal:4173`；**`pluginsData` 反向必须走页 origin**
     （Chromium 抓私网 IP 走系统代理 ERR_EMPTY_RESPONSE，localhost 绕过）——双侧起源不同；
  4. 编辑器 iframe（8080）跨域取插件 config 被 CORS 拦 → serve.mjs 加
     `Access-Control-Allow-Origin: *`；
  5. blank.xlsx 预置 4 张演示表名与契约不符、`InsertSheet`/`SetName` 不存在 → seed 按
     **索引改名复用**（`ws.Name` 可写，探针 setter=true），超出预置数才 `Api.AddSheet`；
  6. `reset()` 销毁重建编辑器+插件（旧窗口发命令石沉大海）→ 外部驱动等**新** ready
     （`__pwCount` 计数）+ seed 完成再发；
  7. 插件 i18n 3×404 → 补 `plugin/translations/langs.json`（JSON 数组，sdk 源码实证）
     + `zh-CN.json`；
  8. `unmount` 清 formulaCache 后轮询只刷值 → `startPoll` 双读 getValue+getFormula
     （Promise.all）+ 首见空格初始化防误报。
- 要点：诊断链——回执对账（`__sent` 43 / `__recv` 12 → 未回执全是 getValue）→ 连发探针
  （burst 1/6、spaced 正常）→ 定位 callCommand 争用；插件消息走 `window.top.postMessage`、
  宿主须捕获 ready 的 `event.source`（嵌套窗口，发外层 iframe 超时）。驱动脚本两轮 8/8
  证明修复非偶然。
- 文档索引：[onlyoffice README 验证状态](../../skill/excel-tutorial-maker/templates/onlyoffice/README.md)
  （⚠️→✅，8 条边界全记）+ [sprint §8 #14 行](../sprints/sprint-l2-composite-lessons.md) + issue #14（已关闭）

## 2026-11-10 · #47 · SQL × Excel 对照工作台——可行性分析与计划入档（planned）

- 范围：docs/sprints/sprint-sql-workbench.md（新）· docs/index.md（挂链）
- 动作：用户提案（SQLite 真机演示"SQL 比 Excel 好用"、工作台同支持 SQLite+表格并
  直接生成表格）的**可行性分析 + WBS + 4 阶段计划**写入 sprint 文档，status: planned。
- 侦察证据：**35/44 门在架课含 SQL 类比、12 门有"就像 SQL: …"具体对照**（SUMIFS→
  GROUP BY、XLOOKUP→JOIN、IF 标记→WHERE）——内容钩子现成，提案=把口头类比升级为
  可执行对照。技术选型 sql.js（官方 WASM，~1.5MB，vendored 入 templates/vendor/，
  不进 pnpm-lock）；SQL 执行同步确定性，天然满足 motion-spec 硬约束；打字机/动作帧
  序列/TTS 步骤卡/qc/契约验收全复用。
- 三风险记档：结果行序须显式 ORDER BY（进 manifest 校验）、双表出片布局（阶段 1
  闸门先验证）、scope 蔓延（先 1 门 PoC 钉最小闭环）。
- 计划：阶段 0 PoC（0.5 天，md5 双截确定性）→ 阶段 1 引擎模板+1 门端到端（1 天，
  闸门）→ 阶段 2 三门对照课批量+recipes 分类（1 天）→ 阶段 3 可选（同屏对照/UPDATE 动画）。
- 文档索引：[sprint-sql-workbench](../sprints/sprint-sql-workbench.md)

## 2026-11-10 · #48 · 目录组件统一（card/list 双视图+分页+侧栏搜索分类）+ 构建流程浏览器

- 范围：src/standalone/{catalog.js, md.js, build-flow.html}（新）· home.html ·
  index.html · showcase.js · showcase.css
- 动作：**批次1 目录组件统一**（用户需求：两页做到一起）——共享 `catalog.js`
  （Catalog.match 多字段搜索 / paginate 分页 / pagerHTML+pagerClick 控件）：
  ① home 顶部加 **card/list 视图切换**（localStorage 持久化）+ 分页（card 12/页、
  list 18/页，搜索/分类变化重置页码）+ list 行形态（函数名|分类|元信息|一句话|动作）；
  ② showcase 侧栏重做为**紧凑目录**：搜索框 + 分类下拉（9 类）+ list（10 门/页，
  ▶ 视频标 + active 金底）+ 分页——数据源统一 recipes.json（与 home 同源 44 门，
  失败回退 tutorials courses），正文仍走契约单源；原「本课目录」锚点块已删（前反馈）。
- **批次2 构建流程浏览器**（用户需求：canvas 流程图点节点看文档）——新页
  `build-flow.html` + home「🧱 如何构建」入口卡：canvas 两态（**flow 全景** 6 节点
  横排箭头 / **rail 侧边栏步骤条**竖排，当前步金底 ✓），点节点自动收缩为步骤条 +
  右侧 markdown 文档（共享 `md.js` 从 showcase 抽出，同源渲染）；上一步/下一步顺序
  导航 + 展开/收缩切换 + 文档加载竞态防护（docToken）。**构建链 6 节点映射真实文档**
  （存在性已核验）：环境准备 scripts/README → 写契约 contract-schema → 生成模板
  templates/README → 验收 build-method → 出片 recorder/SKILL → 上架 pipeline.md。
- 验证：浏览器实测全绿——home 双视图切换/分页/搜索（18 行 3 页、搜 vlookup 1 条）、
  侧栏（10/页 5 页、搜图表 8 项、分类查找引用 3 项、点第 2 页切课正文正确）、
  build-flow（点节点→自动 rail→文档 h1/表格/代码渲染、下一步×2→第3步、6 文档可达、
  展开回 flow）、pageerror 0；4 张截图目检（bf-flow/bf-rail/home-list/showcase-side）；
  verify 四段绿（44 契约/90 清单/recipes）。
- 文档索引：home 入口卡 → /src/standalone/build-flow.html

## 2026-11-10 · #49 · 站点统一导航三页互达 + showcase 卡片墙视图 + build-flow 改 process bar

- 范围：src/standalone/{showcase.css, home.html, index.html, showcase.js, build-flow.html}
- 动作：**① 站点统一导航条**（用户需求：home/index/build-flow 三页在 home 上都能达）——
  `.site-nav` 共享组件（格数品牌 + 🏠目录 / 📚教程站 / 🧱构建流程，sticky 顶、当前页金底
  active），三页各自插入；build-flow 原「← 目录」按钮由 nav 替代。
  **② showcase 卡片墙视图**（用户需求：index 可视图切换）——正文区加 toolbar
  （📄文章 ⇄ ▦卡片墙，localStorage 持久化）：卡片墙 = recipes 44 门卡（fn/分类/一句话/
  元信息/打开教程→），点卡回文章态并打开该课；侧栏保持 list+搜索+分类+分页不变。
  **③ build-flow 弃 canvas 改 process bar**（用户决策：样式统一优先、点击出内容 DOM 更稳）——
  顶部横向六步流程条（小节点+箭头，序号圆点，visited 金浅/active 金底）+ 左侧 sidebar
  竖向步骤（同款语汇，两处点击联动）+ 右侧 markdown；**默认展示第 1 步**（不再空态）；
  上一步/下一步 + 左右方向键顺序导航；加载竞态防护保留；全样式走 showcase.css token。
- 验证：浏览器实测——三页 nav 各 3 链接 active 正确；showcase 文章⇄卡片墙往返
  （44 卡、点第 5 卡进文章、toolbar 常驻）；build-flow 默认第 1 步 md 渲染、bar 点第 4 步/
  side 点第 6 步/上一步联动、visited=2、无 canvas、pageerror 0；截图目检（sc-cards/bf-v2）
  样式与站点统一；verify 四段绿（44 契约/90 清单/recipes）。

## 2026-11-10 · #50 · 共享资产去重（apps/_shared）+ 全站去「契约」+ 推荐·HOT 特别卡 + 流水线文案

- 范围：scripts/tutorial/{engine-assets.mjs, sync-shared.mjs, migrate-shared.mjs, new.mjs} ·
  apps/_shared/（新）· apps/<id>/（43 门瘦身）· templates/{handsontable,onlyoffice}/lesson.js ·
  src/standalone/{home.html, build-flow.html}
- 动作①**共享资产去重**（用户需求：依赖 assets 统一到一处）——43 门课 lesson.js/theme.css/
  engine/vendor 逐课拷贝实测完全相同（md5 43/43 同）→ 抽 `apps/_shared/handsontable/`
  （10 件）；课目录只留 index.html + course.config.json（**apps 文件数 530→109**）。
  new.mjs 共享引擎走 `ensureShared + sharedize`（index.html 引用改写 `../_shared/…`，
  两种服务根下相对路径都通）；`sync-shared.mjs` 一键同步（替代 44 次 cp）；
  `migrate-shared.mjs` 幂等迁移。边界：onlyoffice（oo-test）保持拷贝（plugin/docs 路径与
  课 URL 耦合）。
- 动作②**全站去「契约」**（用户要求）——可见文案清零：home stats「契约单源」→「公式真算 ·
  逐课验收」；lesson.js 验收句「与契约一致/不一致」→「与预期一致/不一致」（3 模板，
  同步 _shared + oo-test）；courses 44 门可见字段（summary/guide/args）扫描零命中。
  build-flow 删「写契约」步骤（6→5 步）+ 相关描述改「质量校验」。
- 动作③**推荐 · HOT 特别卡**（用户需求）——home 顶部 6 张特别卡两行×3：3 合集（★推荐金标，
  带成员 chips）+ 3 随机热门课（🔥HOT 墨标金文，live+已出片池随机，每次刷新不同）；
  合集独立区并入推荐区；下方「📚 教程清单」虚线分隔标题 + 分类 tabs + 卡片/列表 + 分页。
- 动作④**流水线文案**（用户需求）——build-flow h1/title 改「如何构建这个动画视频流水线」
  （流水线说明定位）；home 入口卡同步。
- 验证：**43/43 全量回归全绿**（共享化+文案双改动下真浏览器自动播放）；oo-test drive-oo
  **8/8**（新验收句生效）；出片抽验 sum-basic ✓（_shared 结构 render-video 跑通，edge
  0.4% qc 全过——tts off 版偏差 30% 为 off 模式特性，已用 edge 恢复正式版）；home/build-flow
  浏览器实测（6 卡 3★+3🔥、五步流水线、pageerror 0）+ 截图目检；verify 四段绿。

## 2026-11-10 · #51 · 网站介绍演示视频（90s 有声全站导览 + OpenScreen 式镜头变换）

- 范围：scripts/recorder/demo-tour.mjs（新）· out/demo-tour/site-tour.mp4 →
  src/standalone/public/showcase/site-tour.mp4（展示资产）· src/data/tutorials.json（demo 登记）
- 动作：**90 秒有声全站导览**（用户需求，追加镜头语言要求"类似 OpenScreen 远近变换与转换"）——
  9 段编排：home 概览 → 搜索 vlookup → 双视图/分页 → 推荐·HOT 区 → 课程页自动播放 →
  手动练习打字验收 → 教程站卡片墙 → 五步流水线 → 收尾淡出。
- **镜头引擎**（demo-tour.mjs 核心）：playwright 逐帧驱动 body CSS transform
  （scale+translate 插值、easeInOut、元素 boundingBox 精确对准——推近搜索框/流程条、
  拉远看全景、页内平移），段间 opacity 淡入淡出转场；关键帧+动作时间轴编排
  （动作 force click 跳过镜头运动中的 stability 检查——实测坑）。
- **管线复用**：tts.mjs speakSegment（edge +12% 语速）逐段旁白 + buildNarration
  （file+holdMs 按段长补静音拼接）；ffmpeg 帧序列→clip（tpad 冻结补段长）→concat→
  mux；字幕 drawtext（微软雅黑，逐段 enable 区间烧入）；帧序列拍后即清。
- 排障三轮：①镜头动画中 click 因元素持续位移 stability 超时 30s → force+短 timeout；
  ②推近表格时头部按钮被推出视口（outside viewport）→ 动作点留全景窗口、镜头时序重排；
  ③切回卡片动作挪到镜头拉回后。**终版 9 段零动作失败**。
- 产物：83.6s · h264+aac 双流 · 旁白 53.1s · 9 段字幕烧入；qc 抽 4 帧目检
  （推近流程条/搜索命中/课程动画/字幕同步）；tutorials.json 登记 demo 条目
  → showcase 演示视频区自动出现（verify 91 条全绿）。
- 要点：playwright 走 out/diag 本地安装（createRequire，出片引擎不进 pnpm-lock 纪律）；
  重跑 `node scripts/recorder/demo-tour.mjs`（需 4174 整站服务在跑）。

## 2026-11-10 · #52 · scripts 全量索引文档 + build-agent-tutorial 技能真身清理

- 范围：`domains/excel-interaction/scripts/README.md`（重写 196 行全量索引）·
  `docs/skills/build-agent-tutorial/SKILL.md`（删除）· PR #23（docs/scripts-index）
- 动作①**scripts 全量索引**（用户需求）——40+ 脚本按九组目录盘点：六条流水线步骤
  （环境初始化/新课上架/出片三连/批量/引擎验收/模板同步）、逐脚本 what/how/where、
  状态四档（✅ 活跃 / 🔧 手动档 / 📦 一次性留档 / 🗑 可清）、平台坑位表；附
  「可抽取的 office 操作能力」盘点（四 API 抽象/UNO 层/OO 桥/docbuilder/TTS/
  出片/镜头语言）——**纯文档设想**，边界注明：流水线没采用的就不要去采用，
  不引入新脚本、不做抽取/抽象（2026-11-10 用户口径）。
- 动作②**技能真身删除**（用户口径"非工程化的代码在 AI 时代也不错"）——
  build-agent-tutorial 工程化架构说明书随工作区删除入库，内容不迁移，
  git 历史 c0abf30 可恢复；`.claude/skills/build-agent-tutorial/SKILL.md`
  指针随之悬空，另行处置。
- 验证：`pnpm showcase` 启动脚本在 package.json 实测（4174 整站服务，
  app/course/video 三路由 200）；scripts/README.md 与目录实况逐组核对；
  `git status` 清（删除入库后无残留）。
- 要点：**流水线不改**——现行脚本保持务实形态，不做库化/工程化抽取。
