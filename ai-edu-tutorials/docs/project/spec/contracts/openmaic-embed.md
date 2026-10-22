# ADR: OpenMAIC embed strategy

**Date:** 2026-07-09 (revised 2026-07-10)  
**Status:** accepted (supersedes the 2026-07-09 "external open" draft)

## Decision

The desktop shell embeds OpenMAIC as a **child Tauri `Webview`** inside the main window, pointed at a **bundled runtime** on `http://127.0.0.1:3230`. The shell starts and health-checks the bundled runtime itself; the user does not leave the app.

| Layer | Implementation |
|---|---|
| Frontend embed | `desktop/src/components/classroom-embed.tsx` — child `Webview` synced to a container via `ResizeObserver` + window `onResized` |
| Runtime start | `ensure_openmaic_runtime_ready` (Rust) — port 3230 health check, 60s timeout, auto-starts bundled runtime |
| Bundled runtime | `resources/openmaic-runtime/` (built by `build-openmaic-runtime.ps1`), launched via `start-openmaic-runtime.cmd` (Win) / `node server.js` (other) |
| Persistence | `tauri-plugin-store` keeps URL + repo paths (`desktop/src/lib/settings.ts`) |
| Permissions | `capabilities/default.json` grants webview create/show/hide/position/size/close |
| External links | `external-navigation` plugin opens http(s)/mailto/tel in the system browser; only localhost/tauri schemes stay in-app |

## Fallbacks (still supported, demoted to "Advanced")

1. **Dev runtime** — user runs `pnpm dev` in the OpenMAIC repo (port 3000); shell embeds the saved URL. Reached via the "Start local dev runtime" button.
2. **External open** — the original 2026-07-09 draft used `tauri-plugin-opener` to launch the system browser. Kept only as a last-resort escape hatch, not the default path.

## Why embed + bundle (over external open)

- Spike goal was "prove Desktop shell + classroom path"; once the child-webview bounds-sync worked, in-app embed clearly beats a browser hop for a product UX.
- Bundled runtime removes the "start OpenMAIC yourself" step for end users (MVP acceptance #4: open and play without extra config).
- OpenMAIC stays **unforked and unvendored** — only its `next build` standalone output is copied into Tauri resources.

## Open risks (tracked issues)

- Bundled runtime has **not yet been built end-to-end** on a clean machine — see `edu-bundled-runtime-verify`. Dev mode currently falls back to the dev URL.
- `build-openmaic-runtime.ps1` relies on Git Bash for `rm -rf` in sub-packages; Windows shell compatibility is fragile.
- Standalone output is large; first package is slow.

## Post-MVP options (not started)

1. `@openmaic/renderer`-only packaging if the standalone copy cost becomes prohibitive.
2. Sidecar lifecycle hardening (auto-restart, crash capture) — see `edu-runtime-observability`.

## Non-goals

- Fork Electron `OpenMAIC-Project`.
- Merge OpenMAIC / DeepTutor source into this repo.
