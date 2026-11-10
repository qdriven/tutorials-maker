---
title: "Let AI agents file employment tax returns with the IRS"
slug: "let-ai-agents-file-employment-tax-returns-with-the-irs"
summary: "An MCP server in development lets agents submit tax returns (employment forms 941 and 940 first) to the IRS as a tool call; it is still in IRS certification and not yet live."
category: "Money, Bills & Benefits"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Apr 14, 2026"
source_url: "https://news.ycombinator.com/item?id=47769711"
fetched_from: "https://agentusecases.ai/use-case/let-ai-agents-file-employment-tax-returns-with-the-irs"
---

# Let AI agents file employment tax returns with the IRS

> An MCP server in development lets agents submit tax returns (employment forms 941 and 940 first) to the IRS as a tool call; it is still in IRS certification and not yet live.

**Category:** Money, Bills & Benefits  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Apr 14, 2026

## What they did

The builder is making an MCP server that exposes IRS return submission as a tool call, so an agent can file after AI prepares the return. It starts with employment forms 941 and 940, then corporate and individual returns. Right now the work is IRS ATS certification, which involves credentialing, schema validation and SOAP handshakes.

## How it went

Nothing is live yet. The server is still finalizing IRS certification, and an early access sandbox is planned to open only after it passes. No filings or results are reported.

## Worth knowing

Certification is a gauntlet and requires annual re-certification, so expect an ongoing maintenance burden; the source gives no cost or timeline.

## Prompt

```text
Help me build a small MCP server that exposes a tool called [tool name, e.g. submit_form_941] to prepare and validate employment tax return data for [business name] and [quarter]. It should check required fields, compute totals from the payroll file at [path], and output the final form data. Finish with a dry-run output and stop before sending anything to a real tax authority.
```

## Related use cases

- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Produce investment memos with Claude Cowork](./produce-investment-memos-with-claude-cowork.md)
- [Prepare federal and state tax returns from a folder](./prepare-federal-and-state-tax-returns-from-a-folder.md)
- [Research crypto assets and execute swaps and perps trades](./research-crypto-assets-and-execute-swaps-and-perps-trades.md)
- [Do taxes by selecting the right invoices](./do-taxes-by-selecting-the-right-invoices.md)
- [Cancel seven subscriptions and close the accounts](./cancel-seven-subscriptions-and-close-the-accounts.md)
