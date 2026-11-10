---
title: "Build group grocery carts through a Signal-based agent"
slug: "build-group-grocery-carts-through-a-signal-based-agent"
summary: "A self-hosted Signal agent drafts a grocery list from past orders, lets group members edit it, then logs into the store and builds and validates the cart; the author finishes checkout manually."
category: "Shopping & Errands"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Feb 22, 2026"
source_url: "https://news.ycombinator.com/item?id=47110375"
fetched_from: "https://agentusecases.ai/use-case/build-group-grocery-carts-through-a-signal-based-agent"
---

# Build group grocery carts through a Signal-based agent

> A self-hosted Signal agent drafts a grocery list from past orders, lets group members edit it, then logs into the store and builds and validates the cart; the author finishes checkout manually.

**Category:** Shopping & Errands  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Feb 22, 2026

## What they did

The author runs a self-hosted agent through Signal, with group chat limited to whitelisted accounts. It drafts a starter grocery list from past orders, kept locally or pulled from the store's site. Group members add or remove items. Then the agent uses a custom browser tool to log in, build the cart from the final list, search for extra requested items, and validate the cart.

## How it went

Cart building works end to end. Checkout isn't automated: the author logs in and does the last two clicks manually, and may add automatic ordering later.

## Worth knowing

The author held back from giving the agent spending power, so a manual final checkout is the safeguard if you copy this.

## Prompt

```text
Set up an agent I can message in [Signal group] that drafts a grocery list from our past [store] orders and lets everyone in the group add or remove items. When I say the list is final, log into [store], build the cart, and check that every item is in stock. Stop before checkout and show me the cart and total so I can pay myself.
```

## Related use cases

- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Order groceries with computer-use agents](./order-groceries-with-computer-use-agents.md)
- [Research buying a yak](./research-buying-a-yak.md)
- [Build an e-commerce agent with OpenClaw](./build-an-e-commerce-agent-with-openclaw.md)
- [Shop, play a game and compile course info with Operator](./shop-play-a-game-and-compile-course-info-with-operator.md)
- [Phone stores to check if items are in stock](./phone-stores-to-check-if-items-are-in-stock.md)
