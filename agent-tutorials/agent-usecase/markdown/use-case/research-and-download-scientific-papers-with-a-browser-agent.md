---
title: "Research and download scientific papers with a browser agent"
slug: "research-and-download-scientific-papers-with-a-browser-agent"
summary: "A commenter built a custom browser agent to research and download scientific papers, and also uses browser agents for controlled data entry."
category: "Research & Knowledge"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Jul 10, 2026"
source_url: "https://www.reddit.com/r/Qwen_AI/comments/1uqtmh0/what_do_you_actually_use_browser_agents_for"
fetched_from: "https://agentusecases.ai/use-case/research-and-download-scientific-papers-with-a-browser-agent"
---

# Research and download scientific papers with a browser agent

> A commenter built a custom browser agent to research and download scientific papers, and also uses browser agents for controlled data entry.

**Category:** Research & Knowledge  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Jul 10, 2026

## What they did

A commenter said they built a custom browser agent and use it for a narrow set of tasks, especially researching and downloading scientific papers. They also use it to download CSV bank account data and enter company bank transactions, with the workflow handled by a mix of fixed Python-script steps and AI decisions.

## How it went

The source only states that they use it for those tasks and that the agent is useful within a tightly scoped range. It gives no metrics, success rates, or examples of failures.

## Worth knowing

The main catch is that they did not run it fully autonomously; they combined deterministic Python steps with AI decision-making for control.

## Prompt

```text
Research [topic] by searching [Google Scholar / arXiv / PubMed] for the [10] most relevant recent papers. Download each open-access PDF into a folder named [folder], and create a list with title, authors, year, and a two-line summary of each. Stop when you have [10] papers, and tell me which ones were paywalled so I can decide how to get them.
```

## Related use cases

- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research a person and write a bio](./research-a-person-and-write-a-bio.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Research hedge fund portfolios from 13F filings](./research-hedge-fund-portfolios-from-13f-filings.md)
