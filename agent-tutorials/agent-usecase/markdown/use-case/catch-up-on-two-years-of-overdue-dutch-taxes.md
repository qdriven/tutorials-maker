---
title: "Catch up on two years of overdue Dutch taxes"
slug: "catch-up-on-two-years-of-overdue-dutch-taxes"
summary: "Claude Code helped a person almost two years behind on taxes untangle expenses, look up receipts and invoices, and navigate the Dutch tax system."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeCode/comments/1spuza0/claude_code_just_did_my_taxes_for_me"
fetched_from: "https://agentusecases.ai/use-case/catch-up-on-two-years-of-overdue-dutch-taxes"
---

# Catch up on two years of overdue Dutch taxes

> Claude Code helped a person almost two years behind on taxes untangle expenses, look up receipts and invoices, and navigate the Dutch tax system.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Code  
**Source:** Reddit · Undated

## What they did

They built a local Python-based accounting workflow with Claude Code for a Dutch B.V. with a holding structure. Claude wrote scripts to pull two years of transactions from the Revolut API and bank CSVs, scrape Gmail for receipts and invoices, categorize 330+ transactions with LLM judgment, calculate VAT and reporting totals, and flag 19 edge cases for the accountant instead of deciding them alone.

## How it went

In one afternoon it produced reports in the Dutch tax agency’s box format, cut the accountant’s workload from about 20 hours a year to 5, and caught that the shareholder-loan threshold had been exceeded by EUR 11K. The person still kept the accountant for corporate tax, R&D credits, and annual accounts.

## Worth knowing

During runtime it ran locally with external calls only to the bank and Gmail for source data; the API was mainly used earlier while Claude wrote and debugged the code.

## Prompt

```text
I am behind on my [country] taxes for [years]. Look through the folder [path to folder] with my bank exports, receipts, and invoices, then build a spreadsheet of income and deductible expenses per year and a list of missing documents I need to find. Finish with a step-by-step plan for filing each year, and ask me before moving, renaming, or deleting any files.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Draft a refund demand for an unauthorized renewal](./draft-a-refund-demand-for-an-unauthorized-renewal.md)
- [Run overnight memecoin checks and alerts](./run-overnight-memecoin-checks-and-alerts.md)
