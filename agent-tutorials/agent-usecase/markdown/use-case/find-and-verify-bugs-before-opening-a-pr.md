---
title: "Find and verify bugs before opening a PR"
slug: "find-and-verify-bugs-before-opening-a-pr"
summary: "A tool-using agent loop runs a finder pass to list bugs in code or prose, then a verifier pass tries to prove or disprove them before returning results."
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Bluesky"
source_date: "Nov 5, 2026"
source_url: "https://bsky.app/profile/thebadcode.com/post/3mzlrr2qrrk2j"
fetched_from: "https://agentusecases.ai/use-case/find-and-verify-bugs-before-opening-a-pr"
---

# Find and verify bugs before opening a PR

> A tool-using agent loop runs a finder pass to list bugs in code or prose, then a verifier pass tries to prove or disprove them before returning results.

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent  
**Source:** Bluesky · Nov 5, 2026

## What they did

The tool, called roast, is an agentic loop that uses tools and makes two separate passes over code or prose before a PR is opened. A finder pass looks for bugs and outputs a structured list of issues. A verifier pass then tries to prove or disprove each item. Only then are results returned to a human or to a harness.

## How it went

The post is a short announcement. It gives no results, numbers, or examples of bugs caught, and it says nothing about false-positive rates.

## Prompt

```text
In my repo at [path or repo name], review the changes in [branch or PR] and run two passes. First, list every possible bug you can find. Second, act as a skeptical verifier: for each suspected bug, try to prove or disprove it by reading the code and running tests or small scripts. Give me a final list of only the confirmed bugs with file, line, evidence, and a suggested fix, and don't change any files until I approve.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a searchable map of funded companies](./build-a-searchable-map-of-funded-companies.md)
- [Review GitHub pull requests automatically](./review-github-pull-requests-automatically.md)
- [Build a multi-tenant SaaS with an agent](./build-a-multi-tenant-saas-with-an-agent.md)
- [Plan with PRDs and delegate tasks to cheaper agents](./plan-with-prds-and-delegate-tasks-to-cheaper-agents.md)
- [Review agent work plans and track user intent logs](./review-agent-work-plans-and-track-user-intent-logs.md)
