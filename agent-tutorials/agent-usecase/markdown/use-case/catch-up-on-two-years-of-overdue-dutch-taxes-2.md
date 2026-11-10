---
title: "Catch up on two years of overdue Dutch taxes"
slug: "catch-up-on-two-years-of-overdue-dutch-taxes-2"
summary: "A user who was two years behind had Claude untangle expenses, find receipts and invoices, and handle Dutch tax filings in one afternoon."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "May 1, 2026"
source_url: "https://www.reddit.com/r/vibecoding/comments/1spuwzd/i_was_2_years_behind_on_taxes_claude_fixed_it_for"
fetched_from: "https://agentusecases.ai/use-case/catch-up-on-two-years-of-overdue-dutch-taxes-2"
---

# Catch up on two years of overdue Dutch taxes

> A user who was two years behind had Claude untangle expenses, find receipts and invoices, and handle Dutch tax filings in one afternoon.

**Category:** Money, Bills & Benefits  
**Agent:** Claude  
**Source:** Reddit · May 1, 2026

## What they did

The user built an automated accounting system around Claude that pulled in two years of transactions from three bank accounts, scraped email to match receipts and invoices, categorized expenses, calculated what was owed and when, and generated reports in Dutch tax-agency box format for an accountant. They also had Claude do deep research on their specific Dutch tax situation and compile it into a knowledge-base wiki, then used that context to flag ambiguities and draft questions for the accountant rather than relying on Claude alone.

## How it went

They say it cleared a two-year backlog in one afternoon, should reduce future quarterly summaries to a single CLI command taking about five minutes, and had already saved them thousands of euros. It still surfaced 19 questions for the accountant, and commenters warned the output needed careful checking.

## Worth knowing

The main catch is verification: even after automating the work, they still sent 19 edge cases and ambiguities to their accountant.

## Prompt

```text
I'm behind on my [country] taxes for [years]. I'll paste in my bank transactions, invoices, and notes: [paste or attach]. Sort the expenses into tax categories, flag missing receipts or invoices I should track down, and walk me through what I need to file for each year. End with a checklist of filings and deadlines, and ask me before assuming anything uncertain.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Track competitor prices and contacts into Google Sheets](./track-competitor-prices-and-contacts-into-google-sheets.md)
- [Run weekly marketing content in brand voice](./run-weekly-marketing-content-in-brand-voice.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Fight consumer claims and recover refunds](./fight-consumer-claims-and-recover-refunds.md)
- [Dispute an erroneous medical collections bill](./dispute-an-erroneous-medical-collections-bill.md)
