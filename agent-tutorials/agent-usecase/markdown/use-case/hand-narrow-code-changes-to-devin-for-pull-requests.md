---
title: "Hand narrow code changes to Devin for pull requests"
slug: "hand-narrow-code-changes-to-devin-for-pull-requests"
summary: "A team used Devin for a month on small fixes like chart formatting and API edge cases, with tests and PRs; a complex full-stack task went poorly."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "frontierai.substack.com"
source_date: "Undated"
source_url: "https://frontierai.substack.com/p/one-month-of-using-devin"
fetched_from: "https://agentusecases.ai/use-case/hand-narrow-code-changes-to-devin-for-pull-requests"
---

# Hand narrow code changes to Devin for pull requests

> A team used Devin for a month on small fixes like chart formatting and API edge cases, with tests and PRs; a complex full-stack task went poorly.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** frontierai.substack.com · Undated

## What they did

The RunLLM team connected Devin to their GitHub repo. It scanned the code and tried the setup steps. They typed short task descriptions, such as a pie chart format fix, an API edge case, and a default update schedule. Devin planned, edited, ran linters and tests, and opened a PR. The team spent about five minutes testing each result, and PR comments could steer further changes.

## How it went

Small single-component tasks took a minute or two to write up and five minutes to test, against roughly an hour by hand. A full-stack task with a new table, API call and button failed, and the team rewrote it themselves.

## Worth knowing

Small tasks cost 1-5 ACUs ($2-10) at $500 for 250 ACUs. The three larger tasks averaged about 20 ACUs, and two of them gave nothing usable.

## Prompt

```text
In the repo [repo URL], fix [small, well-defined issue, e.g. chart axis formatting or an API edge case with null input]. Add or update tests, make sure they pass, and open a pull request with a clear description of the change. Keep the scope narrow and don't refactor unrelated code; stop and ask me if the task looks bigger than described.
```

## Related use cases

- [Add a third-party API integration via Devin PR](./add-a-third-party-api-integration-via-devin-pr.md)
- [Rewrite a README after a rearchitecture](./rewrite-a-readme-after-a-rearchitecture.md)
- [Turn Slack feedback into PRs and debug infra](./turn-slack-feedback-into-prs-and-debug-infra.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
