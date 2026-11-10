---
title: "Book a kid's dental checkup by phone agent"
slug: "book-a-kid-s-dental-checkup-by-phone-agent"
summary: "The poster tested eight AI phone-call agents on calling a dentist to book a checkup within constraints like weekdays only and after 3pm."
category: "Travel & Bookings"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Sep 28, 2026"
source_url: "https://www.reddit.com/r/AI_Agents/comments/1wnxpb0/best_ai_phone_call_agent_i_tested_8_and_theyre"
fetched_from: "https://agentusecases.ai/use-case/book-a-kid-s-dental-checkup-by-phone-agent"
---

# Book a kid's dental checkup by phone agent

> The poster tested eight AI phone-call agents on calling a dentist to book a checkup within constraints like weekdays only and after 3pm.

**Category:** Travel & Bookings  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Sep 28, 2026

## What they did

The poster had Claude Code wire up eight phone-agent tools from their docs, then gave each the same task: call the poster’s own cell, where the poster role-played a dental front desk booking a child’s checkup on weekdays only after 3 p.m. The test deliberately offered invalid times first, forced the agent to spell a difficult last name, then asked it to choose between two valid slots; the poster judged the call and checked each tool’s API result afterward.

## How it went

Only a few completed the booking flow: PlaceCall was the only one that booked correctly over a real phone line with minimal setup, while Retell succeeded only as a browser-based web call and Ring-a-Ding booked but ended loosely. The whole comparison took about a day and a half, and three of the eight tools never made a real phone call.

## Worth knowing

Most of the time went to signups, not testing, and some services needed a card, ID verification, or about $10 before outbound calling worked.

## Prompt

```text
Find [dentist name or dentists near zip] and identify their phone number and online booking options. I need a checkup for my child on weekdays only after [time], within [date range]. Draft the exact call script and list the available slots you can find, then pause and show me before you submit any booking form or contact the office.
```

## Related use cases

- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book flights with credits and manage reservations](./book-flights-with-credits-and-manage-reservations.md)
- [Research hotels for a 14-day Japan trip](./research-hotels-for-a-14-day-japan-trip.md)
- [Fix wrong-day flight reservations between bots](./fix-wrong-day-flight-reservations-between-bots.md)
- [Search venue sites for concerts to attend](./search-venue-sites-for-concerts-to-attend.md)
- [Book the best-priced flight and later refund it](./book-the-best-priced-flight-and-later-refund-it.md)
