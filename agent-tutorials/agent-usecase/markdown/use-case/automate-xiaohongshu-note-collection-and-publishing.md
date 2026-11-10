---
title: "Automate Xiaohongshu note collection and publishing"
slug: "automate-xiaohongshu-note-collection-and-publishing"
summary: "An RPA tool collects popular notes into a Feishu table, OpenClaw writes copy in batches, and xiaohongshu-mcp publishes them; author reports saving about 3 hours a day. · Oct 28, 2026"
category: "Content & Creative"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "cloud.tencent.com"
source_date: "Oct 28, 2026 · Submitted by from search gap: 自媒体"
source_url: "https://cloud.tencent.com/developer/article/2635239"
fetched_from: "https://agentusecases.ai/use-case/automate-xiaohongshu-note-collection-and-publishing"
---

# Automate Xiaohongshu note collection and publishing

> An RPA tool collects popular notes into a Feishu table, OpenClaw writes copy in batches, and xiaohongshu-mcp publishes them; author reports saving about 3 hours a day. · Oct 28, 2026

**Category:** Content & Creative  
**Agent:** OpenClaw  
**Source:** cloud.tencent.com · Oct 28, 2026 · Submitted by from search gap: 自媒体

## What they did

A Yingdao RPA flow runs on a schedule. It searches Xiaohongshu by keyword, skips notes already in the table, and writes note and author fields into a Feishu Bitable. OpenClaw gets the Feishu app credentials and reads the table. Using a custom Xiaohongshu copywriting skill, it analyzes the data and drafts notes. xiaohongshu-mcp, installed through OpenClaw, then publishes them.

## How it went

The author got the full pipeline running, from collection to a published note, and says it saves 3 hours a day. The source gives no measured output figures. Some RPA fields came back empty and needed workarounds.

## Worth knowing

The author budgets about 2 hours of uninterrupted setup. RPA does the scraping so the agent doesn't burn tokens on it.

## Prompt

```text
Set up a weekly content pipeline for my [platform, e.g. Xiaohongshu] account about [niche]. Collect the top [number] popular notes on [keywords] into my [Feishu table / Google Sheet], then write [number] original draft posts in my voice based on them. Stop when the drafts are in the table, and show me each draft for approval before publishing anything.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Track sleep, notes, code and earthquakes with a personal agent](./track-sleep-notes-code-and-earthquakes-with-a-personal-agent.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn a blog post into an animated infographic](./turn-a-blog-post-into-an-animated-infographic.md)
- [Analyze YouTube thumbnails from channel analytics](./analyze-youtube-thumbnails-from-channel-analytics.md)
