---
template: doc
title: DeepSeek Harness 参考与生态 问答
subtitle: 控制面对比、身份核验、命令速查、示例选型、只读配方、生态挑选与版本跟踪
file: dsh-reference-qa
cols: 3
---

DeepSeek Harness（DSH）是可组合的 Agent 运行时，Claude Code 与 Codex 是编码代理产品。本页 8 个问答覆盖控制面对比、身份核验、命令、示例、配方、生态与版本跟踪。

## A DSH、Claude Code、Codex 该怎么选？

该问的不是谁更聪明，而是模型、扩展、权限与状态各由谁掌控。DSH 把 profile、bundle、patch 组合成一个可检查、可替换的服务图。多数答案在"组合控制面"就选 DSH；在"仓库里用代理"就选 Claude Code 或 Codex。两层可以并用：Codex 或 Claude Code 也能开发 DSH 插件。迁移时同名概念契约不同，Session、Skill、MCP、Plugin 不能照搬配置。

| 需求场景 | DeepSeek Harness rc.8 | Claude Code | Codex |
|---|---|---|---|
| 交付 Agent 运行时，服务图可检查可替换 | ok Cordis 组合，`--dump-config` 可查 | no 产品边界固定 | no 产品边界固定 |
| 给现成代理加一个可复用工作流 | warn 需自负兼容与状态迁移 | ok Skill、hook、subagent、MCP 即可 | ok `AGENTS.md` 与 Skills 即可 |
| 受治理的编码工作区 | warn 策略面需自行组合并验证 | ok deny/ask/allow 规则与托管策略 | ok sandbox 模式与审批策略 |
| 仓库的理解、修改、测试、评审 | ok 需自行组合工具链 | ok 内置编码循环与仓库工具 | ok 跨本地与托管的仓库工作流 |

## B 怎么验证官方身份，防住同名 API 套壳？

官方坐标只有一组：GitHub 仓库 `deepseek-ai/deepseek-harness`，npm 包 `@deepseek-ai/dsh`，可执行文件 `dsh`。搜索排名与下载站不是出处；不要因为排名高就把 API key 粘进同名网站。PyPI 同名包与 PATH 上的 `dsh`，单独都不构成官方证据。

- 核验时把 owner、scope、版本、repository 声明与 release commit 放在一起比对。
- npm dist-tag 会移动；干净测试要钉住完整版本号。

| 判别点 | 官方运行时 | API 套壳或客户端 |
|---|---|---|
| 安装坐标 | ok `@deepseek-ai/dsh` | no 常为非 scope 的 npm 或 Python 包 |
| 主命令 | ok `dsh`，带 `web`、`headless` 命名 profile | warn 多为库导入或请求式 CLI |
| 产品边界 | ok 组合、工具、策略、沙箱、Session、UI | no 只处理模型请求响应 |
| 模型关系 | ok provider 是可替换适配器 | no DeepSeek API 行为即核心抽象 |

```sh
npm view @deepseek-ai/dsh name version repository.url --json
git remote get-url origin
command -v dsh && dsh --version
```

## C 最常用的命令与排查入口有哪些？

Web UI 默认开在 `http://127.0.0.1:3080`，从目标工作区目录启动。首个安全任务只读检查仓库，每条结论都要带文件路径。prompt 是指令不是安全边界；不可信任务用一次性 checkout 或容器。rc.8 日志默认是拼接的 Zstandard 帧，流式增量打包成 chunk 行。解析用 `@deepseek-ai/dsh-session` 的 `decodeStorageRecord`。

| 目标 | 命令 |
|---|---|
| 启动 Web UI | `npx @deepseek-ai/dsh web` |
| 跑单次非交互任务 | `npx @deepseek-ai/dsh --profile headless "your task"` |
| 看出厂组合 | `dsh --profile web --dump-default-config` |
| 看解析后的组合 | `dsh --profile web --dump-config` |
| 装 Python SDK | `python -m pip install deepseek-harness-sdk` |

| 症状 | 先查 |
|---|---|
| 浏览器打不开 | `dsh` 进程、打印的 URL、端口冲突 |
| 工具被拒 | 区分审批策略与沙箱强制 |
| 说做完了但状态没变 | 直接核对文件、测试、session 事件 |

## D 官方示例该从哪个入手？

示例演示不同接口与效果边界，不是可互换的模板。链接固定在 rc.2；`0.1.2-alpha.1` 源码树已没有顶层 examples 目录。示例会动真实工具、凭据与文件系统，先在一次性工作区运行。`jsonrpc-agent` 的 `minimal.cordis.yml` 当前以 `danger-full-access` 运行。headless 的最终答复不能当唯一 CI 断言，还要查退出码与文件。

