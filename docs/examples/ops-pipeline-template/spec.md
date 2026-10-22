# spec.md —— 需求规约模板（以 Slides 教学网站为填充示例）

> 【门禁 G1】本文件须经产品/需求方人工评审通过后，才允许进入 design.md。
> 填写说明：〈尖括号〉为占位符；示例内容可直接替换。

---

## 0. 元信息

| 项 | 值 |
|---|---|
| 需求原文 | 〈粘贴一句话需求原文，一字不改〉示例：「一个 Slides 教学网站：左侧章节导航，中间为教学幻灯片展示区（上方教学内容、下方详细内容），右侧为提问区，学习者可输入问题并获得解答。后端使用 PostgreSQL 持久化课程、章节、幻灯片与问答数据。」 |
| 版本 | v1.0 |
| 状态 | 草稿 → clarify 完成 → **已评审** |
| 关联宪法 | ops/constitution.md |

## 1. 业务背景与目标

〈为什么做这个：解决谁的什么问题，成功的可观测指标是什么〉

示例：为自学场景提供一个"边翻幻灯片边提问"的最小可用学习界面；成功指标 = 学习者无需说明文档即可完成「选章节 → 翻页 → 提问 → 刷新后问答仍在」全流程。

## 2. 角色与场景（Personas）

| 角色 | 目标 | 关键场景 |
|---|---|---|
| 〈角色1〉示例：学习者 | 按章节自学并答疑 | 打开页面、切换章节、翻页、提问、回顾问答 |
| 〈角色2〉示例：内容管理员（本期不做，登记为非目标） | 维护课程内容 | — |

## 3. 统一语言（Ubiquitous Language）词汇表

| 术语 | 英文/代码名 | 定义 | 所属上下文（见 design.md §1） |
|---|---|---|---|
| 课程 | Course | 学习的顶层单位，聚合根 | 教学内容上下文 |
| 章节 | Chapter | 课程下的有序分组 | 教学内容上下文 |
| 幻灯片 | Slide | 最小学习单元：标题+教学内容+详细内容 | 教学内容上下文 |
| 问答 | QaEntry | 一次提问及其解答的持久记录 | 答疑上下文 |

> 规则：后续所有文档、代码、表名必须使用本表术语；新增术语必须先登记本表。

## 4. Schema 定义（数据契约——Spec 层即冻结语义，design 层决定物理实现）

### 4.1 实体关系总览

```
Course 1───N Chapter 1───N Slide
Course 1───N QaEntry
```

### 4.2 表级定义

**courses（课程）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, IDENTITY |  surrogate key |
| title | VARCHAR(255) | NOT NULL | 课程名 |
| description | VARCHAR(2000) | — | 简介 |

**chapters（章节）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK | |
| course_id | BIGINT | NOT NULL, FK→courses.id | |
| title | VARCHAR(255) | NOT NULL | |
| order_index | INT | NOT NULL | 章内顺序，从 1 开始 |
| — | — | UNIQUE(course_id, order_index) | 防重复序号 |

**slides（幻灯片）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK | |
| chapter_id | BIGINT | NOT NULL, FK→chapters.id | |
| title | VARCHAR(255) | NOT NULL | |
| content | VARCHAR(4000) | NOT NULL | **教学内容（展示区上方）** |
| detail | VARCHAR(8000) | — | **详细内容（展示区下方）** |
| order_index | INT | NOT NULL | 页内顺序 |

**qa_entries（问答）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK | |
| course_id | BIGINT | NOT NULL, FK→courses.id | 挂课程而非单页：降低提问门槛（业务决策，记入 design.md ADR） |
| question | VARCHAR(2000) | NOT NULL | |
| answer | VARCHAR(8000) | NOT NULL | |
| created_at | TIMESTAMP | NOT NULL | UTC |

> 索引建议（供 design 确认）：`qa_entries(course_id, created_at DESC)`；`slides(chapter_id, order_index)`。

## 5. 用户故事（业务逻辑的第一层分拆）

优先级：MoSCoW（Must/Should/Could/Won't this time）。

### US-01 浏览章节导航（Must）
作为学习者，我要在左侧看到课程的章节列表并切换，以便定位学习内容。

| 编号 | EARS 验收标准 |
|---|---|
| AC-01a | WHEN 页面加载完成 THE SYSTEM SHALL 展示首门课程的章节列表，默认选中第一个章节的第一张幻灯片 |
| AC-01b | WHEN 学习者点击某章节 THE SYSTEM SHALL 在中间区域展示该章节第一张幻灯片 |
| AC-01c | IF 课程无任何章节 THEN THE SYSTEM SHALL 在中间区域展示空态提示而非报错 |

边界情况：课程为空、章节为空、章节内无幻灯片。

### US-02 翻阅幻灯片（Must）
作为学习者，我要按页查看教学内容和详细内容，以便逐步学习。

| 编号 | EARS 验收标准 |
|---|---|
| AC-02a | WHILE 一张幻灯片被选中 THE SYSTEM SHALL 在上方区域展示其 content，在下方区域展示其 detail |
| AC-02b | WHEN 点击"下一页"且非末页 THE SYSTEM SHALL 展示 order_index 递增的下一张 |
| AC-02c | WHEN 位于首页/末页 THE SYSTEM SHALL 禁用对应翻页按钮 |

### US-03 提问并获得解答（Must）
作为学习者，我要就当前课程提问并获得解答，且记录可回顾。

| 编号 | EARS 验收标准 |
|---|---|
| AC-03a | WHEN 学习者提交非空问题 THE SYSTEM SHALL 返回一条解答，且问答持久化到 PostgreSQL |
| AC-03b | WHEN 学习者提交空白问题 THE SYSTEM SHALL 拒绝并提示（前端禁用 + 后端 400 ERR_VALIDATION 双重防护） |
| AC-03c | WHEN 页面重新加载 THE SYSTEM SHALL 展示该课程的历史问答（按时间倒序） |
| AC-03d | IF 解答引擎无法匹配 THEN THE SYSTEM SHALL 返回兜底文案而非错误 |

### US-04 离线降级（Should）
| 编号 | EARS 验收标准 |
|---|---|
| AC-04a | WHEN 后端 API 不可达 THE SYSTEM SHALL 展示内置种子课程并允许完整交互，页面不报错 |

## 6. 非功能需求
- 首屏加载 < 2s（种子数据量级）；翻页为纯前端状态切换，无网络请求。
- 并发：本期单学习者场景，不做并发控制。

## 7. 非目标（Out of Scope）
登录/权限；内容管理后台；真实 LLM 解答（AnswerProvider 占位，可替换）；移动端适配；多课程切换 UI（Schema 已支持，UI 本期只展示首门）。

## 8. Clarify 记录（需求澄清门禁的执行痕迹）

| # | 澄清问题 | 决策 | 决策人 |
|---|---|---|---|
| Q1 | "获得解答"的解答来源？ | 关键词匹配占位，接口隔离可换 LLM | （人工确认） |
| Q2 | 问答挂在 Slide 还是 Course？ | 挂 Course，降低提问摩擦 | （人工确认） |
| Q3 | 无后端环境怎么验收？ | 前端内置种子降级 + 后端 demo profile 用 H2 | （人工确认） |

> 规则：本表为空 = clarify 未执行，G1 不予通过。
