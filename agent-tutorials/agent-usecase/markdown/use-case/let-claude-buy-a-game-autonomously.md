---
title: "Let Claude buy a game autonomously"
slug: "let-claude-buy-a-game-autonomously"
summary: "The poster built payment infrastructure so Claude could complete a game purchase on its own when told to, in about 60 seconds."
category: "Shopping & Errands"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1owqgrp/i_just_bought_a_game_in_60_seconds_by_telling"
fetched_from: "https://agentusecases.ai/use-case/let-claude-buy-a-game-autonomously"
---

# Let Claude buy a game autonomously

> The poster built payment infrastructure so Claude could complete a game purchase on its own when told to, in about 60 seconds.

**Category:** Shopping & Errands  
**Agent:** Claude  
**Source:** Reddit · Undated

## What they did

The poster says they built payment infrastructure with a few custom MCPs so Claude could shop for a game. In the demo, Claude searched 10,000+ games, found Civilization III Complete for $0.99, authorized payment through x402 with a human confirmation step, settled funds through an MCP server with a digital wallet, and then received the license key.

## How it went

The run took 60 seconds total with 0 clicks, broken out as 10 seconds for search, 5 for authorization, 30 for settlement, and 15 for fulfillment. It was a demo merchant integration, and the poster says settlement and secure buyer-merchant exchange were the tricky parts.

## Worth knowing

If you copy this, the source’s clearest catch is that payment can be manually approved at each step or constrained with purchase limits and whitelisted merchants.

## Prompt

```text
Go to [store name] and buy the game [game title] for [platform] if the price is at or below [max price]. Use the saved payment method on my account. Pause and show me the item, price, and total at the final checkout step before you pay, and finish when I've confirmed and you've shown me the order confirmation.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Build an Instacart list for a charcuterie board](./build-an-instacart-list-for-a-charcuterie-board.md)
- [Buy a microwave from Costco](./buy-a-microwave-from-costco.md)
