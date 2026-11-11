# task-04 · output（产出交接）

## 什么功能完成了

**record.mjs 双模式 + 引擎驱动层**（modes.md 脚本清单收尾）：浏览器录屏式（hot 引擎
Playwright 实时录像）与抓窗式（LibreOffice 真窗口 gdigrab + UNO 逐步真算重演）双双
实测出片；lo-paths.mjs 路径探测、uno-driver.py UNO 驱动（铺数据/真算/回读 checks）。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `scripts/recorder/record.mjs` | 浏览器录屏式/抓窗式出片（leadMs 片头裁切、TTS 挂轨、数字自检） |
| `scripts/recorder/uno-driver.py` | LibreOffice UNO 驱动：起/连桥、铺契约数据、guide 真算重演（`--pace` 逐步节奏）、checks 回读 |
| `scripts/recorder/lo-paths.mjs` | soffice/自带 python 探测 + 文件版本资源读版本（`--version` 阻塞坑规避） |

## 要点（hand-off 给下游）

1. **uno-driver 运行时**：必须用 LibreOffice 自带 python（`resolveLibreOfficePython`），
   系统 python 没有 uno 绑定；公式分隔符 UNO 用 `;`（toUnoFormula，引号内不转），
   回读比对要分隔符归一。
2. **窗口标题探测**：PowerShell 输出强制 UTF-8（GBK 控制台乱码）；过滤词用
   `LibreOffice Calc`（`LibreOffice` 会抓到启动中心窗）；gdigrab **只录目标窗**，
   不录整屏（无关内容不入片）。
3. **模式选择口径不变**：自动化一律渲染式（pitfalls #6）；抓窗式=解锁会话手动档
   （本次实测通过：真窗口 + 真算态 + 0.0% 时长偏差）；浏览器录屏式要"真实动效
   入镜"时用（0.6% 实时漂移，leadMs 裁片头）。
4. **收尾纪律**：UNO 桥 desktop.terminate 后进程可能残留——驱动/调用方补
   `taskkill /T /F`；失败路径也要杀（本次踩过）。

## 下游接线

- phase-6 完成：出片管线 build-plan → tts → render-video/record → qc 全链可跑
  （`pnpm plan`/`pnpm video`/`pnpm qc`）。
- phase-7 展示层：三份成片（render/browser/capture）可入 showcase 演示不同质感。
