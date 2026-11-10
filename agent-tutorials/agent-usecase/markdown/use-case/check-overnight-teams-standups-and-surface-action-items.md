---
title: "Check overnight Teams standups and surface action items"
slug: "check-overnight-teams-standups-and-surface-action-items"
summary: "A Microsoft Scout heartbeat checks the author's Teams stand-up channels for overnight activity and flags what needs action, switched on during active sprints."
category: "Work & Operations"
agents:
  - name: "Microsoft Scout"
    slug: "microsoft-scout"
source_platform: "aguidetocloud.com"
source_date: "Undated"
source_url: "https://www.aguidetocloud.com/blog/microsoft-scout-automations-memory-heartbeats/"
fetched_from: "https://agentusecases.ai/use-case/check-overnight-teams-standups-and-surface-action-items"
---

# Check overnight Teams standups and surface action items

> A Microsoft Scout heartbeat checks the author's Teams stand-up channels for overnight activity and flags what needs action, switched on during active sprints.

**Category:** Work & Operations  
**Agent:** Microsoft Scout  
**Source:** aguidetocloud.com · Undated

## What they did

The author set up a Scout heartbeat that wakes every 30 minutes inside an 8am–6pm work-hours window and runs one stored prompt, "check all my standups". The prompt pulls overnight activity from their Teams stand-up channels and flags anything needing action. They switch it on during active sprints and off the rest of the time.

## How it went

The source gives no measured results. The heartbeat runs silently when nothing needs attention, and otherwise shows a notification or Teams message the next time the author returns.

## Worth knowing

Heartbeats only fire while the device is awake and you're signed in, so disable OS sleep if you want it running while you're away. Admins can also disable heartbeats by policy.

## Prompt

```text
Every weekday morning at [time, e.g. 8:00 AM] during active sprints, check my Teams stand-up channels [channel names] for messages posted since [end of my last workday]. Give me a short summary of anything that needs my action, such as questions for me, blockers, @mentions and deadline changes, with who asked and a link to each message. Do not reply or post in any channel; just show me the list, and if there is no overnight activity, say so.
```

## Related use cases

- [Clear leftover installers and fetch a YouTube transcript](./clear-leftover-installers-and-fetch-a-youtube-transcript.md)
- [Build a slide deck from a single prompt](./build-a-slide-deck-from-a-single-prompt.md)
- [Run builds, tests and PR creation with shell commands](./run-builds-tests-and-pr-creation-with-shell-commands.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
