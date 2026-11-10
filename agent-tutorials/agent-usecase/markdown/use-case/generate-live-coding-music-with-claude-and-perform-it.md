---
title: "Generate live-coding music with Claude and perform it"
slug: "generate-live-coding-music-with-claude-and-perform-it"
summary: "An author had Claude write Strudel music code from a style description, hand-fixed hallucinated sample names, then restructured it for live performance and recorded it."
category: "Content & Creative"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "thoughtwax.com"
source_date: "Jun 1, 2025"
source_url: "https://thoughtwax.com/2025/06/live-coding/"
fetched_from: "https://agentusecases.ai/use-case/generate-live-coding-music-with-claude-and-perform-it"
---

# Generate live-coding music with Claude and perform it

> An author had Claude write Strudel music code from a style description, hand-fixed hallucinated sample names, then restructured it for live performance and recorded it.

**Category:** Content & Creative  
**Agent:** Claude Code  
**Source:** thoughtwax.com · Jun 1, 2025

## What they did

Emmet Connolly, who had never used Strudel, described a musical style to Claude and asked for Strudel code. He tweaked every line by hand and discarded many, including hallucinated sample filenames. Because he was mostly commenting chunks in and out, he pasted the code back to Claude to restructure for live performance. He ran the output through an audio interface and an effects pedal, then recorded it.

## How it went

He got a recorded piece on his second attempt, in about 4 hours total including the write-up. He doesn't claim artistic merit and wouldn't listen to it at home.

## Worth knowing

Expect to hand-fix Claude's Strudel output, since it invented sample names that don't exist. Treat the generated lines as a bank of candidates to whittle down.

## Prompt

```text
Write me a live-coding music piece in Strudel in the style of [describe genre, mood, tempo, and artists]. Use only sample names that exist in Strudel's default sample library and check each one rather than guessing. Then restructure it into sections I can trigger live, such as [intro, build, drop, outro], and save it as [filename] with a short note on how to perform it.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn a blog post into an animated infographic](./turn-a-blog-post-into-an-animated-infographic.md)
- [Prototype a promo video and design work with bots](./prototype-a-promo-video-and-design-work-with-bots.md)
