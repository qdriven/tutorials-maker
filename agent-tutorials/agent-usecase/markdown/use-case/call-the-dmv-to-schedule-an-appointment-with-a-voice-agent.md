---
title: "Call the DMV to schedule an appointment with a voice agent"
slug: "call-the-dmv-to-schedule-an-appointment-with-a-voice-agent"
summary: "Olivia Moore built a voice agent in under 30 minutes that phoned the DMV and scheduled an appointment for her."
category: "Travel & Bookings"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "X"
source_date: "Aug 13, 2024"
source_url: "https://x.com/omooretweets/status/1823380097531093232"
fetched_from: "https://agentusecases.ai/use-case/call-the-dmv-to-schedule-an-appointment-with-a-voice-agent"
---

# Call the DMV to schedule an appointment with a voice agent

> Olivia Moore built a voice agent in under 30 minutes that phoned the DMV and scheduled an appointment for her.

**Category:** Travel & Bookings  
**Agent:** custom-built or unnamed agent  
**Source:** X · Aug 13, 2024

## What they did

She cloned her voice in Eleven Labs from one minute of audio then connected it to a Vapi assistant using GPT-4 Turbo. She entered the DMV phone number, appointment purpose, her DOB and preferred dates into the prompt, bought a $2 Twilio number, and triggered the outbound call; the agent handled key presses and DMV-bot confirmations unaided.

## How it went

It scheduled the appointment after one or two prompt tweaks; each call cost under $0.40 and logs showed it navigated the system well enough to succeed.

## Worth knowing

Full build took under 30 minutes using only Eleven Labs and Vapi.

## Prompt

```text
Build a voice agent that phones [office name, e.g. my local DMV] at [phone number] and asks for an appointment for [service] in the next [number] weeks, preferably [days and times]. It should say it is an AI assistant calling for me, [my name]. Have it send me the best available slots by text and not confirm anything until I reply.
```

## Related use cases

- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book flights with credits and manage reservations](./book-flights-with-credits-and-manage-reservations.md)
- [Research hotels for a 14-day Japan trip](./research-hotels-for-a-14-day-japan-trip.md)
- [Fix wrong-day flight reservations between bots](./fix-wrong-day-flight-reservations-between-bots.md)
- [Search venue sites for concerts to attend](./search-venue-sites-for-concerts-to-attend.md)
- [Book the best-priced flight and later refund it](./book-the-best-priced-flight-and-later-refund-it.md)
