# 项目宪法（AGENTS.md / Constitution）—— Slides 教学网站

> 本文件是所有 Agent 会话的常驻上下文，任何阶段产出不得违反。

## 技术栈铁律
- 后端：Java 17 + Spring Boot 3.x + Spring Data JPA，持久化目标库为 **PostgreSQL 16**
- 前端：React 18 + TypeScript + Vite + Tailwind CSS + **shadcn/ui** + **TanStack Query**（服务端状态一律走 TanStack Query，禁止手写 useEffect 轮询）
- 构建：后端 Maven；前端 npm

## 目录约定
- 后端：`backend/src/main/java/com/example/slideslms/{entity,repository,service,controller,config}`
- 前端：`frontend/src/{components,sections,hooks,lib,types}`，页面区块放 `src/sections/`
- Ops 制品：`ops/`（constitution / spec / design / tasks）

## 禁令
- 禁止把密钥、数据库密码写入源码（用环境变量 `${DB_PASSWORD}`）
- 禁止绕过统一响应与异常包装直接返回实体（QA 接口除外，见 design.md）
- 禁止在前端组件内直接 fetch：必须经由 `src/lib/api.ts` 封装的 query hook

## 完成定义（Definition of Done）
- 后端：`mvn spring-boot:run` 可启动，JPA 自动建表，种子数据可见
- 前端：`npm run build` 通过；API 不可达时降级到内置种子数据且页面可完整交互
- 每条 EARS 验收标准至少对应一个可执行验证（接口调用或页面操作）
