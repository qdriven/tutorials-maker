---
schemaVersion: 1.0.0
id: sprint-sql-workbench
title: SQL × Excel 对照工作台 Sprint（可行性分析与计划）
createdAt: 2026-11-10T00:00:00.000Z
updatedAt: 2026-11-10T00:00:00.000Z
status: planned
branch: main
repository: qdriven/agent-learning-workbench
sourceKind: local
sourcePath: domains/excel-interaction/docs/sprints/sprint-sql-workbench.md
issueNumber:
issueUrl:
issueState:
issueTitle:
issueUpdatedAt:
prNumber:
prUrl:
prState:
prTitle:
prUpdatedAt:
---

# SQL × Excel 对照工作台 Sprint（可行性分析与计划）

> 提案（2026-11-10，用户口述）：很多内容都和 SQL 做了比较——是否可以把 SQL 和
> Excel **放一起动画展示**？拿一个真实 SQLite 做演示，可以很方便地说明 SQL 实际上
> 比 Excel 好用。设想一个**工作台**：同时支持 SQLite 和表格，查询结果可直接生成表格。
> 本文档 = 可行性分析 + 需要做的内容（WBS）+ 分阶段计划。**status: planned，未开工**。

## 1. 需求真实性（侦察证据，2026-11-10）

- **35/44 门在架课含 SQL 类比**（grep `SQL|SELECT|GROUP BY|JOIN|WHERE` courses/*.json）；
- 其中 **12 门有"就像 SQL: …"的具体公式对照**，例如：
  - `SUMIFS` → "按客户 GROUP BY 后 COUNT/SUM/MAX 三个聚合，最后 CASE WHEN 打分层标签"；
  - `XLOOKUP` → "LEFT JOIN 商品表带价 → SELECT 数量*单价 新列 → WHERE 数量>0 校验"；
  - `IF` 标记 → "WHERE 实际>=目标 AND 实际>=1000，两个门槛都要过"；
  - `INDEX+MATCH` → "行条件 + 列条件的二维 WHERE"。

**结论**：内容侧已经在"口头对照 SQL"，缺的正是**可执行的对照演示**——本 Sprint 把
类比升级为"同一份数据，Excel 做法 vs 真跑 SQLite"的工作台。

## 2. 可行性分析

### 2.1 有利因素（4 项全部成立）

| 维度 | 结论 | 证据 |
| --- | --- | --- |
| 需求真实性 | 极强 | §1：35/44 课已打比方，钩子现成 |
| 技术可落地 | 成熟 | 浏览器内 SQLite = **sql.js**（官方 SQLite WASM 编译，~1.5MB js+wasm；`db.exec(sql)` 返回 `{columns, values}`；纯内存教学库，零持久化需求） |
| 仓库纪律兼容 | 有先例 | 出片引擎不进 pnpm-lock → **vendored 单文件**入 `templates/vendor/`（与 univer kit-src 独立 npm 项目、gsap vendored 同款姿势） |
| 管线复用度 | 高 | 打字机（35ms/字，直接打 SQL）、动作段帧序列重放（render-video task-16）、TTS 步骤卡、qc 抽帧、契约验收**全复用**；SQL 执行同步确定——同 db 同 SQL 同结果，**天然满足 motion-spec 硬约束（禁随机/禁无限循环/禁墙钟）** |

### 2.2 架构接入面（都是已验证的扩展点）

```
契约:  engine 字段三值枚举 (handsontable|univer|onlyoffice) → 加 "sqlite"
       + data 从 sheets[] 扩展为 data.sql（建表+灌数 SQL，CREATE/INSERT 幂等可重放）
DOM:   两区一卡骨架复用——左 = 步骤面板 + SQL 控制台；右 = 源数据表 + 查询结果表
验收:  checks 断言"结果表某格值/行数"——与现有逐块验收（值必验+公式按锚点分流）同构
出片:  guide 步骤 menu="输入 SQL"、formula=SQL 原文、expect=结果描述——管线零改动
生成:  new.mjs 模板拷贝 + engine 分支（templates/sqlite/ 四件套）
```

### 2.3 风险与对策（3 项）

| 风险 | 对策 |
| --- | --- |
| **行序确定性**：SQL 结果不带 ORDER BY 时行序无保证 | 契约强制**显式 ORDER BY**，check-manifest 加校验规则（查询类 checks 必含 ORDER BY 或 LIMIT 1 单行断言） |
| **双面板出片布局**：1400×900 要容纳 数据表 + SQL 框 + 结果表 | 定制 CSS（现布局"步骤面板左、表格右"）；阶段 1 的 1 门端到端即布局闸门，先于批量返工 |
| **scope 蔓延**：完整"工作台"（自由查询/多表/导出）是产品级需求 | 先用 1 门 PoC 钉死最小闭环（seed → 输入 SQL → 执行 → 结果表 → 验收 → 出片），自由查询等进阶段 3 再议 |

### 2.4 教学论点矩阵（对照课内容蓝本）

| 主题 | 已有 Excel 课 | SQL 对照卖点 |
| --- | --- | --- |
| 分组聚合 | SUMIFS/COUNTIFS 条件成对写 | `GROUP BY` 一行 |
| 多表合并 | XLOOKUP/VLOOKUP 跨表带价 | `JOIN` |
| 筛选 | IF 打标 + 筛选器 | `WHERE` |
| 排序 TopN | INDEX+MATCH+MIN 组合拳 | `ORDER BY … LIMIT` |
| 批量变更 | 逐格改、公式重算 | `UPDATE … WHERE` 一句 |
| 汇总口径 | 透视表（界面操作，难出片） | `GROUP BY` 可打字机可出片 |

## 3. 需要做的内容（WBS）

**A · 底座（模板层）**
1. vendored `sql.js`（js+wasm）→ `templates/vendor/`；
2. 新引擎模板 `templates/sqlite/`（index.html / theme.css / engine.js / lesson.js）：
   `mount` 源表 + `runSql(sql)` → 结果表渲染 + `readResult(cell)` 供验收 + SQL 打字机挂点；
3. 契约 schema 扩展（`engine:"sqlite"`、`data.sql` 必填、ORDER BY 显式校验）+
   check-manifest 加 sqlite 分支。

**B · 工作台 UI**
4. SQL 控制台组件（输入框打字机 + 执行按钮 flash + 行数 badge）；
5. 双表布局（源数据 + 查询结果）定制 CSS。

**C · 内容（对照示范课 ×3，复用已有课数据）**
6. `sql-groupby`（supply-quality 数据）：SUMIFS vs GROUP BY；
7. `sql-join`（power-query 数据）：XLOOKUP vs JOIN；
8. `sql-where`（eda 数据）：IF 标记 vs WHERE。
   每门：契约 + seed + 生成 + 真浏览器验证 + 出片 + qc。

**D · 收口**
9. recipes 加"SQL 对照"分类 + 合集卡（SQL 对照三题）；
10. 文档（本 sprint §5 执行进度 + index-log + 模板 README）+ 提交。

## 4. 分阶段计划（4 阶段，闸门制）

| 阶段 | 交付 | 验收口径 | 当量 |
| --- | --- | --- | --- |
| **0 · PoC** | 单页 demo：sql.js 跑通 CREATE/INSERT/SELECT → 结果表渲染 | 同 SQL 双次执行 + 双截帧 **md5 一致**（确定性实证）；浏览器截图目检 | 0.5 天 |
| **1 · 引擎模板（闸门）** | `templates/sqlite/` 四件套 + schema/manifest 扩展 + **1 门课端到端** | 契约校验过 → 自动播放 N 步走完 → checks 真算真回读 → **出片 + qc 全过**（双表布局在此验证，问题在此修，不带病进阶段 2） | 1 天 |
| **2 · 内容批量** | 3 门对照课 + recipes 分类/合集 | 全量回归不破（44 门存量 + 新门）+ 3 支视频 ▶ | 1 天 |
| **3 · 可选进阶** | Excel vs SQL **同屏对照模式**（同一数据两种做法并排）、`UPDATE` 变更动画、`EXPLAIN` 演示 | 按需再议 | — |

**关键取舍**：阶段 1 的"1 门端到端"是闸门——出片管线若在双表布局上出问题，
阶段 2 前就调整，避免 3 门返工。

## 5. 执行进度

| 阶段 | 状态 | 证据 |
| --- | --- | --- |
| 文档写入（可行性分析 + WBS + 计划） | ✅ 完成 | 本文档（status: planned） |
| 阶段 0 · PoC | ⏳ 待开工 | — |
| 阶段 1 · 引擎模板（闸门） | ⏳ 待开工 | — |
| 阶段 2 · 内容批量 | ⏳ 待开工 | — |
| 阶段 3 · 可选进阶 | ⏳ 待开工 | — |
