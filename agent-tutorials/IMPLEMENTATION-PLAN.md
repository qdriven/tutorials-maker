# Hello-Agents Playground · 实施总计划（v1.0 定稿）

> 本文是唯一执行基准，整合并锁定至今全部决策：POC（7 视图）已验证产品形态，Zen Terminal 设计系统已采纳，
> 十源素材已入库。后续工作按本计划的 Sprint 1→6 推进，每个 Sprint 有明确验收门。
> 上游文档：`PLAN.md`（方案与架构）、`DESIGN-REVIEW.md`（设计审查）、`references/README.md`（素材库）、
> `design-system/ha-playground/MASTER.md`（设计 token 权威）。

---

## 0. 已锁定决策（ADR · 不再摇摆）

| # | 决策 | 结论 | 依据 |
|---|---|---|---|
| D1 | 受众 | 双受众分层：🧰 工具线（小白零代码）/ 🔍 原理线 / 🛠 构建线（开发者）/ 🚀 应用线；节点打受众标签 | 用户确认"不全是小白，也有开发者" |
| D2 | 产品形态 | 全局层（路线图/案例/词典）+ 课层「一课三段式」（Slides→Playground→Notebook）+ AI Hero 式微课层 | POC 7 视图验证通过 |
| D3 | 内容主线 | hello-agents 16 章主线 + CS329Z 增量专题（评测/数据/安全/编程Agent/主动式Agent） | PLAN §3.5 映射表 |
| D4 | 执行双轨 | 重依赖走方案三沙箱（FastAPI+Docker+SSE）；纯 Python 练习走方案四（Pyodide 浏览器内核） | 架构互补，POC 已验证渲染契约 |
| D5 | 事件协议 | 终端/循环图是 SSE 事件流的**纯渲染器**：`run_start/phase/thought/action/observation/answer/run_end`；POC 模拟脚本与真实沙箱共用契约 | POC 已实现 |
| D6 | 设计系统 | **Option A · Zen Terminal 演进**：zinc 亮色基底 + 双 accent（翡翠=Agent 态 / 紫=学习态）+ Inter/JetBrains Mono；亮暗双主题为第二迭代 | 用户选定，MASTER.md 已固化 |
| D7 | 技术栈（正式版） | 前端 **Vite + React 18 + TypeScript + Tailwind**（zen tokens 走 CSS variables）；动效 Framer Motion + CSS keyframes；编辑器 **Monaco**；Notebook **Pyodide**（内嵌 iframe JupyterLite 备选）；执行服务 **FastAPI + Docker**（E2B 备选）；进度存储 SQLite（登录后置） | POC 原生实现验证交互后升级工程化 |
| D8 | LLM 接入 | 前端零 Key：代理层持 Key；支持 **BYOK**（用户 Key 存 localStorage 透传，放宽配额） | 安全 + 成本可控 |
| D9 | 合规 | 页脚署名 datawhalechina/hello-agents（CC BY-NC-SA）+ 各源许可矩阵（见 references/README）；aiolaola/agentway 快照不部署不摘抄 | 许可矩阵已建 |
| D10 | 语种 | 中文为主（素材天然中文），界面文案中文；不做 i18n（v1） | 素材现实 |
| D11 | **画像驱动差异化路径** | 首访 30 秒 onboarding（4 画像：职场效率族 / 潜力新手 / 纯工具用户 / 输出导向）→ localStorage 持久化 → 个性化 = **roadmap 重排+阶段隐藏** + 默认选线 + 案例预设过滤 + 英雄任务入口；Header 常驻画像 chip 随时切换；底层课程资产复用不复制 | POC 已实现并验证 |

## 1. 信息架构与路由表（最终版）

```
#/                          → 重定向 #/roadmap
#/roadmap                   路线图（默认落地）：7 阶段 × 4 选线 × 节点卡片
#/lesson/:chapter/:n        AI Hero 式微课（播放器+讲稿+代码+练习判分）
#/slides/:chapter           动画讲解（每章 5–8 页）
#/playground/:chapter/:demo 互动 Playground（Monaco + 事件流回放/直播）
#/lab/:chapter/:nb          Notebook 实验（Pyodide 关卡）
#/usecases                  案例库（场景 × 职业双维过滤）
#/dictionary                术语词典（搜索 + 分类）
#/insights                  洞察（v1.5，产品事件/前沿解读）
#/about                     署名 / 许可 / 素材来源（合规页，必须）
```

页面级设计覆盖放 `design-system/ha-playground/pages/<page>.md`（优先于 MASTER）。

## 2. 正式工程目录结构

