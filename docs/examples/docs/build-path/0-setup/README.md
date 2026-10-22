# 0-setup — dogic monorepo 起步(dsh desktop shell,默认形态)

> 对应 `tasks/dogic/README.md` Task 1。目标:搭出 dogic 的第一个 monorepo——
> 基于 **dsh desktop version 的 shell**(Electron 宿主拉起 DeepSeek Harness Web UI),
> **基本是默认情况**(不接模型网关、不做 UI 定制、不改 dsh 行为)。
> 本文给出选型结论 + 可照执行的详细搭建步骤。

---

## 0. 结论(TL;DR)

| 决策项 | 结论 |
| --- | --- |
| 蓝本 | **`labs/magpie-dsh` 的 monorepo 部分**(`apps/desktop` + `packages/harness-runtime`) |
| 工程化参考 | `labs/dsh-innateos`(electron-vite + TypeScript + portable 打包),起步后再升级 |
| 包管理 | pnpm workspace(与 innate-fe-base 一致,本机已有 pnpm 12.11.2) |
| 起步范围 | `apps/desktop`(Electron 薄壳)+ `packages/harness-runtime`(拉起 dsh)两个包 |
| DSH_HOME | 默认用用户真实 `~/.dsh`(= "默认情况"),预留 `DOGIC_DSH_HOME` 覆盖 |
| magpie 网关 | **不在起步范围**,留作后续可选包 `packages/model-gateway` |
| innate-fe-base | 起步只取**主题 token**(经 orca-ui 已验证路线);组件库/webshell 为后续阶段 |
| 新仓位置 | `D:\workspace\dogic` 本身即 monorepo 根(docs/ 保留,新增 apps/ packages/) |

一句话:把 `labs/magpie-dsh` 中已实测跑通的「Electron 壳 → 拉起 dsh web → 加载认证 URL」
链路,以最小形态移植进 dogic 新仓,去掉实验资产与 magpie 依赖,作为一切插件化的地基。

---

## 1. 为什么选 `labs/magpie-dsh`

### 1.1 三个候选实现对比

| 维度 | `labs/magpie-dsh` | `labs/dsh-innateos` | `labs/innate-ws` |
| --- | --- | --- | --- |
| 形态 | Electron 薄壳,**启动即加载 dsh Web UI** | Electron 控制台(总览/模型/工具页),点按钮再开 Harness 窗口 | 纯 Node HTTP 服务 + 自研插件内核,**无 Electron、无 dsh** |
| 与 dsh-desktop 对齐度 | 完全一致:宿主不建第二 Agent runtime / 业务前端 | 部分:宿主自建 React 管理前端 | 不对齐:走自研内核路线 |
| 核心代码量 | ~576 行(main 191 + harness-runtime 196 + model-gateway 135) | ~1230 行(TS,含 React 宿主 UI) | kernel/sdk/shell 全套自研,量最大 |
| 实测状态 | **端到端跑通**(dev 链路,含冷/热启动计时) | dev + Windows portable 打包已验证 | 单测通过,无桌面形态 |
| 壳层可替换性 | `bootBackend()` 壳层无关,另有 Tauri 骨架 | 与 electron-vite 耦合 | N/A |
| innate-fe-base 关联 | **已实证**:orca-ui 主题 token 逐字取自 fe-base `packages/ui/src/themes/*.css` | 无 | 无 |
| 已知坑沉淀 | 8 条,全部实测记录(见 §6) | 打包 AV 锁定绕行方案 | — |

### 1.2 选型理由

1. **形态吻合 Task 1**:dogic 第一步要的就是 dsh-desktop 的「宿主 + 上游 Harness Web UI」
   默认形态。magpie-dsh 的壳是最薄的——启动进度页 → 就绪后整个窗口切到 dsh Web UI,
   没有任何多余自建前端,正是"基本是默认情况"。
