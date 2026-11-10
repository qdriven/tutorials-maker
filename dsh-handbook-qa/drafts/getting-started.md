---
template: doc
title: DeepSeek Harness 入门与安装 问答
subtitle: 八个问答覆盖 DSH 定位、quickstart、安装拓扑、DSH_HOME、模型接入、SDK 与 headless、升级回滚、图片输入
file: dsh-getting-started-qa
cols: 3
---

Lead: DeepSeek Harness（命令 `dsh`）是 DeepSeek AI 开源的 tool-using Agent 运行时，不是模型、API 代理或固定编码助手。入门主线：`npx @deepseek-ai/dsh web` 跑通首例，再按目标选安装拓扑、配 provider、隔离 `DSH_HOME`。

## A DSH 是什么？和模型、API、框架有何区别？

DSH 把模型适配器、工具、Session、策略、沙箱、子 Agent 和接口组合成可替换的 Cordis 插件。框架帮你组装 Agent；harness 让 Agent 的效果、状态、失败路径可治理。

| 层 | 职责 | 典型问题 |
|---|---|---|
| Model | 把消息变成生成输出或工具调用 | 哪个模型推理这个任务？ |
| Provider API | 认证、路由、流式传输模型请求 | 哪个端点和凭据服务它？ |
| Harness | 跑 Agent loop，治理工具、状态、接口 | Agent 能做什么、记住什么、暴露什么？ |

调用 DeepSeek 模型不等于得到持久 Agent；harness 补上模型外围的执行契约。运行时从 profile 启动：profile 叠加有序 bundle，再应用 profile、home、命令行补丁。本机查看实际插件图：

```sh
dsh --profile web --dump-config
```

DSH 不是新 DeepSeek 模型；审批与沙箱是两个独立控制；developer preview 下配置与接口可能跨版本破坏。

## B 五分钟 quickstart 怎么跑？

```callout warn 开发者预览
首次任务放在一次性仓库；不要把密钥贴进对话；接受每条审批前先读一遍。
```

1. 安装当前版 Node.js，在目标仓库根目录运行 `npx @deepseek-ai/dsh web`，默认地址 `http://127.0.0.1:3080`。
2. 打开 Settings → Models，填入 provider 的 API key 并保存；用带消费上限的独立 key。
3. 选择 Choose workspace，加入并选中启动目录；新 UI 故意不预选工作区。
4. 发送有界任务：`Inspect this repository without changing files. Summarize its purpose, list its main packages, and cite the files that support each conclusion.`
5. 核对四个成功信号：浏览器收到流式响应；答案引用工作区真实文件；会话在回答后仍可见；无静默授予写或命令权限。

排障先分层：浏览器连不上看终端进程与打印的 URL；composer 禁用看选中工作区；认证报错看模型路由和 key。

## C 安装方式怎么选？

官方坐标：npm 包 `@deepseek-ai/dsh`，可执行文件 `dsh`；2026-08-28 核验时 npm `latest` 为 `0.1.1-rc.2`。GitHub 已发布 `dsh-v0.1.2-alpha.1`，但 npm 精确查询该版本返回 `E404`：GitHub Release 不等于 npm 制品。仓库根是 pnpm workspace，`npm install github:...` 复现不了官方多包发布管线。

```flow
(start) -> {评估目标?}
{评估目标?} -> npx 临时执行: 首次有界评估
{评估目标?} -> 项目本地精确依赖: 要 lockfile 与可重复
{评估目标?} -> 源码 checkout: 开发上游或测预发布
{评估目标?} -> 全局安装: 要常驻 shell 命令
```

| 拓扑 | 命令 | 代价 |
|---|---|---|
| npx 临时执行 | `npx @deepseek-ai/dsh@0.1.1-rc.2 web` | 最小安装；npx 缓存不是部署清单 |
| 项目本地依赖 | `npm install --save-exact @deepseek-ai/dsh@0.1.1-rc.2` | 版本记入 manifest 与 lockfile |
| 源码 checkout | `git checkout <commit>` 后 `pnpm install && pnpm run build && pnpm dsh web` | 测的是源码构建，不是发布包 |
| 全局安装 | 包管理器全局 bin | 最方便，来源最难追溯 |

执行前先验包：`npm view @deepseek-ai/dsh name version dist-tags repository.url bin --json`。源码拓扑有两个变体：Synology NAS 源码部署要 Node `^22.19.0 || >=24.0.0`、`pnpm@11.7.0` 和 cwd 稳定 wrapper；air-gapped 离线构建在快照无 `.git` 时用 `DSH_CLIENT_COMMIT_HASH` 提交号代替 `git rev-parse`。

## D DSH_HOME 状态与可执行文件是什么关系？

状态与可执行文件分离：profile 位于 `$DSH_HOME/profiles/<name>`，改安装方式不会自动得到干净状态。profile 由四层按序合成：

1. 已安装 bundle 补丁，按 profile manifest 顺序；
2. profile 自身 `cordis.patch.yml`；
3. home 级 `$DSH_HOME/cordis.patch.yml`；
4. 命令行 `--patch` 覆盖。

```tree
$DSH_HOME
  profiles
    web
      package.json | profile 插件依赖
      pnpm-lock.yaml | 依赖闭包锁定
      cordis.patch.yml | profile 级补丁
  cordis.patch.yml | home 级共享补丁
  .credentials.yaml | 密钥存储
  settings.yaml | 设置与 provider 路由
```

`DSH_HOME` 尾部空格会被当作路径一部分，进程解析到另一个空数据根，UI 看似出厂重置（discussion #2153）。删状态前先打印定界值：

