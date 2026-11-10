---
title: "Generate ad-copy variants and scrape competitor ads"
slug: "generate-ad-copy-variants-and-scrape-competitor-ads"
summary: "A commenter uses the Claude API via Apps Script for ad-copy variants, Apify to scrape competitor ads, and Cursor to build GA4 dashboards."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude"
    slug: "claude"
  - name: "Cursor"
    slug: "cursor"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/digital_marketing/comments/1sywh5r/what_ai_tools_are_actually_helping_you_execute"
fetched_from: "https://agentusecases.ai/use-case/generate-ad-copy-variants-and-scrape-competitor-ads"
---

# Generate ad-copy variants and scrape competitor ads

> A commenter uses the Claude API via Apps Script for ad-copy variants, Apify to scrape competitor ads, and Cursor to build GA4 dashboards.

**Category:** Sales, Marketing & Support  
**Agent:** Claude, Cursor  
**Source:** Reddit · Undated

## What they did

The commenter said they used the Claude API through Google Apps Script to generate ad-copy variants, with a workflow that produced 10 variants in about 30 seconds instead of a 30-minute brainstorm. They also used Apify’s Meta Ad Library scraper to pull competitor ads and Cursor to write custom GA4 dashboards, first for themself and later for clients.

## How it went

They said these three tools were the ones that actually saved time in paid media work. Their main result was faster execution, while most other AI tools either duplicated what Sheets already did or added another step.

## Worth knowing

Their rule of thumb was to keep tools narrow and inside the existing stack rather than using all-in-one platforms.

## Prompt

```text
In this project, write a Google Apps Script that sends my ad brief from a Google Sheet to the Claude API and writes [number] ad-copy variants per row back into the sheet, within [character limits] for [platform]. Then help me build a simple dashboard that pulls [metrics] from GA4. Done when I can run the script on a sample row and see the variants and a working dashboard preview.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Analyze budgets and research investments from bank data](./analyze-budgets-and-research-investments-from-bank-data.md)
- [Point a computer-using bot at any repo](./point-a-computer-using-bot-at-any-repo.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Schedule social posts through an AI agent](./schedule-social-posts-through-an-ai-agent.md)
- [Find roofing leads and run AI voice outreach](./find-roofing-leads-and-run-ai-voice-outreach.md)
