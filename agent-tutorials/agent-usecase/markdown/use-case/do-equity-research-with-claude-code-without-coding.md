---
title: "Do equity research with Claude Code without coding"
slug: "do-equity-research-with-claude-code-without-coding"
summary: "A non-engineer keeps research in a folder of plain-text files managed with Obsidian and uses Claude Code for equity research."
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Aug 9, 2026"
source_url: "https://www.reddit.com/r/AIportfolio/comments/1uvbp7o/how_i_use_claude_code_for_equity_research_i_do"
fetched_from: "https://agentusecases.ai/use-case/do-equity-research-with-claude-code-without-coding"
---

# Do equity research with Claude Code without coding

> A non-engineer keeps research in a folder of plain-text files managed with Obsidian and uses Claude Code for equity research.

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** Reddit · Aug 9, 2026

## What they did

A non-engineer keeps all research in one local folder of plain-text files, managed through Obsidian, with SEC filings from EDGAR saved there and a top-level CLAUDE.md that tells Claude Code how the files are organized and what rules to follow. Claude Code reads only those files, extracts figures with exact quoted lines and accession numbers, reruns a second verification pass, and writes small Python scripts or Excel files for any math while the person reviews and corrects mistakes.

## How it went

It surfaced a pattern across Accenture’s last five earnings releases that the poster says was hard to see one-by-one: a bookings metric went from $3B to $5.9B, then disappeared from later releases. They say the method works because the second pass catches errors, but the first pass is never clean and the model will estimate or summarize from memory unless constrained.

## Worth knowing

The main catch is workflow discipline: the poster says every calculation must be done by a script with quoted source inputs first, and long filings need explicit demands to quote the page.

## Prompt

```text
In my folder [path] of plain-text notes, research [company or ticker] by reading my existing notes, then pull key facts from [filings or sources I'll provide]. Write a new note with the business model, recent results, risks, and open questions, and link it to related notes. You're done when the note is saved as a new file; do not edit or delete my existing notes without showing me the changes first.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
