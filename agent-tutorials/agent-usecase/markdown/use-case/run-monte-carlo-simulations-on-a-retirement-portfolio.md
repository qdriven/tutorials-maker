---
title: "Run Monte Carlo simulations on a retirement portfolio"
slug: "run-monte-carlo-simulations-on-a-retirement-portfolio"
summary: "Poster used Claude to rebuild their retirement portfolio and test sequence-of-returns risk by inserting past bear markets into growth paths."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Sep 9, 2026"
source_url: "https://www.reddit.com/r/investing/comments/1w30d74/claude_montecarlo_simulations"
fetched_from: "https://agentusecases.ai/use-case/run-monte-carlo-simulations-on-a-retirement-portfolio"
---

# Run Monte Carlo simulations on a retirement portfolio

> Poster used Claude to rebuild their retirement portfolio and test sequence-of-returns risk by inserting past bear markets into growth paths.

**Category:** Money, Bills & Benefits  
**Agent:** Claude  
**Source:** Reddit · Sep 9, 2026

## What they did

The poster says they rebuilt their retirement portfolio in Claude and had it model a 60:40 allocation over 15 to 20 years, using a 6% baseline path while randomly inserting two or three historical bear markets, then layering in one-time home-improvement costs. In comments, they add that they first mapped a month-by-month budget to stabilize recurring expenses and drawdowns, and that Claude split fixed-income and stock components; the human role was framing the assumptions and considering whether to validate it with a Fidelity advisor.

## How it went

The poster says the exercise supported their thesis that projected expenses and income would likely cover 20-plus years. The thread’s main limitation was trust: multiple commenters warned not to rely on Claude’s raw outputs without validating the model or having it produce code or spreadsheet formulas first.

## Worth knowing

One commenter pointed to dedicated retirement-planning tools at about $120 per year, but the poster’s own setup included no stated cost or runtime.

## Prompt

```text
Build a Monte Carlo simulation of my retirement portfolio: [asset allocation], starting balance [amount], annual withdrawals [amount], over [number] years. Include a sequence-of-returns test that inserts historical bear markets like [2000-2002, 2008] early in the retirement path, and report the success rate and the worst-case balances. Finish with a chart and a plain-English summary of the main risks, saved as files in this folder.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Prepare and file overdue German VAT statements](./prepare-and-file-overdue-german-vat-statements.md)
- [Pull stock fundamentals from SEC filings for valuation](./pull-stock-fundamentals-from-sec-filings-for-valuation.md)
