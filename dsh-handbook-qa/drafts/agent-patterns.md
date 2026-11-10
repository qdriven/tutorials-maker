---
template: doc
title: DeepSeek Harness Agent 设计模式 问答
subtitle: 从 Agent contract 到子 Agent 提问中继的八个关键问答
file: dsh-agent-patterns-qa
cols: 3
---

Agent 设计先立 contract 与最小能力面，再组合 AGENTS.md、Skill 与 subagent。指令文件只影响模型选择；硬约束要落在确定性边界上。

## A 设计一个 Agent 要先定哪些责任边界？

先写 Agent contract，再选 plugin；能力面越小，prompt 越清晰，失败越易诊断。四种安全机制不可互换：permission policy、approval、sandboxing、credentials。Done 必须对应证据：文件变更、测试通过、产出的 artifact 或 durable event。对变更要预先给出 rollback 或 cleanup 路径。

```kv
Goal: 什么具体状态应当为真
Scope: 可触达哪些 workspace、服务与数据
Evidence: 人类如何验证完成
Model route: 哪个 provider/model 满足质量与成本
Capabilities: 哪些 tool 必要、哪些不必要
Effects: 哪些调用读、写、执行、发布、删除
Control: 哪些效果需要 policy 或人工批准
Memory: 什么须在 reload、resume、fork 后存活
Failure: 该重试、询问、降级还是停止
```

## B AGENTS.md 的作用域与优先级如何决定？

加载不等于 enforced；AGENTS.md 只能确立 discovered 与 model-visible。它可影响 followed，但 enforced 须由非模型边界完成。硬性要求交给确定性控制：sandbox、approval gate、CI 状态检查。

嵌套发现由结构化 fs 的 read、write、edit 触发；shell cd 不触发。GitFlow 同理：强制点在 Git 命令执行前的 tool boundary。

```tree
指令链（优先级高到低）
  System 与 developer 指令
  直接用户请求
  $DSH_HOME/AGENTS.md | 用户全局，默认 ~/.dsh
  项目根 base | AGENTS.md、CLAUDE.md
  项目根 local overlay | AGENTS.local.md、CLAUDE.local.md
  嵌套目录指令 | 从项目根到 Session cwd
  显式加载的任务 Skill
```

## C Skill 如何被发现与调用？

project root 是最近的含 .git 祖先；monorepo 里是 Git root，不是最近的 package 目录。description 是路由面，要同时写明产出与触发条件。

- 目录 `<name>/SKILL.md` 与平面 `<name>.md` 都合法；不支持递归 `**/SKILL.md` 发现。
- 调用有两条独立路径：模型按目录选择，或用户以 `/name` 显式调用。
- frontmatter 校验 fail closed；坏字段会让 provider 丢弃该 Skill。

```tree
Skill 发现（同层内低 rank 胜出）
  project DSH | rank 100 | <projectRoot>/.dsh/skills
  project Agents | rank 200 | <projectRoot>/.agents/skills
  custom | rank 300 | 配置的自定义 Skill 目录
  user DSH | rank 400 | <dshHome>/skills
  user Agents | rank 500 | <agentsHome>/skills
  bundled | rank 600 | 配置的 bundled 目录
```

## D subagent 委派与继续的契约是什么？

委派经 ctx.subagents，多种 provider 并存，不绑定单一子进程模型。startContinuable 预留 child ID；followup 唤醒运行中的 Activation 或冷恢复；interrupt 保留未认领 inbox 消息。rc.2 对 busy child 的 pending follow-up 没有 list、单条 cancel、重排或优先级操作。因此每个 child 至多保留一条未确认 correction；处置边界要绑 parent 的 effect scope。父 Agent 本地 idle 不等于 owned work quiescent，Goal round 仍会继续触发。

| 类型 | 适用 | 生命周期 |
|---|---|---|
| one-shot | 有界独立研究或执行 | provider 返回一次即终局 |
| continuable | 接收后续消息的持久专家 | 一个 child Session 可多轮并冷恢复 |

## E continuable child 只剩 report 工具说明了什么？

这是组合与所有权故障，不是模型忘了工具名。startContinuable 的 ack 只证明 child Session 已创建，不证明 parent 常驻 preset 已组合进去。agentPresets 解析为 undefined 时，optional chaining 变成空操作，child 带合法 Session 却无继承工具。不要靠向 child 堆 plugin 修症状；那会悄悄改变 filtering 与 sandbox 语义。没有对应 tool-call 事件的工具结果，只是未验证的模型陈述。

```flow
Parent Agent -> ctx.subagents: startContinuable
ctx.subagents -> Child Session: 建 child context 与 toolFilter
Child Session -> 继承组合: 解析 agentPresets 与常驻 mount
Child Session -> 本地 setup: 注册 report 与 scoped MCP
继承组合 -> Child 工具视图: 注入继承工具
继承组合 --> 无继承分支: 解析 undefined 时空操作
无继承分支 -> Child 工具视图: 只剩 report
本地 setup -> Child 工具视图: 参与首回合快照
```

## F Ralph 的失败后继如何做到有界？

Ralph 默认 fail closed：child 未交有效 report 即 round-failed 终局。后继是全新 fresh child，收到不变 objective、最近成功 handoff 与机器可读失败标记。maxFailureSuccessors 默认 0，后继计入 maxRounds 与 maxTotalAgents 预算。provider 缺失、transport、认证这类基础设施失败不得进入后继路径。parent 取消始终获胜；workspace fingerprint 只作熔断信号，不是完成证据。

```flow
(Ralph round) -> fresh child: objective + 上次成功 handoff + failure marker
fresh child -> {report 有效?}
{report 有效?} ->|是| 返回报告或携带 handoff 前进
{report 有效?} ->|否| {普通无报告且后继与预算未超?}
{普通无报告且后继与预算未超?} ->|是| fresh child
{普通无报告且后继与预算未超?} ->|否| round-failed
round-failed -> 保留最后成功 handoff 与失败轮号
```

## G 嵌套 follow-up Session 如何安全评估？

社区项目 dsh-nested-followups 从已完成回答创建 child Session，并允许更深后代。没有插件级嵌套上限，不等于可以无限建分支；要自设深度与活跃数预算。评估从一次性 workspace 与只读父任务开始，逐层加 child、sibling 与重载。不要只看 Tree View 判断隔离；要对比 Session 事件或导出元数据。该项目独立于 DeepSeek AI，先固定版本并审查 manifest 与权限。

| 边界 | 验收检查 |
|---|---|
| Context | child 只见祖先路径，不见后续父轮次或兄弟分支 |
| Storage | child 是真实 Session，重载后仍挂在根树 |
| Authority | child 工具不宽于该 workspace 的 host policy |
| Return path | 回到父后，transcript 与 pending work 不变 |

## H 子 Agent 如何向用户提问？

rc.2 中被委派的 child 直接调用户提问接口，会在 UI 等待前以 DELEGATED_CALLER 失败。root Session 独占人机关系；提问经父中继，child 保留自己的工作上下文。需要交互式澄清时，启动前就选 continuable provider；one-shot 不会因为返回了问题而变成 continuable。child 返回结构化 clarification envelope，父校验后才呈现给用户。答案投递必须幂等；并设提问轮数、批量与过期上限。

```sequence
Child -> Parent: clarification-needed 信封
Parent -> User: ask_user_question
User --> Parent: 回答
Parent -> Child: send_message 带 questionId
Child --> Parent: settlement 通知与最终结果
```
