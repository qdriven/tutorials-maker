---
title: "Extract automation requirements from meeting transcripts"
slug: "extract-automation-requirements-from-meeting-transcripts"
summary: "An autonomous coding agent with n8n tooling feeds a meeting transcript into Claude to extract automation requirements and help produce production-ready workflows."
category: "Work & Operations"
agents:
  - name: "Claude"
    slug: "claude"
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Jan 6, 2026"
source_url: "https://www.reddit.com/r/marketingautomation/comments/1qxn9hs/im_quitting_n8n_heres_what_im_using_instead"
fetched_from: "https://agentusecases.ai/use-case/extract-automation-requirements-from-meeting-transcripts"
---

# Extract automation requirements from meeting transcripts

> An autonomous coding agent with n8n tooling feeds a meeting transcript into Claude to extract automation requirements and help produce production-ready workflows.

**Category:** Work & Operations  
**Agent:** Claude, n8n  
**Source:** Reddit · Jan 6, 2026

## What they did

The poster records a client meeting, sends the transcript from tools like Fireflies or Otter to Claude with a prompt to extract automation requirements, then passes Claude’s structured output into Claude Code with their n8n skill files loaded. Claude Code generates the n8n workflow JSON, validates it, can read error logs and revise it, and pushes the workflow to the poster’s n8n instance through MCP; the human mainly reviews, tests, and steps in for complex debugging or visual checks.

## How it went

They say this turns meeting-to-workflow into an end-to-end pipeline and cuts a sample lead-enrichment build from 2–4 hours to about 20 minutes, with most of that time spent reviewing and testing. They also say they still use the n8n UI for production debugging, visual review, and one-off experiments.

## Worth knowing

The main catch they name is that regular Claude chat is not enough; they say Claude Code access, an n8n MCP setup, and a growing skills library are the foundation.

## Prompt

```text
Here is a transcript of a meeting about [topic or client]: [paste transcript]. Extract every task that could be automated, and for each give me the trigger, the steps, the tools involved, and any open questions. Finish with a prioritized list of the three best automations to build first and a short spec for each.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [File tenant complaints against a landlord automatically](./file-tenant-complaints-against-a-landlord-automatically.md)
- [Have Claude find a torrent and add it to qBittorrent](./have-claude-find-a-torrent-and-add-it-to-qbittorrent.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Write end-of-sprint changelogs from completed tickets](./write-end-of-sprint-changelogs-from-completed-tickets.md)
- [Build purchase orders and track payables nightly](./build-purchase-orders-and-track-payables-nightly.md)
