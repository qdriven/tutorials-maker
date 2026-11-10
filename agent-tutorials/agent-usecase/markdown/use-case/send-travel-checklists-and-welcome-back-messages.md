---
title: "Send travel checklists and welcome-back messages"
slug: "send-travel-checklists-and-welcome-back-messages"
summary: "An n8n workflow scans a travel agency's daily trip sheet and sends WhatsApp checklists 3 days before departure and welcome-back messages a day after return."
category: "Travel & Bookings"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "X"
source_date: "Oct 12, 2026"
source_url: "https://x.com/tongshishak/status/2109727045395665020"
fetched_from: "https://agentusecases.ai/use-case/send-travel-checklists-and-welcome-back-messages"
---

# Send travel checklists and welcome-back messages

> An n8n workflow scans a travel agency's daily trip sheet and sends WhatsApp checklists 3 days before departure and welcome-back messages a day after return.

**Category:** Travel & Bookings  
**Agent:** n8n  
**Source:** X · Oct 12, 2026

## What they did

The n8n workflow runs daily on a schedule trigger. It reads a Google Sheet of trips, checks dates against today, and if the status column shows no prior message it calls WhatsApp to send either the pre-departure checklist three days out or the welcome-back note one day after return then marks the row updated.

## How it went

On a test sheet of ten trips only the right customers received messages on the right days.

## Prompt

```text
Build an n8n workflow that reads my [Google Sheet of daily trips] each morning. For trips departing in 3 days, send the traveler a WhatsApp packing and documents checklist, and for trips that ended yesterday, send a welcome-back message asking for [feedback]. Do a test run that shows me the messages it would send to [test number] and wait for my okay before enabling live sends.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book hotel rooms across booking engines](./book-hotel-rooms-across-booking-engines.md)
- [Search venue sites for concerts to attend](./search-venue-sites-for-concerts-to-attend.md)
