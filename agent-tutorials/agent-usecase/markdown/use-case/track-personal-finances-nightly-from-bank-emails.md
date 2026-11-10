---
title: "Track personal finances nightly from bank emails"
slug: "track-personal-finances-nightly-from-bank-emails"
summary: "A non-coder had Claude Code build a finance tracker that pulls bank emails, categorizes spending, and runs nightly on a Raspberry Pi."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "fahadhasin.substack.com"
source_date: "Undated"
source_url: "https://fahadhasin.substack.com/p/40-how-i-am-using-claude-code"
fetched_from: "https://agentusecases.ai/use-case/track-personal-finances-nightly-from-bank-emails"
---

# Track personal finances nightly from bank emails

> A non-coder had Claude Code build a finance tracker that pulls bank emails, categorizes spending, and runs nightly on a Raspberry Pi.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Code  
**Source:** fahadhasin.substack.com · Undated

## What they did

Fahad Hasin, who says he knows little coding, had Claude Code build a personal finance tracker that runs on a Raspberry Pi 5 he already owned. It combines bank update emails from several accounts and payment methods, categorizes spending, and adds context from merchant emails. A local Llama 3.2:3B model does the categorizing. A cron job runs it nightly with no manual steps.

## How it went

He says it works better than he expected, and the nightly run needs no manual steps. The post gives no accuracy figures, and the author admits he can't judge the code quality.

## Worth knowing

Local model means no token costs and no third party seeing your transactions; the author says a small miscategorisation is tolerable here.

## Prompt

```text
Build me a personal finance tracker that pulls transaction emails from my inbox, categorizes spending automatically, and runs on a schedule to keep an updated log. Have it produce a daily or weekly summary I can review, and confirm the categorization logic with me before running unattended long-term.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Draft a refund demand for an unauthorized renewal](./draft-a-refund-demand-for-an-unauthorized-renewal.md)
- [Run overnight memecoin checks and alerts](./run-overnight-memecoin-checks-and-alerts.md)
