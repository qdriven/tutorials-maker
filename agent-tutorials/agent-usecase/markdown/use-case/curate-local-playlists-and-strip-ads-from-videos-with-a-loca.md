---
title: "Curate local playlists and strip ads from videos with a local agent"
slug: "curate-local-playlists-and-strip-ads-from-videos-with-a-loca"
summary: "The author runs a local LLM agent on a consumer GPU that manages playlists, downloads videos, strips ads and sponsored content, and surfaces the most interesting ones."
category: "Content & Creative"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Oct 21, 2026"
source_url: "https://news.ycombinator.com/item?id=50188128"
fetched_from: "https://agentusecases.ai/use-case/curate-local-playlists-and-strip-ads-from-videos-with-a-loca"
---

# Curate local playlists and strip ads from videos with a local agent

> The author runs a local LLM agent on a consumer GPU that manages playlists, downloads videos, strips ads and sponsored content, and surfaces the most interesting ones.

**Category:** Content & Creative  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Oct 21, 2026

## What they did

The author runs a local LLM agent on a consumer GPU that manages their playlists and operates a self-hosted Spotify-style music setup. For YouTube, local software downloads video files from the servers, removes ads and sponsored segments, and the agent picks the videos most relevant to the author's interests. The source gives no further mechanics.

## How it went

The author says they haven't used YouTube itself in years. The source gives no numbers, and it doesn't name the model or the tools involved.

## Worth knowing

The source is a brief forum comment with no setup details, so expect to work out the tooling, model choice and hardware requirements yourself.

## Prompt

```text
Set up a local workflow on my computer that manages my video playlists. Download the videos from [playlist URLs or channels], cut out ads and sponsored segments, and rank them by how interesting they look based on [my interests, e.g. topics or creators I like]. Finish by giving me a short list of the top [number] videos with a one-line reason for each, and ask me before deleting any files.
```

## Related use cases

- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Curate a weekly newsletter from RSS feeds](./curate-a-weekly-newsletter-from-rss-feeds.md)
- [Create a presentation on agentic AI in retail](./create-a-presentation-on-agentic-ai-in-retail.md)
- [Curate industry news and draft posts from it](./curate-industry-news-and-draft-posts-from-it.md)
- [Draft and publish LinkedIn posts from voice notes](./draft-and-publish-linkedin-posts-from-voice-notes.md)
- [Write and send AI newsletters automatically](./write-and-send-ai-newsletters-automatically.md)
