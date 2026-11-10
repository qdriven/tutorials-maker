---
title: "Test features on screen and merge fixed PRs"
slug: "test-features-on-screen-and-merge-fixed-prs"
summary: "Ryan Carson uses Devin's Test App feature to record and narrate feature clicks, fix bugs, and merge PRs with a !land command."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "X"
source_date: "Apr 25, 2026"
source_url: "https://x.com/ryancarson/status/2048139603220091222"
fetched_from: "https://agentusecases.ai/use-case/test-features-on-screen-and-merge-fixed-prs"
---

# Test features on screen and merge fixed PRs

> Ryan Carson uses Devin's Test App feature to record and narrate feature clicks, fix bugs, and merge PRs with a !land command.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** X · Apr 25, 2026

## What they did

Ryan Carson gives DevinAI access to his app via the Test App feature. The agent screen-records and narrates its own clicks through the feature, identifies bugs from those tests, fixes them in the code, and prepares a PR. He then types !land to trigger the agent to review findings, apply fixes, and merge to main.

## How it went

Shipping velocity and dev happiness increased drastically with the cloud VMs and gpt-5.5.

## Prompt

```text
Check out the pull request [PR link] for [repo], run the app, and click through the new feature [feature description] while recording the screen and narrating what you see. If you find bugs, fix them and push to the branch. Show me the recording and summary, and wait for my go-ahead before merging.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Explore code to write technical documentation](./explore-code-to-write-technical-documentation.md)
- [Turn Slack feedback into PRs and debug infra](./turn-slack-feedback-into-prs-and-debug-infra.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
