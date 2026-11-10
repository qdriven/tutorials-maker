---
title: "Extract expenses from receipt photos sent via chat"
slug: "extract-expenses-from-receipt-photos-sent-via-chat"
summary: "A bookkeeping assistant for freelancers and small businesses reads receipt photos sent through Telegram or Discord and extracts vendor, amount, tax, category and date."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/SideProject/comments/1s8p0aq/i_built_an_ai_bookkeeper_that_extracts_expenses"
fetched_from: "https://agentusecases.ai/use-case/extract-expenses-from-receipt-photos-sent-via-chat"
---

# Extract expenses from receipt photos sent via chat

> A bookkeeping assistant for freelancers and small businesses reads receipt photos sent through Telegram or Discord and extracts vendor, amount, tax, category and date.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Undated

## What they did

The builder made AICountant for freelancers and small businesses as a Telegram or Discord bot. Users connect one of those accounts, send a receipt photo, and the AI pulls out vendor, amount, tax, category, and date, then adds the expense to a ledger for review before the user can export it as CSV.

## How it went

The post says the product was already functional and the creator was recruiting beta testers to validate usage patterns. They specifically wanted real receipts from different countries, formats, and industries to find weak spots in extraction.

## Worth knowing

The main catch was coverage: they were still testing on varied real-world receipts to improve accuracy, so reliability across formats was not yet proven.

## Prompt

```text
Build a workflow that triggers when I send a receipt photo to my [Telegram/Discord] bot. It should extract vendor, amount, tax, category, and date, then append a row to my [Google Sheet name]. Test it with [3] sample receipts and show me the rows it created. Flag any receipt it cannot read clearly instead of guessing.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Delegate calendar, inbox and travel booking to a personal work agent](./delegate-calendar-inbox-and-travel-booking-to-a-personal-wor.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Regrade assignments and update grades in Brightspace](./regrade-assignments-and-update-grades-in-brightspace.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
