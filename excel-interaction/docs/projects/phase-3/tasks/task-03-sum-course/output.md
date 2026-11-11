# phase-3 · task-03 · output（产出交接）

## 什么功能完成了

**第二门课 SUM**（`courses/sum-basic.json`）——契约通用性验证：纯契约驱动出交互动画课
+ 无废话讲解视频 + showcase 登记，零模板/脚本改动。deferred.md #5 销账。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `courses/seeds/sum-basic.md` | SUM 教程原文 seed（体裁同试点） |
| `courses/sum-basic.json` | 课程契约（月度数据 / 4 步 / formulaArgs / summary / checks=3600） |
| `apps/sum-basic/` + `out/sum-basic/` | 生成课 + 出片产物（生成物） |
| `src/data/tutorials.json` | 自动登记 app/demo 各 1 条（清单 6 条） |

## 要点（hand-off 给下游）

1. **契约通用性成立**：第二门课全链复用——生成/出片/登记都自动；教学结构
   （一句话→解释→动画→收尾总结）与参数逐位口播（规则 4）对新课开箱即用。
2. summary 文案沿用试点的写法口径（SQL 等价式解释 + 用户语言收尾总结）。
3. 新课清单：写 seed → 提炼契约 → 跑一图流四步（README）。

## 下游接线

- showcase 页已并列展示两门课（动画课/视频 tab 各 2）；
- 后续新课照 `contract-schema.md` + 本课契约作范。
