# task-03 · 产物规则（gitignore 收敛）与 git 归属核对

## 做什么

定产物的版本控制规则：`out/` 一条 gitignore 规则管住全部媒体产物；核对 git 归属
（本项目随外层仓库统一管理，不需要独立 git init——build-checklist 的对应项做适配）。

## 功能定义

- `out/`（媒体产物：视频/配音/帧）忽略入库；后续如需 out/ 下保留清单文件再做例外。
- 生成应用 `apps/` 的构建产物（dist 一类）由外层 .gitignore 的既有规则覆盖。
- git 归属：`domains/excel-interaction` 被外层仓库跟踪（.gitignore 已有
  `!domains/excel-interaction` 例外）。

## 验证点

1. `git check-ignore` 确认 `out/` 下文件被忽略、目录内 README 等正常文件不被误伤。
2. git 归属核对：`git status` 可见本项目文件、`git check-ignore` 对项目根文件不误报。
3. 适配说明留档：build-checklist 阶段 1 的「git init 并首提交骨架」在本仓 SKIP
   （外层仓库统一管理），理由记入 verify.md。

## 前置与依赖

- task-01（目录骨架）。

## 范围外

- 提交动作（等用户指令）；CI 规则。
