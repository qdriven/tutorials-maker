---
template: doc
title: DeepSeek Harness 排障问答：启动 / Web / 网络 / Provider
subtitle: 按七层隔离顺序定位第一个失效边界，先收集证据，不靠重装。
file: dsh-ts-boot-web-qa
cols: 3
---

从 Process 到 Persistence 逐层找第一个失效边界，进入下一层前先收集本层证据。重装、清缓存、删除 `~/.dsh` 都不产生新证据，不要先做。

## A 排障第一步按什么顺序隔离？

每层只回答一个问题，箭头上是进入下一层前要收集的第一证据。

```flow
(排障起点) -> Process: Node 版本与完整终端错误
Process -> Surface: 打印的 URL 与终端日志
Surface -> Workspace: UI 中选中的 workspace
Workspace -> Provider: provider 名与脱敏错误
Provider -> Agent loop: turn 与 step 是否开始
Agent loop -> Tool pipeline: 操作、目标、活动策略
Tool pipeline -> Persistence: 最后的 session/event 序列
```

本页覆盖的启动、Web、Provider 网络类症状，按此表直达归属层。

| 症状 | 层 | 第一证据 |
|---|---|---|
| `dsh` 命令不启动 | Process | Node 版本与完整终端错误 |
| `npx` 安装提示冻结 | Process | Node/npm 版本、最后一行、`dsh --version` 结果 |
| Web 不打印 URL 或打不开 | Process / Surface | 打印的 URL 与终端日志 |
| 远程 Web 空白或 403 | Surface | URL、Host、Origin、`Sec-Fetch-Site`、console 错误 |
| Web 输入法不弹候选窗 | Surface | 构建版本、clean-profile A/B、composition 事件序列 |
| Composer 保持禁用 | Workspace | UI 中选中的 workspace |
| Provider 认证失败 | Provider | provider 名与脱敏错误 |
| `DeepSeek API request ... failed` | Provider | 最深 cause、Node 版本、代理需求、TLS 状态 |
| `ERR_HTTP2_INVALID_SESSION` 退出 | Provider | 完整栈、Node A/B、脱敏 provider 主机名 |
| `AbortSignal.any is not a function` | Process（运行时身份） | `process.execPath`、特性探测、`NODE_OPTIONS` |
| 上下文超限 | Provider（请求预算） | 消息 token、请求补全、模型窗口 |
| 回复语言不受控 | Provider | 新会话 A/B、回答与推理语言、生效 system-prompt 行 |

## B `npx` 卡在安装提示并看似冻结？

症状：`npx @deepseek-ai/dsh web` 打印 `Need to install` 后长时间不动；这是 npm 安装确认，不是升级迁移提示。
最先收集：Node/npm 版本、精确命令、最后一行输出、registry、`dsh --version` 是否打印过。
修复方向：回答一次确认，或改跑 `npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --version`，先证 `--version` 再跑 `web`。

仍卡时加 `--timing --loglevel=http` 找最后活动阶段；npm 10/11 解析 peer 图可 CPU 打满或 OOM，用 pnpm 做对照。
不要清空 npm 缓存，不要删除 `~/.dsh`，两者都不说明卡在哪个阶段。

## C Web 不打印 URL 或打不开？

症状：`dsh web` 无监听 URL，或 `dsh` 命令完全不启动。
最先收集：打印的 URL 与完整终端日志，再按 `--version` → `--help` → `web` → 监听 URL 的探针阶梯找第一失败点。
修复方向：`--version` 成功而 `web` 失败时，跑 `dsh --profile web --dump-config`，诊断首个 Harness 错误。
源码检出报 `--expose-internals is required for HMR service` 时，先核对 pnpm pin（`pnpm@11.7.0`）与原生 helper 探测。
不要永久改 `dsh` 脚本，不要设置 `NODE_OPTIONS=--expose-internals`。

## D 远程 Web 空白、403 或反复重连？

症状：远程页面能开但数据为空、选 workspace 返回 403，或 `[web-runtime] connection lost` 循环重连。
最先收集：DevTools 里请求 URL、`Host`、`Origin`、`Sec-Fetch-Site` 与 console 错误，加 `window.isSecureContext`。
定性：非 loopback 纯 HTTP 页面缺 secure context，typed RPC 铸 ID 依赖 `crypto.randomUUID()`，在 fetch 前抛错并中止整代连接。

