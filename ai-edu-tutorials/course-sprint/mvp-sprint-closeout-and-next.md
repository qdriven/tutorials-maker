> **归档（2026-07-10）：** 本文件为早期规划草稿，**已被 `docs/project/` 取代**。
> 其「MVP Sprint 已完成」的表述过于乐观：实际 baselines 未跑、Courses 模块为占位、bundled runtime 未构建、仓库未提交。
> 现状与计划以 [`docs/project/index.md`](../docs/project/index.md) 为准。以下保留作历史参考。

# AI Edu Tutorials - MVP Sprint 总结与下一步

> 状态假设：**MVP Sprint 已完成**（按当前阶段目标视为验收通过）。

## 1) 当前进度总结（MVP 已完成）

### 1.1 产品与技术基线

- 已确定并落地桌面主栈：`Tauri 2 + Rust + React + shadcn/base-ui`。
- 已完成桌面壳基础 UX：左侧可折叠 Sidebar、模块化导航（Runtime / Courses / Baselines / Settings）。
- 已完成 OpenMAIC 集成路径从 dev 启动模式向 bundled runtime 模式迁移。

### 1.2 运行时与打包能力

- 已提供一键开发启动：`start-all.ps1`（OpenMAIC + Desktop）。
- 已提供生产运行时准备脚本：`build-openmaic-runtime.ps1`，用于构建并复制 OpenMAIC 产物到 Tauri resources。
- Rust 侧已具备 runtime 管理能力：
  - 启动 bundled runtime
  - 端口健康检查（health-check）
  - 就绪后自动打开课堂页面

### 1.3 桌面端交互与信息架构

- Runtime 模块：默认自动处理 bundled runtime，手工配置入口降级到 Advanced。
- Courses 模块：已从占位升级为功能方向入口（Course Composer / Quiz Builder）。
- Baselines 模块：保留 OpenMAIC / DeepTutor 运行基线入口与说明。

### 1.4 文档与工程治理

- 已建立项目标准文档目录（`docs/project`）及 issue/task 记录。
- 探索文档（exploring/notes/plan）已同步到 Tauri + Rust 路线与当前仓库路径。
- 项目边界明确：不直接 fork/改造 OpenMAIC-Project 作为主壳，不并入外部源码仓。

---

## 2) MVP Sprint 产出清单（交付视角）

- Desktop 壳工程可运行，可承载 OpenMAIC 课堂入口。
- 打包链路具备基础可行性（runtime 资源打包思路与脚本已落地）。
- UI 已具备“课程编排/考题能力”后续扩展的模块入口与页面框架。
- 具备下一 Sprint 的工程起点：可直接进入“课程制作与测评闭环”。

---

## 3) 现阶段遗留与风险（进入下一阶段前需关注）

- Windows 环境下 OpenMAIC 部分子包脚本对 shell 兼容性敏感（如 `rm -rf`），已在脚本中规避，但需持续稳定性验证。
- OpenMAIC standalone 产物复制体量较大，需在 CI 或构建机上确认拷贝耗时与稳定性边界。
- 课程制作链路目前仍以 OpenMAIC 能力为主，Desktop 端尚未形成完整“向导式”操作闭环。

---

## 4) 下一步要做什么（Next Sprint 执行计划）

## 目标

将“能打开课堂的桌面壳”升级为“可创建课程并完成考题评估闭环的桌面应用”。

## 4.1 Sprint 目标拆解

1. **课程创建向导 V1（Course Composer）**
   - 输入主题/目标人群/时长
   - 生成课程大纲与场景序列
   - 支持手工调整场景顺序与结构

2. **题库与测评向导 V1（Quiz Builder）**
   - 每个场景配置题目（选择/问答/任务）
   - 设置评分规则与通过阈值
   - 接入 OpenMAIC 评分/评估接口形成反馈闭环

3. **课程包导入导出**
   - 支持课程包结构定义（manifest）
   - 支持导出/导入（本地文件）用于复用与分享

4. **运行时交付增强**
   - 完成 bundled runtime 全链路验证（构建、打包、启动、健康检查）
   - 提升异常可观测性（错误提示、日志落盘、恢复路径）

## 4.2 建议执行顺序

- 第 1 周：课程创建向导 V1（可跑通最短路径）
- 第 2 周：Quiz Builder V1 + 评分闭环
- 第 3 周：课程包导入导出 + 运行时稳定性强化

## 4.3 验收标准（Next Sprint）

- 用户可在 Desktop 内完成：创建课程 -> 编排场景 -> 添加题目 -> 启动课堂 -> 查看评分反馈。
- 默认安装后无需额外配置即可打开 bundled runtime 并进入课堂。
- 关键失败场景具备明确错误提示与恢复建议。

---

## 5) 推荐立即开工的任务

- 建立 `course-manifest` 数据结构草案（JSON schema + sample）。
- 在 `Courses` 模块内实现“创建课程”向导第一页（课程元信息）。
- 对接 OpenMAIC 课程生成与测评相关 API，先打通最小 happy path。
- 补充《课程制作 SOP（面向非技术用户）》并嵌入桌面应用帮助入口。

---

## 6) 结论

MVP Sprint 目标可视为完成：桌面壳、运行时集成、模块框架、工程文档均已到位。  
下一阶段重点应从“基础可运行”转向“课程生产力”，优先实现课程编排与考题闭环，形成真正可交付的教学产品体验。

