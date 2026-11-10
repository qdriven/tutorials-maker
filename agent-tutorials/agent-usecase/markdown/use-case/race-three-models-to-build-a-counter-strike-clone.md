---
title: "Race three models to build a Counter-Strike clone"
slug: "race-three-models-to-build-a-counter-strike-clone"
summary: "InstantDB had Codex, Opus, and Gemini each try to build a multiplayer shooter. · Nov 28, 2025"
category: "Games & Simulations"
agents:
  - name: "Codex"
    slug: "codex"
  - name: "Claude"
    slug: "claude"
  - name: "Gemini"
    slug: "gemini"
source_url: "https://www.instantdb.com/essays/agents_building_counterstrike"
fetched_from: "https://agentusecases.ai/use-case/race-three-models-to-build-a-counter-strike-clone"
---

# Race three models to build a Counter-Strike clone

> InstantDB had Codex, Opus, and Gemini each try to build a multiplayer shooter. · Nov 28, 2025

**Category:** Games & Simulations  
**Agent:** Codex, Claude, Gemini

## What they did

Each model (Codex Max 5.1, Opus 4.5, Gemini 3 Pro) ran in its provider's CLI on a top-tier plan with default settings. They got about seven consecutive prompts. The first four built a local three.js shooter: map, enemies, gun, sounds. The last three made it multiplayer with Instant presence and topics, then added a database-backed map list. The humans mostly pasted errors back.

## How it went

All three ended with a working multiplayer 3D shooter and no hand-written code. Opus won the frontend, Gemini the backend, and Codex landed in between. Opus got stuck on React useEffect bugs until the engineers read its code.

## Worth knowing

Gemini had fewer errors, possibly because it ran the build step repeatedly. Expect to paste errors back, and expect to read code yourself when an agent gets stuck.

## Prompt

```text
Build a simple multiplayer first-person shooter inspired by [Counter-Strike] in the browser using [stack, e.g. JavaScript and a realtime backend]. Include movement, shooting, health, and [number] players in one room. Finished means I can open two browser tabs and play against myself, and you list what's still missing.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Analyze budgets and research investments from bank data](./analyze-budgets-and-research-investments-from-bank-data.md)
- [Win a small legal case with Claude's help](./win-a-small-legal-case-with-claude-s-help.md)
- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Build retro games with a child using Claude Code](./build-retro-games-with-a-child-using-claude-code.md)
- [Build and grow a mobile game with bots](./build-and-grow-a-mobile-game-with-bots.md)
