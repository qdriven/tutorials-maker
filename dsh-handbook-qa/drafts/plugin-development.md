---
template: doc
title: DeepSeek Harness 插件开发 问答
subtitle: 从建第一个插件到 schema 子集、子进程安全、Session 事件与图片结果卡的 8 问
file: dsh-plugin-dev-qa
cols: 3
---

插件是可信 Host 代码：先在源码检出里用 overlay 验证，再打 bundle 装进隔离 profile。工具要守 schema 强制子集与异步子进程契约，自定义事件别进核心 Session 日志。

## A 第一个插件怎么建、打包、安装？

先克隆官方仓库 `deepseek-ai/deepseek-harness`，`pnpm install` 后 `pnpm run build`，并记录 commit。插件靠 `apply(ctx)` 贡献能力，写 `cordis.yml` overlay 用 `pnpm dsh web --patch ./scratch-plugin/cordis.yml` 验证。成功标志是终端打出 `[hello-plugin] loaded`；改成工具时用 `defineTool` 注册并声明 `inject = ['tools']`。打包后装入隔离 profile，先 `--dump-config` 看到 bundle 层和 insert 行再启动。Windows 报 `ERR_UNSUPPORTED_ESM_URL_SCHEME` 时，用 `pathToFileURL()` 生成 `file://` URL 填进 overlay。

```tree
hello-plugin/
  package.json | 声明 dsh.bundle.patch 指向 cordis.patch.yml
  cordis.patch.yml | 组合层，insert 一行插件
  index.js | 导出 name 与 apply(ctx)
```

```sh
dsh plugin --profile plugin-lab add ./hello-plugin
dsh --profile plugin-lab --dump-config
dsh --profile plugin-lab
dsh plugin --profile plugin-lab remove dsh-hello-plugin
```

```callout warn 插件是可信 Host 代码
它以 dsh 进程权限运行在 Agent 沙箱外。审查每个依赖与安装脚本，用一次性 profile，Git 依赖钉到 commit。
```

## B 工具 schema 的强制子集限制什么？

rc.8 有两套表示：`defineTool()` 的统一 DSL，与输出、Code Mode、subagent 共用的原始 JSON Schema 子集。`type` 只能是单个字符串，数组一律被拒；`oneOf` 按『恰好一个分支匹配』校验。

- 显式 DSL 对象必须声明 `additionalProperties: true` 或 `false`；隐式参数根开放，写 `false` 会被拒。
- 词表外关键词（`anyOf`、`pattern`、`format`、数值边界）不静默忽略，注册直接失败。
- 表达不了的规则放 `execute()` 开头校验，返回结构化的 `INVALID_ARGS`。

| 写法 | 状态 | 原因 |
|---|---|---|
| `type: ['string', 'null']` | no | type 必须是单个字符串 |
| `oneOf: [{type:'string'},{type:'null'}]` | ok | 区分默认与显式 null |
| `oneOf: [{type:'number'},{type:'integer'}]` | no | 整数同时命中两个分支 |
| 显式 DSL 对象省略 `additionalProperties` | no | 必须显式 true 或 false |
| 参数根写 `additionalProperties: false` | no | 隐式根开放，只许 true 或省略 |
| 原始对象省略 `additionalProperties` | ok | 省略即开放，false 才关闭 |
| `pattern`、`format`、数值边界 | no | 词表外，改在 execute() 校验 |

## C 插件里怎么安全跑子进程？

工具体内禁止 `spawnSync`、`execSync`、`execFileSync`：它们阻塞 Host 事件循环。取消、超时、Session 持久化回调与 Web 请求会全部冻结，官方报告过 Host 永久无响应。有界输出改 `execFile`，长输出改异步 `spawn` 并消费每个管道。组合提供 `ctx.subprocess` 时优先用它：argv 永不 shell 解释，终止按进程树执行。转发 `exec.signal`，别把模型或用户输入拼进 shell 命令串。

```diff
- const out = spawnSync('git', ['status'], { cwd })
- return out.stdout.toString()
+ const { stdout, stderr } = await execFileAsync('git', ['status', '--short'], {
+   cwd: args.cwd,
+   maxBuffer: 512 * 1024,
+   signal: exec.signal,
+   windowsHide: true,
+ })
```

