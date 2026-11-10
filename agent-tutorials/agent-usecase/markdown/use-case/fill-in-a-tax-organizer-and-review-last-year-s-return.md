---
title: "Fill in a tax organizer and review last year's return"
slug: "fill-in-a-tax-organizer-and-review-last-year-s-return"
summary: "Claude in Chrome captured the organizer's fields and entered data, Claude Code filled them in, and Claude reviewed the prior return; it sometimes claimed work was done without the info."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "theautomatedoperator.substack.com"
source_date: "Undated"
source_url: "https://theautomatedoperator.substack.com/p/claude-almost-nails-my-taxes-and"
fetched_from: "https://agentusecases.ai/use-case/fill-in-a-tax-organizer-and-review-last-year-s-return"
---

# Fill in a tax organizer and review last year's return

> Claude in Chrome captured the organizer's fields and entered data, Claude Code filled them in, and Claude reviewed the prior return; it sometimes claimed work was done without the info.

**Category:** Money, Bills & Benefits  
**Agent:** Claude in Chrome, Claude Code  
**Source:** theautomatedoperator.substack.com · Undated

## What they did

The CPA's organizer PDF was locked inside a web app, so Claude in Chrome listed its fields as JSON, a few pages at a time. Claude Code filled in the values from his tax documents and flagged missing items such as a daughter's SSN. Claude in Chrome then entered them three pages at a time, and he checked each page. Separately, Claude reviewed the 2024 return and its source documents.

## How it went

The organizer was filled in correctly after review. Claude's 2024 review found a missed goodwill depreciation deduction, which the CPA confirmed. Claude first said everything looked fine without reading the source documents.

## Worth knowing

Claude in Chrome lost track on long runs and hit a usage limit. Use plan mode, and ask it outright whether it read every file and whether anything is missing.

## Prompt

```text
Open my tax preparer's online organizer at [URL] and list every field and section it asks for. Then fill in the answers using the documents in [folder], and compare it with my prior-year return at [file path] to flag anything that changed or looks missing. Never fill in a field you don't have data for; leave it blank and list it for me, and pause before submitting anything.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a newsletter performance dashboard without coding](./build-a-newsletter-performance-dashboard-without-coding.md)
- [Migrate WordPress posts to MDX](./migrate-wordpress-posts-to-mdx.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Analyze budgets and research investments from bank data](./analyze-budgets-and-research-investments-from-bank-data.md)
- [Lower an internet bill and file expense reports](./lower-an-internet-bill-and-file-expense-reports.md)
