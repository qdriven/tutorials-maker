# 实施路线图

> 续 [contracts.md](./contracts.md)。分阶段、映射到具体文件/issue，标注资源门控现实。

## 阶段总览

| Phase | 目标 | 依赖前置 | 资源门控 |
|---|---|---|---|
| **P0** 现状固化 | OpenMAIC bundled runtime boot（已修）+ 文档基线 | - | ✅ 已通 |
| **P1** Sidecar 骨架 | DeepTutor `:8001` 按需 sidecar + 健康检查 | P0 | 需开发机 |
| **P2** 数据契约 v2 | CoursePackage v2 + KB 关联 | P1 | 否（纯 TS）|
| **P3** 读路径 | DeepTutor 检索接入 OpenMAIC（provider + tool）| P1, P2 | 需开发机 |
| **P4** 写路径 | learning-bridge（quiz -> mastery）| P2, P3 | 需开发机 |
| **P5** 体验层 | Learning dashboard UI + Living Book embed | P3, P4 | 需开发机 |
| **P6** 打包 | `tauri build` 含双 runtime + 装机验证 | P1-P5 | 需干净机器 |

> **资源门控说明：** P1/P3/P4/P5 需在开发机（`D:\innate-works\...`，外部仓在 `D:\copy-modify\ai-edu\*`）实跑。P0 已于 2026-07-13 在开发机验证（boot HTTP 200）。P6 需干净机器。详见 `docs/project/index.md`。

---

## P0 现状固化 ✅

- ✅ `build-openmaic-runtime.ps1` 修复（package.json 保证 + hoist 路径 + UsePkg 隔离 + BOM）。
- ✅ OpenMAIC bundled runtime boot 验证（Next 16.1.2 Ready 775ms，`curl :3230` HTTP 200）。
- ✅ `tauri.conf.json` 移除 `externalBin`（解除 `tauri build` 阻塞）。
- 关联 issue：`edu-bundled-runtime-verify`（in_progress，装机验证待做）。

---

## P1 Sidecar 骨架

**目标：** Tauri 壳能按需起 DeepTutor FastAPI `:8001`，健康检查，5min idle 停。

**改动：**
| 文件 | 改动 | 模块 |
|---|---|---|
| `desktop/src-tauri/src/lib.rs` | 新增 `start_deeptutor_sidecar` / `ensure_deeptutor_ready` / `stop_deeptutor` / `deeptutor_status` + idle 计时器；复用 `wait_for_port` | M1 |
| `desktop/src-tauri/Cargo.toml` | 加 `reqwest`（HTTP 调用 DeepTutor）| M3/M4 |
| `desktop/src-tauri/capabilities/default.json` | sidecar/shell 权限（若用 `tauri-plugin-shell` Sidecar）| M1 |
| `desktop/src/lib/settings.ts` | 加 `deeptutorUrl`（默认 `http://127.0.0.1:8001`）+ `deeptutorProfile: "light"` | - |

**验收：**
- `ensure_deeptutor_ready()` 在 DeepTutor 未运行时自起 `:8001`，60s 内 `GET /api/v1/knowledge/list` 返回 200。
- 5 分钟无 invoke -> sidecar 停止，`deeptutor_status().running == false`。
- DeepTutor 轻量 profile：仅 `deeptutor[cli,server]`，不加载 partners/multi_user；RAM <= 200MB（空闲）。

**资源门控：** 需开发机 + DeepTutor 仓 + Python 3.11+ 环境（`pip install -e deeptutor[cli,server]`）。

---

## P2 数据契约 v2

**目标：** CoursePackage v2 schema + 校验器 + KB 关联回写。**纯 TS，无环境门控。**

**改动：**
| 文件 | 改动 | 模块 |
|---|---|---|
| `desktop/src/lib/course-manifest.ts` | `schemaVersion: 1\|2`；`meta.deeptutorKbId?`；`learningConfig?`；`scene.deeptutorConcepts?`；`CoursePackage.concepts?`；扩 `validateCoursePackage`（v1/v2 兼容）| M5 |
| `desktop/src/lib/sample-course.ts` | 样例课加 v2 字段示范 | M5 |
| `desktop/src/lib/course-io.ts` | 导入 v2 包时校验 deeptutorKbId 一致性 | M5 |
| `docs/project/spec/contracts/course-manifest.md` | 同步 v2 契约文档 | - |

