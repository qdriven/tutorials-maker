---
title: "Fix and resubmit a rejected app remotely"
slug: "fix-and-resubmit-a-rejected-app-remotely"
summary: "MaakCode had a dot investigate a rejected app submission, fix the issue, test, open a PR and resubmit."
category: "Software & DevOps"
agents:
  - name: "Dots"
    slug: "dots"
source_platform: "X"
source_date: "Oct 3, 2026"
source_url: "https://x.com/maakcode/status/2106406113268891912"
fetched_from: "https://agentusecases.ai/use-case/fix-and-resubmit-a-rejected-app-remotely"
---

# Fix and resubmit a rejected app remotely

> MaakCode had a dot investigate a rejected app submission, fix the issue, test, open a PR and resubmit.

**Category:** Software & DevOps  
**Agent:** Dots  
**Source:** X · Oct 3, 2026

## What they did

User asked their dot to investigate the rejected app submission. The agent traced the crash to missing Scene lifecycle support required for iOS/iPadOS 27 SDK builds, applied the Expo patch and configuration fix itself, verified the release build and iPad simulator launch, then uploaded the new build after opening a PR. User managed the entire process remotely via conversation.

## How it went

The dot completed the investigation, fixes, testing, PR, and resubmission. No further details on approval or issues.

## Prompt

```text
A mobile app I built, [app name], was rejected by [App Store / Google Play] with this message: [paste rejection reason]. Read the rejection, find the cause in my repo [repo link], fix it, run the tests, and open a pull request describing the change. Stop once the PR is open and show me the PR and the resubmission steps before you resubmit anything.
```

## Related use cases

- [Plan a trip and book flight, hotel and shuttle with an always-on agent](./plan-a-trip-and-book-flight-hotel-and-shuttle-with-an-always.md)
- [Track rare coffee beans with a scheduled Dot](./track-rare-coffee-beans-with-a-scheduled-dot.md)
- [Ask an always-on Slack agent to pick flight dates](./ask-an-always-on-slack-agent-to-pick-flight-dates.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
