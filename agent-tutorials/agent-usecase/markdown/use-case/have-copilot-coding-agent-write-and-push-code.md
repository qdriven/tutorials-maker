---
title: "Have Copilot coding agent write and push code"
slug: "have-copilot-coding-agent-write-and-push-code"
summary: "A developer found the agent good at context and code, but it pushed to a branch leaving main empty and spent hours checking after being told to proceed."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "github.com"
source_date: "Aug 21, 2025"
source_url: "https://github.com/orgs/community/discussions/170528"
fetched_from: "https://agentusecases.ai/use-case/have-copilot-coding-agent-write-and-push-code"
---

# Have Copilot coding agent write and push code

> A developer found the agent good at context and code, but it pushed to a branch leaving main empty and spent hours checking after being told to proceed.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** github.com · Aug 21, 2025

## What they did

This is a GitHub community feedback thread on the Copilot coding agent, not a single walkthrough. The original poster assigned issues to the agent and watched it work. A commenter, BaljeetCyber, told it to push finished code to the repo, then told it to proceed with full setup without asking again.

## How it went

The original poster found the agent good at context and code, but its first PRs were weak without instructions, and it couldn't read attachments or org PR links. The commenter says it pushed to a branch, left main empty, then spent hours checking empty folders.

## Worth knowing

Set up Copilot instructions before the first assignment, and paste attachment contents straight into the issue, since the agent couldn't read attached files.

## Prompt

```text
In [owner/repo], implement [feature or task]. Work on a new branch named [branch-name], not main, and before pushing anything, show me the branch you'll push to and a summary of the changes. Once I approve, push and open a pull request, then stop and tell me what you pushed and where.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Add a filtered report page to a Razor Pages app](./add-a-filtered-report-page-to-a-razor-pages-app.md)
- [Let Copilot Agent Mode handle coding, then constrain it](./let-copilot-agent-mode-handle-coding-then-constrain-it.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a name-and-face quiz site from a spreadsheet](./build-a-name-and-face-quiz-site-from-a-spreadsheet.md)
- [Port a Chrome extension to Safari](./port-a-chrome-extension-to-safari.md)
