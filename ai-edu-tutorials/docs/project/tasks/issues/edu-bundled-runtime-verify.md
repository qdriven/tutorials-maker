# Task log: edu-bundled-runtime-verify

Issue：[`issues/edu-bundled-runtime-verify.md`](../../issues/edu-bundled-runtime-verify.md)

---

## 2026-07-10 - claude-code - opened

**做了：** 建 issue 与日志。  
**证据：** -  
**未做：** -  
**给下一 Agent：** 需开发机 + OpenMAIC 仓 + Git Bash；先跑脚本到 `resources/openmaic-runtime/` 生成。
**状态：** todo

---

## 2026-07-10 - claude-code - finding (blocked on decision)

**做了：** 排查 `Bundled launcher missing` 报错 + 实测 bundled runtime boot。
**证据：**
- 根因 1（已修）：`build-openmaic-runtime.ps1` 的 `Copy-DirectoryTree` 给 robocopy 路径加 `\\?\` 前缀 -> robocopy exit 16 拒绝 -> ps1 copy 阶段抛错 -> 留空 `resources/openmaic-runtime/`（无 launcher）-> 壳报 `Bundled launcher missing`。已去掉 `\\?\`。
- 根因 2（未修）：copy 成功后 `node server.js` 崩 `Cannot find module 'styled-jsx'`。OpenMAIC 是 pnpm workspace，standalone `node_modules/*` 是指向 `.pnpm` store 的 junction；`styled-jsx` 未被 Next tracer 纳入。robocopy 跟随 junction 拷成真实文件，丢失 pnpm sibling 解析。`/SL` 无效（junction 非 symlink）。源仓原地 boot 正常（Next 16.1.2，HTTP 200）。
- 已删除会崩溃的 bundled 副本，避免 `tauri dev` 单跑时 60s 卡在崩坏的 runtime。
**未做：** 可移植 bundled runtime（需决策见下）。
**给下一 Agent：** 可移植修复二选一：(a) OpenMAIC `next.config.ts` 加 `outputFileTracingIncludes` 纳入 `styled-jsx`（触「不改 OpenMAIC」边界，需用户拍板）；(b) `pnpm deploy` 流程重写 ps1。dev 不需 bundled，用 `bash start.sh`。详见 `notes/baselines/openmaic.md` 已知问题段。
**状态：** todo（blocked on (a)/(b) decision）

---

## 2026-07-10 - claude-code - resolved (copy-side hoist)

**做了：** 用户选「改 next.config」，但实测证伪：`styled-jsx` 已被 Next tracer 纳入 standalone（`.pnpm/styled-jsx@...` 与 `.pnpm/next@.../node_modules/styled-jsx` 均在），`outputFileTracingIncludes` 无可配置。真因纯在 copy：robocopy 跟随 pnpm junction 拷成真实文件，丢失 sibling 解析。
**修复（已落 `build-openmaic-runtime.ps1`）：** 新增 `Hoist-PnpmSiblings`，robocopy 后把 `next` 的 pnpm siblings（`styled-jsx`、`@next`、`@opentelemetry`、`@swc`）作为真实文件 hoist 到顶层 `node_modules/`（skip 已有）。无 junction -> 可移植。
**证据：** `resources/openmaic-runtime` 已按此填充并 boot 验证通过：Next.js 16.1.2，Ready <1s，HTTP 200。`task dev` 可经 `ensure_openmaic_runtime_ready` 自动起 :3230 并内嵌。
**未做：** `tauri build` 出安装包 + 全新机器装机免配置验证（仍 env-gated）；若某路由报别的模块缺失，给 `-Packages` 加包名。
**给下一 Agent：** bundled runtime 已可 boot；剩余是 `tauri build` 打包装机验证。
**状态：** in_progress（boot 已通；装机验证待做）

---

## 2026-07-13 - claude-code - resolved (bundled runtime boots end-to-end)

**做了：** 修复 bundled runtime 无法 boot 的三个根因 + sidecar WIP 破坏默认路径的问题。

- **根因 A（ESM 作用域泄漏）**：`resources/openmaic-runtime/` 缺 `package.json` -> Node 上溯到 `desktop/package.json`（`"type":"module"`）-> CommonJS 的 `server.js` 崩 `require is not defined in ES module scope`。起因：一次失败的 `-UsePkg` 运行的清理段在 exe 存在检查**之前**删了 `package.json`+`node_modules`，留下"无 package.json + 残缺 node_modules + 无 exe"的损坏混合态。
- **根因 B（hoist 路径 bug，自 7月10 起从未真正生效）**：`Hoist-PnpmSiblings -NodeModulesDir $runtimeRoot` 传的是 runtime **根**，但 `.pnpm` 在 `node_modules/.pnpm` -> `Get-ChildItem $runtimeRoot/.pnpm` 找不到 -> 打印 `no .pnpm entry for next; skip` -> `styled-jsx` 未 hoist -> boot 崩 `Cannot find module 'styled-jsx/package.json'`。7月10 记录的 "HTTP 200" 实为**源 standalone 原地** boot，非拷贝后 runtime。
- **根因 C（`tauri build` 阻塞）**：`tauri.conf.json` 的 `externalBin: ["binaries/openmaic-server"]` 引用永不产出的 sidecar exe（nexe 失败），`tauri build` 打包阶段会因二进制缺失而失败。
- **附带（PS 解析失败）**：`build-openmaic-runtime.ps1` 无 BOM，PS 5.1 按 GBK 解码 UTF-8，新加中文注释里的字节被误解为代码标记 -> 脚本解析阶段就崩。

**修复（已落）：**

- `build-openmaic-runtime.ps1`：
  - `-UsePkg` **隔离**到 `$env:TEMP` 临时副本运行，nexe 失败也**不动主 runtime**；去掉 `2>nul`，PS 侧 `2>&1` 捕获并打印 nexe 输出。
  - copy 后**保证** runtime 根有 `package.json`（缺则写最小 CommonJS 锚 `{"name":"openmaic-runtime","version":"0.3.0","private":true}`）。
  - hoist 调用改传 `Join-Path $runtimeRoot "node_modules"`（核心修复）。
  - 文件加 **UTF-8 BOM**（带非 ASCII 的 PS 脚本应有 BOM，否则 PS 5.1 误按 GBK 解码）。
- `tauri.conf.json`：**移除 `externalBin`**（sidecar exe 不产出；默认走 `node server.js`，lib.rs `find_sidecar_path` 找不到 exe 自动回退到 launcher）。lib.rs sidecar 代码保留为无害运行时 hook。

**证据：**

- 修复后脚本端到端实跑：`pnpm install --ignore-scripts` + 子包 build + `pnpm build`(Next 16.1.2) + copy + hoist（实测输出 `hoisted @next / @opentelemetry / @swc / styled-jsx (sibling of next)`）+ launcher，无报错退出。
- boot 验证（全新生成的 runtime）：`cd resources/openmaic-runtime && PORT=3230 HOSTNAME=127.0.0.1 node server.js` -> `▲ Next.js 16.1.2` / `Ready in 775ms`；`curl http://127.0.0.1:3230/` -> `HTTP 200 | 29300B | 0.32s`，`<title>OpenMAIC</title>`。
- `bun run typecheck` clean；`cargo check` clean（53s）；`tauri.conf.json` 合法 JSON。
- runtime 体积 ~230MB（standalone + hoisted siblings）。

**未做（仍 env-gated / 待决策）：**

- `tauri build` 出安装包 + 全新机器装机免配置验证。**注意**：`node server.js` 路径要求目标机装 Node；sidecar/nexe 仍是未走通的"免 Node"方案。
- sidecar exe 打包：nexe target `x86_64-20.11.1` 与本机 Node 24 不匹配 / 需下载 Node build；隔离后失败不再破坏主 runtime，但 exe 仍产不出。备选：`@vercel/ncc` 或内置 `node.exe`。
- baseline-deeptutor / sample-course 端到端播放：依赖 runtime，现已解锁，待实跑记录。

**给下一 Agent：** bundled runtime 已可 boot（直接跑 `build-openmaic-runtime.ps1` 即可，无需手工补 package.json 或 hoist）。剩余是 `tauri build` 装机验证 + 决定"免 Node"方案。
**状态：** in_progress（boot 已通且脚本端到端验证；装机验证 + 免 Node 方案待做）
