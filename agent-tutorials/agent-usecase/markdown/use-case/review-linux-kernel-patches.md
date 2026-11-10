---
title: "Review Linux kernel patches"
slug: "review-linux-kernel-patches"
summary: "Google engineers launched Sashiko, an agentic AI code reviewer for the Linux kernel. · Mar 18, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://www.phoronix.com/news/Sashiko-Linux-AI-Code-Review"
fetched_from: "https://agentusecases.ai/use-case/review-linux-kernel-patches"
---

# Review Linux kernel patches

> Google engineers launched Sashiko, an agentic AI code reviewer for the Linux kernel. · Mar 18, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

Roman Gushchin's team at Google spent several months building Sashiko, an agentic code review system, and used it internally before release. It is now open source and covers every submission to the Linux kernel mailing list. It was designed for Gemini 3.1 Pro but should also work with Claude and probably other LLMs.

## How it went

On 1,000 recent upstream issues with Fixes: tags, it found about 53% of the bugs, and human reviewers had missed all of them. Gushchin acknowledges that 53% may not sound impressive.

## Worth knowing

Google is paying for the token budget and infrastructure while hosting moves to the Linux Foundation, so running this yourself means covering your own LLM costs.

## Prompt

```text
Act as a code reviewer for this patch or diff: [paste diff or give branch name] in the repo at [path]. Check for bugs, memory or concurrency problems, missing error handling, and unclear naming, citing exact lines. Finish with a prioritized list of findings and a one-paragraph verdict on whether it's ready to merge.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
