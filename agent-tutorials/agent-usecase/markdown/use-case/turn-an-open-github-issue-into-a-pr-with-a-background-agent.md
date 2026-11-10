---
title: "Turn an open GitHub issue into a PR with a background agent"
slug: "turn-an-open-github-issue-into-a-pr-with-a-background-agent"
summary: "A developer pointed a Cursor background agent at an open issue in a Terraform repo; it opened a PR in about 3 minutes, though the PR description and title needed fixing."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "medium.com"
source_date: "Undated"
source_url: "https://medium.com/@lgallard/exploring-cursor-background-agents-a-hands-on-experience-15555d206a18"
fetched_from: "https://agentusecases.ai/use-case/turn-an-open-github-issue-into-a-pr-with-a-background-agent"
---

# Turn an open GitHub issue into a PR with a background agent

> A developer pointed a Cursor background agent at an open issue in a Terraform repo; it opened a PR in about 3 minutes, though the PR description and title needed fixing.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** medium.com · Undated

## What they did

The author turned off Cursor's privacy mode, which the preview requires. He then set up a background-agent machine for his terraform-aws-ecr repo, using Cursor's own interface to check the linters and tools and to fix Python environment problems. Issues had been created earlier through the GitHub MCP server. He pointed the agent at issue #33 and accepted its offer to open a PR.

## How it went

The agent finished in about 3 minutes and its code changes were solid. The PR description was incomplete and the title didn't follow the release-please format, so the release PR never triggered. He filled in the description with Copilot's summary.

## Worth knowing

The test cost $4.63 for one simple PR, because background agents only use MAX models for now. You also have to set a usage-based spending limit (he set $20).

## Prompt

```text
Open GitHub issue [issue number or link] in [repo name] and use a background agent to implement a fix on a new branch. Run the existing tests or linters for [language/tool, e.g. Terraform validate] and open a pull request when they pass. Write a clear PR title and a description that links the issue and summarizes what changed and why. Stop once the PR is open and show me the link; do not merge anything.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Grade Cursor on a real data science project](./grade-cursor-on-a-real-data-science-project.md)
- [Build an invitation card website purely by prompting](./build-an-invitation-card-website-purely-by-prompting.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build custom real estate tools for offers and deal tracking](./build-custom-real-estate-tools-for-offers-and-deal-tracking.md)
- [Plan with PRDs and delegate tasks to cheaper agents](./plan-with-prds-and-delegate-tasks-to-cheaper-agents.md)
