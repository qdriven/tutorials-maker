---
template: doc
title: DeepSeek Harness 运维与安全 问答
subtitle: 运维守住单写者 Session root，安全守住凭证、插件、Code Mode 与扣费的显式边界
file: dsh-ops-security-qa
cols: 3
---

运维上，DeepSeek Harness 只保证进程内并发安全：每个同时存活的进程要有独占的可写 Session root。安全上，凭证、社区插件、Code Mode 线程与双扣费路由各有信任边界；关闭边界要靠生效组合与出口观测证明。

## A 并发的多个 Harness 进程为什么要「一个进程一个可写 Session root」？

rc.7 运行规则：同时存活的进程各自独占一个可写 Session root；最简单边界是独立 `DSH_HOME`。每个进程用自己内存里的日志分配 `seq`，JSONL 追加不会校验别的进程是否先推进了逻辑序列。SQLite 的 `(session_id, seq)` 主键能立刻拒绝重复，但这不是成功的多写者协调。端口不同不代表存储不同，两个进程可能同时解析到默认 `~/.dsh`。必须共享一个 home 时一次只跑一个 owner：停新工作、等收尾、优雅退出、确认冷加载成功后再交接。

```flow
进程A -> 共享JSONL日志: 以游标N追加
进程B -> 共享JSONL日志: 恢复标记也写N
共享JSONL日志 -> 冷加载: 重复或间隙被拒
```

## B Session 归档、回收站、永久删除怎么做才不破坏历史？

rc.2 只支持归档：在线调 `workspace.archiveSession` RPC 即可隐藏，日志与 Workspace 槽位都保留。删除与反归档没有官方 API，回收站、恢复、清除都要按离线存储迁移处理。三个存储分工：Session 日志是权威，`session_projcache` 是可自愈的派生缓存，`workspace.json` 是协调域数据。回收站必须用唯一代目录并 no-overwrite 发布，第二次删除不能抹掉第一个恢复点。恢复是又一次离线事务：拒绝已存在的 ID，绝不合并或重编号同 ID 的两份日志。

```timeline
在线 | 归档 | workspace.archiveSession 只隐藏，日志与槽位保留
离线 | 快照 | 停全部写者，快照整个协调 root 集，先测恢复再动手
离线 | 入回收站 | 移入 `.trash/<encoded-id>/<UTC时间戳>-<随机数>/`，no-overwrite 发布并写 manifest
离线 | 恢复 | 校验 manifest 与 header，拒绝已存在 ID，不合并日志
延迟 | 清除 | 重放与备份恢复验证通过后，才按保留期 purge
```

## C token 计量的多套数字怎么读？

口径各不相同：`pressureTokens` 是最近一次请求的供应商读数，`projectedTokens` 加上表面增量做估算，`surfaceTokens` 是四字符一 token 的启发式。累计 `tokenUsage` 是各调用用量桶之和，不是当前上下文占用；UI 的组成行也只是启发式。`compaction/summary.usage` 是独立的一次供应商调用，必须当普通用量样本入账。#1886 实测三次 compaction 共漏记 48,895 token，长会话摘要成本会从累计中消失。retry 边界两侧的样本是独立尝试要相加；`dsh-v0.1.2-alpha.1` 起 `llm/retry-started` 会清空替换槽。

## D API key 明文存储挡得住谁、挡不住谁？

rc.8 把 Models 页写入的凭证明文存进 `$DSH_HOME/.credentials.yaml`，POSIX 上目录 `0700`、文件 `0600`。这些权限挡得住其他 OS 用户，挡不住同 UID 代码：`workspace-write` 只约束写，不限制读。相邻密钥加密只保护「备份含密文不含密钥」这类场景，挡不住能同时读两个文件的进程。现行最强做法是专用低权限身份：独立 OS 账户或容器，只挂目标工作区与短期低额凭证。怀疑泄露时先在供应商侧吊销；事后加密旧文件不能吊销已被复制的凭证。

```flow
group 攻击面: 另一个OS用户, 被盗备份, 磁盘整盘拷贝, 同UID进程, Agent工具
另一个OS用户 -> 0700与0600权限位: 挡住
被盗备份 -> 明文凭证文件: 暴露
磁盘整盘拷贝 -> 明文凭证文件: 暴露
同UID进程 -> 相邻密钥加密: 能读两个文件则暴露
Agent工具 -> workspace-write: 只限写不限制读
专用低权限身份 -> 身份边界: 现行最强防线
供应商侧吊销 -> 控制面: 权威且不受本地状态影响
```

## E 社区插件安装前要审计什么？

