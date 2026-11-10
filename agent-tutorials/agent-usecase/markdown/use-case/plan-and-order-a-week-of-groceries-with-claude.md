---
title: "Plan and order a week of groceries with Claude"
slug: "plan-and-order-a-week-of-groceries-with-claude"
summary: "The poster used Claude on Mac and iOS to plan and order a week of groceries, with partial success, and will keep using it up to the grocery-list step."
category: "Shopping & Errands"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Mar 5, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1rb1jrz/automated_grocery_order"
fetched_from: "https://agentusecases.ai/use-case/plan-and-order-a-week-of-groceries-with-claude"
---

# Plan and order a week of groceries with Claude

> The poster used Claude on Mac and iOS to plan and order a week of groceries, with partial success, and will keep using it up to the grocery-list step.

**Category:** Shopping & Errands  
**Agent:** Claude  
**Source:** Reddit · Mar 5, 2026

## What they did

The poster used Claude on iOS to turn their weight, height, activity level, and goal weight into macro targets, then had it ask follow-up questions, build a week of meals, and give macros and portion sizes for each one. They turned that into an Excel shopping list, moved it to Claude on Mac because iOS lacked full MCP support, and then tried to have Claude shop on H-E-B using recent-order history and live website access, stepping in when it stalled or chose badly.

## How it went

Meal planning and list-making worked, but cart-building was only partly successful: Claude could navigate H-E-B and add some items, yet often picked wrong products, got stuck on pages, and needed repeated prompting. The poster said they would keep using it through the grocery-list stage, not full ordering.

## Worth knowing

The main catch was platform support: they needed the Mac app for fuller MCP/browser control, while the iOS app was enough for planning and list generation.

## Prompt

```text
Plan dinners for [number] days for [number] people with these preferences: [diet, budget, dislikes]. Then build the combined grocery list, and add the items to my cart at [grocery store website]. Stop before checkout and show me the cart, substitutions, and total for approval.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Build an Instacart list for a charcuterie board](./build-an-instacart-list-for-a-charcuterie-board.md)
- [Buy a microwave from Costco](./buy-a-microwave-from-costco.md)
