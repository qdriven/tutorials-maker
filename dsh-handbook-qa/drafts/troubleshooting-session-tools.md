---
template: doc
title: DeepSeek Harness 排障问答：Session / 工具 / 插件 / Windows
subtitle: 先分层取证再动手：Session、工具、插件与 Windows 四类症状的第一证据与恢复路径
file: dsh-ts-session-tools-qa
cols: 3
---

先定位失效层，再重装或改配置：按 Process、Surface、Workspace、Provider、Agent loop、Tool pipeline、Persistence 顺序隔离。一切恢复先停写者、复制留证、在副本上实验。

## A 工作区移动后 bash 为何报 ENOENT？

**症状**：目录移动或改名后，Bash、grep、glob 全报 `spawn bash ENOENT`，而 read、edit 之类进程内工具仍正常。

**第一证据**：`command -v bash` 成功，但 Session 记录的 cwd 用 `test -d` 失败。ENOENT 报的可能是丢失的子进程工作目录，不是 bash 本体。Bash 默认 workdir 取自不可变的 Session header cwd。

**修复**：把项目完整移回记录的原路径，是最省事的续用方式。移动是有意的，就在新路径开新 Session 并交接摘要。符号链接只是兼容桥，不算迁移。

**禁止**：别拿旧 Session ID 配新 cwd，持久化会拒绝 stored/live cwd 不一致。别 `mkdir -p` 造空目录继续写，命令会在错误位置产出文件。

## B 工具卡住、Stop 无效或 spawnSync 冻结 Host 怎么办？

**症状**：Stop 已接受但下载、安装或子进程仍活着；或插件工具调 `spawnSync` 后 Web、取消、Session 刷写全部冻结。

**第一证据**：`session.cancel` 返回 `accepted: true` 只证明信号已请求，不等于工具停止。记录 cancel 响应、最后 Session 事件、进程树与 Host 健康探测，按下表分流。

| 证据 | 停在哪层 |
|---|---|
| 无 accepted，健康探测也挂 | Host 事件循环或传输被阻塞 |
| accepted 但子进程仍活 | 工具或进程未合作取消 |
| 子进程退出但调用不结算 | 插件 promise、管道或清理未关闭 |

**修复**：先解析父 PID 与命令行，只终止工具拥有的那棵进程树，别按进程名广杀。Host 事件循环冻结时，只终止核实过的 DSH Host 进程。插件侧把 `spawnSync`、`execSync`、`execFileSync` 换成异步 `execFile` 并转发 `exec.signal`；换 shell 字符串的 `exec` 只去掉阻塞，注入面仍在。下载与安装优先走后台 job 模式。

## C Agent 失控循环、花费暴涨如何止损？

**症状**：任务本该结束，Agent 仍反复搜索、重试失败工具或空转叙述，provider 用量远超预期。

**第一证据**：按序统计 `turn/start`、`step/start`、`tool/call`、`tool/result`、`user/message`。每个多出来的 turn 都要指认唤醒源：goal、用户输入，还是插件。核心循环没有聚合 `maxSteps`、`maxTurns` 或单 turn 花费上限。

**修复**：TUI 按 Esc 或 Ctrl+C 取消，前台 CLI 第二次 Ctrl+C 强制退出；确认用量曲线停止后再动证据。保留 session 日志副本，别原样恢复同一循环。取消无效就终止拥有运行时的进程并停用暴露的凭证；provider 侧配额是唯一独立硬边界。

**辅助**：`dsh plugin --profile web add dsh-budget` 装社区预算插件，默认策略是 alert，要强制须显式选 block 或 degrade。`maxParallelToolCalls`、`maxTokens`、compaction、工具超时都不约束步数与总花费。

## D 每个工具都报 UNKNOWN_TOOL、unknown tool "" 是什么坏了？

**症状**：普通聊天正常，工具全报 `UNKNOWN_TOOL`、`unknown tool ""` 或 `tool "" is disabled`。

**第一证据**：抓同一 index 的 provider 流式 delta。首包带真实 `id` 与 `function.name`，续包却带显式空值 `id: ""`、`name: ""`，Bailian `deepseek-v4-flash` 就是此形状。翻译器用 `!== undefined` 判断，空字符串照样覆盖已捕获身份，最终 `tool/call` 的 callId 与 name 为空。

**危害**：空身份会写进持久化，resume 可报 `SessionPersistenceCorruptionError`，重放可被 HTTP 400 拒绝。

**修复**：停重试，整目录复制加哈希，切到续包省略身份字段的路由。官方 DeepSeek 端点与 Bailian Qwen 是报告中的对照路由。新 Session 验证，固定可用路由与版本，等源码修复。别给空名工具放行，别放宽审批或沙箱。

## E Session「中毒」后如何恢复：无效 JSON、缺结果、重复 seq？

**症状**：同一 Session 每条后续都 400，或列表为空、报 `seq gap in committed region`。三种签名各有归属：

1. `400 INVALID_REQUEST: Unterminated string`：持久化 `tool/call` 的 `data.arguments` 不是合法 JSON，重放反复被拒。
2. `400 insufficient tool messages following tool_calls`：assistant 调用缺对应 tool result；error turn 已闭合时冷重启也不会补。
3. `corrupt session log: seq gap in committed region`：已提交区 seq 重复，两个 DSH 进程共享 Session root 是单写者违规证据。

**第一证据**：Web UI 导出 Session log 得 ZIP，根里是逻辑 `session.jsonl`，在副本上定位首个坏 seq。一个坏件可让整个列表消失：停 DSH 后隔离该 Session 目录，其余即恢复。resume 拒绝未知插件事件类型则属兼容层问题，先比对插件版本与 Harness 版本。

