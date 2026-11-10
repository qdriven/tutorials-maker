---
title: "Reconcile monthly business transactions"
slug: "reconcile-monthly-business-transactions"
summary: "Claude Code pulled a month of transactions over MCP and matched bank rows to receipts, proposing categories; it reconciled 200 rows but miscategorized 11, caught in a manual audit."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/kenimo49/i-let-claude-code-run-a-month-of-my-business-books-it-reconciled-200-transactions-and-513d"
fetched_from: "https://agentusecases.ai/use-case/reconcile-monthly-business-transactions"
---

# Reconcile monthly business transactions

> Claude Code pulled a month of transactions over MCP and matched bank rows to receipts, proposing categories; it reconciled 200 rows but miscategorized 11, caught in a manual audit.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Code  
**Source:** dev.to · Undated

## What they did

Rather than pasting a CSV into chat, the author had Claude Code build a re-runnable pipeline. It pulled the month's transactions from the accounting platform over MCP, matched bank rows to receipts by amount and date, drafted a category with a reason for each row, and flagged rows it was unsure about. The author reviewed the flagged rows and sampled the rest.

## How it went

It reconciled 200 transactions and miscategorized 11 (94.5%). The errors were judgment calls: 5 on business intent, 4 on local tax rules, 2 on edge cases. Seven of the 11 were already in its flagged set of 18.

## Worth knowing

Telling the agent never to guess silently turned a 200-row audit into an 18-row review plus a sample. Even so, four errors surfaced only in the spot-check.

## Prompt

```text
Reconcile my business transactions for [month] using [bank export/accounting tool] and the receipts in [folder]. Match each bank row to a receipt, propose a category from [my chart of accounts], and mark low-confidence matches separately. Don't post or change anything in my books. You're done when I have a table of matches and a list of items needing my review, so I can spot-check the categories.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Draft a refund demand for an unauthorized renewal](./draft-a-refund-demand-for-an-unauthorized-renewal.md)
- [Run overnight memecoin checks and alerts](./run-overnight-memecoin-checks-and-alerts.md)
