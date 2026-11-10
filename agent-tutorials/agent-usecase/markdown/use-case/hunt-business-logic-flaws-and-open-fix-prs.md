---
title: "Hunt business-logic flaws and open fix PRs"
slug: "hunt-business-logic-flaws-and-open-fix-prs"
summary: "Parallel Devin agents each read part of a codebase, find business-logic and auth bypass flaws, confirm them in a sandbox, then open remediation PRs (vendor description)."
category: "Security, Science & Hardware"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "cognition.com"
source_date: "Undated"
source_url: "https://cognition.com/blog/introducing-devin-security-swarm"
fetched_from: "https://agentusecases.ai/use-case/hunt-business-logic-flaws-and-open-fix-prs"
---

# Hunt business-logic flaws and open fix PRs

> Parallel Devin agents each read part of a codebase, find business-logic and auth bypass flaws, confirm them in a sandbox, then open remediation PRs (vendor description).

**Category:** Security, Science & Hardware  
**Agent:** Devin  
**Source:** cognition.com · Undated

## What they did

Parallel agents each take a segment of the codebase and reason across files for business-logic flaws, chained auth bypasses and cross-service exploit paths. Devin then combines the findings into full attack paths and reproduces each one in an isolated sandbox. Once a vulnerability is confirmed, it writes the patch and opens a PR for review. Scan profiles can be generated from existing threat model documents.

## How it went

On Cognition's own 50-vulnerability benchmark, Devin Security scored 72% recall at $90.23 per run, against 68% for Claude Security at $131.87. This is a vendor benchmark, not an independent one.

## Worth knowing

The first full scan sets the baseline. Later scans cover only changed code, so cost falls over time, and batch size per profile controls depth and cost.

## Prompt

```text
Review my codebase [repo name] for business-logic flaws and authentication or authorization bypasses. Split it into parts and examine each, then try to confirm every suspected issue in a sandbox, not on production. Finish with a ranked list of confirmed findings, and open a draft pull request with a fix for each one. Do not merge anything or touch live systems.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Explore code to write technical documentation](./explore-code-to-write-technical-documentation.md)
- [Turn Slack feedback into PRs and debug infra](./turn-slack-feedback-into-prs-and-debug-infra.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Run a home robot through Claude Desktop](./run-a-home-robot-through-claude-desktop.md)
- [Sort waste using local recycling rules](./sort-waste-using-local-recycling-rules.md)
