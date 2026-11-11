# phase-8 · task-01 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

## 验证点 1 · 全链自检

- **命令**：`pnpm verify`
- **实际输出**：`结论: 必需 6/6 通过 —— 环境就绪`；`✓ vlookup-basic.json｜1 份契约，1 通过 / 0 失败`；
  `✓ 清单校验通过：4 条（app/demo/doc）`。
- **结论**：**PASS**

## 验证点 2 · 一分钟自检（URL + 成片）

- **命令**：`curl -o /dev/null -w "%{http_code}" http://localhost:4174/src/standalone/index.html` ·
  `ffprobe out/vlookup-basic/vlookup-basic.mp4`
- **实际输出**：`showcase=200`；`codec_name=h264 + aac`、`duration=60.503991`、`size=1026293`
  （≈ ΣholdMs 60504ms）。
- **结论**：**PASS**

## 验证点 3 · 一图流与遗留清单

- **证据**：根 README「一图流」四步命令与实际命令链逐条一致（generate/plan/video/qc/
  verify/showcase 均为 package.json 实有脚本，--config/--plan 参数与用法一致）；
  [deferred.md](../../deferred.md) 8 项齐（功能欠账 6 + 仓库事务 2），覆盖移交点：
  抓窗式 intro/outro 节奏、抓窗式鼠标编排、univer/onlyoffice 模板、逐参数高亮动画、
  SUM 第二门课、口播时长微调、PR/分支整理、旧域在飞改动归属。
- **结论**：**PASS**
