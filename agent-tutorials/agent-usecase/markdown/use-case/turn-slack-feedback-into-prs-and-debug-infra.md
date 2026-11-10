---
title: "Turn Slack feedback into PRs and debug infra"
slug: "turn-slack-feedback-into-prs-and-debug-infra"
summary: "Sid Nanda's company uses Devin in Slack to triage feedback, turn user issues into PRs, debug async flows and infra read-only, and let non-technical staff coauthor PRs."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "X"
source_date: "Sep 30, 2026"
source_url: "https://x.com/sidstronaut/status/2105417679691485630"
fetched_from: "https://agentusecases.ai/use-case/turn-slack-feedback-into-prs-and-debug-infra"
---

# Turn Slack feedback into PRs and debug infra

> Sid Nanda's company uses Devin in Slack to triage feedback, turn user issues into PRs, debug async flows and infra read-only, and let non-technical staff coauthor PRs.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** X · Sep 30, 2026

## What they did

At Sid's last company a dedicated Slack feedback channel fed every user issue or request to Devin. Given read-only access, Devin triaged messages, let users chat directly with it to turn issues into PRs, and debugged async flows or infra on its own. Engineers only pressed merge; non-technical staff coauthored PRs while Sid babysat threads without local setups.

## How it went

Sid ranked top 200 global Devin users. Time-to-value was strong enough to justify premiums despite high cost for Devin Review, which caught good bugs.

## Worth knowing

Expensive but time to value was awesome so we just paid the premiums.

## Prompt

```text
Read the feedback in [Slack channel] from the last [timeframe], group it into bugs and requests, and pick the top [number] issues you can fix in [repo]. Open a pull request for each, and for any production debugging use read-only access. Show me your triage list and the PRs before posting replies or merging.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Explore code to write technical documentation](./explore-code-to-write-technical-documentation.md)
- [Test features on screen and merge fixed PRs](./test-features-on-screen-and-merge-fixed-prs.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
