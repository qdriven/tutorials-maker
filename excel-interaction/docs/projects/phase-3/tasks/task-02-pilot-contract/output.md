# task-02 · output（产出交接）

## 什么功能完成了

**试点契约 `courses/vlookup-basic.json` 入库并登记**：从 seed 教程提炼的完整契约——
4 步指南四要素、员工表样例数据、checks 验收、brief 解说节奏；引擎 handsontable、
主题 kimi。契约层就此有了第一份**可被下游消费的真实契约**。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `courses/vlookup-basic.json` | 试点契约（4 步指南 + data + checks + narration） |
| `courses/README.md` | 增加「契约清单」登记表（id/主题/引擎/主题风格/seed） |

## 要点（hand-off 给下游）

1. **契约成色**：4 步指南 0 空字段；checks.formula 与 guide 公式单源一致；
   checks.value 经 data 实算比对（VLOOKUP(D2=1003)→王五）。
2. **主题用 kimi**：示例契约是 green——两套 theme token 各有真实用例，phase-5 两套都要出。
3. **seed 的联动复核已归并**：seed 步骤 4 含「改 D2→联动张三」，契约按 schema 的
   4 步固定结构（选中→输入→确认→复核）取**非破坏性复核**（编辑栏回显公式原文）；
   联动演示归手动练习模式的自由操作，不占 4 步指南（保持 checks 与初态一致）。
4. **XLOOKUP 边界**：契约取 VLOOKUP 路线（handsontable 域内）；若立项 XLOOKUP 课
   直接定 onlyoffice（engine-matrix 规则 1）。
5. **登记纪律**：新契约入库即在 courses/README.md 契约清单加一行（phase-4 的
   check-manifest 可对照此清单）。

## 下游接线

- phase-4 流水线：`scripts/tutorial/new.mjs` / `check-manifest.mjs` 以本契约为首个用例。
- phase-5 生成动画课：试点出课就用 vlookup-basic（handsontable + kimi）。
- phase-6 出片：同一契约出无废话讲解 mp4，检验 TTS/字幕风险点。