2. **起步成本最低**:核心链路代码不足 400 行(不含 model-gateway),且已经端到端实测,
   所有坑都有记录和现成解法,照抄就能跑。
3. **插件化路线已被它预演**:magpie-dsh 的 `packages/orca-ui` 证明了 dogic 想要的
   「menu/toolbar 插件模式」如何在 dsh(Cordis 插件框架)上落地——工具栏/面板/设置
   三个贡献点注册表(`window.InnateUI`)已设计并冒烟通过。dogic 的插件层直接沿此路线。
4. **innate-fe-base 复用有现成路径**:orca-ui 已经把 fe-base 的 linear/notion 主题 token
   搬进 dsh Web UI 并验证生效,起步阶段零成本继承这条路径。
5. **壳层无关,后路宽**:`bootBackend()` 下沉在 `packages/harness-runtime`,不绑定 Electron。
   dogic 后续若要用 innate-fe-base 的 webshell 做第二壳/管理页,后端链路原样复用。

### 1.3 另两个 lab 的取舍

- **`dsh-innateos`**:工程质量最好(TS strict、electron-vite、typecheck、portable 打包绕行
  安全软件锁定),**但**它的宿主 UI 是"管理控制台"形态,与"默认壳直接进 Harness"相悖;
  且它与 innate-fe-base 没有既有复用路径。→ 不做蓝本,但其工程化实践(TS + electron-vite
  + 打包)列入后续升级步骤(见 §8)。
- **`innate-ws`**:是"自研插件内核"路线的探路仓(DI 容器/生命周期/插件格式规范文档齐全),
  连 dsh 都没接。dogic 的插件系统明确走 **dsh/Cordis 插件轨道**(harness plugin 模式),
  不自研内核。→ 不做蓝本,其 `docs/plugin-format.md` 留作插件契约设计的对照参考。

---

## 2. innate-fe-base 在 dogic 中的使用规划

`base/innate-fe-base`(symlink → `D:\innate-spark\base\innate-fe-base`)是前端基础仓:
pnpm monorepo,TanStack Router + Vite 的 webshell、`@innate/ui`(shadcn/ui + Tailwind v4)、
domain/iframe 双轨插件协议、Bun 写的 innate-fe-cli。它**不进 dogic 的依赖树**,按三条
轨道渐进取用:

| 阶段 | 取什么 | 怎么取 | 依据 |
| --- | --- | --- | --- |
| 起步(本文) | 主题 token(linear/notion × 明暗) | 从 `packages/ui/src/themes/*.css` 同步进 dogic 宿主插件(起步可暂缓,见 §8 后续路线) | orca-ui 已逐字搬运并验证 |
| 中期 | `@innate/ui` 组件库 | 以「同步拷贝 + 版本标记」方式进 `dogic/packages/ui`(fe-base 用 Bun 构建,跨仓 workspace 引用成本高,不值得) | fe-base 自身也是全仓唯一 primitive 来源的思路 |
| 长期 | webshell 壳 / plugin-protocol(iframe 轨道) | dogic 需要自有管理页或挂独立 app 时,借它的壳与握手协议 | 双壳架构(bootBackend 壳层无关)为此留了口子 |

> 原则:dogic 的运行时前端先是 dsh Web UI 本身,innate-fe-base 是**资产供应方**,
> 不是运行时依赖。

---

## 3. dogic monorepo 目标结构(起步版)

```
dogic/                          # monorepo 根(即本仓库)
├── package.json                # pnpm workspace 根,私有
├── pnpm-workspace.yaml
├── .gitignore
├── README.md                   # 已有:dogic 总体愿景
├── docs/                       # 已有
│   ├── build-path/             # 构建路径文档(本文件所在)
│   ├── idea/  screenshot/      # 已有
├── apps/
│   └── desktop/                # @dogic/desktop — Electron 薄壳
│       ├── package.json
│       └── src/
│           ├── main/index.mjs       # 窗口 + 安全基线 + boot 编排(仅 harness)
│           ├── preload/index.mjs    # contextBridge:状态/日志路径
│           └── renderer/index.html  # 启动进度页(无框架)
└── packages/
    └── harness-runtime/        # @dogic/harness-runtime — 拉起 dsh web
        ├── package.json
        └── src/index.mjs            # HarnessRuntime(端口/authedUrl/生命周期)
```

