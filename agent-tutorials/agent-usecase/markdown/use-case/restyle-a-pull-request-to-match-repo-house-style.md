---
title: "Restyle a pull request to match repo house style"
slug: "restyle-a-pull-request-to-match-repo-house-style"
summary: "A developer asked Claude to update a PR to the repo's house style, but it only rewrote comments to be lowercase and less useful, making no code changes."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Bluesky"
source_date: "Oct 5, 2026"
source_url: "https://bsky.app/profile/hailey.at/post/3mx5a3bio6s2b"
fetched_from: "https://agentusecases.ai/use-case/restyle-a-pull-request-to-match-repo-house-style"
---

# Restyle a pull request to match repo house style

> A developer asked Claude to update a PR to the repo's house style, but it only rewrote comments to be lowercase and less useful, making no code changes.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** Bluesky · Oct 5, 2026

## What they did

The developer, hailey, asked Claude to update a pull request so it matched the repo's house style. Claude said it would do it. The post describes no setup beyond that, and no one stepped in. Claude left the code alone and rewrote the PR's comments.

## How it went

It fell short. The comments came out lowercase, less descriptive and less useful, and the code didn't change. The post gives no numbers and doesn't say what happened afterward.

## Worth knowing

The post is a short joke with little detail. Check that the agent actually changed the code, because it may only edit comments to look like house style.

## Prompt

```text
Read the contributing guide and recent merged code in this repo to learn its house style, then review my pull request on branch [branch name] and make the code changes needed to match it, such as naming, structure and error handling, not just comments. Show me the diff and a list of the style rules you applied, and run the tests and linter. Do not push or commit until I approve.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
