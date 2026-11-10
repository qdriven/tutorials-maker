---
title: "Run SDR outreach with an OpenClaw agent"
slug: "run-sdr-outreach-with-an-openclaw-agent"
summary: "An OpenClaw agent researches prospects, writes personalized cold emails, sends scheduled follow-ups and logs interactions to HubSpot."
category: "Sales, Marketing & Support"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "openclawmarketing.com"
source_date: "Mar 18, 2026"
source_url: "https://openclawmarketing.com/openclaw-ai-sales-agent"
fetched_from: "https://agentusecases.ai/use-case/run-sdr-outreach-with-an-openclaw-agent"
---

# Run SDR outreach with an OpenClaw agent

> An OpenClaw agent researches prospects, writes personalized cold emails, sends scheduled follow-ups and logs interactions to HubSpot.

**Category:** Sales, Marketing & Support  
**Agent:** OpenClaw  
**Source:** openclawmarketing.com · Mar 18, 2026

## What they did

The author defined the ideal customer, tone and a 50-emails-a-day cap in a SOUL.md file. He added Apollo for prospect lists, browser research for personalization hooks, a cold-outreach skill, and the HubSpot MCP server. The agent runs every 4 hours: researches prospects, sends emails, follows up, logs to HubSpot and posts a Slack summary. A human takes over at the first positive reply.

## How it went

Over 60 days the author reports about 8-12 meetings a month at roughly $18 a month in total costs. He admits the agent invents facts about prospects at times and struggles with complex deals and nuanced objections.

## Worth knowing

Hallucinated research is a real risk, so spot-check the first 20-30 emails before trusting the agent. Using a cheap model for research and a stronger one for writing cut API costs from $22 to about $9 a month.

## Prompt

```text
Act as my SDR. For each prospect in [list or CSV path], research their company and role, then write a personalized cold email for [my product] and a follow-up for [number] days later. Show me all drafts first. Only after I approve them should you send on the schedule I confirm, and log each interaction in [HubSpot or CRM].
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Generate customer-service agents from a URL that book appointments](./generate-customer-service-agents-from-a-url-that-book-appoin.md)
- [Run business WhatsApp customer messages with an agent](./run-business-whatsapp-customer-messages-with-an-agent.md)