对应蓝本文件(全部在 `labs/magpie-dsh/`):

| dogic 目标 | 蓝本来源 | 改造点 |
| --- | --- | --- |
| `packages/harness-runtime/src/index.mjs` | 同路径(196 行) | 拆掉对 `@innate/model-gateway` 的硬依赖:`bootBackend` 改名/简化为仅 harness 链路;`profileInitialized` 冷启动逻辑保留 |
| `apps/desktop/src/main/index.mjs` | 同路径(191 行) | 删 magpie 路径/wire/`INNATE_MODEL`/`innate-ui.patch.yml`;DSH_HOME 默认真实 `~/.dsh`;删截图模式(`INNATE_CAPTURE`,验证期可选保留) |
| `apps/desktop/src/preload/index.mjs` | 同路径(11 行) | 原样 |
| `apps/desktop/src/renderer/index.html` | 启动进度页 | 原样(改品牌字样) |

---

## 4. 搭建步骤

### Phase 0 — 环境准备与自检

```bash
# 0.1 工具链(本机已核实:Node 24.16.0 / pnpm 12.11.2)
node --version          # 期望 >= 20
pnpm --version

# 0.2 dsh 运行时:dsh 不是全局安装,dogic 复用 lab 里的本地 npm 工程
#    (dsh 0.2.0-rc.2,入口 lib/bin.js;后续打包时再决定是否随包分发)
ls labs/magpie-dsh/dsh/node_modules/@deepseek-ai/dsh/lib/bin.js   # 应存在

# 0.3 dsh 默认配置就绪(= "默认情况"的前提)
#    真实 ~/.dsh 已初始化且能登录/有可用模型:
#    任意终端跑一次 `dsh` 能进入会话即可(lab 已在用,通常已满足)
```

> Electron 版本约束:dsh 的 `node-addon-require-builtin` 只认编译时匹配的 Electron
> **43/44/45**。本方案固定 **electron 44.7.0**(magpie-dsh 已验证)。

### Phase 1 — 仓库骨架

```bash
cd /d/workspace/dogic

# 1.1 pnpm-workspace.yaml
cat > pnpm-workspace.yaml <<'EOF'
packages:
  - apps/*
  - packages/*
EOF

# 1.2 根 package.json
cat > package.json <<'EOF'
{
  "name": "dogic",
  "version": "0.1.0",
  "private": true,
  "description": "dogic — 可组装不同种类应用的工作台(dsh desktop shell 起步)",
  "scripts": {
    "dev": "pnpm --filter @dogic/desktop run dev",
    "build": "pnpm -r build",
    "typecheck": "pnpm -r typecheck"
  },
  "packageManager": "pnpm@12.11.2"
}
EOF

# 1.3 .gitignore(根)
cat > .gitignore <<'EOF'
node_modules/
dist/
out/
*.tsbuildinfo
pnpm-lock.yaml  # 如决定提交 lockfile 则删除此行(建议提交)
EOF
```

> dogic 根已有 `README.md` 与 `docs/`,不动。

### Phase 2 — `packages/harness-runtime`

```bash
mkdir -p packages/harness-runtime/src

cat > packages/harness-runtime/package.json <<'EOF'
{
  "name": "@dogic/harness-runtime",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./src/index.mjs",
  "exports": { ".": "./src/index.mjs" }
}
EOF
```

从 `labs/magpie-dsh/packages/harness-runtime/src/index.mjs` 复制内容,做如下改造:

