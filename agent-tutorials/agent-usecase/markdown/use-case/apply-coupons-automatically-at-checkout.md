---
title: "Apply coupons automatically at checkout"
slug: "apply-coupons-automatically-at-checkout"
summary: "The poster built a shopping-agent skill that checks live coupon feeds before checkout and applies working ones, saving money on three real checkouts."
category: "Shopping & Errands"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/AI_Agents/comments/1wwdaqc/my_agent_kept_checking_out_at_full_price_so_i"
fetched_from: "https://agentusecases.ai/use-case/apply-coupons-automatically-at-checkout"
---

# Apply coupons automatically at checkout

> The poster built a shopping-agent skill that checks live coupon feeds before checkout and applies working ones, saving money on three real checkouts.

**Category:** Shopping & Errands  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Undated

## What they did

The poster built mcclipface as a skill for shopping agents that triggers right before payment. Instead of letting the agent pay list price, it checks live coupon feeds for that merchant and applies any working code or offer; the source does not describe the internal API or human approval steps beyond the builder testing it on real checkouts.

## How it went

In three live checkouts, it applied a 20% discount, a BOGO deal, and 10% off, for $11.48 saved total. The poster says coverage is still early and growing, so it will not work everywhere yet.

## Worth knowing

Their main catch is economics: server costs are covered by merchant referral fees, so the user pays nothing extra.

## Prompt

```text
Build me a shopping skill that, before checkout at [store or site], checks live coupon sources such as [coupon sites or feeds] for codes valid for my cart: [cart contents]. It should test each code, apply the ones that work, and report how much each saved. Stop at the payment step and show me the final total and applied codes; do not submit payment.
```

## Related use cases

- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Order pens and search for reservations and resorts](./order-pens-and-search-for-reservations-and-resorts.md)
- [Build an Instacart list for a charcuterie board](./build-an-instacart-list-for-a-charcuterie-board.md)
- [Watch item prices and email on drops](./watch-item-prices-and-email-on-drops.md)
- [Run an online store's inventory, listings and photos](./run-an-online-store-s-inventory-listings-and-photos.md)
- [Use Operator to book tables, compare products and fill forms](./use-operator-to-book-tables-compare-products-and-fill-forms.md)
