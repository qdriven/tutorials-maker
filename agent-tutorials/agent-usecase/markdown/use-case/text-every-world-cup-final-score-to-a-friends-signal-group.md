---
title: "Text every World Cup final score to a friends' Signal group"
slug: "text-every-world-cup-final-score-to-a-friends-signal-group"
summary: "A Claude Code-built agent checked ESPN every 30 minutes and sent each 2026 World Cup final score, written up in a persona, to a 3-person Signal group, with a code check on scores. · Oct 11, 2026"
category: "Life Admin & Home"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Claude"
    slug: "claude"
source_platform: "github.com"
source_date: "Oct 11, 2026 · Submitted by Bronson Elliott"
source_url: "https://github.com/bronsonelliott/worldcup-scores-bot-public"
fetched_from: "https://agentusecases.ai/use-case/text-every-world-cup-final-score-to-a-friends-signal-group"
---

# Text every World Cup final score to a friends' Signal group

> A Claude Code-built agent checked ESPN every 30 minutes and sent each 2026 World Cup final score, written up in a persona, to a 3-person Signal group, with a code check on scores. · Oct 11, 2026

**Category:** Life Admin & Home  
**Agent:** Claude Code, Claude  
**Source:** github.com · Oct 11, 2026 · Submitted by Bronson Elliott

## What they did

Built with Claude Code in one evening. A macOS LaunchDaemon runs a Python script every 30 minutes. It pulls ESPN's public scoreboard, finds finished matches not yet sent, and has Claude Haiku write each result as the persona Claudia. A plain non-AI check confirms the score appears before sending through signal-cli. If the check fails, it sends the plain score line.

## How it went

All 104 matches were sent over 39 days with no duplicates or send errors. 101 got persona write-ups and 3 fell back to plain lines. One shipped bug reported a penalty-shootout win as a 1–1 tie before it was fixed.

## Worth knowing

Fetch yesterday's and today's ESPN scoreboards, and check match status so shootouts aren't read as draws. Cost was pennies, one short Haiku call per match.

## Prompt

```text
Build me a small agent that checks [ESPN or another scores site] every [30 minutes] during [tournament or season] and texts each final score for [team or league] to my [Signal/WhatsApp] group, written in the voice of [a persona, e.g. a dramatic sports announcer]. Add a code check so it only sends a score once the game is final and never sends the same result twice. Before you send anything to the group, show me a sample message and wait for my okay.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build retro games with a child using Claude Code](./build-retro-games-with-a-child-using-claude-code.md)
- [Generate ad-copy variants and scrape competitor ads](./generate-ad-copy-variants-and-scrape-competitor-ads.md)
- [Run an offline car assistant on a Raspberry Pi](./run-an-offline-car-assistant-on-a-raspberry-pi.md)
- [Find a London flat to rent](./find-a-london-flat-to-rent.md)
- [Maintain a home media library and handle personal projects](./maintain-a-home-media-library-and-handle-personal-projects.md)
