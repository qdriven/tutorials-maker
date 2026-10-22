#!/usr/bin/env bash
#
# start.sh - one-click dev startup for Git Bash.
#
# Starts OpenMAIC dev on port 3230 (the port the Tauri shell expects, so the
# classroom embeds automatically with no settings change) and the Tauri desktop
# shell.
#
# Modes:
#   MODE=windows  (default)  launch each in its own mintty terminal
#   MODE=inline              OpenMAIC in background (logs/logs/openmaic.log),
#                            Tauri in foreground; Ctrl+C stops both
#
# Overrides (env):
#   OPENMAIC_PATH  default D:/copy-modify/ai-edu/OpenMAIC
#   DESKTOP_PATH   default <repo>/desktop
#   OPENMAIC_PORT  default 3230
#
set -uo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
OPENMAIC_PATH="${OPENMAIC_PATH:-D:/copy-modify/ai-edu/OpenMAIC}"
DESKTOP_PATH="${DESKTOP_PATH:-$REPO_DIR/desktop}"
OPENMAIC_PORT="${OPENMAIC_PORT:-3230}"
MODE="${MODE:-windows}"

log() { printf '\033[1;32m▶\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m⚠\033[0m %s\n' "$*"; }
die() { printf '\033[1;31m✖\033[0m %s\n' "$*" >&2; exit 1; }

# ---- prereqs ----
command -v bun  >/dev/null 2>&1 || die "bun not on PATH"
command -v pnpm >/dev/null 2>&1 || die "pnpm not on PATH"
[ -d "$OPENMAIC_PATH" ] || die "OpenMAIC not found: $OPENMAIC_PATH (set OPENMAIC_PATH)"
[ -d "$DESKTOP_PATH" ] || die "Desktop not found: $DESKTOP_PATH (set DESKTOP_PATH)"

wait_for_port() {
  local port="$1" tries="${2:-90}"
  local i
  for ((i = 1; i <= tries; i++)); do
    if curl -sf "http://127.0.0.1:$port/" >/dev/null 2>&1; then return 0; fi
    sleep 1
  done
  return 1
}

# =====================================================================
# MODE=windows : two mintty terminals (robust, no cleanup needed)
# =====================================================================
if [ "$MODE" = "windows" ]; then
  command -v mintty >/dev/null 2>&1 || die "mintty not found (run from Git Bash) or use MODE=inline"

  log "Launching OpenMAIC dev on :$OPENMAIC_PORT ..."
  mintty -h always -t "OpenMAIC dev (:$OPENMAIC_PORT)" -e bash -lc \
    "cd '$OPENMAIC_PATH' && PORT=$OPENMAIC_PORT pnpm dev" &

  log "Waiting for http://127.0.0.1:$OPENMAIC_PORT ..."
  if wait_for_port "$OPENMAIC_PORT" 120; then
    log "OpenMAIC ready."
  else
    if curl -sf "http://127.0.0.1:3000/" >/dev/null 2>&1; then
      warn "OpenMAIC came up on :3000, not :$OPENMAIC_PORT (PORT env ignored)."
      warn "  In the shell: Runtime > Advanced > set Classroom URL to http://127.0.0.1:3000"
    else
      warn "OpenMAIC not ready after 120s. Check the OpenMAIC terminal window."
    fi
  fi

  log "Launching Tauri desktop shell ..."
  mintty -h always -t "Tauri desktop" -e bash -lc \
    "cd '$DESKTOP_PATH' && bun run tauri dev" &

  echo
  log "Launched. Two terminals opened:"
  echo "    OpenMAIC : http://127.0.0.1:$OPENMAIC_PORT"
  echo "    Desktop  : Tauri window (embeds the above automatically)"
  echo
  echo "Close each terminal to stop its process."
  exit 0
fi

# =====================================================================
# MODE=inline : one terminal, OpenMAIC backgrounded, Tauri foreground
# =====================================================================
if [ "$MODE" = "inline" ]; then
  LOG_DIR="$REPO_DIR/logs"
  mkdir -p "$LOG_DIR"
  OPENMAIC_PID=""

  cleanup() {
    echo
    log "Stopping OpenMAIC (pid ${OPENMAIC_PID:-?}) ..."
    [ -n "$OPENMAIC_PID" ] && kill "$OPENMAIC_PID" 2>/dev/null || true
    # On Windows, kill the whole process tree (pnpm/next children).
    [ -n "$OPENMAIC_PID" ] && taskkill //F //T //PID "$OPENMAIC_PID" 2>/dev/null || true
  }
  trap cleanup EXIT INT TERM

  log "Starting OpenMAIC dev on :$OPENMAIC_PORT  (log: $LOG_DIR/openmaic.log)"
  ( cd "$OPENMAIC_PATH" && PORT="$OPENMAIC_PORT" pnpm dev ) >"$LOG_DIR/openmaic.log" 2>&1 &
  OPENMAIC_PID=$!

  log "Waiting for http://127.0.0.1:$OPENMAIC_PORT ..."
  if wait_for_port "$OPENMAIC_PORT" 120; then
    log "OpenMAIC ready."
  else
    warn "OpenMAIC not ready after 120s (see $LOG_DIR/openmaic.log). Continuing."
  fi

  log "Starting Tauri desktop shell (Ctrl+C stops both) ..."
  cd "$DESKTOP_PATH" || die "cannot cd to $DESKTOP_PATH"
  bun run tauri dev
  exit 0
fi

die "Unknown MODE='$MODE' (use 'windows' or 'inline')."
