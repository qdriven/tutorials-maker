---
title: "Build a trading bot with cursor-agent automation"
slug: "build-a-trading-bot-with-cursor-agent-automation"
summary: "A commenter is building a personal trading script/bot and uses cursor-agent with composer-1 to automate coding work."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/cursor/comments/1ovbk30"
fetched_from: "https://agentusecases.ai/use-case/build-a-trading-bot-with-cursor-agent-automation"
---

# Build a trading bot with cursor-agent automation

> A commenter is building a personal trading script/bot and uses cursor-agent with composer-1 to automate coding work.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** Reddit · Undated

## What they did

In the thread, one commenter says they use Cursor Agent with composer-1 to automate coding work. They describe the agent reading over most of the codebase to gather context and then making very large edits on its own, including a change touching about 1,000 lines in one request; the human’s role was choosing to run it and judging the result afterward.

## How it went

The reported outcome was that the result was pretty good, but expensive. The commenter says that one request used about 4.5 million tokens without cache, and gives no trading performance or deployment result.

## Worth knowing

The main catch is cost: the example change reportedly consumed about 4.5 million uncached tokens in a single request.

## Prompt

```text
Help me build a personal trading script in [language, e.g. Python] that [strategy, e.g. buys when the 50-day average crosses above the 200-day] for [asset or ticker]. Start in paper-trading or backtest mode only, with no real orders, using [data source or broker API]. When finished, the script should run a backtest on [time period], print the results, and include a README explaining how to run it. Ask me before adding any code that places real trades.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Grade Cursor on a real data science project](./grade-cursor-on-a-real-data-science-project.md)
- [Build an invitation card website purely by prompting](./build-an-invitation-card-website-purely-by-prompting.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build custom real estate tools for offers and deal tracking](./build-custom-real-estate-tools-for-offers-and-deal-tracking.md)
- [Plan with PRDs and delegate tasks to cheaper agents](./plan-with-prds-and-delegate-tasks-to-cheaper-agents.md)
