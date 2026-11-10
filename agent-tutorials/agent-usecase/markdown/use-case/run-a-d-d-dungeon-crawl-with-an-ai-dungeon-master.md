---
title: "Run a D&D dungeon crawl with an AI dungeon master"
slug: "run-a-d-d-dungeon-crawl-with-an-ai-dungeon-master"
summary: "A browser D&D 5e dungeon crawl where an AI dungeon master runs the game for a three-character party without inventing rules."
category: "Games & Simulations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "DEV"
source_date: "Oct 4, 2026"
source_url: "https://dev.to/prime_299792/the-goblin-warren-an-ai-dungeon-master-that-never-invents-a-rule-4d66"
fetched_from: "https://agentusecases.ai/use-case/run-a-d-d-dungeon-crawl-with-an-ai-dungeon-master"
---

# Run a D&D dungeon crawl with an AI dungeon master

> A browser D&D 5e dungeon crawl where an AI dungeon master runs the game for a three-character party without inventing rules.

**Category:** Games & Simulations  
**Agent:** custom-built or unnamed agent  
**Source:** DEV · Oct 4, 2026

## What they did

The Goblin Warren is a browser D&D game. The AI dungeon master queries two Sanity Context MCP endpoints: a knowledge base for rule prose and GROQ for exact stats. The server prefetches both, the model gets one optional tool round, and citations no lookup returned are stripped. Claude Code agents built the Sanity layer.

## How it went

Rules answers came back in about 1.3–2.2 seconds. The knowledge base flagged six 2014/2024 edition conflicts in its own entries for review.

## Worth knowing

Use an org token with the Context Viewer role. A project token returns 403 contextGrantRequired, which cost the author an hour. The knowledge base is capped at roughly 150 documents.

## Prompt

```text
Act as the dungeon master for a D&D 5e dungeon crawl for a party of three: [character 1 name, class, level], [character 2 name, class, level], [character 3 name, class, level]. Use only official 5e rules, ask me to roll or make the choices, and tell me when you are unsure of a rule rather than inventing one. Run one full dungeon of about [number] rooms and end with a short recap of loot and XP.
```

## Related use cases

- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Let general-purpose agents choose and play their own games](./let-general-purpose-agents-choose-and-play-their-own-games.md)
- [Add a battle-of-Alesia expansion to a 1990s game remake](./add-a-battle-of-alesia-expansion-to-a-1990s-game-remake.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Build game architecture and animation merging with Codex](./build-game-architecture-and-animation-merging-with-codex.md)
- [Use Grok as the narrative engine of a game](./use-grok-as-the-narrative-engine-of-a-game.md)
