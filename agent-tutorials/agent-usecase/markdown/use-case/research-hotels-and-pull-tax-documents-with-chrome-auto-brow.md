---
title: "Research hotels and pull tax documents with Chrome auto browse"
slug: "research-hotels-and-pull-tax-documents-with-chrome-auto-brow"
summary: "A tester used Gemini in Chrome to research Lisbon hotels across sites and fetch tax documents from payroll portals; it stopped before placing a grocery order."
category: "Travel & Bookings"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "blog.imseankim.com"
source_date: "Undated"
source_url: "https://blog.imseankim.com/chrome-auto-browse-gemini-agentic-hotel-form-fill-google-io-2026/"
fetched_from: "https://agentusecases.ai/use-case/research-hotels-and-pull-tax-documents-with-chrome-auto-brow"
---

# Research hotels and pull tax documents with Chrome auto browse

> A tester used Gemini in Chrome to research Lisbon hotels across sites and fetch tax documents from payroll portals; it stopped before placing a grocery order.

**Category:** Travel & Bookings  
**Agent:** Gemini  
**Source:** blog.imseankim.com · Undated

## What they did

In Chrome auto browse, the tester gave Gemini a Lisbon goal: October hotels under $220 a night across three week-long windows. It opened Booking, Hotels.com, Expedia and Hyatt tabs and kept a comparison in the side panel. For taxes, it used already-logged-in Gusto and ADP sessions to download W-2 and 1099 PDFs. When Gusto showed a two-factor prompt, it handed control back and resumed afterward.

## How it went

The hotel run took about six minutes and returned three candidates without booking. It downloaded four tax documents. The grocery cart had 18 items, two of them the wrong brand, and it waited for approval at checkout.

## Worth knowing

Auto browse is a US-only preview for Google AI Pro or Ultra subscribers. The tester's subscription-cancellation run failed, and one cancellation chose the wrong tier.

## Prompt

```text
In Chrome, research [number] hotels in [city] for [dates] across [two or three booking sites], and give me a comparison table with price, location, rating and cancellation terms. Then log into [portal] and download my [document type, e.g. tax documents] for [year], listing what you saved. Stop and ask me before any login step, purchase or order.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Hunt for unpatched vulnerabilities in SQLite commits](./hunt-for-unpatched-vulnerabilities-in-sqlite-commits.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book a restaurant table with Alexa+](./book-a-restaurant-table-with-alexa.md)
- [Buy movie tickets and set reminders from your calendar](./buy-movie-tickets-and-set-reminders-from-your-calendar.md)
