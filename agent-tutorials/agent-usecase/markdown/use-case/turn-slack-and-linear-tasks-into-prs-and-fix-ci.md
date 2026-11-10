---
title: "Turn Slack and Linear tasks into PRs and fix CI"
slug: "turn-slack-and-linear-tasks-into-prs-and-fix-ci"
summary: "Cognition staff assign Devin work in Slack or Linear; it posts PRs, fixes bugs flagged by review bots and works CI and lint failures until checks pass."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "nader.substack.com"
source_date: "Undated"
source_url: "https://nader.substack.com/p/how-cognition-uses-devin-to-build"
fetched_from: "https://agentusecases.ai/use-case/turn-slack-and-linear-tasks-into-prs-and-fix-ci"
---

# Turn Slack and Linear tasks into PRs and fix CI

> Cognition staff assign Devin work in Slack or Linear; it posts PRs, fixes bugs flagged by review bots and works CI and lint failures until checks pass.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** nader.substack.com · Undated

## What they did

Cognition connects its repos to Devin, and staff tag it in Slack or on Linear/Jira tickets, with attachments if needed. Devin searches the codebase, plans, and posts a PR with a Devin Review link. If Devin Review or a GitHub bot flags bugs, Autofix patches the PR. Devin also keeps working CI and lint failures until all checks pass. Humans review the PRs.

## How it went

Cognition merged 659 Devin PRs in one week, up from 154 in its best 2025 week. The source gives no failure rates, and says complex work should be split into small tasks.

## Worth knowing

Success scales with specificity: well-scoped tasks with clear criteria work best, and anything needing heavy testing needs verification mechanisms in place.

## Prompt

```text
Take the task in [Slack thread or Linear ticket link] and implement it in my repo [repo name], then open a pull request describing the change. If CI or lint checks fail, keep fixing them and pushing until every check passes, and stop there. Pause and show me the PR summary before requesting reviewers or merging anything.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Rewrite a README after a rearchitecture](./rewrite-a-readme-after-a-rearchitecture.md)
- [Turn Slack feedback into PRs and debug infra](./turn-slack-feedback-into-prs-and-debug-infra.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
