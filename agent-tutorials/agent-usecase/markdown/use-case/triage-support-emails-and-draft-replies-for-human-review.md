---
title: "Triage support emails and draft replies for human review"
slug: "triage-support-emails-and-draft-replies-for-human-review"
summary: "An n8n workflow classifies, prioritizes and summarizes each support email, drafts a reply and posts it to Slack for a person to send."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "community.n8n.io"
source_date: "Undated"
source_url: "https://community.n8n.io/t/ai-support-inbox-triage-classify-prioritize-draft-the-reply-human-still-sends/311971"
fetched_from: "https://agentusecases.ai/use-case/triage-support-emails-and-draft-replies-for-human-review"
---

# Triage support emails and draft replies for human review

> An n8n workflow classifies, prioritizes and summarizes each support email, drafts a reply and posts it to Slack for a person to send.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** community.n8n.io · Undated

## What they did

A five-node n8n workflow polls Gmail for new support emails. Each one goes to an OpenAI-compatible model (gpt-4o-mini in the shared JSON), which returns a category, an urgency, a one-sentence summary and a 3-5 sentence draft reply. The results are logged to a Google Sheet and posted to Slack. A person reviews the draft and sends it, since the author kept sending manual on purpose.

## How it went

The author says it takes about 20 minutes to wire up and that the drafts are good. No volume or time-saved figures are given. Commenters found bugs: one email per poll is processed, and the sender shows as an object.

## Worth knowing

Before production, fix the Code node so it handles every email in a poll (it uses .first()), use from.text for the sender, and add JSON parse error handling and a spam filter.

## Prompt

```text
Build an n8n workflow that watches [support inbox] and, for each new email, classifies the topic, assigns a priority of low, medium or high, and writes a two-line summary. Have it draft a reply using [link to FAQ or policies] and post the summary and draft to [Slack channel] for a person to review. It must never send the reply itself; you're done when a test email produces a Slack post I can approve.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
