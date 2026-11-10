---
title: "Ask a coding agent to fix an existing PR"
slug: "ask-a-coding-agent-to-fix-an-existing-pr"
summary: "A developer asked @copilot to fix an existing PR; it opened a new PR instead of pushing in place, later partly fixed except for fork branches."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "github.com"
source_date: "Feb 26, 2026"
source_url: "https://github.com/orgs/community/discussions/188127"
fetched_from: "https://agentusecases.ai/use-case/ask-a-coding-agent-to-fix-an-existing-pr"
---

# Ask a coding agent to fix an existing PR

> A developer asked @copilot to fix an existing PR; it opened a new PR instead of pushing in place, later partly fixed except for fork branches.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** github.com · Feb 26, 2026

## What they did

The developer opened a PR on a repo and saw Copilot's prompt to mention @copilot in a comment to make changes. He mentioned it and asked for a fix to his own PR. He expected a push to that branch. Copilot opened a separate new PR, so he would have had to merge its changes back himself.

## How it went

On March 24, 2026 GitHub shipped a changelog entry letting Copilot change any PR. Stephen Toub noted it still fails when the source branch is in a fork, which covers nearly all of dotnet/runtime's human-authored PRs.

## Worth knowing

Check whether your PRs come from fork branches. Copilot still can't edit those, and GitHub's announcement was later edited to say fork PRs aren't supported.

## Prompt

```text
@copilot please fix pull request [PR number] in [owner/repo]: [describe the problem, e.g. the failing lint check and the review comment about the null case]. Push your fix to the existing PR branch if you can, rather than opening a new PR. If you can't push to this branch, because it's a fork for example, tell me why and say what you would change instead. Stop once the fix is pushed or you've explained the blocker.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Build a full-stack project from scratch in Copilot agent mode](./build-a-full-stack-project-from-scratch-in-copilot-agent-mod.md)
- [Break development work into phases for Copilot](./break-development-work-into-phases-for-copilot.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a full CRM with email, video and calendar](./build-a-full-crm-with-email-video-and-calendar.md)
- [Build an RFP analysis tool](./build-an-rfp-analysis-tool.md)
