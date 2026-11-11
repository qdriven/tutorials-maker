# task-01 · 流水线脚本（new / check-manifest / serve）

## 做什么

建设 `scripts/` 流水线三脚本（零依赖 .mjs）+ 根 package.json 命令挂载。
本 task 属 **phase-4+5 合并里程碑**（用户选定方案 C，详见 [../../README.md](../../README.md)）。

## 功能定义

- `scripts/tutorial/new.mjs`：教程生成器——`--id <id> --config courses/<id>.json` →
  从 `skill/excel-tutorial-maker/templates/<engine>/` 复制模板实现 + vendored 依赖
  → 生成 `apps/<id>/`（index.html / course.config.json / lesson.js / theme.css /
  `<engine>/{engine.js,vendor/}`）。
- `scripts/tutorial/check-manifest.mjs`：清单校验——逐契约检查（JSON 可解析、id 与
  文件名一致、4 步指南四要素非空、checks 非空、seed 存在、engine/theme 枚举合法、
  公式单源一致），exit 0/1。
- `scripts/serve/serve.mjs`：零依赖静态服务（`--dir apps --port <p>`），生成课的
  查看入口（file:// 下 fetch 契约会被浏览器拦，必须走 http）。
- `package.json` 挂命令：`generate` / `verify:manifest` / `serve`。

## 验证点

1. `check-manifest.mjs` 对现有 1 份契约跑通（exit 0）；构造坏契约时 exit 1 且指出问题。
2. `new.mjs` 生成 apps/vlookup-basic/ 目录结构齐全（模板契约的目录形态）。
3. `serve.mjs` 起服务后 curl 到 index.html 与 course.config.json（200）。

## 前置与依赖

- phase-3 试点契约（首个消费用例）；templates 模板实现（task-02，new.mjs 的复制源
  ——两 task 并行推进，task-02 先落模板文件后 new.mjs 才能全量生成）。

## 范围外

- 模板实现内容（task-02）；浏览器验收四点（task-03）；文档构建 scripts/docs/
  （推迟到 phase-7 展示层统一做）。
