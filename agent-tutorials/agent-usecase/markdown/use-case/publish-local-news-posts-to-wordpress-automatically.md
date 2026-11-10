---
title: "Publish local news posts to WordPress automatically"
slug: "publish-local-news-posts-to-wordpress-automatically"
summary: "Claude Code agents research local news, write HTML posts, upload them to WordPress, set featured images, verify and log results, and also check Airtable and Gmail. · Oct 17, 2026"
category: "Sales, Marketing & Support"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "kokasexton.com"
source_date: "Oct 17, 2026 · Submitted by from search gap: marketing"
source_url: "https://kokasexton.com/claude-code-marketing-ops-power-tool/"
fetched_from: "https://agentusecases.ai/use-case/publish-local-news-posts-to-wordpress-automatically"
---

# Publish local news posts to WordPress automatically

> Claude Code agents research local news, write HTML posts, upload them to WordPress, set featured images, verify and log results, and also check Airtable and Gmail. · Oct 17, 2026

**Category:** Sales, Marketing & Support  
**Agent:** Claude Code  
**Source:** kokasexton.com · Oct 17, 2026 · Submitted by from search gap: marketing

## What they did

Koka Sexton runs Claude Code in a terminal with credentials for WordPress, Airtable and Gmail. The agent researches local news, fetches source articles and writes full HTML posts. It then uploads them with WP-CLI or a script it writes, sets featured images, checks HTTP responses and logs the results. Publishing three articles takes a single request.

## How it went

He says a 90-minute human process now happens in one conversation turn. The throughput figures come from his own internal benchmarks, and the article gives no independent measurements.

## Worth knowing

Write the verification script before the first output, because hallucinations can go live otherwise. The article also suggests running the agent in parallel with a human for two weeks.

## Prompt

```text
Build a workflow that researches recent news about [my town or topic], writes [number] short HTML posts with sources, and prepares them as drafts on my WordPress site [site URL] with a featured image. Afterward, check each draft loads correctly and log the titles and links in [Airtable or a spreadsheet]. Stop with the drafts ready and show me them before anything is published.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Manage customer enquiries from Telegram](./manage-customer-enquiries-from-telegram.md)
- [Run SEO strategy and content with Claude to grow a product](./run-seo-strategy-and-content-with-claude-to-grow-a-product.md)
