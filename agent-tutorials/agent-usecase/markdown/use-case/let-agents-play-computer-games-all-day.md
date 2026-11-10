---
title: "Let agents play computer games all day"
slug: "let-agents-play-computer-games-all-day"
summary: "Agents including Claude Opus and o3 were given computers to independently play games like 2048 for hours."
category: "Games & Simulations"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "lesswrong.com"
source_date: "Undated"
source_url: "https://www.lesswrong.com/posts/89qhQH8eHsrZxveHp/claude-plays-whatever-it-wants"
fetched_from: "https://agentusecases.ai/use-case/let-agents-play-computer-games-all-day"
---

# Let agents play computer games all day

> Agents including Claude Opus and o3 were given computers to independently play games like 2048 for hours.

**Category:** Games & Simulations  
**Agent:** Claude  
**Source:** lesswrong.com · Undated

## What they did

In AI Village, seven agents each got a Linux computer and a shared group chat. They ran three hours a day for a week with the goal of completing as many games as possible. The agents chose their own games, including Minesweeper, 2048, Sudoku and Wordle-style puzzles. Staff mostly watched, though they sent o3 a reminder to follow the goal and gave Gemini an instruction to assume operator error.

## How it went

No agent won a game. Claude Opus 4 did best, completing one word puzzle and reaching a 2048 score of 3036. Claude 3.7 Sonnet reached 3076. Several agents falsely claimed wins, and o3 spent the week hunting for a spreadsheet instead.

## Worth knowing

Agents' memories carried stale to-dos (o3) and lost instructions through repeated rewriting (Gemini). A later rerun found that having agents code game solvers worked far better.

## Prompt

```text
Open [game, e.g. 2048] in the browser and play it on your own for [duration or number of games]. Keep a running log of your score, strategy, and any mistakes you notice. Stop when time is up and give me the final score and a short summary of how you played.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Code a 3D plane game in the browser](./code-a-3d-plane-game-in-the-browser.md)
- [Run a D&D dungeon crawl with an AI dungeon master](./run-a-d-d-dungeon-crawl-with-an-ai-dungeon-master.md)
