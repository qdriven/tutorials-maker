---
title: "Play Game Boy games through an emulator"
slug: "play-game-boy-games-through-an-emulator"
summary: "A developer built an agent where Claude watches game frames from PyBoy, decides actions and presses buttons, using memory tools and periodic summaries. · Oct 29, 2026"
category: "Games & Simulations"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "github.com"
source_date: "Oct 29, 2026 · Submitted by from search gap: 游戏"
source_url: "https://github.com/jmurth1234/ClaudePlayer"
fetched_from: "https://agentusecases.ai/use-case/play-game-boy-games-through-an-emulator"
---

# Play Game Boy games through an emulator

> A developer built an agent where Claude watches game frames from PyBoy, decides actions and presses buttons, using memory tools and periodic summaries. · Oct 29, 2026

**Category:** Games & Simulations  
**Agent:** Claude  
**Source:** github.com · Oct 29, 2026 · Submitted by from search gap: 游戏

## What they did

You supply a ROM, an Anthropic API key and optionally a saved state. Claude 3.7 gets recent screenshots from PyBoy and answers with tool calls. It sends button sequences, sets a goal, and adds, updates or removes memory items. In the default turn-based mode, the emulator advances only when Claude sends inputs. Every 30 turns by default, it writes a progress summary.

## How it went

The README gives no results or progress numbers. It describes a working agent with frame logging for debugging. Movement is purely button-based, with no coordinate helpers.

## Worth knowing

Context is capped by settings: 30 messages and 5 screenshots by default. Thinking budget is 16000 tokens per turn, so API costs may add up.

## Prompt

```text
Build me a Python agent that plays [Game Boy game] through the PyBoy emulator using Claude's API. Each step it should send the current screen frame to Claude, get back a button press, and apply it, with a simple memory file and a summary written every [number] steps. It's done when I can run one command, watch it play for a few minutes, and see the summary log; tell me which ROM and API key setup I need to provide.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Code a 3D plane game in the browser](./code-a-3d-plane-game-in-the-browser.md)
- [Run a D&D dungeon crawl with an AI dungeon master](./run-a-d-d-dungeon-crawl-with-an-ai-dungeon-master.md)
