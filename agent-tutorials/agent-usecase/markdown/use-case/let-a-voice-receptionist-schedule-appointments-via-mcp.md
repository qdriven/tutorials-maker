---
title: "Let a voice receptionist schedule appointments via MCP"
slug: "let-a-voice-receptionist-schedule-appointments-via-mcp"
summary: "A custom MCP server exposes list, schedule and cancel appointment tools so an ElevenLabs voice agent can handle customer calls against the company CRM."
category: "Sales, Marketing & Support"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Sep 4, 2026"
source_url: "https://news.ycombinator.com/item?id=49560285"
fetched_from: "https://agentusecases.ai/use-case/let-a-voice-receptionist-schedule-appointments-via-mcp"
---

# Let a voice receptionist schedule appointments via MCP

> A custom MCP server exposes list, schedule and cancel appointment tools so an ElevenLabs voice agent can handle customer calls against the company CRM.

**Category:** Sales, Marketing & Support  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Sep 4, 2026

## What they did

The commenter's team runs a custom MCP server exposing tools such as list_appointments, schedule_appointment and cancel_appointment against their CRM. An ElevenLabs voice agent, which handles speech-to-text, the LLM and text-to-speech, connects to it over a Twilio phone line. A system prompt sets tone, guardrails and when to call each tool.

## How it went

The source is a short explanatory comment and reports no results, numbers or shortcomings. It describes the architecture only.

## Worth knowing

The LLM runs on infrastructure you don't control, so your own hosted MCP server is the only bridge to your CRM; the voice transport (phone, app, browser websocket) is interchangeable.

## Prompt

```text
Build an MCP server in [language] that exposes list_appointments, schedule_appointment, and cancel_appointment tools on top of [CRM or API name]. Make it usable by a voice agent such as ElevenLabs, and include tests with fake data. Stop when the tools pass the tests and give me a short guide for connecting it, with cancellations requiring confirmation.
```

## Related use cases

- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run voice and chat support assistants with memory](./run-voice-and-chat-support-assistants-with-memory.md)
- [Build a profitable online business from scratch with an agent](./build-a-profitable-online-business-from-scratch-with-an-agen.md)
- [Have an agent research its own competitors](./have-an-agent-research-its-own-competitors.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
- [Qualify leads and handle onboarding with Make and AI](./qualify-leads-and-handle-onboarding-with-make-and-ai.md)
