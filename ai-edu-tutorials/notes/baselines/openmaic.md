# Baseline: OpenMAIC

**Status:** runbook ready - run pending (env-gated)  
**Repo:** `D:\copy-modify\ai-edu\OpenMAIC`  
**Issue:** [edu-baseline-openmaic](../../docs/project/issues/edu-baseline-openmaic.md)

> 这些步骤需要开发机 + OpenMAIC 仓 + 至少一个 LLM API key。在本地实跑后回填下面的空字段。

## 前置

- Node + `pnpm`
- OpenMAIC 仓已在 `D:\copy-modify\ai-edu\OpenMAIC`
- 一个 LLM API key（OpenAI / Anthropic / 其它，看 OpenMAIC `.env.example` 支持项）

## 跑 dev 服务

```powershell
cd D:\copy-modify\ai-edu\OpenMAIC
pnpm install
cp .env.example .env.local
# 编辑 .env.local，填入至少一个 LLM API key
pnpm dev
# 打开 http://localhost:3000
```

## Windows 已知坑

- 某些子包 postinstall 用 `rm -rf`，PowerShell 下会失败。dev 下若 install 报错，改用 Git Bash 跑 `pnpm install`，或参考 `build-openmaic-runtime.ps1` 里的 `--ignore-scripts` + 显式 build 流程。
- 端口 3000 被占则改 OpenMAIC 的 port 配置。

## Sample PDF

- Path: _(填：放一份 STEM 短课 PDF，≤30 页)_
- Provider used: unpdf / MinerU _(实跑后填)_
- Result: _(抽取是否成功、章节数)_

## Classroom

- Topic: _(填)_
- Roles (teacher / peer): _(填：实际配了哪些角色，字段名)_
- Playable: yes / no _(实跑后填)_
- Notes / failures: _(记录命令、报错、绕过方法)_

## 角色字段（供 edu-roles-config 对齐）

实跑后把 OpenMAIC 实际可配的角色字段（id/name/persona/开场白/voice 等）列在这里，供 manifest `Role` 类型对齐：

1. _(待填)_

## Bundled runtime build（edu-bundled-runtime-verify）

```powershell
# 在仓库根
powershell -ExecutionPolicy Bypass -File .\build-openmaic-runtime.ps1
```

