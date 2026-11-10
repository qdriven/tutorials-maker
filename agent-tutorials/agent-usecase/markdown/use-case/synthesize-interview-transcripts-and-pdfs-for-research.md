---
title: "Synthesize interview transcripts and PDFs for research"
slug: "synthesize-interview-transcripts-and-pdfs-for-research"
summary: "Claude Code is pointed at transcripts and PDFs to produce theme summaries, evidence tables and annotated bibliographies; a UX researcher runs 50-transcript studies this way."
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "ccforeveryone.com"
source_date: "Undated"
source_url: "https://ccforeveryone.com/guides/claude-code-for-researchers"
fetched_from: "https://agentusecases.ai/use-case/synthesize-interview-transcripts-and-pdfs-for-research"
---

# Synthesize interview transcripts and PDFs for research

> Claude Code is pointed at transcripts and PDFs to produce theme summaries, evidence tables and annotated bibliographies; a UX researcher runs 50-transcript studies this way.

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** ccforeveryone.com · Undated

## What they did

Transcripts go in one folder, one file per interview with consistent names, plus a CLAUDE.md holding research questions, a codebook and a rule to quote only verbatim text with file names. Claude codes them in batches of 5 to 8, or via parallel subagents, and writes themes.md and evidence tables. PDFs go in a papers folder for the bibliography. Claude then searches each quote in its source file.

## How it went

The guide says one typed question replaces an hour of Ctrl+F, and Else van der Berg runs 50-transcript studies this way. Timing figures are illustrative, not benchmarked. One audit found 7.7% of supposedly verbatim quotes missing from sources.

## Worth knowing

Pin the codebook before launching parallel agents, or you get incompatible theme lists. Always run the quote verification pass, and de-identify transcripts, since file contents are sent to Anthropic.

## Prompt

```text
Read all the interview transcripts and PDFs in [folder path] for my study on [research question]. Produce a theme summary, an evidence table with a quote and source file for each theme, and an annotated bibliography. Mark any theme supported by fewer than [number] sources as tentative, and save everything as separate files in a new output folder.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
