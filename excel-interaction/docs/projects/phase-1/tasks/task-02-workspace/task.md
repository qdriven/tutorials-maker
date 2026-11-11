# task-02 · 最小 workspace（package.json 可装依赖）

## 做什么

为项目建立最小 workspace：根 `package.json`（零依赖起步），能被 pnpm workspace 识别
并可正常安装依赖——为后续阶段的依赖（测试、生成器、展示层）留好挂载点。

## 功能定义

- `package.json`：项目名、private、type: module、常用脚本入口（check:env 等）。
- workspace 挂接：外层 `pnpm-workspace.yaml` 的 `domains/*` 已覆盖本目录，
  package.json 就位即成为 workspace 成员。
- 依赖安装通道可用：`pnpm install` 正常处理本成员（当前零依赖）。

## 验证点

1. `package.json` 合法（JSON 解析通过、字段齐）。
2. workspace 成员识别：`pnpm ls --filter` 能查到本包。
3. `pnpm install` 成功处理本成员（锁文件新增 importers 条目、无报错）。

## 前置与依赖

- task-01（目录骨架）。

## 范围外

- 具体依赖引入（随 phase-2…7 按需）；测试/类型检查体系（后续 task）。
