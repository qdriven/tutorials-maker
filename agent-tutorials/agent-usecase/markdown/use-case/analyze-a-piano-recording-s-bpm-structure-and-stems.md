---
title: "Analyze a piano recording's BPM, structure and stems"
slug: "analyze-a-piano-recording-s-bpm-structure-and-stems"
summary: "With a skill installed, Claude Code installed ffmpeg and librosa and ran a Python pipeline on a local MP3, producing a report on BPM, structure and stems."
category: "Content & Creative"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "mager.co"
source_date: "Mar 26, 2026"
source_url: "https://www.mager.co/blog/2026-03-26-loooom-identify-song-parts/"
fetched_from: "https://agentusecases.ai/use-case/analyze-a-piano-recording-s-bpm-structure-and-stems"
---

# Analyze a piano recording's BPM, structure and stems

> With a skill installed, Claude Code installed ffmpeg and librosa and ran a Python pipeline on a local MP3, producing a report on BPM, structure and stems.

**Category:** Content & Creative  
**Agent:** Claude Code  
**Source:** mager.co · Mar 26, 2026

## What they did

The author had Gemini draft a skill on Loooom, then published it through the web UI and installed it in Claude Code. He asked Claude to identify parts of a song and pointed it at a local MP3 of his 37-second piano clip. Claude installed ffmpeg and librosa mid-session and ran a Python pipeline.

## How it went

It produced a report with BPM, meter, key, a four-section timeline and a list of stems. The BPM was estimated at about 91 against a canonical ~104. The stem list included vocals and drums, though the clip was solo piano.

## Worth knowing

Expect rough accuracy: the BPM was off from the real tempo, and the stems listed (kick, vocal, hi-hat) don't match a solo piano recording.

## Prompt

```text
I have a piano recording at [path to MP3 file]. Install whatever you need (such as ffmpeg and librosa), then analyze it and write me a report covering the BPM, the song structure with approximate timestamps for each section, and separated stems if possible. Save the report as [report filename] in the same folder and tell me when it's finished and where the output files are.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn a blog post into an animated infographic](./turn-a-blog-post-into-an-animated-infographic.md)
- [Prototype a promo video and design work with bots](./prototype-a-promo-video-and-design-work-with-bots.md)
