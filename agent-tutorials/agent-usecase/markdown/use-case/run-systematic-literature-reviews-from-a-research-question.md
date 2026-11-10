---
title: "Run systematic literature reviews from a research question"
slug: "run-systematic-literature-reviews-from-a-research-question"
summary: "A physician-researcher built Claude Code skills that search databases, screen articles, chase citations, fetch PDFs and write the synthesis."
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "github.com"
source_date: "Undated"
source_url: "https://github.com/daltonhaslam/lit-review-agent"
fetched_from: "https://agentusecases.ai/use-case/run-systematic-literature-reviews-from-a-research-question"
---

# Run systematic literature reviews from a research question

> A physician-researcher built Claude Code skills that search databases, screen articles, chase citations, fetch PDFs and write the synthesis.

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** github.com · Undated

## What they did

Dalton Haslam, MD MBA, built a set of Claude Code skills backed by a Python layer that queries free literature APIs. The agent interviews you to set the PICO question, then searches PubMed, OpenAlex and Semantic Scholar. It deduplicates, screens abstracts twice, chases citations, downloads open-access PDFs, appraises quality and writes the synthesis. Six checkpoints need your approval, and you download paywalled PDFs yourself.

## How it went

The repo includes a worked demo review on congestive heart failure care transitions, with the full output package. The source gives no timing or accuracy figures. Its disclaimer says to verify all outputs.

## Worth knowing

A full review typically takes about 4–6 sessions. Get a free Semantic Scholar key, because the shared pool often rate-limits. The manual PDF step assumes macOS.

## Prompt

```text
I need a systematic literature review on this question: [research question]. Search [databases, e.g. PubMed, Semantic Scholar], screen results against these inclusion criteria: [criteria], follow citations from the most relevant papers, and save the PDFs you can access into a local folder. Finish by writing a synthesis document with a list of included studies, a short summary of the findings, and a log of what you excluded and why.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
