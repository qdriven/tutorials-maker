---
title: "Get automated code review on your own pull requests"
slug: "get-automated-code-review-on-your-own-pull-requests"
summary: "A user used Copilot code review on PRs in their private repo, but reviews hung for hours and ended in errors."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "github.com"
source_date: "Undated"
source_url: "https://github.com/orgs/community/discussions/190036"
fetched_from: "https://agentusecases.ai/use-case/get-automated-code-review-on-your-own-pull-requests"
---

# Get automated code review on your own pull requests

> A user used Copilot code review on PRs in their private repo, but reviews hung for hours and ended in errors.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** github.com · Undated

## What they did

The user paid for an individual Copilot subscription and had Copilot review PRs they opened against their own private repo. It worked at first, then failed about half the time and later over 90%. Runners hung for up to 6 hours. Commenters suggested checking the repo contents, cancelling stuck jobs, and testing another repo.

## How it went

The cause turned out to be a 20-megabyte binary disk image checked into the repo. After the user deleted it, reviews worked again. Copilot gave no error naming the file.

## Worth knowing

Look for large binary files committed to the repo if reviews hang. The user also found that cancelling stuck runs in Actions sometimes made them produce output anyway.

## Prompt

```text
Please review my pull request [PR number] in [owner/repo] as a code reviewer. Leave inline comments on bugs, risky changes, missing tests, and unclear naming, and finish with a short summary of the most important things to fix. If the review can't complete, tell me the error so I can retry instead of leaving it hanging.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Build a full-stack project from scratch in Copilot agent mode](./build-a-full-stack-project-from-scratch-in-copilot-agent-mod.md)
- [Break development work into phases for Copilot](./break-development-work-into-phases-for-copilot.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a full CRM with email, video and calendar](./build-a-full-crm-with-email-video-and-calendar.md)
- [Build an RFP analysis tool](./build-an-rfp-analysis-tool.md)
