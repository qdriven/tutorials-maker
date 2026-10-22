# OpenMAIC × DeepTutor 融合与个人部署可行性分析

**项目：** AI Edu Tutorials  
**日期：** 2026-07-13  
**文档性质：** 产品架构与部署决策研究  
**适用范围：** 个人学习者、家庭多终端、小型学习小组；不覆盖大规模学校集群

---

## 0. 结论先行

### 0.1 产品结论

当前项目最合理的定位不是把两个完整产品并排放进桌面壳，而是：

- **OpenMAIC = 互动课堂与教学舞台**：负责多角色授课、场景播放、白板、语音、测验和 PBL；
- **DeepTutor = 知识与个性化学习引擎**：负责知识库、RAG、误区诊断、深度解题、学习记忆和动态掌握度；
- **AI Edu Tutorials = 课程操作系统与协调层**：负责课程包、运行时调度、课堂事件、学习进度和两套系统间的数据契约。

学生主要停留在 OpenMAIC 课堂中；DeepTutor 默认在后台工作，通过 Teacher、TA 或 Peer 角色表达教学干预。只有在“深入学习”时，才显式打开 DeepTutor 辅导抽屉。

### 0.2 硬件结论

**对普通个人电脑是否苛刻，取决于是否要求本地运行模型，而不是取决于 OpenMAIC + DeepTutor 这两个应用框架本身。**

- **云端模型 API + 本地课堂/知识库：不苛刻。** 16 GB 内存、SSD、无独立显卡的普通电脑可作为推荐起点；8 GB 可作为受限模式目标，但必须关闭本地模型、重型 OCR、动画生成和多服务常驻，并通过实测确认。
- **本地知识库/RAG，但 LLM 仍走 API：中等要求。** 主要压力来自文档解析、嵌入、索引构建和磁盘 I/O，推荐 32 GB 内存和 NVMe SSD，GPU 不是硬性要求。
- **本地 7B 级量化模型：要求明显升高。** 推荐从 32 GB 系统内存、12 GB 显存和 1 TB SSD 起步，仅面向单用户、中等上下文；长上下文和并发会继续增加内存/显存，不能把“模型能装入”误认为“课堂体验流畅”。
- **本地多模型、多媒体和家庭并发：苛刻。** 若同时本地运行 LLM、embedding、TTS、ASR、图像/视频生成，建议独立 24 GB 显存推理节点，而不是让普通笔记本或普通 NAS 承担。

### 0.3 部署结论

个人用户的默认方案应是**混合部署**：

```text
个人电脑
├── Tauri 桌面壳
├── OpenMAIC 课堂运行时
├── 本地课程包与进度
└── 可选的轻量 DeepTutor adapter
          │
          ├── 本地/家庭服务器：文档、KB、索引、记忆
          └── 云端模型 API：LLM / 高级多模态
```

这样既避免把所有学习资料长期上传到云端，也不要求个人购买高端 GPU。

### 0.4 关于懒猫微服一类家庭私有云

这类设备**适合作为家庭知识中枢、课程文件库、DeepTutor 服务节点、API 网关、缓存和备份节点**；普通无独显机型不应被假定为大模型推理服务器。

懒猫官网当前将“懒猫微服 AI 数据中心”和带有 64 GB 显存、275T 算力描述的“懒猫 AI 算力舱”列为不同产品。不能把算力舱规格自动套用到普通微服/NAS 产品上。普通设备是否适合本地 LLM，必须按具体 CPU、内存、GPU/NPU、散热和实测吞吐判断。

---

## 1. 当前项目：已经连接，但尚未形成闭环

当前仓库已经具备三项关键基础：

1. OpenMAIC 已通过 Tauri 子 WebView 嵌入课堂，见 `desktop/src/components/classroom-embed.tsx:48`；
2. 课程已有统一的 `CoursePackage` 契约，见 `desktop/src/lib/course-manifest.ts:9` 和 `docs/project/spec/contracts/course-manifest.md:13`；
3. DeepTutor 已有 Tauri → Rust → CLI 的最小问答 hook，见 `desktop/src-tauri/src/lib.rs:210` 和 `desktop/src/components/deeptutor-panel.tsx:16`。

但它们目前仍是并列关系：

```text
侧栏
├── OpenMAIC Runtime
├── Courses
└── Baselines / DeepTutor Panel
```

缺失的关键连接包括：

