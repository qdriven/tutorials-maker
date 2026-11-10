---
title: "Shepherd PRs to merge automatically"
slug: "shepherd-prs-to-merge-automatically"
summary: "Bots check PRs every 30 minutes, send failures back to a cloud agent, review clean PRs and auto-merge high-confidence, low-risk ones."
category: "Software & DevOps"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "x.ai"
source_date: "Undated"
source_url: "https://x.ai/bot/guides/grok-bot-for-engineering"
fetched_from: "https://agentusecases.ai/use-case/shepherd-prs-to-merge-automatically"
---

# Shepherd PRs to merge automatically

> Bots check PRs every 30 minutes, send failures back to a cloud agent, review clean PRs and auto-merge high-confidence, low-risk ones.

**Category:** Software & DevOps  
**Agent:** Grok Bot  
**Source:** x.ai · Undated

## What they did

Each engineer bot keeps a shared Notion database of PRs. Every 30 minutes it checks each PR for Bugbot or security comments, failing CI and merge conflicts. Problems go back to the cloud agent, and the row moves to Working. Clean PRs are marked Ready for Review and get a review run. Highly confident, low-blast-radius PRs are merged automatically. The author reviews the rest.

## How it went

The author finds tasks ready to merge almost every morning. The fleet manages over 200 cloud agents at once, up from about 15 by hand. The source gives no merge-rate figures.

## Worth knowing

The author says rapid transcript-checking routines, like the 5-minute P0 mode, burn tokens faster than expected, so keep them for true urgency.

## Prompt

```text
Every 30 minutes, check open pull requests in [repo]. Send failing PRs back to a coding agent to fix, and review the clean ones. Only auto-merge a PR if you are highly confident and it is low-risk, such as [examples]; otherwise ping me with a summary. Pause and ask me before merging anything that touches [sensitive areas].
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [Monitor PC memory and ask before closing apps](./monitor-pc-memory-and-ask-before-closing-apps.md)
- [Watch weekly deals and buy regular items](./watch-weekly-deals-and-buy-regular-items.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Split frontend and backend work across Claude Code and Codex](./split-frontend-and-backend-work-across-claude-code-and-codex.md)
