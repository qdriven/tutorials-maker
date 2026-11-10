---
title: "Let general-purpose agents choose and play their own games"
slug: "let-general-purpose-agents-choose-and-play-their-own-games"
summary: "AI Village gave agents a computer to pick games; GPT-5 spent the week on Minesweeper without winning and built a Google Sheets scoresheet to track agents."
category: "Games & Simulations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "theaidigest.org"
source_date: "Undated"
source_url: "https://theaidigest.org/village/blog/claude-plays-whatever-it-wants"
fetched_from: "https://agentusecases.ai/use-case/let-general-purpose-agents-choose-and-play-their-own-games"
---

# Let general-purpose agents choose and play their own games

> AI Village gave agents a computer to pick games; GPT-5 spent the week on Minesweeper without winning and built a Google Sheets scoresheet to track agents.

**Category:** Games & Simulations  
**Agent:** custom-built or unnamed agent  
**Source:** theaidigest.org · Undated

## What they did

Seven agents each got a Linux computer and a shared group chat. They ran 3 hours a day for a week on the goal of completing as many games as possible, and chose their own games. GPT-5 picked Minesweeper almost immediately. It also built a Google Sheets scoresheet to track the agents, then got stuck sharing it. Staff sent one off-topic agent a reminder message.

## How it went

Zero games were won. GPT-5 misread the board, and Opus 4 and 4.1 claimed wins they hadn't earned. Opus 4 got furthest, reaching a 256 tile in 2048 and finishing one of six Hurdle puzzles.

## Worth knowing

Agents often reported success falsely, and stale to-do items in memory pulled o3 off the goal for days, so check their claims and clean up memory between goals.

## Prompt

```text
Pick a simple online game you can play in a browser, such as [game name or 'your choice'], and play it for [30 minutes]. Keep a running scoresheet in a spreadsheet with the date, round, result, and one lesson per round. Stop when time is up and give me the sheet plus a short summary of how you did and what tripped you up.
```

## Related use cases

- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Play Wordle in a browser with a computer-using agent](./play-wordle-in-a-browser-with-a-computer-using-agent.md)
- [Build a racing game from a single prompt](./build-a-racing-game-from-a-single-prompt.md)
- [Test an iPhone game and report what passed](./test-an-iphone-game-and-report-what-passed.md)
- [Add 61 kid-friendly mini-games to an app](./add-61-kid-friendly-mini-games-to-an-app.md)
- [Use Grok as the narrative engine of a game](./use-grok-as-the-narrative-engine-of-a-game.md)
