---
title: "Handle routine email tasks and follow-up reminders with a personal assistant"
slug: "handle-routine-email-tasks-and-follow-up-reminders-with-a-pe"
summary: "Author built an n8n personal assistant that handles about 70% of routine email tasks and sends reminders for tasks waiting on others, after fixing early quirks."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/nova_gg/how-i-built-a-personal-assistant-ai-agent-with-n8n-in-2-hours-no-code-step-by-step-3i38"
fetched_from: "https://agentusecases.ai/use-case/handle-routine-email-tasks-and-follow-up-reminders-with-a-pe"
---

# Handle routine email tasks and follow-up reminders with a personal assistant

> Author built an n8n personal assistant that handles about 70% of routine email tasks and sends reminders for tasks waiting on others, after fixing early quirks.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** dev.to · Undated

## What they did

The author built an n8n workflow where a webhook feeds an OpenAI GPT-4 node that routes requests to email, calendar, or task branches. Gmail nodes find unread mail, and the model drafts short replies or flags NEEDS_HUMAN_REVIEW. It labels emails, sends urgent ones to Slack, and tracks tasks waiting on others, sending follow-up reminders and escalating.

## How it went

The author says it handles about 70% of routine email tasks, rising to about 80% after two months of tweaking. Early versions emailed the author's mom about dinner plans and tried to schedule meetings at 2 AM.

## Worth knowing

Add safety checks such as no sends between 10 PM and 8 AM, approval for keyword emails, and webhook authentication. The author budgets $20-30/month for API calls.

## Prompt

```text
Build an n8n personal assistant for my email at [email address] that sorts incoming mail, drafts replies for [routine types, e.g. scheduling, receipts, simple questions], and tracks emails where I'm waiting on someone. It should send me a reminder after [number] days of no reply. Have it save drafts only and never send any email without showing me the text first; you're done when it handles a week of sample emails correctly.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
