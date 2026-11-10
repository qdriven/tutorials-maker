---
title: "Run a personal assistant for flights, newspapers and summaries"
slug: "run-a-personal-assistant-for-flights-newspapers-and-summarie"
summary: "A user's Grok Bot plans flights, fetches newspapers via library login, checks store stock, and sends event and weather summaries; voice, permissions and coding worked poorly."
category: "Life Admin & Home"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "HN"
source_date: "Oct 29, 2026"
source_url: "https://news.ycombinator.com/item?id=50295795"
fetched_from: "https://agentusecases.ai/use-case/run-a-personal-assistant-for-flights-newspapers-and-summarie"
---

# Run a personal assistant for flights, newspapers and summaries

> A user's Grok Bot plans flights, fetches newspapers via library login, checks store stock, and sends event and weather summaries; voice, permissions and coding worked poorly.

**Category:** Life Admin & Home  
**Agent:** Grok Bot  
**Source:** HN · Oct 29, 2026

## What they did

The commenter set up Grok Bot a few days earlier and created bots/personas rather than channels. They gave it their library login so it fetches newspapers daily instead of them clicking through the app. When it needed a GitLab token, it opened a box to save the credential. They also used it for flights, store stock checks, and regular event and weather summaries.

## How it went

Flight planning, newspaper access, stock checks and scheduled summaries worked, with no screwups seen. Voice calls felt non-realtime, the natural-language permission settings did nothing, and it couldn't drive Claude or code as well as Opus in Claude Code.

## Worth knowing

Handing it credentials, like a library login, is what makes the newspaper task work; don't rely on its auto-allow permission form, which had no effect.

## Prompt

```text
Act as my personal assistant. Each morning, send me a summary of [local weather and my events for the day], and fetch today's [newspaper name] using my library login, which I'll give you securely. When I ask, also search for flights from [origin] to [destination] on [dates], and check whether [store] has [item] in stock near [city]. Pause and show me the details before booking, paying for, or sending anything on my behalf.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
- [Monitor competitor marketplace prices](./monitor-competitor-marketplace-prices.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Give an AI its own inbox to act as personal assistant](./give-an-ai-its-own-inbox-to-act-as-personal-assistant.md)
- [Run personal life admin with Claude Code skills](./run-personal-life-admin-with-claude-code-skills.md)
