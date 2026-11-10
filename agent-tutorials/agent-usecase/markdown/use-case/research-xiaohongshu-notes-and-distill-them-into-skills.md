---
title: "Research Xiaohongshu notes and distill them into skills"
slug: "research-xiaohongshu-notes-and-distill-them-into-skills"
summary: "An agent drives Chrome to search keywords, open top-liked notes, read screenshots and distill findings into reusable skills in a knowledge base. · Oct 28, 2026"
category: "Research & Knowledge"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "mcp.csdn.net"
source_date: "Oct 28, 2026 · Submitted by from search gap: 小红书"
source_url: "https://mcp.csdn.net/6a2e2a5610ee7a33f27cbaeb.html"
fetched_from: "https://agentusecases.ai/use-case/research-xiaohongshu-notes-and-distill-them-into-skills"
---

# Research Xiaohongshu notes and distill them into skills

> An agent drives Chrome to search keywords, open top-liked notes, read screenshots and distill findings into reusable skills in a knowledge base. · Oct 28, 2026

**Category:** Research & Knowledge  
**Agent:** custom-built or unnamed agent  
**Source:** mcp.csdn.net · Oct 28, 2026 · Submitted by from search gap: 小红书

## What they did

The open-source rednote-bootstrap skill pack uses agent-browser, a CLI that controls Chrome. It splits a question into sub-dimensions and generates keyword searches. It reads the search-result snapshot, opens the top-liked notes, and screenshots each page. A vision model reads the text in the images. It then dedupes and cross-checks the findings into a sub-skill saved in a registry. The user scans a QR code to log in once.

## How it went

For the publishing-process question, it read 6 top notes (best had 4479 likes) and produced a full guide. A second skill, on account warm-up, came from 4 notes. The author calls the project early-stage.

## Worth knowing

A full research run takes roughly 5-10 minutes. Limits are 5 search rounds, 30 notes and 15 minutes, and the login state is saved to a local file for reuse.

## Prompt

```text
Open [platform, e.g. Xiaohongshu] and search for [keyword]. Open the top [number] most-liked notes, read each one including images, and note what they have in common: hooks, structure, format, and tone. Finish with a short reusable guide titled '[skill name]' that I can paste into my notes, and do not post, like, or comment on anything.
```

## Related use cases

- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research a person and write a bio](./research-a-person-and-write-a-bio.md)
- [Measure how long jobs stay open at tech companies](./measure-how-long-jobs-stay-open-at-tech-companies.md)
- [Scrape AI news three times a day with a custom bot](./scrape-ai-news-three-times-a-day-with-a-custom-bot.md)
