---
title: "Update tickets and open pull requests from an execute task"
slug: "update-tickets-and-open-pull-requests-from-an-execute-task"
summary: "A developer's execute task updates the ticket, creates the pull request, and updates its description after they confirm; another user applies Copilot to code reviews and PR comments."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "Reddit"
source_date: "Oct 4, 2026"
source_url: "https://www.reddit.com/r/GithubCopilot/comments/1wfyrjy/how_do_you_guys_do_agentic_coding"
fetched_from: "https://agentusecases.ai/use-case/update-tickets-and-open-pull-requests-from-an-execute-task"
---

# Update tickets and open pull requests from an execute task

> A developer's execute task updates the ticket, creates the pull request, and updates its description after they confirm; another user applies Copilot to code reviews and PR comments.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** Reddit · Oct 4, 2026

## What they did

One commenter described a two-step setup: a skill that reads a Jira ticket written like a spec and turns it into a task plan, then an execute skill that takes that todo list and makes the code changes. They iterate on the plan with the LLM first, then the execute step prints the changes and waits for their confirmation before pushing; after approval, it updates the ticket, opens the PR, and rewrites the PR description. Another commenter said they use GitHub Copilot mainly for GitHub work like code reviews, PR comments, and repo tasks.

## How it went

The thread gives workflow details, not hard performance results. The main user said they are still keeping training wheels on and do not yet let it auto-push, and they do not fully enjoy working this way.

## Worth knowing

The catch is that this flow still pauses for human confirmation before pushing, and the person said they only might let it auto-push after more time using it.

## Prompt

```text
For my current branch on [repo name], review the changes, then update ticket [ticket ID or link] with a progress summary and draft a pull request with a clear title and description. Show me the ticket update and PR description and wait for my confirmation before posting or creating anything. After the PR is open, review it and suggest comments on anything risky or unclear.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Build a full-stack project from scratch in Copilot agent mode](./build-a-full-stack-project-from-scratch-in-copilot-agent-mod.md)
- [Break development work into phases for Copilot](./break-development-work-into-phases-for-copilot.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a full CRM with email, video and calendar](./build-a-full-crm-with-email-video-and-calendar.md)
- [Build an RFP analysis tool](./build-an-rfp-analysis-tool.md)
