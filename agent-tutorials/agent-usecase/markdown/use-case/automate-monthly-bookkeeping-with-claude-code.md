---
title: "Automate monthly bookkeeping with Claude Code"
slug: "automate-monthly-bookkeeping-with-claude-code"
summary: "A newsletter operator has Claude Code rename files, categorize expenses, match invoices to payments and build summaries, cutting about 6 hours to 20 minutes."
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "futuredigestnews.substack.com"
source_date: "Undated"
source_url: "https://futuredigestnews.substack.com/p/claude-code-changed-everything-heres"
fetched_from: "https://agentusecases.ai/use-case/automate-monthly-bookkeeping-with-claude-code"
---

# Automate monthly bookkeeping with Claude Code

> A newsletter operator has Claude Code rename files, categorize expenses, match invoices to payments and build summaries, cutting about 6 hours to 20 minutes.

**Category:** Work & Operations  
**Agent:** Claude Code  
**Source:** futuredigestnews.substack.com · Undated

## What they did

The author points Claude Code at an admin folder and runs one prompt. It handles the monthly bookkeeping: renaming files, categorizing expenses, matching invoices to payments and building monthly summaries. In a related example, one plain-English prompt had it read 200 PDF invoices, rename and sort them into monthly folders, and export a spreadsheet. The author says they don't write code.

## How it went

The author says the monthly bookkeeping dropped from about 6 hours to 20 minutes. The invoice batch took four minutes with zero errors. These are self-reported figures, and the full guide is paywalled.

## Worth knowing

The exact prompts and setup sit behind the paywall, so the visible example prompt is the invoice-renaming one, not the bookkeeping prompt.

## Prompt

```text
In the folder [path] containing this month's receipts, invoices, and bank exports, rename files to a consistent format like [YYYY-MM-DD vendor amount], categorize each expense, and match invoices to payments. Produce a monthly summary spreadsheet with totals by category and a list of unmatched items for me to review. Don't delete or overwrite any originals; work on copies.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Write end-of-sprint changelogs from completed tickets](./write-end-of-sprint-changelogs-from-completed-tickets.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
