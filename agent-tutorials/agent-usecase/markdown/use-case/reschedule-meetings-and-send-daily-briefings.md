---
title: "Reschedule meetings and send daily briefings"
slug: "reschedule-meetings-and-send-daily-briefings"
summary: "OpenClaw checks availability, updates events and drafts confirmations for reschedule requests, and sends daily briefings via messaging apps."
category: "Work & Operations"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "turingcollege.com"
source_date: "Undated"
source_url: "https://www.turingcollege.com/blog/openclaw"
fetched_from: "https://agentusecases.ai/use-case/reschedule-meetings-and-send-daily-briefings"
---

# Reschedule meetings and send daily briefings

> OpenClaw checks availability, updates events and drafts confirmations for reschedule requests, and sends daily briefings via messaging apps.

**Category:** Work & Operations  
**Agent:** OpenClaw  
**Source:** turingcollege.com · Undated

## What they did

OpenClaw runs on a dedicated machine such as a Mac Mini, Raspberry Pi or cloud server, and you message it through WhatsApp, Telegram or Slack. It watches the inbox for calendar-related emails. For a reschedule request it checks availability, updates the event and drafts a confirmation. It can also send a morning summary of schedule, deadlines and news.

## How it went

The source describes these as capabilities and gives no measured results for rescheduling or briefings. It does say it can misread prompts, crash mid-task or loop. One user reported it cleared nearly 6,000 emails on day one.

## Worth knowing

API costs run about $5-10 a day for light use and $30-50 or more for heavy use. Start on a separate machine with read-only access because of prompt injection risk.

## Prompt

```text
When I message you a reschedule request for [a type of meeting], check my calendar availability for [time range], update the event, and draft a confirmation message to the attendees. Also send me a daily briefing on [messaging app] at [time] covering my meetings, deadlines, and anything urgent. Show me each confirmation draft and wait for my approval before sending it to anyone.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
