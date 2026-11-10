---
title: "Run academic literature reviews from seed papers"
slug: "run-academic-literature-reviews-from-seed-papers"
summary: "Poster built an agent skill that starts from seed papers, searches backward and forward, screens candidates, and iteratively refines a literature review."
category: "Research & Knowledge"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Apr 16, 2026"
source_url: "https://www.reddit.com/r/AIToolBench/comments/1su9rqu/i_built_a_agent_skill_for_academic_literature"
fetched_from: "https://agentusecases.ai/use-case/run-academic-literature-reviews-from-seed-papers"
---

# Run academic literature reviews from seed papers

> Poster built an agent skill that starts from seed papers, searches backward and forward, screens candidates, and iteratively refines a literature review.

**Category:** Research & Knowledge  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Apr 16, 2026

## What they did

The poster made a lightweight agent skill for literature reviews because general chatbots were missing relevant papers and citation tracing. The skill starts from seed papers, follows references backward and citations forward, screens the papers it finds, and iteratively refines the review; the workflow is partly hard-coded/scripted and meant to run inside tools such as Claude Code, Codex, Gemini CLI, or OpenClaw.

## How it went

In the poster’s tests, the final review was better than a generic AI-generated document, especially on coverage and paper selection. No quantitative results or specific failure cases are given in the thread.

## Worth knowing

The main catch is that the workflow is only partly autonomous: it is partly hard-coded/scripted rather than a fully open-ended agent.

## Prompt

```text
Run a literature review on [topic] starting from these seed papers: [titles or DOIs]. Search backward through their references and forward through papers that cite them, screen candidates against these criteria: [inclusion criteria], and repeat until new rounds turn up nothing relevant. Deliver a table of included papers with a summary of each and a short written synthesis of the main themes, plus a list of excluded papers with reasons.
```

## Related use cases

- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research a person and write a bio](./research-a-person-and-write-a-bio.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Research hedge fund portfolios from 13F filings](./research-hedge-fund-portfolios-from-13f-filings.md)
