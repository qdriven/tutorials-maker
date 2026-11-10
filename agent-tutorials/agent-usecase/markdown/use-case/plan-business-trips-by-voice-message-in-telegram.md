---
title: "Plan business trips by voice message in Telegram"
slug: "plan-business-trips-by-voice-message-in-telegram"
summary: "An n8n workflow transcribes Telegram voice notes, extracts destinations, dates and lodging needs, and searches flights and hotels for business travel."
category: "Travel & Bookings"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "n8n.io"
source_date: "Undated"
source_url: "https://n8n.io/workflows/3087-travel-ai-agent-ai-powered-travel-planner/"
fetched_from: "https://agentusecases.ai/use-case/plan-business-trips-by-voice-message-in-telegram"
---

# Plan business trips by voice message in Telegram

> An n8n workflow transcribes Telegram voice notes, extracts destinations, dates and lodging needs, and searches flights and hotels for business travel.

**Category:** Travel & Bookings  
**Agent:** n8n  
**Source:** n8n.io · Undated

## What they did

A Telegram bot triggers the n8n workflow and pulls out the text or audio. OpenAI transcribes voice messages, and DeepSeek extracts locations, dates and accommodation needs. SerpAPI then searches flights (airlines, times, prices) and hotels, with the check-out date calculated automatically. DeepSeek writes a structured plan with links and sends it back in Telegram.

## How it went

The source describes the design and setup only. It gives no results, timings or accuracy figures. It says the prompts can be edited to change the output, and it does not report any testing.

## Worth knowing

You need Telegram, OpenAI, SerpAPI and DeepSeek credentials and an n8n instance with HTTPS for the webhook. The template is listed for $29.

## Prompt

```text
Build an n8n workflow where I send a Telegram voice note like 'I need to be in [city] from [date] to [date], hotel near [area]'. It should transcribe the audio, extract destination, dates and lodging needs, then search flights and hotels using [my preferred search API]. It's done when it replies in Telegram with the top 3 options of each; never book anything, only present choices.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book hotel rooms across booking engines](./book-hotel-rooms-across-booking-engines.md)
- [Search venue sites for concerts to attend](./search-venue-sites-for-concerts-to-attend.md)
