---
title: "Find roofing leads and run AI voice outreach"
slug: "find-roofing-leads-and-run-ai-voice-outreach"
summary: "n8n workflows find roofing businesses, log them in Sheets, personalize outreach, place voice calls, and classify call outcomes back into the sheet."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/olamilekanadebayo55cmyk/how-i-built-an-n8n-ai-voice-outreach-workflow-for-roofing-leads-36ge"
fetched_from: "https://agentusecases.ai/use-case/find-roofing-leads-and-run-ai-voice-outreach"
---

# Find roofing leads and run AI voice outreach

> n8n workflows find roofing businesses, log them in Sheets, personalize outreach, place voice calls, and classify call outcomes back into the sheet.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** dev.to · Undated

## What they did

Two n8n workflows. Discovery pulls roofing businesses for a target city through Apify and Google Places, filters them, checks phone numbers and duplicates, and writes them to Google Sheets. Outreach picks one lead, with follow-ups first, and checks local calling hours. It then searches for competitor info (SerpAPI), has OpenAI write an opener, calls through Vapi, polls the call status, and has AI classify the outcome into the sheet.

## How it went

The article gives no results, volumes or conversion numbers. It presents the architecture and lessons: define lead states first, keep timing, routing and retries in deterministic logic, and plan for API failures.

## Worth knowing

The state-to-timezone mapping and business-plus-phone dedupe have gaps. Commenters note that some states span two time zones and that phone formats need normalizing before comparing.

## Prompt

```text
Build me n8n workflows that find [type of local business] in [city/region] using [lead source], log name, phone, and website in a Google Sheet, and draft a personalized outreach script for each. Then set up voice calls through [voice AI provider] and write each call outcome (interested, not interested, no answer, callback) back to the sheet. Do not place any calls until you have shown me the script, the first batch of numbers, and the calling hours for my approval.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
