---
title: "Play Pokémon Blue with an agent"
slug: "play-pok-mon-blue-with-an-agent"
summary: "The Gemini Plays Pokémon agent reads game RAM and screenshots, turns actions into button presses, and uses pathfinder and boulder-puzzle sub-agents."
category: "Games & Simulations"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "arxiv.org"
source_date: "Undated"
source_url: "https://arxiv.org/pdf/2507.06261"
fetched_from: "https://agentusecases.ai/use-case/play-pok-mon-blue-with-an-agent"
---

# Play Pokémon Blue with an agent

> The Gemini Plays Pokémon agent reads game RAM and screenshots, turns actions into button presses, and uses pathfinder and boulder-puzzle sub-agents.

**Category:** Games & Simulations  
**Agent:** Gemini  
**Source:** arxiv.org · Undated

## What they did

An independent developer, Joel Zhang, built a harness that gives Gemini 2.5 Pro a subset of Game Boy RAM as text, overlaid on a screenshot. Gemini picks actions that become button presses. The harness summarizes history every 100 turns and runs a critic instance every 25 turns. It also provides pathfinder and boulder-puzzle sub-agents, which are prompted Gemini instances.

## How it went

The agent beat Pokémon Blue in 813 hours on run 1, then in 406.5 hours on a fully autonomous second run. It looped on long contexts, hallucinated items from other games, and handled raw pixels poorly.

## Worth knowing

The model struggled to read raw screen pixels, so the RAM-to-text translation was needed. Behavior also degraded once context grew well past 100k tokens.

## Prompt

```text
Help me build an agent that plays [game, e.g. Pokémon Blue] in an emulator at [emulator path or setup]. It should read the game state from [RAM or screenshots], decide on an action, and send it as button presses, with a simple helper for [subtask, e.g. pathfinding]. You're done when it can play for [number] steps on its own and log what it decided at each step.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Hunt for unpatched vulnerabilities in SQLite commits](./hunt-for-unpatched-vulnerabilities-in-sqlite-commits.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Build retro games with a child using Claude Code](./build-retro-games-with-a-child-using-claude-code.md)
- [Run a D&D dungeon crawl with an AI dungeon master](./run-a-d-d-dungeon-crawl-with-an-ai-dungeon-master.md)
