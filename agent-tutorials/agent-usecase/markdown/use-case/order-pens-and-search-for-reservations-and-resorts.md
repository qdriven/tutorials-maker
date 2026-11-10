---
title: "Order pens and search for reservations and resorts"
slug: "order-pens-and-search-for-reservations-and-resorts"
summary: "Operator found a 144-pack of pens on Staples after Amazon blocked it; restaurant booking failed and the resort search chose random dates."
category: "Shopping & Errands"
agents:
  - name: "Operator"
    slug: "operator"
source_platform: "vktr.com"
source_date: "Undated"
source_url: "https://www.vktr.com/ai-technology/openais-operator-in-action-what-it-can-and-cant-do/"
fetched_from: "https://agentusecases.ai/use-case/order-pens-and-search-for-reservations-and-resorts"
---

# Order pens and search for reservations and resorts

> Operator found a 144-pack of pens on Staples after Amazon blocked it; restaurant booking failed and the resort search chose random dates.

**Category:** Shopping & Errands  
**Agent:** Operator  
**Source:** vktr.com · Undated

## What they did

The author asked OpenAI's Operator, which drives its own browser, to order blue pens. After Amazon blocked it, it moved to Staples.com and filtered by brand and ink color. It proposed a pack, got a yes, and ran guest checkout. It handed control back at payment. Separately, an executive strategist asked it to find a Mexico resort.

## How it went

It found 144 BIC blue pens for $23.39, and the author finished the payment. Restaurant booking failed: wrong location at first, then blocked pages. The resort search picked random dates and locations without asking questions.

## Worth knowing

Operator asks you to take over for logins, payment details and CAPTCHAs, so the purchase is never fully hands-off. It also requires the $200 per month Pro plan.

## Prompt

```text
Find [product, e.g. a 144-pack of pens] on [store, e.g. Amazon or Staples] at the best price with delivery by [date]. If one site blocks you, try another reputable retailer. Stop at the checkout page and show me the item, quantity, total price and delivery address before you pay for anything.
```

## Related use cases

- [Find a toy and start checkout with Operator](./find-a-toy-and-start-checkout-with-operator.md)
- [Research sales leads with Operator](./research-sales-leads-with-operator.md)
- [Contact OpenAI support on the user's behalf](./contact-openai-support-on-the-user-s-behalf.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Research buying a yak](./research-buying-a-yak.md)
- [Let Claude buy a game autonomously](./let-claude-buy-a-game-autonomously.md)
