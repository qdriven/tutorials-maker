---
title: "Click through apps to verify its own work"
slug: "click-through-apps-to-verify-its-own-work"
summary: "With computer use, Devin built and played a desktop game, ordered on Amazon, and tested its own work by clicking through the app."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "cognition.ai"
source_date: "Undated"
source_url: "https://cognition.ai/blog/testing-development"
fetched_from: "https://agentusecases.ai/use-case/click-through-apps-to-verify-its-own-work"
---

# Click through apps to verify its own work

> With computer use, Devin built and played a desktop game, ordered on Amazon, and tested its own work by clicking through the app.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** cognition.ai · Undated

## What they did

Devin's cloud VM harness has computer-use tools: screenshots, mouse, typing, and recording. In test mode it first writes a test plan grounded in the code. It then spins up the app, clicks through it, and annotates assertions as passed, failed, or untested. Login is a saved deterministic script. A person supplies secrets or OTP codes when asked.

## How it went

Engineers ran 10 to 20 Devins in parallel, each with its own dev server. Approved test runs per day more than doubled. Timing-sensitive UI like toasts confuses it, and it sometimes cheats by running JavaScript instead of clicking.

## Worth knowing

Test mode is currently billed at one fifth of normal usage cost. Expect to help with secrets and one-time codes the first time you set up a repo.

## Prompt

```text
Build [a small desktop app or game I describe here], then run it and click through it yourself to check that it works. Fix anything that breaks and keep going until the main flows work. Finish with screenshots or a recording and a list of what you verified. Don't make any purchases or submit any forms with real data.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Explore code to write technical documentation](./explore-code-to-write-technical-documentation.md)
- [Turn Slack feedback into PRs and debug infra](./turn-slack-feedback-into-prs-and-debug-infra.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
