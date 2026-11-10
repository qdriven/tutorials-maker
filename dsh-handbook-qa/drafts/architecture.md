---
template: doc
title: DeepSeek Harness 运行时架构 问答
subtitle: 用 Cordis 插件图理解 DeepSeek Harness：loop、Session、工具管线与策略各归其位
file: dsh-architecture-qa
cols: 3
source: DeepSeek Harness Handbook · architecture · rc.2 (b150a551 / cd5ef81)
---

DeepSeek Harness 不是"模型周围的一组工具"，而是拥有 Agent loop、durable Session 事件、工具执行与策略边界的 Agent runtime。运行时由 profile 叠加 bundle 与 patch，解析成一张 Cordis 图；插件图就是它的心智模型。

## A Agent runtime 的心智模型是什么？

在七层地图中，DeepSeek Harness 占 Agent harness/runtime 层：loop、组合、tool registry、durable events、lifecycle、policy。Model 层只产出文本、推理与 tool-call 意图，不证明 durable 状态或安全执行。Profile 叠加有序 bundle（dsh-base + web/headless）与各级 patch，解析成 Cordis 图，再挂出全部运行时职责。改配置前先跑 `dsh --profile <name> --dump-config` 查看解析后的图。源码验证的不变量：模型可见输入必须能从 Session log 重建。

```flow
Profile -> Bundles: 有序 bundle
Bundles -> Graph: dsh-base + web/headless
Patch -> Graph: profile / home / CLI patch
Graph -> Loop & Prompt & LLM
Graph -> Tools & Sessions & Policy
```

## B 一个完整 turn 如何走完生命周期？

step 是一次模型请求加它产生的工具调用；turn 含零或多个 step，runtime 不再欠工作时才关闭。被拒的首个 `agent/pre-step` 决定仍可能留下一个零 step 的 durable turn。排障看最后一个 durable 事件：无 `turn/start` 查 inbox 或唤醒，有 `tool/call` 无 `tool/result` 查审批、策略或执行。

```sequence
User -> Inbox: followup(content)
Inbox -> Driver: 唤醒
== turn 开始 ==
Driver -> Log: turn/start
Driver -> Log: step/start + user/message
Driver -> Model: 组装请求并流式调用
Model -> Log: assistant/chunk + assistant/message
== 有界工具执行 ==
Driver -> Tools: pre-execute → execute → post-execute
Tools -> Log: tool/call + tool/result
Driver -> Log: step/end
== 收尾 ==
Driver -> Log: turn/end
Log --> User: 可重放 session/event 流
```

## C Session 日志以什么格式落盘？

Session 日志是 append-only JSONL 事件流，压成 zstd 帧存储，是交互历史的唯一事实源。消息历史由日志的有序表面派生，不维护第二份可变 transcript。首帧必须保留官方 header-line 契约；小批次 append 会产生大量独立压缩帧。三类事件域各司其职：`session/event` 供重放，`agent/*` 管 live 协调，capability 域挂策略与适配器。

```tree
Session 事件 | 三个事件域
  session/event | durable 重放事实：resume · fork · transcript
    turn/* · step/* | turn 与 step 边界
    user/message · assistant/* | 模型可见消息
    tool/call · tool/result | 工具调用与结果
  agent/* | live 协调：inbox · status · steering
  fs/* · tools/* · telemetry/* | 策略与适配器挂点
```

## D Session 与长期记忆有何区别？

durable Session 重放一次交互；长期记忆才有意把选定事实搬到别的交互。rc.2 未提供通用 `ctx.memory`；第三方记忆走默认关闭的 MCP overlay，模型显式调用写入与检索工具。Compaction 只替换单个 Session 内较旧的模型可见范围，占位符带调用标识、内容 hash 与恢复指针。每次运行都要遵守的规则放 Skill 或 workspace instruction，不要指望语义检索。

| 机制 | 覆盖范围 | 模型可见性 |
|---|---|---|
| Session log | 单次交互及其 lineage | `deriveMessages()` 投影当前表面 |
| Resume / fork | 复用已验证日志或完成前缀 | 从选定的 durable 事件重建 |
| Compaction | 单个 Session | 摘要只替换选定的可见范围 |
| 长期记忆 | 可能多个 Session | 仅当工具或 prompt 策略检索 |

## E 工具调用经过怎样的执行管线？

模型只提议调用；runtime 先落 durable `tool/call`，再过 policy、审批与守卫，最后产出唯一 model-facing `tool/result`。Permission 表态，Approval 记录人对单次动作的决定，Guard 保住不可重排的拒绝，Sandbox 限制执行环境。`tools/pre-execute` 是 waterfall：不调 `next()` 的监听器能拦下所有工具（#4906）。

```flow
Model -> Log: durable tool/call
Log -> Pre: pre-execute 钩子 · 权限 · sandbox
Pre -> Approval: ask 一次性审批
Pre -> Guards: allow
Approval -> Guards: 批准一次
Approval -> Denied: 拒绝或不可用
Guards -> Denied: deny
Guards -> Execute: 放行
Denied -> Post: 跳过工具体
Execute -> Body: timeout · retry · metrics
Body -> Post: post-execute 转换
Post -> Result: normalize + finalizeContent
Result -> Log: durable tool/result
```

## F Session 写入完整性要守住哪些不变量？

重复 seq、损坏 zstd 尾部这类损坏属于写侧缺口；读侧容错只能遏制事故，不能证明修复因果正确。锁只串行化写者，不定义崩溃窗口内字节是否提交；锁、cursor 持久化、fsync 顺序要当一个特性来测。

| 写入不变量 | 状态 | 违反时的失败 |
|---|---|---|
| committed watermark 随 durable 事件前缀持久化 | ok: cursor 与事件同批提交 | no: 重启写者从陈旧内存长度推导 seq |
| 单写者跨 write 与 fsync 拥有 append 窗口 | ok: per-Session 锁 + changed-since-read | no: Web、desktop 或双 profile 写出重复 seq |
| recovery 先证明旧 executor 已死再合成 closers | ok: lease/heartbeat 存活证明 | no: 修复事件重叠活 turn 并复用 seq 空间 |

## G Session 冷开性能由什么主导？

Session 冷开成本主要由物理 zstd 帧数主导，而非 JSON 解码；实测解压约占解码路径 80%。12.7 MB 样本从 42354 帧并为 2 帧后，解压从 583 ms 降到 39 ms，存储降到 4.7 MB。这是解码路径测量，不是端到端 UI 承诺；UI 投影要单独测量。zstd level 9 约省 11% 存储、每批多约 0.9 ms，fsync 仍是主要写成本；level 15–19 只作归档策略。

```chart bar unit=ms
| 42354 帧 | 2 帧
zstd 解压 | 583 | 39
```

## H 为什么每个 Session 只能有一个写者？

一个 Session 的 append 窗口（写入与 fsync）只能有一个所有者，否则两个进程写出重复 seq。部署上避免 Web 与 desktop 写同一个可写 `DSH_HOME`。recovery 必须先证明旧 executor 已死，才能合成 `interruptedTurnClosers`。修复前停掉所有可达该 Session 的 DSH 进程，原日志与 profile 元数据保持只读。因果无法重建时，宁可新开 Session，也不做文件手术。

```flow
唯一 writer -> [(Session 日志)]: append + fsync + cursor
[(Session 日志)] -> 只读重放: resume · fork · 冷开
Web --> [(Session 日志)]: 同一 DSH_HOME 并写 → 重复 seq
Desktop --> [(Session 日志)]: 同一 DSH_HOME 并写 → 重复 seq
```
