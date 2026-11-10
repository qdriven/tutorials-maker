---
title: "Research stocks by pulling filings and transcripts"
slug: "research-stocks-by-pulling-filings-and-transcripts"
summary: "The poster has Claude Code fetch filings, transcripts and SEC documents for a company, cite sources, and write a bear case on a holding."
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Mar 10, 2026"
source_url: "https://www.reddit.com/r/ClaudeCode/comments/1rpxsan/claude_code_kinda_ruined_me_for_doing_stock"
fetched_from: "https://agentusecases.ai/use-case/research-stocks-by-pulling-filings-and-transcripts"
---

# Research stocks by pulling filings and transcripts

> The poster has Claude Code fetch filings, transcripts and SEC documents for a company, cite sources, and write a bear case on a holding.

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** Reddit · Mar 10, 2026

## What they did

The poster says they stopped manually downloading and skimming 10-Ks and instead ask Claude Code about a company and what they want to know. Claude Code then uses web search to pull 10-Ks, earnings transcripts, and other SEC filings on its own, writes up the research, and cites the filings so the poster can spot-check anything that seems off; the human mainly reviews the output and decides whether to buy.

## How it went

They say the writeups were more thorough than their old process and that asking for a bear case on a long-held position surfaced concerns they had missed. No performance numbers or specific investing results are given.

## Worth knowing

The main catch is that this is described as a research aid, with the person still reading the cited output and making the final decision.

## Prompt

```text
Research [company name, ticker]. Fetch its latest 10-K, 10-Q and the last [number] earnings call transcripts, summarize the business, key numbers and management's main claims, and cite the source and page for every point. Then write a bear case of the strongest arguments against owning it, saved as a markdown file in this folder. This is for research only, not investment advice.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
