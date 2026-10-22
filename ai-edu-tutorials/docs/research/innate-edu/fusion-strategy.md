# OpenMAIC + DeepTutor 融合策略

**项目:** ai-edu-tutorials (Innate Edu)
**日期:** 2026-07-13
**前提:** 当前 Tauri 壳已嵌入 OpenMAIC 课堂运行时（bundled :3230），DeepTutor 通过 CLI hook 集成

---

## 1. 两个项目的互补关系

```
OpenMAIC                          DeepTutor
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
课堂生成（PDF → 多场景课堂）        知识库检索（PDF → KB → RAG 问答）
多角色对话（Teacher/Assistant/      个性化辅导（掌握度 + 间隔重复
           Student 自动生成）                  + Feynman 重试）
白板实时绘制                        Living Book（19 种交互 Block）
幻灯片渲染（Canvas）                Co-Writer（协作 Markdown 编辑）
TTS/ASR（Agent 语音朗读）           三层记忆（L1/L2/L3 持久化）
PBL 项目制学习                      IM 渠道集成（18 个平台）
导出（PPTX/HTML/ZIP）               多用户隔离 + 审计
视觉引导（聚光灯/激光）              7 种 RAG 检索引擎
```

**核心洞察:**
- **OpenMAIC = 课堂呈现层** — 负责"教"（生成、播放、交互、演示）
- **DeepTutor = 学习引擎层** — 负责"学"（理解、记忆、掌握、追踪）
- 两者在 PDF 处理上有重叠，但目标不同：OpenMAIC 提取内容生成课堂，DeepTutor 提取内容构建知识库

---

## 2. 融合架构：Innate Edu 目标形态

```
┌────────────────────────────────────────────────────────────────┐
│  Tauri 2 Shell (desktop/)                                      │
│  React + shadcn/base-ui · 课程库 · 4 模块侧栏                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Runtime  │ │ Courses  │ │Baselines │ │ Settings │          │
│  │(课堂嵌入)│ │(课程管理)│ │(知识+对话)│ │(配置)    │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
└────────┬────────────────────────────────────┬──────────────────┘
         │ 子 Webview (localhost)              │ CLI / API 调用
┌────────▼────────────────┐  ┌─────────────────▼────────────────┐
│  OpenMAIC Runtime       │  │  DeepTutor Engine                │
│  ─ 课堂生成与播放        │  │  ─ KB 知识库管理                  │
│  ─ 多角色对话            │  │  ─ 掌握度追踪                     │
│  ─ 白板/幻灯片/交互      │  │  ─ 三层记忆                       │
│  ─ TTS/ASR              │  │  ─ Living Book                    │
│  ─ PBL                  │  │  ─ RAG 检索                       │
│  ─ 导出                  │  │  ─ IM 渠道                        │
└─────────────────────────┘  └──────────────────────────────────┘
         │                              │
         └──────────┬───────────────────┘
                    │ 共享数据层
    ┌───────────────▼───────────────────┐
    │  课程包 (CoursePackage)            │
    │  ─ meta / roles / scenes / quizzes│
    │  ─ mastery checkpoints            │
    │  ─ KB 引用 (deeptutor_kb_id)      │
    └───────────────────────────────────┘
```

---

## 3. 模块级融合方案

### 3.1 PDF 处理 → 双通道

| 通道 | 提供者 | 输出 | 用途 |
|---|---|---|---|
| **课堂通道** | OpenMAIC `lib/pdf/` | 文本 + 图像 → Stage 课堂 | 课堂生成 |
| **知识通道** | DeepTutor `services/parsing/` | 结构化文档 → KB 索引 | RAG 检索 + Living Book |

**融合点:**
- 用户上传 PDF 时，**同时**触发两条通道
- 课堂通道生成可播放的互动课堂
- 知识通道构建持久化知识库，供课后深度学习
- 课程包的 `meta.sourcePdf` 字段关联两条通道的产物

### 3.2 课堂播放 + 掌握度追踪

**当前状态:** OpenMAIC 课堂播放无学习追踪；DeepTutor 有完整掌握度系统但无课堂播放。

**融合方案:**

```
课堂播放中
  └─ Quiz 场景完成
       └─ DeepTutor LearningService.record_attempt()
            ├─ 更新掌握度分数（mastery score）
            ├─ 间隔重复调度（SpacedRepetition）
            └─ 写入 L1 trace（学习事件）
  └─ 场景切换
       └─ DeepTutor Memory L1 追加（观看事件）
  └─ 课堂结束
       └─ DeepTutor Memory L2 整合（本课学习事实）
       └─ DeepTutor LearningService.check_mastery_gate()
            └─ 未达标 → 推荐 Living Book 补充阅读
```

