---
title: "Recreate a video ad as a JavaScript animation"
slug: "recreate-a-video-ad-as-a-javascript-animation"
summary: "The author had Claude recreate a downloaded ad video as a pure JavaScript animation with the original audio, working autonomously with ffmpeg in under an hour."
category: "Content & Creative"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "HN"
source_date: "Oct 3, 2026"
source_url: "https://news.ycombinator.com/item?id=49942596"
fetched_from: "https://agentusecases.ai/use-case/recreate-a-video-ad-as-a-javascript-animation"
---

# Recreate a video ad as a JavaScript animation

> The author had Claude recreate a downloaded ad video as a pure JavaScript animation with the original audio, working autonomously with ffmpeg in under an hour.

**Category:** Content & Creative  
**Agent:** Claude  
**Source:** HN · Oct 3, 2026

## What they did

The author downloaded a ChatGPT ad from YouTube, extracted its audio, and gave Claude (Opus 5.5) access to ffmpeg. A prompt asked for a pure JavaScript recreation using the same audio, with subtle animations captured and high production value. The author left and told it to work autonomously until done.

## How it went

It finished in under an hour in one go. The only visible difference from the original was the logo at the end of the video.

## Worth knowing

The prompt stressed quality, asked the agent to work autonomously, and supplied both the video and audio files; the author says this was an experiment and the original belongs to OpenAI.

## Prompt

```text
I have a video file at [path to ad video]. Use ffmpeg to analyze its frames and audio, then recreate it as a pure JavaScript animation in a single HTML file, keeping the original audio track in sync. Work on your own and compare against the original as you go. Stop when I can open the HTML file in a browser and it matches the video's look and timing, and do not upload or publish anything.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn videos and company research into slide decks](./turn-videos-and-company-research-into-slide-decks.md)
- [Run content creation with specialized bots](./run-content-creation-with-specialized-bots.md)