1. **去掉 magpie 依赖**:`bootBackend` 里 `await import('@innate/model-gateway')`、
   `new MagpieGateway(...)`、`gateway.ensureRunning()`、`gateway.wireDsh(...)` 全部删除。
2. **简化 boot 编排**(新签名):

   ```js
   export async function bootBackend(opts) {
     // opts: { electronPath, dshEntry, dshHome, patchPaths?, log?, onPhase? }
     const port = await pickPort()
     const harness = new HarnessRuntime({ ...opts, port })
     if (!harness.profileInitialized()) {        // 冷启动:先生成 profiles/
       opts.onPhase?.('harness-init', '首次运行:初始化 Harness profile …')
       await harness.start(); await harness.stop()
     }
     opts.onPhase?.('harness', '启动 Harness Web UI …')
     await harness.start()
     opts.onPhase?.('ready', harness.url())
     return { url: harness.url(), authedUrl: harness.authedUrl, port, harness,
              stop: () => harness.stop() }
   }
   ```

3. `HarnessRuntime` 类**原样保留**——以下机制一条都不能少(全部实测结论):
   - `ELECTRON_RUN_AS_NODE=1` + electron 可执行文件 spawn dsh(裸 Node 会报
     `node-addon-require-builtin` 错误);
   - 参数形态必须是 launcher 级:`<dshEntry> --profile web [--patch p]… --no-open --port <port>`
     (`--patch` 放在 `web` 之后会被当应用参数报 unknown option);
   - 从 stdout 正则 `/dsh web:\s*(http:\/\/\S+)/` 捕获**带 token 的认证 URL**
     (裸 URL 会返回 "authentication required");
   - `waitUntilReady` 轮询认证 URL 可达(超时 120s);
   - 端口优先 43129(dsh-desktop 同款),被占则让 OS 分配。

### Phase 3 — `apps/desktop`(Electron 薄壳)

```bash
mkdir -p apps/desktop/src/{main,preload,renderer}

cat > apps/desktop/package.json <<'EOF'
{
  "name": "@dogic/desktop",
  "version": "0.1.0",
  "private": true,
  "main": "./src/main/index.mjs",
  "scripts": {
    "dev": "electron .",
    "start": "electron ."
  },
  "dependencies": {
    "@dogic/harness-runtime": "workspace:*"
  },
  "devDependencies": {
    "electron": "44.7.0"
  }
}
EOF
```

从 `labs/magpie-dsh/apps/desktop/src/` 复制三个文件,改造点:

**`src/main/index.mjs`**(基于蓝本 191 行):

1. 删除:`paths.magpie`、`paths.uiPatch`、`DESIRED_MODEL`、截图模式(`INNATE_CAPTURE` 段,约 35 行——验证期想留也行,不影响默认链路)。
2. 路径解析改为:

   ```js
   const LAB_DSH = join(DOGIC_ROOT, '..', '..', 'labs', 'magpie-dsh', 'dsh')  // 按实际相对位置
   const paths = {
     dshEntry: process.env.DOGIC_DSH_ENTRY ??
       join(LAB_DSH, 'node_modules', '@deepseek-ai', 'dsh', 'lib', 'bin.js'),
     // 默认情况:直接用用户真实 ~/.dsh(登录态/模型/插件都在);
     // 要隔离时设 DOGIC_DSH_HOME=<目录>(打包版将来默认切 userData/harness)
     dshHome: process.env.DOGIC_DSH_HOME ?? join(os.homedir(), '.dsh')
   }
   ```

3. `boot()` 只剩:

   ```js
   backend = await bootBackend({
     electronPath: process.execPath,
     dshEntry: paths.dshEntry,
     dshHome: paths.dshHome,
     patchPaths: [],                    // 默认不做任何 UI 定制
     log, onPhase: sendStatus
   })
   win.loadURL(backend.authedUrl)
   ```

