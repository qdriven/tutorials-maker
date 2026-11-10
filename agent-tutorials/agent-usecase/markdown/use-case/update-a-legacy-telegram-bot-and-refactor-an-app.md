---
title: "Update a legacy Telegram bot and refactor an app"
slug: "update-a-legacy-telegram-bot-and-refactor-an-app"
summary: "The author used Replit Agent to update a Telegram bot to a newer API, which only worked after some iterations, and to refactor a card-collection app including a database schema change."
category: "Software & DevOps"
agents:
  - name: "Replit Agent"
    slug: "replit-agent"
source_platform: "aiartisan.substack.com"
source_date: "Undated"
source_url: "https://aiartisan.substack.com/p/what-i-built-with-replit-in-1-month"
fetched_from: "https://agentusecases.ai/use-case/update-a-legacy-telegram-bot-and-refactor-an-app"
---

# Update a legacy Telegram bot and refactor an app

> The author used Replit Agent to update a Telegram bot to a newer API, which only worked after some iterations, and to refactor a card-collection app including a database schema change.

**Category:** Software & DevOps  
**Agent:** Replit Agent  
**Source:** aiartisan.substack.com · Undated

## What they did

For the Telegram bot, the author found the Agent needed a project created first, so they spent $0.25 on a fresh bot and then added their legacy code. They asked it to copy the new API's functionality. For the card app, they had it do non-trivial refactors, including a database schema change so cards could belong to multiple collections.

## How it went

The card-app refactor went fairly smoothly. The Telegram update was a disappointment: even a basic bot took several iterations, and the legacy-code update did not work well. The author calls it a disaster.

## Worth knowing

The whole month of experiments used the $25 plan plus about $4 of extra credit. Adding unit tests to the card app disrupted its Workflows, so the tests ended up unused.

## Prompt

```text
Update my Telegram bot in [project name] from the old [library or API version] to the current [new library or API version], keeping all existing commands working. Run the bot after each change, fix any errors you hit, and tell me which commands you tested. Don't change the database schema or delete any data without showing me the plan first.
```

## Related use cases

- [Build a searchable map of funded companies](./build-a-searchable-map-of-funded-companies.md)
- [Ship a first iOS app to the App Store with Replit](./ship-a-first-ios-app-to-the-app-store-with-replit.md)
- [Build an RFP analysis tool](./build-an-rfp-analysis-tool.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Write, review and document code across a product's PRs](./write-review-and-document-code-across-a-product-s-prs.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