- `CoursePackage` 尚未稳定映射为 OpenMAIC 可播放课堂；
- 课程尚未绑定 DeepTutor KB；
- DeepTutor 不知道当前 `courseId`、`sceneId`、题目和最近课堂对话；
- OpenMAIC 没有向协调层发出统一的课堂/测验事件；
- DeepTutor 的诊断结果无法驱动 OpenMAIC 的 Teacher、TA、Peer 或补救场景；
- 课程静态 `mastery[]` 与 DeepTutor 动态学习路径之间尚无映射。

因此，接下来的核心不是新增更多独立页面，而是实现 **Classroom Intelligence Bridge**。

---

## 2. 目标产品架构

```text
┌───────────────────────────────────────────────────────────────┐
│ AI Edu Tutorials / Tauri                                     │
│                                                               │
│ Course Orchestrator                                           │
│ ├── CoursePackage / CourseProgress                            │
│ ├── OpenMaicAdapter                                           │
│ ├── DeepTutorAdapter                                          │
│ └── Classroom Event Bus                                       │
└───────────────┬──────────────────────────────┬────────────────┘
                │                              │
      classroom commands/events       tutor requests/events
                │                              │
┌───────────────▼──────────────┐  ┌────────────▼─────────────────┐
│ OpenMAIC                    │  │ DeepTutor                    │
│ 课堂生成、角色、播放、白板   │  │ KB、RAG、诊断、记忆、mastery │
│ Quiz、PBL、TTS/ASR          │  │ solve、question、research    │
└───────────────┬──────────────┘  └────────────┬─────────────────┘
                │                              │
                └─────────结构化教学干预────────┘
```

### 2.1 职责边界

| 能力 | 主责系统 | 协作系统 |
|---|---|---|
| 多角色授课与课堂节奏 | OpenMAIC | DeepTutor 提供个性化上下文 |
| Slide/白板/互动/PBL | OpenMAIC | DeepTutor 可生成素材或解释 |
| PDF 生成课堂 | OpenMAIC | 协调层建立内容引用 |
| 文档知识库与 RAG | DeepTutor | OpenMAIC 发起场景化请求 |
| 误区诊断与深度解题 | DeepTutor | OpenMAIC 角色表达结果 |
| Quiz 播放与课堂反馈 | OpenMAIC | DeepTutor 诊断知识点 |
| 静态课程通过条件 | CoursePackage | DeepTutor 提供动态状态 |
| 动态掌握度/学习路径 | DeepTutor | 协调层保存课程投影 |
| 课程导入导出 | AI Edu Tutorials | 两个运行时只消费所需字段 |
| 用户文件、设置、进度 | AI Edu Tutorials | DeepTutor 维护知识与学习状态 |

### 2.2 不应该合并的对象

以下对象有关联，但不能直接视为同一对象：

```text
Course Role          课程设计中的 Teacher / TA / Peer
OpenMAIC Role        课堂中实际发言和执行动作的角色
DeepTutor Persona    辅导语气、策略和解释风格
DeepTutor Partner    具有独立会话、记忆和工具的长期 Agent
```

应该通过稳定 ID 显式映射，避免 persona、会话和学习记忆出现多个真源。

---

## 3. 三个核心教学闭环

### 3.1 备课与内容生产闭环

```text
PDF / 教材 / 教师资料
       │
       ├── OpenMAIC：生成 scenes、课堂动作、角色和可播放 Stage
       │
       ├── DeepTutor：建立 KB、来源引用、概念与前置知识
       │
       └── AI Edu Tutorials：生成和校验 CoursePackage
```

建议：

- DeepTutor 是知识、证据和概念关系来源；
- `CoursePackage` 是可导入导出的课程结构真源；
- OpenMAIC Stage 是课堂运行时产物；
- 三者通过稳定引用关联，不复制彼此的内部数据库结构。

DeepTutor 可增强 Course Composer：

- 从 PDF 提取概念、前置知识和常见误区；
- 为 Scene 建议 `conceptIds`；
- 生成 choice/open/task 题目；
- 生成 reference answer、rubric 和 grading notes；
- 检查 Quiz 是否覆盖 mastery checkpoint；
- 生成图表、概念图或数学动画素材。

### 3.2 课堂内实时辅导闭环

```text
学生提问或答错
      ↓
OpenMAIC 发出 ClassroomEvent
      ↓
协调层补充 course / scene / quiz / history / KB 上下文
      ↓
DeepTutor 诊断并返回结构化 TutorIntervention
      ↓
OpenMAIC Teacher / TA / Peer 表达干预
      ↓
继续、重试、插入补救场景或提高难度
```

