---
title: "Turn a handwritten grocery list into a cart"
slug: "turn-a-handwritten-grocery-list-into-a-cart"
summary: "ChatGPT Agent transcribed 15 of 16 items from a photo, found the nearest store and added them to the cart, but missed onions and struggled with login."
category: "Shopping & Errands"
agents:
  - name: "ChatGPT Agent"
    slug: "chatgpt-agent"
source_platform: "understandingai.org"
source_date: "Undated"
source_url: "https://www.understandingai.org/p/chatgpt-agent-a-big-improvement-but"
fetched_from: "https://agentusecases.ai/use-case/turn-a-handwritten-grocery-list-into-a-cart"
---

# Turn a handwritten grocery list into a cart

> ChatGPT Agent transcribed 15 of 16 items from a photo, found the nearest store and added them to the cart, but missed onions and struggled with login.

**Category:** Shopping & Errands  
**Agent:** ChatGPT Agent  
**Source:** understandingai.org · Undated

## What they did

Timothy B. Lee gave ChatGPT Agent a photo of a handwritten grocery list, with the items to buy marked in red. He asked it to fill an online cart. The agent transcribed the list, found his nearest store (Harris Teeter) and added items. When a safety proxy blocked the Kroger login page, he told it he would log in himself, then entered his password.

## How it went

It transcribed 15 of 16 items and added all 15 to the cart, missing onions. Operator had managed only 13 of 16 in an earlier test. After about six minutes it stalled at login, then finished the order.

## Worth knowing

An OpenAI safety proxy blocked the Kroger-hosted login as irrelevant. Replying that you'll log in yourself, then typing the password, got past it.

## Prompt

```text
I'm attaching a photo of my handwritten grocery list. Transcribe it into a typed list and show it to me so I can check for anything missed. Then find the nearest [store] to [my location or zip code] and add every item to the cart. Stop before checkout and show me the cart, any items you could not find and the total, and wait for my approval before ordering.
```

## Related use cases

- [Plan a family trip and pre-fill bookings](./plan-a-family-trip-and-pre-fill-bookings.md)
- [Run portfolio, attribution and real estate analyses with Agent Mode](./run-portfolio-attribution-and-real-estate-analyses-with-agen.md)
- [Book appointments and send emails and messages](./book-appointments-and-send-emails-and-messages.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Find holiday gifts and check stock and sales](./find-holiday-gifts-and-check-stock-and-sales.md)
- [Buy a microwave from Costco](./buy-a-microwave-from-costco.md)
