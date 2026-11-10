---
title: "Personalize cold email openers from lead websites"
slug: "personalize-cold-email-openers-from-lead-websites"
summary: "An n8n workflow pulls leads from Apollo via Apify, reads each lead's website, and has AI write personalized opening lines into a spreadsheet for a sending tool."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "unpromptable.substack.com"
source_date: "Undated"
source_url: "https://unpromptable.substack.com/p/ai-cold-email-system-tested"
fetched_from: "https://agentusecases.ai/use-case/personalize-cold-email-openers-from-lead-websites"
---

# Personalize cold email openers from lead websites

> An n8n workflow pulls leads from Apollo via Apify, reads each lead's website, and has AI write personalized opening lines into a spreadsheet for a sending tool.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** unpromptable.substack.com · Undated

## What they did

The author rebuilt Nick Saraev's n8n system. It pulls leads, reads a lead's homepage and up to two key pages, and has AI summarize them and draft opening lines into Google Sheets for a sending tool. Because the Apify Apollo scraper is deprecated, he swapped in Podcast Index leads. Claude via OpenRouter extracts three sourced facts per lead, and he reads every draft before anything is sent.

## How it went

Podcast Index gave 40 usable leads per 100, against 6 to 8 from the Apify source. AI cost was about $0.006 per good lead. Reply results aren't in yet, and the drafts read flat.

## Worth knowing

Sending costs far more than the AI: Smartlead is $39 a month, Google Workspace is $8.40 per inbox, and inbox warm-up takes weeks.

## Prompt

```text
Build me a workflow that reads leads from [spreadsheet or lead source], visits each lead's website [website column], and uses AI to write a one-sentence personalized opening line for a cold email about [what I offer]. Write each line into a new column next to the lead in my spreadsheet, and don't send any emails. Test it on 5 leads first and show me the results before running the full list.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
