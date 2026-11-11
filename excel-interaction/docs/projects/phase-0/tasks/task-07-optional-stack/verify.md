# verify · task-07 可选组件

> 执行环境：Windows 11，2026-11-08。

### 1. Playwright 探测

- 命令：`python -m playwright --version`
- 实际输出：`Version 1.63.0`；check.mjs `[PASS] Playwright（可选）`
- 结论：**PASS**

### 2. Hyperframes 探测

- 命令：`npx --no-install hyperframes --version`
- 实际输出：`npm error npx canceled due to missing packages...`（未全局安装）；
  check.mjs `[WARN] Hyperframes（可选） → 可选缺失`
- 结论：**WARN（允许）**——可选组件缺失不阻塞；需要时 `npm install -g hyperframes@0.9.11`
  或 npx 首次联网拉取

### 3. OpenScreen 存在性探测

- 命令：`node scripts/check.mjs --only openscreen`
- 实际输出：`[PASS] OpenScreen（可选） C:\Users\anyda\AppData\Local\Microsoft\WindowsApps\openscreen.exe`
- 备注：探测用 where/which 存在性策略；`openscreen --version` 会拉起 Electron GUI
  并挂起（实测坑，已写入 scripts/README.md 与 check.mjs 注释）
- 结论：**PASS**

## 总结

2 PASS + 1 WARN（可选缺失，预期内）。可选组件现状清晰，主线（渲染式出片）不受影响。
