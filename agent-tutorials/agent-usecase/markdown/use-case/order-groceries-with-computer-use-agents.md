---
title: "Order groceries with computer-use agents"
slug: "order-groceries-with-computer-use-agents"
summary: "The author tried Operator and two other computer-use agents on grocery shopping and found the experience too poor for ordinary consumers."
category: "Shopping & Errands"
agents:
  - name: "Operator"
    slug: "operator"
source_platform: "understandingai.org"
source_date: "Undated"
source_url: "https://www.understandingai.org/p/computer-use-agents-seem-like-a-dead"
fetched_from: "https://agentusecases.ai/use-case/order-groceries-with-computer-use-agents"
---

# Order groceries with computer-use agents

> The author tried Operator and two other computer-use agents on grocery shopping and found the experience too poor for ordinary consumers.

**Category:** Shopping & Errands  
**Agent:** Operator  
**Source:** understandingai.org · Undated

## What they did

Timothy B. Lee gave OpenAI's Operator a photo of his 16-item shopping list. He had it read the checked items, open his nearest Harris Teeter's website, and add the items to a cart. He corrected its list mistakes and stepped in again after a logout during a second attempt.

## How it went

Operator misread the list, then added only 13 of 16 items. The second attempt took over 30 minutes and several interventions, versus under four minutes by hand. The two other agents did worse.

## Worth knowing

The source is paywalled, so the details on the other two agents are missing. Expect logouts and repeated corrections, and expect hand-ordering to be faster.

## Prompt

```text
Open [grocery store or delivery service] and build a cart for this list: [grocery items with quantities]. Use my delivery address [address] and pick the cheapest in-stock option for each item, flagging any substitutions. Stop before checkout and show me the full cart and total so I can approve the order.
```

## Related use cases

- [Find a toy and start checkout with Operator](./find-a-toy-and-start-checkout-with-operator.md)
- [Research sales leads with Operator](./research-sales-leads-with-operator.md)
- [Contact OpenAI support on the user's behalf](./contact-openai-support-on-the-user-s-behalf.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Research buying a yak](./research-buying-a-yak.md)
- [Let Claude buy a game autonomously](./let-claude-buy-a-game-autonomously.md)
