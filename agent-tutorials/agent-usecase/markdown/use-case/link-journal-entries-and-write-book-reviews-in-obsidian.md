---
title: "Link journal entries and write book reviews in Obsidian"
slug: "link-journal-entries-and-write-book-reviews-in-obsidian"
summary: "The author uses Claude Code in their Obsidian vault to add backlinks and entity notes to journal entries and to turn brain dumps into formatted book reviews."
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "kyleygao.com"
source_date: "Undated"
source_url: "https://kyleygao.com/blog/2025/using-claude-code-with-obsidian/"
fetched_from: "https://agentusecases.ai/use-case/link-journal-entries-and-write-book-reviews-in-obsidian"
---

# Link journal entries and write book reviews in Obsidian

> The author uses Claude Code in their Obsidian vault to add backlinks and entity notes to journal entries and to turn brain dumps into formatted book reviews.

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** kyleygao.com · Undated

## What they did

Kyle Gao runs Claude Code inside his Obsidian vault, which is a folder of plain markdown files. For journals, he asks it to read the day's entry and add links to the people, places and books mentioned. It searches the vault for existing entity notes, creates any that are missing, and inserts wiki-links. For books, he writes a rough bullet brain dump, then asks Claude to turn it into a review with sections and formatted quotes.

## How it went

He says backlinking that would take him 10-15 minutes happens in seconds, and he now uses Obsidian more because the cleanup friction is gone. The source gives no other measurements.

## Worth knowing

Claude Code's code-oriented system prompt worried him, but it handled note-taking well. Because the vault is plain markdown files, Claude can search and edit it directly.

## Prompt

```text
Work in my Obsidian vault at [folder path]. For each journal entry in [folder or date range], add backlinks to related notes and create entity notes for people, places, and ideas that recur. Also, when I paste a brain dump about a book, turn it into a review using my template at [template path]. Show me a sample of your edits on three entries before doing the rest.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
