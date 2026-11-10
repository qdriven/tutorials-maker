---
title: "Fix Snyk vulnerabilities and open PRs automatically"
slug: "fix-snyk-vulnerabilities-and-open-prs-automatically"
summary: "A developer built a Claude Code/Cursor workflow that reads vulnerability tickets, updates dependencies and lockfiles, opens PRs and monitors CI, with merging kept manual."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Cursor"
    slug: "cursor"
source_platform: "HN"
source_date: "Nov 2, 2026"
source_url: "https://news.ycombinator.com/item?id=50339272"
fetched_from: "https://agentusecases.ai/use-case/fix-snyk-vulnerabilities-and-open-prs-automatically"
---

# Fix Snyk vulnerabilities and open PRs automatically

> A developer built a Claude Code/Cursor workflow that reads vulnerability tickets, updates dependencies and lockfiles, opens PRs and monitors CI, with merging kept manual.

**Category:** Software & DevOps  
**Agent:** Claude Code, Cursor  
**Source:** HN · Nov 2, 2026

## What they did

At CertifyOS, the developer built a Claude Code/Cursor workflow for Snyk vulnerability tickets. It reads each ticket, identifies the dependency fix, updates the lockfiles, opens a PR and monitors CI. Merging stays manual, so a person reviews and approves every change.

## How it went

Weekly remediation effort dropped from 6–7 hours to around 1–1.5 hours, according to the developer. The source is a job-seeking post, so there are no further details on failures or how the workflow is built.

## Worth knowing

Keeping merges manual left a human check on every automated dependency change, and the time savings came with that check in place.

## Prompt

```text
Read the open vulnerability tickets in [Snyk project or ticket queue] for the repo at [repo path]. For each one, update the affected dependency and lockfile, run [test command], and open a separate pull request describing the fix, then watch CI and report any failures. Do not merge anything, and show me the list of planned PRs before you push or open the first one.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Surface unanswered emails from the past week](./surface-unanswered-emails-from-the-past-week.md)
- [Book the best-priced flight and later refund it](./book-the-best-priced-flight-and-later-refund-it.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a Chrome extension for presenting webinars](./build-a-chrome-extension-for-presenting-webinars.md)
- [Find errors in production agent traces](./find-errors-in-production-agent-traces.md)
