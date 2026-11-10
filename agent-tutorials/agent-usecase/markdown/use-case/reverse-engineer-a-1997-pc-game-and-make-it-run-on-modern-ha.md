---
title: "Reverse-engineer a 1997 PC game and make it run on modern hardware"
slug: "reverse-engineer-a-1997-pc-game-and-make-it-run-on-modern-ha"
summary: "Claude Code got an old DirectX game running on modern hardware, decompiled much of it, built a headless parallel runner, and now writes full level guides with screenshots."
category: "Games & Simulations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "HN"
source_date: "Oct 14, 2026"
source_url: "https://news.ycombinator.com/item?id=50080674"
fetched_from: "https://agentusecases.ai/use-case/reverse-engineer-a-1997-pc-game-and-make-it-run-on-modern-ha"
---

# Reverse-engineer a 1997 PC game and make it run on modern hardware

> Claude Code got an old DirectX game running on modern hardware, decompiled much of it, built a headless parallel runner, and now writes full level guides with screenshots.

**Category:** Games & Simulations  
**Agent:** Claude Code  
**Source:** HN · Oct 14, 2026

## What they did

Claude Code got the 1997 game running on modern hardware in about 30 minutes, setting up a basic reverse-engineering environment along the way. Over further iterations it decompiled most of the game. At the user's request it extended a shimmed DirectX DLL to run headlessly on a Windows Private Desktop, allowing parallel instances. It mapped memory addresses and scripts, and the user nudged it and checked its work.

## How it went

Claude now writes full level guides with decent screenshots of key moments, zero-shot. The user's goal of making the game look as it did in their memory is still in progress.

## Worth knowing

Ask the agent to build helper tools that expose how the game is built, so you can verify its work and steer it. Headless runs also avoid computer-use sessions taking over your PC.

## Prompt

```text
I have an old Windows game from [year] installed in [folder path] that won't run on my modern computer. Figure out why it fails, get it running (compatibility layers or wrappers are fine), and tell me exactly what you changed. When it launches and reaches the main menu, stop and show me how to start it myself. Don't delete or overwrite any original game files; work on a copy.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Play mayor in SimCity through an API](./play-mayor-in-simcity-through-an-api.md)
- [Design a Polkadot parachain strategy game concept](./design-a-polkadot-parachain-strategy-game-concept.md)
- [Run a D&D dungeon crawl with an AI dungeon master](./run-a-d-d-dungeon-crawl-with-an-ai-dungeon-master.md)
