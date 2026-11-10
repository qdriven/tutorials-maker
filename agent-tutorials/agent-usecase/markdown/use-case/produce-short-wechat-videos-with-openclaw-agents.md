---
title: "Produce short WeChat videos with OpenClaw agents"
slug: "produce-short-wechat-videos-with-openclaw-agents"
summary: "A creator uses OpenClaw agents with Remotion and a cloned voice to suggest topics, write narration, generate TTS and render videos, confirming in Telegram in about 15 minutes. · Oct 22, 2026"
category: "Content & Creative"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "cloud.tencent.com"
source_date: "Oct 22, 2026 · Submitted by from search gap: 视频"
source_url: "https://cloud.tencent.com/developer/article/2633924"
fetched_from: "https://agentusecases.ai/use-case/produce-short-wechat-videos-with-openclaw-agents"
---

# Produce short WeChat videos with OpenClaw agents

> A creator uses OpenClaw agents with Remotion and a cloned voice to suggest topics, write narration, generate TTS and render videos, confirming in Telegram in about 15 minutes. · Oct 22, 2026

**Category:** Content & Creative  
**Agent:** OpenClaw  
**Source:** cloud.tencent.com · Oct 22, 2026 · Submitted by from search gap: 视频

## What they did

A cron job has one agent push five topic ideas to Telegram each morning, and the creator picks one. A writing agent then drafts a roughly 200-character narration and generates cloned-voice TTS through MiniMax on fal.ai. It extracts timestamps with local Whisper, fills a scenes file, and renders with Remotion. The creator reviews the video and confirms, and another agent publishes it.

## How it went

Each video took about 15 minutes, with roughly 10 of those unattended, and cost about ¥0.1. One video reached 1,595 views, and three days totaled 9,018. Before this, views averaged under 200.

## Worth knowing

Don't downgrade the writing agent's model to save money: switching from Opus to Sonnet made scripts much worse, and the author switched back within 6 minutes. Whisper timestamps can drift, so watch the render.

## Prompt

```text
Act as my short-video producer for [platform, e.g. WeChat Channels]. Suggest 5 topics in my niche of [niche], and once I pick one, write a [length, e.g. 60-second] narration script in my voice. Generate the voiceover with [my TTS or cloned voice setup] and render a video with Remotion using [visual style]. Send me the finished file in Telegram and do not publish anything until I confirm.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Track sleep, notes, code and earthquakes with a personal agent](./track-sleep-notes-code-and-earthquakes-with-a-personal-agent.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn a blog post into an animated infographic](./turn-a-blog-post-into-an-animated-infographic.md)
- [Analyze YouTube thumbnails from channel analytics](./analyze-youtube-thumbnails-from-channel-analytics.md)
