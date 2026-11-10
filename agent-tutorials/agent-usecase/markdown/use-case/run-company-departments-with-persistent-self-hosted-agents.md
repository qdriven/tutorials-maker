---
title: "Run company departments with persistent self-hosted agents"
slug: "run-company-departments-with-persistent-self-hosted-agents"
summary: "A self-hosted company OS runs Claude Code and Codex agents per department, with memory, schedules, phone calls via Twilio, and document/video editing. · Sep 9, 2026"
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Codex"
    slug: "codex"
source_url: "https://github.com/OtoDock/oto-dock"
fetched_from: "https://agentusecases.ai/use-case/run-company-departments-with-persistent-self-hosted-agents"
---

# Run company departments with persistent self-hosted agents

> A self-hosted company OS runs Claude Code and Codex agents per department, with memory, schedules, phone calls via Twilio, and document/video editing. · Sep 9, 2026

**Category:** Work & Operations  
**Agent:** Claude Code, Codex

## What they did

OtoDock runs the real Claude Code and Codex as agents inside per-session kernel sandboxes, with network isolation on by default. Access is granted per folder or service through MCP tools. A dashboard streams each step and asks for approval on sensitive actions. Agents run on schedules or webhooks, keep editable memory, hold multi-agent meetings, and produce Word, Excel, PowerPoint and PDF files.

## How it went

The README gives no outcome numbers. The author says large parts of OtoDock were built and shipped by agents running on it. Phone calls, which the summary mentions, are listed as shipping next, not yet available.

## Worth knowing

Install is a Docker compose file plus a Postgres password. Each user connects their own Claude or ChatGPT plan, API keys or local models. The license is fair source (FSL), which bars commercial competition.

## Prompt

```text
Set up persistent agents for my [small company or project] with one agent each for [departments, e.g. sales, support, operations], each keeping notes between sessions and running a [daily or weekly] routine. Start by creating the structure and one useful scheduled task per department. Ask me before any agent sends a message, places a call, or edits a shared document.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build and balance a live Telegram RPG](./build-and-balance-a-live-telegram-rpg.md)
- [Run a live Kalshi prediction-market account autonomously](./run-a-live-kalshi-prediction-market-account-autonomously.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Run LLM assistants over company data with RAG in n8n](./run-llm-assistants-over-company-data-with-rag-in-n8n.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
