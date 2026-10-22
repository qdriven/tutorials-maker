# design.md —— 方案设计模板（以 Slides 教学网站为填充示例）

> 【门禁 G2】覆盖矩阵（§6）必须 100%，Constitution 检查通过，且经人工评审后进入 tasks.md。
> 输入：spec.md（已评审版）+ constitution.md + 现有代码库探查结果。

---

## 1. 领域拆解（限界上下文划分）

| 限界上下文 | 职责 | 包含聚合/实体 | 对外接口 | 不做什么（边界） |
|---|---|---|---|---|
| 教学内容上下文（Content） | 课程/章节/幻灯片的组织与读取 | Course（聚合根）、Chapter、Slide | `GET /api/courses`、`GET /api/chapters/{id}/slides` | 不理解"提问"语义 |
| 答疑上下文（QA） | 接收问题、生成解答、持久化问答 | QaEntry；AnswerProvider（领域服务接口） | `POST/GET /api/courses/{id}/qa` | 不修改教学内容 |

> 拆解原则：一个上下文一张词汇子表；跨上下文只通过 ID 引用（QaEntry 只持有 course_id，不导航 Course 内部结构）。本示例两个上下文同库同服务（模块化单体），上下文边界体现在包结构与接口隔离上。

## 2. 聚合设计

| 聚合根 | 包含实体 | 不变式（Invariant） | 事务边界 |
|---|---|---|---|
| Course | Chapter、Slide | 同一 Course 内 chapter.order_index 唯一；Chapter 内 slide.order_index 唯一；级联删除随聚合根 | 保存 Course 即整体落库 |
| QaEntry | —（独立小聚合） | question/answer 非空；created_at 不可改 | 单次 save |

**领域事件**：本期无（登记：若未来"提问后通知讲师"，则新增 `QuestionAsked` 事件，QA 上下文发布、通知上下文订阅）。

**领域服务**：`AnswerProvider.answer(question, corpus)` —— 不属于任何实体的领域逻辑；本期实现 `KeywordAnswerProvider`（见 ADR-001），替换 LLM 时不动 QaService。

## 3. 业务逻辑分拆到 User Story（用例流程）

### US-01 浏览章节导航 → 用例流程
1. 前端 `useCourses()` → `GET /api/courses`
2. CourseController.courses() → CourseRepository.findAll()（`@Transactional(readOnly)` 内序列化章节树）
3. 前端按 `chapters[0].id` 设置默认选中（AC-01a）；章节为 0 → 渲染空态（AC-01c）
- 异常分支：API 失败 → api.ts 捕获 → 返回种子数据（AC-04a）

### US-02 翻阅幻灯片 → 用例流程
1. 章节数据已随 courses 一次性返回（决策：数据量小，免去按章节二次取数；若章节 >50 页改为 `GET /api/chapters/{id}/slides` 按需加载——契约已预留）
2. 翻页 = 本地 `pageIndex` 状态切换（无网络）；按钮禁用逻辑由 `page/total` 推导（AC-02c）

### US-03 提问与解答 → 用例流程
1. `POST /api/courses/{id}/qa` {question}
2. QaController 校验非空 → QaService.ask()：
   - a. 加载 Course 聚合，拼接待检语料（全部 Slide 的 title+content+detail）
   - b. `AnswerProvider.answer()` 生成解答
   - c. 保存 QaEntry（同一事务）
3. 前端 mutation onSuccess 写回 `['qa', courseId]` 缓存（乐观更新列表）
- 异常分支：课程不存在 → 404 ERR_NOT_FOUND；空问题 → 400 ERR_VALIDATION

### US-04 离线降级 → 用例流程
1. 任意 query/mutation 抛错 → 返回种子数据/本地解答
2. 本地解答与后端 KeywordAnswerProvider 逻辑等价（seed.ts `localAnswer`）

## 4. API 契约（请求/响应 Schema）

### GET /api/courses → 200
```json
[{ "id": 1, "title": "string", "description": "string",
   "chapters": [{ "id": 1, "title": "string", "orderIndex": 1,
     "slides": [{ "id": 1, "title": "string", "content": "string", "detail": "string", "orderIndex": 1 }] }] }]
```

### GET /api/chapters/{id}/slides → 200：`Slide[]`（按 orderIndex 升序）｜ 404 ERR_NOT_FOUND

### GET /api/courses/{id}/qa → 200：`QaEntry[]`（createdAt 倒序）

### POST /api/courses/{id}/qa
- 请求：`{ "question": "string(1..2000)" }`
- 200：`{ "id": 1, "question": "…", "answer": "…", "createdAt": "ISO8601" }`
- 400：`{ "code": "ERR_VALIDATION", "message": "question 不能为空" }`

> 前端 `src/types/index.ts` 与上表逐字段对齐；契约变更 = 先改本节再改代码。

## 5. 前端设计

### 5.1 组件树与状态归属
| 组件 | 职责 | 状态类型 |
|---|---|---|
| ChapterNav | 章节列表渲染与选中回调 | 无本地状态（受控） |
| SlideStage | content/detail 展示 + 翻页 | 无本地状态（受控） |
| QaPanel | 提问输入 + 问答列表 | `question` 草稿（本地 useState） |
| App | activeChapterId/pageIndex（本地）；课程与问答（TanStack Query 服务端状态） | 混合 |

### 5.2 交互时序（提问场景）
```
学习者 → QaPanel: 输入+提交
QaPanel → useAskQuestion.mutate(question)
  ├─ 后端在线 → POST /api/.../qa → 落库 → 返回 QaEntry
  └─ 后端离线 → localAnswer() → 合成 QaEntry
mutation.onSuccess → 写入 ['qa', courseId] 缓存 → 列表顶部出现新问答
```

## 6. 覆盖性矩阵（spec ↔ design 双向追溯）

| 验收标准 | API | 前端组件 | 涉及表 | 对应任务（tasks.md） |
|---|---|---|---|---|
| AC-01a/b/c | GET /api/courses | ChapterNav + App 默认选中 | courses, chapters, slides | T6,T8 |
| AC-02a/b/c | （契约预留 GET slides） | SlideStage | slides | T8 |
| AC-03a/d | POST .../qa | QaPanel | qa_entries | T4,T5,T8 |
| AC-03b | POST 校验 + 前端禁用 | QaPanel | — | T5,T8 |
| AC-03c | GET .../qa | QaPanel | qa_entries | T5,T8 |
| AC-04a | — | api.ts 降级 | — | T7 |

自检：6/6 验收标准有设计落点；0 个无来源的设计元素。
