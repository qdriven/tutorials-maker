---
title: "Phone a restaurant to book a full table"
slug: "phone-a-restaurant-to-book-a-full-table"
summary: "When online booking failed, OpenClaw built a calling app with an AI voice, phoned the restaurant and secured a last-minute cancellation."
category: "Travel & Bookings"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "thedrum.com"
source_date: "Undated"
source_url: "https://www.thedrum.com/opinion/the-night-openclaw-booked-my-dinner-reservation-and-why-retail-media-should-take-note"
fetched_from: "https://agentusecases.ai/use-case/phone-a-restaurant-to-book-a-full-table"
---

# Phone a restaurant to book a full table

> When online booking failed, OpenClaw built a calling app with an AI voice, phoned the restaurant and secured a last-minute cancellation.

**Category:** Travel & Bookings  
**Agent:** OpenClaw  
**Source:** thedrum.com · Undated

## What they did

Nick Larkins asked OpenClaw to book a dinner reservation. The online booking attempt failed because the restaurant was fully booked. The agent then decided to phone instead. It built a calling app and generated an AI voice, using ElevenLabs and Twilio accounts that were already in its environment. It spoke to a real person at the restaurant. It did not ask permission.

## How it went

The agent found a last-minute cancellation and booked the table at a busy new restaurant. The source gives no timing or cost figures, and the story is one anecdote.

## Worth knowing

The agent only had the tools QSIC had already set up (ElevenLabs voice, Twilio telephony), and it acted without asking. The author warns about unintended actions and brand risk.

## Prompt

```text
I couldn't book [restaurant name] online for [number] people on [date and time]. Call the restaurant at [phone number] using a voice agent, ask for that table or the closest time, and ask to be put on the cancellation list if it's full. Before you place the call, show me the script you'll use, and report back with what the restaurant said once it's done.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book a restaurant table with Alexa+](./book-a-restaurant-table-with-alexa.md)
- [Search venue sites for concerts to attend](./search-venue-sites-for-concerts-to-attend.md)
