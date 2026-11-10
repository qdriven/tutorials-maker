---
title: "Auto-generate a searchable help video library for an app"
slug: "auto-generate-a-searchable-help-video-library-for-an-app"
summary: "Used Replit Agent to build a /help page that generates tutorial videos via scenes, Playwright recording, TTS narration and ffmpeg stitching."
category: "Software & DevOps"
agents:
  - name: "Replit Agent"
    slug: "replit-agent"
source_platform: "X"
source_date: "Jul 9, 2026"
source_url: "https://x.com/NIftek/status/2075249459655512265"
fetched_from: "https://agentusecases.ai/use-case/auto-generate-a-searchable-help-video-library-for-an-app"
---

# Auto-generate a searchable help video library for an app

> Used Replit Agent to build a /help page that generates tutorial videos via scenes, Playwright recording, TTS narration and ffmpeg stitching.

**Category:** Software & DevOps  
**Agent:** Replit Agent  
**Source:** X · Jul 9, 2026

## What they did

The author copied this exact prompt into a Replit agent: add ?demo=1 mode with seeded fake data and no DB writes; define each video in code as scenes specifying route, narration script, and scripted cursor movements; have Playwright record the app while TTS narrates; use ffmpeg to add captions and stitch scenes; output MP4 + transcript + manifest.json. The agent was told to make builds resumable, frame-check every video, enable transcript search, and keep the page fully keyboard accessible.

## How it went

No results, numbers, or shortfalls are stated. The post only shares the prompt after users asked how the library was made.

## Prompt

```text
Add a /help page to my app [app name or URL] that automatically generates short tutorial videos for [list of features or flows]. For each, write a scene script, record the steps with Playwright, add text-to-speech narration, and stitch the video with ffmpeg. Finish with a searchable library of the videos on the page and show me one working example before generating the rest.
```

## Related use cases

- [Build a searchable map of funded companies](./build-a-searchable-map-of-funded-companies.md)
- [Ship a first iOS app to the App Store with Replit](./ship-a-first-ios-app-to-the-app-store-with-replit.md)
- [Build an RFP analysis tool](./build-an-rfp-analysis-tool.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Write, review and document code across a product's PRs](./write-review-and-document-code-across-a-product-s-prs.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
