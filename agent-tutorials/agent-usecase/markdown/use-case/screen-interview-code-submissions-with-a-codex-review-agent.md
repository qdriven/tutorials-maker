---
title: "Screen interview code submissions with a Codex review agent"
slug: "screen-interview-code-submissions-with-a-codex-review-agent"
summary: "A commenter uses Codex with a targeted agents.md for front-line code reviews, rejecting submissions with too many files changed or added."
category: "Software & DevOps"
agents:
  - name: "Codex"
    slug: "codex"
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ExperiencedDevs/comments/1qbw1t3/dealing_with_the_flood_of_incompetent_aitethered"
fetched_from: "https://agentusecases.ai/use-case/screen-interview-code-submissions-with-a-codex-review-agent"
---

# Screen interview code submissions with a Codex review agent

> A commenter uses Codex with a targeted agents.md for front-line code reviews, rejecting submissions with too many files changed or added.

**Category:** Software & DevOps  
**Agent:** Codex, ChatGPT  
**Source:** Reddit · Undated

## What they did

A commenter said they set up ChatGPT Codex with a targeted agents.md file to handle first-pass reviews of coding submissions. The agent reviewed each submission against simple gate rules and automatically rejected ones with too many files changed or added; the human still chose the rules and used the agent as the front-line screener.

## How it went

The post gives no metrics, examples, or comparison to manual review. It only claims this was being used to fight low-quality, AI-assisted submissions earlier in the hiring funnel.

## Worth knowing

The useful catch is how narrow the filter was: they tuned it around obvious review heuristics like file-count and added/changed-file limits, not a full autonomous hiring decision.

## Prompt

```text
Write an agents.md for [repo or take-home project] that tells you how to screen candidate submissions: flag any submission that changes or adds more than [number] files, doesn't follow [requirement], or lacks tests. Then review the submission in [folder path] against it and give me a pass or reject recommendation with reasons. You're done when I have a short review I can use; don't contact the candidate or post anything anywhere.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Analyze budgets and research investments from bank data](./analyze-budgets-and-research-investments-from-bank-data.md)
- [Run agent builds and tests on remote Windows VMs](./run-agent-builds-and-tests-on-remote-windows-vms.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Click through apps to verify its own work](./click-through-apps-to-verify-its-own-work.md)
- [Build a multilingual typing app for language learning](./build-a-multilingual-typing-app-for-language-learning.md)
