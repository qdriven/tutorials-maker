# AI Edu Tutorials

**Desktop-first interactive tutorials** — Tauri 2 + Rust shell, OpenMAIC classroom runtime, DeepTutor knowledge engine.

| | |
|---|---|
| **Code** | `D:\innate-works\projects\ai-edu-tutorials` |
| **Idea** | `innate-works/ideas/exploring/ai-edu-interactive-tutorials/` |
| **OpenMAIC** | `D:\copy-modify\ai-edu\OpenMAIC` |
| **DeepTutor** | `D:\copy-modify\ai-edu\DeepTutor` |

## Stack

| Layer | Choice |
|---|---|
| Shell | **Tauri 2 + Rust** (`desktop/src-tauri`) |
| UI | **Vite + React 19 + shadcn/ui (`base-nova`) + `@base-ui/react`** |
| Classroom | OpenMAIC (local Next; shell opens / embeds) |
| Knowledge | DeepTutor CLI/API (Phase 1 hook) |

References used while scaffolding:

- `D:\copy-modify\desktop-apps\tauri-ui` (`create-tauri-ui`)
- `D:\innate-works\projects\innate-executable\playground\apps\desktop` (Tauri + tutorials UX)
- Exploring notes: OpenMAIC / DeepTutor / not forking Electron OpenMAIC-Project

## Quick start

One-click (Git Bash) - OpenMAIC dev on `:3230` + Tauri shell, in two terminals:

```bash
bash start.sh                # default: two mintty windows
MODE=inline bash start.sh    # or: one terminal, OpenMAIC backgrounded
```

With [go-task](https://taskfile.dev) (`task`):

```bash
task dev:all              # same one-click via Taskfile
task check                # typecheck + cargo check
task --list               # all tasks
```

Desktop shell only (PowerShell):

```powershell
cd D:\innate-works\projects\ai-edu-tutorials\desktop
bun install
bun run tauri dev
```

Frontend only:

```powershell
bun run dev
```

> Dev mode runs OpenMAIC on `:3230`, which is the port the shell's bundled-runtime
> fallback expects - so the classroom embeds automatically with no settings change.
> See [`Taskfile.yml`](./Taskfile.yml) and [`start.sh`](./start.sh).

## Layout

```text
ai-edu-tutorials/
  desktop/                 # Tauri + Vite app (main product)
  docs/project/            # Agent docs (STANDARD)
  notes/baselines/         # Step 0 OpenMAIC / DeepTutor run logs
  AGENTS.md
  README.md
```

## Current focus

See [`docs/project/index.md`](./docs/project/index.md).
