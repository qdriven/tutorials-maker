---
title: "Turn daily X bookmarks into working tech prototypes"
slug: "turn-daily-x-bookmarks-into-working-tech-prototypes"
summary: "A bot scans a Cursor employee's X bookmarks daily, picks a new technology, drafts a prompt, and on approval starts a Cursor Cloud agent to build a prototype in about 15 minutes."
category: "Software & DevOps"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
  - name: "Cursor"
    slug: "cursor"
source_platform: "X"
source_date: "Undated"
source_url: "https://x.com/mattyp/article/2087252657589412119"
fetched_from: "https://agentusecases.ai/use-case/turn-daily-x-bookmarks-into-working-tech-prototypes"
---

# Turn daily X bookmarks into working tech prototypes

> A bot scans a Cursor employee's X bookmarks daily, picks a new technology, drafts a prompt, and on approval starts a Cursor Cloud agent to build a prototype in about 15 minutes.

**Category:** Software & DevOps  
**Agent:** Grok Bot, Cursor  
**Source:** X · Undated

## What they did

The Demo Bot scans the user's X bookmarks daily, selects a new technology such as an npm package, and uses a writing skill to draft a prompt. It presents the prompt for approval; once approved, it applies a project-planning skill to launch a Cursor Cloud agent inside a tech-demos repo.

## How it went

The Cursor Cloud agent produces a working prototype inside the Cursor app after 15 minutes, which the user then binds a port to and tests via screen recordings.

## Prompt

```text
Every morning, review my saved bookmarks on [X or another bookmarking service], pick one new technology or tool I haven't tried, and draft a prompt for a small prototype that shows it off. Send me the draft and wait for my approval before doing anything else. Once I approve, start a background agent to build the prototype in [repo or language] and send me a link to the result.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Run founder-led sales with single-job bots](./run-founder-led-sales-with-single-job-bots.md)
- [Watch weekly deals and buy regular items](./watch-weekly-deals-and-buy-regular-items.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Rewrite a README after a rearchitecture](./rewrite-a-readme-after-a-rearchitecture.md)
- [Run a task-manager sub-agent with atomic commits](./run-a-task-manager-sub-agent-with-atomic-commits.md)
