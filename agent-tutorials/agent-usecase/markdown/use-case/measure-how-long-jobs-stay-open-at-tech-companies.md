---
title: "Measure how long jobs stay open at tech companies"
slug: "measure-how-long-jobs-stay-open-at-tech-companies"
summary: "An agent read 25 open jobs each at five companies and measured how long each had been posted, e.g. 21 of 25 at Figma were 60+ days old. · Oct 11, 2026"
category: "Research & Knowledge"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "tools.openkrill.app"
source_date: "Oct 11, 2026 · Submitted by OpenKrill"
source_url: "https://tools.openkrill.app/blog/greenhouse-open-jobs-and-job-age"
fetched_from: "https://agentusecases.ai/use-case/measure-how-long-jobs-stay-open-at-tech-companies"
---

# Measure how long jobs stay open at tech companies

> An agent read 25 open jobs each at five companies and measured how long each had been posted, e.g. 21 of 25 at Figma were 60+ days old. · Oct 11, 2026

**Category:** Research & Knowledge  
**Agent:** custom-built or unnamed agent  
**Source:** tools.openkrill.app · Oct 11, 2026 · Submitted by OpenKrill

## What they did

The agent used a tool called Company Jobs Finder. It found each company's Greenhouse board, read the public API's first-published date for the first 25 listed jobs at Stripe, Airbnb, Figma, Databricks and Anthropic, and computed each posting's age. It needs no key. Filters for keyword, location and remote work are available.

## How it went

Figma had 21 of 25 postings at 60+ days, with a median age of 269 days. Stripe had 7, Airbnb 8, Databricks 13 and Anthropic 9. Databricks had the oldest posting, at 1,031 days.

## Worth knowing

The sample is only the first 25 jobs in each board's own order, and reposts reset a posting's age, so old postings don't prove ghost jobs.

## Prompt

```text
For each of these companies: [company names], look at their careers pages and sample about [25] open roles. Find out how long each role has been posted and report what share are older than [60] days. Give me a table per company and one sentence on what the numbers suggest. Stop once every company has a sample, and note any company where posting dates were not available.
```

## Related use cases

- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research a person and write a bio](./research-a-person-and-write-a-bio.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Research hedge fund portfolios from 13F filings](./research-hedge-fund-portfolios-from-13f-filings.md)
