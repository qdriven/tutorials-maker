---
title: "Pull stock fundamentals from SEC filings for valuation"
slug: "pull-stock-fundamentals-from-sec-filings-for-valuation"
summary: "A developer used ChatGPT Agent mode to extract revenue growth, free cash flow and net cash from 10-Q filings with source URLs, feeding a multi-agent valuation and sentiment workflow."
category: "Money, Bills & Benefits"
agents:
  - name: "ChatGPT Agent"
    slug: "chatgpt-agent"
source_platform: "github.com"
source_date: "Undated"
source_url: "https://github.com/phanhpp/Multi-Agent-Stock-Analysis-System"
fetched_from: "https://agentusecases.ai/use-case/pull-stock-fundamentals-from-sec-filings-for-valuation"
---

# Pull stock fundamentals from SEC filings for valuation

> A developer used ChatGPT Agent mode to extract revenue growth, free cash flow and net cash from 10-Q filings with source URLs, feeding a multi-agent valuation and sentiment workflow.

**Category:** Money, Bills & Benefits  
**Agent:** ChatGPT Agent  
**Source:** github.com · Undated

## What they did

The developer prompted ChatGPT Agent mode, chosen for its web search, to produce fundamentals for four tickers (AAPL, MSFT, NVDA, TSLA) from SEC 10-Q filings. For each metric the agent returned a value, trend direction, 1-5 score, explanation, filing URL and the exact derivation. Claude helped write the prompts. A Fundamental agent in a LangGraph workflow then used the output.

## How it went

The agent output fed a working pipeline that combined valuation, sentiment and fundamental votes and backtested the picks over 63 trading days. The README states no accuracy figures for the extracted numbers.

## Worth knowing

Use only filings public before your decision date; the author limited decision dates to August 2024 to avoid leakage. The whole prototype took roughly 8-10 hours.</parameter>

## Prompt

```text
For [ticker symbols], open the latest 10-Q on SEC EDGAR and extract revenue growth year over year, free cash flow, and net cash or debt. Put the results in a table with a source URL for every number, and flag any figure you couldn't confirm. Stop when every ticker has all three metrics or an explicit note on why it's missing.
```

## Related use cases

- [Plan a family trip and pre-fill bookings](./plan-a-family-trip-and-pre-fill-bookings.md)
- [Collate WHO data into a multi-tab spreadsheet](./collate-who-data-into-a-multi-tab-spreadsheet.md)
- [Book appointments and send emails and messages](./book-appointments-and-send-emails-and-messages.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Prepare federal and state tax returns from a folder](./prepare-federal-and-state-tax-returns-from-a-folder.md)
- [Cancel and refund subscriptions by searching email and calling](./cancel-and-refund-subscriptions-by-searching-email-and-calli.md)
