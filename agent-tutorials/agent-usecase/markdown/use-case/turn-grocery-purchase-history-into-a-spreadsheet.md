---
title: "Turn grocery purchase history into a spreadsheet"
slug: "turn-grocery-purchase-history-into-a-spreadsheet"
summary: "The poster had ChatGPT Agent log into a grocery account, review 2025 purchases, deduplicate them, and build a spreadsheet; it worked but wasn't yet set-and-forget."
category: "Shopping & Errands"
agents:
  - name: "ChatGPT Agent"
    slug: "chatgpt-agent"
source_platform: "Reddit"
source_date: "Jul 25, 2025"
source_url: "https://www.reddit.com/r/OpenAI/comments/1m8hbzf"
fetched_from: "https://agentusecases.ai/use-case/turn-grocery-purchase-history-into-a-spreadsheet"
---

# Turn grocery purchase history into a spreadsheet

> The poster had ChatGPT Agent log into a grocery account, review 2025 purchases, deduplicate them, and build a spreadsheet; it worked but wasn't yet set-and-forget.

**Category:** Shopping & Errands  
**Agent:** ChatGPT Agent  
**Source:** Reddit · Jul 25, 2025

## What they did

The poster asked ChatGPT Agent to sign into their grocery store account, go through all purchases from 2025, remove duplicates, and put the results into a spreadsheet. They said it handled the mechanics reasonably well, including clicking through the site and formatting the sheet correctly, but they had to watch and re-prompt because the agent stopped partway through.

## How it went

It worked decently at the browser-and-spreadsheet steps, but it did not finish the full job. The poster said it quit well before completion because it ran out of browser context, so it was not yet something they could leave unattended.

## Worth knowing

The main catch was reliability: the poster said every task needed babysitting because the agent stopped halfway through, usually from short browsing-context limits.

## Prompt

```text
Log into my [grocery store] account (I'll take over for the login and any verification), open my purchase history for [year], and collect every item bought with date, price, and quantity. Remove duplicates, group items by category, and build a spreadsheet with totals per item and per month. Finish when I have a downloadable file and a short note on anything you couldn't capture.
```

## Related use cases

- [Plan a family trip and pre-fill bookings](./plan-a-family-trip-and-pre-fill-bookings.md)
- [Compile genealogy research into a spreadsheet and plan](./compile-genealogy-research-into-a-spreadsheet-and-plan.md)
- [Send emails from a signed-in inbox](./send-emails-from-a-signed-in-inbox.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Turn a handwritten list into a grocery order](./turn-a-handwritten-list-into-a-grocery-order.md)
- [Monitor competitor marketplace prices](./monitor-competitor-marketplace-prices.md)
