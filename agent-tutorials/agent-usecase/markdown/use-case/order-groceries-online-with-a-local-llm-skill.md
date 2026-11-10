---
title: "Order groceries online with a local LLM skill"
slug: "order-groceries-online-with-a-local-llm-skill"
summary: "The author built a grocery skill for a local Qwen 3.6 27B model that knows their fridge contents, past orders and real-time stock, and it ordered products for them online."
category: "Shopping & Errands"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Jun 13, 2026"
source_url: "https://news.ycombinator.com/item?id=48519023"
fetched_from: "https://agentusecases.ai/use-case/order-groceries-online-with-a-local-llm-skill"
---

# Order groceries online with a local LLM skill

> The author built a grocery skill for a local Qwen 3.6 27B model that knows their fridge contents, past orders and real-time stock, and it ordered products for them online.

**Category:** Shopping & Errands  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Jun 13, 2026

## What they did

The author built a grocery shopping skill for a local Qwen 3.6 27B model. It gives the model a loose picture of what's in their fridge, about 10 representative past orders covering preferences and local shops and SKUs, and real-time in-stock information. With that in context, the model placed an online grocery order.

## How it went

The order went through while the author was cooking pasta, and they say the local model fully solved the real-time stock problem that cooking-ingredient delivery products never did. Open-ended or ambitious tasks still go faster with Claude or ChatGPT.

## Worth knowing

It works best when the answer is already in the context, so the effort goes into building a knowledge base: fridge contents, order history, and live stock data.

## Prompt

```text
Build me a grocery skill that reads my fridge list in [file or note], my past orders from [store], and current stock at [store website]. Then fill a cart with what I'm running low on for [number] days of meals. Pause and show me the cart and total before checkout, and stop once I've approved the order.
```

## Related use cases

- [Build group grocery carts through a Signal-based agent](./build-group-grocery-carts-through-a-signal-based-agent.md)
- [Order groceries with computer-use agents](./order-groceries-with-computer-use-agents.md)
- [Research buying a yak](./research-buying-a-yak.md)
- [Build an e-commerce agent with OpenClaw](./build-an-e-commerce-agent-with-openclaw.md)
- [Shop, play a game and compile course info with Operator](./shop-play-a-game-and-compile-course-info-with-operator.md)
- [Phone stores to check if items are in stock](./phone-stores-to-check-if-items-are-in-stock.md)
