---
title: "Sell services through an agent that takes payment and delivers"
slug: "sell-services-through-an-agent-that-takes-payment-and-delive"
summary: "An agent runs a transaction flow, creates Stripe checkout links, verifies payment before delivering a service, and asks the owner on Telegram to approve refunds or disputes."
category: "Sales, Marketing & Support"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "May 9, 2026"
source_url: "https://news.ycombinator.com/item?id=48075299"
fetched_from: "https://agentusecases.ai/use-case/sell-services-through-an-agent-that-takes-payment-and-delive"
---

# Sell services through an agent that takes payment and delivers

> An agent runs a transaction flow, creates Stripe checkout links, verifies payment before delivering a service, and asks the owner on Telegram to approve refunds or disputes.

**Category:** Sales, Marketing & Support  
**Agent:** custom-built or unnamed agent  
**Source:** HN · May 9, 2026

## What they did

The agent follows a fixed lifecycle: explore, propose, transact, deliver, complete. It generates Stripe checkout links for a service and checks that payment went through before delivering. It runs locally with no UI or hosting, serving customers through messaging platforms or a web widget. For refunds or disputes it messages the owner on Telegram and acts on their reply.

## How it went

The source is a short feature description from the project's author and reports no results, numbers, or customer outcomes. It says the aim is to make this easy for non-technical business owners.

## Worth knowing

Refunds and disputes wait on the owner's Telegram reply, so someone must be reachable to approve them.

## Prompt

```text
Build a workflow that takes a customer request for [service I sell], creates a Stripe checkout link for [price], and waits for payment confirmation before delivering [deliverable]. If a refund or dispute comes in, send me a Telegram message with the details and wait for my approval before acting. Finish with a test run using Stripe test mode, and don't enable live payments until I confirm.
```

## Related use cases

- [Let a voice receptionist schedule appointments via MCP](./let-a-voice-receptionist-schedule-appointments-via-mcp.md)
- [Run voice and chat support assistants with memory](./run-voice-and-chat-support-assistants-with-memory.md)
- [Build a profitable online business from scratch with an agent](./build-a-profitable-online-business-from-scratch-with-an-agen.md)
- [Have an agent research its own competitors](./have-an-agent-research-its-own-competitors.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
- [Qualify leads and handle onboarding with Make and AI](./qualify-leads-and-handle-onboarding-with-make-and-ai.md)
