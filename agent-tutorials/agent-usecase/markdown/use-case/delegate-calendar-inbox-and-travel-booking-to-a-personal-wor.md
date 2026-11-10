---
title: "Delegate calendar, inbox and travel booking to a personal work agent"
slug: "delegate-calendar-inbox-and-travel-booking-to-a-personal-wor"
summary: "Authors use Cowork or Claude Code to schedule invites, triage email, book flights and hotels, pull Airtable data and scrape exhibitor lists."
category: "Work & Operations"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "technicallycurious.substack.com"
source_date: "Undated"
source_url: "https://technicallycurious.substack.com/p/create-your-personal-agent-with-claude"
fetched_from: "https://agentusecases.ai/use-case/delegate-calendar-inbox-and-travel-booking-to-a-personal-wor"
---

# Delegate calendar, inbox and travel booking to a personal work agent

> Authors use Cowork or Claude Code to schedule invites, triage email, book flights and hotels, pull Airtable data and scrape exhibitor lists.

**Category:** Work & Operations  
**Agent:** Claude Cowork, Claude Code  
**Source:** technicallycurious.substack.com · Undated

## What they did

The authors run Claude in Cowork or Claude Code and link Gmail, calendar, Airtable and other apps through Rube, a free connector service. They teach it routines as saved Skills and keep notes in markdown files. It then finds open calendar slots and sends invites, triages and archives email, books travel through a booking tool, and scrapes exhibitor lists with Firecrawl.

## How it went

The authors call the agent useful across daily workflows, data pulls and research. They give no metrics. They say Claude sometimes skips a Skill unless told to use it, and that it can make mistakes.

## Worth knowing

Needs a paid Claude plan (Pro is $20/mo). Start with drafts rather than sending, watch for prompt injection, and consider giving the agent its own limited email account.

## Prompt

```text
Act as my work assistant for this week's tasks: [list tasks such as schedule a meeting with X, triage my inbox, find flights and hotels to [city] for [dates]]. For each task, finish the prep and show me the result. Pause and show me details before sending any invite or email, or booking or paying for anything.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Track personal finances nightly from bank emails](./track-personal-finances-nightly-from-bank-emails.md)
- [Summarize Reddit threads before writing code](./summarize-reddit-threads-before-writing-code.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Delegate to-do items to AI agents](./delegate-to-do-items-to-ai-agents.md)
- [Turn receipts into CSV for bookkeeping](./turn-receipts-into-csv-for-bookkeeping.md)
