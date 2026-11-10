---
title: "Build a personal research wiki from papers and articles"
slug: "build-a-personal-research-wiki-from-papers-and-articles"
summary: "Cursor Agent writes and maintains interlinked markdown pages from user-supplied sources, summarizing and cross-referencing, with Obsidian used to browse."
category: "Research & Knowledge"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "github.com"
source_date: "Undated"
source_url: "https://github.com/rbarok/obsidian-cursor-knowledge-graph/blob/main/cursor-obsidian.md"
fetched_from: "https://agentusecases.ai/use-case/build-a-personal-research-wiki-from-papers-and-articles"
---

# Build a personal research wiki from papers and articles

> Cursor Agent writes and maintains interlinked markdown pages from user-supplied sources, summarizing and cross-referencing, with Obsidian used to browse.

**Category:** Research & Knowledge  
**Agent:** Cursor  
**Source:** github.com · Undated

## What they did

The vault folder is opened in both Cursor and Obsidian. Sources go into an immutable raw/ folder, and an AGENTS.md file sets the wiki's conventions. The user tells the agent to ingest one source. It writes a summary, updates the index and related pages, and appends to a log. The user reads the summaries and steers. Later, lint passes check for contradictions and orphan pages.

## How it went

The source is a pattern description, not a report with results. It says one source can touch 10–15 pages and that the index approach works at roughly 100 sources without search infrastructure.

## Worth knowing

Ingest sources one at a time and review the summaries. The author does this, though batch ingest with less supervision is possible. Add a search tool such as qmd once the index stops being enough.

## Prompt

```text
Read the sources in [folder of papers and articles] on [topic] and build a wiki of interlinked markdown pages in [wiki folder]: one page per [concept / paper / person], each with a summary and links to related pages. Add an index page. Finish when every source is covered and links resolve, and ask me before overwriting any existing file.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Grade Cursor on a real data science project](./grade-cursor-on-a-real-data-science-project.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Generate deep research reports into Notion](./generate-deep-research-reports-into-notion.md)
- [Send a daily AI news digest on a schedule](./send-a-daily-ai-news-digest-on-a-schedule.md)
