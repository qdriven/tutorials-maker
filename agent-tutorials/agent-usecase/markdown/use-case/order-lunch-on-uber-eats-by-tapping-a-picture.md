---
title: "Order lunch on Uber Eats by tapping a picture"
slug: "order-lunch-on-uber-eats-by-tapping-a-picture"
summary: "The author had an AI agent build a \"Lunch\" app where tapping a food photo spawns a subagent that orders the item on Uber Eats, to reduce decision fatigue."
category: "Shopping & Errands"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Bluesky"
source_date: "Oct 26, 2026"
source_url: "https://bsky.app/profile/colin-fraser.net/post/3mysgiwoy6k2f"
fetched_from: "https://agentusecases.ai/use-case/order-lunch-on-uber-eats-by-tapping-a-picture"
---

# Order lunch on Uber Eats by tapping a picture

> The author had an AI agent build a "Lunch" app where tapping a food photo spawns a subagent that orders the item on Uber Eats, to reduce decision fatigue.

**Category:** Shopping & Errands  
**Agent:** custom-built or unnamed agent  
**Source:** Bluesky · Oct 26, 2026

## What they did

Colin asked his AI agent to build an app called Lunch. It shows a few pictures of foods he might want. When he taps one, the app spawns a subagent that places the order for that item on Uber Eats. The post doesn't describe the build steps or any manual intervention.

## How it went

Food arrives 60-90 minutes after the tap. The finished app is about 600 thousand lines of JavaScript, which is a lot of code for a simple ordering tool.

## Worth knowing

Expect a wait of 60-90 minutes between tapping and eating. The post is brief and doesn't give cost, setup details, or how the Uber Eats access works.

## Prompt

```text
Build me a simple personal 'Lunch' web app that shows photos of my [number, e.g. 6] usual lunch orders from [restaurant names or favorite dishes]. When I tap a photo, it should start a helper agent that opens Uber Eats in a browser and puts that item in my cart for delivery to [my delivery address]. The job is done when tapping a photo reliably gets the right item to the checkout screen; pause and show me the cart, total, and address before placing any order or paying.
```

## Related use cases

- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Order pens and search for reservations and resorts](./order-pens-and-search-for-reservations-and-resorts.md)
- [Build an Instacart list for a charcuterie board](./build-an-instacart-list-for-a-charcuterie-board.md)
- [Watch item prices and email on drops](./watch-item-prices-and-email-on-drops.md)
- [Run an online store's inventory, listings and photos](./run-an-online-store-s-inventory-listings-and-photos.md)
- [Use Operator to book tables, compare products and fill forms](./use-operator-to-book-tables-compare-products-and-fill-forms.md)
