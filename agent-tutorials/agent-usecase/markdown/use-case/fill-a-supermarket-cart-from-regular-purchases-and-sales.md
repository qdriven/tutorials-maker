---
title: "Fill a supermarket cart from regular purchases and sales"
slug: "fill-a-supermarket-cart-from-regular-purchases-and-sales"
summary: "A developer built a Claude Code skill using Silpo's MCP server to re-add usual groceries, check sales and fill the real cart within a budget, leaving checkout to the human."
category: "Shopping & Errands"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/mit9/real-world-agentic-e-commerce-rebuilding-my-grocery-cart-with-claude-and-mcp-3b82"
fetched_from: "https://agentusecases.ai/use-case/fill-a-supermarket-cart-from-regular-purchases-and-sales"
---

# Fill a supermarket cart from regular purchases and sales

> A developer built a Claude Code skill using Silpo's MCP server to re-add usual groceries, check sales and fill the real cart within a budget, leaving checkout to the human.

**Category:** Shopping & Errands  
**Agent:** Claude Code  
**Source:** dev.to · Undated

## What they did

The developer wrote silpo-agent-cli, a terminal CLI and Claude Code skill that talks to Silpo's official MCP server. You give Claude a plain-language instruction, such as reordering usual groceries, swapping in a sale brand and staying under 1500 UAH. Claude reads purchase history, weighs costs, checks stock and fills the real cart. It stops at a ready cart, and the human handles checkout, delivery address and payment.

## How it went

The source gives no measured results. It says weekly shopping is about 80% repeat purchases, and re-adding them by hand takes 15–20 minutes. It includes a demo GIF and video but no test data.

## Worth knowing

Checkout, address and payment are deliberately left to the user, so the cart still needs your review. Install with pip or run it through uvx.

## Prompt

```text
Create a skill that connects to [supermarket]'s MCP server, re-adds my usual groceries from [list or past orders], checks current sales for them, and fills the real cart within a budget of [amount]. Suggest cheaper swaps where there are sales but ask me before swapping. Stop when the cart is filled and show me the cart and total; do not check out.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Research buying a yak](./research-buying-a-yak.md)
- [Negotiate a TV price with a retailer's chat](./negotiate-a-tv-price-with-a-retailer-s-chat.md)
