---
title: "Find a toy and start checkout with Operator"
slug: "find-a-toy-and-start-checkout-with-operator"
summary: "OpenAI's Operator picked a toy matching criteria and opened Target.com but did not complete the purchase, walking the user through checkout."
category: "Shopping & Errands"
agents:
  - name: "Operator"
    slug: "operator"
source_platform: "melina.substack.com"
source_date: "Undated"
source_url: "https://melina.substack.com/p/i-let-ai-do-my-shopping-heres-what"
fetched_from: "https://agentusecases.ai/use-case/find-a-toy-and-start-checkout-with-operator"
---

# Find a toy and start checkout with Operator

> OpenAI's Operator picked a toy matching criteria and opened Target.com but did not complete the purchase, walking the user through checkout.

**Category:** Shopping & Errands  
**Agent:** Operator  
**Source:** melina.substack.com · Undated

## What they did

Melina Flabiano asked Operator for a developmentally appropriate, educational toy for her 8-month-old. She set a $10-15 budget, wanted free shipping, and asked it to buy the toy. Operator opened its own browser and searched for toys. It chose one that fit the criteria and opened Target.com. She then went through the purchase flow herself.

## How it went

Operator found a toy that met her criteria, but it did not complete the purchase. It led her through checkout, while Perplexity in the same post did complete a purchase on its own.

## Worth knowing

Operator works by clicking through websites like a person rather than using APIs. Expect to finish the checkout yourself, even if your prompt asks it to buy.

## Prompt

```text
Find a [type of toy] for a [age]-year-old under $[budget] on [retailer website] that meets these requirements: [criteria]. Pick the best match, add it to the cart and walk me through checkout. Pause and show me the item, price and delivery details before entering any payment info or placing the order.
```

## Related use cases

- [Book flights with AI trip planners](./book-flights-with-ai-trip-planners.md)
- [Research sales leads with Operator](./research-sales-leads-with-operator.md)
- [Contact OpenAI support on the user's behalf](./contact-openai-support-on-the-user-s-behalf.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Research buying a yak](./research-buying-a-yak.md)
- [Let Claude buy a game autonomously](./let-claude-buy-a-game-autonomously.md)
