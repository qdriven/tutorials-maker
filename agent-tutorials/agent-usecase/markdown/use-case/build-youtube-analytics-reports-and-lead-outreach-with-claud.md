---
title: "Build YouTube analytics reports and lead outreach with Claude Code"
slug: "build-youtube-analytics-reports-and-lead-outreach-with-claud"
summary: "Claude Code pulled YouTube analytics via API into a verified Excel file, built a job-tracking app, and found and enriched sales leads with outreach."
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "mindstudio.ai"
source_date: "Undated"
source_url: "https://www.mindstudio.ai/blog/claude-code-non-coders-agentic-tasks"
fetched_from: "https://agentusecases.ai/use-case/build-youtube-analytics-reports-and-lead-outreach-with-claud"
---

# Build YouTube analytics reports and lead outreach with Claude Code

> Claude Code pulled YouTube analytics via API into a verified Excel file, built a job-tracking app, and found and enriched sales leads with outreach.

**Category:** Work & Operations  
**Agent:** Claude Code  
**Source:** mindstudio.ai · Undated

## What they did

Each task started from a plain-English goal set with a slash goal prompt, so Claude Code kept looping until done. For analytics, it read a markdown file describing the channel, pulled data through the YouTube API with a script, built a multi-tab Excel workbook, and screenshotted it to check formatting. It also built a local HTML job-tracking app and a 50-lead enrichment sheet with drafted outreach emails.

## How it went

The demo reports the quarterly analytics report took about 10 minutes, and the 50-lead enrichment and outreach about 20. Claude Code flagged missing impressions and CTR data in the analytics. The source gives no accuracy figures for the leads or emails.

## Worth knowing

Claude Code works from local files, so notes on your business, case studies and target customer profile improve the outreach. The source describes demos, not results from real campaigns.

## Prompt

```text
Pull [metrics, e.g. views, watch time, subscribers] for [my channel or account] over [date range] using the [API name] API and build an Excel report with a summary tab and charts. Double-check the totals against the source and tell me how you verified them. I'll provide API credentials in [file]; don't send any messages or emails to anyone.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Write end-of-sprint changelogs from completed tickets](./write-end-of-sprint-changelogs-from-completed-tickets.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
