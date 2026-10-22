# @tutorials-maker/math-tutor-protocol

The contract shared by the AI Math Tutor classroom and the AI Math Tutor agent.

Both sides live in this monorepo, so the protocol is a workspace package instead of
two copies of the same file. Any change to a canvas action is now made in one place.

## What it contains

| Module | Contents |
| --- | --- |
| `src/canvas-protocol.ts` | `CanvasContext` (what the agent reads), `TutorCanvasCommand` (what the agent writes), the 12 canvas actions, coordinate normalization |
| `src/flowchart.ts` | `FlowchartSpec` (nodes, edges, branch labels), layered layout, start-node detection, branch-label semantics |
| `src/index.ts` | Public entry point |

## Canvas actions

`write_text`, `write_formula`, `hint_card`, `highlight`, `draw_arrow`, `mark_wrong`,
`mark_correct`, `correct_step`, `ask_student`, `clear_ai_annotations`,
`draw_flowchart`, `trace_flowchart`.

Every command is validated with Zod, so a malformed model output fails fast instead of
reaching the whiteboard. Coordinates are clamped to `[0, 4000]`.

## Flowchart support

`draw_flowchart` renders a declarative `FlowchartSpec` as whiteboard shapes, and
`trace_flowchart` marks the executed path of that chart. The agent decides the
structure; the browser decides the layout.

```ts
import { layoutFlowchartSpec, normalizeTutorCommand } from '@tutorials-maker/math-tutor-protocol';
```

## Scripts

```bash
pnpm --filter @tutorials-maker/math-tutor-protocol test
pnpm --filter @tutorials-maker/math-tutor-protocol typecheck
```
