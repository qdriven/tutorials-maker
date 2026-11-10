---
template: doc
title: DeepSeek Harness 集成 问答
subtitle: MCP、ACP、SDK、文件透传与 OpenRouter 路由固定的 rc.2 边界一页问答
file: dsh-integrations-qa
cols: 3
---

DSH 集成先认缝再动手：MCP 是部署期插件，ACP 是 automation-only 的 stdio 协议，SDK 才有完整 Session 事件。rc.2 各缝都有硬边界，绕过边界的捷径都会引入新的信任问题。

## A 怎么给 DeepSeek Harness 加 MCP server，工具为什么没出现？

在 Cordis 组合里每个 server 加一行 `@deepseek-ai/dsh-mcp-client`：stdio 配 `command`/`args`，HTTP 配 `url`/`headers`。工具名固定为 `mcp__<serverName>__<tool>`，`web` 下的 `search` 即 `mcp__web__search`。工具不出现先查启动：`failOnStartupError` 默认 false，初连失败后 profile 照常激活但没有工具。凭据从环境变量解析，不要把真实 token 写进组合文件。验证：确认工具名出现，跑一次只读调用，停 server 看重连，销毁插件看工具消失。

```sequence
Host->MCP server: 连接（stdio 或 streamable-http）
Host->MCP server: listTools()
MCP server-->Host: 返回本代工具
Host->ctx.tools: 首轮对话前注册
== 断线 ==
note Host, MCP server: 保留最后一代注册，调用失败
Host->MCP server: 重连 500ms 起、倍增、上限 30s、共 10 次
== 预算耗尽 ==
Host->ctx.tools: 注销该 server 全部工具
```

## B ACP、MCP、SDK 三条集成缝怎么选？

ACP 供编辑器驱动 Agent，MCP 供 Agent 调外部工具，SDK 供程序消费完整 durable 事件。rc.2 的 ACP 是 automation-only，不含 token 流式、工具卡片、用量归因与 Session 恢复。`agent_message_chunk` 只投递已提交的文本块，不是 token 流。要完整事件就用 SDK，别把 ACP 提交消息当实时进度。

| 集成缝 | 方向与用途 | rc.2 状态 |
|---|---|---|
| MCP client | DSH Agent 连外部工具 server | ok 仅 tools，resources/prompts 无消费方 |
| ACP server | 编辑器经 JSON-RPC stdio 驱动 Agent | ok automation-only |
| DSH SDK | 程序消费完整 Session 事件 | ok 服务端反向请求未开 |
| ACP 转发 `mcpServers` | 编辑器把自己的 MCP 递给 DSH | no 非空即拒 |
| ACP 附件与额外目录 | 图片、音频、嵌入上下文、多工作区根 | no 一律拒绝 |
| webMCP | 浏览器页面直接暴露工具 | no 未验证 |

## C 多租户 ACP 怎么隔离，session 级 MCP 怎么做？

ACP `session/new` 的非空 `mcpServers` 一律被拒，报 `Invalid params: mcpServers is not supported`。MCP 实例是部署期 Cordis 插件，ACP Session 只能看到 Host 已注册的工具代。隔离靠部署与授权：每租户或每信任域一个子进程，Session id 不同不构成隔离。共享网关方案里，租户身份须来自认证的执行上下文，不能放进模型可见参数。rc.2 没有 per-Session close 与 resume，连接关闭会取消并释放其全部 Session。

```flow
部署组合 -> dsh-mcp-client: 启动时挂载
dsh-mcp-client -> Host 工具注册表: 注册工具代
租户客户端 -> 远端网关: 认证与配额
远端网关 -> ACP 子进程A: 每租户独占
远端网关 -> ACP 子进程B
ACP 子进程A -> Agent Session A
ACP 子进程B -> Agent Session B
ACP session/new --> 拒绝: 非空 mcpServers
```

## D ACP 权限请求怎么渲染才安全不挂起？

rc.2 的 `session/request_permission` 只带 `sessionId`、`toolCallId` 和两个一次性选项，没有工具名、参数或路径。桥不设内部期限：客户端不回应反向请求，该 prompt 一直 pending 且无 provider 报错。客户端必须终结每个请求：非交互端用机器策略，交互端设展示期限，到期返回 cancelled。只返回该请求提供的 `optionId`，不要改标成 Always allow；缺项与过期一律 fail closed。富审批卡片用自家 Session 事件的 `tool/call` 按 call id 对齐，join 缺失就退回通用提示。

## E SDK 里怎么把问题和审批接回宿主客户端？

rc.2 SDK 线路只有客户端到服务端的请求，服务端到客户端的请求是 dead capability。`ctx.userQuestions` 需要进程内 provider，缺失时 `ask_user_question` 报 `NO_PROVIDER`。提案做法：在 `initialize` 显式协商 `serverRequests` 能力，成功后服务端才注册 wire provider。问题与审批分开建模：问题回 `answers[]`，审批只回一次性 `allowed-once`，不许变 always allow。超时、畸形回应、EOF 都 fail closed；stdout 只放 JSON-RPC，UI 日志走 stderr。

## F 通用文件与 PDF/视频怎么传给模型？

rc.2 只收粘贴或拖入的栅格图片，从草稿到存取整条链路 image 专用，别放宽 `imageLimits.mediaTypes`。通用文件按钮是三个独立承诺：传输、持久化与授权、Agent 可用性，必须分别验收。PDF/视频透传在确切 route 上协商媒体类型与限额；本地不可变附件是事实源，provider 文件只是可撤销衍生品。视频证据是被采样的，Gemini 文档写默认每秒一帧，响应成功不代表看全了视频。文本模型遇图可用 vision 路由产描述信封兜底；rc.2 下同机可把文件拷进 workspace 再用授权工具读。

## G OpenRouter 的 provider 怎么固定？

rc.2 把 `openRouterRouting` 归为 withheld，compat 门直接拒绝该键，这不是 YAML 缩进问题。不要私加 `provider:` 或 `extraBody`：静默合并可能覆盖 model、messages、stream 与安全字段。可行变通：把路由存进 OpenRouter Preset，DSH 里把 `@preset/<slug>` 当 model id 配一条专用 route。Preset 只存 model 与 provider 路由字段，别放 system prompt 或工具，防止评审后的边界漂移。`order` 只是偏好；硬固定要 `only` 或关 fallback，再用 generation 记录验证实际服务方。

## H 社区插件和 SandBase 桥怎么安全接入？

`dsh-codex-ui` 是社区 Web 客户端插件，只应改客户端呈现，不应建第二会话存储或改写持久记录。所有权分界：DSH 拥有 Agent 回合、审批与工具策略，SandBase 拥有自己的 API、沙箱与凭据，桥只是 stdio 传输缝。评估动作：复制可弃 profile 安装，`--dump-config` 确认挂载，用可弃会话验证行为。回滚按 profile 范围：禁用插件、停 Host、清该 profile 的客户端缓存，别删持久 Session。SandBase 桥先绑 `127.0.0.1`，凭据放 SandBase vault，升级后重跑无害探测。
