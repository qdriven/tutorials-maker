---
title: "Search years of research files in an Obsidian vault"
slug: "search-years-of-research-files-in-an-obsidian-vault"
summary: "Claude Code, guided by a CLAUDE.md, searches research papers, scans and PDFs via Spotlight, extracts text, and files daily notes in dated folders."
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "mauriciogomes.com"
source_date: "Undated"
source_url: "https://mauriciogomes.com/teaching-claude-code-my-obsidian-vault/"
fetched_from: "https://agentusecases.ai/use-case/search-years-of-research-files-in-an-obsidian-vault"
---

# Search years of research files in an Obsidian vault

> Claude Code, guided by a CLAUDE.md, searches research papers, scans and PDFs via Spotlight, extracts text, and files daily notes in dated folders.

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** mauriciogomes.com · Undated

## What they did

Mauricio Gomes runs Claude Code from his Obsidian vault, where a CLAUDE.md is loaded each session. It describes how the vault is organized and points to a folder of interest files. Claude searches notes and PDFs with macOS Spotlight (mdfind), extracts document text with textutil, and files daily notes into dated folders, creating them if needed. Research results go into a research folder.

## How it went

It finds old scanned PDFs and papers, files notes correctly, and focuses research on his stated interests. The source gives no accuracy figures or failure cases; the screenshots are the evidence.

## Worth knowing

He estimates about an hour of setup. It relies on macOS Spotlight indexing, so the search approach is Mac-specific.

## Prompt

```text
Search my research folder at [folder path], including PDFs and scanned documents, for everything related to [topic]. Extract the relevant passages with file names and page numbers, and write a summary note in a dated folder. Stop when the note lists sources for every claim, and do not move or edit my original files.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