```
hello-agents-playground/
├── app/                        # 前端（Sprint 1 创建）
│   ├── src/
│   │   ├── routes/             # 7 视图路由组件
│   │   ├── components/         # Shell / SlideDeck / LoopDiagram / Terminal /
│   │   │                       # LessonPlayer / QuizCard / CaseCard / TermCard …
│   │   ├── lib/                # eventRenderer.ts（事件流→UI，与 POC 同契约）
│   │   │                       # pyodide.ts / sse.ts / progress.ts / router.ts
│   │   ├── content/            # 管线产物 JSON（构建期导入）
│   │   └── styles/             # tokens.css（MASTER 落地）+ base.css
│   └── index.html
├── pipeline/                   # 内容管线（Node/TS，Sprint 2 创建）
│   ├── adapters/               # 每源一个适配器（见 §3）
│   ├── schemas/                # zod：slide / lesson / case / term / lab-step
│   ├── llm/                    # 压缩 prompt + 审校清单
│   └── build.ts                # 校验 → 产物写入 app/src/content/
├── server/                     # 方案三执行服务（Sprint 4 创建）
│   ├── main.py                 # FastAPI：/runs + /runs/{id}/events(SSE) + /quota
│   ├── sandbox/                # docker runner：per-run 容器（mem 512m / net off / 60s 超时）
│   ├── llm_proxy.py            # 持 Key 代理 + BYOK 透传
│   └── Dockerfile.sandbox      # 预装 hello_agents + 常用依赖镜像
└── references/                 # 素材库（已就绪，只读）
```

## 3. 内容管线规范（每源一个适配器）

**通用四步**：`解析(parse) → 压缩(distill) → 校验(validate) → 产出(emit JSON)`。zod schema 校验失败即构建失败（质量门）。

