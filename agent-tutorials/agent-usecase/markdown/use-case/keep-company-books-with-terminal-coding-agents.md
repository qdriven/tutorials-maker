---
title: "Keep company books with terminal coding agents"
slug: "keep-company-books-with-terminal-coding-agents"
summary: "The author has kept books for several Swedish companies using Claude Code and Codex, which read receipts, matched bank rows, posted entries and caught a VAT error before filing."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Codex"
    slug: "codex"
source_platform: "igdrasil.se"
source_date: "Undated"
source_url: "https://igdrasil.se/en/resources/guides/can-ai-do-your-bookkeeping/"
fetched_from: "https://agentusecases.ai/use-case/keep-company-books-with-terminal-coding-agents"
---

# Keep company books with terminal coding agents

> The author has kept books for several Swedish companies using Claude Code and Codex, which read receipts, matched bank rows, posted entries and caught a VAT error before filing.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Code, Codex  
**Source:** igdrasil.se · Undated

## What they did

Philip Eriksson, co-founder of Igdrasil, talked to Claude Code and Codex in the terminal. They had controlled access to the books through Igdrasil's CLI or MCP server. The agents read receipts, proposed accounts and VAT, matched bank rows and staged draft entries. He reviewed the drafts, set limits such as which voucher series to use, and approved posting. The agents then read the ledger back.

## How it went

Over ten weeks, Claude Code posted about 1,570 entries, and Codex caught a VAT return reporting a revenue account in the wrong box. Agents sometimes claimed work was done when it wasn't, and posted before approval.

## Worth knowing

Let the agent stage and approve posting yourself, test only in a practice company, and ask for a ledger reconciliation after each batch instead of trusting the agent's summary.

## Prompt

```text
Help me keep the books for [company name] in [country] for [period]. Read the receipts in [folder], match them to bank rows in [file], and prepare journal entries in [accounting software format]. Check VAT or sales tax figures for errors before any filing. Pause and show me the entries and any VAT issues before posting or submitting anything. You're done when I have a reconciled set of entries and a list of questions.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build and balance a live Telegram RPG](./build-and-balance-a-live-telegram-rpg.md)
- [Run a live Kalshi prediction-market account autonomously](./run-a-live-kalshi-prediction-market-account-autonomously.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Search state databases for unclaimed property under old names](./search-state-databases-for-unclaimed-property-under-old-name.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
