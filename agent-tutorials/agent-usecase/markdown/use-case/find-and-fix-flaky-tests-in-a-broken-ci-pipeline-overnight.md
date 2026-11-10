---
title: "Find and fix flaky tests in a broken CI pipeline overnight"
slug: "find-and-fix-flaky-tests-in-a-broken-ci-pipeline-overnight"
summary: "Claude monitors CI pass rates, identifies worst flaky tests, reproduces them and proposes fixes overnight; pipeline got 20 minutes faster and pass rate rose 35%, with some bad fixes discarded."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "HN"
source_date: "May 1, 2026"
source_url: "https://news.ycombinator.com/item?id=47970174"
fetched_from: "https://agentusecases.ai/use-case/find-and-fix-flaky-tests-in-a-broken-ci-pipeline-overnight"
---

# Find and fix flaky tests in a broken CI pipeline overnight

> Claude monitors CI pass rates, identifies worst flaky tests, reproduces them and proposes fixes overnight; pipeline got 20 minutes faster and pass rate rose 35%, with some bad fixes discarded.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** HN · May 1, 2026

## What they did

The author gave Claude read access to CI artifacts and had it build tooling to track the rolling 30-day pass/fail rate. It picked the worst flaky tests, hypothesized test versus production causes, and narrowed to minimal repros. Without a deterministic repro, it guessed a fix and re-ran tests overnight to judge it statistically. The author reviewed PRs by day.

## How it went

Over a handful of weeks the pipeline got 20 minutes shorter and the pass rate rose 35%, from roughly 40% on master. Some of Claude's proposed solutions were bad and had to be thrown away.

## Worth knowing

Plan to review every PR yourself; the author discarded some bad fixes, so overnight runs need daytime human checking.

## Prompt

```text
Look at the last [number] CI runs for [repo name] and rank the tests by how often they flake. For the worst [number], reproduce the failure locally, find the cause, and propose a fix on a separate branch. Run each fix [number] times to confirm it's stable, discard any fix that doesn't hold, and summarize what worked. Don't merge anything without showing me the diff first.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