| 适配器 | 输入 | 产物 | 特殊处理 |
|---|---|---|---|
| `hello-agents.ts` | `references/hello-agents/docs/chapter*/`*.md | slides.json / lesson.json / playground.json / terms.json | remark 解析 → 规则抽取代码块与概念 → **LLM 压缩长文为 slide 页**（prompt：每页≤40 字要点+图示类型标注）→ 人工审校 YAML → 定稿 |
| `cs329z.ts` | 19 讲 md | topics.json（专题）+ 术语补充 | 只取 L10-15/17-18 做专题页；其余做讲法对照（人工） |
| `doubao-work.ts` | site-content.json（58 节飞书树） | lessons/tool-t1.json | **JSON→md 展平脚本**（parentToken 树 → 章节列表，~50 行）→ 同 hello-agents 压缩流程 |
| `workbuddy-guide.ts` | docs/bluebook md | lessons/tool-t3.json | 直接 md 流程 |
| `nami-agent.ts` | lessons/lesson-01…11 代码快照 | lab/ch7-steps.json（**关卡式 Notebook**） | 每课快照 → 一个关卡：`说明 cell + 代码骨架 cell(# TODO) + 测试 cell(假模型断言)`；相邻课 diff 作为"上一关答案" |
| `agentusecases.ts` | markdown/use-case/*.md（1,910） | cases.json | front matter 已结构化；筛选规则：场景覆盖 + 原理可映射 + 质量分（How it went 含结果信号）；首批 100 例 |
| `awesome-workbuddy.ts` | README.zh-CN.md / usecases.md | cases-wb.json（职业维度） | 30 职业 → 「按职业」过滤维度数据 |
| `agency-agents.ts` | AGENT-LIST/CATALOG | roles.json（职业-角色索引） | 案例卡「这个岗位还能怎么用 Agent」推荐数据 |

**关卡 Notebook 格式（lab-step schema）**：
```jsonc
{ "id":"ch7-l03", "title":"给循环加上工具注册表", "basedOn":"nami-agent/lesson-03",
  "brief":"…", "skeleton":"# TODO\n…", "test":"from fake_llm import …\nassert …",
  "hint":["…"], "next":"ch7-l04" }
```
测试在 Pyodide 内运行（假模型断言，零 Key，与 NamiAgent 同哲学）。

## 4. 执行服务（方案三）关键规格

- `POST /runs` `{chapter, demo, code?, byok?}` → `{run_id}`；`GET /runs/{id}/events` → SSE（事件协议见 PLAN §4，与 POC 渲染器零改动对接）
- 沙箱：`docker run --rm --memory=512m --cpus=1 --network=none --pids-limit=64` + 60s 强杀；镜像预装 `hello_agents/openai/pydantic`
- LLM 代理：默认走平台 Key（计费到配额）；`byok` 请求头携带用户 Key 直接透传
- 配额：匿名 10 runs/天/IP；BYOK 用户 100 runs/天；超限 429 + 升级提示
- 事件采集：沙箱内 wrapper 把 agent 的 thought/tool/obs 打包为 JSON 行 → 网关转 SSE

## 5. Sprint 计划（6 个 Sprint，每项有验收门）

### Sprint 1 · 工程化地基（第 1–2 周）
Vite+React+TS 工程 → tokens.css（MASTER 落地）→ Shell（Header/Tabs/Footer/skip-link）→ 7 视图路由迁移（先静态内容直搬 POC）→ Lucide 图标体系 → hash 路由。
**验收门**：7 视图全迁移；Lighthouse a11y ≥90；375/768/1280 三档无溢出；`npm run build` 产物 <300KB(gz)。

### Sprint 2 · 内容管线 v1 + 首批章节（第 2–3 周）
pipeline 工程 + `hello-agents.ts` + zod schemas + LLM 压缩 prompt → **第 1–4 章** slides/lesson 数据上线（POC 文案替换为管线产物）→ 人工审校流程文档化。
**验收门**：4 章产物 schema 100% 通过；每章 slides ≤8 页且审校签字；管线可重复构建（idempotent）。

### Sprint 3 · 方案四 Notebook 关卡（第 3–4 周）
Pyodide 集成（加载器/状态机/流式 stdout）→ `nami-agent.ts` 适配器 → **第 7 章 11 关**上线（免 Key）→ 进度系统（localStorage → 结构化 progress.ts，预留登录同步接口）。
**验收门**：11 关全部可运行+测试通过；关卡完成率埋点；断网时 Pyodide 缓存命中（SW 缓存）。

### Sprint 4 · 方案三沙箱 + 真实 LLM（第 5–6 周）
server/ 全套（FastAPI+Docker runner+LLM 代理+SSE+配额）→ 第 4 章 Playground 切换"模拟/真实"双模式 → 第 6/8 章 Playground 数据。
**验收门**：真实 LLM 跑通天气 demo（SSE 事件与 POC 渲染器零改动对接）；压测 20 并发；滥用防护生效；成本仪表（token 计量）。

### Sprint 5 · 案例库 + 词典批量扩充（第 7 周）
三个案例适配器批量导入（首批 100 例）→ 「按职业」维度（awesome-workbuddy 30 职业 + agency-agents 角色）→ 词典扩至 40+ 术语（管线自动抽取+审校）→ 词典/案例互链。
**验收门**：案例 ≥100 且五要素齐全率 100%；双维过滤交互；抽查 20 例无失真。

### Sprint 6 · 双主题 + 打磨 + 发布（第 8 周）
暗色主题（B 方案 token 组，成对校准对比度）→ 性能（路由 code-split、字体 swap、Pyodide SW 缓存）→ 部署（静态 + server 双端）→ `#/about` 合规页（署名/许可/素材来源）→ 上线。
**验收门**：Lighthouse 四项 ≥90；亮暗双主题对比全检；合规页法务走查；真实用户 smoke test。

## 6. 人力 / 成本 / 风险

- **人力**：全栈 1 名（Sprint 1-3 可独立完成）+ 内容审校 0.2 + 设计抽查；Sprint 4 建议加 1 名后端
- **成本**：静态托管 ≈0；server 单机 4C8G ≈¥200-400/月；LLM token 走 BYOK 为主，平台配额做引流试用
- **Top 风险**：① LLM 压缩质量不稳定 → schema 硬校验 + 人工审校门；② 沙箱安全 → 网络隔离+资源上限+超时强杀，敏感操作不放沙箱；③ 素材许可 → 每张卡带来源链接，NC 源只做结构参考
- **回滚策略**：每 Sprint 产出可独立上线（管线产物 JSON 版本化，前端按版本读取）

## 7. 遗留待决（不阻塞开工）

1. Insights 区排期（建议 v1.5，数据源已备：CS329Z L19 + 产品事件）
2. 登录体系（建议 v1 不做，进度 localStorage + 导出 JSON；v2 用飞书/微信扫码）
3. 域名与部署位置（Cloudflare Pages 建议，server 放国内单机或轻量云）

---

### 立即开工项（Sprint 1 第一个 PR）
1. `npm create vite@latest app -- --template react-ts` + Tailwind
2. `tokens.css`：MASTER.md → CSS variables（含双 accent 与 strong 变体）
3. Shell 三件套（Header tabs 图标化 / Footer 署名 / skip-link）+ react-router hash 模式
4. 7 视图空壳 + POC 内容直搬（保持 localStorage 键名兼容）