DeepTutor 大多数时候不应以第二个聊天机器人直接面对学生。推荐模式是：

> DeepTutor 负责“判断与生成”，OpenMAIC 角色负责“课堂表达”。

只有学生主动进入“深入学习”时，才显示独立 DeepTutor 抽屉，用于长推导、来源查阅、深度解题和扩展练习。

### 3.3 Quiz 与动态掌握度闭环

```text
quiz.submitted
      ↓
保存 QuizAttempt
      ↓
DeepTutor 分析答案、误区和知识点
      ↓
更新动态 mastery / learning path
      ↓
Course Orchestrator 评估 CoursePackage checkpoint
      ↓
OpenMAIC advance / retry / remedial / challenge
```

静态与动态状态的建议分工：

- `CoursePackage.mastery[]`：课程发布者定义的静态通过条件；
- DeepTutor mastery：学习者在知识点、模块和时间维度上的动态状态；
- `CourseProgress.masterySnapshot`：当前项目保存的可展示、可同步投影。

---

## 4. 建议的数据契约

### 4.1 课程智能绑定

不应把 DeepTutor 内部索引目录、数据库记录或 OpenMAIC 内部 Stage 状态直接塞进 `CoursePackage`。建议只保存稳定绑定：

```ts
type CourseIntelligenceBinding = {
  knowledge?: {
    provider: "deeptutor"
    knowledgeBaseId: string
    sourceDocumentIds?: string[]
  }

  runtime?: {
    provider: "openmaic"
    classroomId?: string
    stageId?: string
  }

  scenes?: Array<{
    sceneId: string
    conceptIds: string[]
    sourceRefs?: string[]
    tutorCapability?: "chat" | "deep_solve" | "mastery_path"
    interventionPolicy?: {
      triggerAfterWrongAttempts?: number
      allowDeepDive?: boolean
      allowRemedialScene?: boolean
    }
  }>

  roleBindings?: Array<{
    courseRoleId: string
    openmaicRoleId?: string
    deeptutorPersonaId?: string
    deeptutorPartnerId?: string
  }>
}
```

### 4.2 课堂事件

```ts
type ClassroomEvent =
  | { type: "scene.started"; sceneId: string }
  | { type: "scene.completed"; sceneId: string }
  | { type: "learner.message"; sceneId: string; text: string }
  | { type: "hint.requested"; sceneId: string }
  | { type: "quiz.submitted"; quizId: string; answers: unknown }
  | { type: "role.responded"; roleId: string; text: string }
  | { type: "classroom.completed"; courseId: string }
```

### 4.3 DeepTutor 请求与流式事件

当前 Rust hook 使用一次性 CLI stdout，适合 baseline，不适合长任务、引用和可取消交互。建议逐步升级为统一 adapter：

```ts
type TutorRequest = {
  capability: string
  sessionId?: string
  message: string
  knowledgeBaseIds?: string[]
  attachments?: TutorAttachment[]
  courseContext?: {
    courseId: string
    sceneId?: string
    roleId?: string
    conceptIds?: string[]
  }
}

type TutorEvent =
  | { type: "stage"; stage: string; status: string }
  | { type: "text_delta"; text: string }
  | { type: "tool"; name: string }
  | { type: "sources"; sources: TutorSource[] }
  | { type: "pending_user_input"; payload: unknown }
  | { type: "result"; payload: unknown }
  | { type: "error"; message: string }
  | { type: "done" }
```

长期优先使用 DeepTutor WebSocket/API；CLI `--format json` 可作为过渡方案。

---

## 5. 硬件压力究竟来自哪里

OpenMAIC 官方仓库要求 Node.js 20+、pnpm 10+，但没有公布 CPU、RAM 或 GPU 最低配置。DeepTutor 官方仓库要求 Python 3.11+，源码/前端路径还涉及 Node.js 20/22，但同样没有公布 CPU、RAM 或 GPU 最低配置。因此，下表必须理解为**工程判断与待实测起点，不是两个上游项目的官方最低配置**。