预期产物：`desktop\src-tauri\resources\openmaic-runtime\`，含 `server.js`、`.next\static`、`public`、`start-openmaic-runtime.cmd`。

验证：

```powershell
cd desktop
bun install
bun run tauri build
# 产物在 desktop\src-tauri\target\release\bundle\
```

记录：构建耗时、standalone 体积、首装后是否免配置进课堂、失败点。

- 构建耗时: ~6-8 min（`pnpm install --ignore-scripts` + 子包 build + Next 16 `pnpm build` + copy/hoist；2026-07-13 实测）
- 体积: ~230MB（`resources/openmaic-runtime/`，含 standalone + hoisted siblings）
- 安装后免配置可进课堂: 部分 — bundled runtime 已 boot（HTTP 200 on :3230），但 `node server.js` 路径要求目标机装 Node；`tauri build` 装机 + 免 Node 验证待做
- 失败点（已修，见下「已知问题」2026-07-13 段）：缺 package.json -> ESM 崩；hoist 路径 bug -> styled-jsx 崩；`externalBin` 引用缺失 sidecar -> `tauri build` 阻塞

## 已知问题（2026-07-10 排查）

`build-openmaic-runtime.ps1` 的 `Bundled launcher missing` 报错根因与后续 boot 失败：

1. **launcher 缺失（已修）**：`Copy-DirectoryTree` 用 robocopy 时给路径加了 `\\?\` 前缀，robocopy 拒绝（exit 16，"无效参数"），ps1 在 copy 阶段抛错退出，留下**空的** `resources/openmaic-runtime/`（无 server.js、无 launcher）。壳的 `start_openmaic_bundled` 见目录存在但缺 launcher → `Bundled launcher missing`。**修复**：去掉 `\\?\`（robocopy 原生支持长路径）。已提交。

2. **boot 崩溃（已修）**：即使 copy 成功 + launcher 存在，`node server.js` 崩溃：`Cannot find module 'styled-jsx/package.json'`。根因：OpenMAIC 是 pnpm workspace，Next.js standalone 产出的 `node_modules/*` 是指向 `.pnpm` store 的 **junction**；`styled-jsx` 未被 Next tracer 纳入 standalone。在源仓原地跑（junction 解析到 store 的 sibling `styled-jsx`）正常；但 robocopy 会跟随 junction 拷成真实文件，丢失 pnpm sibling 结构 → `next` 找不到 `styled-jsx`。`/SL` 无效（pnpm 用 junction 不是 symlink，robocopy 仍跟随）。
   - 源仓 standalone 原地 boot 验证通过：Next.js 16.1.2，Ready in 99ms，HTTP 200。
   - 可移植修复（二选一，均属 `edu-bundled-runtime-verify`）：
     a. 在 OpenMAIC `next.config.ts` 加 `outputFileTracingIncludes` 强制纳入 `styled-jsx`（触及 AGENTS.md「不改 OpenMAIC」边界，需用户拍板；路径 `copy-modify` 暗示可改）。
     b. 改用 `pnpm deploy` 流程产出真实文件 node_modules 后再 `next build`（ps1 重写，未验证）。
   - **dev 不需要 bundled runtime**：用 `bash start.sh` 起 OpenMAIC dev 于 `:3230`，壳直接内嵌（`ensure_openmaic_runtime_ready` 探到 3230 即用，不碰 bundled）。

   **2026-07-10 更新（已修）**：next.config 方案证伪--`styled-jsx` 已被 Next tracer 纳入 standalone（`.pnpm/styled-jsx@...` 与 `.pnpm/next@.../node_modules/styled-jsx` 均在），`outputFileTracingIncludes` 无可配置。实际修复是 **copy-side**：robocopy 后用 `Hoist-PnpmSiblings`（已落 `build-openmaic-runtime.ps1`）把 `next` 的 pnpm siblings（`styled-jsx`、`@next`、`@opentelemetry`、`@swc`）作为**真实文件** hoist 到顶层 `node_modules/`（skip 已有）。无 junction -> 可移植（survives `tauri build` 路径迁移）。验证：`resources/openmaic-runtime` boot Next 16.1.2，Ready <1s，HTTP 200。若某路由报别的模块缺失，给 `Hoist-PnpmSiblings -Packages` 加该包名（默认仅 `next`）。

   **2026-07-13 更新（hoist 路径 bug 实为从未生效，已修）**：复核发现 7月10 的 hoist 调用 `Hoist-PnpmSiblings -NodeModulesDir $runtimeRoot` 传的是 runtime **根**，而 `.pnpm` 在 `node_modules/.pnpm` -> `Get-ChildItem` 找不到 -> 静默 `skip` -> `styled-jsx` 从未真正 hoist。7月10 记的 "HTTP 200" 实为**源 standalone 原地** boot。本次另发现两个并存的 boot 阻塞：(a) runtime 根缺 `package.json`（一次失败 `-UsePkg` 清理段删的）-> Node 上溯 `desktop/package.json`（`"type":"module"`）-> `server.js` 崩 `require is not defined`；(b) `tauri.conf.json` 的 `externalBin` 引用永不产出的 sidecar exe -> `tauri build` 阻塞。修复：hoist 改传 `node_modules` 路径；`-UsePkg` 隔离到 temp 副本（失败不动主 runtime）；copy 后保证 `package.json`；ps1 加 UTF-8 BOM（PS 5.1 否则按 GBK 解码中文注释致解析崩）；移除 `externalBin`。端到端实测：脚本直跑 -> boot Next 16.1.2 Ready 775ms -> `curl :3230` HTTP 200 `<title>OpenMAIC</title>`。详见 `docs/project/tasks/issues/edu-bundled-runtime-verify.md` 2026-07-13 条。

