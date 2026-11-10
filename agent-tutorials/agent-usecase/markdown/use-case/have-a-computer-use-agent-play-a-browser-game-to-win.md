---
title: "Have a computer-use agent play a browser game to win"
slug: "have-a-computer-use-agent-play-a-browser-game-to-win"
summary: "Ethan Mollick told Claude's computer-use agent to win Universal Paperclips; it clicked repeatedly, then wrote code to automate the game after a hint, though the desktop crashed partway. · Oct 29, 2026"
category: "Games & Simulations"
agents:
  - name: "Claude computer use"
    slug: "claude-computer-use"
source_platform: "oneusefulthing.org"
source_date: "Oct 29, 2026 · Submitted by from search gap: 游戏"
source_url: "https://www.oneusefulthing.org/p/when-you-give-a-claude-a-mouse"
fetched_from: "https://agentusecases.ai/use-case/have-a-computer-use-agent-play-a-browser-game-to-win"
---

# Have a computer-use agent play a browser game to win

> Ethan Mollick told Claude's computer-use agent to win Universal Paperclips; it clicked repeatedly, then wrote code to automate the game after a hint, though the desktop crashed partway. · Oct 29, 2026

**Category:** Games & Simulations  
**Agent:** Claude computer use  
**Source:** oneusefulthing.org · Oct 29, 2026 · Submitted by from search gap: 游戏

## What they did

Mollick gave a Claude computer-use model, connected to a remote desktop, the game's URL and told it to win. It clicked while taking screenshots, summarized progress every 15 or so clicks, and ran A/B pricing tests. After a crash he restarted it with a hint to use its abilities as a computer. It wrote automation code, which didn't work, so it went back to mouse and keyboard.

## How it went

It made over 100 independent moves and ran nearly an hour unprompted. A pricing math error wasted time and took several nudges to fix. After a second desktop crash it gave up and declared victory.

## Worth knowing

The agent is slow and not cheap, so one mistake like the pricing error can waste a lot of time; Mollick says it resists steering mid-run.

## Prompt

```text
Open [browser game, e.g. Universal Paperclips] in the browser and play it with the goal of winning. Start by playing manually, and if progress is slow, look for a way to automate repetitive actions safely within the page. Stop when the game is won or you get stuck, and report what you tried; don't touch anything outside the game window.
```

## Related use cases

- [Fill out a Form 1040 with computer use](./fill-out-a-form-1040-with-computer-use.md)
- [Research a blog post with Claude computer use](./research-a-blog-post-with-claude-computer-use.md)
- [Apply to 50 jobs in under 30 minutes](./apply-to-50-jobs-in-under-30-minutes.md)
- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Build a racing game from a single prompt](./build-a-racing-game-from-a-single-prompt.md)
- [Run a D&D dungeon crawl with an AI dungeon master](./run-a-d-d-dungeon-crawl-with-an-ai-dungeon-master.md)
