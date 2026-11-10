---
title: "Qualify leads and draft emails pending human approval"
slug: "qualify-leads-and-draft-emails-pending-human-approval"
summary: "An n8n workflow dedupes and AI-scores leads and drafts personalized emails, sending via Gmail only after human approval."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "community.n8n.io"
source_date: "Undated"
source_url: "https://community.n8n.io/t/i-built-leadflow-ai-v1-an-ai-lead-qualification-workflow-with-human-approval/309312"
fetched_from: "https://agentusecases.ai/use-case/qualify-leads-and-draft-emails-pending-human-approval"
---

# Qualify leads and draft emails pending human approval

> An n8n workflow dedupes and AI-scores leads and drafts personalized emails, sending via Gmail only after human approval.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** community.n8n.io · Undated

## What they did

The author built LeadFlow AI V1 in n8n as a pipeline. It takes in a lead, validates it and checks for duplicates. AI then qualifies and scores the lead as HOT, WARM or COLD and drafts a personalized email. A person approves the draft before Gmail sends it. Lead data and approval status are logged in Google Sheets.

## How it went

The post gives no results or numbers. It is a V1 showcase. A commenter suggested adding a score-reason field next to the rating, so approvers can see the source, reason, next step and draft in one row.

## Worth knowing

Approval happens in Google Sheets. A commenter advised keeping it there at first and building a dedicated dashboard only after you know which fields reviewers use.

## Prompt

```text
Build me an n8n workflow that takes new leads from [source], removes duplicates, scores each one 1-10 against this ideal customer profile: [description], and drafts a personalized email for each qualified lead. Save the drafts and scores in [Sheet or Airtable] and notify me to approve. Only send through Gmail after I approve each draft, and show me the email before anything is sent.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
