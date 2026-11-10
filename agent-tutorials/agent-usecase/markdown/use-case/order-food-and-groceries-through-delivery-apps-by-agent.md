---
title: "Order food and groceries through delivery apps by agent"
slug: "order-food-and-groceries-through-delivery-apps-by-agent"
summary: "Super is a personal agent that operates food delivery and grocery apps by computer interaction; the user states what they want, reviews and confirms the order."
category: "Shopping & Errands"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "app.getsupers.com"
source_date: "Undated"
source_url: "https://app.getsupers.com/use-cases/order-food-with-ai/"
fetched_from: "https://agentusecases.ai/use-case/order-food-and-groceries-through-delivery-apps-by-agent"
---

# Order food and groceries through delivery apps by agent

> Super is a personal agent that operates food delivery and grocery apps by computer interaction; the user states what they want, reviews and confirms the order.

**Category:** Shopping & Errands  
**Agent:** custom-built or unnamed agent  
**Source:** app.getsupers.com · Undated

## What they did

The user tells Super the store or restaurant, exact items, and preferences such as substitutions, saved address, and payment method. Super works the delivery or grocery app through computer interaction and pauses so the user can check the cart, total, address, and timing before submitting. After a good first order, the user tells it to save the order as repeatable, and later runs replay it from a computer-use cache.

## How it went

The page gives no measured results. It says groceries benefit most from replay, and it warns that app redesigns can break saved workflows and that payment and address confirmation is still needed each time.

## Worth knowing

Treat the first order as a training run, because details like tip defaults and delivery notes get reused. Re-run saved orders periodically, since app and menu changes can break them.

## Prompt

```text
Open [delivery app, e.g. Uber Eats or Instacart] on my computer and order [food or grocery list] for delivery to [address]. Keep the total under [budget] and choose substitutions only from [acceptable options]. Stop at the final review screen and show me the cart and total, and do not place the order until I approve.
```

## Related use cases

- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Shop for Raspberry Pi parts on Amazon with Claude](./shop-for-raspberry-pi-parts-on-amazon-with-claude.md)
- [Auto-buy items when the price hits a target](./auto-buy-items-when-the-price-hits-a-target.md)
- [Hunt high-value Pokémon cards on eBay overnight](./hunt-high-value-pok-mon-cards-on-ebay-overnight.md)
- [Order family groceries from fridge contents](./order-family-groceries-from-fridge-contents.md)
- [Find good eBay deals on a schedule](./find-good-ebay-deals-on-a-schedule.md)
