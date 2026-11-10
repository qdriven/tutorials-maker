---
title: "Test OpenAI's Agent on online shopping"
slug: "test-openai-s-agent-on-online-shopping"
summary: "The agent got partway through buying dress shoes before the poster had to enter the card, then hit Amazon bot protection and could not reliably shop, book or reserve."
category: "Shopping & Errands"
agents:
  - name: "ChatGPT Agent"
    slug: "chatgpt-agent"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ChatGPT/comments/1m9bv7d"
fetched_from: "https://agentusecases.ai/use-case/test-openai-s-agent-on-online-shopping"
---

# Test OpenAI's Agent on online shopping

> The agent got partway through buying dress shoes before the poster had to enter the card, then hit Amazon bot protection and could not reliably shop, book or reserve.

**Category:** Shopping & Errands  
**Agent:** ChatGPT Agent  
**Source:** Reddit · Undated

## What they did

In the thread, one user said Agent could get through an online purchase flow for dress shoes: it first tried Amazon, struggled there, then switched to the shoe maker’s own site and reached the payment step. The human still had to enter the credit card, and another commenter said they manually took over to solve a press-and-hold bot check that still failed to load.

## How it went

It got partway through buying shoes and could navigate some retail tasks, but Amazon and other major sites often blocked it with anti-bot protection. The original poster also said their own testing hit no bookings or reservations and burned through a 40-query allotment quickly.

## Worth knowing

One practical catch from the thread: one user said it took a couple of tries to find a workable merchant, and the poster said their access ran out at 40 queries.

## Prompt

```text
Find [item, e.g. black dress shoes in size X] under [$budget] on [retailer other than Amazon] and add the best match to the cart. Tell me your top [3] options with prices and links. Pause before entering any payment details or placing the order, and show me the cart so I can finish checkout myself.
```

## Related use cases

- [Plan a family trip and pre-fill bookings](./plan-a-family-trip-and-pre-fill-bookings.md)
- [Collate WHO data into a multi-tab spreadsheet](./collate-who-data-into-a-multi-tab-spreadsheet.md)
- [Book appointments and send emails and messages](./book-appointments-and-send-emails-and-messages.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Find holiday gifts and check stock and sales](./find-holiday-gifts-and-check-stock-and-sales.md)
- [Buy a microwave from Costco](./buy-a-microwave-from-costco.md)
