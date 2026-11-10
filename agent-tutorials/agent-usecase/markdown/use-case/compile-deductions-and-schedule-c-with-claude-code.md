---
title: "Compile deductions and Schedule C with Claude Code"
slug: "compile-deductions-and-schedule-c-with-claude-code"
summary: "Claude Code gathered charitable contributions and itemized deductions from sheets, email and statements and built a Schedule C; some categorizing stayed manual."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "claudeblattman.com"
source_date: "Undated"
source_url: "https://claudeblattman.com/tax-workflow/"
fetched_from: "https://agentusecases.ai/use-case/compile-deductions-and-schedule-c-with-claude-code"
---

# Compile deductions and Schedule C with Claude Code

> Claude Code gathered charitable contributions and itemized deductions from sheets, email and statements and built a Schedule C; some categorizing stayed manual.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Code  
**Source:** claudeblattman.com · Undated

## What they did

Chris Blattman built Claude Code skills: one searches Gmail for tax documents, downloads attachments, pulls out key figures and tracks what's missing. Another compiles deductions from a charitable-giving Google Sheet, email receipts and card statements into spreadsheets ready for tax software. It also built a Schedule C for his consulting income. He eyeballed card statements to flag medical and childcare charges, and entered the figures into tax software himself.

## How it went

He says the work took about three hours, versus roughly $1,000 for an accountant. Sorting, filtering and CSV parsing went well, but medical and childcare categorizing stayed manual.

## Worth knowing

Read the privacy page first: local file contents are sent to Anthropic's API when Claude reads them, so never paste SSNs or bank account numbers.

## Prompt

```text
Look through [spreadsheets, email export folder, and statements folder] for [year] and compile my charitable contributions and other itemized deductions into one spreadsheet with date, payee, amount, and source file. Then draft a Schedule C from my business income and expenses, marking any lines you couldn't categorize with confidence. Finish when I have both files and a list of open questions for me to resolve.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Draft a refund demand for an unauthorized renewal](./draft-a-refund-demand-for-an-unauthorized-renewal.md)
- [Run overnight memecoin checks and alerts](./run-overnight-memecoin-checks-and-alerts.md)