**验收：** `bun run typecheck` clean；v1 包仍通过校验；v2 样例包过校验。

---

## P3 读路径（检索接入）

**目标：** OpenMAIC 生成期 + 运行时能检索 DeepTutor KB。

**改动：**
| 文件 | 改动 | 模块 |
|---|---|---|
| `DeepTutor/deeptutor/api/routers/knowledge.py` | 新增 `POST /{kb}/search` 薄路由包 `RAGService.search()` | M10 |
| `OpenMAIC/app/api/deeptutor/[...path]/route.ts` | 新增 catch-all 代理 -> `:8001`（带 SSRF guard）| M4 |
| `OpenMAIC/lib/web-search/index.ts` | 加 `deeptutor` provider + `searchWithDeepTutor` | M6 |
| `OpenMAIC/lib/agent/tools/query-knowledge-base.ts` | 新增 tool | M7 |
| `OpenMAIC/lib/agent/tools/registry.ts` | `V0_ALLOWLIST` 加 `query_knowledge_base` | M7 |
| `OpenMAIC/lib/orchestration/tool-schemas.ts` + `prompt-builder.ts` | LangGraph chat path 注入检索（预取）| M7 |

**验收：**
- OpenMAIC 生成期切 `deeptutor` provider，outline 含 KB 检索片段。
- editor agent 工具栏出现 `query_knowledge_base`，调用返回 KB 内容。
- DeepTutor `/api/v1/knowledge/{kb}/search` 返回 `{query, answer, content, sources, provider}`。

**资源门控：** 需开发机 + 两个仓 + 一个 LLM API key（生成期）+ 一个 embedding API key。

---

## P4 写路径（learning-bridge）

**目标：** OpenMAIC quiz 结果回写 DeepTutor mastery；mastery 反向注入。

**改动：**
| 文件 | 改动 | 模块 |
|---|---|---|
| `desktop/src-tauri/src/lib.rs` | `record_quiz_attempt` / `get_mastery_state` / `get_learner_memory`（reqwest 调 DeepTutor）| M3 |
| `OpenMAIC/lib/learning/event-emitter.ts` | 新增 `emitQuizAttempt` / `emitSceneView`（`__TAURI__.invoke` 或 fetch 代理）| M8 |
| `OpenMAIC/lib/quiz/grading.ts` | 选择题判分后调 `emitQuizAttempt` | M8 |
| `OpenMAIC/app/api/quiz-grade/route.ts` | 简答判分后调 `emitQuizAttempt`（或改走 DeepTutor `/question/judge`）| M8 |
| `OpenMAIC/lib/playback/engine.ts` | 场景切换/课堂结束 hook `emitSceneView` | M8 |
| `OpenMAIC/lib/pbl/v2/operations/proficiency.ts` | 接受 DeepTutor mastery 作为 `ProficiencySignal`（`deeptutor_mastery` kind）| M7/F |

**验收：**
- 课堂完成 quiz -> DeepTutor `LearningService.grade_and_record` 记录 -> `/learning/progress/{book_id}` 可查。
- 重复 attempt 幂等（`attempt_id` 去重）。
- DeepTutor mastery 变化 -> OpenMAIC PBL proficiency 信号注入（PBL 场景内难度调整）。

**资源门控：** 需开发机 + DeepTutor sidecar 跑通。

---

## P5 体验层

**目标：** Learning dashboard UI + Living Book embed。

**改动：**
| 文件 | 改动 | 模块 |
|---|---|---|
| `desktop/src/App.tsx` | Baselines 模块 -> Learning 模块 | M11 |
| `desktop/src/components/learning-dashboard.tsx` | 新增：mastery 看板 + review queue + sidecar 状态 | M11 |
| `desktop/src/components/courses/courses-view.tsx` | PDF 上传触发双通道（M2 course-bus）+ 双进度 | M2/M11 |
| `OpenMAIC` 配一个 `InteractiveContent` 场景指向 DeepTutor book URL | M9 |
| `DeepTutor/web` next.config | `ALLOWED_FRAME_ANCESTORS` 放行 `http://127.0.0.1:3230` | M9 |

