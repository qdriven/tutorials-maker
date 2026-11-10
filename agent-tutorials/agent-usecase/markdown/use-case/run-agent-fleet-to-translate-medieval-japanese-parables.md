---
title: "Run agent fleet to translate medieval Japanese parables"
slug: "run-agent-fleet-to-translate-medieval-japanese-parables"
summary: "A user runs about 10 agents that dig up medieval Japanese Buddhist parables, translate them, and feed them into a custom language-study interface; also uses agents for coding."
category: "Research & Knowledge"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Nov 5, 2026"
source_url: "https://news.ycombinator.com/item?id=50375427"
fetched_from: "https://agentusecases.ai/use-case/run-agent-fleet-to-translate-medieval-japanese-parables"
---

# Run agent fleet to translate medieval Japanese parables

> A user runs about 10 agents that dig up medieval Japanese Buddhist parables, translate them, and feed them into a custom language-study interface; also uses agents for coding.

**Category:** Research & Knowledge  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Nov 5, 2026

## What they did

The user runs Deepseek through a Deepseek harness with about 30 plugins and heavy customization, juggling 3-4 projects at once. For the parables project, a fleet of 10 agents finds medieval Japanese Buddhist parables, translates them from scratch, and feeds them into a custom language-study interface. For new projects, they give a moderately detailed scope, then steer a rough prototype toward polish.

## How it went

The source reports a working setup costing maybe $20/week, with a 99% cache hit rate on many long jobs. It gives no results for the translations themselves and no quality assessment.

## Worth knowing

Costs stay low on long-running jobs because of the high cache hit rate; the user also tried JetBrains IDE integrations for months and disliked them.

## Prompt

```text
Find [number, e.g. 10] medieval Japanese Buddhist parables from [source or collection, e.g. Konjaku Monogatarishū] that are available online in the original language. For each one, save the original text, a [target language] translation, and a short vocabulary list into a file in a folder called [folder name]. Stop when all [number] parables are saved and give me a short index of titles with source links.
```

## Related use cases

- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research a person and write a bio](./research-a-person-and-write-a-bio.md)
- [Measure how long jobs stay open at tech companies](./measure-how-long-jobs-stay-open-at-tech-companies.md)
- [Scrape AI news three times a day with a custom bot](./scrape-ai-news-three-times-a-day-with-a-custom-bot.md)
