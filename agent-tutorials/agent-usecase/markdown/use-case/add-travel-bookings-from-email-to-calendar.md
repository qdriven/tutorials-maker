---
title: "Add travel bookings from email to calendar"
slug: "add-travel-bookings-from-email-to-calendar"
summary: "The author runs Claude Code from a fixed folder with saved scripts to process new travel booking emails into their calendar."
category: "Life Admin & Home"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "HN"
source_date: "Oct 4, 2026"
source_url: "https://news.ycombinator.com/item?id=49949563"
fetched_from: "https://agentusecases.ai/use-case/add-travel-bookings-from-email-to-calendar"
---

# Add travel bookings from email to calendar

> The author runs Claude Code from a fixed folder with saved scripts to process new travel booking emails into their calendar.

**Category:** Life Admin & Home  
**Agent:** Claude Code  
**Source:** HN · Oct 4, 2026

## What they did

The author keeps a numbered Johnny.Decimal folder tree, with one folder holding saved scripts and documentation for adding travel bookings to their calendar. They jump to it with a small command, `jd tripsy`, launch `claude` there, and tell it a new email has arrived. Earlier conversations can be picked up with `/resume`.

## How it went

The source says the process works with that single prompt and calls it done, but it gives no numbers, error rates, or details of what the scripts do.

## Worth knowing

The trick is a static, well-named folder per task, where Claude Code finds its saved scripts and docs each time, rather than any special tooling.

## Prompt

```text
Open this folder: [path to your travel folder]. Search my email for new travel booking confirmations from [date range] (flights, hotels, rentals) and add each one to my calendar with the dates, times, confirmation number and address. Save the steps as a reusable script so I can rerun it later, and show me the list of events you plan to add before creating any of them.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a personal doorman agent on a $7 VPS](./run-a-personal-doorman-agent-on-a-7-vps.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Place library holds for books you need](./place-library-holds-for-books-you-need.md)
