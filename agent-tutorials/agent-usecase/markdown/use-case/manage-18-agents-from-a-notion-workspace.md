---
title: "Manage 18 agents from a Notion workspace"
slug: "manage-18-agents-from-a-notion-workspace"
summary: "Notion used as the control plane for a fleet of 18 OpenClaw agents."
category: "Work & Operations"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "DEV"
source_date: "Mar 7, 2026"
source_url: "https://dev.to/aws-heroes/i-turned-notion-into-a-control-plane-for-my-18-openclaw-ai-agents-5624"
fetched_from: "https://agentusecases.ai/use-case/manage-18-agents-from-a-notion-workspace"
---

# Manage 18 agents from a Notion workspace

> Notion used as the control plane for a fleet of 18 OpenClaw agents.

**Category:** Work & Operations  
**Agent:** OpenClaw  
**Source:** DEV · Mar 7, 2026

## What they did

The author built AgentOps, a Node/React server that uses Notion as its only database through the Notion API (MCP). Four Notion databases hold the agent registry, task queue, run log and alerts. A runtime polls Notion every 10 seconds and skips paused agents. Tasks created in Notion get dispatched. Prompts and configs sync both ways, and the fleet can be backed up or exported as JSON.

## How it went

It tracked 18 agents, 78 logged runs and over 128K tokens. The author says migrating between instances takes minutes. A commenter raised concurrency concerns, and the author replied that the workloads are cron-based and run one at a time.

## Worth knowing

Designed as a single poller over cron-style jobs, so concurrent writes from many agents were not tested. Secrets are redacted before configs sync to Notion.

## Prompt

```text
Help me set up a small team of [number] agents, each with a clear job such as [job 1, job 2, job 3], and track their tasks and status in [Notion or another workspace]. Create a task board where I can assign work and see results from each agent. Before any agent sends messages or changes things outside the board, pause and show me what it plans to do.
```

## Related use cases

- [Book weekly restaurants and surface daily discoveries from your data](./book-weekly-restaurants-and-surface-daily-discoveries-from-y.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
