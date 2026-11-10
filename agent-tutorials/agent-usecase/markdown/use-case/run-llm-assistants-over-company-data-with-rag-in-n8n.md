---
title: "Run LLM assistants over company data with RAG in n8n"
slug: "run-llm-assistants-over-company-data-with-rag-in-n8n"
summary: "A commenter used multiple LLM assistants in an n8n project at their company, handling AutoCAD Forge API calls, parsing, embedding and RAG across company data."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Mar 5, 2026"
source_url: "https://www.reddit.com/r/n8n/comments/1r3qalu/most_ai_agent_workflows_are_just_glorified_ifelse"
fetched_from: "https://agentusecases.ai/use-case/run-llm-assistants-over-company-data-with-rag-in-n8n"
---

# Run LLM assistants over company data with RAG in n8n

> A commenter used multiple LLM assistants in an n8n project at their company, handling AutoCAD Forge API calls, parsing, embedding and RAG across company data.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** Reddit · Mar 5, 2026

## What they did

In a company n8n project, the commenter says they set up multiple LLM assistants that handled AutoCAD Forge API calls and worked over company information using parsing, embeddings, and RAG. They describe the system as easier to start than a Python project, but say the LLMs sometimes routed requests to the wrong Supabase and often needed humans dealing with revised engineering drawings and desired SMP schemes.

## How it went

It worked well enough for much of the job, but they say responses were inconsistent: API work was painful, information spread badly between assistants, and the RAG/parsing setup was harder to build in n8n than in Python.

## Worth knowing

Their main catch is tradeoff: n8n was easier to get started with, but they say a Python script could have handled some Forge API work in only a few hours.

## Prompt

```text
Build me an n8n workflow that lets me ask questions in [chat or Slack] about our company data stored in [Google Drive, Notion, or database]. It should parse and split those documents, embed them into a vector store, and answer using retrieval with a citation to the source document. Only read the data, never modify or delete anything. The job is done when it correctly answers [three test questions] and shows its sources.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
