# task-09 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

取证工具：[drive-fold.py](drive-fold.py)；截图 [shots/](shots/)；[result.json](result.json)。

## 验证点 1 · 全步常驻 + 当前步展开（非替换）

- **证据**：`items_count=4`；gotoStep(2) → `folds_after_step2 =
  [1:false, 2:true, 3:false, 4:false]`——4 步全在、当前步展开（橙色 current 标记）、
  其余折叠标题可见；shots/fold-auto-step2.png 目检（验收回读行保留在面板外）。
- **结论**：**PASS**

## 验证点 2 · 折叠交互（点击切换 + 偏好记住）

- **证据**：点第 3 标题 → `[f,t,t,f]`（展开不挤掉第 2）；再点第 2 → `[f,f,t,f]`
  （独立切换）；shots/fold-click-toggle.png。
- **结论**：**PASS**（details/summary 原生折叠 + foldState 偏好）

## 验证点 3 · 练习态全展开

- **证据**：practice() → `folds_practice` 4/4 open + 目标行（practice_has_goal=true）
  + 操作提示；shots/fold-practice-all-open.png。
- **结论**：**PASS**

## 验证点 4 · 回归

- **证据**：练习真算验收 `✓ 验收通过：E2 显示 王五`；`console_errors: []`；
  确定性 grep 干净；`pnpm verify` EXIT=0。
- **结论**：**PASS**

## 过程记录

实现一次成型，4 项首跑全绿（无 FAIL 记录）。
