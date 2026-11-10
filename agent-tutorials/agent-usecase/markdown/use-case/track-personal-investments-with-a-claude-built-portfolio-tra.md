---
title: "Track personal investments with a Claude-built portfolio tracker"
slug: "track-personal-investments-with-a-claude-built-portfolio-tra"
summary: "The poster built a personal portfolio tracker with Claude that tracks SIPs and lump sums using money-weighted returns, and helps with research."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Mar 19, 2026"
source_url: "https://www.reddit.com/r/mutualfunds/comments/1rssbp5/i_developed_personal_portfolio_tracker_with_claude"
fetched_from: "https://agentusecases.ai/use-case/track-personal-investments-with-a-claude-built-portfolio-tra"
---

# Track personal investments with a Claude-built portfolio tracker

> The poster built a personal portfolio tracker with Claude that tracks SIPs and lump sums using money-weighted returns, and helps with research.

**Category:** Money, Bills & Benefits  
**Agent:** Claude  
**Source:** Reddit · Mar 19, 2026

## What they did

The poster first worked out their allocation logic in Excel, then used Claude on the web to turn it into a PWA/HTML portfolio tracker that runs on laptop and phone. The app has balanced and correction modes, allocates SIP and lump-sum money to underweight holdings versus target bands, and uses a ranked dividend bucket; the poster still enters portfolio data manually.

## How it went

They say the tracker now works for their long-term investing process and shared a live demo plus a video, but it was still using static manual entries with no broker sync. They had not integrated Kite or broker APIs, partly because Kite API would cost about ₹2,000.

## Worth knowing

It took about a week overall, with 2–3 days to turn the Excel-based logic into a PWA after the allocation structure was figured out.

## Prompt

```text
Help me build a simple personal investment portfolio tracker I can run myself. It should record my monthly SIP contributions and one-time lump-sum investments in [list of funds or stocks], then calculate my money-weighted return (XIRR) for each holding and for the whole portfolio. I'll paste in a sample of my transactions: [dates, amounts, current values]. You're done when I have working code or a spreadsheet formula set, plus instructions to update it, and a test using my sample data that shows the results.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Prepare and file overdue German VAT statements](./prepare-and-file-overdue-german-vat-statements.md)
- [Pull stock fundamentals from SEC filings for valuation](./pull-stock-fundamentals-from-sec-filings-for-valuation.md)
