---
title: "Curate a weekly newsletter from RSS feeds"
slug: "curate-a-weekly-newsletter-from-rss-feeds"
summary: "OpenClaw monitors RSS feeds, scores items, compiles a digest with intros and sends a Telegram preview; the owner approves and it sends."
category: "Content & Creative"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "sfailabs.com"
source_date: "Undated"
source_url: "https://sfailabs.com/guides/openclaw-newsletter-curation"
fetched_from: "https://agentusecases.ai/use-case/curate-a-weekly-newsletter-from-rss-feeds"
---

# Curate a weekly newsletter from RSS feeds

> OpenClaw monitors RSS feeds, scores items, compiles a digest with intros and sends a Telegram preview; the owner approves and it sends.

**Category:** Content & Creative  
**Agent:** OpenClaw  
**Source:** sfailabs.com · Undated

## What they did

The guide builds five markdown skills wired together by cron jobs and a heartbeat. Every 6 hours the agent pulls about 120 RSS feeds plus Reddit and Hacker News into an inbox. Wednesday night it scores items on relevance, recency, source authority and engagement, with penalties for repeats. Thursday it writes intros in the editor's voice and sends a Telegram preview. The editor replies approve or asks for changes.

## How it went

The guide claims about 18 minutes of human time per issue, against roughly four hours done manually. Compilation intros can miss nuance, so it advises against sending without review.

## Worth knowing

Estimated API cost is $2.40-3.00 per issue, under $15 a month. Start Buttondown sends as drafts for the first few issues to check formatting.

## Prompt

```text
Monitor these RSS feeds: [feed URLs]. Each week, score items for relevance to [topic/audience], pick the top [10], and write a digest with a short intro and one line per item. Send me a preview on [Telegram], and only send it to [newsletter tool/list] after I reply approve.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn a blog post into an animated infographic](./turn-a-blog-post-into-an-animated-infographic.md)
- [Analyze YouTube thumbnails from channel analytics](./analyze-youtube-thumbnails-from-channel-analytics.md)