4. **原样保留**的安全基线(逐条都有出处):
   - `app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion')`
     (Windows 遮挡检测致 `capturePage` 抛 UnknownVizError);
   - `contextIsolation: true` + `sandbox: true` + `nodeIntegration: false` + `webviewTag: false`;
   - `will-attach-webview` 阻止、`setWindowOpenHandler` 拒绝+外链走系统浏览器、
     `will-navigate` 只放行 harness origin 与 `file://`;
   - 单实例锁、`window-all-closed`/`before-quit` 里 `backend.stop()`(回收 dsh 子进程)。

**`src/preload/index.mjs`**:原样(11 行,`onStatus` + `getLogPath`)。

**`src/renderer/index.html`**:启动进度页原样,品牌字样换成 dogic;监听
`window.dogic?.onStatus`(与 preload 暴露名一致即可)渲染各 phase 文案。

### Phase 4 — 安装与运行验证

```bash
cd /d/workspace/dogic

# 4.1 安装
pnpm install

# 4.2 检查 electron 二进制真的下来了(npm/pnpm 偶发跳过 install 脚本)
ls node_modules/.pnpm/electron@44.7.0/node_modules/electron/dist/electron.exe \
  || (cd node_modules/.pnpm/electron@44.7.0/node_modules/electron && node install.js)

# 4.3 dev 运行(注意:如果宿主终端带有 ELECTRON_RUN_AS_NODE=1,必须先 unset,
#     否则壳本身退化成纯 Node,import electron 直接 SyntaxError)
env -u ELECTRON_RUN_AS_NODE pnpm dev
```

预期现象(对照 lab 实测):

| 时刻 | 现象 |
| --- | --- |
| 0s | 窗口打开,进度页显示 phase:`harness` |
| ~3-5s | 日志出现 `[harness] captured authenticated URL` → `[harness] ready`,窗口切入 dsh Web UI |
| 之后 | dsh Web UI 正常可用:会话列表/对话/模型均来自真实 `~/.dsh` 的默认配置 |
| 关窗 | dsh 子进程一并退出(任务管理器无残留 electron/node) |

日志同时落在 `%APPDATA%/dogic/logs/desktop.log`(蓝本同款 `app.getPath('logs')` 机制)。

### Phase 5 — 收尾

```bash
# 5.1 提交(建议提交 pnpm-lock.yaml,删掉 .gitignore 里对应行)
git add -A && git commit -m "feat: dogic monorepo 起步 — dsh desktop 默认壳(magpie-dsh 蓝本移植)"

# 5.2(可选,超出起步范围)magpie 接线:把 labs/magpie-dsh 的 packages/model-gateway
#     移植为 packages/model-gateway,并在 bootBackend 里按蓝本恢复 gateway → wire 链路
```

---

## 5. 验收清单

- [ ] `pnpm install` 成功,`electron/dist/electron.exe` 存在
- [ ] `pnpm dev` 打开窗口,5s 内加载出 dsh Web UI(URL 含 token)
- [ ] 窗口内能用 `~/.dsh` 默认模型正常对话一轮
- [ ] `logs/desktop.log` 有完整 phase 记录
- [ ] 关闭窗口后无残留 electron / dsh 子进程
- [ ] 二次启动(热启动)依旧正常(单实例锁生效:双开只聚焦已有窗口)
- [ ] 仓库结构与 §3 一致,提交进 git

---

## 6. 已知坑速查(全部来自三个 lab 的实测,搭好后遇到直接对号)

