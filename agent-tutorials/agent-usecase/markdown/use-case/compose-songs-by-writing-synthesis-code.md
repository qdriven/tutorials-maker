---
title: "Compose songs by writing synthesis code"
slug: "compose-songs-by-writing-synthesis-code"
summary: "The author ran one-shot experiments where Claude Code wrote Python to synthesize music, including a rock song with sung lyrics via macOS say; sampling a song failed."
category: "Content & Creative"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "josh.ing"
source_date: "Undated"
source_url: "https://www.josh.ing/blog/claude-composer"
fetched_from: "https://agentusecases.ai/use-case/compose-songs-by-writing-synthesis-code"
---

# Compose songs by writing synthesis code

> The author ran one-shot experiments where Claude Code wrote Python to synthesize music, including a rock song with sung lyrics via macOS say; sampling a song failed.

**Category:** Content & Creative  
**Agent:** Claude Code  
**Source:** josh.ing · Undated

## What they did

Josh Cohenzadeh gave Claude Code one-shot prompts: no exploration, no third-party dependencies, no questions, and it had to produce an audio file. It wrote Python that built notes from raw waveforms and arranged full songs. For the rock song, it used macOS say for vocals. He also had it generate videos from the audio, and an album.

## How it went

It produced an original song, an EDM track, a rock song with lyrics, music videos and a 5-track album. Sampling an existing song came out poorly. Getting vocals was hard, and one attempt produced robotic non-English singing.

## Worth knowing

Claude Code only added vocals when explicitly told to, and repeated runs kept reusing themes like the word "Neon".

## Prompt

```text
Write a Python script that synthesizes a short [genre] song from scratch, with a [mood] feel, a clear melody, bass, and drums, and render it to a WAV file. If you can, add sung lyrics about [topic] using the macOS say command. Finish by playing or exporting the file and telling me what to tweak to improve it.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn a blog post into an animated infographic](./turn-a-blog-post-into-an-animated-infographic.md)
- [Prototype a promo video and design work with bots](./prototype-a-promo-video-and-design-work-with-bots.md)
