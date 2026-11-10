---
title: "Debug overnight with a long-running agent"
slug: "debug-overnight-with-a-long-running-agent"
summary: "The author leaves Codex CLI running for hours to add debug prints and test hypotheses against a reproducing unit test, often only to find the bug."
category: "Software & DevOps"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "HN"
source_date: "Undated"
source_url: "https://news.ycombinator.com/item?id=46993231"
fetched_from: "https://agentusecases.ai/use-case/debug-overnight-with-a-long-running-agent"
---

# Debug overnight with a long-running agent

> The author leaves Codex CLI running for hours to add debug prints and test hypotheses against a reproducing unit test, often only to find the bug.

**Category:** Software & DevOps  
**Agent:** Codex  
**Source:** HN · Undated

## What they did

The author starts Codex running for a few hours overnight on a bug they can't explain. The key requirement is a deterministic unit test that reproduces the bug through the app's front door. The agent then grinds through the tedious work on its own: adding debug prints throughout the code and testing hypotheses about the cause.

## How it went

The source gives no numbers or specific results. The author calls it an ideal use case and says they do it routinely, though it doesn't say how often the agent actually finds the bug.

## Worth knowing

Write a deterministic reproducing test first, entering through the app's front door; the approach depends on the agent having a repeatable pass/fail signal to test hypotheses against.

## Prompt

```text
There is a bug in [project] that reproduces with the test [test name or path]. Form hypotheses about the cause, add temporary debug prints, run the test, and keep testing hypotheses until you find the root cause. Stop when you can explain the cause with evidence from the output, then list the debug prints you added and remove them. Propose a fix but do not apply it without asking me.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a racing game from a single prompt](./build-a-racing-game-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Migrate an Electron app from Vue 2 to Vue 3](./migrate-an-electron-app-from-vue-2-to-vue-3.md)
- [Auto-generate a searchable help video library for an app](./auto-generate-a-searchable-help-video-library-for-an-app.md)
