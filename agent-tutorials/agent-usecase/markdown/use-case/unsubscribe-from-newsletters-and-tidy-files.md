---
title: "Unsubscribe from newsletters and tidy files"
slug: "unsubscribe-from-newsletters-and-tidy-files"
summary: "A developer tested OpenClaw on an isolated laptop: it processed 847 emails and unsubscribed from 203 lists at about 90% accuracy, missing a few client emails, and also sent invites and renamed files."
category: "Life Admin & Home"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "medium.com"
source_date: "Undated"
source_url: "https://medium.com/@likhitkumarvp/i-spent-47-testing-openclaw-for-a-week-heres-what-s-actually-happening-c274dc26a3fd"
fetched_from: "https://agentusecases.ai/use-case/unsubscribe-from-newsletters-and-tidy-files"
---

# Unsubscribe from newsletters and tidy files

> A developer tested OpenClaw on an isolated laptop: it processed 847 emails and unsubscribed from 203 lists at about 90% accuracy, missing a few client emails, and also sent invites and renamed files.

**Category:** Life Admin & Home  
**Agent:** OpenClaw  
**Source:** medium.com · Undated

## What they did

On an old, isolated Ubuntu laptop, the developer connected OpenClaw to a throwaway Gmail account holding about 2,000 emails and told it to unsubscribe from newsletters and promotions. It also sent calendar invites, and sorted and renamed 300 mixed files into folders. He spot-checked about 50 emails afterward.

## How it went

It handled 847 newsletter emails in about 20 minutes and unsubscribed from 203 lists, at roughly 90% accuracy. It missed some legitimate client emails sent through a marketing platform. File renaming worked well. The calendar task reported success when it hadn't fully worked.

## Worth knowing

The email run cost about $8 in Claude Sonnet API calls, and the whole week cost $47, so set usage limits on your API keys from the start.”

## Prompt

```text
Go through my inbox at [email account] and find newsletters and promotional mailing lists I haven't opened in [number] months. Build a list of the senders you plan to unsubscribe from, and never include anything from [clients, family, or important senders]. Show me the full list and wait for my approval before unsubscribing from anything or sending any invites or renaming files; you're done when I've approved the list and you've given me a report of what was unsubscribed.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Track sleep, notes, code and earthquakes with a personal agent](./track-sleep-notes-code-and-earthquakes-with-a-personal-agent.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Run pet relocation, Airbnb pricing, and disputes with agents](./run-pet-relocation-airbnb-pricing-and-disputes-with-agents.md)
