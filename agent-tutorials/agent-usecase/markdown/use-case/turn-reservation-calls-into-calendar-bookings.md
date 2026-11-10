---
title: "Turn reservation calls into calendar bookings"
slug: "turn-reservation-calls-into-calendar-bookings"
summary: "An n8n workflow takes Vapi call transcripts, extracts reservation details, creates Calendar events, logs to Sheets and sends follow-ups."
category: "Travel & Bookings"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "clixlogix.com"
source_date: "Undated"
source_url: "https://www.clixlogix.com/n8n-ai-receptionist-24-7-booking-agent/"
fetched_from: "https://agentusecases.ai/use-case/turn-reservation-calls-into-calendar-bookings"
---

# Turn reservation calls into calendar bookings

> An n8n workflow takes Vapi call transcripts, extracts reservation details, creates Calendar events, logs to Sheets and sends follow-ups.

**Category:** Travel & Bookings  
**Agent:** n8n  
**Source:** clixlogix.com · Undated

## What they did

When Vapi finishes a call, it posts the transcript to an n8n webhook, and an IF node lets only call_ended events through. A Groq-hosted Llama model turns the transcript into fixed JSON: name, phone, email, guests, date, time and requests, plus a drafted confirmation email. n8n then creates the Google Calendar event, appends to Sheets and Supabase, and sends Gmail and Twilio SMS confirmations.

## How it went

The authors give no booking counts or test results. They put running cost at about $60–100 a month and argue that recovering one lost reservation a week pays for it. They flag double-booking as an open risk.

## Worth knowing

Add an availability check before the calendar insert, or two callers can get the same slot. Cost is roughly $60–100 a month, or $0.10–0.12 per call minute.

## Prompt

```text
Build an n8n workflow that receives call transcripts from [Vapi or my voice-agent tool], extracts the guest name, phone number, date, time and party size, and creates a Google Calendar event on [my calendar]. It should also log each booking to a Google Sheet and draft a follow-up message. It's done when a sample transcript produces a calendar event and a sheet row; pause and show me the follow-up before anything is sent.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book hotel rooms across booking engines](./book-hotel-rooms-across-booking-engines.md)
- [Search venue sites for concerts to attend](./search-venue-sites-for-concerts-to-attend.md)
