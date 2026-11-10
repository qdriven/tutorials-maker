---
title: "Extract action items from Teams and schedule meetings"
slug: "extract-action-items-from-teams-and-schedule-meetings"
summary: "An early Scout user had it summarize Teams threads across tenants, find a buried meeting request, check calendars, schedule it and send confirmation."
category: "Work & Operations"
agents:
  - name: "Microsoft Scout"
    slug: "microsoft-scout"
source_platform: "copilotatwork.substack.com"
source_date: "Undated"
source_url: "https://copilotatwork.substack.com/p/microsoft-scout-is-not-just-another"
fetched_from: "https://agentusecases.ai/use-case/extract-action-items-from-teams-and-schedule-meetings"
---

# Extract action items from Teams and schedule meetings

> An early Scout user had it summarize Teams threads across tenants, find a buried meeting request, check calendars, schedule it and send confirmation.

**Category:** Work & Operations  
**Agent:** Microsoft Scout  
**Source:** copilotatwork.substack.com · Undated

## What they did

Robbert gave Scout, Microsoft's desktop personal agent, one instruction. It was to summarize Teams conversations across multiple tenants, list pending action items, and deal with a meeting request buried in a thread. Scout read the messages and checked both parties' calendar availability. It then scheduled the appointment and sent a Teams confirmation.

## How it went

The source says no manual steps were needed after the initial instruction. It gives no timings or counts for this case.

## Worth knowing

Scout asks for confirmation before significant actions by default. The desktop app is version 0.22, and automations pause when the machine sleeps.

## Prompt

```text
Go through my Teams threads in [channels or tenants] from the last [time period] and list the action items assigned to me, with who asked and when. Find any buried request for a meeting with [person or topic], check both our calendars for a good slot, and show me the proposed invite. Wait for my OK before sending the invite or confirmation.
```

## Related use cases

- [Clear leftover installers and fetch a YouTube transcript](./clear-leftover-installers-and-fetch-a-youtube-transcript.md)
- [Lint, fix, commit and push code from the terminal](./lint-fix-commit-and-push-code-from-the-terminal.md)
- [Build dashboards and troubleshoot support cases](./build-dashboards-and-troubleshoot-support-cases.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
