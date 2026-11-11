# task-01 · output（产出交接）

## 什么功能完成了

**教程生成技能 `skill/excel-tutorial-maker/` 的契约层建成**：SKILL.md（2904B 入口）+
references 三件（契约 schema / 引擎矩阵 / 动效规格）+ examples/course.example.json
（可解析的完整示例契约）。技能把「任意 Excel 教程 → courses/<id>.json 课程契约 →
交互动画课」的路径、规则、验收标准全部定死。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `skill/excel-tutorial-maker/SKILL.md` | 入口：输入输出、核心契约摘要、引擎速查、4 步流程、验收清单 |
| `references/contract-schema.md` | 课程契约 schema：4 步指南四要素、data/checks/narration、theme token |
| `references/engine-matrix.md` | 三引擎能力矩阵 + 选择规则 + 边界口径（含跨表 SUM 冻结归 univer/onlyoffice） |
| `references/motion-spec.md` | 动效硬约束（确定性可重放/禁随机/禁无限循环）+ 动效词汇表 + 4 步状态机 |
| `examples/course.example.json` | sum-basic 示例契约，4 步指南四要素齐全 |

## 要点（hand-off 给下游）

1. **契约唯一事实源**：`courses/<id>.json`；禁止单产物字段进契约（双产物同源硬规则）。
2. **4 步指南四要素**（cell/menu/formula/expect）是契约核心，schema 里 expect 必须可回读。
3. **引擎选择三规则**按序命中：FILTER/XLOOKUP/透视/图表→onlyoffice；多表/动态数组→univer；
   其余→handsontable。跨表 SUM 不碰 handsontable（冻结结论）。
4. **SKILL.md ≤5K 是硬规矩**：深知识一律进 references/，别往入口塞。
5. **待落地**（非本 task 范围）：生成器 `scripts/tutorial/`（phase-4/5）、模板实现
   （task-03 定规格、phase-5 联调）。

## 下游接线

- task-02 录屏出片技能：读同一份契约出视频（tts.md 里定义无废话修剪规则）。
- task-03 引擎模板：以 engine-matrix.md 为能力边界一致性基准。
