---
title: "Let an agent make purchases from a pre-funded balance"
slug: "let-an-agent-make-purchases-from-a-pre-funded-balance"
summary: "A commenter's agent completed a purchase from a pre-funded balance, buying an $18 gift card to cover a $17.73 order."
category: "Shopping & Errands"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "May 31, 2026"
source_url: "https://www.reddit.com/r/AI_Agents/comments/1tt63lu/has_anyone_actually_used_an_agent_to_make_payments"
fetched_from: "https://agentusecases.ai/use-case/let-an-agent-make-purchases-from-a-pre-funded-balance"
---

# Let an agent make purchases from a pre-funded balance

> A commenter's agent completed a purchase from a pre-funded balance, buying an $18 gift card to cover a $17.73 order.

**Category:** Shopping & Errands  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · May 31, 2026

## What they did

A commenter said Muse handled the shopping run itself. Their first attempt used the normal card path, but checkout stalled when the bank triggered 3-D Secure, which the unattended agent could not complete; using a pre-funded balance instead, the agent bought an $18 gift card to pay for a $17.73 order.

## How it went

The pre-funded-balance flow completed autonomously, and the card on file was charged $0.00. The reported weak points were not the purchase logic but checkout blockers like 3-D Secure, login walls, and CAPTCHAs.

## Worth knowing

The main catch was that card payments broke on 3-D Secure, and login walls or CAPTCHAs can stop the run before payment regardless of method.

## Prompt

```text
I've pre-funded [account or balance name] with [amount]. Find [item to buy] from [site or store] at the best price within that balance, and get everything ready for checkout. If the exact total doesn't match the balance, tell me about options such as a gift card. Pause before any payment and show me the item, total, and shipping address for my approval.
```

## Related use cases

- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Order pens and search for reservations and resorts](./order-pens-and-search-for-reservations-and-resorts.md)
- [Build an Instacart list for a charcuterie board](./build-an-instacart-list-for-a-charcuterie-board.md)
- [Watch item prices and email on drops](./watch-item-prices-and-email-on-drops.md)
- [Run an online store's inventory, listings and photos](./run-an-online-store-s-inventory-listings-and-photos.md)
- [Use Operator to book tables, compare products and fill forms](./use-operator-to-book-tables-compare-products-and-fill-forms.md)
