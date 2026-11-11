# task-02 · 录屏出片技能（excel-desktop-recorder）

## 做什么

建设**录屏出片技能**：`skill/excel-desktop-recorder/`——SKILL.md（≤5K 入口契约）+
`references/`（模式/配音/坑位深知识）。把同一份课程契约在真实表格里重做并录成
无废话讲解 mp4。

## 功能定义

- **SKILL.md**：输入/输出（与教程生成技能同源契约）、三种模式速查、无废话节奏规则、
  4 步工作流程、验收清单。体积 ≤5K。
- **references/**（三件）：
  - `modes.md` —— 渲染式/抓窗式/浏览器录屏式 × 四引擎（LO/Excel/WPS/hot）模式矩阵与选择
  - `tts.md` —— TTS provider 抽象（edge 首选 / sapi 兜底）、语音驱动节奏、无废话修剪规则
  - `pitfalls.md` —— 坑位表（OpenScreen 注解黑块、GUI 探测挂起、concat 尾帧、ffmpeg PATH 等）

## 验证点

1. SKILL.md ≤5K（wc -c 实测）。
2. references 三件齐全，且都被 SKILL.md 以相对链接引用、链接可达。
3. 与教程生成技能的契约同源声明一致（两边都指向 courses/<id>.json 单一事实源）。

## 前置与依赖

- task-01（phase-1 目录骨架）。

## 范围外

- 出片脚本实现（build-plan/render-video/record/tts，随 phase-6 交付）；
- 真机引擎驱动（hot-driver/uno-driver，随 phase-6）。
