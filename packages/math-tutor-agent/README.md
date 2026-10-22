# @tutorials-maker/math-tutor-agent

The tutor brain of AI Math Tutor: a LiveKit Agents worker that joins the student's
voice room, reads the whiteboard, and writes the next teaching step back onto it.

> Migrated from `ai-edu-tutorials/ai-math-tutor` (MIT, Copyright (c) 2026 Zico).
> See [LICENSE](./LICENSE).

## Pipeline

```text
student speech → STT (Deepgram) → LLM (Gemini) → tools → TTS (Cartesia) → student
```

## Modules

| File | Role |
| --- | --- |
| `src/main.ts` | LiveKit worker entry, job registration, session observability |
| `src/pipeline.ts` | Speech pipeline assembly |
| `src/agent.ts` | Agent instructions and the three tools (`readCanvas`, `writeCanvasActions`, `writeSolutionStepsOnCanvas`) |
| `src/tutor.ts` | Teaching policy prompt (Socratic, one step at a time, never erase student work) |
| `src/canvas_bridge.ts` | LiveKit RPC bridge to the browser canvas, including chunked screenshots |
| `src/canvas_solution.ts` | Deterministic solution paths (fraction, linear, quadratic) with Gemini fallback |
| `src/canvas_vision.ts` | Gemini visual understanding and structured flowchart extraction |
| `src/flowchart.ts` | Flowchart evaluation engine: expression parsing, branch selection, variable state |
| `src/canvas_flowchart.ts` | Turns a flowchart trace into whiteboard actions |
| `src/observability.ts` | Structured logging |

## Flowchart problems

When the board contains a flowchart, the agent extracts its structure with Gemini and
then evaluates it deterministically:

```text
readCanvas → extract FlowchartSpec → evaluateFlowchart → draw_flowchart + trace_flowchart + steps
```

The evaluation never relies on the model to compute the answer; the model only
describes the chart.

## Run

```bash
cp .env.example .env.local   # fill in LiveKit + Google keys
pnpm dev                     # build and start the worker
```

| Variable | Purpose |
| --- | --- |
| `LIVEKIT_URL` / `LIVEKIT_API_KEY` / `LIVEKIT_API_SECRET` | Room connection |
| `AGENT_NAME` | Worker name, must match the web app |
| `GOOGLE_API_KEY` | Gemini: visual understanding and flowchart extraction |
| `GEMINI_LLM_MODEL` | Reasoning model, default `google/gemini-2.5-flash` |
| `GEMINI_CANVAS_VISION_MODEL` | Vision model, default `gemini-2.5-flash` |
| `MATH_TUTOR_STT_MODEL` | STT plugin, default `deepgram/nova-3` |
| `MATH_TUTOR_TTS_MODEL` | TTS plugin, default `cartesia/sonic-3` |
