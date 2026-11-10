---
title: "Search literature and write notes into Zotero"
slug: "search-literature-and-write-notes-into-zotero"
summary: "A researcher uses Claude to search Google Scholar, follow citations, query a Zotero library in natural language, and write summary notes into Zotero or Obsidian."
category: "Research & Knowledge"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "groundwater.usu.edu"
source_date: "Undated"
source_url: "https://groundwater.usu.edu/blog/2026/Academic-Usecase-with-Claude/"
fetched_from: "https://agentusecases.ai/use-case/search-literature-and-write-notes-into-zotero"
---

# Search literature and write notes into Zotero

> A researcher uses Claude to search Google Scholar, follow citations, query a Zotero library in natural language, and write summary notes into Zotero or Obsidian.

**Category:** Research & Knowledge  
**Agent:** Claude  
**Source:** groundwater.usu.edu · Undated

## What they did

Pin Shuai runs Claude Code with the Paper Search MCP to find top-cited papers and the papers citing them. A Zotero MCP, backed by Zotero's local API and a search database, lets Claude query his library in natural language. He asks for a summary of one paper's findings and knowledge gaps based on his own annotations. Claude asks a few clarifying questions, then writes the note into Zotero or Obsidian.

## How it went

The note appears in Zotero when he opens it, and library search saves time on hundreds of entries. He hasn't tested having Claude write a literature review from the retrieved papers.

## Worth knowing

Searching your own Zotero library keeps Claude from hallucinating papers that don't exist. The setup needs the Zotero local API enabled and a database build, with a slower full-text option.

## Prompt

```text
Search the literature on [research topic] and find the [number] most relevant papers, following key citations from them. Write a short summary note for each paper into [Zotero library or Obsidian vault path], including title, authors, year, main findings, and how it relates to [my project]. Finish with an index note linking them all, and ask before modifying any existing notes.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Turn any URL into a structured Notion note](./turn-any-url-into-a-structured-notion-note.md)
- [Send a daily AI news digest on a schedule](./send-a-daily-ai-news-digest-on-a-schedule.md)
