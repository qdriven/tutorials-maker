---
title: "Handle padel club bookings through a conversational AI agent"
slug: "handle-padel-club-bookings-through-a-conversational-ai-agent"
summary: "A padel club booking system uses an n8n AI agent for the conversation while the workflow handles booking logic."
category: "Travel & Bookings"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/n8n/comments/1ukil5g/i_added_an_ai_agent_to_my_n8n_booking_workflow"
fetched_from: "https://agentusecases.ai/use-case/handle-padel-club-bookings-through-a-conversational-ai-agent"
---

# Handle padel club bookings through a conversational AI agent

> A padel club booking system uses an n8n AI agent for the conversation while the workflow handles booking logic.

**Category:** Travel & Bookings  
**Agent:** n8n  
**Source:** Reddit · Undated

## What they did

The builder put an AI chat agent in front of an existing n8n booking workflow for a two-court padel club. The agent’s job is only to collect booking details in conversation and call the workflow as a tool; the workflow then checks conflicts, assigns the first available court, handles create/update/cancel cases, and syncs bookings to Google Sheets, while the builder manually iterated on the design after the AI-heavy version hallucinated.

## How it went

It let customers type requests like booking a slot and receive a confirmed booking ID, and the author says separating chat from booking logic made it more reliable and easier to debug. It still looked complex enough that the author said they plan to split create, update, and cancel into separate workflows.

## Worth knowing

The author says they used 4o mini and spent about $1 for roughly 150 successful conversations during testing.

## Prompt

```text
Build a workflow for [club name] where customers book [courts or sessions] by chatting with an AI agent via [WhatsApp, Telegram, or web chat]. Let the agent collect the date, time, duration, and player name, while the workflow checks availability in [Google Calendar or spreadsheet] and handles the booking rules. Before the workflow creates or cancels a booking, have the agent confirm the details with the customer. It's finished when I can book, change, and cancel a test slot end to end.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book hotel rooms across booking engines](./book-hotel-rooms-across-booking-engines.md)
- [Search venue sites for concerts to attend](./search-venue-sites-for-concerts-to-attend.md)
