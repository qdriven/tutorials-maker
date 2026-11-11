# 出片坑位表

历史踩坑记录（旧域 skill-log 实测沉淀）。新脚本实现时逐条对照。

| # | 坑 | 现象 | 对策 |
| --- | --- | --- | --- |
| 1 | OpenScreen 注解黑块 | 页面注解/批注渲染成黑块进视频 | 规避注解特性；字幕改用 ffmpeg `drawtext` 叠加 |
| 2 | `openscreen --version` 挂起 | Electron GUI 起来不退出，探测卡死 | GUI 工具只做存在性探测（where/which），不跑 `--version` |
| 3 | `.cmd` 垫片不能直接 spawn | Node ≥18.20 EINVAL（CVE-2024-27980） | 解析真实 exe（`where` 候选排序 .exe > .cmd/shell）；pnpm/npx 尤甚 |
| 4 | concat 尾帧 | ffmpeg concat 尾帧重复/丢失一帧 | 显式 `-f concat` 清单 + 每段独立时长核对 |
| 5 | ffmpeg 不在 PATH | 合成直接失败；choco 装的在私有目录 | `scripts/check.mjs` 先行自检；choco 路径 `C:/ProgramData/chocolatey/lib/ffmpeg-full/tools/ffmpeg/bin/` |
| 6 | GUI 录制挂锁屏 | 抓窗式录到黑屏/静止 | 抓窗式只在解锁会话跑；自动化一律渲染式 |
| 7 | 语音时长没驱动节奏 | 先定帧数后塞语音 → 字幕与画面错位 | 严格 build-plan 顺序：先 TTS 后定时长（见 tts.md） |

## 探测类通用规则（与 scripts/probe.mjs 同源结论）

- 命令退出码必须检查（npx 报错文本但 exit≠0 = 未安装）。
- 慢启动工具（pnpm 冷启 4s+）超时 ≠ 缺失，按"已安装但响应慢"处理（probe 超时 20s）。
- WindowsApps 商店执行别名 `existsSync` 为 false，只能 where/which 探。
