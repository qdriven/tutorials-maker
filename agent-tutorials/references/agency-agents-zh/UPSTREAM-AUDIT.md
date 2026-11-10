# 上游差异与开发建议

核对日期：2026-10-17。本报告的“主站”指英文上游 [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents)，不是课程网站或在线专家库。

## 结论与范围

本地基线记录停留在 6 月，不能继续宣称已覆盖当前上游。当前页面核对发现角色增量、工具格式变化与安装能力差异。本次只比对公开 README 中取到的部分路径和本地脚本，不是完整 Git diff；下方缺失路径是待同步候选，不是最终新增数量。已有同名角色的正文变化仍需固定上游 commit 后逐项比较。

核对来源：[上游 README](https://github.com/msitarzewski/agency-agents/blob/main/README.md)、[上游目录](https://github.com/msitarzewski/agency-agents)、[中文仓库 issues](https://github.com/jnMetaCode/agency-agents-zh/issues)。页面可能更新或存在缓存；本次未取得可复核的最新完整 commit SHA。

## 已完成

- 根据开放 issue #97 的标题新增嵌入式算法工程师、嵌入式应用工程师；详情页及两条评论未成功读取，未声称满足评论中的额外要求。
- 两个角色分别聚焦数值与资源验证、设备业务与恢复，保留现有固件、Linux 驱动、IoT、FPGA 与测试角色的职责边界。
- 本地规模由 277 更新为 283（含第一批 2 个原创与本批 4 个中文精编），原创由 64 更新为 66；工程部 47、营销部 43。
- 更新简繁入口、名单、速查表、包描述与上游状态；线上专家库数量由线上页面决定，去除过时的固定人数。
- CI 执行计数检查，补齐 GIS / security 变更的 lint 触发范围。

- 第二批已补充 RAG、身份与访问、支付与计费、测试自动化四个中文精编角色；正文按上游职责整理，未宣称逐行完整翻译。
- 第三批完整翻译桌面应用工程师、AI 生成代码安全审计师、密钥与凭据治理工程师三个角色，原文固定于上游 commit `652b269`（`652b2692f8d8ec2b1f1a38e559073e287dfdc469`）。本地规模更新为 286（翻译 220 / 原创 66）；工程部 48、安全部 12。
- 第四批完整翻译 API 平台工程师、数据库可靠性工程师、平台工程师三个角色，原文同样固定于 `652b269`。本地规模更新为 289（翻译 223 / 原创 66）；工程部 51。
- 第五批完整翻译开发者工具工程师、FinOps 工程师、隐私工程师三个角色，原文同样固定于 `652b269`。本地规模更新为 292（翻译 226 / 原创 66）；工程部 54。
- 第六批完整翻译国际化工程师、知识图谱工程师、搜索相关性工程师三个角色，原文同样固定于 `652b269`。本地规模更新为 295（翻译 229 / 原创 66）；工程部 57。
- 第七批完整翻译 LLM 后训练工程师、实时协作工程师、WebAssembly 工程师三个角色，原文同样固定于 `652b269`。本地规模更新为 298（翻译 232 / 原创 66）；工程部 60。
- 第八批完整翻译视频流媒体工程师、移动端发布工程师、数据可视化工程师三个角色，原文同样固定于 `652b269`。本地规模更新为 301（翻译 235 / 原创 66）；工程部 63。
- 第九批（2026-10-18）完整翻译 IoT 设备群工程师、Rust 重构专家、PDF 引擎架构师三个角色，原文同样固定于 `652b269`。IoT 设备群工程师侧重已上线设备群的运维，与本地原创的 IoT 方案架构师（整体方案设计）分工不同。本地规模更新为 304（翻译 238 / 原创 66）；工程部 66。
- 第十批完整翻译通用文档编译器、ATS 校验架构师、UI 收尾审查员三个角色，原文同样固定于 `652b269`。本地规模更新为 307（翻译 241 / 原创 66）；工程部 68、设计部 11。同时修正 CATALOG 历史遗漏：补齐公司经营部 7 个角色及 3 个原创角色、改正 2 个已迁移的旧路径、金融部计数改为 9，并将 CATALOG 一致性接入计数检查。
- 第十一批完整翻译开发者社区建设专家（营销部）、DX 工程师（产品部）两个角色，原文同样固定于 `652b269`。两者与本地已有的开发者布道师有部分交集，但分别聚焦社区运营与上手摩擦；上游三者并存。本地规模更新为 309（翻译 243 / 原创 66）；营销部 44、产品部 6。通用类候选至此全部完成。
- 第十二批完整翻译网络工程师（Cisco/Juniper/Palo Alto，与本地原创的华为/华三版国内网络工程师互补）、GaussDB 专家、WordPress 性能工程师三个角色，原文同样固定于 `652b269`。本地规模更新为 312（翻译 246 / 原创 66）；工程部 71。
- 第十三批完整翻译 Drupal 性能工程师和研究综合专家，原文同样固定于 `652b269`；新建 `research/` 部门，并同步转换、安装、lint、发布文件列表和 CI 触发范围。同时修正 Windows 版 `install.ps1`、`convert.ps1` 部门列表遗漏 `gis` 与 `security` 的问题（修复前 Windows 安装少 25 个角色）。本地规模更新为 314（翻译 248 / 原创 66），部门 21 个；工程部 72、研究部 1。
- 第十四批完整翻译 healthcare 部门三个角色（临床证据专家、医疗创新战略师、主权卫生体系专家），原文同样固定于 `652b269`；新建 `healthcare/` 部门并同步转换、安装、lint、发布文件列表和 CI 触发范围。三个角色开头注明海外监管语境的适用范围，并指向本地原创的医疗健康营销合规师。本地规模更新为 317（翻译 251 / 原创 66），部门 22 个；医疗健康部 3。
- 第十五批完整翻译 Section 508 无障碍专家、ServiceNow 开发导师、USWDS 开发工程师三个角色，原文同样固定于 `652b269`；两个美国联邦专属角色开头注明适用范围。本地规模更新为 320（翻译 254 / 原创 66）；工程部 75。至此本报告列出的路径候选已全部翻译完成。
- 第十六批完整翻译全量比对新发现的简历定制师、总体规划架构师、代码库考古专家三个角色（前两者是 ATS 校验架构师的协作对象），原文同样固定于 `652b269`。本地规模更新为 323（翻译 257 / 原创 66）；专项部 61。
- 第十七批完整翻译统计学家（学术部）、游戏经济设计师（游戏开发部）、专注音乐架构师（专项部），原文同样固定于 `652b269`。本地规模更新为 326（翻译 260 / 原创 66）；学术部 7、游戏开发部 21、专项部 62。
- 第十八批完整翻译年迈父母照护助手、FedRAMP 与 RMF 合规工程师，原文同样固定于 `652b269`。本地规模更新为 328（翻译 262 / 原创 66）；专项部 64。至此上游 `652b269` 的全部角色路径均已有本地对应。

## 后续优先级

### AO 联动验证发现

本批 4 个角色已通过 AO 现有 `dist/cli/install.js` 收集器识别；工程部 Cursor dry-run 返回 47 个且未写入配置。角色库自身计数与 Cursor 转换均为 283 个。

AO 修复已于 2026-10-17 提交到 agency-orchestrator `main`（`efa8839`，尚未发版）：说明文档按完整文件名匹配，跳过隐藏文件与隐藏目录，并新增安全分类与 dry-run 回归用例。7 项安装器测试与测试类型检查通过；修复版扫描本库识别 328 个角色，包含全部 12 个安全角色。

修复前，AO 收集器排除文件的正则是 `/^(README|CONTRIBUTING|LICENSE|SECURITY)/i`，会误伤全部 `security-*` 角色，且未跳过全部隐藏目录。已发布的 App / npm 包在 AO 下次发版前仍是旧行为。README 生态表中 AO 的"276 专家"待 AO 发版后再更新。

| 优先级 | 工作 | 原因与验收条件 |
|--------|------|----------------|
| P2 | 角色库独立脚本的部门、单角色、角色清单筛选与 dry-run | 上游 README 已提供这些入口；本库脚本没有。配套 agency-orchestrator 的 ao install 已有 category 与 dryRun，不应当作 App 缺失能力重复开发。先补角色内容与同步链路，再按独立脚本用户需求安排。 |
| P2 | 检查 Gemini CLI / OpenCode / Hermes 适配 | 本库 Gemini 仍为扩展、Hermes 为 skills；AO 自有 Gemini 安装器已指向 .gemini/agents。OpenCode 的本库实现实际已使用复数 agents，旧的是脚本头部说明；不能据此认定运行路径有缺陷。工具格式仍需按具体实现核查。 |
| P1 | 处理 3 个上游已不存在的本地翻译角色 | 路径层面的待译角色已全部完成；删除、改标或去重前需确认上游历史。 |
| P1 | 建立内容哈希清单，复核已有同名角色的正文差异 | 已固定 `652b269` 并完成路径级全量比对；目录存在不代表正文已同步，同名角色的正文变化仍需逐项比较。 |
| P2 | 引入 healthcare / research 部门（均已完成） | 需同步转换、安装、lint、发布目录与名单；医疗内容需明确适用语境，不能直接替换成中国法规结论。 |
| P2 | 评估 Kimi / Osaurus / Vibe / DeepSeek Harness 适配 | 上游提供入口，本地暂未支持；工具数量更多不代表能力覆盖上游，需按工具逐项对比。 |
| P2 | 评估 divisions.json / tools.json / runbooks.json | 上游已采用元数据与团队清单，本地仍有多份目录硬编码；有利于减少遗漏。 |
| P3 | 并行转换与安装 | 先保证筛选、格式兼容与可回归验证，再优化执行耗时。 |

## 已确认的路径候选

原 README 摘录的候选已在第三至十五批全部翻译完成。

### 2026-10-19 全量文件树比对（固定 commit `652b269`）

通过 GitHub API 获取上游 `652b269` 的完整文件树（未截断），逐个比对角色路径。上游 282 个角色路径中，本地缺少同路径文件的有 15 个：其中 5 个已在 UPSTREAM.md 记录为路径映射，`specialized/chief-financial-officer.md`、`specialized/specialized-chief-of-staff.md` 已迁移到本地 `company/`。真正缺失的有 8 个（此前的 README 摘录未覆盖到），已在第十六至十八批全部翻译完成。


反向比对：本地标为"翻译"的 254 个角色中，有 3 个在上游 `652b269` 中已找不到同名文件，需确认上游是否已删除或改名，再决定保留、改标原创或去重：

- `engineering/engineering-security-engineer.md`：上游提交 `8237f99`（2026-06-04，新增安全部）将其改名迁移为 `security/security-architect.md` 并重新区分职责；本地两者并存。
- `engineering/engineering-threat-detection-engineer.md`：上游同一提交 `8237f99` 将其改名迁移为 `security/security-threat-detection-engineer.md`；本地两者并存，属迁移后遗留的副本。是否删除待维护者确认。
- ~~`specialized/technical-translator-agent.md`~~：已核实为本仓库 2026-03-26 新增（提交 `729dcda`），上游从无此路径，原先误标为"翻译"，2026-10-19 已改标为"原创"。

### 2026-10-19 同名角色正文同步（`3f78a30` → `652b269`）

用 GitHub 比较接口列出上游从历史同步基线 `3f78a30` 到 `652b269` 之间改过的角色文件（433 次提交）。结果：
- 37 个只有文件属性变化、正文无改动，无需处理。
- 11 个只把标题 "Role Definition" 改为 "Identity & Role Definition"，中文标题本就另行翻译，不同步：`marketing-content-creator`、`marketing-growth-hacker`、`paid-media-*`（7 个）、`product-feedback-synthesizer`、`product-trend-researcher`。
- 30 个有实质改动，需要逐个对照中文版同步。

已同步：
- `engineering-incident-response-commander`、`engineering-technical-writer`：外层 markdown 示例改用四个反引号，避免嵌套代码块提前截断
- `game-development/technical-artist`：LOD 校验补上层级数量检查
- `marketing-private-domain-operator`：首次互动数改为按用户去重计数
- `engineering-solidity-smart-contract-engineer`：链差异列表补上 XDC

- `design-inclusive-visuals-specialist`：视频提示词改用传入的参数，并新增"保留传入身份、不推断敏感属性"的约束
- `product-behavioral-nudge-engine`：没有待办时直接返回 null
- `project-management-jira-workflow-steward`：提交钩子接受 `codex/` 分支前缀，并在去掉前缀后校验
- `engineering-rapid-prototyper`：A/B 测试 Hook 不再因内联数组每次渲染都重新分组，并拒绝空变体列表
- `engineering-prompt-engineer`：少样本示例做 XML 转义，并说明转义不能防御提示词注入
- `engineering-feishu-integration-developer`：OAuth 回调严格校验 code/state 并在首个 await 前消费 state
- `engineering-wechat-mini-program-developer`（本地原创版本）：错误响应不是 JSON 时不再抛错导致 Promise 挂起；另外为本地独有的 401 刷新分支补上失败处理
- `marketing-ai-citation-strategist`：上游只调整了标题层级，本地已整体重写为 v2，无需同步

- `engineering-backend-architect`：API 设计规范示例按上游换成独立的 OpenAPI 3.1 契约（含 info 与 OAuth2 安全方案），替换原来的 Express 代码
- `engineering-devops-automator`：CPU 告警改用 AWS/EC2 命名空间、按 Auto Scaling 组筛选、周期 300 秒，缺失数据视为未知，并补充说明
- `unreal-systems-engineer`：Nanite 支持范围改为"取决于引擎版本"；属性集示例补上头文件和 ATTRIBUTE_ACCESSORS 宏定义
- `engineering-database-optimizer`：json_agg 用 FILTER + COALESCE 处理无评论的情况；连接池地址改为解析 URL 后改端口，不再做字符串替换
- `engineering-git-workflow-master`：新建分支改用 `git switch --no-track`，工作树用法单独成段；强推限定到自己的功能分支
- `engineering-data-engineer`：Gold 层按显式日期窗口重算并用同一谓词 replaceWhere，补充说明

- `design-whimsy-injector`：动效 CSS 补上 `prefers-reduced-motion` 适配；彩蛋点击改用 `closest()` 判断区域
- `design-ux-architect`：主题管理器默认跟随系统，存储不可用时不报错，点击事件改用 `closest()` 并校验主题值。上游给交付模板换成四个反引号，本地模板的代码块本就提前收尾，没有嵌套问题，不同步
- `blender-addon-engineer`：未选中对象时取消验证；检查每个材质槽都已分配材质；导出前强制走验证；重复后缀改用正则判断
- `engineering-embedded-firmware-engineer`：创建队列和任务失败时正确处理；SPI 示例改为带超时的轮询，并说明超时后的恢复方式

- `engineering-autonomous-optimization-architect`：路由函数校验预算参数、累计已花费用、超支即停止，不再在返回结果后启动付费的影子测试；补充"扣费后才停止、并非硬上限"的说明
- `engineering-email-intelligence-engineer`：IMAP 拉取检查状态与返回结构；重建线程前拒绝缺失/重复的 Message-ID 和循环回复链；只去掉与父消息重复的引用行
- `engineering-voice-ai-integration-engineer`：ffprobe/ffmpeg 参数防止文件名被当成选项；时长与分块参数校验；分块改为重新编码为 16kHz 单声道 PCM；合并时保留说话人；SRT 时间戳按毫秒取整并拒绝零时长字幕

- `unreal-multiplayer-architect`：`_Validate()` 只拒绝不可能的输入（返回 false 会踢掉玩家），延迟导致的检查移到 `_Implementation`；GAS 示例改为 ASC 放在 PlayerState 上；网络频率改用 UE 5.5 的 setter；服务器构建脚本拆出 bat 并加 `-noclient`；预测状态类型与 RepGraph 命令名更正

- `marketing-seo-specialist`（本地为重写的 v2）：上游新增"无 GSC 时的内容蚕食排查"和 hreflang 实施模板，按 v2 结构并入对应章节。上游说"不互相指回则 Google 忽略整组"、"爬虫把 `lang` 属性当独立信号"两处与 Google 官方说明不符，改为准确表述
- `marketing-carousel-growth-engine`：发布渠道从只写 Upload-Post 改为"官方 API 或任意多平台发布服务"，追踪 ID 从 `request_id` 改为各平台帖子 ID；同时更正本地旧译文把 TikTok 写成"抖音"的错误（这些接口只发布到 TikTok）
- `marketing-agentic-search-optimizer`：WebMCP 接口按当前草案改为 `toolname`/`tooldescription` 声明式标注与 `document.modelContext.registerTool()`，删除并不存在的 `/mcp-actions.json` 发现端点，改用 `getTools()` 核对，并补充规范参考链接

**结论**：30 个有实质改动的同名角色已全部处理完毕，同步基线更新为 `652b269`。

### 2026-10-20 同步 `652b269` → `4e3ac3c`，并按代码块全量比对

上游新增 63 次提交，改动 26 个角色文件，均为示例代码与少量正文修正，已全部同步（含 `specialized/supply-chain-strategist` → 本地 `supply-chain/`）。

同步时发现 `security-appsec-engineer` 与 `security-threat-intelligence-analyst` 的代码块比上游旧得多（npm audit 的 `moderate` 级别会导致旧代码抛异常；IOC 导出未做 CSV 转义），说明部分译文早于 `3f78a30`。因此改为直接拿上游最新版逐个比对代码块里的标识符（忽略注释、字符串与 markdown 模板），这两个文件已整块重同步。

**代码块嵌套修复**：`specialized-developer-advocate` 的两个模板、`specialized-workflow-architect` 的一个模板外层只用了三个反引号，内层 ```bash/```json 会把外层提前关掉，GitHub 上显示错乱；已按上游改为四个反引号，并在 check-counts 中加入检查。

**已重同步**：`testing-performance-benchmarker`（k6 脚本：业务检查纳入阈值、token 缺失视为失败、报告不再因缺指标出错）、`testing-api-tester`（密码改从环境变量读取、SQL 注入参数 URL 编码、并发测试按单个请求统计延迟）。

**核实后不算落后**：`specialized-developer-advocate`（差异只是本地把示例字符串值译成了中文）、`specialized-mcp-builder`（本地在 `95ebeb1` 中另行扩写，代码与上游不同源）。

**初始比对候选（历史清单，当前进度见下文）**（上游代码里有、本地缺失的标识符比例由高到低）：`specialized-developer-advocate`、`testing-performance-benchmarker`、`specialized-mcp-builder`、`testing-api-tester`、`specialized-model-qa`、`unity-multiplayer-engineer`、`accounts-payable-agent`、`support-analytics-reporter`、`support-finance-tracker`、`identity-graph-operator`、`testing-test-results-analyzer`、`supply-chain-strategist`、`lsp-index-engineer`、`testing-tool-evaluator`、`support-support-responder`、`recruitment-specialist`。`marketing-private-domain-operator` 与 `engineering-wechat-mini-program-developer` 的差异来自本地另行编写的内容，不算落后。

**2026-10-20 中断任务续接**：

- `specialized-model-qa`：核对未提交的重同步改动，保留中文文档字符串；PSI 尾部分箱、常数基线与输入校验，校准检验失效条件及多输出 SHAP 说明均已补齐。6 个 Python 代码块语法检查通过；排除注释和文档字符串后，AST 与缓存上游一致。未据此宣称已运行统计依赖或完成数值验证。
- `unity-multiplayer-engineer`：补回完整的 LobbyManager 房间创建、查询与心跳示例，及 NetworkVariable 设计参考中的逐帧更新反例。新增两块除中文注释外与缓存上游一致。保留本地已翻译的其他代码；上游玩家控制器中未使用且未定义类型的 `Queue<InputPayload>` 字段未照搬。Lobby 示例注明初始化前提与生产环境仍需补齐的生命周期处理。未进行 Unity SDK 编译与联机测试。

- `accounts-payable-agent`：移除旧版特定支付插件配置与推广链接，改用上游通用 `payments` 适配器；补充金额、限额与供应商校验，汇总仅计入已完成付款并按币种分开。新增说明强调持久化幂等与未知状态下不能盲目跨通道重付。4 个 TypeScript 块语法检查通过，模拟适配器下验证非法金额、超限、未批准供应商、已付款拦截、正常发送与多币种汇总。未连接真实支付通道。

### 2026-10-21 续接：分析、财务与身份图谱

- `support-analytics-reporter`：SQL 日期统一为 PostgreSQL 写法，收入与增长比率避免整数截断与零分母；RFM 使用百分位评分以兼容相同取值与小客群；营销归因按 conversion_id 分区、按 touchpoint_id 稳定排序，双触点各分配 50%，ROI 的转化数按每行计数求和。
- `support-finance-tracker`：部门预算差异率按汇总额计算而非平均百分比；无预算基线单独标记；现金流改用自然月份、列表构建 DataFrame，累计现金包含当月净流量；正负现金流情景上下限保持顺序并注明不是统计置信区间；IRR 检查收敛状态、残差与根有效性，保留零 IRR。
- `identity-graph-operator`：补齐 math/re 导入，规则迭代器先实体化；拒绝负数、布尔值及非有限权重和非法比较分数；缺失证据保留在总权重分母中，避免少数字段匹配虚增置信度；归一化后空字段不计分。保留中文文档字符串，并注明电话字符清洗不是完整 E.164 校验。

**验证**：4 个 Python 代码块语法通过；排除文档字符串与自然语言字符串后，AST 与缓存上游一致。身份匹配的空白/缺失证据、迭代器规则、归一化、非法权重及非法分数实测通过。IRR 的失败分支及零值显示以模拟求解器验证，未运行 SciPy 数值计算。4 个 SQL 查询使用 SQLite 执行并适配 PostgreSQL 日期表达式，覆盖零基线、非整数比率、汇总预算差异、双触点多次转化收入守恒与转化数求和；不是 PostgreSQL 集成测试。本机未安装 pandas、SciPy 等依赖，RFM 和完整现金流运行尚待验证。3 个角色 lint、328 个角色计数与 diff 空白检查通过。

上述六项已完成本轮重同步，另外六项已在下节续接处理。

### 2026-10-21 续接：完成剩余六个候选

- `testing-test-results-analyzer`：覆盖率报告按嵌套 JSON 对象读取，校验所有百分比与文件映射；无测量值时报错，不凭覆盖率虚构风险等级。补上报告输入示例与项目适配器说明。
- `supply-chain-strategist`：EOQ 校验需求和成本，在连续最优值相邻的可行整数中按实际成本选最优解，避免简单四舍五入误选。其余 Python 块核对后仅有原有中文翻译差异，无需重写。
- `lsp-index-engineer`：定义查询支持 null、Location、Location[] 与 LocationLink[]；图谱符号 ID 包含文件、位置与名称，避免同名符号覆盖。导航格式示例与协议说明同步更新。
- `testing-tool-evaluator`：按实际存在的功能类别归一化权重，空需求拒绝评分；性能计时改用单调时钟，HTTP 错误计入失败惩罚与失败数；TCO 校验采用年限和用户数，并列分数使用最小排名。
- `support-support-responder`：空工单集不冒充 0% 首次解决率；趋势按自然日/月/周比较，区分稳定与证据不足，避免跨年混淆、缺期猜测及旧版 dt.week；主动外联时间比较保持时区一致。
- `recruitment-specialist`：招聘渠道成本和转化率使用有效正分母，无证据保留为空，综合排序将缺失值放在末尾；零分母返回 None，区别于有分母但转化为零。

**验证**：本批 8 个 Python 块语法通过，排除文档字符串与自然语言字符串后 AST 与缓存上游一致。标准库隔离运行覆盖率报告的有效/缺失/非法值测试；使用 NumPy 标量接口替身验证 EOQ 离散最优选择、工具评分权重归一化与 TCO 参数；招聘安全除法测试通过。LSP TypeScript 语法与模拟客户端行为通过，覆盖返回类型归一化和跨文件/不同位置同名符号唯一性。6 个角色 lint、328 个角色计数与 diff 空白检查通过。尚未执行 pandas 完整数据流、真实 HTTP 性能测试或实际语言服务器集成测试。

**状态**：初始代码差异队列已逐项核对，包含本轮重同步和此前记录的不适用项；不代表上游所有正文与所有运行环境已全面验收。四个中文精编版的补全情况见下节。

### 2026-10-21 补全四个精编版

`engineering-identity-access-engineer`、`engineering-payments-billing-engineer`、`engineering-rag-pipeline-engineer` 与 `testing-test-automation-engineer` 已补为完整中文版本，恢复全部 19 个上游代码块与原有中文验收约束，不增加角色数量。覆盖身份协议/会话/多租户隔离、支付幂等/持久收件箱/对账、RAG 切分/入库/混合检索/重排/评测，以及 Playwright 用例/认证夹具/配置/CI。

**来源验证**：缓存原文的 Git blob 与 `652b2692f8d8ec2b1f1a38e559073e287dfdc469` 树逐一匹配，且这四个文件在到 `4e3ac3ca6604c75113f52c695dbddcc7af928b46` 的比较中均未改动；来源不再只依赖 main 页面。

**本地说明与修正**：保留原精编版中的权限、恢复与验收约束；上游 RAG 示例将递归字符切分称为语义切分、将串行批次称为并行且声称固定性能倍数，中文注释与文档字符串已纠正。后置切分与 ColBERT 晚交互明确区分。补充未实现适配器、依赖版本、英文全文检索配置、授权过滤、重试计数更新和基准阈值的适用范围。WebAuthn 计数回退标为调查信号，不直接断言凭据克隆。PCI 范围表保留上游类别示例，并说明需按实际数据路径核实。

**验证**：6 个 Python 块语法通过，除中文文档字符串外 AST 与固定原文一致；TypeScript 语法通过。模拟接口验证 PKCE 参数、并发回调只交换一次、新登录不替换进行中事务的 nonce；支付业务幂等键稳定、验签拒绝、存储失败返回 503、重复接收和履约后崩溃重放；RAG 嵌入结果恢复顺序、重复索引拒绝、重排排序与阈值、重试上限。支付对账 SQL 在 SQLite 上验证平账、差额与缺少账本条目。Playwright CI 片段 YAML 解析与四分片/失败产物条件通过。模拟适配器验证不等同于真实 IdP、支付渠道、模型、pgvector 或浏览器集成测试。

**当前状态**：初始代码差异队列和四个精编版补全均已完成本轮处理；角色仍为 328 个。依赖实际服务的集成测试、全量运行验证与发布另行推进，未宣称完成。

### 2026-10-21 交付前检查

- npm 使用临时缓存执行打包预演，328 个角色均在发布文件列表内，包含 healthcare/research；未触发发布，也未改动用户 npm 缓存权限。
- AO 当前源码的角色收集与 Cursor dry-run 均识别 328 个角色，未写用户工具配置。此结果不代表已安装的旧版 App 自动更新。
- 全量转换覆盖 18 种转换格式（另 2 种工具直接读取 Markdown）。初轮输出发现 Salesforce 架构师与法国咨询市场专家采用一级章节标题，导致 OpenClaw SOUL.md 为空。两份角色新增总标题，正文标题层级统一下移，代码模板内部保持逐字不变；重新转换后，人设、沟通与规则正确进入 SOUL.md。
- 全库 lint 为 0 错误、34 个推荐章节警告。警告仍保留，未将其描述成全库零问题。
- 328 份 Codex TOML、Gemini 配置 JSON、转换产物的 4592 份 YAML frontmatter 均可解析；OpenClaw 的 SOUL/AGENTS/IDENTITY 三类文件各 328 份且非空。18 种格式各处理 328 个角色，共 5904 次角色转换。

版本号仍为 1.4.0。上述检查为本地预演，尚未提交本轮内容、推送标签、发布 npm 或重打包 AO；正式发布须单独安排版本与发布动作。

### 2026-10-22 提交后复查与真实依赖回归

上轮内容已提交为 `7c23a70`。本轮重新审查时发现 LSP 导航索引标为 JSONL，但 refs 数组跨越物理行，逐行 JSON 解析失败。现改为每行一个完整对象，并将 useState 示例 ID 统一为文件、行、列、名称编码，补充格式说明。此为针对上游示例的本地修正。

新增 `scripts/tests/test_agent_examples.py`、依赖清单与运行说明，测试直接从 Markdown 提取函数/类，不复制算法实现。14 项测试使用真实 NumPy 2.4.1、pandas 2.3.3、SciPy 1.17.1，覆盖 PSI 常数基线/尾部与非法输入、校准检验塌缩分组、RFM 小客群/同值/订单去重、自然月现金流与累计现金、真实 IRR 求解及零值保留、招聘空分母排序、客服跨年/缺期/空数据/时区和未知状态，以及 JSONL 逐行解析与符号位置一致性。现金余额、季节系数、增长系数与风险评分等应用适配器使用测试夹具；未用替身代替数值库。

测试首次执行复现 JSONL 失败，修复后 14 项全部通过。通过独立 Python 3.13 环境运行 `npm run test:examples`；默认 Python 若未安装依赖需按测试 README 建立环境。CI 新增独立示例回归任务，使用相同 Python 与依赖版本，远端任务待推送后执行。

328 个角色计数、LSP 角色 lint、328 份重新生成的 Codex TOML 解析、npm 打包范围及 diff 空白检查均通过；测试文件和依赖未进入 npm 发布包。本轮未执行真实 IdP、支付渠道、Unity 或浏览器端到端集成测试，也未更新发布版本或推送。

### 2026-10-23 准备 npm 1.5.0

相较已打标签的 1.4.0，角色数从 276 增至 328，本次按次版本发布 1.5.0。新增 `npm run check:package`：实际生成 tarball，在临时消费者目录安装，逐一比较全部 328 个角色正文与版本，检查许可证及包内是否意外包含配置文件。本地验证已通过，临时文件自动清理。

发布工作流现将 14 项真实依赖回归测试及包安装检查纳入发布前置条件，校验标签与包版本一致；Node 22 使用 npm 11 进行 OIDC Trusted Publishing，避免依赖未来不兼容的 npm 主版本。简繁 README 补充 npm 消费路径，明确包内容与 GitHub 安装脚本的区别。令牌不会写入仓库、包或发布日志。

本地 14 项测试、角色计数、安装内容核对与全库 lint（0 错误、34 个推荐章节警告）通过。线上 registry 版本和 GitHub Actions 结果尚受本会话网络限制；是否已发布必须以发布工作流和 registry 实际结果为准。
