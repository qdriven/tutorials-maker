# skill · 技能层模块

> 功能描述卡片：技能层做什么、由什么组成、与其他模块的关系。
> 用法随技能本体（SKILL.md 即各技能的入口）。

## 职责

两套技能共享同一份课程契约（`courses/<id>.json`），分别负责**出课**与**出片**：

| 技能 | 目录 | 做什么 |
| --- | --- | --- |
| excel-tutorial-maker | [../../skill/excel-tutorial-maker/](../../skill/excel-tutorial-maker/) | 教程文本 → 课程契约 → 交互动画课 |
| excel-desktop-recorder | [../../skill/excel-desktop-recorder/](../../skill/excel-desktop-recorder/) | 课程契约 → 录制计划 → 真机执行 → 无废话讲解 mp4 |

## 组成

```
skill/
  excel-tutorial-maker/
    SKILL.md              # 入口契约（≤5K，深知识进 references/）
    references/           # contract-schema / engine-matrix / motion-spec
    examples/             # course.example.json（示例契约）
    templates/            # 引擎模板契约（handsontable / univer / onlyoffice）
  excel-desktop-recorder/
    SKILL.md              # 入口契约（≤5K）
    references/           # modes / tts / pitfalls
```

## 与其他模块的关系

- **courses/**：契约唯一事实源，技能读写它，不另存副本（生成物 `apps/<id>/course.config.json`
  是只读拷贝）。
- **scripts/**：生成器/出片脚本（phase-4/6）实现技能定义的流程；技能契约是脚本的需求源。
- **apps/ + out/**：技能流程的产物（动画课 / mp4），生成物不手改。