## D 自定义 Session 事件怎么不破坏 resume？

树外插件直接 `session.append()` 自定义类型，冷加载会拒绝整个 Session。报错片段是 unknown to this harness and not marked ignorable；重装插件救不回来。声明合并只改本地 TS 编译，读端用生成的 `KNOWN_SESSION_EVENT_TYPES`；alpha.1 起连 `ignorable` 标记也删了。一个不兼容产物还能连锁拖垮 SQLite `session_search`，包成 `SESSION_QUERY_PERSISTENCE_FAILED`。信息类事件存插件自有、按 Session ID 键控的仓库；禁改 known-event-types.ts，禁删活日志里的事件。

## E 工具结果卡里怎么渲染图片？

模型侧 `output.render` 与 Web 侧结果卡是两份契约，返回 image 块不等于页面出像素。工具先把图片字节经附件服务保存，canonical 结果里保留附件引用。`render` 返回 `{ type: 'text' }` 加 `{ type: 'image', attachment }`，供视觉模型消费。Web 端按精确 wire 工具名注册 `tool.call.toolview` 槽，只认自己契约内的工具名。字节只走 Session 授权的 `session.attachment` 通道；卸载时撤销 object URL 并中止读取。

```ts
ctx.slots.inject('tool.call.toolview', () =>
  ctx.slots.register({
    name: 'tool.call.toolview',
    key: 'generate_image',
  }, GenerateImageToolRow),
)
```

```tree
plugin bundle
  host entry | 工具注册、图片请求、附件保存与 canonical 结果
  client entry | 精确工具名注册、结果解析、授权图片视图
```

## F Install Doctor 怎么用？

它把三个事实变成有界诊断计划：操作系统、安装来源（官方 npm、镜像或源码）、最早失败的环节。全程在浏览器运行，不上传配置、凭据、路径或日志。它能路由 npm `ETARGET`、engine 不匹配、源码构建退出码为零却无产物、CLI 不出版本号等。在失败发生的同一 shell 里逐条跑命令，结果与预期信号不符就停。每次只改一个边界；它不执行命令，也不是官方 DeepSeek AI 安装器。

## G hooks 桥接插件怎么装不踩坑？

`@deepseek-ai/dsh-hooks-claude-code` 与 `@deepseek-ai/dsh-hooks-codex` 把既有 hooks.json 映射到 Harness 拦截点。启动报 Cannot find package '@deepseek-ai/dsh-hook-protocol' 是 peer 未显式安装，profile 禁用了自动装 peer。桥与协议必须同线精确版本一起装，npm `latest` 指向旧 `0.0.1` 线，不能信 dist-tag。`configPath` 用绝对路径；加载时只读一次，改文件要重启，相对路径按进程启动目录解析。桥只支持子集，加载成功不等于策略等价。

```sh
dsh plugin --profile headless add \
  @deepseek-ai/dsh-hooks-codex@0.1.0-rc.8 \
  @deepseek-ai/dsh-hook-protocol@0.1.0-rc.8
```

| Codex 事件 | Harness 拦截点 |
|---|---|
| SessionStart | agent/session-start |
| UserPromptSubmit | agent/pre-step |
| PreToolUse | tools/pre-execute |
| PostToolUse | tools/post-execute |
| Stop | agent/turn-stopping |

## H Web UI 客户端插件怎么长期维护？

持久单元是独立安装的双面包：Host 入口进组合，client 入口声明 `dsh.client.platform: "web"`。写码前用 `cordis_inspect what:"client"` 查 SlotMap 目录，槽位键别按可见文本猜。`conversation.input.model` 是 `single` 槽，新注册会遮蔽官方选择器，必须实现完整控件。`./package.json` 导出不可省；client 产物是挂到 `window.__ModuleLoader__` 的 CJS loader factory。rc.2 的 Code 卡按 `run_code` 精确名字硬编码 TypeScript，树外工具用 keyed tool view，别抢保留名；Typert 生成器只认 workspace 内 `packages/` 目录，树外包要在 pinned 检出里暂存生成。
