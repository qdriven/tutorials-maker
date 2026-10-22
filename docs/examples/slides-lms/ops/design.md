# design.md —— Slides 教学网站（方案设计）

> 输入：ops/constitution.md + ops/spec.md ｜ 约束：每条 spec 需求必须映射到设计元素

## 1. 领域模型（后端 JPA，对应统一语言）

| 实体 | 表 | 关键字段 | 关系 |
|---|---|---|---|
| Course | `courses` | id, title, description | 1→N Chapter |
| Chapter | `chapters` | id, course_id, title, order_index | 1→N Slide |
| Slide | `slides` | id, chapter_id, title, content（教学内容）, detail（详细内容）, order_index | — |
| QaEntry | `qa_entries` | id, course_id, question, answer, created_at | N→1 Course |

设计决策：Chapter/Slide 用 `order_index` 排序（满足 EARS-3 顺序切换）；QaEntry 挂 Course 而非 Slide，降低提问门槛（满足 EARS-4/5）。

## 2. API 契约（REST，统一前缀 /api）

| 方法 | 路径 | 说明 | 验收映射 |
|---|---|---|---|
| GET | `/api/courses` | 课程列表（含章节树） | EARS-1 |
| GET | `/api/chapters/{id}/slides` | 章节幻灯片（按 order_index 升序） | EARS-2/3 |
| GET | `/api/courses/{id}/qa` | 历史问答 | EARS-5 |
| POST | `/api/courses/{id}/qa` | 提交问题 → 返回解答并落库 | EARS-4 |

## 3. 解答服务（QaService）
本版占位实现：对问题做关键词分词，在当前课程全部 Slide 的 content/detail 中检索匹配度最高的一段，拼装为解答返回；无匹配返回兜底文案。接口隔离为 `AnswerProvider`，后续可替换为 LLM 实现（对应 spec 非目标项）。

## 4. 前端结构（React + TanStack Query + shadcn/ui）

```
App
├── sections/ChapterNav.tsx    左栏：课程→章节树（Button+ScrollArea）
├── sections/SlideStage.tsx    中栏：上方 SlideContent（教学内容）
│                                下方 SlideDetail（详细内容）+ 上/下一页
├── sections/QaPanel.tsx       右栏：问答列表 + Textarea 提问
└── lib/api.ts                 TanStack Query hooks；fetch 失败→种子数据降级（EARS-6）
```

状态：选中章节/页码为本地 useState；服务端数据全部走 `useQuery`/`useMutation`（宪法要求）。

## 5. 持久化与运行
- 默认 profile：PostgreSQL（`DB_URL/DB_USER/DB_PASSWORD` 环境变量注入）；`docker-compose.yml` 一键起库
- `demo` profile：H2（PostgreSQL 兼容模式）内嵌运行，便于无 PG 环境验证
- 启动时 `DataInitializer` 写入一门种子课程（3 章节 × 各 2–3 页幻灯片）

## 6. 覆盖性自检（spec ↔ design 映射）
EARS-1→API#1+ChapterNav｜EARS-2/3→API#2+SlideStage｜EARS-4→API#4+QaPanel｜EARS-5→API#3｜EARS-6→api.ts 降级。无遗漏。
