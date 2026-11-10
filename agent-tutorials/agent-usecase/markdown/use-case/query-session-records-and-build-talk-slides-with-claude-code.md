---
title: "Query session records and build talk slides with Claude Code"
slug: "query-session-records-and-build-talk-slides-with-claude-code"
summary: "A CS instructor used Claude Code to query his recorded session database for commit stats and timelines and to build slides for a faculty talk."
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "geoffreychallen.com"
source_date: "Jan 15, 2026"
source_url: "https://www.geoffreychallen.com/talks/2026-01-15-a-day-with-claude-using-and-teaching-coding-agents"
fetched_from: "https://agentusecases.ai/use-case/query-session-records-and-build-talk-slides-with-claude-code"
---

# Query session records and build talk slides with Claude Code

> A CS instructor used Claude Code to query his recorded session database for commit stats and timelines and to build slides for a faculty talk.

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** geoffreychallen.com · Jan 15, 2026

## What they did

Geoffrey Challen had built Claude Recorder, a tool that logs his Claude Code sessions to a local SQLite database with timestamps, tool use and token counts. For his faculty retreat talk, he had Claude Code query that database for stats and commit timelines. It then designed the reveal.js slides, including an interactive timeline, as one standalone HTML file. It also transcribed his practice recordings with WhisperX and drafted the written summary.

## How it went

The stats covered one 17-hour day: 903 prompts, 63 commits, and about 16,000 lines added. Claude produced the slides and the write-up. The source doesn't describe any failures in the slide-building itself.

## Worth knowing

The session data comes from a custom recorder he built beforehand. The day's API usage would have cost about $1,000, but he's on the $200 per month Max plan.

## Prompt

```text
I have a database of recorded work sessions at [path to database]. Explore its structure, then answer these questions: [e.g. commit counts per week, a timeline of the project, the biggest changes]. Then build a slide deck for a [length]-minute talk to [audience] on [topic] using those findings. You're done when I have the numbers with a note on how you computed them, plus a slide file I can open. Don't modify the database.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
