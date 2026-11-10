---
title: "Take orders for a sushi chain with an agent"
slug: "take-orders-for-a-sushi-chain-with-an-agent"
summary: "The poster built a Claude agent that takes orders for a seven-location sushi chain, using menu, allergen, delivery zone, hours and promo data."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/AI_Agents/comments/1ubktm6/i_put_a_claude_agent_in_charge_of_taking_orders"
fetched_from: "https://agentusecases.ai/use-case/take-orders-for-a-sushi-chain-with-an-agent"
---

# Take orders for a sushi chain with an agent

> The poster built a Claude agent that takes orders for a seven-location sushi chain, using menu, allergen, delivery zone, hours and promo data.

**Category:** Sales, Marketing & Support  
**Agent:** Claude  
**Source:** Reddit · Undated

## What they did

The builder wired Instagram DMs from Meta’s API into Claude Sonnet 4.6, giving it a knowledge base for all seven locations: menu items, ingredients, calories, allergens, delivery zones, hours, prep times, promos, and conversation rules. The agent chats with customers, answers menu questions, collects address and quantity, offers add-ons, sends a bank payment link, then pushes confirmed orders to the kitchen and logs them in the CRM and an owner dashboard; humans still handle calls, voice notes, photos, or explicit requests for a person.

## How it went

The poster says the agent handles plain-text order chats almost entirely on its own, gets orders right about 98% of the time, and rarely needs human takeover beyond non-text cases. They also say roughly 97% of the large prompt is served from cache, cutting that portion of Claude input cost by about 90%, but allergen mistakes and stale menu data were raised as the key risk.

## Worth knowing

The main practical catch is keeping menu and allergen data current; the post says the economics only worked because Claude prompt caching avoided reprocessing the full seven-location context on most messages.

## Prompt

```text
Act as an order-taking agent for [restaurant name], which has [number] locations. Use the menu, allergen info, delivery zones, hours and promotions I paste below to take customer orders, ask which location they want, warn about allergens, and confirm the delivery address is in a zone. Finish each order by reading back the items and total, and ask the customer to confirm before it's marked as placed. Here is my data: [menu, allergens, zones, hours, promos].
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run brand marketing end to end and publish to social](./run-brand-marketing-end-to-end-and-publish-to-social.md)
- [Find roofing leads and run AI voice outreach](./find-roofing-leads-and-run-ai-voice-outreach.md)
