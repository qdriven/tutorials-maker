---
title: "Pre-stage household grocery carts from Instacart history"
slug: "pre-stage-household-grocery-carts-from-instacart-history"
summary: "An OpenClaw add-on scrapes Instacart order history, predicts what the household is running out of, fills the cart twice weekly and texts; nothing ships until the user taps Place Order."
category: "Shopping & Errands"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "github.com"
source_date: "Undated"
source_url: "https://github.com/kmanan/spratt-skills"
fetched_from: "https://agentusecases.ai/use-case/pre-stage-household-grocery-carts-from-instacart-history"
---

# Pre-stage household grocery carts from Instacart history

> An OpenClaw add-on scrapes Instacart order history, predicts what the household is running out of, fills the cart twice weekly and texts; nothing ships until the user taps Place Order.

**Category:** Shopping & Errands  
**Agent:** OpenClaw  
**Source:** github.com · Undated

## What they did

A nightly script imports each day's Instacart orders into a local SQLite database using Instacart's own item IDs, via a community CLI. A SQL analyzer takes the median days between purchases for each item and marks items due, soon, or not due. On Wednesday and Saturday at 7:45am, a script adds the due items to the cart by ID. At 8am it sends one iMessage. The CLI has no checkout action, so the user places the order.

## How it went

Moving from an LLM clicking through the browser to canonical IDs took accuracy from eleven of fourteen items wrong on a typical run to 100%. The loop is fully deterministic, with no LLM in it.

## Worth knowing

The earlier browser-clicking LLM version got most items wrong, so use item IDs rather than search. Setup is about 20 minutes, needs an active Instacart session, and the example scheduling uses macOS launchd.

## Prompt

```text
Look at my [Instacart] order history, work out what my household is likely running low on, and fill a cart for [store] with those items twice a week. Text me a summary of the cart with quantities and the total. Don't place the order. Wait for me to confirm it.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Find holiday gifts and check stock and sales](./find-holiday-gifts-and-check-stock-and-sales.md)
- [Compare Coca-Cola prices across Belgian supermarkets](./compare-coca-cola-prices-across-belgian-supermarkets.md)
