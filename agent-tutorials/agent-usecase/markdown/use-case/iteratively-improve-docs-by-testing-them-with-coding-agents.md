---
title: "Iteratively improve docs by testing them with coding agents"
slug: "iteratively-improve-docs-by-testing-them-with-coding-agents"
summary: "A CLI runs coding agents on tasks that need your docs, analyzes transcripts for failures, and generates doc variants to fix them, repeating until the problems are resolved. · Nov 4, 2026"
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Codex"
    slug: "codex"
source_url: "https://github.com/gauge-sh/gauge-cli"
fetched_from: "https://agentusecases.ai/use-case/iteratively-improve-docs-by-testing-them-with-coding-agents"
---

# Iteratively improve docs by testing them with coding agents

> A CLI runs coding agents on tasks that need your docs, analyzes transcripts for failures, and generates doc variants to fix them, repeating until the problems are resolved. · Nov 4, 2026

**Category:** Software & DevOps  
**Agent:** Claude Code, Codex

## What they did

You save a task with success criteria, and Gauge starts fresh Docker sessions of Claude Code, Codex, Pi or OpenCode. The sessions get your working-tree inputs, such as Skills or files. Your own coding agent reads the transcripts, publishes findings, edits the guidance, and reruns the same eval. Gauge then compares the before and after batches.

## How it went

The README gives no measured results, only an example release-notes Skill eval. Docs as an input are listed under both local and hosted modes, but the hosted mode adds response rewriting, so local testing of docs changes is less clear.

## Worth knowing

Needs Node 22.13+, Docker, and agent credentials. Agent usage is billed through your provider or subscription. Hosted mode uses workspace credits.

## Prompt

```text
Run a docs improvement loop on my project in [path to repo or docs folder]. Come up with 5 realistic tasks that require using my docs, attempt each as a fresh agent that only has the docs, and review the transcripts for where it got stuck or guessed. Then edit the docs to fix those failures and re-run the tasks, stopping when all tasks succeed or after 3 rounds, and give me a summary of each change before you save it.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Handle family errands and recipe sorting with Codex](./handle-family-errands-and-recipe-sorting-with-codex.md)
- [Have Claude read GitHub code and post drafts](./have-claude-read-github-code-and-post-drafts.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and ship a micro-SaaS in three hours](./build-and-ship-a-micro-saas-in-three-hours.md)
- [Build small features and integrations with Cursor agent mode](./build-small-features-and-integrations-with-cursor-agent-mode.md)
