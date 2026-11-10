---
title: "Track pantry stock from receipts and buy groceries"
slug: "track-pantry-stock-from-receipts-and-buy-groceries"
summary: "A custom AI system reads receipts, estimates kitchen stock, checks grocery store availability and prices, buys groceries, and suggests recipes."
category: "Shopping & Errands"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "X"
source_date: "Oct 5, 2026"
source_url: "https://x.com/ZacariahHeim/status/2107123309095596211"
fetched_from: "https://agentusecases.ai/use-case/track-pantry-stock-from-receipts-and-buy-groceries"
---

# Track pantry stock from receipts and buy groceries

> A custom AI system reads receipts, estimates kitchen stock, checks grocery store availability and prices, buys groceries, and suggests recipes.

**Category:** Shopping & Errands  
**Agent:** custom-built or unnamed agent  
**Source:** X · Oct 5, 2026

## What they did

User ingests receipts and spending data into a custom service, then exposes a grocery budget envelope plus recipe history and financial data to a stock estimator tool. A second tool connects to local grocery store APIs for nutrition, availability, and prices. Both tools are exposed over a terse MCP surface to an AI harness (ChatGPT plus opencodev2) that produces stock updates, budgeting, and recipe recommendations.

## How it went

The system genuinely saves the user time and money through ongoing stock estimates and recommendations. No purchase execution or quantitative results are stated.

## Worth knowing

User offered to open-source the stack if others want it.

## Prompt

```text
In the folder [path to receipts] I have grocery receipts. Read them, build a running estimate of what's in my kitchen, and save it as [pantry file name]. Then list what I'm likely low on, suggest [number] recipes using what I have, and prepare a shopping list. You are done when the pantry file and shopping list exist; don't buy anything without showing me the list first.
```

## Related use cases

- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Order pens and search for reservations and resorts](./order-pens-and-search-for-reservations-and-resorts.md)
- [Build an Instacart list for a charcuterie board](./build-an-instacart-list-for-a-charcuterie-board.md)
- [Watch item prices and email on drops](./watch-item-prices-and-email-on-drops.md)
- [Shop, play a game and compile course info with Operator](./shop-play-a-game-and-compile-course-info-with-operator.md)
- [Phone stores to check if items are in stock](./phone-stores-to-check-if-items-are-in-stock.md)