**课程包扩展（schemaVersion 2）:**
```typescript
CoursePackage {
  // ... 现有字段
  mastery: MasteryCheckpoint[]  // 已有
  deeptutor_kb_id?: string      // 新增：关联的 DeepTutor KB
  learning_config?: {           // 新增
    spaced_repetition: boolean
    mastery_threshold: number   // 默认 0.8
    feynman_retry: boolean
  }
}
```

### 3.3 多角色对话 + 个性化记忆

**OpenMAIC 角色:** Teacher / Assistant / Student（预定义行为模式）
**DeepTutor 记忆:** 三层持久化（L1 traces → L2 facts → L3 synthesis）

**融合方案:**

```
学生在课堂中提问
  ↓
OpenMAIC Agent（Teacher）处理
  ├─ 常规回答 → 直接回复
  └─ 需要个性化 → DeepTutor Memory 查询
       ├─ L3 profile（学生偏好/水平）
       ├─ L3 recent（最近学习记录）
       └─ L3 scope（知识范围）
       → 回答内容根据学生水平调整难度
```

**DeepTutor 的 Subagent Consult 能力可以直接复用:**
- OpenMAIC 的 Teacher Agent 在回答前，consult DeepTutor 获取学生记忆上下文
- 回答后，将交互事件写入 DeepTutor L1 trace

### 3.4 Living Book ↔ 课堂互补

```
课堂场景（Interactive）
  └─ 学生想深入了解某个概念
       └─ 打开 Living Book（DeepTutor）
            ├─ 基于同一 KB 的交互式阅读
            ├─ 概念图（concept_graph block）
            ├─ 闪卡（flash_cards block）
            └─ 深入探讨（deep_dive block）
  └─ 返回课堂继续播放

课堂结束后
  └─ 系统推荐 Living Book（基于 quiz 错误分析）
       └─ 针对薄弱知识点的个性化阅读路径
```

### 3.5 白板 + RAG 检索

```
学生在白板上画了一个问号
  ↓
OpenMAIC Teacher Agent 识别到学生困惑
  ├─ 在白板上绘制解释图
  └─ 同时触发 DeepTutor RAG
       └─ 从 KB 中检索相关知识点
            └─ 以 Living Book block 形式呈现
```

---

## 4. 渐进式融合路线图

### Phase 1: 基础集成（当前 → 近期）

**目标:** 两个系统能独立运行，通过 CLI/API 互通

| 任务 | 来源 | 状态 |
|---|---|---|
| OpenMAIC bundled runtime 嵌入 Tauri | edu-bundled-runtime-verify | ✅ 已验证 boot |
| DeepTutor CLI hook（`run_deeptutor_chat`）| edu-deeptutor-hook | 🔧 代码就绪，待复现 |
| 课程包 schema 扩展（`deeptutor_kb_id`）| 新增 | ⏳ |
| Baseline 实跑记录 | edu-baseline-* | ⏳ 环境门控 |

### Phase 2: 数据层融合（中期）

**目标:** 课程包同时关联课堂和知识库

| 任务 | 说明 |
|---|---|
| PDF 双通道处理 | 上传 PDF 同时生成课堂 + KB |
| Quiz 成绩回写 DeepTutor | 课堂测验成绩 → DeepTutor mastery |
| 记忆上下文注入课堂 | DeepTutor L3 记忆 → OpenMAIC Agent 上下文 |
| Living Book 从课堂触发 | 课堂中可打开关联的 Living Book |

### Phase 3: 深度融合（远期）

**目标:** 统一学习体验，自适应教学

| 任务 | 说明 |
|---|---|
| 自适应课堂难度 | 根据 DeepTutor 掌握度调整 OpenMAIC 课堂节奏 |
| IM 渠道通知 | 学习提醒通过飞书/Telegram 推送 |
| 多用户课堂 | DeepTutor 多用户隔离 + OpenMAIC 课堂 |
| PBL + Living Book | 项目制学习中嵌入交互式阅读 |
| 协作写作 + 课堂 | Co-Writer 产出可嵌入课堂场景 |

---

## 5. 技术约束与决策

### 5.1 不合并源码（AGENTS.md 约束）

**原则:** OpenMAIC 和 DeepTutor 保持独立仓库，通过 CLI/API 互通。

**原因:**
- 两个项目技术栈不同（TypeScript vs Python）
- 各自活跃开发，合并会增加维护负担
- Tauri 壳作为"胶水层"是正确的架构边界

### 5.2 课程包作为统一数据契约

**CoursePackage** 是连接两个系统的数据契约：

