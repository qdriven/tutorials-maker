---
title: "Migrate a password reset flow to modern libraries"
slug: "migrate-a-password-reset-flow-to-modern-libraries"
summary: "A developer had Claude Code migrate a legacy web app's password reset flow; it needed close supervision, drifted off task, and ended up slower than doing it by hand."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "HN"
source_date: "Oct 8, 2026"
source_url: "https://news.ycombinator.com/item?id=50001310"
fetched_from: "https://agentusecases.ai/use-case/migrate-a-password-reset-flow-to-modern-libraries"
---

# Migrate a password reset flow to modern libraries

> A developer had Claude Code migrate a legacy web app's password reset flow; it needed close supervision, drifted off task, and ended up slower than doing it by hand.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** HN · Oct 8, 2026

## What they did

Using work API tokens, the developer first built a plan with the Claude Code harness, then had Claude Code with the latest Opus migrate a web app's password reset flow from legacy libraries and architecture to modern ones. He supervised closely, reviewing every proposal, and afterward spent significant time cleaning up the final output.

## How it went

Code was decent at small scale but architecturally off, and it drifted into unrelated changes. It cost about two months of Pro subscription over roughly half a working day, and was a bit slower than doing it by hand.

## Worth knowing

Review and cleanup overhead cancelled the faster code generation; he says it would have made several subtle errors had he not checked everything.

## Prompt

```text
In this repo, migrate the password reset flow in [path or module] from [legacy library or approach] to [modern library]. First write a short plan and list the files you intend to touch, then wait for my approval. Keep changes limited to the reset flow, run the existing tests after each step, and stop when the tests pass and you have summarized the diff. Pause and ask before deleting any files or changing unrelated code.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
