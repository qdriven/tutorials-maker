---
title: "Build a slide deck from a single prompt"
slug: "build-a-slide-deck-from-a-single-prompt"
summary: "Scout used its pptx skill to build a 5-slide quarterly cloud review deck saved to Downloads, with diagrams and HTML artifacts also covered."
category: "Content & Creative"
agents:
  - name: "Microsoft Scout"
    slug: "microsoft-scout"
source_platform: "aguidetocloud.com"
source_date: "Undated"
source_url: "https://www.aguidetocloud.com/blog/microsoft-scout-bundled-skills-and-features/"
fetched_from: "https://agentusecases.ai/use-case/build-a-slide-deck-from-a-single-prompt"
---

# Build a slide deck from a single prompt

> Scout used its pptx skill to build a 5-slide quarterly cloud review deck saved to Downloads, with diagrams and HTML artifacts also covered.

**Category:** Content & Creative  
**Agent:** Microsoft Scout  
**Source:** aguidetocloud.com · Undated

## What they did

The author gave Scout one prompt asking for a 5-slide PowerPoint file in Downloads. The prompt named a title slide, five content slides, a small bar chart with fake numbers, and a Microsoft-style design. Scout chose the pptx skill on its own and built the deck with the pptxgenjs library. No manual steps are described.

## How it went

The deck came out with KPI tiles, a bar chart, multi-column layouts and a risk grid. It had six slides in total, one more than the five requested. The author redacted the author footer on the title slide.

## Worth knowing

The prompt asked for 5 slides but the output had 6, so check the slide count. The author's own runs used fake numbers.

## Prompt

```text
Build a [number]-slide PowerPoint deck on [topic, e.g. quarterly cloud review] for [audience]. Include [key sections or data], simple diagrams where they help, and speaker-friendly titles. Save it as a .pptx in my Downloads folder and tell me when it's done, without sharing or emailing it.
```

## Related use cases

- [Clear leftover installers and fetch a YouTube transcript](./clear-leftover-installers-and-fetch-a-youtube-transcript.md)
- [Lint, fix, commit and push code from the terminal](./lint-fix-commit-and-push-code-from-the-terminal.md)
- [Build dashboards and troubleshoot support cases](./build-dashboards-and-troubleshoot-support-cases.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn videos and company research into slide decks](./turn-videos-and-company-research-into-slide-decks.md)
- [Analyze YouTube thumbnails from channel analytics](./analyze-youtube-thumbnails-from-channel-analytics.md)
