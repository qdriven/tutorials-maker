# verify · task-03 产物规则与 git 归属

> 执行环境：Windows 11，2026-11-08。

### 1. out/ 忽略、正常文件不误伤

- 命令：
  ```bash
  touch out/probe-test.mp4 && git check-ignore -v out/probe-test.mp4
  git check-ignore out/README.md || echo tracked-ok
  ```
- 实际输出：
  ```
  domains/excel-interaction/.gitignore:2:out/*  out/probe-test.mp4   ← 忽略命中
  out/README.md → tracked ok                                        ← !out/README.md 例外生效
  ```
- 结论：**PASS**

### 2. git 归属核对

- 命令：`git status --short -- .`；`git check-ignore courses/README.md`；`git check-ignore .`
- 实际输出：`?? ./`（新文件对 git 可见）；courses/README.md tracked ok；项目根不被误忽略
  （外层 .gitignore 的 `!domains/excel-interaction` 例外生效）
- 结论：**PASS**

### 3. git init 适配说明

- build-checklist 阶段 1 的「git init 并首提交骨架」在本仓 **SKIP**：
  excel-interaction 随外层仓库（agent-learning-workbench）统一版本管理，
  不独立建仓；外层 .gitignore 已有 `!domains/excel-interaction` 例外保证入库。
- 结论：**SKIP（有据）**

## 总结

2 PASS + 1 有据 SKIP。产物规则一条（out/* + README 例外），git 归属清晰。
