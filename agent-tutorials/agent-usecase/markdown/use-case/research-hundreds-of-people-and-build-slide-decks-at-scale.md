---
title: "Research hundreds of people and build slide decks at scale"
slug: "research-hundreds-of-people-and-build-slide-decks-at-scale"
summary: "Guide describes using Manus for large research jobs like profiling the top 250 AI researchers, turning event exports into slide decks, and deploying websites."
category: "Research & Knowledge"
agents:
  - name: "Manus"
    slug: "manus"
source_platform: "Reddit"
source_date: "Feb 16, 2026"
source_url: "https://www.reddit.com/r/promptingmagic/comments/1qruaq7/the_complete_guide_to_metas_ai_agent_manus_the"
fetched_from: "https://agentusecases.ai/use-case/research-hundreds-of-people-and-build-slide-decks-at-scale"
---

# Research hundreds of people and build slide decks at scale

> Guide describes using Manus for large research jobs like profiling the top 250 AI researchers, turning event exports into slide decks, and deploying websites.

**Category:** Research & Knowledge  
**Agent:** Manus  
**Source:** Reddit · Feb 16, 2026

## What they did

The post says Manus handles big research jobs by splitting them into many parallel sub-tasks, like spinning up 250 sub-agents to profile one AI researcher each and finishing in 10–15 minutes. It also describes feeding in structured inputs such as a Luma event export or a Google Sheet, then having Manus scrape sites, call connected tools like SimilarWeb, and assemble outputs such as slide decks or a deployed searchable website; the person provides the prompt, files, templates, APIs, and any brand rules.

## How it went

The reported outputs are production-ready assets at scale: a 250-profile research pass in 10–15 minutes, event-export slide decks with charts, and public websites built from a sheet of 100 papers. The post presents these as examples and prompt patterns, but gives little detail on verification or failures.

## Worth knowing

The main catch is setup: results depend on supplying connectors, attached templates/files, and clear project or knowledge rules so Manus follows brand and formatting requirements.

## Prompt

```text
Research [list or group, e.g. the top 100 people in a field] and build a spreadsheet with [columns, e.g. name, employer, notable work, source link] for each. Use public sources only and cite a link for every row. When the sheet is complete, turn the key findings into a [number]-slide deck, and flag any rows where you were unsure of the facts.
```

## Related use cases

- [Compile journalist lists and search apartment listings](./compile-journalist-lists-and-search-apartment-listings.md)
- [Generate slide decks from titles and a branded template](./generate-slide-decks-from-titles-and-a-branded-template.md)
- [Produce competitor research reports and build a landing page](./produce-competitor-research-reports-and-build-a-landing-page.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Turn any URL into a structured Notion note](./turn-any-url-into-a-structured-notion-note.md)
- [Measure how long jobs stay open at tech companies](./measure-how-long-jobs-stay-open-at-tech-companies.md)
