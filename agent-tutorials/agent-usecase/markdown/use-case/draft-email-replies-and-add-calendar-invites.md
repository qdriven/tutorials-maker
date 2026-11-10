---
title: "Draft email replies and add calendar invites"
slug: "draft-email-replies-and-add-calendar-invites"
summary: "A writer built a scheduled Claude agent using Gmail and Calendar connectors to draft replies and add invites to the calendar."
category: "Work & Operations"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "tomsguide.com"
source_date: "Undated"
source_url: "https://www.tomsguide.com/ai/claude/i-built-a-claude-agent-to-manage-my-inbox-and-it-changed-how-i-handle-email"
fetched_from: "https://agentusecases.ai/use-case/draft-email-replies-and-add-calendar-invites"
---

# Draft email replies and add calendar invites

> A writer built a scheduled Claude agent using Gmail and Calendar connectors to draft replies and add invites to the calendar.

**Category:** Work & Operations  
**Agent:** Claude  
**Source:** tomsguide.com · Undated

## What they did

The writer signed into Claude on a paid plan, enabled the Gmail and Google Calendar connectors, and used the /schedule skill in a plain-language prompt. It told Claude to scan the inbox hourly, review mail since the last run, draft replies where needed, and add invites to the calendar. A scheduled-tasks tab confirms the setup.

## How it went

The source gives no measured results. Claude drafts replies, but Gmail users must still review and send every draft themselves.

## Worth knowing

Scheduled tasks run in the cloud, while /loop in Claude Code only runs while your laptop is on. Both need a paid plan.

## Prompt

```text
Every [weekday morning or schedule], check my Gmail for new emails that need a reply and draft responses in my voice, using [a sample of my writing or tone notes]. If an email mentions a meeting or event, add it to my Google Calendar as an invite for [time zone]. You're done when drafts are saved and events added; do not send any email, and tell me about each calendar event you added.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Generate invoices automatically from a template](./generate-invoices-automatically-from-a-template.md)
