---
title: "Build and deploy a Hacker News scraper app"
slug: "build-and-deploy-a-hacker-news-scraper-app"
summary: "Replit Agent generated a scraper, database models, API endpoints and front end that stores and shows Hacker News items, then deployed it."
category: "Software & DevOps"
agents:
  - name: "Replit Agent"
    slug: "replit-agent"
source_platform: "neon.com"
source_date: "Undated"
source_url: "https://neon.com/blog/building-a-news-app-with-replit-agent-a-step-by-step-guide"
fetched_from: "https://agentusecases.ai/use-case/build-and-deploy-a-hacker-news-scraper-app"
---

# Build and deploy a Hacker News scraper app

> Replit Agent generated a scraper, database models, API endpoints and front end that stores and shows Hacker News items, then deployed it.

**Category:** Software & DevOps  
**Agent:** Replit Agent  
**Source:** neon.com · Undated

## What they did

The author gave Replit Agent a three-line prompt: continuously scrape Hacker News, store the items in Postgres, and render them in a front end. The agent proposed a plan, which the author approved. It then generated a Flask and SQLAlchemy scraper, database models, API endpoints and HTML templates. The author checked the app and clicked Deploy.

## How it went

The result was a working app that scrapes Hacker News, stores items in Postgres and displays them. The post gives no timings or metrics and shows no problems during the build.

## Worth knowing

Replit Agent needed a Core or Teams plan and was in early access, so the post warns of possible errors or unexpected behavior.

## Prompt

```text
Build an app that scrapes [website, e.g. the Hacker News front page] on a schedule, stores each item's title, link, score and time in a database, and shows them in a simple front-end list with API endpoints to fetch them. You're done when the list displays freshly scraped items and the app is running in the preview. Show me the scraping frequency and target before you deploy it.
```

## Related use cases

- [Build a searchable map of funded companies](./build-a-searchable-map-of-funded-companies.md)
- [Build a first real project with Replit Agent](./build-a-first-real-project-with-replit-agent.md)
- [Build an RFP analysis tool](./build-an-rfp-analysis-tool.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Write, review and document code across a product's PRs](./write-review-and-document-code-across-a-product-s-prs.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
