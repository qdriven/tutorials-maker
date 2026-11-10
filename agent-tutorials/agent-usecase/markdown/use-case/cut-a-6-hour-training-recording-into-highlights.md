---
title: "Cut a 6-hour training recording into highlights"
slug: "cut-a-6-hour-training-recording-into-highlights"
summary: "A training team used Claude Code with video-editing skills to transcribe a 6-hour live recording locally, find pauses and irrelevant parts, and build a Kdenlive project for manual touch-ups. · Nov 4, 2026"
category: "Content & Creative"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "dteam.top"
source_date: "Nov 4, 2026 · Submitted by from search gap: 视频"
source_url: "https://www.dteam.top/blogs/2026-04/vibe-coding-with-videocut"
fetched_from: "https://agentusecases.ai/use-case/cut-a-6-hour-training-recording-into-highlights"
---

# Cut a 6-hour training recording into highlights

> A training team used Claude Code with video-editing skills to transcribe a 6-hour live recording locally, find pauses and irrelevant parts, and build a Kdenlive project for manual touch-ups. · Nov 4, 2026

**Category:** Content & Creative  
**Agent:** Claude Code  
**Source:** dteam.top · Nov 4, 2026 · Submitted by from search gap: 视频

## What they did

Feng Yu added two skills to Claude Code: videocut-skills and cli-anything-kdenlive. He asked Claude to combine them without the paid Volcano Engine transcription API. Claude designed a local pipeline. It used faster-whisper to transcribe, applied the skill's rules to cut verbal slips and pauses, and wrote a Kdenlive project file. Feng fixed a bug in the Kdenlive CLI so the file would open. He then polished the cut by hand.

## How it went

The 6-hour audio was transcribed and gave a rough cut, so the job dropped from about 3 days to a bit over 1. Many verbal slips and redundancies were left in, and the project had too many clips.

## Worth knowing

The machine couldn't run faster-whisper large-v3. He used the small model at int8 and transcribed audio chunks in parallel. That cost some accuracy, which made the cut timings less precise.

## Prompt

```text
I have a long recording at [file path], about [length] long. Transcribe it locally, then find long pauses, off-topic stretches, and [other parts to cut, e.g. breaks or tech problems], and build a [Kdenlive or other editor] project with those parts cut so I can touch it up by hand. Keep the original file untouched and give me a list of every cut with timestamps; you are done when the project file opens cleanly.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Index a newsletter archive and repurpose writing](./index-a-newsletter-archive-and-repurpose-writing.md)
- [Build a company structure with Claude Code agents](./build-a-company-structure-with-claude-code-agents.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Edit a full video in Descript with a Dot](./edit-a-full-video-in-descript-with-a-dot.md)
- [Analyze YouTube thumbnails from channel analytics](./analyze-youtube-thumbnails-from-channel-analytics.md)
