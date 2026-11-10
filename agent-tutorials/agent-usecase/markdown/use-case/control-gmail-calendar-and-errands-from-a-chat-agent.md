---
title: "Control Gmail, calendar and errands from a chat agent"
slug: "control-gmail-calendar-and-errands-from-a-chat-agent"
summary: "OpenClaw users manage Gmail and Calendar from Telegram, unsubscribe from emails, get daily briefings, and submit health reimbursements and find doctor appointments."
category: "Life Admin & Home"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "thenuancedperspective.substack.com"
source_date: "Undated"
source_url: "https://thenuancedperspective.substack.com/p/how-are-people-using-openclaw"
fetched_from: "https://agentusecases.ai/use-case/control-gmail-calendar-and-errands-from-a-chat-agent"
---

# Control Gmail, calendar and errands from a chat agent

> OpenClaw users manage Gmail and Calendar from Telegram, unsubscribe from emails, get daily briefings, and submit health reimbursements and find doctor appointments.

**Category:** Life Admin & Home  
**Agent:** OpenClaw  
**Source:** thenuancedperspective.substack.com · Undated

## What they did

OpenClaw runs on your own machine, with a cloud model behind it, and you message it through Telegram or WhatsApp. Users give it Gmail and Calendar access. It clears out and unsubscribes from emails, and a scheduled cron job sends a morning summary of inbox, calendar and weather. One user says it submitted health reimbursements and found doctor appointments.

## How it went

The source is a roundup of user testimonials, with no measured results. One user reports an agent misreading a reply and picking a fight with an insurer, though that led to the case being reinvestigated.

## Worth knowing

The agent has shell access and stores memory as local files, so it needs trust and guardrails, and it can act wrongly on its own, as in the insurance email.

## Prompt

```text
Connect to my Gmail and Google Calendar and let me control them from [Telegram]. Start by listing the newsletters and promotional senders in my inbox from the last [time period] and propose which to unsubscribe from. Also send me a daily briefing at [time] with my schedule and key emails. Confirm with me before unsubscribing, sending any message, or submitting any form. Stop when the briefing is working and I have reviewed the unsubscribe list.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Run pet relocation, Airbnb pricing, and disputes with agents](./run-pet-relocation-airbnb-pricing-and-disputes-with-agents.md)