| 工作负载 | 主要瓶颈 | GPU 是否必要 | 个人设备影响 |
|---|---|---:|---|
| Tauri + OpenMAIC 播放 | WebView、Node、Canvas、音频、资源解码 | 否 | 普通电脑可承担 |
| OpenMAIC 多 Agent 生成（模型走 API） | 网络、模型响应、前端状态编排 | 否 | 本地压力有限，受网络和 API 影响 |
| DeepTutor API/CLI 编排 | Python 启动、会话、工具调度 | 否 | 可按需启动，不必常驻完整前端 |
| 本地文档解析 | CPU、内存、临时文件、OCR | 通常否 | 大 PDF、扫描件和公式会形成峰值 |
| 本地 embedding / FAISS / BM25 | CPU、内存、磁盘 I/O | 可选 | 首次索引比查询更重 |
| 本地 GraphRAG/LightRAG | 图谱构建、LLM 调用、索引空间 | 可选但有帮助 | 不适合默认随桌面应用启动 |
| 本地 LLM | 模型权重、KV cache、上下文和并发 | 强烈建议 | 最大硬件瓶颈 |
| 本地 TTS/ASR | 模型与音频实时性 | 视模型而定 | 可用浏览器或云 API 降级 |
| Manim/视频/图像生成 | CPU/GPU、FFmpeg、磁盘 | 视能力而定 | 应作为后台任务或远程能力 |

### 5.1 为什么不能只看“模型文件大小”

Ollama 官方 FAQ 明确说明：

- 单模型并行请求会按并行数放大 context 占用；
- RAM 会随 `OLLAMA_NUM_PARALLEL × OLLAMA_CONTEXT_LENGTH` 增长；
- GPU 能完整容纳新模型时才能并发加载，否则需要卸载、排队或跨 GPU；
- KV cache 的 `q8_0` 约为 `f16` 的一半内存，`q4_0` 约为四分之一，但长上下文下精度损失更明显。

因此：

> 12 GB 显存能运行某个 7B 量化模型，不等于它能在 64K/128K 上下文、多用户并发和多模型同时加载时保持良好课堂响应。

对于课程 RAG，应优先通过检索减少送入 LLM 的上下文，而不是默认把整本教材塞入超长上下文。

### 5.2 旧资源估算的使用方式

`docs/research/innate-edu/resource-analysis.md` 中记录了若干精确进程 RAM 和启动时间数字，但没有绑定：

- 操作系统和设备配置；
- OpenMAIC / DeepTutor 具体 commit；
- 使用的 provider 和模型；
- 是否启动完整 DeepTutor 前端；
- PDF、KB 和并发规模；
- 可复现的测量命令和原始结果。

这些数字目前应视为**容量假设**，而不是“全量融合不可行”的证据。更准确的结论是：

- **全本地多模型融合对普通电脑苛刻；**
- **API-first、按需启动的功能融合对普通电脑可行。**

---

## 6. 建议硬件档位

以下档位是项目立项/测试建议，不是硬性兼容声明。正式发布前应通过第 11 节的基准矩阵修订。

| 档位 | 工程起点 | 推荐工作负载 | 不建议 |
|---|---|---|---|
| A. 受限个人 | 4 核 CPU、8 GB RAM、SSD、无独显 | Tauri + OpenMAIC 播放；模型/API 全远程；DeepTutor 单次 CLI | 本地 LLM、扫描 PDF 批量 OCR、多服务常驻 |
| B. 标准个人 | 6 核 CPU、16 GB RAM、NVMe、无独显可用 | API-first；本地课程、进度、轻量 KB；DeepTutor 按需服务 | 大规模图谱索引、本地多媒体模型 |
| C. 本地知识库 | 8 核 CPU、32 GB RAM、1 TB NVMe | 本地解析、embedding、FAISS/BM25；LLM 走 API | 默认 64K+ 本地上下文、多人并发 |
| D. 单用户本地 LLM | 8 核 CPU、32 GB RAM、12 GB VRAM、1 TB NVMe | 7B 级 4-bit 模型、单用户、中等上下文、本地 RAG | 同时加载多个大模型、重型视频生成 |
| E. 家庭/小组推理节点 | 8 核以上、64 GB RAM、24 GB VRAM、2 TB NVMe | 多终端共享模型、KB、缓存；有限并发 | 将其视为无需运维的消费电器 |

补充说明：

- Apple Silicon 可通过 llama.cpp/Metal 利用统一内存，但统一内存同时被系统、应用和模型占用；建议从 24–32 GB 统一内存档开始评估本地 7B 级模型。
- CPU-only 推理在 llama.cpp 中技术上可行，也支持 CPU+GPU 混合卸载，但“可运行”与“满足课堂实时交互”是两件事。
- 本地模型档位应以实际量化格式、context、batch、并发和目标首 token 延迟为准，而不是仅按参数量选型。

---

## 7. 四种部署形态比较

### 7.1 方案 A：个人电脑 + 公有模型 API（默认推荐）