**恢复决策**：

```flow
停全部写者 -> 复制整目录并哈希: 只在副本实验
复制整目录并哈希 -> 分类损坏形状
分类损坏形状 -> {必须精确续用旧Session?}
{必须精确续用旧Session?} -> 隔离旧件开新Session: 默认，带审核摘要
{必须精确续用旧Session?} -> 只读提取副本: 只需要内容
{必须精确续用旧Session?} -> 版本感知修复: 副本上改并冷加载验证
```

**恢复顺序**：

1. 停止可写该 Session root 的所有 DSH 进程。
2. 复制完整 Session 目录，记录原件与副本哈希。
3. 导出逻辑 `session.jsonl`，定位首个坏事件的 seq。
4. 按签名分类：无效 JSON、缺 tool result、重复 seq。
5. 默认隔离加新 Session；修复只做在副本，冷加载验证通过才替换。

**禁止**：别用文本编辑器改 `.jsonl.zstd`，它是校验和 Zstandard 帧的拼接。通用 `zstd` 重压会破坏「首帧恰为一行 header」契约。别把无效参数改成 `{}`，缺结果不等于无副作用，别手写补一条 tool result。

## F profile 起不来（插件、overlay 或包损坏）按什么顺序救？

**症状**：插件或 patch 改动后 profile 无法 boot，报缺包、缺导出（如 `does not provide an export named 'CallId'`）或 `ERR_PNPM_ADDING_TO_ROOT`。

**第一证据**：`--dump-default-config` 只合 Bundle 层，`--dump-config` 再叠 profile patch、home patch 与 `--patch` overlay。两次对比即可二分坏层，配上 manifest 与 lockfile 的 diff。

| 结果 | 坏层 | 下一步 |
|---|---|---|
| 两次 dump 成功仍 boot 失败 | 插件激活、服务声明 | 保留首个 boot 栈，用干净 profile 对照 |
| default 成功、effective 失败 | profile 或 home patch | 离线解析副本，两层别同时改 |
| default 失败但 manifest 可解析 | Bundle 或模块解析 | 按序核查 Bundle 列表与依赖 |
| manifest 解析失败 | profile 元数据 | 还原已知良好 manifest 快照 |

**事实**：空或仅注释的 `cordis.patch.yml` 会解析失败，显式空层是 `[]`。rc.2 没有通用 doctor、repair 或 reset 命令。`CallId` 报错是插件按 rc.2 构建、核心已到 alpha.1（改名 `ToolCallId`）：换支持新版的插件，或在独立 profile 固定旧版 Harness。

**安全改动循环**：

1. 备份 profile 的 `package.json`、`pnpm-lock.yaml` 与两级 `cordis.patch.yml`。
2. `dsh --profile web --dump-config` 保存改动前组合。
3. 一次只装一个插件，比对 manifest 与 lockfile diff。
4. 再 dump 一次，做冷 boot 冒烟测试。
5. 任一步失败，还原捕获的已知良好状态。

## G Windows 专属边界：ACL 首冻、Web 挂起、ReplaceFileW 各查什么？

Windows 有三个平台专属症状，先按表分流再取证：

| 症状 | 失效层 | 第一证据 | 修复方向 |
|---|---|---|---|
| 首次 `workspace-write` 冻结全部 RPC | 同步 ACL 物化 | 规范根路径、树大小、首次与二次耗时 | 等首次授权完成，勿反复重启 Host |
| Web 仍监听但 HTTP 全超时 | Host 主线程稳定等待 | 监听 PID、时间戳探测、三份完整 dump | 采样后终止核实过的 PID，重启换新 Session |
| 编辑 profile 文件报 `ReplaceFileW EACCES` | 原子发布与 HMR 句柄 | 新建同目录文件成功、停 Host 后替换成功 | 停 watcher，备份后改，验证再重启 |

**ACL 首冻**：首次授权时 `materializeAclGrant()` 同步跑 `SetNamedSecurityInfoW`，ACE 急切传播会阻塞 JS 请求路径。第二次同路径调用因确定性 ACE 复用而极快。大仓库先用只含所需文件的小 worktree。

**Web 挂起**：用 `Get-NetTCPConnection` 把端口解析到确切 PID，再做固定节奏探测。`procdump64 -accepteula -ma -n 3 -s 5` 隔 5 秒取三份完整 dump，三份主线程栈相同才算稳定等待证据。dump 含 API key 与 prompt，只能加密私有保存。

**ReplaceFileW**：停 `dsh web` 的 watcher 属主，备份后编辑，`dsh --profile web --dump-config` 验证再重启冒烟。别在运行时用 `Set-Content` 活覆盖被监视文件，也别杀掉全部 `node.exe`。

## H 持久 Bash 报 PTY shell exited during startup 怎么修？

**症状**：持久 Bash 启动即退，报 `PTY shell exited during startup`；NixOS 与最小容器最常见。

**第一证据**：对比 `test -x /bin/bash` 与 `command -v bash`。持久终端后端默认绝对路径 `/bin/bash`，非 FHS 环境里 bash 在别处。one-shot bash 正常而持久失败时，查 `terminal-bash` 行而非 `tool-bash`。

**修复**：在设置里复制 preset 为用户副本，在其 `agent.cordis.yml` 的 `terminal-bash` 行加 `shellPath:`，填 `command -v bash` 的绝对路径。新 Session 里跑 `printf 'pty-ok\n'` 验证，第二次调用应保留 shell 状态。

**禁止**：别直接改 shipped preset。顶层 `tool-bash` 补丁管不到 `terminal-bash.shellPath`。别拿 `process.env.SHELL` 顶替，zsh、fish 不是等价后端。
