# constitution.md —— 项目宪法模板

> 性质：**项目级文件**，整个项目只写一次，所有需求的所有阶段共享。
> 注入方式：作为 Agent 常驻上下文（AGENTS.md / CLAUDE.md / Kiro steering 的 always 模式）。
> 修改纪律：修改本文件 = 架构决策，必须人工评审 + 记录 ADR（架构决策记录）。

---

## 1. 技术栈铁律（不可由 Agent 变更）

| 层 | 技术 | 版本约束 | 说明 |
|---|---|---|---|
| 后端语言 | Java | 17 | 禁止使用更低版本语法 |
| 后端框架 | Spring Boot | 3.x | Web + Validation + Data JPA |
| ORM | Spring Data JPA / Hibernate | 随 Boot | 禁止手写裸 SQL，复杂查询用 Specification |
| 数据库 | PostgreSQL | 16 | 生产目标库；demo profile 可用 H2（PG 兼容模式） |
| 前端框架 | React + TypeScript | React 18, TS strict | strict 模式不可关闭 |
| 构建 | Vite | 7.x | — |
| 样式 | Tailwind CSS + shadcn/ui | Tailwind 3.4 | 禁止引入第二套组件库 |
| 服务端状态 | TanStack Query | v5 | 一切服务端数据走 query/mutation hook，禁止组件内裸 fetch |
| 包管理 | Maven / npm | — | 新增依赖需在 tasks.md 中显式声明 |

## 2. 目录约定

```
backend/src/main/java/com/example/<app>/
├── entity/        # JPA 实体（聚合）
├── repository/    # Spring Data 接口
├── service/       # 应用服务（用例编排、事务边界）
├── controller/    # REST 端点（只允许薄薄一层：参数校验 + 调 service）
├── dto/           # 请求/响应对象（禁止直接暴露 entity）
└── config/        # CORS、种子数据、安全
frontend/src/
├── sections/      # 页面区块（三栏等大区块）
├── components/    # 可复用小组件（shadcn 扩展）
├── hooks/         # 自定义 hooks
├── lib/           # api.ts（唯一网络入口）、seed.ts、工具
└── types/         # 与后端 dto 对齐的 TS 类型
```

## 3. 命名与代码规范
- 表名蛇形复数（`qa_entries`），列名蛇形（`order_index`）；Java/TS 驼峰。
- REST 路径：`/api/<资源复数>`，子资源 `/api/<父资源>/{id}/<子资源>`。
- 实体排序字段统一命名 `order_index`；时间统一 `created_at`/`updated_at`（UTC，Instant/ISO8601）。

## 4. API 规范
- 统一错误响应：`{ "code": "ERR_xxx", "message": "人类可读", "details": {} }`。
- 错误码字典：`ERR_VALIDATION`（入参非法 400）、`ERR_NOT_FOUND`（404）、`ERR_CONFLICT`（409）、`ERR_INTERNAL`（500）。新增错误码必须登记在本节。
- 列表端点默认分页参数 `page/size`，本模板示例项目可豁免（数据量小），豁免须写明理由。

## 5. 数据规范
- 主键：`BIGINT IDENTITY`；禁止业务字段做主键。
- 必填字段 DB 层 `NOT NULL` + 应用层 `@NotNull` 双重约束。
- 禁止物理删除业务数据；需要删除时加 `deleted_at` 软删除列（本示例项目未使用则注明"暂不需要"）。

## 6. 测试规范
- 后端：每个 service 至少一个单测；每个 controller 一个 MockMvc 集成测试。
- 前端：关键 hooks 至少一个渲染测试（可用 `@testing-library/react`）。
- 每条 EARS 验收标准必须能映射到一个可执行验证（测试、curl 命令或明确的手工步骤）。

## 7. 安全禁令（Invariant，全程恒真）
- 禁止密钥/密码入库入码：一律 `${ENV_VAR}` 注入。
- 所有写端点必须做入参校验（`@Valid`）。
- 禁止前端把内部异常堆栈展示给用户。

## 8. 完成定义（Definition of Done）
一个任务算完成，当且仅当：① 代码符合 §2/§3；② 自带验证命令通过；③ 对应 EARS 标准的验证方式可复现；④ 无 §7 违反。

## 9. ADR 记录
| 编号 | 日期 | 决策 | 理由 | 状态 |
|---|---|---|---|---|
| ADR-001 | （示例）2026-10-19 | QA 解答用关键词匹配占位，接口隔离为 AnswerProvider | 无 LLM Key 环境；后续可替换 | 已接受 |
