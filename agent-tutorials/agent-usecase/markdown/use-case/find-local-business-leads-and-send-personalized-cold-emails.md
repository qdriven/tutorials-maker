---
title: "Find local business leads and send personalized cold emails"
slug: "find-local-business-leads-and-send-personalized-cold-emails"
summary: "An n8n agent scrapes Google Maps for businesses, enriches leads with Owler and Apollo, writes personalized cold emails and logs leads in Google Sheets."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/deepesh_tolani_3fefa9d872/complete-lead-generation-cold-email-automation-agent-1g39"
fetched_from: "https://agentusecases.ai/use-case/find-local-business-leads-and-send-personalized-cold-emails"
---

# Find local business leads and send personalized cold emails

> An n8n agent scrapes Google Maps for businesses, enriches leads with Owler and Apollo, writes personalized cold emails and logs leads in Google Sheets.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** dev.to · Undated

## What they did

Two n8n workflows. The first takes a neighborhood and industry, scrapes Google Maps through Bright Data, and saves the raw leads to Google Sheets for review. The second finds each company's Owler profile through a Google Search dataset and scrapes it. It then cross-checks with Apollo, and GPT writes the email, subject and follow-ups. Leads are flagged qualified or disqualified.

## How it went

The author reports over 5000 leads a day at a 98% success rate and better response rates than manual research. These figures are self-reported with no breakdown. Early emails read as generic.

## Worth knowing

The author says per-lead cost is about $0.005 to $0.02. Getting good emails took repeated prompt tuning, and feeding GPT more company context (industry, size, details) was what fixed the generic tone.

## Prompt

```text
Build an n8n agent that finds [type of business] in [city or region] on Google Maps, enriches each lead with company and contact details from [Apollo or similar], and writes a short personalized cold email based on [my offer]. Log every lead and draft in a Google Sheet at [sheet link]. Don't send anything automatically; stop after [number] leads and show me the drafts for approval before any emails go out.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
