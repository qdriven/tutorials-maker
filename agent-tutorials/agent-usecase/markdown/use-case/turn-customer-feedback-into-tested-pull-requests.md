---
title: "Turn customer feedback into tested pull requests"
slug: "turn-customer-feedback-into-tested-pull-requests"
summary: "In OpenAI's own launch example, a Dot watches feedback for recurring requests, scopes small fixes, builds and tests them, and returns PRs with demo videos."
category: "Software & DevOps"
agents:
  - name: "Dots"
    slug: "dots"
source_platform: "openai.com"
source_date: "Sep 29, 2026"
source_url: "https://openai.com/index/introducing-dots/"
fetched_from: "https://agentusecases.ai/use-case/turn-customer-feedback-into-tested-pull-requests"
---

# Turn customer feedback into tested pull requests

> In OpenAI's own launch example, a Dot watches feedback for recurring requests, scopes small fixes, builds and tests them, and returns PRs with demo videos.

**Category:** Software & DevOps  
**Agent:** Dots  
**Source:** openai.com · Sep 29, 2026

## What they did

The source gives this as a short scenario for a developer working on an app. The dot runs on its own cloud computer with connected apps. It watches customer feedback for recurring requests, scopes smaller improvements and bugfixes, builds and tests them, and hands back complete PRs with videos of the changes. The developer reviews them while building the next major feature.

## How it went

No results or numbers are given. It is an illustrative example from the launch announcement, not a measured case. The page says dots can still make mistakes, so consequential work needs review.

## Worth knowing

Dots are rolling out on Pro, Business Premium and Enterprise plans in eligible markets. Tasks a dot starts in Codex count toward your usage limits.

## Prompt

```text
Watch [feedback source, e.g. support inbox, forum, or survey sheet] for requests that recur at least [number] times. For each one, scope a small fix in [repo name], build it, run the tests, and open a draft pull request with a short demo video and a summary of the feedback behind it. Stop after [number] PRs and show me the list before merging or pushing anything beyond drafts.
```

## Related use cases

- [Plan a trip and book flight, hotel and shuttle with an always-on agent](./plan-a-trip-and-book-flight-hotel-and-shuttle-with-an-always.md)
- [Track rare coffee beans with a scheduled Dot](./track-rare-coffee-beans-with-a-scheduled-dot.md)
- [Ask an always-on Slack agent to pick flight dates](./ask-an-always-on-slack-agent-to-pick-flight-dates.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
