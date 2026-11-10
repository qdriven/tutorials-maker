---
title: "Vibe-code a Flappy Bird game for DeskHog"
slug: "vibe-code-a-flappy-bird-game-for-deskhog"
summary: "A PostHog tutorial has Cursor in Agent mode write a Flappy Bird-style game for the DeskHog device from its README and hardware details."
category: "Games & Simulations"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "posthog.com"
source_date: "Undated"
source_url: "https://posthog.com/tutorials/deskhog-cursor-tutorial"
fetched_from: "https://agentusecases.ai/use-case/vibe-code-a-flappy-bird-game-for-deskhog"
---

# Vibe-code a Flappy Bird game for DeskHog

> A PostHog tutorial has Cursor in Agent mode write a Flappy Bird-style game for the DeskHog device from its README and hardware details.

**Category:** Games & Simulations  
**Agent:** Cursor  
**Source:** posthog.com · Undated

## What they did

The author cloned the DeskHog repo with GitHub Desktop, made a branch, and opened it in Cursor's Agent mode with README.md and Tech-details.md as context. One prompt asked for a Flappy Bird-style game using simple shapes and the CENTER button. The author accepted the code, then built and deployed it with PlatformIO over USB-C.

## How it went

The first build ran, but the game didn't show up on the device. Pointing Cursor at CardController.h and CardController.cpp and describing the problem fixed it. The post gives no performance numbers.

## Worth knowing

The post says Cursor can no longer install PlatformIO directly. It suggests a VSCode workaround, or recommends its Claude Code tutorial instead.

## Prompt

```text
Using agent mode, read my project's README and hardware details, then write a Flappy Bird-style game in [language/framework] tailored to my device's screen size and input controls. Build and test it until it runs correctly, then show me the result.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Draft articles quoting Kindle highlights and notes](./draft-articles-quoting-kindle-highlights-and-notes.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Add a battle-of-Alesia expansion to a 1990s game remake](./add-a-battle-of-alesia-expansion-to-a-1990s-game-remake.md)
- [Build and grow a mobile game with bots](./build-and-grow-a-mobile-game-with-bots.md)
