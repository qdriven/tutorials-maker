---
title: "Ship a product in 72 hours with a bot team"
slug: "ship-a-product-in-72-hours-with-a-bot-team"
summary: "Three SpaceX engineers used a Grok Bot team to go from an empty repo to a product with 433 PRs, with agents reproducing bugs and merging autonomously except for human gates on migrations and deploys."
category: "Software & DevOps"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "X"
source_date: "Sep 20, 2026"
source_url: "https://x.com/1920web1080/status/2101658383958876623"
fetched_from: "https://agentusecases.ai/use-case/ship-a-product-in-72-hours-with-a-bot-team"
---

# Ship a product in 72 hours with a bot team

> Three SpaceX engineers used a Grok Bot team to go from an empty repo to a product with 433 PRs, with agents reproducing bugs and merging autonomously except for human gates on migrations and deploys.

**Category:** Software & DevOps  
**Agent:** Grok Bot  
**Source:** X · Sep 20, 2026

## What they did

Three SpaceX engineers ran one chief-of-staff bot that spawned specialist bots, each limited to a single job description. Bots earned write access only after drafting changes first, then reproduced bugs, attached video proof, and opened PRs. They merged autonomously except at the four human gates on migrations, deploys, money, and permissions.

## How it went

The team hit 433 PRs in 72 hours from an empty repo. Launch day showed 4,000 games and 2,000 users but $0 revenue. One later month reached 2,500 PRs merged.

## Worth knowing

They logged every one of the 40 on-air failures plus the extracted rule for each.

## Prompt

```text
Build [product description] from an empty repo [repo URL] using a team of bots, with one agent per feature and others reproducing and fixing bugs. Open small PRs, and merge them yourselves only when tests and review checks pass. Stop and ask me before running any database migration or deploying, showing me exactly what will run.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
- [Watch weekly deals and buy regular items](./watch-weekly-deals-and-buy-regular-items.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Split frontend and backend work across Claude Code and Codex](./split-frontend-and-backend-work-across-claude-code-and-codex.md)
