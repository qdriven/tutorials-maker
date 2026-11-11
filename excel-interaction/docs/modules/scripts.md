# 模块 · scripts（初始化脚本）

> 模块功能描述卡片。操作手册（用法、参数、平台注意事项）见 [scripts/README.md](../../scripts/README.md)。

## 职责

项目的**环境初始化**入口：检查工具链是否就绪（check），并给出/执行安装计划（install）。
任何 phase 开工前都先过这一关。

## 组成

| 文件 | 功能 |
| --- | --- |
| `scripts/probe.mjs` | 环境探测共享模块（check 与 install 共用：命令解析、版本探针、组件清单） |
| `scripts/check.mjs` | 环境检查：11 组件的存在性与版本，人读表格 / `--json` 双输出 |
| `scripts/install.mjs` | 环境安装：包管理器自动探测，已安装且满足要求的自动跳过，dry-run 默认 |
| `scripts/README.md` | 用法手册（留在模块目录内） |

## 接口概要

- `node scripts/check.mjs [--json] [--only id,…]` —— 退出码：必需全过 0 / 有缺失 1 / 参数无匹配 2
- `node scripts/install.mjs [--apply] [--force] [--only id,…] [--list]` —— 已满足组件自动跳过（`--force` 强制重装）；dry-run 恒 0，`--apply` 有失败 1
- 运行时：Node ≥ 18 或 bun（同一份零依赖 .mjs）；Windows / Linux / macOS 通用

## 与其他模块的关系

- 服务于全部 phase（phase-0 直接交付它；后续 phase 的环境自检复用它）；
- 后续新模块（courses / skill / pipeline / apps / src）如引入新的工具链依赖，
  在 check.mjs 的 `COMPONENTS` 与 install.mjs 的 `PM_CMD` 各加一条（两处同步）。

## 相关文档

- 用法手册：[scripts/README.md](../../scripts/README.md)
- 交付记录：[phase-0/task-01](../projects/phase-0/tasks/task-01-init-scripts/)（task / verify / output 三件套）
