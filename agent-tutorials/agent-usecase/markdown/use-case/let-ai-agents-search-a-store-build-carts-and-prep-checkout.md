---
title: "Let AI agents search a store, build carts, and prep checkout"
slug: "let-ai-agents-search-a-store-build-carts-and-prep-checkout"
summary: "A store is set up so Claude or ChatGPT agents can search the catalog, build a cart, and apply promo codes, then hand over a checkout link before payment."
category: "Shopping & Errands"
agents:
  - name: "Claude"
    slug: "claude"
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "Reddit"
source_date: "Aug 1, 2026"
source_url: "https://www.reddit.com/r/AI_In_ECommerce/comments/1vcx8s9/i_made_chatgpt_find_and_buy_products_from_real"
fetched_from: "https://agentusecases.ai/use-case/let-ai-agents-search-a-store-build-carts-and-prep-checkout"
---

# Let AI agents search a store, build carts, and prep checkout

> A store is set up so Claude or ChatGPT agents can search the catalog, build a cart, and apply promo codes, then hand over a checkout link before payment.

**Category:** Shopping & Errands  
**Agent:** Claude, ChatGPT  
**Source:** Reddit · Aug 1, 2026

## What they did

The post is a pitch rather than a walkthrough: the author says they can make ecommerce sites “agentic commerce ready” so ChatGPT users can discover products through Vendable. The concrete mechanics come from a seller’s comment, which says their store exposes its own MCP server so Claude or ChatGPT agents can search the catalog, create a custom tee, build a cart, and start checkout, with payment completed on the store site.

## How it went

The thread gives no performance numbers or rollout results. It does show at least one live store claiming the flow works today, but the discussion leaves the checkout handoff and implementation details mostly unexplained.

## Worth knowing

The main catch is that the thread is thin on technical setup and results; for payment, a commenter explicitly asks whether checkout stays in ChatGPT or moves to the merchant site.

## Prompt

```text
Go to [store website] and find [items I want, with size, color, quantity] within a budget of [$X]. Add them to the cart, try any available promo codes, and stop at the checkout page. Show me the cart contents, final total, and checkout link, and do not enter payment details or place the order.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Triage support emails and draft refund-policy replies](./triage-support-emails-and-draft-refund-policy-replies.md)
- [Negotiate a car purchase with ChatGPT](./negotiate-a-car-purchase-with-chatgpt.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Build an Instacart list for a charcuterie board](./build-an-instacart-list-for-a-charcuterie-board.md)
- [Shop, play a game and compile course info with Operator](./shop-play-a-game-and-compile-course-info-with-operator.md)
