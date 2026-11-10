---
title: "Use Cursor for academic paper writing with citations"
slug: "use-cursor-for-academic-paper-writing-with-citations"
summary: "Forum users write papers in markdown with Zotero citations and a bibtex file for Cursor to pick references from, converting to Word with pandoc."
category: "Research & Knowledge"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "forum.cursor.com"
source_date: "Undated"
source_url: "https://forum.cursor.com/t/anyone-use-cursor-for-academic-research-writing/57393"
fetched_from: "https://agentusecases.ai/use-case/use-cursor-for-academic-paper-writing-with-citations"
---

# Use Cursor for academic paper writing with citations

> Forum users write papers in markdown with Zotero citations and a bibtex file for Cursor to pick references from, converting to Word with pandoc.

**Category:** Research & Knowledge  
**Agent:** Cursor  
**Source:** forum.cursor.com · Undated

## What they did

One user writes papers in markdown, inserts citations with the Zotero citation picker and Better BibTeX, and keeps a large bibtex file with abstracts so Cursor can suggest references. Pandoc converts the markdown to Word, and a Lua script turns the citations into native Zotero ones. The AI is used to rewrite, trim and add sentences.

## How it went

The user paraphrases nearly every sentence because the AI isn't good enough for most academic writing. The workflow is only slightly faster, but the final quality is higher because revising is less painful. Cursor can't read PDFs.

## Worth knowing

Cursor has no native PDF support. Workarounds are converting PDFs to markdown with Marker or Datalab, or having ChatGPT summarize key papers into .md files.

## Prompt

```text
I am writing a paper on [topic] in markdown at [file path]. Use my bibtex file [path] to pick and insert citations in [citation style] where my claims need support, and flag any claim that has no matching reference. Then check that the document converts to Word with pandoc. Finish when the paper builds cleanly, and do not invent references that are not in my bibtex file.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Grade Cursor on a real data science project](./grade-cursor-on-a-real-data-science-project.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Generate deep research reports into Notion](./generate-deep-research-reports-into-notion.md)
- [Send a daily AI news digest on a schedule](./send-a-daily-ai-news-digest-on-a-schedule.md)
