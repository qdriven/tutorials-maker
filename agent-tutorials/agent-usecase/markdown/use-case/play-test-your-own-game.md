---
title: "Play-test your own game"
slug: "play-test-your-own-game"
summary: "A developer built an agentic test harness so an AI could play their game and help with play-testing. · Apr 29, 2026"
category: "Games & Simulations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://blog.jeffschomay.com/letting-ai-play-my-game"
fetched_from: "https://agentusecases.ai/use-case/play-test-your-own-game"
---

# Play-test your own game

> A developer built an agentic test harness so an AI could play their game and help with play-testing. · Apr 29, 2026

**Category:** Games & Simulations  
**Agent:** custom-built or unnamed agent

## What they did

The game is a browser-based, turn-based crossword dungeon. Claude wrote a node.js wrapper that leaves the game files alone. It adds a text renderer and synthetic key events, served over HTTP. The AI played via curl calls, built fixtures to reproduce bugs, and was told to playtest each milestone feature before moving on.

## How it went

Milestone 13, with five new special encounters, took 12 minutes and about 120k tokens. The AI caught and fixed a cage bug on its own. Manual playtesting was still needed and found more bugs, but it took under 30 minutes.

## Worth knowing

It ran on Claude Code with Sonnet 4.6 on the Pro plan; the approach suits text-heavy, turn-based games better than screenshot-driven browser automation.

## Prompt

```text
Look at my game in [path] and build a test harness that lets an AI agent play it: expose the game state as text or JSON and accept actions like [moves or inputs]. Then have the agent play [number] sessions and report bugs, balance problems, and confusing moments. Finished means a written play-test report with steps to reproduce each issue.
```

## Related use cases

- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Play Wordle in a browser with a computer-using agent](./play-wordle-in-a-browser-with-a-computer-using-agent.md)
- [Build a racing game from a single prompt](./build-a-racing-game-from-a-single-prompt.md)
- [Test an iPhone game and report what passed](./test-an-iphone-game-and-report-what-passed.md)
- [Add 61 kid-friendly mini-games to an app](./add-61-kid-friendly-mini-games-to-an-app.md)
- [Use Grok as the narrative engine of a game](./use-grok-as-the-narrative-engine-of-a-game.md)
