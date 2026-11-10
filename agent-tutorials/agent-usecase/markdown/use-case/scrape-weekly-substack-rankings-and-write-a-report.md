---
title: "Scrape weekly Substack rankings and write a report"
slug: "scrape-weekly-substack-rankings-and-write-a-report"
summary: "Claude in Chrome runs weekly to scrape Substack ranking data into a dataset, and Cowork analyzes it and writes a weekly report."
category: "Research & Knowledge"
agents:
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
  - name: "Claude Cowork"
    slug: "claude-cowork"
source_platform: "artificialcorner.com"
source_date: "Undated"
source_url: "https://artificialcorner.com/p/claude-automates"
fetched_from: "https://agentusecases.ai/use-case/scrape-weekly-substack-rankings-and-write-a-report"
---

# Scrape weekly Substack rankings and write a report

> Claude in Chrome runs weekly to scrape Substack ranking data into a dataset, and Cowork analyzes it and writes a weekly report.

**Category:** Research & Knowledge  
**Agent:** Claude in Chrome, Claude Cowork  
**Source:** artificialcorner.com · Undated

## What they did

Frank Andrade prompts Claude in Chrome to scrape the first 250 rows of Reletter's Substack charts (rank, newsletter, date, free/paid) into a CSV, then converts that prompt into a task that runs every Tuesday. A Cowork task at 5:10 PM reads the saved folder and builds a spreadsheet of the biggest rank gains, losses and new entrants, for paid and free separately.

## How it went

Each week the scrape takes a couple of minutes, and Cowork drops the analysis spreadsheet into his folder. The source gives no accuracy checks or other figures.

## Worth knowing

Scheduled tasks only run while the computer is awake and the Claude desktop app is open, and each run draws on your daily usage allowance.

## Prompt

```text
Go to [ranking page URL, such as a Substack leaderboard for my category] and scrape the top [50] entries with rank, name, and any visible stats into a spreadsheet, adding a column for today's date. Append to the existing file at [file location] if it exists. Stop when the data is saved and tell me how many rows were added, so I can run the same job weekly.
```

## Related use cases

- [Build a balloon-camel simulator for an LED Burning Man totem](./build-a-balloon-camel-simulator-for-an-led-burning-man-totem.md)
- [Create and schedule social content through Blotato](./create-and-schedule-social-content-through-blotato.md)
- [Do sales research and compare app to mock-ups](./do-sales-research-and-compare-app-to-mock-ups.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Save and search links via a Telegram second brain](./save-and-search-links-via-a-telegram-second-brain.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