```text
本地：Tauri + OpenMAIC + 课程包 + 可选 DeepTutor KB
云端：LLM / 高级 TTS / 图像或视频生成
```

**优点：**

- 最低硬件门槛；
- 不需要 GPU 运维；
- 模型能力更新快；
- 适合低并发个人使用。

**缺点：**

- 依赖网络；
- API 成本随 token 和多媒体调用增长；
- 发送给模型的检索片段会离开本地边界；
- 需要处理供应商限流、故障和数据条款。

**隐私优化：** 文档和向量索引留在本地，仅发送 top-k 必要片段；敏感课程可禁用云端能力。

### 7.2 方案 B：租用私有云/VPC

```text
个人设备：Tauri 客户端
VPC：OpenMAIC/DeepTutor 服务、数据库、对象存储
模型：云 API 或租用 GPU
```

**优点：** 多终端访问、集中备份、可扩容、适合家庭或小组共享。

**缺点：** “私有 VPC”不等于“数据不离开云厂商”；仍有服务器、补丁、监控、备份、证书和访问控制成本。若只服务一名低频个人用户，常驻 GPU 往往浪费。

**适合：** 多终端、多人共享课程库、需要公网稳定访问且愿意维护服务的用户。

### 7.3 方案 C：家庭私有云/NAS/懒猫微服类设备

```text
家庭设备：DeepTutor、KB、索引、课程文件、进度、API Gateway
个人电脑：Tauri + OpenMAIC 渲染
模型：云 API，或独立 GPU 节点
```

**优点：**

- 原始文档、索引和学习记录可留在家庭网络；
- 多终端共享同一知识库；
- 设备可长期在线，适合异步索引和备份；
- 不需要每台电脑都安装完整 Python/RAG 栈。

**缺点：**

- 远程访问、账号、备份、硬盘故障、UPS 和升级仍需管理；
- 普通 NAS/核显主机不适合高质量大模型实时推理；
- 若最终仍调用云端 LLM，top-k 文本片段仍可能离开家庭网络。

### 7.4 方案 D：全本地 GPU 一体机

```text
本地：OpenMAIC + DeepTutor + embedding + LLM + TTS/ASR
```

**优点：** 离线、低数据外泄面、模型和数据完全可控。

**缺点：** 初始硬件、耗电、散热、驱动、模型升级和兼容性成本最高；长上下文和多媒体仍可能超出消费级 GPU。

**适合：** 高隐私资料、稳定高频使用、已有 GPU 工作站并能接受运维的用户。

---

## 8. 推荐方案：家庭知识中枢 + 可切换推理层

```text
┌────────────────── Personal Device ──────────────────┐
│ Tauri Shell                                         │
│ ├── OpenMAIC WebView                                │
│ ├── CoursePackage / progress cache                  │
│ └── Classroom Intelligence Bridge                   │
└───────────────────────┬─────────────────────────────┘
                        │ LAN / secure remote access
┌───────────────────────▼─────────────────────────────┐
│ Home Knowledge Hub                                  │
│ ├── DeepTutor API / WebSocket                       │
│ ├── document parser / embedding / FAISS or BM25     │
│ ├── learner memory / mastery                        │
│ ├── source documents / backup                       │
│ └── OpenAI-compatible inference gateway             │
└───────────────┬─────────────────────────┬────────────┘
                │                         │
       cloud model API           optional local GPU node
```

关键设计：

1. **推理 endpoint 可替换。** OpenMAIC 和 DeepTutor 都通过 provider/兼容 API 接入，不应各自硬编码模型。
2. **一套共享推理服务。** 本地模式下优先共用 Ollama、llama.cpp 或 Lemonade endpoint，避免加载两份相同模型。
3. **知识层与推理层解耦。** 家庭服务器可以只保存文档、索引和记忆，推理仍走云端。
4. **本地优先但不强制全本地。** 每门课程可以有 `privacyPolicy`，决定哪些内容允许送往云端。
5. **按需启动重组件。** DeepTutor 完整前端、GraphRAG、MinerU、Manim、多媒体模型不应随桌面应用默认常驻。

---

## 9. 懒猫微服/类似本地私有云的适用性

### 9.1 已核验的公开能力

截至 2026-07，懒猫官网公开页面显示：

