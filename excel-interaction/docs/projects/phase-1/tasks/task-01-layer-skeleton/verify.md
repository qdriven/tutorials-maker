# verify · task-01 五层目录骨架落位

> 执行环境：Windows 11，2026-11-08。

### 1. 五层目录就位、树与模型一一对应

- 命令：`find . -maxdepth 2 -type d | sort`
- 实际输出（节选）：
  ```
  apps  courses  courses/seeds  docs  docs/modules  docs/projects
  out  scripts  scripts/docs  scripts/serve  scripts/tutorial  skill  src
  ```
- 对照：契约 courses/+seeds ✓ 技能 skill ✓ 流水线 scripts/+{tutorial,docs,serve} ✓
  产物 apps/+out ✓ 展示 src ✓ 记录 docs ✓
- 结论：**PASS**

### 2. 每个顶层模块目录有 README

- 命令：`ls {courses,skill,scripts,apps,out,src}/README.md`
- 实际输出：6/6 存在（courses/skill/apps/out/src 本次新建，scripts/README.md 既有），
  内容均含「放什么」与对应 phase 链接
- 结论：**PASS**

## 总结

2/2 PASS。五层骨架落位，readme 跟模块走约定执行（README 在各模块目录内）。
