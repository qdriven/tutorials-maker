---
title: "Prepare S-Corp tax filings from bookkeeping data"
slug: "prepare-s-corp-tax-filings-from-bookkeeping-data"
summary: "Claude Code wrote scripts parsing QuickBooks and bank statements, and Codex reviewed the code and caught errors like a wrong Schedule L mapping."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Codex"
    slug: "codex"
source_platform: "common-sense.com"
source_date: "Undated"
source_url: "https://common-sense.com/insights/doing-taxes-with-ai-coding-agents/"
fetched_from: "https://agentusecases.ai/use-case/prepare-s-corp-tax-filings-from-bookkeeping-data"
---

# Prepare S-Corp tax filings from bookkeeping data

> Claude Code wrote scripts parsing QuickBooks and bank statements, and Codex reviewed the code and caught errors like a wrong Schedule L mapping.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Code, Codex  
**Source:** common-sense.com · Undated

## What they did

The author put QuickBooks exports and bank statements in a private Git repo. Claude Code (Opus 4.6) wrote Python scripts that parse the data and compute the S-Corp forms. Codex, on a high-reasoning model, reviewed the scripts, and the two went back and forth until they agreed the code was right. The author directed the work and checked the results.

## How it went

Codex flagged three findings on the 1120S scripts. The worst was a Schedule L Line 18 computed from total liabilities rather than other current liabilities. The author also found his own 2025 bookkeeping mistakes.

## Worth knowing

The author has used a CPA since 1996 and describes directing and checking the work himself. The post gives no cost or time figures and does not say whether the filings were submitted.

## Prompt

```text
In [folder], write scripts that parse my QuickBooks export and bank statements for [year] and produce the figures needed for my S-Corp return (income statement, Schedule L, and shareholder items). Then review your own code and numbers against the source data and list any mismatches or mappings you're unsure about. Done means a summary file of figures, tied back to source rows, that I can hand to my accountant.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build and balance a live Telegram RPG](./build-and-balance-a-live-telegram-rpg.md)
- [Run a live Kalshi prediction-market account autonomously](./run-a-live-kalshi-prediction-market-account-autonomously.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Search state databases for unclaimed property under old names](./search-state-databases-for-unclaimed-property-under-old-name.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
