---
title: "Search venue sites for concerts to attend"
slug: "search-venue-sites-for-concerts-to-attend"
summary: "The author had Operator look for classical concerts in Berlin; it returned a result after 15 minutes but struggled to navigate, and product research and Gmail receipt fetching failed."
category: "Travel & Bookings"
agents:
  - name: "Operator"
    slug: "operator"
source_platform: "antoine.fi"
source_date: "Undated"
source_url: "https://antoine.fi/trying-openai-operator"
fetched_from: "https://agentusecases.ai/use-case/search-venue-sites-for-concerts-to-attend"
---

# Search venue sites for concerts to attend

> The author had Operator look for classical concerts in Berlin; it returned a result after 15 minutes but struggled to navigate, and product research and Gmail receipt fetching failed.

**Category:** Travel & Bookings  
**Agent:** Operator  
**Source:** antoine.fi · Undated

## What they did

The author asked Operator, which runs ChatGPT in its own virtual machine with a browser, to check Berlin venue websites for classical concerts. Operator had to set dates and see which concerts were sold out. It worked on its own for 15 minutes. The author then re-prompted, asking for URLs.

## How it went

The first answer came back after 15 minutes, but names and dates alone didn't let the author find the concerts. The URL retry took 33 minutes and returned three concerts that weren't what the author wanted. Date pickers gave Operator trouble.

## Worth knowing

The VM isn't logged in to anything, and the author couldn't even paste passwords, so sign-in-dependent tasks like fetching Gmail receipts failed.

## Prompt

```text
Look at the websites of [venue 1], [venue 2] and [venue 3] in [city] and find [type of event, e.g. classical concerts] happening between [start date] and [end date]. List each with date, venue, ticket price and link, and tell me if a site blocked you. Stop at the list and do not buy tickets.
```

## Related use cases

- [Find a toy and start checkout with Operator](./find-a-toy-and-start-checkout-with-operator.md)
- [Test Operator on legal paperwork, party planning and shopping](./test-operator-on-legal-paperwork-party-planning-and-shopping.md)
- [Contact OpenAI support on the user's behalf](./contact-openai-support-on-the-user-s-behalf.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Plan a last-minute business trip by phone](./plan-a-last-minute-business-trip-by-phone.md)
- [Book a private chef and plan a ski holiday](./book-a-private-chef-and-plan-a-ski-holiday.md)
