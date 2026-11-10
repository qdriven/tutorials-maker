---
title: "Build a personal tax refund calculator instead of paying a CPA"
slug: "build-a-personal-tax-refund-calculator-instead-of-paying-a-c"
summary: "A user had Claude Code build an interactive tax calculator using 2025 tables to avoid a $300 CPA fee."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "medium.com"
source_date: "Undated"
source_url: "https://medium.com/@briandonelan/how-claude-code-built-my-tax-refund-calculator-and-saved-me-300-9f786f3baa8d"
fetched_from: "https://agentusecases.ai/use-case/build-a-personal-tax-refund-calculator-instead-of-paying-a-c"
---

# Build a personal tax refund calculator instead of paying a CPA

> A user had Claude Code build an interactive tax calculator using 2025 tables to avoid a $300 CPA fee.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Code  
**Source:** medium.com · Undated

## What they did

Brian described the need in plain English: a 2025 federal, Ohio and Columbus refund estimate for a married couple filing jointly with one child. Claude Code asked clarifying questions and for permission to search the web for current tax tables. It then scaffolded a Vite, React, TypeScript and Tailwind app with a calculator module for each jurisdiction.

## How it went

It produced a working single-page app in one sitting. It takes W-2, interest, dividend and capital gains inputs, updates refunds live, shows charts, and saves to local storage. The author did not report checking the numbers against a real return.

## Worth knowing

The author still plans to have the CPA prepare the actual return. He treats the tool as a planning estimate only, and he saved the $300 quoted for the estimate.

## Prompt

```text
Build me an interactive tax refund calculator using this year's official tax tables and brackets, where I can input my income, filing status, and deductions to estimate my refund or owed amount. Make it a simple web page or script I can run locally, and stop once I can enter numbers and get a correct estimate.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Draft a refund demand for an unauthorized renewal](./draft-a-refund-demand-for-an-unauthorized-renewal.md)
- [Run overnight memecoin checks and alerts](./run-overnight-memecoin-checks-and-alerts.md)
