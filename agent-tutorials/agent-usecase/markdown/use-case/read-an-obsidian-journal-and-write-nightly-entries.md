---
title: "Read an Obsidian journal and write nightly entries"
slug: "read-an-obsidian-journal-and-write-nightly-entries"
summary: "A writer connected OpenClaw to his Obsidian vault, had it read his journal, control music playback, and write its own journal entry each night in a new folder."
category: "Life Admin & Home"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "makeuseof.com"
source_date: "Undated"
source_url: "https://www.makeuseof.com/openclaw-introduction-and-review/"
fetched_from: "https://agentusecases.ai/use-case/read-an-obsidian-journal-and-write-nightly-entries"
---

# Read an Obsidian journal and write nightly entries

> A writer connected OpenClaw to his Obsidian vault, had it read his journal, control music playback, and write its own journal entry each night in a new folder.

**Category:** Life Admin & Home  
**Agent:** OpenClaw  
**Source:** makeuseof.com · Undated

## What they did

Amir Bohlooli installed OpenClaw and chatted with it through Telegram. He asked whether it could read his Obsidian. It installed obsidian-cli itself and read his whole journal. It then installed shpotify and connected to Spotify, and it played and paused tracks on request. He told it to create a vault folder and write one journal entry each night.

## How it went

The agent connected to Obsidian and Spotify within minutes, and it did start the journal. The setup failed with a small local LLM, and the agent went offline when his MacBook slept.

## Worth knowing

The agent only runs while the host machine is awake, and the default Obsidian skill depends on Homebrew, so it works best on a Mac. Windows needed a different obsidian-cli package.

## Prompt

```text
Connect to my Obsidian vault at [path] and read my journal entries from the last [number] days in [folder]. Each night at [time], write a short reflective journal entry of your own in a new folder called [folder name], noting themes you've noticed in my writing. Only create new files in that folder and never edit or delete my existing notes; you're done when the first entry is written and I've confirmed the tone is right.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Track sleep, notes, code and earthquakes with a personal agent](./track-sleep-notes-code-and-earthquakes-with-a-personal-agent.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Run pet relocation, Airbnb pricing, and disputes with agents](./run-pet-relocation-airbnb-pricing-and-disputes-with-agents.md)
