---
title: "Analyze your chess games into commented videos"
slug: "analyze-your-chess-games-into-commented-videos"
summary: "A Claude Code skill uses Claude vision plus Stockfish and your audio notes to turn a Lichess game into a commented video analysis. · Sep 26, 2026"
category: "Life Admin & Home"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_url: "https://github.com/brumar/chess-postmortem-skills"
fetched_from: "https://agentusecases.ai/use-case/analyze-your-chess-games-into-commented-videos"
---

# Analyze your chess games into commented videos

> A Claude Code skill uses Claude vision plus Stockfish and your audio notes to turn a Lichess game into a commented video analysis. · Sep 26, 2026

**Category:** Life Admin & Home  
**Agent:** Claude Code

## What they did

The author recorded themselves thinking aloud during a 15+10 rapid game, then gave Claude Code the Lichess link and the mp3. Claude transcribed it locally with whisper.cpp and matched sentences to moves using PGN clock times. It ran a Stockfish sweep, and subagents questioned the engine about each mistake. A verifier pass checked the result, then a storyboard became a narrated video.

## How it went

It produced an annotated PGN, an HTML board and a 6:49 narrated video with subtitles for the author's real game. The author says errors are rare but the AI can still get things wrong.

## Worth knowing

A full run takes about an hour of processing, so use it on slow games where you took time to think, not on blitz.

## Prompt

```text
Take my chess game from Lichess at [game URL] and analyze it with Stockfish to find the biggest mistakes and best moves. Combine that with my notes in [audio file or text file] and produce a commented video walkthrough of the game. Stop when the video file is saved and give me a short list of the key moments covered.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a personal doorman agent on a $7 VPS](./run-a-personal-doorman-agent-on-a-7-vps.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Place library holds for books you need](./place-library-holds-for-books-you-need.md)