```sh
printf 'DSH_HOME=<%s>\n' "$DSH_HOME"
test -d "$DSH_HOME/profiles" && echo 'profiles directory present'
```

一次有效复现要三个坐标：可执行文件（路径+版本+包/源码身份）、状态（`DSH_HOME`+profile manifest+补丁）、工作区（启动目录+选中 realpath）。

## E 模型 provider 怎么配？

三条路径：DeepSeek 直连、目录 provider、自定义 OpenAI 兼容网关；key 在 UI 中是 write-only，密钥存 `$DSH_HOME/.credentials.yaml`。

| 路径 | 入口 | 要点 |
|---|---|---|
| DeepSeek 直连 | Settings → Models 的 DeepSeek 卡片 | 填 key 保存即生效，无需重启 |
| 目录 provider | Add provider | 目录提供端点、协议、模型元数据 |
| 自定义网关 | Add a custom provider | 永久小写 Provider ID、base URL、协议、至少一个模型 |

Provider ID 进入请求、Session、默认值和凭据引用；改名只能新建并删旧路由。本地 Ollama 走自定义表单：Base URL `http://127.0.0.1:11434/v1`、协议 `openai-completions`、key 留空、Model ID 填精确名（如 `qwen2.5-coder:7b`）；`localhost` 由 Harness 宿主解析，不是浏览器。常见错误 `MISSING_CREDENTIAL` 补 key，`UNKNOWN_MODEL` 选已配置模型；新 Session 用新默认模型，旧 Session 保留原选择。

## F Python SDK 与 headless Agent 怎么用？

`dsh` 是 profile 启动器而非终端聊天：`web` 起浏览器界面；`headless` 跑一个全新持久 Session，打印最后一段非空回答后退出，不开监听端口。

| 场景 | 命令/调用 | 生命周期 |
|---|---|---|
| 浏览器交互 | `dsh web` | 长驻 Host |
| 一次自动化任务 | `npx @deepseek-ai/dsh@0.1.0-rc.7 --profile headless "task"` | 单 Session 后退出 |
| 不启动看组合 | `dsh --profile web --dump-config` | 打印即退出 |
| Python 嵌入 | `DeepSeekHarness(...)` 内 `harness.run(prompt, session_id=...)` | context manager 内复用运行时 |

Python SDK 包名 `deepseek-harness-sdk`，需 Python 3.10+，自带运行时、不依赖系统 Node.js，支持 Linux x64/arm64 与 macOS 14+ Apple silicon。官方 minimal 组合用 `danger-full-access`，"不要改文件"的礼貌提示不是安全边界；无人值守时 approval fail-closed，别用全局关沙箱换通过。exit 0 表示 `turn/end` 为 completed；SDK `0.1.1rc1` 跨重启对同一 ID 调 `session/prompt` 会 `id collision`（#4954），只能换新 ID 重放历史。示例钉在 rc.2 快照，alpha.1 源码树已不含 `examples/jsonrpc-agent`。

## G 升级与回滚怎么做？

升级一次只动一个边界：CLI 包、源码 checkout、profile 插件、profile 配置、home 配置、Session 数据各有不同回滚对象。不要拿生产 profile 或不可替代 Session 当第一个升级目标。

```timeline
1 记录 | 记录当前可执行文件与版本 | command -v dsh、dsh --version、npm view
2 停写 | 停止同 DSH_HOME 所有 writer | 首个 SIGINT 开始有界优雅退出
3 备份 | 捕获已知良好组合 | dump-config 与 profile、home 文件
4 隔离测试 | 一次性 DSH_HOME 测目标 | 元数据审查后才 clean boot
5 对比 | 比较 resolved graph | 只接受能解释的行变化
6 门禁 | 跑兼容性门禁 | 权限、工具、Session、插件逐项
7 晋级/回滚 | 晋级精确工件，失败恢复旧态 | 回滚后冷启动复现旧信号才算数
```

晋级通过测试的精确工件，不用事后解析的移动 tag。rc.2 → alpha.1 有五个独立失效面：源码产物、Bundle API、provider Settings、Session 事件、路由切换。通过一个不代表其余兼容；`CallId`→`ToolCallId` 是运行时值改名，旧插件在 Loader 激活时失败。

## H 图片输入怎么配？

前提是模型条目声明图片模态：`llm-deepseek` 用 `inputModalities: [text, image]`，自定义 provider 在 `$DSH_HOME/settings.yaml` 用 `input: [text, image]`；缺省即 text-only。声明是路由主张，不是能力测试，端点仍可能拒绝。

```yaml
- id: llm-deepseek
  name: '@deepseek-ai/dsh-llm-deepseek'
  config:
    apiKeyEnv: DEEPSEEK_API_KEY
    models:
      - id: deepseek-v4-flash-vision-exp
        inputModalities: [text, image]
        imagePixelBudget: 640000
        imageMaxBytes: 1048576
```

rc.2 请求路径：图片先归一化限额，正常经 `POST /files` 上传并发 `file_id` 块；Files 解析失败或超时则整请求重建为 base64 data URL，两种方式不混用同一请求。预算默认值：

| 设置 | 默认值 |
|---|---|
| `imagePixelBudget` | 640,000 像素 |
| `imageMaxBytes` | 1 MiB |
| `maxRequestFilesBytes` | 128 MiB |
| `maxInlineRequestImageBytes` | 20 MiB |
| `maxImagesPerRequest` | 600 张 |
| `filesApiTimeoutMs` | 60,000 ms |

超预算时最老的图片先被移除，以固定占位符表示给模型。改路由后开新 Session 验证；先用合成小图测试，日志只留元数据，不记图片字节。
