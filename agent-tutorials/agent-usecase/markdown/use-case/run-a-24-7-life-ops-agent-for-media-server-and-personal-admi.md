---
title: "Run a 24/7 life-ops agent for media server and personal admin"
slug: "run-a-24-7-life-ops-agent-for-media-server-and-personal-admi"
summary: "A self-hosted agent on a Mac mini manages a media stack, Home Assistant, downloads, concert alerts, trip planning, fundraising, genealogy research and RSS feeds."
category: "Life Admin & Home"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "Reddit"
source_date: "Jul 15, 2026"
source_url: "https://www.reddit.com/r/openclaw/comments/1ufz29k/247_agent_to_manage_media_server_and_personal"
fetched_from: "https://agentusecases.ai/use-case/run-a-24-7-life-ops-agent-for-media-server-and-personal-admi"
---

# Run a 24/7 life-ops agent for media server and personal admin

> A self-hosted agent on a Mac mini manages a media stack, Home Assistant, downloads, concert alerts, trip planning, fundraising, genealogy research and RSS feeds.

**Category:** Life Admin & Home  
**Agent:** OpenClaw, Hermes Agent  
**Source:** Reddit · Jul 15, 2026

## What they did

The poster ran a self-hosted “life-ops” agent on a Mac mini that handled a media stack on an Unraid box, Home Assistant, archive.org downloads, and assorted personal admin jobs. They talked to it through a private Discord server, got high-priority alerts in Telegram, and aimed to have it work a ranked project list continuously while only escalating real decisions onto a separate “waiting on me” list.

## How it went

It was useful enough to run for months, but the setup drifted: tasks vanished, completed items reappeared, jobs were marked done incorrectly, and Discord conversations got laggy and forgetful. Those reliability issues pushed the poster to rebuild the system around a single source of truth and external checks before anything counts as done.

## Worth knowing

It took a few weeks of trial and error to reach the initial workflow, and the main catch was that without one underlying record, the agent’s tracking lists kept diverging.

## Prompt

```text
Act as my always-on home and life admin agent on this machine. Start with [media server and downloads, Home Assistant, concert alerts for [artists], RSS feeds on [topics]], and send me a short daily summary of what you did and anything needing attention. Finished means each job runs on a schedule and the summary arrives at [email or chat app]. Ask me before spending money, deleting files, or sending messages to other people.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Automate SaaS bookkeeping and reconciliation in Zoho Books](./automate-saas-bookkeeping-and-reconciliation-in-zoho-books.md)
- [Drive desktop apps with an agent to move files](./drive-desktop-apps-with-an-agent-to-move-files.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Run personal life admin with Claude Code skills](./run-personal-life-admin-with-claude-code-skills.md)
