---
title: "Run cron-started agents for server updates and log checks"
slug: "run-cron-started-agents-for-server-updates-and-log-checks"
summary: "Author starts coding-agent sessions from cron to keep servers updated, report vulnerabilities and check logs for intrusion, using Codex and a custom harness."
category: "Software & DevOps"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "HN"
source_date: "Nov 5, 2026"
source_url: "https://news.ycombinator.com/item?id=50378847"
fetched_from: "https://agentusecases.ai/use-case/run-cron-started-agents-for-server-updates-and-log-checks"
---

# Run cron-started agents for server updates and log checks

> Author starts coding-agent sessions from cron to keep servers updated, report vulnerabilities and check logs for intrusion, using Codex and a custom harness.

**Category:** Software & DevOps  
**Agent:** Codex  
**Source:** HN · Nov 5, 2026

## What they did

The author starts agent sessions from cron, with no agent platform, using Codex and a harness they wrote themselves. The sessions handle sysadmin work: keeping servers up to date, reporting vulnerabilities to them, and checking logs for signs of intrusion. The harness writes a plan to the filesystem, hands information to the next session and resets context.

## How it went

The source gives no results or numbers. It says only that the setup is in use, and the author wants the custom harness to eventually replace Codex because of its dependencies and supply-chain risk.

## Worth knowing

The source doesn't say how access or permissions are scoped for these cron sessions, so decide that yourself before letting an agent touch servers.

## Prompt

```text
Set up a scheduled job on my server [hostname or SSH alias] that starts you every [night at 3am] to apply pending [apt/yum] security updates, list any packages with known vulnerabilities, and scan [log paths like /var/log/auth.log] for signs of intrusion such as repeated failed logins or unfamiliar IPs. Save a short plain-text report to [path or email] and stop when it is written. Show me the cron entry and the exact update commands before you install or run anything, and never reboot or delete files without asking.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Run a solo business with a team of 16 agents](./run-a-solo-business-with-a-team-of-16-agents.md)
- [Redesign an admin feature with multiple design options](./redesign-an-admin-feature-with-multiple-design-options.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a Chrome extension for presenting webinars](./build-a-chrome-extension-for-presenting-webinars.md)
- [Find errors in production agent traces](./find-errors-in-production-agent-traces.md)
