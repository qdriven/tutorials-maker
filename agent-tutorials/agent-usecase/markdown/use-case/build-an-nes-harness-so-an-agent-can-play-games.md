---
title: "Build an NES harness so an agent can play games"
slug: "build-an-nes-harness-so-an-agent-can-play-games"
summary: "A commenter is building an NES harness where an agent reads emulator state; it struggled detecting dialogs and menus, so they plan a per-frame state recorder."
category: "Games & Simulations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Oct 25, 2026"
source_url: "https://news.ycombinator.com/item?id=50227940"
fetched_from: "https://agentusecases.ai/use-case/build-an-nes-harness-so-an-agent-can-play-games"
---

# Build an NES harness so an agent can play games

> A commenter is building an NES harness where an agent reads emulator state; it struggled detecting dialogs and menus, so they plan a per-frame state recorder.

**Category:** Games & Simulations  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Oct 25, 2026

## What they did

The commenter is building a harness that lets an agent play NES games by reading emulator and game state. The agent kept stalling on detecting dialogs, menu navigation and screen changes. After a break, the commenter asked whether state could simply be read every frame instead of using clever detection. The agent agreed.

## How it went

Not finished. The commenter hasn't resumed work, and plans to have the agent build a small recorder for frame-accurate state changes. The agent also raised a performance worry, which the commenter dismissed as nonsense, noting it was a flash model.

## Worth knowing

When the agent churns on a clever approach, step back and suggest a simpler one yourself; agents struggle to notice ambiguity or missing context.

## Prompt

```text
Help me build a harness so an AI agent can play [NES game name] in an emulator. Set up [emulator, e.g. FCEUX or a Python NES library] so the agent can read game state like RAM values and screen frames, send controller inputs, and record a per-frame state log. Include detection for dialogs and menus (for example by watching specific RAM addresses), and stop when the agent can get through [first goal, e.g. the opening town] and show me the log format.
```

## Related use cases

- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Let general-purpose agents choose and play their own games](./let-general-purpose-agents-choose-and-play-their-own-games.md)
- [Add a battle-of-Alesia expansion to a 1990s game remake](./add-a-battle-of-alesia-expansion-to-a-1990s-game-remake.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Build game architecture and animation merging with Codex](./build-game-architecture-and-animation-merging-with-codex.md)
- [Build a browser 4X strategy game with LLM coding help](./build-a-browser-4x-strategy-game-with-llm-coding-help.md)
