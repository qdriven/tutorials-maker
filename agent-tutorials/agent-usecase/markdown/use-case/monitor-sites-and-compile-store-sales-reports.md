---
title: "Monitor sites and compile store sales reports"
slug: "monitor-sites-and-compile-store-sales-reports"
summary: "Commenters built n8n workflows that text when a managed website goes down and that gather text sales reports from 7 stores into Google Sheets using AI."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Jul 24, 2025"
source_url: "https://www.reddit.com/r/n8n/comments/1m5ip5g/what_are_your_personal_n8n_automations_that"
fetched_from: "https://agentusecases.ai/use-case/monitor-sites-and-compile-store-sales-reports"
---

# Monitor sites and compile store sales reports

> Commenters built n8n workflows that text when a managed website goes down and that gather text sales reports from 7 stores into Google Sheets using AI.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** Reddit · Jul 24, 2025

## What they did

One commenter built an n8n workflow that periodically checks the websites they manage, then uses Twilio to text them when a site goes offline and again when it comes back; AI only writes the alert message. Another said their first n8n workflow used AI to turn text-based sales reports from 7 stores into entries in Google Sheets, replacing manual cell-by-cell entry.

## How it went

The site monitor rarely fires, but it lets the builder alert bosses before anyone reports an outage. The sales-report workflow’s stated benefit was time saved; the thread gives no metrics or failure details.

## Worth knowing

The monitoring setup was justified partly because they already self-hosted n8n and already had Twilio set up; no concrete cost or timing was given.

## Prompt

```text
Build an n8n workflow that checks whether [website URLs] are up every [number] minutes and texts me at [phone number] if any is down. Add a second workflow that collects the daily sales text messages from [number] stores, uses AI to pull out store name and total, and adds them to a Google Sheet. Test both with sample data and tell me when they work.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
