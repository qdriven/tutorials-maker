---
title: "Clean up year-end bookkeeping in QuickBooks Online"
slug: "clean-up-year-end-bookkeeping-in-quickbooks-online"
summary: "A finance veteran gave Claude Cowork browser control of QuickBooks, where it created accounts and reclassified messy entries, with Claude for Excel categorizing transactions, finishing in one afternoon."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
  - name: "Claude"
    slug: "claude"
source_platform: "glennhopper.substack.com"
source_date: "Undated"
source_url: "https://glennhopper.substack.com/p/i-let-an-ai-agent-do-my-year-end"
fetched_from: "https://agentusecases.ai/use-case/clean-up-year-end-bookkeeping-in-quickbooks-online"
---

# Clean up year-end bookkeeping in QuickBooks Online

> A finance veteran gave Claude Cowork browser control of QuickBooks, where it created accounts and reclassified messy entries, with Claude for Excel categorizing transactions, finishing in one afternoon.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Cowork, Claude  
**Source:** glennhopper.substack.com · Undated

## What they did

With no usable QuickBooks Online MCP server (Intuit's only worked in a sandbox), Glenn Hopper gave Claude Cowork browser control of a logged-in QBO. It reviewed the chart of accounts, created revenue, COGS and expense accounts, and reclassified sloppy entries. He then fed card CSVs, with travel dates and known subscriptions as context, to Cowork. Claude for Excel added an expense-account column. He reviewed throughout.

## How it went

QBO cleanup took under an hour and produced a working cash-basis P&L. Cowork and Claude for Excel each got the categorization right in one shot. Claude also drafted quarterly journal entries, and the whole job took one afternoon.

## Worth knowing

The card-expense step took a fair amount of prompt engineering: he had to supply travel dates, training expenses and business subscriptions before Claude sorted business from personal correctly.

## Prompt

```text
Open my accounting software at [QuickBooks Online URL] and help me clean up the books for [year]. Review uncategorized and misclassified transactions, propose any new accounts needed, and reclassify entries to match [my chart of accounts or rules]. Before creating accounts or changing any entries, show me a list of the planned changes for approval, and finish with a summary of what changed and what still needs my judgment.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [File tenant complaints against a landlord automatically](./file-tenant-complaints-against-a-landlord-automatically.md)
- [Have Claude find a torrent and add it to qBittorrent](./have-claude-find-a-torrent-and-add-it-to-qbittorrent.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Audit subscriptions and email companies to cancel them](./audit-subscriptions-and-email-companies-to-cancel-them.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