**验收：**
- Learning 模块显示当前课程 mastery 地图 + next step + review queue。
- 课堂"深入了解"场景嵌入 DeepTutor Living Book（iframe 可交互）。
- sidecar 状态指示器实时反映 running/idle/stopped。

**资源门控：** 需开发机。

---

## P6 打包

**目标：** `tauri build` 产出含双 runtime 的安装包，干净机器免配置进课堂 + 按需 DeepTutor。

**改动/任务：**
| 任务 | 说明 |
|---|---|
| `build-openmaic-runtime.ps1` | 已修（P0）；保持 |
| `build-deeptutor-sidecar.ps1`（新）| 产 DeepTutor 轻量 wheel + venv + 启动器，放 `resources/deeptutor-sidecar/` |
| `desktop/src-tauri/tauri.conf.json` | `resources` 加 `resources/deeptutor-sidecar` |
| `desktop/src-tauri/src/lib.rs` | `start_deeptutor_sidecar` 改用 bundled venv 的 `python -m uvicorn` |
| **免 Node/免 Python 决策** | OpenMAIC 仍需 Node（或内置 node.exe）；DeepTutor 需 Python（bundled venv）|
| 装机验证 | 干净机器：开应用 -> 自动进课堂（OpenMAIC）-> 触发 DeepTutor -> mastery 回写 |

**资源门控：** 需干净 Windows 机器。这是 `edu-bundled-runtime-verify` 的装机验证 + 新增 DeepTutor 打包。

---

## 风险与缓解

| 风险 | 影响 | 缓解 |
|---|---|---|
| DeepTutor API 变更（1.5 -> 1.6）| 契约断裂 | 锁版本 + 契约测试（`/knowledge/{kb}/search` + `/learning/*`）|
| OpenMAIC 升级改 registry 接口 | provider/tool 失效 | 走既有扩展点；升级时只验 `WebSearchProviderId` + `AgentTool` 接口 |
| DeepTutor Python 依赖与 Tauri 打包冲突 | 装机体积/复杂度 | bundled venv 隔离（P6）；轻量 extras 砍 partners/matrix |
| 课堂播放性能（双 runtime）| 卡顿 | OpenMAIC 常驻、DeepTutor 按需；不同时峰值 |
| 学习数据分裂（IndexedDB vs SQLite）| 不一致 | **DeepTutor 为真相源**；OpenMAIC IndexedDB 仅 UI 缓存；M3 单写路径 |
| mastery 映射不准（concept 映射）| 自适应失准 | `scene.deeptutorConcepts` 在生成期由 LLM 标注 + 人工校验 |
| 双 runtime 资源超 8GB | 个人机卡 | 三级降级（resource-analysis.md）：L2 标准按需 DeepTutor；L3 极简不启 DeepTutor |
| MCP 误用 | 浪费工时 | 明确 DeepTutor 是 MCP client-only；不走 MCP（[architecture.md](./architecture.md) §5）|

---

## 与既有 issue 的映射

| 本路线 Phase | 对应既有 issue | 状态 |
|---|---|---|
| P0 | `edu-bundled-runtime-verify` | in_progress（boot 通，装机待做）|
| P1 | `edu-deeptutor-hook`（升级）| in_progress（CLI hook -> sidecar）|
| P2 | `edu-course-manifest`（v2 扩展）| done（v1），v2 待开 |
| P2 | `edu-course-import-export` | done（v1）|
| P3-P5 | 新 issue（待开）| - |
| P6 | `edu-bundled-runtime-verify` + 新 `edu-deeptutor-sidecar-bundle` | - |

> 新 issue 建议在 `docs/project/issues/` 开：`edu-deeptutor-sidecar`、`edu-course-manifest-v2`、`edu-learning-bridge`、`edu-knowledge-provider`、`edu-living-book-embed`、`edu-learning-dashboard`。

---

## 一句话

**P0 已通；P2（纯 TS 契约）可立即做；P1/P3/P4/P5 需开发机实跑；P6 需干净机器。务实路径：先 P2 扩契约，再 P1 起 sidecar，P3 读路径验证检索，P4 写路径打通 mastery，最后 P5/P6 收口。**
