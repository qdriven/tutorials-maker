---
title: "Give a coding agent a paper corpus to find new techniques"
slug: "give-a-coding-agent-a-paper-corpus-to-find-new-techniques"
summary: "Poster gave a Claude Code agent access to about 2M papers to search before each attempt; it found techniques it otherwise wouldn't know and beat a baseline agent."
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Apr 9, 2026"
source_url: "https://www.reddit.com/r/artificial/comments/1s6afwm/i_tested_what_happens_when_you_give_an_ai_coding"
fetched_from: "https://agentusecases.ai/use-case/give-a-coding-agent-a-paper-corpus-to-find-new-techniques"
---

# Give a coding agent a paper corpus to find new techniques

> Poster gave a Claude Code agent access to about 2M papers to search before each attempt; it found techniques it otherwise wouldn't know and beat a baseline agent.

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** Reddit · Apr 9, 2026

## What they did

The poster ran two identical Claude Code agents on the same job: optimize a small language model. One used only its built-in knowledge; the other was connected to Paper Lantern, an MCP search tool over 2M+ open-source computer science papers, and searched the literature before each attempt, scanning 520 papers, surfacing 25 ideas, and applying them with human-readable guidance.

## How it went

The paper-enabled agent improved the model by 4.05% versus 3.67% for the baseline, and the poster says about 15 of the 25 suggested paper-based ideas worked. They also say the better config stayed 12+ minutes ahead on a 2-hour run, though commenters questioned how strong and general the result was.

## Worth knowing

The main catch is overhead: the system reads full papers and adds research cost, and the poster says it is meant for areas with active research communities.

## Prompt

```text
Before each attempt at improving [my project/benchmark], search the paper collection at [path or search tool] for techniques relevant to [problem], and note which paper inspired any idea you try. Then implement and test the idea against the current baseline score of [score]. Keep a log of ideas tried, source papers, and results, and stop after [number] experiments with a summary of what helped.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
