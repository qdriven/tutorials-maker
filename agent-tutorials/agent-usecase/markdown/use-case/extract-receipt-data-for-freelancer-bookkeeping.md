---
title: "Extract receipt data for freelancer bookkeeping"
slug: "extract-receipt-data-for-freelancer-bookkeeping"
summary: "An app built with Claude Code extracts vendor, date, total, tax and line items from receipts, including foreign-currency ones at historical exchange rates, for freelancers and small businesses."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Apr 1, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1seckj6/i_built_an_ai_bookkeeping_app_with_claude_code"
fetched_from: "https://agentusecases.ai/use-case/extract-receipt-data-for-freelancer-bookkeeping"
---

# Extract receipt data for freelancer bookkeeping

> An app built with Claude Code extracts vendor, date, total, tax and line items from receipts, including foreign-currency ones at historical exchange rates, for freelancers and small businesses.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Code  
**Source:** Reddit · Apr 1, 2026

## What they did

The builder used Claude Code to implement most of a bookkeeping app for freelancers and small businesses across a Next.js App Router, Prisma with PostgreSQL, Vercel Blob storage, the UI, and the receipt-processing flow. Users can upload receipt photos on the site or send them through Telegram or Discord; the app extracts fields into a fixed JSON-style structure, keeps raw OCR text for debugging, converts foreign receipts using the receipt-date exchange rate, and sends low-confidence cases to a human review screen where users correct mistakes inline.

## How it went

The result was a beta app the builder said felt useful enough to share, with English and French support, a searchable ledger, and deduction guidance during review. It was not fully automated: receipts were still mostly handled one by one, and corrections were a planned future signal rather than something already reused automatically.

## Worth knowing

The main catch was that prompt structure plus fallback and review logic mattered more than one perfect prompt, because receipt data was messy and uncertain cases needed human review.

## Prompt

```text
Build a small app that reads receipt images or PDFs from [folder] and extracts vendor, date, total, tax, currency, and line items into a CSV. For receipts in a foreign currency, convert to [home currency] using the exchange rate on the receipt date and show the rate used. You're done when it runs on my sample receipts and I can see the CSV plus a list of any receipts it couldn't read confidently.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Draft a refund demand for an unauthorized renewal](./draft-a-refund-demand-for-an-unauthorized-renewal.md)
- [Run overnight memecoin checks and alerts](./run-overnight-memecoin-checks-and-alerts.md)
