---
title: "Check supplier invoices for duplicates and missing GST"
slug: "check-supplier-invoices-for-duplicates-and-missing-gst"
summary: "Invoices arrive in a shared inbox, an AP tool extracts details, and an agent checks them against prior transactions to flag duplicates, wrong amounts or missing GST."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ukaccounting/comments/1srfaqy/best_ai_for_accounting_my_experience_using_ai"
fetched_from: "https://agentusecases.ai/use-case/check-supplier-invoices-for-duplicates-and-missing-gst"
---

# Check supplier invoices for duplicates and missing GST

> Invoices arrive in a shared inbox, an AP tool extracts details, and an agent checks them against prior transactions to flag duplicates, wrong amounts or missing GST.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Undated

## What they did

Supplier invoices land in a shared inbox, an AP tool captures the invoice data, and an agent compares each one with prior transactions to spot duplicates, wrong amounts, and missing GST. The poster connected the workflow with nexos.ai, said setup for the anomaly-checking agent took about 20 minutes, and still does the final review and approval manually.

## How it went

The poster said this saves a surprising amount of time each month and now produces a weekly summary, shifting their time from data entry to review. They also said they would not trust AI to approve payments, file tax returns, or submit BAS without checking it first.

## Worth knowing

The clearest practical catch is human signoff: even after a roughly 20-minute setup, they still review and approve invoices themselves.

## Prompt

```text
Build a workflow where invoices arriving in [shared inbox] have their details extracted, then compared against previous transactions in [sheet or accounting tool]. Flag any duplicates, amounts that differ from the matching purchase order, and invoices missing [GST or VAT] number or charge. Output a review list to [sheet or Slack] and finish when a test batch is correctly flagged; do not approve or pay anything automatically.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Delegate calendar, inbox and travel booking to a personal work agent](./delegate-calendar-inbox-and-travel-booking-to-a-personal-wor.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Regrade assignments and update grades in Brightspace](./regrade-assignments-and-update-grades-in-brightspace.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
