---
title: "Automate web-form entry and Gmail cleanup"
slug: "automate-web-form-entry-and-gmail-cleanup"
summary: "The author tested Claude for Chrome on repetitive forms, where it started entering wrong data and slowed down, and on archiving newsletters and starring urgent Gmail messages, which saved a few minutes."
category: "Work & Operations"
agents:
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
source_platform: "datacamp.com"
source_date: "Undated"
source_url: "https://www.datacamp.com/tutorial/claude-for-chrome-ai-powered-browser-assistance-automation"
fetched_from: "https://agentusecases.ai/use-case/automate-web-form-entry-and-gmail-cleanup"
---

# Automate web-form entry and Gmail cleanup

> The author tested Claude for Chrome on repetitive forms, where it started entering wrong data and slowed down, and on archiving newsletters and starring urgent Gmail messages, which saved a few minutes.

**Category:** Work & Operations  
**Agent:** Claude in Chrome  
**Source:** datacamp.com · Undated

## What they did

In "Act without asking" mode, Claude for Chrome built a seven-field Google Form. It then worked across a Google Sheet and the form, planning a task list and submitting one registration per Engineering employee. The author stopped it at the third form and finished the last two by hand. The Gmail archive-and-star prompt is described only briefly.

## How it went

The first two forms were correct. On the third, Claude entered "Emily Wang" instead of "Emily Watson", and the run reached 50 minutes. The author estimates doing it by hand takes about 10 minutes. The source gives the Gmail saving as 5–10 minutes.

## Worth knowing

It needs a Claude Max subscription ($100 or $200 a month). Check its form entries yourself, because it takes a fresh screenshot after each interaction and ran slower than a person would.

## Prompt

```text
In Gmail, find newsletters and promotional emails from the last [number] days and archive them. Then star any messages that look urgent, such as [examples: invoices, deadlines, messages from my manager]. Before archiving, show me the list of senders and message counts so I can approve it. Don't delete anything or send any replies. Finish with a short summary of what you archived and starred.
```

## Related use cases

- [Build a balloon-camel simulator for an LED Burning Man totem](./build-a-balloon-camel-simulator-for-an-led-burning-man-totem.md)
- [Book travel and find restaurant reservations](./book-travel-and-find-restaurant-reservations.md)
- [Build prospect lists and cold emails from the web](./build-prospect-lists-and-cold-emails-from-the-web.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Speed up multifamily deal research and property summaries](./speed-up-multifamily-deal-research-and-property-summaries.md)
- [Scrape websites with a plain-language browser agent](./scrape-websites-with-a-plain-language-browser-agent.md)
