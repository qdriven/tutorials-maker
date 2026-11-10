---
title: "Build a game tool with Claude Cowork and Maya"
slug: "build-a-game-tool-with-claude-cowork-and-maya"
summary: "The poster used Claude Cowork for months to discuss architecture and generate code for a game tool, moving results into PowerShell and Maya and sending screenshots back for follow-up."
category: "Games & Simulations"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
source_platform: "Reddit"
source_date: "Jun 20, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1u8atjx/claude_coworker_claude_coder"
fetched_from: "https://agentusecases.ai/use-case/build-a-game-tool-with-claude-cowork-and-maya"
---

# Build a game tool with Claude Cowork and Maya

> The poster used Claude Cowork for months to discuss architecture and generate code for a game tool, moving results into PowerShell and Maya and sending screenshots back for follow-up.

**Category:** Games & Simulations  
**Agent:** Claude Cowork  
**Source:** Reddit · Jun 20, 2026

## What they did

The poster says they spent a couple of months building a game-related tool as a non-coder, with a Claude.md prompt file and a loop where they discussed architecture in Claude Cowork, had Cowork generate code, ran that code in PowerShell, imported the results into Maya, then sent screenshots back to Claude to continue iterating. They also sometimes asked Claude for an audit and passed that to ChatGPT for extra input before proceeding.

## How it went

The thread does not report a finished result or any performance numbers; it mainly documents an iterative workflow the poster says has been workable for months. A stated limitation is that Claude could not directly judge the hair renders without screenshots because the unshaded spline view was hard to read.

## Worth knowing

The main catch is manual handoff: code was run outside Claude in PowerShell, checked in Maya, and reviewed through screenshots rather than an integrated render loop.

## Prompt

```text
I'm building a tool for [game or 3D pipeline] in [Maya or another app]. Here's the goal: [describe the tool]. Talk through the architecture with me, then write the code in small testable steps, and tell me where to run each piece. I'll send back error messages and screenshots so you can fix problems. We're done when the tool does [expected behavior] in my project.
```

## Related use cases

- [Summarize email and prep briefings from your phone](./summarize-email-and-prep-briefings-from-your-phone.md)
- [Turn trip receipts into an expense report and triage files](./turn-trip-receipts-into-an-expense-report-and-triage-files.md)
- [Monitor tech subreddits and competitors, draft emails and articles](./monitor-tech-subreddits-and-competitors-draft-emails-and-art.md)
- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Build a racing game from a single prompt](./build-a-racing-game-from-a-single-prompt.md)
- [Add 61 kid-friendly mini-games to an app](./add-61-kid-friendly-mini-games-to-an-app.md)
