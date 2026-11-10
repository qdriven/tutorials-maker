---
title: "Have an agent play Forza Horizon and web games"
slug: "have-an-agent-play-forza-horizon-and-web-games"
summary: "Developers showed OpenClaw playing Forza Horizon on its own, imperfectly, and built playable bots for a multiplayer web game."
category: "Games & Simulations"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "pcbuildadvisor.com"
source_date: "Undated"
source_url: "https://www.pcbuildadvisor.com/can-openclaw-play-games-a-complete-2026-guide/"
fetched_from: "https://agentusecases.ai/use-case/have-an-agent-play-forza-horizon-and-web-games"
---

# Have an agent play Forza Horizon and web games

> Developers showed OpenClaw playing Forza Horizon on its own, imperfectly, and built playable bots for a multiplayer web game.

**Category:** Games & Simulations  
**Agent:** OpenClaw  
**Source:** pcbuildadvisor.com · Undated

## What they did

The article summarizes community reports, not its own test. A developer on LinkedIn showed OpenClaw driving Forza Horizon with the keyboard and mouse untouched. The agent screenshots the game, a vision model reads it, and it sends inputs in a loop. A Hacker News developer used OpenClaw to build bots for a multiplayer web game.

## How it went

Forza driving was autonomous but far from good, and not competitive. The web-game bots were the first that competed meaningfully, after several failed attempts with standard LLM-based bots.

## Worth knowing

Frequent vision-model loops can cost an estimated $5 to $30 per day on API models. Online games with anti-cheat may ban accounts for automation.

## Prompt

```text
Open [game or web game name] on my computer and try playing it on your own for [10 minutes], aiming to [objective, e.g. finish one race or reach level 3]. Narrate what you try and where you get stuck, then give me a short summary of how well it went. Don't make purchases, sign into accounts, or send messages without asking me first.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Code a 3D plane game in the browser](./code-a-3d-plane-game-in-the-browser.md)
- [Run a D&D dungeon crawl with an AI dungeon master](./run-a-d-d-dungeon-crawl-with-an-ai-dungeon-master.md)
