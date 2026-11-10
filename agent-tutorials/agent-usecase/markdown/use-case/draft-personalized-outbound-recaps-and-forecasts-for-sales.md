---
title: "Draft personalized outbound, recaps and forecasts for sales"
slug: "draft-personalized-outbound-recaps-and-forecasts-for-sales"
summary: "Cursor's internal ChatGTM drafts signal-based outbound messages with personalized landing pages, call recap emails and follow-ups, and assembles the deal forecast."
category: "Sales, Marketing & Support"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "thesignal.club"
source_date: "Undated"
source_url: "https://www.thesignal.club/p/chatgtm"
fetched_from: "https://agentusecases.ai/use-case/draft-personalized-outbound-recaps-and-forecasts-for-sales"
---

# Draft personalized outbound, recaps and forecasts for sales

> Cursor's internal ChatGTM drafts signal-based outbound messages with personalized landing pages, call recap emails and follow-ups, and assembles the deal forecast.

**Category:** Sales, Marketing & Support  
**Agent:** Cursor  
**Source:** thesignal.club · Undated

## What they did

ChatGTM sits on top of Salesforce, Gong, the data warehouse, LinkedIn and other sources, and pulls context live rather than from a stored repo. Each morning it drafts about 25 signal-based outbound messages, each with a landing page matched to the contact's stack and role. It also drafts call recaps and follow-ups, and before Thursday forecasts it scans every deal to assemble the forecast. Reps review and send through Gmail or Outreach.

## How it went

A pilot group of 8 SDRs booked triple the qualified meetings, with the top two at 4x. Sales leaders also report AE ramp time down by more than 50%. These are the author's reported figures, from about 1.5 months of use.

## Worth knowing

The core build took about two months with three people, on top of earlier failed attempts. George Hou says most GTM teams shouldn't build this, and he warns that long-running agent research gets slow and costly.

## Prompt

```text
Using my notes on [prospect or account list] and these recent signals [news, hiring, product usage], draft a short personalized outbound email for each contact and a simple landing page outline tailored to each. Also write a call recap email for [call notes path] with follow-up steps. Give me all drafts in one file and do not send anything.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Grade Cursor on a real data science project](./grade-cursor-on-a-real-data-science-project.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Build a profitable online business from scratch with an agent](./build-a-profitable-online-business-from-scratch-with-an-agen.md)
- [Qualify leads and draft emails pending human approval](./qualify-leads-and-draft-emails-pending-human-approval.md)
