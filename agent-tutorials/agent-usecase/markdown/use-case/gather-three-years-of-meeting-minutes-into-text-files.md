---
title: "Gather three years of meeting minutes into text files"
slug: "gather-three-years-of-meeting-minutes-into-text-files"
summary: "Jeff Adams used the Claude Chrome extension to collect meeting minutes into text files and load them into a notebook, taking 3-4 hours over three sessions."
category: "Research & Knowledge"
agents:
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
  - name: "Claude Cowork"
    slug: "claude-cowork"
source_platform: "lists.w3.org"
source_date: "Feb 1, 2026"
source_url: "https://lists.w3.org/Archives/Public/public-maturity/2026Feb/0004.html"
fetched_from: "https://agentusecases.ai/use-case/gather-three-years-of-meeting-minutes-into-text-files"
---

# Gather three years of meeting minutes into text files

> Jeff Adams used the Claude Chrome extension to collect meeting minutes into text files and load them into a notebook, taking 3-4 hours over three sessions.

**Category:** Research & Knowledge  
**Agent:** Claude in Chrome, Claude Cowork  
**Source:** lists.w3.org · Feb 1, 2026

## What they did

With the W3C minutes archive page open, Jeff had Claude in Chrome (Haiku model) visit each 2022–2024 meeting page. It extracted the exact text as markdown in a code block. He tested one meeting first. When a full year was too much, they switched to one month at a time. He pasted each month into a yearly text file and spot-checked the results.

## How it went

Three years of minutes ended up in three text files, one per year, and were loaded into NotebookLM. Spot checks found no errors. It took 3–4 hours over three sessions, with one usage limit hit.

## Worth knowing

The agent stalled after 3–4 months of a year, so ask for one month at a time. A usage limit also forced a four-hour wait.

## Prompt

```text
Go to [website where our meeting minutes are posted] and collect the minutes for [meeting body] from [start year] to [end year]. Save each one as a separate text file named with its date in [folder], and give me a list of any meetings you couldn't find or read. Work in batches of [20] and tell me when each batch is done so I can check it.
```

## Related use cases

- [Build a balloon-camel simulator for an LED Burning Man totem](./build-a-balloon-camel-simulator-for-an-led-burning-man-totem.md)
- [Create and schedule social content through Blotato](./create-and-schedule-social-content-through-blotato.md)
- [Do sales research and compare app to mock-ups](./do-sales-research-and-compare-app-to-mock-ups.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Save and search links via a Telegram second brain](./save-and-search-links-via-a-telegram-second-brain.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