| # | 坑 | 规避(已在步骤中内置) |
| --- | --- | --- |
| 1 | dsh 用裸 Node 跑报 `node-addon-require-builtin` 错 | 一律 `ELECTRON_RUN_AS_NODE=1` + electron.exe 44.7.0(43/44/45 可用) |
| 2 | 全新 DSH_HOME 未初始化 profile 时,patch/接线写入被 0.2.x 忽略 | `profileInitialized()` 检测 → 先裸 boot 一次生成 `profiles/`(起步用真实 `~/.dsh` 则通常已初始化) |
| 3 | electron 安装后无 `dist/`(install 脚本被跳过) | Phase 4.2 手动 `node install.js` |
| 4 | 某些宿主(如 Kimi Desktop)给子进程注入 `ELECTRON_RUN_AS_NODE=1`,壳退化成 Node | dev 命令 `env -u ELECTRON_RUN_AS_NODE` |
| 5 | `dsh web` 裸 URL 返回 authentication required | 只加载 stdout 捕获的带 token URL(`authedUrl`) |
| 6 | `--patch` 放在 `web` 后报 unknown option | 保持 launcher 级参数顺序 `--profile web --patch … --no-open --port …` |
| 7 | Windows 遮挡检测致 `capturePage` 抛 UnknownVizError | `disable-features=CalculateNativeWinOcclusion`(截图验证时才相关) |
| 8 | electron-builder 解包 `default_app.asar` 被安全软件锁(EBUSY) | 打包阶段绕行方案见 `labs/dsh-innateos/tools/package-portable.mjs`(后续路线) |

---

## 7. 与 dogic 总体目标的关系

dogic 总目标(`../../README.md`):三栏插件化工作台,从 deepseek harness 插件模式起步。
本文交付的是**地基**——默认 dsh desktop 壳。其上的增量(均为后续 build-path 文档):

```
0-setup(本文)          1-plugin-shell          2-layout              …
────────────────▶      ────────────────▶       ──────────────▶
默认壳:Electron         orca-ui 式宿主插件:      三栏化:
+ dsh Web UI            工具栏/面板/设置贡献点    左:项目/会话
                        + innate-fe-base 主题    中:工作区(browser/canvas/
                                                 terminal/markdown/slides)
                                                 右:todo/指引/文档
```

## 8. 后续路线(build-path 接力)

1. **1-plugin-shell**:移植 `labs/magpie-dsh/packages/orca-ui` 为 `@dogic/ui-shell`
   (dsh 插件,`dsh plugin --profile web add` link 模式):主题 token(从
   `base/innate-fe-base/packages/ui/src/themes/*.css` 同步)+ `window.InnateUI` 风格
   贡献点注册表(toolbar/panels/settings)——dogic 的「menu/toolbar 插件」从这里长出来。
2. **2-layout**:三栏布局。利好:dsh web profile 自带 `ui-sidebar-terminal/files/browser`
   模块,右侧栏可用贡献点面板实现(todo/文档)。
3. **3-model-gateway**(可选):移植 magpie 接线包,模型统一走网关。
4. **4-engineering**:借鉴 `labs/dsh-innateos` 渐进 TS 化(electron-vite + strict),
   补 typecheck/vitest;打包(electron-builder,Windows portable 绕行方案已有)。
5. **5-fe-base 深度集成**:需要自有管理页时,借 innate-fe-base webshell / plugin-protocol
   (iframe 轨道)挂独立 app;`@innate/ui` 组件以同步拷贝方式引入 dogic。

---

## 附:事实来源

- 选型与机制:`labs/magpie-dsh/README.md`(实测记录 + 坑 1–8)、
  `packages/harness-runtime/src/index.mjs`、`apps/desktop/src/main/index.mjs`、
  `packages/orca-ui/{client.js,cordis.patch.yml}`
- 工程化参考:`labs/dsh-innateos/README.md`、`tools/package-portable.mjs`
- 自研内核对照:`labs/innate-ws/docs/{plugin-format,cli-contract}.md`
- dsh-desktop 架构依据:`tasks/personal-ws/glm-research/04-dsh-desktop.md`
- innate-fe-base:`base/innate-fe-base/README.md`、`packages/ui/src/themes/`
- 本机环境核实(2026-10-15):Node 24.16.0 / pnpm 12.11.2 / dsh 0.2.0-rc.2
  (位于 `labs/magpie-dsh/dsh/node_modules`,非全局)
