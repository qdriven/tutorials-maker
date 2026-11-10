---
title: "Run scheduled GTM, research and dev loops with an agent"
slug: "run-scheduled-gtm-research-and-dev-loops-with-an-agent"
summary: "A user has Hermes Agent run scheduled tasks for go-to-market, research and autonomous dev loops, while Claude files GitHub issues that Opencode picks up on a schedule."
category: "Work & Operations"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
  - name: "Claude"
    slug: "claude"
source_platform: "HN"
source_date: "Nov 5, 2026"
source_url: "https://news.ycombinator.com/item?id=50373974"
fetched_from: "https://agentusecases.ai/use-case/run-scheduled-gtm-research-and-dev-loops-with-an-agent"
---

# Run scheduled GTM, research and dev loops with an agent

> A user has Hermes Agent run scheduled tasks for go-to-market, research and autonomous dev loops, while Claude files GitHub issues that Opencode picks up on a schedule.

**Category:** Work & Operations  
**Agent:** Hermes Agent, Claude  
**Source:** HN · Nov 5, 2026

## What they did

The commenter splits work across tools. Claude (Opus) does the strategizing and drops GitHub issues, which Opencode, mostly running on Deepseek, picks up on a schedule. Hermes Agent runs many scheduled tasks covering go-to-market, research and dev loops, and the dev loop builds future projects on its own. For hands-on work they use Orca Dev.

## How it went

Hermes has become a core tool, and the issue-to-Opencode handoff is described as simple and resilient. The same work in Openclaw spiraled and crashed after about a week, so they dropped it.

## Worth knowing

Stated spend is Opencode Go $40, Claude $20, and $0-100 on the Deepseek API, depending on usage.

## Prompt

```text
Set up scheduled jobs for me: every [weekday morning] at [time], research [topic, competitors, or target accounts] and save a short summary with source links to [folder or document]. Also, every [interval], check [GitHub repo] for open issues labeled [label] and work on the oldest one on a new branch, opening a pull request without merging it. Start by showing me the schedule and the steps for each job, and wait for my approval before turning anything on.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Triage support emails and draft refund-policy replies](./triage-support-emails-and-draft-refund-policy-replies.md)
- [Run a 24/7 local agent that curates news digests](./run-a-24-7-local-agent-that-curates-news-digests.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Speed up multifamily deal research and property summaries](./speed-up-multifamily-deal-research-and-property-summaries.md)
- [Answer patient enquiries for a clinic by chat](./answer-patient-enquiries-for-a-clinic-by-chat.md)
