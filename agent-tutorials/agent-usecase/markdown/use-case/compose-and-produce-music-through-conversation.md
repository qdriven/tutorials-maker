---
title: "Compose and produce music through conversation"
slug: "compose-and-produce-music-through-conversation"
summary: "The author used Claude Code to write music and lyrics and build tooling integrated with Bitwig; one honky-tonk song was made entirely by conversation."
category: "Content & Creative"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "gist.github.com"
source_date: "Undated"
source_url: "https://gist.github.com/bedwards/de776e759c8fd0191c011e12ad08e443"
fetched_from: "https://agentusecases.ai/use-case/compose-and-produce-music-through-conversation"
---

# Compose and produce music through conversation

> The author used Claude Code to write music and lyrics and build tooling integrated with Bitwig; one honky-tonk song was made entirely by conversation.

**Category:** Content & Creative  
**Agent:** Claude Code  
**Source:** gist.github.com · Undated

## What they did

The author used Claude 4.5 models in Claude Code to write multi-track music and lyrics, plus the tooling for composing and producing. Claude was connected to Bitwig Studio through projects such as a Bitwig content search CLI and the Jeannie controller framework. For the honky-tonk song, the author held the whole conversation with Claude and opened Bitwig only at the end, to load the generated content.

## How it went

The gist collects five songs, including a symphony finale and a twelve-song concept album, with MIDI and lyrics on GitHub. It gives no metrics, and the skipper and voxel projects have no example audio yet.

## Worth knowing

The honky-tonk song needed the Jeannie framework, and the Bitwig integration is custom tooling, so expect to set up or build that tooling yourself.

## Prompt

```text
Help me write and produce a [genre] song about [topic] through conversation. Start by drafting lyrics and a chord progression, then build a script that turns them into [MIDI or a project file for my music software, e.g. Bitwig]. Check in with me after each section so I can steer it, and stop when we have a complete track I can open and play.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn a blog post into an animated infographic](./turn-a-blog-post-into-an-animated-infographic.md)
- [Prototype a promo video and design work with bots](./prototype-a-promo-video-and-design-work-with-bots.md)
