---
title: "Run a restaurant voice assistant for reservations and orders"
slug: "run-a-restaurant-voice-assistant-for-reservations-and-orders"
summary: "n8n backends let an ElevenLabs voice agent check tables, manage reservations, take orders and request callbacks, plus Vapi travel and home-service booking agents."
category: "Travel & Bookings"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "github.com"
source_date: "Undated"
source_url: "https://github.com/MuhammadAbid01/n8n-workflows"
fetched_from: "https://agentusecases.ai/use-case/run-a-restaurant-voice-assistant-for-reservations-and-orders"
---

# Run a restaurant voice assistant for reservations and orders

> n8n backends let an ElevenLabs voice agent check tables, manage reservations, take orders and request callbacks, plus Vapi travel and home-service booking agents.

**Category:** Travel & Bookings  
**Agent:** n8n  
**Source:** github.com · Undated

## What they did

The restaurant workflow is an n8n backend for an ElevenLabs Conversational AI agent. It exposes five webhook endpoints that the agent calls during live calls to check table availability, make, change or cancel reservations, take pickup or delivery orders, and request a human callback. Records go in Google Sheets and staff are notified by Gmail. The Vapi travel and home-service agents follow the same pattern.

## How it went

The repo describes the workflows and offers importable JSON files but reports no usage results, call volumes or accuracy figures. It states that the workflows are examples and starting points.

## Worth knowing

Test with non-production data first. Secure the public webhook endpoints yourself, and review privacy rules and service costs before going live.

## Prompt

```text
Build me an n8n workflow that acts as the backend for a voice assistant at [my restaurant name]. It should receive webhook requests from [ElevenLabs or Vapi] to check table availability in [my Google Calendar or Sheet], create or cancel reservations, take orders, and log callback requests. It's finished when I can test each action with a sample request and see the result; before it sends any confirmation message or changes real bookings, pause and show me what it will do.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book hotel rooms across booking engines](./book-hotel-rooms-across-booking-engines.md)
- [Search venue sites for concerts to attend](./search-venue-sites-for-concerts-to-attend.md)