- 懒猫微服定位为“AI 数据中心”，页面列出 7 盘位全固态、最高 96 TB 存储；
- “懒猫 AI 算力舱”单独列出 275T 算力、64 GB 显存和 70B–671B 模型描述；
- 官网 Playground 将 LightOS 描述为轻量容器编排平台，并允许指定 OCI 镜像、使用 SSH、挂载懒猫网盘；
- 官方组织的 `lzc-helloworld-demo` 展示了 `lzc-cli project build`、`lzc-cli app install`、`lzc-cli project shell` 及 LPK 应用开发路径。

这些资料足以证明它具备**运行容器化/LPK 服务应用的产品方向**，但不足以证明任意普通微服机型都具备高性能本地 LLM 推理能力。

### 9.2 适合承载的组件

| 组件 | 普通家庭私有云适用性 | 说明 |
|---|---:|---|
| 课程文件和资源 | 高 | 最适合，便于多终端与备份 |
| `CoursePackage` / progress | 高 | 数据量小，可本地数据库化 |
| DeepTutor API | 中到高 | 取决于 Python 3.11、镜像和持久卷支持 |
| FAISS/BM25 索引 | 中到高 | 推荐 SSD/NVMe 与足够内存 |
| 文本 PDF 解析 | 中到高 | 可后台执行 |
| 扫描 PDF OCR / MinerU | 中 | 可能耗时，建议任务队列或外部服务 |
| OpenMAIC Node 服务 | 中到高 | Node 20+ 或 OCI 镜像可满足；需验证 SSE/WebSocket |
| 7B 本地 LLM | 低到中 | 取决于具体 RAM/GPU；无独显设备通常仅适合实验 |
| 多用户实时大模型 | 低 | 应连接云 API 或独立 GPU 节点 |
| 本地图像/视频生成 | 低 | 普通 NAS 不适合 |

### 9.3 不要混淆普通微服与 AI 算力舱

官网的 64 GB 显存和 275T 算力属于单独的“AI 算力舱”条目。项目选型时必须向厂商确认具体 SKU，不应写成：

> “懒猫微服都带 64 GB 显存，因此可以运行 70B 模型。”

更安全的工程判断是：

- 普通微服/NAS：存储、编排、知识库、网关；
- 算力舱或独立 GPU 工作站：本地模型推理；
- 云 API：默认高质量模型和弹性峰值。

### 9.4 懒猫 PoC 前必须验证

1. 具体 SKU 的 CPU、RAM、GPU/NPU、存储和散热；
2. OCI 镜像架构与 Python 3.11 / Node.js 20+ 支持；
3. 持久卷、备份和升级时的数据保留；
4. SSE、WebSocket、长连接和大文件上传；
5. LPK 对多服务、内部端口和健康检查的支持；
6. secret/API key 的安全存储；
7. 局域网、远程访问、TLS 和多用户身份；
8. GPU/NPU 是否可传入容器，以及支持哪些推理后端；
9. DeepTutor 建库期间的 RAM 峰值和磁盘临时空间；
10. OpenMAIC + DeepTutor 同时运行时的温度、噪音和持续性能。

在 PoC 完成前，建议把“懒猫部署”定义为可选 adapter，而不是产品唯一部署路径。

---

## 10. 云端还是本地：决策矩阵

| 维度 | 公有模型 API | 租用私有云/VPC | 家庭私有云 | 本地 GPU 工作站 |
|---|---|---|---|---|
| 初始硬件 | 最低 | 低 | 中 | 高 |
| 按量弹性 | 高 | 中到高 | 低 | 低 |
| 单用户低频成本 | 通常友好 | 可能浪费常驻资源 | 取决于已有设备 | 硬件沉没成本高 |
| 多用户摊销 | 按 token 增长 | 可集中摊销 | 家庭/小组可摊销 | 有限并发后较好 |
| 原始资料控制 | 可本地预处理 | 位于云环境 | 最好 | 最好 |
| 推理内容是否出网 | 是 | 视模型部署 | 使用云模型时仍会 | 否 |
| 离线能力 | 弱 | 弱 | 知识层强 | 最强 |
| 运维难度 | 低 | 高 | 中 | 高 |
| 峰值扩容 | 最好 | 好 | 弱 | 弱 |
| 推荐用途 | 默认个人方案 | 多终端/小团队 | 家庭知识中枢 | 高隐私/高频本地推理 |

不要使用未经实测的固定“盈亏平衡请求量”。应在产品中记录：

- 每门课程的输入/输出 token；
- embedding 调用量；
- TTS/ASR 和多媒体调用量；
- 首 token 延迟与总耗时；
- 每月活跃用户、并发和调用峰值；
- 本地设备购置、折旧、耗电和维护时间。

