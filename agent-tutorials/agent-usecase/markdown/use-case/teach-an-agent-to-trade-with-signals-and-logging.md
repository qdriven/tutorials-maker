---
title: "Teach an agent to trade with signals and logging"
slug: "teach-an-agent-to-trade-with-signals-and-logging"
summary: "@mufasadubai had Manus write a Python script using ProjectX APIs for realtime charts, set up Telegram signals and log trades to Google Sheets and CSV."
category: "Money, Bills & Benefits"
agents:
  - name: "Manus"
    slug: "manus"
source_platform: "X"
source_date: "Feb 24, 2026"
source_url: "https://x.com/mufasadubai/status/2026221794277904433"
fetched_from: "https://agentusecases.ai/use-case/teach-an-agent-to-trade-with-signals-and-logging"
---

# Teach an agent to trade with signals and logging

> @mufasadubai had Manus write a Python script using ProjectX APIs for realtime charts, set up Telegram signals and log trades to Google Sheets and CSV.

**Category:** Money, Bills & Benefits  
**Agent:** Manus  
**Source:** X · Feb 24, 2026

## What they did

Manus suggested running a Python script on the user's command terminal that pulled realtime charts via ProjectX APIs. The script sent trading signals through a Telegram bot the user set up with API keys. It also logged trade metadata to Google Sheets and a CSV file.

## How it went

The system is now running and will be tested the next day; the user plans to review logs later with Manus to refine the strategy.

## Worth knowing

Setup took a while due to creating the Telegram bot and integrating the keys.

## Prompt

```text
Write a Python script that connects to [broker or market data API] for realtime charts on [instrument or market], applies this signal rule: [describe rule]. Send each signal to my Telegram chat via [bot token placeholder] and log every signal to a Google Sheet and a CSV file. Run it in paper or simulation mode only, and you're done when a test signal shows up in Telegram and both logs. Never place real trades or move money without asking me first.
```

## Related use cases

- [Compile journalist lists and search apartment listings](./compile-journalist-lists-and-search-apartment-listings.md)
- [Generate slide decks from titles and a branded template](./generate-slide-decks-from-titles-and-a-branded-template.md)
- [Run varied business tasks through a general agent](./run-varied-business-tasks-through-a-general-agent.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Review IRS Tax Court case files and draft a settlement letter](./review-irs-tax-court-case-files-and-draft-a-settlement-lette.md)
- [Do taxes by selecting the right invoices](./do-taxes-by-selecting-the-right-invoices.md)
