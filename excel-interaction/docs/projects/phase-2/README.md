# Phase 2 · 技能层

## 这个 phase 做什么

建设 `skill/` 两套技能：**教程生成技能**（教程文本 → 课程契约 → 交互动画课，含引擎
模板）与**录屏出片技能**（课程契约 → 录制计划 → 真机执行 → 逐帧渲染 → mp4）。
SKILL.md 控制体积（>5K 拆 references/）。

对齐 [build-checklist 阶段 2 · 技能层](../../../../excel-animation/docs/build-checklist.md)；
旧域同名技能与其 [skill-log](../../../../excel-animation/docs/skill-log/) 作为参考资产。

## tasks/

| task | 做什么 | 状态 |
| --- | --- | --- |
| [task-01-tutorial-maker](tasks/task-01-tutorial-maker/) | 教程生成技能：SKILL.md + references 三件 + 示例契约 | ✅ |
| [task-02-recorder](tasks/task-02-recorder/) | 录屏出片技能：SKILL.md + references 三件（模式/TTS/坑位） | ✅ |
| [task-03-templates](tasks/task-03-templates/) | 引擎模板规格：模板契约 + 三引擎 README | ✅ |

每个 task 目录三件套：`task.md`（做什么/功能/验证点）、`verify.md`（验证记录）、`output.md`（交接）。
构建方式见 [build-method.md](../../build-method.md)。
