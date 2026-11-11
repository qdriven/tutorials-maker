# verify · task-01 初始化脚本

> 按 task.md 的验证点逐条记录。执行环境：Windows 11，2026-11-08。

### 1. check.mjs 跑通 + 状态一致 + 退出码正确

- 命令：`node scripts/check.mjs`（在 domains/excel-interaction/ 下）
- 实际输出（最终版）：
  ```
  [PASS] Node.js（必需）        v24.15.0
  [PASS] pnpm（必需）           12.14.0
  [PASS] bun（可选）            1.3.6
  [PASS] Python 3（必需）       python · Python 3.14.7
  [PASS] ffmpeg（必需）         ffmpeg version 8.0-full_build-www.gyan.dev
  [PASS] ffprobe（必需）        ffprobe version 8.0-full_build-www.gyan.dev
  [PASS] edge-tts（可选）       python -m edge_tts · edge-tts 7.3.1
  [PASS] 表格引擎（必需）       LibreOffice · C:/Program Files/LibreOffice/program/soffice.exe
  [PASS] Playwright（可选）     python -m playwright · Version 1.63.0
  [WARN] Hyperframes（可选）    → 可选缺失（npx 未全局安装）
  [PASS] OpenScreen（可选）     C:\Users\anyda\AppData\Local\Microsoft\WindowsApps\openscreen.exe
  结论: 必需 6/6 通过 —— 环境就绪
  ```
- 退出码：0（必需 6/6）；与人工核对（node -v / pnpm -v / ffmpeg -version / soffice 路径）一致
- 结论：**PASS**

### 2. install.mjs dry-run 无副作用 + --list / --help 可用

- 命令：`node scripts/install.mjs`（默认 dry-run）
- 实际输出：打印 11 项安装计划（winget 探测到；`python -m pip install --user edge-tts`、
  `npm install -g pnpm@latest` 等），无任何执行行为；`--list` 输出组件命令表；
  `--help` 输出用法。OpenScreen 标"跳过 —— 手动安装"。
- 结论：**PASS**

### 3. bun 运行时兼容

- 命令：`bun scripts/check.mjs --only node,bun`
- 实际输出：`[PASS] Node.js v24.16.0`、`[PASS] bun 1.3.6`，结论 exit 0——同一份 .mjs 在 bun 下行为一致
- 结论：**PASS**

### 4. --json 可解析

- 命令：`node scripts/check.mjs --json | node -e "JSON.parse(require('fs').readFileSync(0,'utf8')); console.log('json ok')"`
- 实际输出：`json ok`
- 结论：**PASS**

### 5. 已知坑处理正确（开发中发现并修复 3 个 bug）

- **Bug 1：Windows `.cmd` 垫片探测失败**（pnpm 假阴性）。`where pnpm` 首行是
  `node.cmd`/`pnpm.cmd` 直 spawn 报 EINVAL（Node ≥18.20 安全限制 CVE-2024-27980），
  无扩展名 sh 垫片则不可执行。修复：候选排序（.exe > .cmd/.bat > 跳过无扩展名）+
  `.cmd` 经 shell 执行。复跑 pnpm 12.14.0 PASS。
- **Bug 2：商店执行别名探不到**（OpenScreen 假阴性）。`existsSync(WindowsApps\openscreen.exe)`
  返回 false（别名是重解析点）。修复：存在性探针改走 where/which。复跑 OpenScreen PASS。
- **Bug 3：退出码未检查**（Hyperframes 假阳性）。`npx --no-install` 找不到包仍输出
  "npm error…" 但被判 PASS。修复：`r.status !== 0` → found:false。复跑 Hyperframes 正确 WARN。
- 另修：install.mjs 可选标签重复（"（可选）（可选）"）。
- 命令：复跑 `node scripts/check.mjs` + `node scripts/install.mjs` 全部符合预期
- 结论：**PASS**

## 总结

验证点 5/5 PASS。两个初始化脚本功能完整、双运行时、三平台策略齐备；
开发过程的 3 个 Windows 特有 bug 已修复并留档（见 index-log #2）。