```flow
(集成目标) -> {人工用浏览器?}
{人工用浏览器?} -> Web 组合: 是
{人工用浏览器?} -> {Python 进程承载?}: 否
{Python 进程承载?} -> jsonrpc-agent: 是
{Python 进程承载?} -> {长驻客户端协议?}: 否
{长驻客户端协议?} -> acp-agent: 是
{长驻客户端协议?} -> headless-agent: 否
Web 组合 -> mcp-memory & web-cordis & web-schedule
```

## E 怎么跑一个只读的 Repository Research Agent？

用自带 `headless` profile，在一次性 checkout 里跑一轮有界研究。首轮先对比 `--dump-default-config` 与 `--dump-config` 的解析结果。"不修改文件"是指令不是安全边界，组合里仍带本地工具。默认工作区沙箱不限制读取、网络与进程可见性，边界要在 runner 层强制。非空报告只证明产出了文本；再独立核对 `git status` 与常规检查。

```sh
git clone --no-hardlinks /path/to/source-repository /tmp/repository-research
cd /tmp/repository-research
npx @deepseek-ai/dsh --profile headless --dump-config
npx @deepseek-ai/dsh --profile headless "Inspect this repository without editing files. Report architecture, available checks, observed failures, and evidence paths. Apart from the configured model call, do not install, publish, or use the network."
```

| 信号 | 处置 |
|---|---|
| Agent 请求审批 | 不要自动批准，先决定是否扩大契约 |
| `SANDBOX_UNAVAILABLE` | 停止；不是普通权限拒绝 |
| checkout 出现变更 | 保留 diff，丢弃该工作区 |
| 进程不退出 | 在 runner 边界终止，检查 session 事件 |

## F Awesome 生态资源怎么按能力挑选？

按要解决的问题挑，不按热度装；条目是线索不是信任背书。装前读 manifest、权限、安装脚本与最近提交。判定分三态：catalog-only、source-linked、在你 profile 里验证过。装进一次性 profile，跑一个有界任务，对比基线并测卸载回滚。

```tree
DSH 生态 | 按能力挑选，装前核验
  发现与创作 | dsh-plugin-dev · dsh-plugin-skills · dsh-find-plugins · dsh-context-doctor
  记忆与恢复 | dsh-session-health · dsh-backup · dsh-rewind · dsh-chat-import
  执行与路由 | dsh-deep-research · dsh-llm-fallbacks · dsh-agent-budget
  UI 与外部工具 | dsh-mobile · dsh-paseo · dsh-plugin-translation
  安全与校验 | dsh-security-audit · dsh-plugin-check · dsh-tool-schema
```

| 目标 | 起步 | 基线可观察后再加 |
|---|---|---|
| 同任务比较 Agent | dsh-agent-arena | dsh-context |
| 监督式多代理团队 | dsh-collaboration | dsh-background-agents |
| 研究加记忆工作流 | dsh-deep-research | dsh-memory-gate · dsh-free-web-search |
| 治理生产 profile | dsh-security-audit | dsh-plugin-check · dsh-tool-schema |

## G 版本更新与 breaking changes 怎么跟踪？

项目处于开发者预览，官方明确预期破坏性变更。重点盯 profile 组合、turn/step 事件、工具执行、provider 配置。一手来源是官方仓库的 Releases 与 Discussions。每条记录带事件日期与核验日期，别把传言标成 release。显式 models 列表要写 `inputModalities: [text, image]`，默认按纯文本。

| 版本 | 状态 | 要点 |
|---|---|---|
| dsh-v0.1.1-rc.2 | ok npm `latest` 与 `next` 均指向它 | 图片输入走 `/files` 与 `file_id`，失败回退 base64 |
| dsh-v0.1.2-alpha.1 | warn 仅 GitHub Release 与源码 tag | npm 精确查询返回 `E404` |

## H headless 运行怎么设置 reasoning effort？

rc.8 的 headless 只解析任务位置参数与 `--help`，没有 effort 旗标。档位属于共享 model route/default 系统；声明 `reasoningEfforts` 不等于选中。选中未声明的档位，会在 provider 网络 I/O 之前失败。验证要看请求头与脱敏 wire 证据，看到推理文本不算数。`--session-id`、`--model`、`--json` 尚未内建，见提案 #3518。

| 字段 | 归属 | 含义 |
|---|---|---|
| `reasoningEfforts` | 模型条目 | 声明可用档位与 wire 拼写 |
| `reasoning` | provider profile | 未指定时的部署默认档 |
| `reasoningEffort` | 已存选择或请求 | 该次 Agent 或请求选定的档 |

| 路径 | 做法 |
|---|---|
| 全局默认 | 在 Web 选档，存到同一 `DSH_HOME` 的 `settings.yaml` |
| 部署默认 | provider profile 里设 `reasoning: max` |
| 单任务隔离 | `dsh --profile headless --patch ./max-reasoning.yml "task"`，旗标在任务前 |
