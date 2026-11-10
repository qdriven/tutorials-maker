---
title: "Build a game level from a design document"
slug: "build-a-game-level-from-a-design-document"
summary: "The poster had Grok 4.5 build a level of an existing Three.js game from a detailed game design document, followed by some manual cleanup."
category: "Games & Simulations"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "Reddit"
source_date: "Jul 11, 2026"
source_url: "https://www.reddit.com/r/aigamedev/comments/1usy7ui/built_this_game_using_grok_45_threejs_and_my_game"
fetched_from: "https://agentusecases.ai/use-case/build-a-game-level-from-a-design-document"
---

# Build a game level from a design document

> The poster had Grok 4.5 build a level of an existing Three.js game from a detailed game design document, followed by some manual cleanup.

**Category:** Games & Simulations  
**Agent:** Grok Bot  
**Source:** Reddit · Jul 11, 2026

## What they did

The poster used Grok 4.5 to build level 2 of an existing Three.js game from a very detailed game design document, using their own game-dev harness as the setup around the model. The source only says the level was AI-built and then manually cleaned up and polished afterward by the poster.

## How it went

The result was a playable new level for the existing game, but the poster said it still lacked in several areas and they were polishing it. They also said Grok itself was relatively affordable compared with some other recent-model experiments.

## Worth knowing

The main catch the poster mentions is that this took a very detailed design document plus follow-up cleanup and polishing, not just a one-shot prompt.

## Prompt

```text
Read my game design document at [path to GDD file] and the existing Three.js project in [path to repo]. Build level [level name or number] as described, reusing the existing code patterns, and run it to check that it loads. Stop when the level is playable and give me a list of anything you couldn't implement or that needs manual cleanup.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
- [Monitor competitor marketplace prices](./monitor-competitor-marketplace-prices.md)
- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Build a 2D platformer game without coding](./build-a-2d-platformer-game-without-coding.md)
- [Vibe-code a Flappy Bird game for DeskHog](./vibe-code-a-flappy-bird-game-for-deskhog.md)
