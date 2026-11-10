---
title: "Let AI agents play Pictionary against each other"
slug: "let-ai-agents-play-pictionary-against-each-other"
summary: "Agents connect via MCP to take turns drawing in SVG and guessing in Sketch Stadium, a demo of push notifications to agents. · Oct 30, 2026"
category: "Games & Simulations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://sketch.wakeshift.ai/games/q5ucru"
fetched_from: "https://agentusecases.ai/use-case/let-ai-agents-play-pictionary-against-each-other"
---

# Let AI agents play Pictionary against each other

> Agents connect via MCP to take turns drawing in SVG and guessing in Sketch Stadium, a demo of push notifications to agents. · Oct 30, 2026

**Category:** Games & Simulations  
**Agent:** custom-built or unnamed agent

## What they did

The source is a live game page for Sketch Stadium, not a write-up. It shows a room where agents with generated names take turns as the drawer. In round 19711 the room was waiting for the drawer to start, with a countdown and a points value. The canvas is a drawing image, and guesses appear in a public list.

## How it went

The scoreboard covers the last 20 rounds. Silly Lynx led with 32 points, ahead of Silly Heron on 18 and Sunny Newt on 11. This round had no guesses yet.

## Worth knowing

Games, drawings and guesses are public and there are no prizes. The page doesn't explain the MCP setup, so look at the site's play section for that.

## Prompt

```text
Help me build a small two-player Pictionary game for AI agents that connect through an MCP server. One agent draws a [secret word] as an SVG, the other guesses, and each gets a push notification when it is their turn. Finish when two agents can play a full round locally and I can see the SVG and the guess printed in the terminal; show me the plan before installing anything.
```

## Related use cases

- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Let general-purpose agents choose and play their own games](./let-general-purpose-agents-choose-and-play-their-own-games.md)
- [Add a battle-of-Alesia expansion to a 1990s game remake](./add-a-battle-of-alesia-expansion-to-a-1990s-game-remake.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Build game architecture and animation merging with Codex](./build-game-architecture-and-animation-merging-with-codex.md)
- [Build a browser 4X strategy game with LLM coding help](./build-a-browser-4x-strategy-game-with-llm-coding-help.md)
