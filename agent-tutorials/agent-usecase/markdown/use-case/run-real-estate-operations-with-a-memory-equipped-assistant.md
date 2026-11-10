---
title: "Run real-estate operations with a memory-equipped assistant"
slug: "run-real-estate-operations-with-a-memory-equipped-assistant"
summary: "The poster built a workflow with an AI agent that keeps memory for contextual conversations and updates property data dynamically."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "May 1, 2026"
source_url: "https://www.reddit.com/r/n8n_ai_agents/comments/1tha9mp/ive_built_an_ai_real_estate_assistant_heres_what"
fetched_from: "https://agentusecases.ai/use-case/run-real-estate-operations-with-a-memory-equipped-assistant"
---

# Run real-estate operations with a memory-equipped assistant

> The poster built a workflow with an AI agent that keeps memory for contextual conversations and updates property data dynamically.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** Reddit · May 1, 2026

## What they did

The poster built the workflow in n8n as an operations assistant for a real estate business. It takes incoming client chat messages, uses an AI agent with memory for contextual conversations, stores long-term knowledge with vector embeddings in Supabase, updates property data, checks availability, and books, reschedules, or cancels appointments through Google Calendar, then sends confirmations and notifications through Gmail; the person built the logic and can swap calendar tools for a client.

## How it went

The source says it handles conversations, scheduling, lead qualification, follow-up, and property updates in one system, with the poster saying Google Calendar booking, scheduling, and canceling worked smoothly. It gives no hard metrics, deployment numbers, or failure cases.

## Worth knowing

The clearest implementation catch is that long-term memory was handled with vector embeddings plus Supabase, and scheduling used Google Calendar rather than cal.com.

## Prompt

```text
Build an n8n workflow with an AI agent that answers questions from [clients/tenants/team] about my [properties] using data in [spreadsheet or database]. Give it memory so it remembers each person's earlier conversation, and let it update property fields like [price, availability, status] when I tell it to. Before it changes any record or sends any message, show me what it will change and wait for my approval; stop once a test conversation works end to end.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
