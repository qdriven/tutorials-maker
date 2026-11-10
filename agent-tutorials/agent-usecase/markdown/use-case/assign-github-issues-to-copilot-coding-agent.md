---
title: "Assign GitHub issues to Copilot coding agent"
slug: "assign-github-issues-to-copilot-coding-agent"
summary: "A developer assigned a GitHub issue to Copilot and watched it work, but it started from the default branch instead of the intended feature branch."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/github/comments/1kvatij/initial_experience_with_github_coding_agent"
fetched_from: "https://agentusecases.ai/use-case/assign-github-issues-to-copilot-coding-agent"
---

# Assign GitHub issues to Copilot coding agent

> A developer assigned a GitHub issue to Copilot and watched it work, but it started from the default branch instead of the intended feature branch.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** Reddit · Undated

## What they did

The developer assigned Copilot to a GitHub issue and watched it create a new branch, open a pull request, work through the issue, run tests, and push changes on its own. They found it only worked well after rewriting the issue with very detailed instructions, then used PR comments to iterate while keeping human review, testing, and deployment decisions for themselves.

## How it went

After a few tries, Copilot successfully completed a real backlog issue, and the poster said they could hand it simpler tasks and review the PR later. The main shortcoming was that it always branched from the default branch, even when told to start from a specific feature branch.

## Worth knowing

The main catch was instruction quality: the poster said issues had to be overly descriptive and detailed before the agent performed well.

## Prompt

```text
Assign this GitHub issue to the Copilot coding agent: [issue link]. Before it starts, make sure it works from the [feature branch name] branch and not the default branch, and put that in the task instructions. When it finishes, give me a pull request against [feature branch name] with a short summary of what changed, and don't merge anything until I've reviewed it.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Iterate on tasks with Copilot CLI autopilot and fleet](./iterate-on-tasks-with-copilot-cli-autopilot-and-fleet.md)
- [Let Copilot Agent Mode handle coding, then constrain it](./let-copilot-agent-mode-handle-coding-then-constrain-it.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a name-and-face quiz site from a spreadsheet](./build-a-name-and-face-quiz-site-from-a-spreadsheet.md)
- [Port a Chrome extension to Safari](./port-a-chrome-extension-to-safari.md)
