# 无废话 Excel 教程（Excel Interaction）

> 无废话 Excel 教程——一个函数一节课：动画演示 + 分步讲解 + 动手练习，30 秒讲清。
> 从零构建，按 phase 推进，全程文档化。

## 做什么

把 Excel 教程做成**契约驱动的实机教程**：一份课程配置同时产出——

1. **交互动画课**：可练习、可验收的实机教程（公式真算真回读、4 步指南对齐）；
2. **无废话讲解视频**：TTS 配音、语音时长驱动节奏的演示 mp4。

与旧域 `excel-animation` 的关系：**从零新做，不搬旧实现**；旧域作为参考资产
（其 [docs/skill-log](../excel-animation/docs/skill-log/) 积累了 skill 实测记录与坑位）。

## 怎么做（构建方式总览）

构建方法论见 **[build-method.md](docs/build-method.md)**，三条核心：

1. **任务分解模式**：项目 → phase（＝ build-checklist 一个阶段）→ task（可单独执行的最小交付）；
   每个 task 带三件套——task.md（计划）/ verify.md（证据）/ output.md（交接）。
2. **记录保存方式**：index-log.md 按实践顺序记执行流水（append-only）；
   计划/证据/交接/流水四类载体分工明确。
3. **验证保存方式**：verify.md 逐验证点记录（命令 + 实际输出 + 结论），数字说话，FAIL 也记；
   全部验证点 PASS 才算 task 完成。

## Phase 总览（对齐 build-checklist）

| Phase | 目录 | 做什么 | 状态 |
| --- | --- | --- | --- |
| 0 | [phase-0/](docs/projects/phase-0/) | 环境配置（工具链 + 初始化脚本） | ✅ 已执行 |
| 1 | [phase-1/](docs/projects/phase-1/) | 目录骨架（五层结构 + workspace） | ✅ 已执行 |
| 2 | [phase-2/](docs/projects/phase-2/) | 技能层（skill + 引擎模板） | ✅ 已执行 |
| 3 | [phase-3/](docs/projects/phase-3/) | 契约层（courses/ 试点课） | ✅ 已执行 |
| 4 | [phase-4/](docs/projects/phase-4/) | 流水线层（生成/校验脚本）＋ 模板实现 | ✅ 已执行（含 5 合并里程碑） |
| 5 | [phase-5/](docs/projects/phase-5/) | 生成动画课（试点出课） | ✅ 已执行（併入 phase-4） |
| 6 | [phase-6/](docs/projects/phase-6/) | 出片（视频 + TTS） | ✅ 已执行（试点课三式出片） |
| 7 | [phase-7/](docs/projects/phase-7/) | 展示层（standalone web + 登记） | ✅ 已执行 |
| 8 | [phase-8/](docs/projects/phase-8/) | 记录与收尾 | ✅ 已执行（收尾） |

## 一图流：契约 → 生成 → 出片 → 登记

```
courses/<id>.json ──► apps/<id>/ ──► out/<id>/<id>.mp4 ──► src/data/tutorials.json
     ①契约              ②生成            ③出片                 ④登记（自动）
```

```bash
# ① 契约：courses/<id>.json 按 contract-schema.md 写（单源双产物的事实源）
# ② 生成：出交互动画课（自动 upsert 展示层 app 条目）
pnpm generate -- --id <id> --config courses/<id>.json --force
# ③ 出片：录制计划 + TTS → 渲染合成 → 抽帧质检（成品自动落 public/showcase/ + upsert demo 条目）
pnpm plan -- --config courses/<id>.json --tts edge
pnpm video -- --plan out/<id>/plan.json
pnpm qc -- --plan out/<id>/plan.json
# ④ 登记/展示：清单校验（并入 pnpm verify）+ showcase 页查看
pnpm verify
pnpm showcase      # → http://localhost:4174/src/standalone/index.html
```

## 文档导航

- [docs/README.md](docs/README.md) —— 文档组织说明（projects/ 执行过程 · modules/ 模块功能）
- [docs/index.md](docs/index.md) —— 文档索引（全部文档的清单）
- [docs/build-method.md](docs/build-method.md) —— 整体构建方式
- [docs/projects/index-log.md](docs/projects/index-log.md) —— 执行流水（按实践顺序）
- [docs/projects/phase-8/deferred.md](docs/projects/phase-8/deferred.md) —— 遗留清单（移交待办）
- [scripts/README.md](scripts/README.md) —— 初始化脚本用法（check / install，Windows/Linux/macOS）

## 快速开始

```bash
node scripts/check.mjs                 # 环境检查（bun scripts/check.mjs 亦可）
node scripts/install.mjs               # 打印安装计划（加 --apply 执行）
pnpm verify                            # 全链自检（环境 + 契约 + 展示层清单）
pnpm generate -- --id <id> --config courses/<id>.json   # 生成动画课 apps/<id>/
pnpm serve                             # 静态服务 → http://localhost:4173/<id>/index.html
pnpm plan -- --config courses/<id>.json    # 录制计划 + TTS → out/<id>/
pnpm video -- --plan out/<id>/plan.json    # 渲染式出片 → out/<id>/<id>.mp4
pnpm qc -- --plan out/<id>/plan.json       # 抽帧质检 → out/<id>/qc/
pnpm showcase                          # 展示层 → http://localhost:4174/src/standalone/index.html
```
