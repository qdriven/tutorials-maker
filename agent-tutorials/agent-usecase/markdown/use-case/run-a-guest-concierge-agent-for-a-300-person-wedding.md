---
title: "Run a guest concierge agent for a 300-person wedding"
slug: "run-a-guest-concierge-agent-for-a-300-person-wedding"
summary: "The poster built a wedding planning app with Gemini-powered agents, including a guest concierge, and writes up the failure modes seen in deployment."
category: "Life Admin & Home"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "Reddit"
source_date: "May 1, 2026"
source_url: "https://www.reddit.com/r/LLMDevs/comments/1t9jhgb/i_deployed_an_llm_agent_as_a_guest_concierge_for"
fetched_from: "https://agentusecases.ai/use-case/run-a-guest-concierge-agent-for-a-300-person-wedding"
---

# Run a guest concierge agent for a 300-person wedding

> The poster built a wedding planning app with Gemini-powered agents, including a guest concierge, and writes up the failure modes seen in deployment.

**Category:** Life Admin & Home  
**Agent:** Gemini  
**Source:** Reddit · May 1, 2026

## What they did

The poster built a wedding planning app with two Gemini-powered agents, including a guest concierge that had MCP-tool read access to events, schedules, venues, dress codes, transport info, and guest profiles. Over roughly 10 days, 17 international guests used it; it answered questions, parsed uploaded flight itinerary photos/PDFs into arrival times for confirmation, and also generated schedule cards and other guest-facing content that the poster then shared manually in WhatsApp.

## How it went

The AI was mostly accurate, but guests still asked the groom to verify answers, and a few timezone mistakes in multi-leg flight parsing were enough to kill trust and force a fallback to a manual spreadsheet. The poster says the strongest real use was content generation, while many concierge sessions were guests trying to jailbreak it.

## Worth knowing

Assume confirmations will fail in practice: the poster estimates about 30% of users will just click through a verification step, and jailbreak attempts also ran up token costs.

## Prompt

```text
Act as a guest concierge for my event, [wedding or event name], with about [number] guests. Using the details below ([schedule, venues, dress code, travel and lodging info, FAQs]), answer guest questions accurately, and say when you don't know and need to ask me. Test it with [5] typical guest questions and list any answers where you were guessing.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Shop Etsy for party supplies within a budget](./shop-etsy-for-party-supplies-within-a-budget.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
