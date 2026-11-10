---
title: "Build a racing game from a single prompt"
slug: "build-a-racing-game-from-a-single-prompt"
summary: "Codex made a racing game with multiple racers, eight maps and items from one prompt, acting as designer, developer and QA tester by playing it."
category: "Games & Simulations"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "openai.com"
source_date: "Undated"
source_url: "https://openai.com/index/introducing-the-codex-app/"
fetched_from: "https://agentusecases.ai/use-case/build-a-racing-game-from-a-single-prompt"
---

# Build a racing game from a single prompt

> Codex made a racing game with multiple racers, eight maps and items from one prompt, acting as designer, developer and QA tester by playing it.

**Category:** Games & Simulations  
**Agent:** Codex  
**Source:** openai.com · Undated

## What they did

Codex got one detailed prompt for a Three.js voxel kart racer, plus an image generation skill and a web game development skill. It then worked alone, acting as designer, developer and QA tester by playing the game. It was repeatedly re-prompted from a random list of ten generic prompts, such as finding what's missing, adding features, testing them and fixing bugs.

## How it went

The build produced a racing game with different racers, eight maps and space-bar items, using over 7 million tokens. Earlier iterations are published so you can see how it improved. The source gives no quality assessment.

## Worth knowing

The whole run used more than 7 million tokens from a single initial prompt, so expect heavy usage. The prompt is summarized, not verbatim.

## Prompt

```text
Build a browser-based [racing] game in [folder] with [number] racers, [number] maps, and [power-ups or items]. Then play-test it yourself, fix any bugs or balance problems you find, and write a short QA report. You are done when the game runs with one command and you have listed how to start it and what you fixed.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Diagnose a killed process on a server](./diagnose-a-killed-process-on-a-server.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Code a 3D plane game in the browser](./code-a-3d-plane-game-in-the-browser.md)
- [Build and grow a mobile game with bots](./build-and-grow-a-mobile-game-with-bots.md)
