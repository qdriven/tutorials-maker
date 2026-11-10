---
title: "Manage email, calendar and tasks from Slack"
slug: "manage-email-calendar-and-tasks-from-slack"
summary: "An agent built on Make.com with Gmail, Google Calendar and Notion triages emails, checks the calendar and adds tasks on Slack commands."
category: "Work & Operations"
agents:
  - name: "Make"
    slug: "make"
source_platform: "aimaker.substack.com"
source_date: "Dec 18, 2025"
source_url: "https://aimaker.substack.com/p/ai-agent-tutorial-productivity-assistant-makecom-gmail-google-calendar-notion"
fetched_from: "https://agentusecases.ai/use-case/manage-email-calendar-and-tasks-from-slack"
---

# Manage email, calendar and tasks from Slack

> An agent built on Make.com with Gmail, Google Calendar and Notion triages emails, checks the calendar and adds tasks on Slack commands.

**Category:** Work & Operations  
**Agent:** Make  
**Source:** aimaker.substack.com · Dec 18, 2025

## What they did

Wyndo built one Make.com scenario that a Slack message triggers. An OpenAI agent (gpt-5-mini) reads the command and calls tools for Gmail, Google Calendar and Notion. Gmail covers triage, search and drafts, Calendar covers events and conflicts, and Notion covers tasks. The system prompt has it act only when told and confirm before sending emails or deleting events. It reports back in Slack.

## How it went

The author says they have used it for months and that narrow agents like this work reliably. The full setup, including the system prompt, is behind a paywall, and the free part gives no measured results.

## Worth knowing

Cost is about $12-15/month: Make from $9, plus $5-10 of OpenAI credits. Use your own OpenAI key, because Make's built-in AI provider drains credits fast.

## Prompt

```text
Build me a Slack-triggered workflow connected to Gmail, Google Calendar, and [Notion or task app]. When I type commands like 'triage email', 'what's on my calendar', or 'add task: [text]', it should summarize my important unread emails, list my events for the day, or add the task to my list. Any step that sends an email or creates a calendar event should post a confirmation in Slack and wait for my OK first. Stop when each command works in a test run.
```

## Related use cases

- [Triage unread email with an approval step](./triage-unread-email-with-an-approval-step.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
- [Enrich new CRM leads for personalized outreach](./enrich-new-crm-leads-for-personalized-outreach.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Draft follow-up emails automatically when no reply arrives](./draft-follow-up-emails-automatically-when-no-reply-arrives.md)
