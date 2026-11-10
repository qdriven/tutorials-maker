---
title: "Manage online stores and campaigns with an open-source agent"
slug: "manage-online-stores-and-campaigns-with-an-open-source-agent"
summary: "The author built an open-source agent that turns voice notes into reports, checks orders and ad spend every five minutes, and suggests one next task across crowdfunding, Amazon and Shopify businesses."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/AI_Agents/comments/1w0nany/six_months_of_letting_an_opensource_agent_run_my"
fetched_from: "https://agentusecases.ai/use-case/manage-online-stores-and-campaigns-with-an-open-source-agent"
---

# Manage online stores and campaigns with an open-source agent

> The author built an open-source agent that turns voice notes into reports, checks orders and ad spend every five minutes, and suggests one next task across crowdfunding, Amazon and Shopify businesses.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Undated

## What they did

The author built the workflow around Nous Research’s Hermes Agent with a third-party LLM gateway and a three-tier model router: a cheap model for routine work, a smarter one for ambiguous tasks, and a local fallback for outages or private jobs. They fed it voice notes or messy text from two crowdfunding campaigns, an Amazon store, and a Shopify site; a cron job then checked orders, ad spend, inbox flags, and a todo list every five minutes, kept one memory file updated, and pushed back one next task, plus weekly and monthly recaps.

## How it went

After six months, the author says the core loop stuck where Notion, Todoist, and lightweight CRMs had failed, and the routing setup was about 60–70% cheaper than using a top model every time while being more reliable. It still mislabels tasks, misses details, and some reports or automations end up useless.

## Worth knowing

Their main lesson was to start with just three automations that worked—daily report, next-task push, and weekly recap—after spending two weeks over-automating and making the system brittle.

## Prompt

```text
Set up an agent that checks [Shopify, Amazon, or crowdfunding store] orders and [ad platform] spend every five minutes and alerts me if [threshold, e.g. spend exceeds $X or orders drop]. Also turn my voice notes in [folder or chat] into a short daily report and end it with one suggested next task. Ask me before changing any ad budget, sending any message, or editing any listing.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check hotel reservations and guest check-ins on Booking.com](./check-hotel-reservations-and-guest-check-ins-on-booking-com.md)
- [Run LLM assistants over company data with RAG in n8n](./run-llm-assistants-over-company-data-with-rag-in-n8n.md)
- [Organize deal flow with specialist bots for invoices and inbox](./organize-deal-flow-with-specialist-bots-for-invoices-and-inb.md)
- [Move OpenClaw skills to Grok Bot](./move-openclaw-skills-to-grok-bot.md)
- [Turn a large quarterly PDF into short documents and requisitions](./turn-a-large-quarterly-pdf-into-short-documents-and-requisit.md)