```typescript
// OpenMAIC 侧：读取 scenes[] 用于课堂播放
// DeepTutor 侧：读取 deeptutor_kb_id 用于知识检索

CoursePackage {
  meta: { sourcePdf, deeptutor_kb_id }
  roles: Role[]
  scenes: Scene[]           // OpenMAIC 消费
  quizzes: Quiz[]           // 双方消费
  mastery: MasteryCheckpoint[]  // 双方消费
  learning_config: { ... }  // DeepTutor 消费
}
```

### 5.3 Rust 层作为编排中枢

**当前 `lib.rs` 已有:**
- `start_openmaic_bundled` / `ensure_openmaic_runtime_ready`
- `run_deeptutor_chat`

**扩展方向:**
- `create_deeptutor_kb_from_pdf(pdf_path)` — PDF → KB 一键创建
- `sync_quiz_results(quiz_id, score)` — 课堂成绩 → DeepTutor
- `get_student_memory(student_id)` — 获取学生记忆上下文

---

## 6. 竞品对比定位

| 维度 | OpenMAIC | DeepTutor | Innate Edu（融合目标）|
|---|---|---|---|
| **课堂生成** | ✅ 自动 | ❌ | ✅（OpenMAIC）|
| **多角色对话** | ✅ | ❌ | ✅（OpenMAIC）|
| **白板/视觉** | ✅ | ❌ | ✅（OpenMAIC）|
| **知识库 RAG** | ❌ | ✅ | ✅（DeepTutor）|
| **掌握度追踪** | ❌ | ✅ | ✅（DeepTutor）|
| **记忆系统** | ❌ | ✅ 三层 | ✅（DeepTutor）|
| **Living Book** | ❌ | ✅ | ✅（DeepTutor）|
| **IM 渠道** | ❌ | ✅ 18个 | ✅（DeepTutor）|
| **导出** | ✅ PPTX/HTML/ZIP | ❌ | ✅（OpenMAIC）|
| **PBL** | ✅ | ❌ | ✅（OpenMAIC）|
| **自适应教学** | ❌ | ✅ 基础 | ✅ 增强（融合）|
| **桌面应用** | ❌ Web-only | ❌ CLI+Web | ✅ Tauri |
| **离线使用** | 部分（ZIP 导出）| 部分（CLI）| ✅（Tauri bundled）|

---

## 7. 关键风险

| 风险 | 影响 | 缓解 |
|---|---|---|
| 两个项目 API 变更不同步 | 集成层断裂 | 锁定版本 + 契约测试 |
| DeepTutor Python 依赖与 Tauri 冲突 | 安装复杂 | CLI 隔离（sidecar 模式）|
| 课堂播放性能（嵌入两个 runtime）| 卡顿 | 按需加载，不用时释放 |
| 学习数据一致性（两套存储）| 数据分裂 | 以 DeepTutor 为学习数据主源 |
| PDF 双通道处理耗时 | 用户等待 | 异步 + 进度反馈 |

---

## 8. 资源消耗约束

> ⚠️ 全量融合方案对个人用户**不可行**。详见 [resource-analysis.md](./resource-analysis.md)。

| 方案 | RAM | 启动 | 磁盘 | 适合 |
|---|---|---|---|---|
| 全量融合 | 1.2-3GB | 6-11s | 1.7GB+ | 机构（不推荐）|
| **推荐方案** | **280-500MB** | **1-2s** | **310MB** | **个人用户** |
| 极简方案 | ~280MB | ~1s | 310MB | 受限设备 |

**推荐方案 = Tauri + OpenMAIC（常驻）+ 课程包内嵌掌握度（零额外进程）**

DeepTutor 作为**可选插件**，用户主动启用时按需启动（~150MB），5 分钟无活动自动停止。

**更进一步:** 如果 RAG 上云，客户端可以做到完全零 Python 依赖，仅 ~280MB RAM。详见 [merge-architecture.md](./merge-architecture.md)。

---

## 9. 总结

**Innate Edu 的务实路径 = OpenMAIC 课堂能力 + 课程包内嵌学习追踪 + Tauri 桌面体验**

- **MVP 阶段:** 聚焦 OpenMAIC（280MB），课堂播放 + Quiz + PBL + 白板 + TTS，不需要 DeepTutor
- **Phase 2+:** RAG 上云（共享索引），本地记忆（隐私保障），Living Book 可共享（社区载体）
- **资源是硬约束:** 个人用户的笔记本就是 8GB，不能假设 16GB+
- **社区价值:** 云 RAG + 共享 Living Book = 教师发布课程 → 学生订阅 → 小组协作

**一句话: 云端负责重计算和共享，本地负责体验和隐私。先用 OpenMAIC 做到 280MB 的完整课堂体验，再分层引入云端 RAG 和社区能力。**
