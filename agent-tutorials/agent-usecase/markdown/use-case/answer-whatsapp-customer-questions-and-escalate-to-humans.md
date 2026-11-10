---
title: "Answer WhatsApp customer questions and escalate to humans"
slug: "answer-whatsapp-customer-questions-and-escalate-to-humans"
summary: "An n8n and OpenAI agent answers WhatsApp questions from a knowledge base and escalates low-confidence cases to a human on Telegram with full context."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "github.com"
source_date: "Jul 1, 2026"
source_url: "https://github.com/zezo640/whatsapp-ai-support-agent-n8n"
fetched_from: "https://agentusecases.ai/use-case/answer-whatsapp-customer-questions-and-escalate-to-humans"
---

# Answer WhatsApp customer questions and escalate to humans

> An n8n and OpenAI agent answers WhatsApp questions from a knowledge base and escalates low-confidence cases to a human on Telegram with full context.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** github.com · Jul 1, 2026

## What they did

An n8n workflow takes each incoming WhatsApp message and assembles the conversation history plus the company knowledge base. OpenAI drafts a reply grounded in that content, and a confidence check decides whether it can be answered reliably. Confident answers go back on WhatsApp. Otherwise the case goes to the human team on Telegram with the full conversation attached.

## How it went

The README gives no measured results, only design goals: cover routine questions, give round-the-clock coverage, and keep a human on unreliable cases. The exported n8n workflow JSON was still being added.

## Worth knowing

The repo documents architecture only, with no workflow file yet and no description of how confidence is scored, so you would have to design that check yourself.

## Prompt

```text
Build an n8n workflow that answers customer questions on WhatsApp using an AI agent grounded in [my knowledge base, e.g. a Google Doc or FAQ sheet]. When the agent's confidence is low or the customer asks for a human, forward the full conversation to me on Telegram and let me reply from there. Done when a test question gets a correct answer and a deliberately tricky one gets escalated to me with context.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
