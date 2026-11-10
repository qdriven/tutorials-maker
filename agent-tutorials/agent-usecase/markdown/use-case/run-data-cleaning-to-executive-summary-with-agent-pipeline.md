---
title: "Run data cleaning to executive summary with agent pipeline"
slug: "run-data-cleaning-to-executive-summary-with-agent-pipeline"
summary: "Built five Claude Code agents (cleaner, analyzer, visualizer, report writer, summarizer) chained by an orchestrator for end-to-end data analysis. · Oct 11, 2026"
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "bronsonelliott.substack.com"
source_date: "Oct 11, 2026 · Submitted by Bronson Elliott"
source_url: "https://bronsonelliott.substack.com/p/i-built-a-complete-data-analysis"
fetched_from: "https://agentusecases.ai/use-case/run-data-cleaning-to-executive-summary-with-agent-pipeline"
---

# Run data cleaning to executive summary with agent pipeline

> Built five Claude Code agents (cleaner, analyzer, visualizer, report writer, summarizer) chained by an orchestrator for end-to-end data analysis. · Oct 11, 2026

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** bronsonelliott.substack.com · Oct 11, 2026 · Submitted by Bronson Elliott

## What they did

Bronson, a data analyst, used an AI app-idea agent to produce a 713-line specification. He then pointed Claude Code at it. Over about five hours Claude Code built five agents plus a @full-analysis orchestrator that passes files between them. It wrote its own tests and fixed its own errors. He only approved permissions, about 20 times.

## How it went

The build produced 627 passing tests and cost about $35 in estimated API usage. It has not yet been run on real work data, and outputs still need analyst review.

## Worth knowing

The spec was the hard part. Pro plan is enough, though usage limits slow you down; he moved to Max for convenience.

## Prompt

```text
Set up a chain of subagents in this project for analyzing [dataset file]: a cleaner, an analyzer, a visualizer, a report writer, and a summarizer, run in order by an orchestrator. Have them clean the data, find the main patterns, make [number] charts, write a full report, and finish with a one-page executive summary. Save each stage's output in its own folder and keep the original data unchanged.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
