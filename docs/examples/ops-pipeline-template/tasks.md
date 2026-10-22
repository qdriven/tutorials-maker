# tasks.md —— 任务分解模板（以 Slides 教学网站为填充示例）

> 【门禁 G3】覆盖率自检（§4）100% + 依赖图无环，方可进入实现。
> 输入：design.md（已评审版）。
> 粒度规则：单任务 ≤ 一个专注会话；单任务改动 ≤ ~5 个文件；每个任务必须自带验证命令。

---

## 1. 任务卡

执行者类型：**Builder**（写代码）、**Verifier**（跑验证，可为 CI 脚本）、**Reviewer**（人）。
模型档位建议：T2/T4/T8 用强模型（涉及建模与交互逻辑）；T1/T3/T5/T6/T7 可用快模型；T9 零模型成本（纯脚本）。

| ID | 任务 | 涉及文件 | 关键步骤 | 验证命令 | 依赖 | 执行者 | 并行组 |
|---|---|---|---|---|---|---|---|
| T1 | 后端骨架 | `pom.xml`, `application.yml`, `docker-compose.yml` | 建 Maven 工程；双 profile（PG 默认/H2 demo） | `mvn -q compile` | — | Builder(快) | **W1** |
| T2 | 实体与仓储 | `entity/*4`, `repository/*4` | 按 spec §4 Schema 逐字段实现；UK/FK 约束 | 启动后建表无错 | T1 | Builder(强) | W2 |
| T3 | 种子数据 | `config/DataInitializer.java` | 1 课程 3 章节 5 页幻灯片 | 启动后 courses 非空 | T2 | Builder(快) | W3 |
| T4 | 答疑领域服务 | `service/AnswerProvider`, `KeywordAnswerProvider`, `QaService` | 接口隔离 + 关键词匹配 + 事务落库 | 单测：提问返回非空 answer | T2 | Builder(强) | W3（与 T3 并行） |
| T5 | REST 控制器 | `controller/*2`, `config/WebConfig` | 4 端点 + 校验 + CORS；注意 readOnly 事务防懒加载异常 | `curl` 四端点 200/400/404 | T3,T4 | Builder(快) | W4 |
| T6 | 前端骨架 | `frontend/` 脚手架 + Provider | Vite+TS+Tailwind+shadcn+TanStack | `npm run build` | — | Builder(快) | **W1**（与 T1 并行） |
| T7 | API 层与降级 | `src/lib/api.ts`, `src/lib/seed.ts`, `src/types/` | query hooks；失败→种子；类型对齐 design §4 | 断后端时页面可操作（AC-04a） | T6 | Builder(快) | W2（与 T2 并行） |
| T8 | 三栏区块 | `src/sections/*3`, `App.tsx` | 导航/展示区（上内容下详情+翻页）/提问区 | 构建通过；手测 EARS-1~3 | T7 | Builder(强) | W3 |
| T9 | 端到端验证 | 全项目 | 构建 + 临时 dev server + HTTP 200 + 停止 | 构建零错误；HTTP 200 | T5,T8 | Verifier | W4 |

## 2. 依赖 DAG 与并行波次

```
Wave 1（并行）:        T1 ──────────────  T6
                        │                  │
Wave 2（并行）:        T2 ──────────────  T7
                       │  \               │
Wave 3（并行）:    T3 ─┴─ T4(并行) ────── T8
                        \  /
Wave 4（汇合）:         T5 ────┐
                              T9（等 T5+T8）
```

| 波次 | 并行任务 | 汇合条件（进入下一波的门） |
|---|---|---|
| W1 | T1 ∥ T6 | 两者各自验证通过 |
| W2 | T2 ∥ T7 | 后端建表无错 ∥ 前端降级手测通过 |
| W3 | T3 ∥ T4 ∥ T8 | 三者验证通过 |
| W4 | T5 → T9 | T5 四端点 curl 全过 → T9 端到端 |

**关键路径**：T6→T7→T8→T9（前端链）与 T1→T2→T4→T5→T9（后端链）长度相近；T9 为全局汇点。
**并行安全规则**：同波次任务不得修改同一文件；跨栈任务（后端/前端）天然隔离；同栈并行（T3∥T4）已按目录隔离（config/ vs service/）。

## 3. 执行模式建议
- 单机顺序执行：W1→W4 逐波，每波内可任意顺序。
- 多 Agent 并行：每个任务卡即一份完整 prompt 上下文（含涉及文件、验证命令、宪法引用）；波次间由调度器等待全部完成信号（对应 Kiro "waves" 机制）。
- 失败回退：任务验证失败 → 回灌错误给该任务 Agent 重试（≤3 次）→ 仍失败则升级到人工，并标记阻塞下游。

## 4. 覆盖率自检

| 验收标准 | 覆盖任务 |
|---|---|
| AC-01a/b/c | T6, T8 |
| AC-02a/b/c | T8 |
| AC-03a/d | T4, T5, T8 |
| AC-03b | T5, T8 |
| AC-03c | T5, T8 |
| AC-04a | T7 |

✔ 6/6 验收标准被覆盖；✔ 9/9 任务均有验收标准溯源（无镀金任务）；✔ DAG 无环。
