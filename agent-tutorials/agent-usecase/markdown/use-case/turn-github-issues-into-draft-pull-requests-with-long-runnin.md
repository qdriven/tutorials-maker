---
title: "Turn GitHub issues into draft pull requests with long-running agents"
slug: "turn-github-issues-into-draft-pull-requests-with-long-runnin"
summary: "The author used Dots for read-heavy long-horizon tasks like reading GitHub issues and making PRs, which were typically poor but gave a starting point."
category: "Software & DevOps"
agents:
  - name: "Dots"
    slug: "dots"
  - name: "Codex"
    slug: "codex"
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "HN"
source_date: "Oct 21, 2026"
source_url: "https://news.ycombinator.com/item?id=50187293"
fetched_from: "https://agentusecases.ai/use-case/turn-github-issues-into-draft-pull-requests-with-long-runnin"
---

# Turn GitHub issues into draft pull requests with long-running agents

> The author used Dots for read-heavy long-horizon tasks like reading GitHub issues and making PRs, which were typically poor but gave a starting point.

**Category:** Software & DevOps  
**Agent:** Dots, Codex, Claude Code  
**Source:** HN · Oct 21, 2026

## What they did

The commenter used Dots, a long-running agent tool, alongside their Codex usage for read-heavy, long-horizon tasks. The agent read GitHub issues and drafted pull requests from them. The source gives no further setup detail, and no step where a person intervened is described.

## How it went

The pull requests were typically pretty bad, but they gave a starting point. The commenter got much better real-world output from a Claude Code style approach with a human in the loop.

## Worth knowing

Running it against regular plan limits was a dealbreaker for the author, who also wanted more control over the context window when the agent drifts off task.

## Prompt

```text
Read the open issues in my GitHub repo [repo URL] and pick the [number] most well-defined ones labeled [label or topic]. For each, make a branch and prepare a draft pull request with a first-pass fix, tests if the repo has them, and a short description of what you did and what you're unsure about. Don't merge or push anything beyond draft PRs, and show me the list of PRs you plan to open before you open them.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Email scheduled project summaries with Codex](./email-scheduled-project-summaries-with-codex.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Click through apps to verify its own work](./click-through-apps-to-verify-its-own-work.md)
- [Build a dramatic digital envelope app for asking friends for money](./build-a-dramatic-digital-envelope-app-for-asking-friends-for.md)