再用实际数据决定何时从 API 迁移到自托管模型。

---

## 11. 必须补做的基准测试

### 11.1 测试档位

至少覆盖：

1. Windows 8 GB、无独显；
2. Windows 16 GB、无独显；
3. Windows 32 GB、12 GB 显存；
4. macOS Apple Silicon 16 GB；
5. macOS Apple Silicon 32 GB；
6. 家庭服务器 16/32 GB、无独显；
7. 家庭推理节点 64 GB + 24 GB 显存。

### 11.2 工作负载

- 只启动 Tauri；
- Tauri + OpenMAIC；
- 进入课堂并播放；
- 启动 DeepTutor CLI；
- 启动 DeepTutor API，不启动其 Next.js 前端；
- 100 页文本 PDF 建库；
- 100 页扫描 PDF OCR；
- FAISS/BM25 查询；
- GraphRAG/LightRAG 建库；
- 云端 LLM 单轮与多 Agent 回合；
- 本地 7B 量化模型，4K/16K/32K context；
- Quiz → diagnosis → intervention 完整闭环；
- 两个终端并发。

### 11.3 指标

- 稳态与峰值 RSS；
- CPU 平均/峰值；
- GPU 显存；
- 启动到可用时间；
- 首 token 延迟；
- 稳态 token/s；
- PDF 建库耗时；
- 索引体积和临时空间；
- 课堂帧率、音频卡顿和 WebView 响应；
- 网络上行量与 API 成本；
- 失败恢复和空闲释放时间。

只有测量完成后，才能把“最低配置”和“推荐配置”写入面向用户的正式文档。

---

## 12. 渐进式实施路线

### Phase 1：场景关联 MVP

1. 一门课程绑定一个 DeepTutor KB；
2. Scene 绑定 `conceptIds` 和来源；
3. 将 DeepTutor 面板从 Baselines 移入课堂抽屉；
4. “问助教”自动携带课程、场景、题目和最近对话；
5. DeepTutor 返回带来源的答案；
6. 由 OpenMAIC TA 角色展示；
7. 默认使用云端模型 API，DeepTutor 按需启动。

### Phase 2：事件与 mastery 闭环

1. 定义 `ClassroomEvent`；
2. OpenMAIC 发出 `quiz.submitted`；
3. DeepTutor 返回误区和知识点状态；
4. 保存 `CourseProgress.masterySnapshot`；
5. 实现 advance/retry/remedial/challenge 策略。

### Phase 3：家庭知识中枢

1. DeepTutor API 容器化；
2. 文档、KB、记忆和 mastery 下沉到家庭服务器；
3. 桌面客户端发现/配置家庭 endpoint；
4. 推理层可选云 API、Ollama、llama.cpp、Lemonade；
5. 完成懒猫微服或通用 OCI/LPK PoC。

### Phase 4：深度本地化

1. 独立 GPU 节点；
2. 统一 OpenAI-compatible inference gateway；
3. 本地 LLM、TTS/ASR 和可选多媒体模型；
4. 断网降级与离线课程；
5. 多终端并发、队列和配额。

---

## 13. 风险与安全边界

- **提示注入：** PDF、网页和 KB 内容属于不可信输入；RAG 结果不能获得系统工具权限。
- **课程与学习数据分离：** 课程包可分享，个人记忆和学习记录默认不可随课程导出。
- **唯一真源：** CoursePackage 管静态课程要求，DeepTutor 管动态学习状态，当前项目保存投影。
- **Secret 管理：** API key 不进入 CoursePackage、日志或导出包。
- **家庭远程访问：** 不直接暴露 DeepTutor/OpenMAIC 原始端口；使用认证、TLS、访问策略和更新机制。
- **模型 endpoint allowlist：** 防止课程包把资料发送到任意第三方 URL。
- **可审计性：** 记录使用了哪些来源、模型、工具和教学干预，但避免保存不必要的敏感原文。
- **离线降级：** 模型不可用时仍能播放已生成课程、完成本地 Quiz 并暂存进度。

---

## 14. 最终建议

### 面向普通个人用户

默认发布：

```text
Tauri + OpenMAIC 本地课堂
+ DeepTutor API/CLI 按需
+ 本地课程/进度/可选 KB
+ 云端 LLM
```

**推荐配置：16 GB RAM + SSD，无独显。**

### 面向重隐私个人用户

```text
Tauri + OpenMAIC
+ 本地 DeepTutor/KB
+ 7B 级量化模型或独立推理 endpoint
```

