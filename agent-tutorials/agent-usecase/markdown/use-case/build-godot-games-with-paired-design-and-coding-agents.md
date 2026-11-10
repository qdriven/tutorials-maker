---
title: "Build Godot games with paired design and coding agents"
slug: "build-godot-games-with-paired-design-and-coding-agents"
summary: "Cowork handles design docs, task queues and playtests while Claude Code writes GDScript and runs Godot and git."
category: "Games & Simulations"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "github.com"
source_date: "Undated"
source_url: "https://github.com/Freakling/Claude4Godot"
fetched_from: "https://agentusecases.ai/use-case/build-godot-games-with-paired-design-and-coding-agents"
---

# Build Godot games with paired design and coding agents

> Cowork handles design docs, task queues and playtests while Claude Code writes GDScript and runs Godot and git.

**Category:** Games & Simulations  
**Agent:** Claude Cowork, Claude Code  
**Source:** github.com · Undated

## What they did

You copy the Claude4Godot folder into your Godot repo. Cowork installs a set of Markdown files: a design doc, a task queue, a system map and personas. It then runs design sessions, revises the design doc and plans tasks. Claude Code picks the next ready task, writes the GDScript, runs the headless Godot check and commits. You make the design calls and approve every commit and push.

## How it went

The source describes the workflow and its rules only. It reports no results, numbers or example games built with it.

## Worth knowing

Only Claude Code runs Godot and git. Cowork just lists changed files and hands you a commit prompt to paste, so expect that manual handoff.

## Prompt

```text
Help me build a small Godot game: [describe game idea]. First write a short design doc and a prioritized task list in the project folder at [path]. Then implement the tasks one at a time in GDScript, run the project to check it works, and commit each finished task to git. Stop after [number] tasks and summarize what to playtest.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Track personal finances nightly from bank emails](./track-personal-finances-nightly-from-bank-emails.md)
- [Summarize Reddit threads before writing code](./summarize-reddit-threads-before-writing-code.md)
- [Play mayor in SimCity through an API](./play-mayor-in-simcity-through-an-api.md)
- [Design a Polkadot parachain strategy game concept](./design-a-polkadot-parachain-strategy-game-concept.md)
- [Run a D&D dungeon crawl with an AI dungeon master](./run-a-d-d-dungeon-crawl-with-an-ai-dungeon-master.md)
