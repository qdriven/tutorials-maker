---
title: "Audit a blog's SEO with a browser"
slug: "audit-a-blog-s-seo-with-a-browser"
summary: "A developer used Claude Code with Puppeteer MCP to browse their blog, check meta tags, speed, structured data and mobile views, and write a report that caught a noindex issue."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "alexop.dev"
source_date: "Undated"
source_url: "https://alexop.dev/posts/how-i-use-claude-code-for-doing-seo-audits/"
fetched_from: "https://agentusecases.ai/use-case/audit-a-blog-s-seo-with-a-browser"
---

# Audit a blog's SEO with a browser

> A developer used Claude Code with Puppeteer MCP to browse their blog, check meta tags, speed, structured data and mobile views, and write a report that caught a noindex issue.

**Category:** Sales, Marketing & Support  
**Agent:** Claude Code  
**Source:** alexop.dev · Undated

## What they did

The developer ran the Puppeteer MCP server against a local dev copy of their Nuxt blog starter, NuxtPapier. They gave Claude Code a short prompt that told it to audit the blog and write the findings to a markdown file. Claude Code made its own todo list, then browsed pages, checked meta tags, load times, structured data and mobile screenshots, and wrote the report.

## How it went

It flagged noindex/nofollow tags, a robots.txt that blocked crawlers, and duplicate H1s. It also found structured data, mobile layout and about 200ms loads were fine. The report named files to change and gave code fixes.

## Worth knowing

The blocking issues were development settings, because the audit ran against a dev server. Expect similar findings if you audit a site before it is production-ready.

## Prompt

```text
Use a browser tool such as Puppeteer to visit [my blog URL] and audit its SEO. Check meta tags, noindex or canonical problems, page speed, structured data, and how it looks on mobile. Write a prioritized report in seo-audit.md with specific fixes, and don't change anything on the site yourself.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Manage customer enquiries from Telegram](./manage-customer-enquiries-from-telegram.md)
- [Run SEO strategy and content with Claude to grow a product](./run-seo-strategy-and-content-with-claude-to-grow-a-product.md)