403 多为扩展改写 Origin 去掉端口；`127.0.0.1` 与 `127.0.0.1:3080` 是不同 authority。
修复方向：CLI 有意拒绝 `--host 0.0.0.0`；单人用 `ssh -N -L 127.0.0.1:3080:127.0.0.1:3080` 转发后开 loopback，多设备走认证 HTTPS 网关。

## E Provider 认证或网络失败怎么分流？

症状：模型回合报 `DeepSeek API request to ... failed`（HTTP 响应前），等于 Host 到 provider 的传输失败，细节在链式 cause。
最先收集：最深 cause 代码、Node 版本、endpoint、是否强制代理、TLS 检查状态；浏览器侧 403 属 ingress，另行诊断。

| cause 或状态 | 归属边界 |
|---|---|
| `ENOTFOUND` / `EAI_AGAIN` | DNS 解析 |
| `ECONNREFUSED` / `ETIMEDOUT` | 防火墙、代理、VPN 或 endpoint |
| `SELF_SIGNED_CERT_IN_CHAIN` 等证书错 | 企业 TLS 拦截或缺信任锚 |
| HTTP 401 / 403 | 已到达 provider，查凭证、账号与策略 |
| HTTP 429 | 配额或限流，不是代理问题 |

修复方向：先跑无凭证探测 `node -e "fetch('https://api.deepseek.com').then(r => console.log('HTTP', r.status)).catch(e => console.error(e, e.cause))"`。
需要代理时设 `HTTPS_PROXY` 与含 loopback 的 `NO_PROXY`，并加 `NODE_USE_ENV_PROXY=1`。
企业 CA 用 `NODE_EXTRA_CA_CERTS` 指向 PEM，仅在进程启动时读取；绝不设置 `NODE_TLS_REJECT_UNAUTHORIZED=0`。

## F 发消息报 `AbortSignal.any is not a function`？

症状：Web 已启动、已选 workspace，发送提示词时报 `AbortSignal.any is not a function (internal)`。
定性：这是运行时身份失败，不是网络故障；该 API 自 Node 20.3.0 起存在，DSH 要求 `^22.19.0 || >=24.0.0`，支持版本都有。
最先收集：`process.execPath` 与 `typeof AbortSignal.any` 探测、运行中 DSH 进程的 `ExecutablePath`、`NODE_OPTIONS`。
修复方向：shell 探测到旧 Node 就换受支持运行时并在其下重装 CLI；DSH 进程用另一可执行文件就修 launcher 或 shim 边界。
不要 polyfill，不要补丁编译产物；这会丢失 first-abort 原因传播。

## G 上下文超限和输出上限截断有何区别？

症状：超限在生成前被拒，如 `maximum context length is 1048576 ... requested 1048728 tokens`；`Output token limit reached` 是生成后截断，`turn/end` 为 `max-tokens`，部分回答保留。
最先收集：把超限读成等式，请求预算 = 消息 token + 请求补全，对照模型窗口。
输出侧收集请求 `maxTokens`、模型输出能力与上下文剩余空间，三者取最小值。
修复方向：超限侧依次降 `maxTokens`、执行 `/compact`、开新会话接力；输出侧先归因最小上限再调整。
DeepSeek 措辞 `Input token exceed the limit` 在 rc.2 被归为 `INVALID_REQUEST`，自动压缩恢复不会运行，需手动恢复。

## H 回复语言不受控怎么办？

症状：中文提问，回答或 Think 行却是英文。
事实：DSH 不翻译任何一路输出，中文界面不强制模型语言，rc.7 出厂 persona 为空。
最先收集：同 provider/model、同 reasoning effort 下做新会话 A/B，记录回答语言、Think 行语言、生效 system-prompt 行与路由。
修复方向：单次用明确的用户语言指令；部署级 override `id: system-prompt` 行的 persona，不要插入第二个服务。
仅网关路由忽略请求时，查网关模板与角色转换；Think 行语言是独立契约，persona 不保证推理跟随。
