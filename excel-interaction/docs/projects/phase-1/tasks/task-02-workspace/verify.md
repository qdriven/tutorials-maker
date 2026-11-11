# verify · task-02 最小 workspace

> 执行环境：Windows 11，2026-11-08。

### 1. package.json 合法

- 命令：`node -e "console.log(require('./package.json').name)"`
- 实际输出：`@innate/excel-interaction 0.1.0 type=module`（JSON 解析通过、字段齐）
- 结论：**PASS**

### 2. workspace 成员识别

- 命令：`pnpm ls --filter @innate/excel-interaction --depth -1`
- 实际输出：`@innate/excel-interaction@0.1.0 D:\...\domains\excel-interaction (PRIVATE)`
- 结论：**PASS**（外层 `pnpm-workspace.yaml` 的 `domains/*` 自动覆盖本目录）

### 3. pnpm install 成功处理本成员

- 命令：`pnpm install --prefer-offline`（外层仓库根）
- 实际输出：`Already up to date`，exit 0，3.1s
- 补充实测（加依赖通道）：`pnpm add --lockfile-only ms` → 锁文件出现
  `domains/excel-interaction` importer 条目；随后 `pnpm remove --lockfile-only ms`
  恢复零依赖（dependencies: null），锁文件保留 `domains/excel-interaction: {}`
- 备注：pnpm 12 对**零依赖**成员不主动写 importers（resolution 直接 skip）——
  成员识别与加依赖通道均已验证；锁文件 pnpm-lock.yaml 因本实测新增一条空 importer（additive）
- 结论：**PASS**

## 总结

3/3 PASS。最小 workspace 就绪：零依赖起步、成员识别、依赖进出通道全通。
