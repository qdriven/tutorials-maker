---
title: "Set up weekly changelogs and fix docs from GitHub issues"
slug: "set-up-weekly-changelogs-and-fix-docs-from-github-issues"
summary: "Neon's docs team has Devin create the weekly changelog from a playbook and open or revise doc PRs from GitHub issues, for repetitive work only."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "neon.com"
source_date: "Undated"
source_url: "https://neon.com/blog/ai-workflows-for-docs-devin"
fetched_from: "https://agentusecases.ai/use-case/set-up-weekly-changelogs-and-fix-docs-from-github-issues"
---

# Set up weekly changelogs and fix docs from GitHub issues

> Neon's docs team has Devin create the weekly changelog from a playbook and open or revise doc PRs from GitHub issues, for repetitive work only.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** neon.com · Undated

## What they did

Neon's docs team standardized the weekly changelog setup as a Devin Playbook, so they only tell Devin to set up the changelog for this Friday. For GitHub issues, they point Devin at an issue, and it reviews the code, finds the docs that need updating, and creates or revises a PR.

## How it went

This helped them work through a backlog of older docs issues without auditing each one by hand. Devin struggled with open-ended tasks, and a bulk term rename needed 20+ manual cleanup commits.

## Worth knowing

Keep tasks clearly scoped. Devin failed silently on vague jobs, with no clarifying questions or error signals, so check in on its progress yourself.

## Prompt

```text
In my docs repo at [path to repo], read the open GitHub issues labeled [label] and make the doc changes each one asks for, one branch per issue. Also draft this week's changelog from [source, e.g. merged PRs since last Friday] following the format in [example changelog file]. Pause and show me each diff before opening any PRs.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Rewrite a README after a rearchitecture](./rewrite-a-readme-after-a-rearchitecture.md)
- [Turn Slack feedback into PRs and debug infra](./turn-slack-feedback-into-prs-and-debug-infra.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
