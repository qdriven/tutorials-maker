---
title: "Buy products through an agent and track the order"
slug: "buy-products-through-an-agent-and-track-the-order"
summary: "Per Rye, a user had his OpenClaw agent find products and check out via Rye's checkout API, with items delivered and order status polled afterwards."
category: "Shopping & Errands"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "rye.com"
source_date: "Undated"
source_url: "https://rye.com/blog/openclaw-buy-anything-skill-agentic-checkout"
fetched_from: "https://agentusecases.ai/use-case/buy-products-through-an-agent-and-track-the-order"
---

# Buy products through an agent and track the order

> Per Rye, a user had his OpenClaw agent find products and check out via Rye's checkout API, with items delivered and order status polled afterwards.

**Category:** Shopping & Errands  
**Agent:** OpenClaw  
**Source:** rye.com · Undated

## What they did

Ryan Eade installed Rye's free buy-anything skill in OpenClaw. He gives the agent a product URL, and it takes shipping details from saved memory or asks for them. The card is tokenized through Stripe, so card numbers never enter the chat. Rye's API handles pricing, tax, shipping and placing the order. The agent then polls order status and reports the confirmation and total.

## How it went

Per Rye, Ryan made real purchases that were delivered, and he says it is 100x better than his Alexa flow. The skill handled the Amazon purchase challenge on a podcast demo. The source gives no cost or failure data.

## Worth knowing

You need a Rye API key. The skill asks you to set a maximum purchase price before the first order, and the API rejects any order above it.

## Prompt

```text
Find [product description] from a reputable seller, with a budget under [amount] and delivery to [address] by [date]. Show me the top options with price, shipping, and a link, and let me pick. Before you check out, pause and show me the item, total, and shipping address, then after I approve, place the order and check its status until it ships.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Find holiday gifts and check stock and sales](./find-holiday-gifts-and-check-stock-and-sales.md)
- [Compare Coca-Cola prices across Belgian supermarkets](./compare-coca-cola-prices-across-belgian-supermarkets.md)
