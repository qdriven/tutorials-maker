---
title: "Build a searchable map of funded companies"
slug: "build-a-searchable-map-of-funded-companies"
summary: "A software engineer had Replit Agent build a searchable map of Wefunder brick-and-mortar companies in about 3 hours for about $22."
category: "Software & DevOps"
agents:
  - name: "Replit Agent"
    slug: "replit-agent"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/kenakingkong/building-an-interactive-map-with-replit-agent-a-software-engineer-tests-vibe-coding-efficiency-3068"
fetched_from: "https://agentusecases.ai/use-case/build-a-searchable-map-of-funded-companies"
---

# Build a searchable map of funded companies

> A software engineer had Replit Agent build a searchable map of Wefunder brick-and-mortar companies in about 3 hours for about $22.

**Category:** Software & DevOps  
**Agent:** Replit Agent  
**Source:** dev.to · Undated

## What they did

Makena Kong gave Replit Agent one prompt asking for a map of funded brick-and-mortar Wefunder companies. The agent installed packages, built the interface with Leaflet, and published the site. When its API attempts returned the wrong companies, Kong parsed the Explore page data herself and hardcoded it. She then made small UI changes through prompts.

## How it went

It took about 3 hours and roughly $22, against an estimated 4–5 hours by hand. Search still needed work when credits ran low, and the agent's API debugging and reloads ate most of the cost.

## Worth knowing

Tell the agent about your private API endpoint up front. Small UI prompts cost $0.30–$2.00 each and were faster and free to do by hand.

## Prompt

```text
Build a searchable map web app of [type of places, e.g. local breweries or funded small businesses] using data from [source website or CSV]. Each pin should show the name, a short description and a link, and there should be a search box that filters the map by name and [another field, e.g. city]. You're done when the app runs with at least [number] real entries and you've given me the preview link. Tell me the estimated cost before you start any large data import.
```

## Related use cases

- [Build a full web app with database, storage and landing page](./build-a-full-web-app-with-database-storage-and-landing-page.md)
- [Build a first real project with Replit Agent](./build-a-first-real-project-with-replit-agent.md)
- [Build an RFP analysis tool](./build-an-rfp-analysis-tool.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Write, review and document code across a product's PRs](./write-review-and-document-code-across-a-product-s-prs.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
