# tasks.md —— Slides 教学网站（任务分解）

> 输入：ops/design.md ｜ 规则：单任务单会话可完成；按依赖排序；每任务带验证命令

| # | 任务 | 涉及文件 | 验证 | 依赖 |
|---|---|---|---|---|
| T1 | 后端骨架：Maven 工程 + application.yml（PG 默认 / demo H2）+ docker-compose | `backend/pom.xml`, `application.yml`, `docker-compose.yml` | 有 JDK 时 `mvn -q compile` 通过 | — |
| T2 | JPA 实体与 Repository：Course/Chapter/Slide/QaEntry | `entity/*`, `repository/*` | 启动后 JPA 自动建表无报错 | T1 |
| T3 | 种子数据：DataInitializer 写入示例课程 | `config/DataInitializer.java` | 启动后查询 courses 非空 | T2 |
| T4 | QaService + AnswerProvider（关键词匹配占位） | `service/*` | 提交问题返回非空解答 | T2 |
| T5 | REST 控制器：4 个 API + CORS 放行前端 | `controller/*` | curl 四个端点均 200 | T3,T4 |
| T6 | 前端骨架：Vite+React+TS+Tailwind+shadcn/ui + TanStack Query Provider | `frontend/` | `npm run build` 通过 | — |
| T7 | api.ts：query hooks + 种子降级（EARS-6） | `src/lib/api.ts`, `src/lib/seed.ts` | 断网/无后端时页面可用 | T6 |
| T8 | 三栏区块：ChapterNav / SlideStage / QaPanel | `src/sections/*` | 构建通过，交互满足 EARS-1~5 | T7 |
| T9 | 端到端自检：构建前端、临时启动 dev server 验证、停止 | 全项目 | `npm run build` 零错误 | T5,T8 |

## 覆盖率自检
spec 六条 EARS 均被 T5–T9 覆盖；无"孤儿需求"，无"无需求任务"。
