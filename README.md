# Tutorials Maker

Slides Sites 系列的第一个 monorepo 应用：`apps/lesson-viewer`。

## Quick start

```bash
pnpm install
pnpm dev
```

应用会在 <http://localhost:4013> 启动。构建、校验与测试可以从仓库根目录运行：

```bash
pnpm build
pnpm lint
pnpm typecheck
pnpm test
```

`@innate/ui` 已内聚在 `packages/ui`，`lesson-viewer` 通过 workspace 协议复用它；
因此这个 monorepo 不再依赖仓库外的 innate-fe checkout。
