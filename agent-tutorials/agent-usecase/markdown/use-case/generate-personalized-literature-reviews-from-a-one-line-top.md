---
title: "Generate personalized literature reviews from a one-line topic"
slug: "generate-personalized-literature-reviews-from-a-one-line-top"
summary: "A researcher built a literature-review Skill for an agent framework that outputs Markdown, Word and PDF reviews with GB/T 7714 references carrying DOIs or URLs, used by their team. · Oct 26, 2026"
category: "Research & Knowledge"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "wangshuyi.substack.com"
source_date: "Oct 26, 2026 · Submitted by from search gap: 学术"
source_url: "https://wangshuyi.substack.com/p/agent-skill"
fetched_from: "https://agentusecases.ai/use-case/generate-personalized-literature-reviews-from-a-one-line-top"
---

# Generate personalized literature reviews from a one-line topic

> A researcher built a literature-review Skill for an agent framework that outputs Markdown, Word and PDF reviews with GB/T 7714 references carrying DOIs or URLs, used by their team. · Oct 26, 2026

**Category:** Research & Knowledge  
**Agent:** custom-built or unnamed agent  
**Source:** wangshuyi.substack.com · Oct 26, 2026 · Submitted by from search gap: 学术

## What they did

The skill goes into an agent framework and takes a one-line topic. It first sets boundaries: four layers of keywords, a time-sensitivity level, and routing to arXiv or PubMed by field. Then it runs ten scripts against OpenAlex, Semantic Scholar, CrossRef, Unpaywall, arXiv and PubMed in five search rounds. Titles and DOIs are used to remove duplicates, and metadata comes from the APIs, not from memory.

## How it went

The author has used and refined it with their team for over six months, and the students like it. Each reference carries a DOI or URL. The full post is paywalled, so later steps aren't visible.

## Worth knowing

The online Feishu version works worse than the local one, though it is easier to share. The skill file itself is at the end of the paywalled post.

## Prompt

```text
Build me a reusable skill that takes a one-line topic like [example topic] and writes a literature review. It should find real papers, write the review in [language], and cite them in [citation style, e.g. APA or GB/T 7714] with a DOI or URL for every reference. Export it as Markdown, Word and PDF, and drop any reference you can't verify. Test it on [topic] and stop when all three files are saved.
```

## Related use cases

- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research a person and write a bio](./research-a-person-and-write-a-bio.md)
- [Measure how long jobs stay open at tech companies](./measure-how-long-jobs-stay-open-at-tech-companies.md)
- [Scrape AI news three times a day with a custom bot](./scrape-ai-news-three-times-a-day-with-a-custom-bot.md)
