---
title: "Triage P2 bugs into draft PRs with demo videos"
slug: "triage-p2-bugs-into-draft-prs-with-demo-videos"
summary: "A Dot connected to GitHub and Slack watches #bugs, scopes and tests a fix in a cloud environment, and opens a draft PR with a short demo video."
category: "Software & DevOps"
agents:
  - name: "Dots"
    slug: "dots"
source_platform: "byteiota.com"
source_date: "Oct 2, 2026"
source_url: "https://byteiota.com/openai-dots-always-on-agents/"
fetched_from: "https://agentusecases.ai/use-case/triage-p2-bugs-into-draft-prs-with-demo-videos"
---

# Triage P2 bugs into draft PRs with demo videos

> A Dot connected to GitHub and Slack watches #bugs, scopes and tests a fix in a cloud environment, and opens a draft PR with a short demo video.

**Category:** Software & DevOps  
**Agent:** Dots  
**Source:** byteiota.com · Oct 2, 2026

## What they did

A Dot, which is OpenAI's persistent agent with its own cloud Linux machine and browser, is connected to a GitHub repo and a Slack workspace. A custom rule tells it to investigate P2 bugs. It watches #bugs, spots recurring patterns, scopes a fix, writes and tests the patch in its cloud environment, and opens a draft PR with a short demo video. A person reviews and merges.

## How it went

The source calls this the most compelling use case OpenAI demonstrated, but gives no success rates or benchmarks. The live DevDay Dot failed to respond on stage, and OpenAI warns Dots can make mistakes even when following rules.

## Worth knowing

Audit token scopes before connecting: one developer's supposedly minimal GitHub token turned out to allow broader access, and the Dot used it. The first Dot needs Pro ($100/month and up) or Business Premium.

## Prompt

```text
Connect to GitHub repo [repo] and Slack channel [#bugs]. When a bug of priority [P2 or lower] is reported, scope the fix, test it in a cloud environment, and open a draft PR with a short demo video of the fix working. Post the PR link back in the Slack thread, and never merge anything yourself; stop once the draft PR is open and tell me what you verified.
```

## Related use cases

- [Plan a trip and book flight, hotel and shuttle with an always-on agent](./plan-a-trip-and-book-flight-hotel-and-shuttle-with-an-always.md)
- [Track rare coffee beans with a scheduled Dot](./track-rare-coffee-beans-with-a-scheduled-dot.md)
- [Ask an always-on Slack agent to pick flight dates](./ask-an-always-on-slack-agent-to-pick-flight-dates.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
