---
title: "Create and publish YouTube videos from script to upload"
slug: "create-and-publish-youtube-videos-from-script-to-upload"
summary: "An n8n pipeline writes a script, adds a voiceover and stock footage, assembles the video, uploads it to YouTube and updates a Google Sheet."
category: "Content & Creative"
agents:
  - name: "n8n"
    slug: "n8n"
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "community.n8n.io"
source_date: "Undated"
source_url: "https://community.n8n.io/t/i-built-an-n8n-workflow-that-creates-and-publishes-youtube-videos-automatically-from-script-to-upload/305275"
fetched_from: "https://agentusecases.ai/use-case/create-and-publish-youtube-videos-from-script-to-upload"
---

# Create and publish YouTube videos from script to upload

> An n8n pipeline writes a script, adds a voiceover and stock footage, assembles the video, uploads it to YouTube and updates a Google Sheet.

**Category:** Content & Creative  
**Agent:** n8n, Claude Code  
**Source:** community.n8n.io · Undated

## What they did

A Telegram message to a bot (or a schedule) starts the workflow. GPT-4o-mini returns a JSON script. Each voiceover segment goes to ElevenLabs, Pexels supplies footage with an image-generation fallback, and Shotstack renders the video from a JSON timeline. The video uploads to YouTube as unlisted for review, then Telegram and a Google Sheet are updated.

## How it went

The author reports about $0.30 of voiceover and a 3-5 minute render for a 10-minute video. No view or revenue results are given, and the long-term daily render load is untested.

## Worth knowing

YouTube's API quota allows only about six uploads a day (1,600 units each against a 10,000 limit), so iterating burns quota fast.

## Prompt

```text
Build an n8n workflow that takes a topic from a Google Sheet row, writes a script for a [length]-minute YouTube video about [my niche], generates a voiceover, pulls matching stock footage, assembles the video, and writes the title and description. Update the sheet with the status and file link. Stop before uploading and show me the finished video and metadata so I can approve the YouTube upload.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Run a restaurant voice assistant for reservations and orders](./run-a-restaurant-voice-assistant-for-reservations-and-orders.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn videos and company research into slide decks](./turn-videos-and-company-research-into-slide-decks.md)
- [Draft and publish LinkedIn posts from voice notes](./draft-and-publish-linkedin-posts-from-voice-notes.md)