把每个社区插件当成 Host 软件供应链决策：安装脚本跑在包管理器权限，加载后的插件跑在 `dsh` 进程权限。六道门：发现、解析身份、检查工件、映射效果、隔离 profile 安装、验证并决策，不许从发现直接跳到安装。先 `npm view` 记录精确版本、`dist.integrity` 与生命周期脚本，再用 `npm pack --ignore-scripts` 检查真实发布的 tarball。安装前后各跑一次 `dsh --profile plugin-lab --dump-config` 并 diff，在启动前发现被禁用或替换的核心行。一次只装一个，用一次性 profile 与工作区；星标、下载量、安装成功都不是安全审查。

| 审计项 | 结论 | 说明 |
|---|---|---|
| `npm view <package>@<version>` 记录版本与 `dist.integrity` | ok | 同时记录仓库 URL 与 `preinstall`、`postinstall` 脚本 |
| `npm pack --ignore-scripts` 后检查 tarball | ok | 审查对象是发布物，不是仓库源码 |
| 读 `cordis.patch.yml` 映射九类边界效果 | ok | 从 services 到 lifecycle 逐类过 |
| 安装前后 `--dump-config` diff | ok | 启动前发现核心行漂移 |
| 只看仓库源码就放行 | no | 安装对象是 `dist.integrity` 指向的 tarball |
| 生产 profile 当第一个安装目标 | no | 用无生产凭证的一次性 profile |
| 一次安装多个插件 | no | 首次启动失败无法归因 |
| 工具名没变就当后端没变 | no | mirage-dsh 曾禁用 fs/bash 供应者并插入替身 |
| 星标、下载量当审查结论 | no | 只证明被发现，不证明安全 |
| Git 依赖不钉完整 commit | warn | 用 `github:owner/repository#<full-commit-sha>` |
| 装完不测移除 | warn | `remove` 后要 diff 回已知良好配置 |

## F Code Mode 的 worker 线程为什么只能按 Host 可信对待？

`99f6f02` 修订上，Code Mode 在全新 Node worker 线程里执行模型写的 TypeScript。官方文档写明 worker 是约束手段而非安全边界：没有独立内核、UID 或网络策略。每次运行确有空环境、堆上限与超时，但这些是可靠性控制，不是 OS 隔离。SDK 调用会回到普通工具管道；程序体经 `AsyncFunction` 执行，不过 `ctx.sandbox.confine(...)`。未设 `DSH_TOOLS_MODE` 时默认 `native`；要开 Code Mode，就把整个 Host 放进有权威边界的 VM 或容器。

```flow
模型 -> run_code: 模型写的TypeScript
run_code -> Node worker线程: 全新线程
Node worker线程 -> SDK工具绑定: 回到策略与审批管道
Node worker线程 --> Host用户权限: 程序体不过沙箱
```

## G 怎么证明部署不会产生意外 DeepSeek 扣费？

rc.7 有两条独立的 DeepSeek 路由：模型适配器 `llm-deepseek` 与搜索供应商 `web-search-deepseek`。Settings 清空模型列表只是目录建议：适配器仍注册，搜索仍钉在 `deepseek-official`，凭证不受影响。要在 `$DSH_HOME/cordis.patch.yml` 里禁用 `llm-deepseek`、`web-search-deepseek`、`tool-web` 三行，并为 `agent-default-model` 提供已验证的替代路由。用 `dsh --profile <name> --dump-config` 核对每个 profile；`--dump-default-config` 不含用户 patch，不能作证。证据不止配置：新会话跑一次受控请求，看 DNS 或出口日志没有 `api.deepseek.com`；紧急止损先吊销供应商侧凭证。

```flow
目录可见性 -> 路由注册: models空列表只是建议
路由注册 -> 路由选择: 默认deepseek-official
路由选择 -> 凭证解析: DEEPSEEK_API_KEY
凭证解析 -> api.deepseek.com: 请求派发
```

## H workspace-write 的共享依赖缓存为什么要做成显式能力？

rc.8 的 `SandboxExecutionPolicy` 只有 `mode`、`workspaceRoot` 与可选 `sessionId`，可写根限于会话工作区、`/tmp`、`os.tmpdir()`。不存在 `extraWritableRoots` 键；共享缓存不是性能参数，而是跨工作区写能力。一个不可信工作区留下的字节，之后可能被另一个工作区解析、链接、导入或执行。更安全的设计是命名缓存资源：显式 id、Host 路径、挂载路径、共享范围与配额，这只是提案不是 rc.8 配置。今天的安全选择：缓存留在工作区内、放 `/tmp`、预构建产物只读呈现，或走受管代理。

| 生产者 → 消费者 | 决策 |
|---|---|
| 同一会话内部 | ok 私有缓存通常可接受 |
| 同工作区 → 后续会话 | ok 工作区信任与工具链稳定后可接受 |
| 同 profile 跨受信工作区 | warn 显式选择加入并加完整性与并发控制 |
| 不可信工作区 → 可信工作区 | no 拒绝共享可写复用 |
| Agent → 人工 shell | no 不假设缓存里的可执行文件安全 |
