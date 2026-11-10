---
title: "Build retro games with a child using Claude Code"
slug: "build-retro-games-with-a-child-using-claude-code"
summary: "An author builds games like a space shooter and an animal hospital game with his 7-year-old, using pixel art assets and a spec drafted via Claude's question tool."
category: "Games & Simulations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "creatoreconomy.so"
source_date: "Undated"
source_url: "https://creatoreconomy.so/p/build-a-retro-game-with-claude-code-in-20-min"
fetched_from: "https://agentusecases.ai/use-case/build-retro-games-with-a-child-using-claude-code"
---

# Build retro games with a child using Claude Code

> An author builds games like a space shooter and an animal hospital game with his 7-year-old, using pixel art assets and a spec drafted via Claude's question tool.

**Category:** Games & Simulations  
**Agent:** Claude Code  
**Source:** creatoreconomy.so · Undated

## What they did

Peter Yang opens an empty folder in Cursor, runs Claude Code with permission prompts skipped, and has Claude web-search for free pixel art. He drops a downloaded asset pack into the folder and asks Claude to list which sprites suit a space shooter. Claude then drafts a spec by asking him questions, builds an MVP, and he iterates and debugs the boss battle. He ships it with GitHub and Vercel.

## How it went

The result is a playable retro space shooter with wave-based enemies, power-ups and boss fights. The full game has 3 levels, unique enemies and music. The paywall hid the prompts and later steps.

## Worth knowing

The guide uses the flag that skips all permission prompts. Claude then edits files in the folder without asking, so keep it to a fresh project folder.

## Prompt

```text
I want to make a simple retro game with my [age]-year-old child: [game idea, e.g. a space shooter]. First interview me with questions about characters, goals, and look, then write a short spec. Then build it as a browser game using the pixel art in [assets folder], and stop once it runs and I can play the first level.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Play mayor in SimCity through an API](./play-mayor-in-simcity-through-an-api.md)
- [Design a Polkadot parachain strategy game concept](./design-a-polkadot-parachain-strategy-game-concept.md)
- [Run a D&D dungeon crawl with an AI dungeon master](./run-a-d-d-dungeon-crawl-with-an-ai-dungeon-master.md)
