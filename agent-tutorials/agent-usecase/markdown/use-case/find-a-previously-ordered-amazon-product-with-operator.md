---
title: "Find a previously ordered Amazon product with Operator"
slug: "find-a-previously-ordered-amazon-product-with-operator"
summary: "After several failed attempts, a user had Operator search Amazon in the background for a product they had ordered before."
category: "Shopping & Errands"
agents:
  - name: "Operator"
    slug: "operator"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/OpenAI/comments/1igovfs"
fetched_from: "https://agentusecases.ai/use-case/find-a-previously-ordered-amazon-product-with-operator"
---

# Find a previously ordered Amazon product with Operator

> After several failed attempts, a user had Operator search Amazon in the background for a product they had ordered before.

**Category:** Shopping & Errands  
**Agent:** Operator  
**Source:** Reddit · Undated

## What they did

A commenter described using Operator for search tasks while it ran in the background. In one test, they had it look on Amazon for a product they had previously ordered after they had already failed to find it themselves many times, and they said it identified the right item; they also used it on another Amazon item and a hotel search.

## How it went

They said it correctly found the previously ordered Amazon product and saved them time and mental effort, though it took quite a while to finish. They framed the tasks as simple ones and said they would not pay extra for Operator.

## Worth knowing

The main catch was speed: they said Operator can take a while, but that mattered less because it could run in the background.

## Prompt

```text
Search my Amazon order history for a product I bought before: [description, approximate purchase date, any details like brand or color]. Find the exact item and show me the order date and product page link. Don't add anything to the cart or buy anything without checking with me first. Done when you've shown me the matching item or told me the closest candidates.
```

## Related use cases

- [Find a toy and start checkout with Operator](./find-a-toy-and-start-checkout-with-operator.md)
- [Research sales leads with Operator](./research-sales-leads-with-operator.md)
- [Use Operator to book tables, compare products and fill forms](./use-operator-to-book-tables-compare-products-and-fill-forms.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Auto-buy items when the price hits a target](./auto-buy-items-when-the-price-hits-a-target.md)
- [Research and buy online with approval at payment](./research-and-buy-online-with-approval-at-payment.md)
