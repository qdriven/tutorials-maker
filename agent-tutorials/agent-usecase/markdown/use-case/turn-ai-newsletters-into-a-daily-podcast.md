---
title: "Turn AI newsletters into a daily podcast"
slug: "turn-ai-newsletters-into-a-daily-podcast"
summary: "An agent runs overnight, collects the author's AI newsletter subscriptions and produces a daily podcast to listen to on walks. · Oct 11, 2026"
category: "Content & Creative"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "bronsonelliott.substack.com"
source_date: "Oct 11, 2026 · Submitted by Bronson Elliott"
source_url: "https://bronsonelliott.substack.com/p/i-built-a-daily-ai-podcast-that-runs"
fetched_from: "https://agentusecases.ai/use-case/turn-ai-newsletters-into-a-daily-podcast"
---

# Turn AI newsletters into a daily podcast

> An agent runs overnight, collects the author's AI newsletter subscriptions and produces a daily podcast to listen to on walks. · Oct 11, 2026

**Category:** Content & Creative  
**Agent:** custom-built or unnamed agent  
**Source:** bronsonelliott.substack.com · Oct 11, 2026 · Submitted by Bronson Elliott

## What they did

In Claude Cowork on a Mac Mini, connected to Gmail, the author had the agent build a 5 AM scheduled task. It pulls newsletters under one label, skips about 18 low-value ones, reads the rest, and writes a synthesis. A local Qwen3-TTS model turns that into an MP3, which is pushed to GitHub Pages with an RSS feed. The author chose audio and the voice.

## How it went

It took about two hours in one session, and the first episode (8-10 minutes) was waiting in Apple Podcasts the next morning. Voice setup was the messy part: the macOS voice was unusable and edge-tts was unreliable.

## Worth knowing

Local Qwen3-TTS took about 30 minutes to install, with dependency conflicts and a stalled download, and peaked at 6.5GB memory on a 16GB Mac; the author used the Claude Max plan ($100/month).

## Prompt

```text
Every night at [time], collect the newsletters in my [Gmail label or folder, e.g. AI Newsletters] from the past 24 hours and pull out the key stories. Turn them into a [10-minute] podcast script with a conversational tone, then produce the audio and save it to [folder or podcast app] so it is ready for my morning walk. You are done when the episode file exists and you have sent me a short list of the stories covered.
```

## Related use cases

- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Curate a weekly newsletter from RSS feeds](./curate-a-weekly-newsletter-from-rss-feeds.md)
- [Create a presentation on agentic AI in retail](./create-a-presentation-on-agentic-ai-in-retail.md)
- [Curate industry news and draft posts from it](./curate-industry-news-and-draft-posts-from-it.md)
- [Draft and publish LinkedIn posts from voice notes](./draft-and-publish-linkedin-posts-from-voice-notes.md)
- [Write and send AI newsletters automatically](./write-and-send-ai-newsletters-automatically.md)
