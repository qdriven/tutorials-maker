# @tutorials-maker/math-tutor-web

The classroom of AI Math Tutor: a Next.js app that renders the tldraw whiteboard, the
live transcript, the call controls, and the canvas RPC handlers the agent talks to.

## Flow

```text
Homepage (upload homework photo / pick a sample)
  → Tutor board
    → LiveKit voice session
      → agent reads the board, writes the next step
```

## Modules

| Path | Role |
| --- | --- |
| `app/page.tsx`, `components/math-tutor/homework-upload-page.tsx` | Homework intake: drag and drop, clipboard paste, sample equations |
| `app/tutor/page.tsx`, `components/math-tutor/math-tutor-workspace.tsx` | Classroom: whiteboard, transcript, controls, text fallback, canvas RPC handlers |
| `lib/math-tutor/board-understanding.ts` | Turns raw shapes into problem / student step / scratch roles with a focus step |
| `lib/math-tutor/canvas-context.ts` | Builds the context payload sent to the agent |
| `lib/math-tutor/tutor-action-layout.ts` | Places tutor annotations so they never cover student work |
| `lib/math-tutor/apply-tutor-actions.ts` | Applies validated tutor actions as tldraw shapes |
| `lib/math-tutor/flowchart-canvas.ts` | Renders `draw_flowchart` specs and `trace_flowchart` path badges |
| `lib/math-tutor/session-health.ts` | Surfaces connection, stall, and failure states in the UI |

## Canvas RPC surface

| Method | Direction | Purpose |
| --- | --- | --- |
| `canvas.get_context` | agent → browser | Current board state |
| `canvas.prepare_screenshot` | agent → browser | Screenshot manifest |
| `canvas.get_screenshot_chunk` | agent → browser | Screenshot chunks |
| `canvas.apply_actions` | agent → browser | Apply tutor actions |
| `canvas.clear_ai_annotations` | agent → browser | Remove AI annotations only |

## Run

```bash
cp .env.example .env.local
pnpm dev
```

| Variable | Purpose |
| --- | --- |
| `LIVEKIT_URL` / `LIVEKIT_API_KEY` / `LIVEKIT_API_SECRET` | Room connection and token issuing |
| `AGENT_NAME` / `NEXT_PUBLIC_AGENT_NAME` | Must match the agent worker name |
| `ALLOW_PUBLIC_TOKEN_ENDPOINT` | Keep `false` outside local development |
| `NEXT_PUBLIC_TLDRAW_LICENSE_KEY` | tldraw production license |
