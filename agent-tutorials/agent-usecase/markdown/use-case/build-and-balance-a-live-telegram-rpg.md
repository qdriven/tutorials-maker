---
title: "Build and balance a live Telegram RPG"
slug: "build-and-balance-a-live-telegram-rpg"
summary: "A non-coding PM had Claude Code write a Telegram RPG bot, deploy it over SSH, and run tens of thousands of test fights to rebalance classes."
category: "Games & Simulations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "retrostylegames.com"
source_date: "Undated"
source_url: "https://retrostylegames.com/blog/claude-code-game-dev-case-study/"
fetched_from: "https://agentusecases.ai/use-case/build-and-balance-a-live-telegram-rpg"
---

# Build and balance a live Telegram RPG

> A non-coding PM had Claude Code write a Telegram RPG bot, deploy it over SSH, and run tens of thousands of test fights to rebalance classes.

**Category:** Games & Simulations  
**Agent:** Claude Code  
**Source:** retrostylegames.com · Undated

## What they did

A project manager who doesn't code owned the design and every balance decision. Claude Code wrote all of the bot, from combat to a player market. It deployed over SSH, checked the bot was running, and built analytics that the two read together. For the class rebalance, it ran tens of thousands of test fights and proposed safe fixes.

## How it went

Two evenings produced a prototype, and a live game followed in six weeks. After seven weeks it had 164 players, 109 of them active in the last day. The author ran no marketing, and paid ads did poorly.

## Worth knowing

The article gives no cost figures or details of the test-fight setup. Its stated lesson is that the human supplies the vision and the balance calls, while the AI does the execution.

## Prompt

```text
Build a Telegram RPG bot where players pick from [number] classes like [class names] and fight [enemy types]. Write a simulation that runs [10,000+] test fights to check class balance and adjust stats until no class wins more than [percent]% of the time. Before deploying to my server at [host] over SSH, pause and show me the deployment steps and bot token handling for approval.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Play mayor in SimCity through an API](./play-mayor-in-simcity-through-an-api.md)
- [Design a Polkadot parachain strategy game concept](./design-a-polkadot-parachain-strategy-game-concept.md)
- [Run a D&D dungeon crawl with an AI dungeon master](./run-a-d-d-dungeon-crawl-with-an-ai-dungeon-master.md)
