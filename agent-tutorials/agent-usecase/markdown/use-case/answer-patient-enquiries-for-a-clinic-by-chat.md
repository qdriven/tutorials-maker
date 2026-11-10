---
title: "Answer patient enquiries for a clinic by chat"
slug: "answer-patient-enquiries-for-a-clinic-by-chat"
summary: "An n8n and Gemini agent receives patient chat messages, keeps context, uses clinic info from Google Sheets and responds to enquiries."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
  - name: "Gemini"
    slug: "gemini"
source_platform: "X"
source_date: "Oct 12, 2026"
source_url: "https://x.com/SahilWagave/status/2109697093778690255"
fetched_from: "https://agentusecases.ai/use-case/answer-patient-enquiries-for-a-clinic-by-chat"
---

# Answer patient enquiries for a clinic by chat

> An n8n and Gemini agent receives patient chat messages, keeps context, uses clinic info from Google Sheets and responds to enquiries.

**Category:** Work & Operations  
**Agent:** n8n, Gemini  
**Source:** X · Oct 12, 2026

## What they did

Patients send messages through a chat interface into an n8n workflow. Gemini agent with Simple Memory for context pulls clinic details from Google Sheets and generates replies to enquiries on its own.

## How it went

No results or metrics are reported. The stated goal was smarter clinic communication and less manual work.

## Prompt

```text
Build an n8n workflow with a Gemini-powered chat agent for my [clinic type] that answers patient enquiries about [services, hours, pricing, location] using the info in my [Google Sheet]. Keep conversation context between messages, and for anything medical or unclear, tell the patient staff will follow up and notify [staff email]. Test with sample questions and show me the answers before going live.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Call and text appointment reminders every morning](./call-and-text-appointment-reminders-every-morning.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
