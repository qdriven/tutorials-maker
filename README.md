# Tutorials Maker

Slides Sites 系列的第一个 monorepo 应用：`apps/lesson-viewer`。

1. interactive
2. vivid
3. easy to understand

---

## Monorepo layout

This repository is a pnpm workspace. Every tutorial or product lives either as an
app (a runnable experience) or as a package (a reusable capability).

```text
tutorials-maker/
  package.json            # pnpm workspace root
  pnpm-workspace.yaml     # apps/*, packages/*
  apps/                   # runnable products
    lesson-viewer/        # Slides Sites lesson viewer (Next.js + Slidev)
    math-tutor-web/       # AI Math Tutor classroom (Next.js + tldraw)
  packages/               # reusable capabilities
    ui/                   # shared @innate/ui component library
    math-tutor-protocol/  # shared canvas protocol + flowchart schema + layout
    math-tutor-agent/     # LiveKit voice agent (tutor brain)
  build-path/             # how each track was built, lesson by lesson
    math-edu/lesson-1/    # Lesson 1: AI Math Tutor principles, modules, interaction
  docs/                   # research notes and cross-project docs
  ai-edu-tutorials/       # AI education research workspace
  lesssons/               # skill notes
```

### Tracks

| Track | Entry | Notes |
| --- | --- | --- |
| Math EDU | [`build-path/math-edu/lesson-1`](build-path/math-edu/lesson-1) | AI Math Tutor: voice-first whiteboard tutoring, with flowchart (程序框图) problem support |
| Slides | [`build-path/slides`](build-path/slides) | slides-tool, slide viewer, speaker deck |
| Flashcards | [`build-path/flashcard`](build-path/flashcard) | flashcard MVP |

---

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

## Math EDU — AI Math Tutor

A voice-first AI math tutor: the student shares a tldraw whiteboard with the tutor,
speaks their question, and the tutor answers out loud while writing the next step
onto the same board.

```bash
pnpm install
pnpm dev:web     # classroom on http://localhost:3000
pnpm dev:agent   # LiveKit voice agent worker
```

See [build-path/math-edu/lesson-1](build-path/math-edu/lesson-1) for the full
explanation of how it works: principles, modules, interaction sequence, and the
flowchart support added during the migration from `ai-edu-tutorials/ai-math-tutor`.

### Package roles

| Package | Role |
| --- | --- |
| `apps/math-tutor-web` | The classroom: whiteboard, transcript, call controls, canvas RPC handlers |
| `packages/math-tutor-agent` | The tutor: LiveKit pipeline, teaching prompt, deterministic solution paths |
| `packages/math-tutor-protocol` | The contract shared by both sides: canvas context, 12 canvas actions, flowchart schema and layout |
