---
title: "Scrape a conference site into a searchable dashboard"
slug: "scrape-a-conference-site-into-a-searchable-dashboard"
summary: "In a workshop demo, a Manus agent scraped about 70 talks, extracted schedules, converted times to UTC, and built a dashboard with recommendations and calendar integration."
category: "Research & Knowledge"
agents:
  - name: "Manus"
    slug: "manus"
source_platform: "growwstacks.com"
source_date: "Undated"
source_url: "https://growwstacks.com/blog/how-to-build-intelligent-research-agents-with-manus-ai"
fetched_from: "https://agentusecases.ai/use-case/scrape-a-conference-site-into-a-searchable-dashboard"
---

# Scrape a conference site into a searchable dashboard

> In a workshop demo, a Manus agent scraped about 70 talks, extracted schedules, converted times to UTC, and built a dashboard with recommendations and calendar integration.

**Category:** Research & Knowledge  
**Agent:** Manus  
**Source:** growwstacks.com · Undated

## What they did

In a workshop demo, a Manus agent scraped a whole conference website of about 70 talks. It pulled out dates, times and descriptions, and converted every time to UTC. It then built a searchable dashboard with a Similar Events recommendation feature and one-click calendar integration. The write-up doesn't give the prompt or say where a person stepped in.

## How it went

The demo produced a working dashboard covering the 70-plus talks. The source gives no accuracy checks, timings or cost figures for this example.

## Worth knowing

The write-up is a summary of a workshop video and gives no prompt or build time, so watch the recording for the exact steps.

## Prompt

```text
Go to [conference website URL] and scrape every talk: title, speaker, time, room, and description. Convert all times to [my time zone], then build a searchable dashboard where I can filter by topic and speaker, plus a list of recommended talks based on my interests in [topics]. You're done when the dashboard works and I can export my picks to a calendar file; show me the picks before adding anything to my calendar.
```

## Related use cases

- [Compile journalist lists and search apartment listings](./compile-journalist-lists-and-search-apartment-listings.md)
- [Generate slide decks from titles and a branded template](./generate-slide-decks-from-titles-and-a-branded-template.md)
- [Run varied business tasks through a general agent](./run-varied-business-tasks-through-a-general-agent.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Turn any URL into a structured Notion note](./turn-any-url-into-a-structured-notion-note.md)
- [Measure how long jobs stay open at tech companies](./measure-how-long-jobs-stay-open-at-tech-companies.md)
