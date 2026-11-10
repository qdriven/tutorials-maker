---
title: "Run literature reviews over a folder of papers"
slug: "run-literature-reviews-over-a-folder-of-papers"
summary: "Researchers point Claude Code at 50+ papers to extract bibliographies, find core cited works, and write relevance lists against a theme as files."
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "note.com"
source_date: "Undated"
source_url: "https://note.com/claudecode_lab/n/n8bc3cb76575d?hl=en"
fetched_from: "https://agentusecases.ai/use-case/run-literature-reviews-over-a-folder-of-papers"
---

# Run literature reviews over a folder of papers

> Researchers point Claude Code at 50+ papers to extract bibliographies, find core cited works, and write relevance lists against a theme as files.

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** note.com · Undated

## What they did

The author sets up custom slash commands in Claude Code, and the research theme goes in CLAUDE.md. /lit-map extracts text from every PDF in a papers/ folder. It pulls each paper's objective, method, conclusion and keywords, then writes a High/Medium/Low relevance list to literature_map.md. /citation-network extracts the bibliographies, finds works cited across several papers, and ranks them.

## How it went

The author claims /lit-map cuts 50 papers from 2-3 days to 30 minutes, and /citation-network cuts 10 papers from 4-5 hours to 15 minutes. These are before/after claims, not measured results.

## Worth knowing

Scanned or image-only PDFs lower accuracy. The researcher still has to check the AI's scores and summaries, and should review the terms and policies before sending unpublished or copyrighted text to cloud services.

## Prompt

```text
Read every paper in the folder [path to my papers folder] and extract each one's bibliography into a file called bibliographies.md. Then identify the works cited most often across the papers, and write relevance_list.md ranking all papers by how relevant they are to [my research theme], with one sentence of reasoning each. Don't modify or delete any of the original files. You're done when both files exist and you've told me the top 10 core works.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
