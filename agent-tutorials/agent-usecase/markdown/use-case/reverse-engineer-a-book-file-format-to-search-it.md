---
title: "Reverse-engineer a book file format to search it"
slug: "reverse-engineer-a-book-file-format-to-search-it"
summary: "After the RAG indexer crashed on an uploaded book, Claude used Unix commands to work out the file format and grep the book manually."
category: "Research & Knowledge"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "HN"
source_date: "Aug 31, 2026"
source_url: "https://news.ycombinator.com/item?id=49512445"
fetched_from: "https://agentusecases.ai/use-case/reverse-engineer-a-book-file-format-to-search-it"
---

# Reverse-engineer a book file format to search it

> After the RAG indexer crashed on an uploaded book, Claude used Unix commands to work out the file format and grep the book manually.

**Category:** Research & Knowledge  
**Agent:** Claude  
**Source:** HN · Aug 31, 2026

## What they did

The commenter uploaded a book into the project context on Claude's web chat. The RAG indexer crashed on the file. Claude then used a series of Unix commands to work out the book's file format, and searched the contents with grep by hand. The source doesn't say whether the commenter prompted any of these steps.

## How it went

Claude got around the crashed indexer and could search the book anyway. The commenter found this surprising. The source gives no details on accuracy, the file format, or how long it took.

## Prompt

```text
I have a file at [path to file] that my tools can't read properly, and it is a [book/document, format if known]. Use command-line tools to inspect its structure, work out the format, and extract the readable text into a plain text file. Then search it for [topic or phrase] and show me the matching passages with their locations. Don't modify the original file.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Turn any URL into a structured Notion note](./turn-any-url-into-a-structured-notion-note.md)
- [Send a daily AI news digest on a schedule](./send-a-daily-ai-news-digest-on-a-schedule.md)
