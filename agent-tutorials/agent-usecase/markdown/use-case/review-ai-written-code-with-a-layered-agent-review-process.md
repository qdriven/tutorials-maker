---
title: "Review AI-written code with a layered agent review process"
slug: "review-ai-written-code-with-a-layered-agent-review-process"
summary: "Anthropic's Claude Code team describes how it changed its code review process so Claude can write most of Claude Code's code. · Oct 16, 2026"
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Claude"
    slug: "claude"
source_url: "https://claude.dev/blog/solving-code-review-at-anthropic/"
fetched_from: "https://agentusecases.ai/use-case/review-ai-written-code-with-a-layered-agent-review-process"
---

# Review AI-written code with a layered agent review process

> Anthropic's Claude Code team describes how it changed its code review process so Claude can write most of Claude Code's code. · Oct 16, 2026

**Category:** Software & DevOps  
**Agent:** Claude Code, Claude

## What they did

Claude verifies its own work by running tests, builds or screenshots, and a fresh-context subagent reviews the diff. Every PR then gets parallel bug-hunting agents, with other agents voting on each finding, plus a blocking security review and CI. A classifier sets human approval to none, one or two people by risk. Merge queue, flags and gradual release follow.

## How it went

From June to September, merged PRs more than doubled and the share reverted fell by over 40 percent. Convergence changes cut mean reviews to pass from 2.08 to 1.32. Circuit breakers that tighten approval don't exist yet.

## Worth knowing

Agent author and agent reviewer can loop: one PR went over fifty overnight rounds, so cap re-review rounds (they use three) and re-review only the new diff.

## Prompt

```text
Review the pull request on branch [branch name] in this repo in layers. First check it against the intent described in [PR description or ticket link], then look for bugs, missing tests and security issues, and finally check style against our conventions in [file or doc]. Finish with a list of issues sorted by severity and a verdict on whether it is safe to merge; do not change any code or push anything.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build retro games with a child using Claude Code](./build-retro-games-with-a-child-using-claude-code.md)
- [Generate monthly marketing reports and buying-intent replies](./generate-monthly-marketing-reports-and-buying-intent-replies.md)
- [Review Linux kernel patches](./review-linux-kernel-patches.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Build a multilingual typing app for language learning](./build-a-multilingual-typing-app-for-language-learning.md)
