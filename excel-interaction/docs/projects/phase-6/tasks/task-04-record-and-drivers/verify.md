# task-04 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

## 验证点 1 · uno-driver 真算重演（LibreOffice UNO）

- **命令**：`"C:/Program Files/LibreOffice/program/python.exe" scripts/recorder/uno-driver.py --plan out/vlookup-basic/plan.json`
- **实际输出**：`{"ok": true, "replayed": [{"cell": "E2", "formula": "=VLOOKUP(D2,A2:B5,2,0)"}…],
  "results": [{"cell": "E2", "want": "王五", "got": "王五",
  "formula": "=VLOOKUP(D2;A2:B5;2;0)", "ok": true}]}` EXIT=0（桥收尾后端口无残留）。
- **结论**：**PASS**（UNO 分隔符 ';' 归一比对过；真算真回读）

## 验证点 2 · 浏览器录屏式（record.mjs --mode browser）

- **实际输出**：`✓ out/vlookup-basic/vlookup-basic-browser.mp4 流 video/h264 + audio/aac｜
  时长 17440ms vs ΣholdMs 17552ms（偏差 0.6%，<5% ✓）`。
- **结论**：**PASS**（Playwright 实时录像 + leadMs 片头裁切 + TTS 挂轨；实时节奏漂移 0.6%）

## 验证点 3 · 抓窗式（record.mjs --mode capture）

- **实际输出**：窗口标题探得 `未命名 1 — LibreOffice Calc` → gdigrab 窗口实录 →
  `UNO 重演 ✓ checks 全过` → `✓ out/vlookup-basic/vlookup-basic-capture.mp4
  流 video/h264 + audio/aac｜时长 17552ms（偏差 0.0%，<5% ✓）`。
- **抽帧目检**（qc/capture-frame.png）：真 LibreOffice 窗口、公式栏
  `=VLOOKUP(D2,A2:B5,2,0)`、E2=王五——非黑屏（pitfall #6 关注点）。
- **结论**：**PASS**（解锁会话实测；画面=真窗口+真算态，逐步鼠标编排留扩展）

## 验证点 4 · 路径探测（lo-paths.mjs）

- **证据**：resolveSoffice/resolveLibreOfficePython 命中
  `C:/Program Files/LibreOffice/program/`（soffice.exe + python.exe 带 uno 绑定实测
  `import uno` OK）；版本探测走文件版本资源（不跑阻塞的 `--version`）。
- **结论**：**PASS**

## 过程中发现并修复 4 个 bug（FAIL→修复→复验 PASS）

1. **uno 桥 30s 未就绪**：profile 相对路径拼出非法 file URI（`file:///out/...`）
   → 启动失败；改为 `Path.resolve()` 绝对路径 + 失败路径 taskkill 收尾。
2. **gdigrab 找不到窗口（乱码）**：PowerShell 输出被 GBK 控制台打成
   `δ???? 1 ? LibreOffice Calc` → 标题强制 UTF-8（`[Console]::OutputEncoding`）。
3. **探到启动中心窗**：过滤词 `LibreOffice` 匹配到标题恰为 "LibreOffice" 的
   启动中心（gdigrab -22）→ 收紧为 `LibreOffice Calc`。
4. **capture 时序 bug**：exit 监听挂在阻塞的 gdigrab 之后（驱动先结束则 mux 不执行）
   → Promise 先行挂上、await 后再合成。

## 总结

4/4 PASS（4 bug 修复闭环）；modes.md 出片管线 4 脚本 + 驱动层全落位且各有实测。