**推荐从 32 GB RAM + 12 GB VRAM 起步，并限制上下文和并发。**

### 面向家庭多终端

```text
每台终端：Tauri/OpenMAIC
家庭设备：DeepTutor + KB + 记忆 + 文件
推理：云 API 或独立 24 GB VRAM 节点
```

懒猫微服类设备优先承担**知识中枢和服务编排**，不要默认承担大模型推理。若选用官网单列的 AI 算力舱或其他 GPU 设备，则必须按具体 SKU 和实测结果重新评估。

### 一句话决策

> **不是减少 DeepTutor 的能力，而是把它从“第二套完整前端”变成“按需、可远程、可替换推理端的课堂智能引擎”。这样既保留 OpenMAIC 的课堂优势，也能让普通个人电脑承担日常使用。**

---

## 15. 参考资料

### 项目与上游

- [OpenMAIC 官方仓库](https://github.com/THU-MAIC/OpenMAIC) — 技术栈、Node.js/pnpm 要求、Provider、MinerU 和本地 endpoint。
- [DeepTutor 官方仓库](https://github.com/HKUDS/DeepTutor) — Python/Node 要求、API、KB/RAG、解析器、本地模型 Provider；未公布硬件最低配置。
- [llama.cpp 官方仓库](https://github.com/ggml-org/llama.cpp) — CPU/GPU 后端、量化、CPU+GPU 混合推理和 OpenAI-compatible server。
- [Ollama FAQ](https://docs.ollama.com/faq) — context、并发、模型驻留、GPU 加载和 KV cache 量化。
- [Qwen2.5-7B-Instruct 模型卡](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct) — 参数量、上下文和部署框架；未给硬件最低配置。
- [VoxCPM 官方仓库](https://github.com/OpenBMB/VoxCPM) — 自托管 TTS 后端选择。

### 懒猫微服与家庭私有云

- [懒猫微服官网](https://lazycat.cloud/) — 当前产品线、AI 数据中心、AI 算力舱、存储和算力宣传参数。
- [懒猫微服 Playground](https://lazycat.cloud/playground/) — LightOS、OCI 镜像、SSH、网盘挂载和实例用法。
- [懒猫微服官方组织应用模板](https://gitee.com/lazycatcloud/lzc-helloworld-demo) — `lzc-cli`、LPK 构建/安装和容器 shell 工作流。
- [LC-02 第三方开箱页面](https://post.smzdm.com/p/ae5rxxpm/) — 仅用于理解历史样机，不能代表当前全部产品线或官网承诺。
- [懒猫微服第三方产品报道](https://www.sohu.com/a/803101826_121924584) — 营销与转述性质，涉及 AI 能力的描述须通过具体 SKU 和基准测试验证。

### 本仓关联文档

- `docs/project/spec/contracts/course-manifest.md`
- `docs/project/spec/contracts/openmaic-embed.md`
- `docs/project/spec/sop/pdf-to-stage.md`
- `docs/research/innate-edu/fusion-strategy.md`
- `docs/research/innate-edu/resource-analysis.md`
- `notes/baselines/openmaic.md`
- `notes/baselines/deeptutor.md`

---

## 16. 事实、估算与未知项说明

### 已有直接资料支持

- OpenMAIC 和 DeepTutor 的软件栈、Provider 与服务组成；
- 两者均未公布 CPU/RAM/GPU 官方最低配置；
- Ollama 的 context/并发/内存关系与 KV cache 选项；
- llama.cpp 的 CPU、GPU、混合推理和量化能力；
- 懒猫官网当前将普通数据中心与 AI 算力舱分开呈现；
- LightOS/LPK 具备承载服务应用的路径。

### 工程估算，必须实测

- 8/16/32/64 GB 分档；
- 12 GB/24 GB 显存推荐；
- 家庭服务器承载 DeepTutor 建库的峰值；
- 不同 context 下本地 7B 模型的首 token 延迟；
- OpenMAIC + DeepTutor 同时运行的实际 RSS；
- 懒猫具体 SKU 对 Python、Node、SSE、WebSocket 和 GPU passthrough 的兼容性。

### 当前未知

- DeepTutor 官方未来是否会发布硬件基准；
- 懒猫各 SKU 的统一硬件矩阵和容器 GPU/NPU 支持边界；
- 本项目目标用户的真实 token 用量、并发和隐私等级；
- MinerU、Docling、GraphRAG 等重型能力在目标设备上的实测成本。
