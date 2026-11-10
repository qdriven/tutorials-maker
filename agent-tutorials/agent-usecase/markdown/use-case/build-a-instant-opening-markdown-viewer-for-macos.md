---
title: "Build a instant-opening markdown viewer for macOS"
slug: "build-a-instant-opening-markdown-viewer-for-macos"
summary: "The author asked Claude Code to build a macOS markdown viewer, and says it opens files faster than any other app they have used."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "HN"
source_date: "Oct 22, 2026"
source_url: "https://news.ycombinator.com/item?id=50192584"
fetched_from: "https://agentusecases.ai/use-case/build-a-instant-opening-markdown-viewer-for-macos"
---

# Build a instant-opening markdown viewer for macOS

> The author asked Claude Code to build a macOS markdown viewer, and says it opens files faster than any other app they have used.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** HN · Oct 22, 2026

## What they did

The author put the request into Claude Code, running Opus 5.5, and asked for a macOS markdown viewer that opens as fast as possible. The viewer comes from the same codebase as their JSON viewer. The source gives no further steps, prompts, or details on how a person guided it.

## How it went

The author says the viewer opens and displays a markdown file instantly, faster than any other macOS app they've used, and faster than Bitwarden's Chrome extension shows its fill UI. No benchmarks are given.

## Worth knowing

Speed was the explicit ask in the prompt; the author says Claude can build something extremely fast if you request it, and they didn't have to design for it themselves.

## Prompt

```text
Build me a lightweight macOS app that opens markdown files instantly and renders them cleanly, using [Swift/your preferred stack]. It should be set as a handler for .md files, launch in well under a second, support [features like dark mode, live reload, code highlighting], and avoid heavy dependencies. When you're done, build the app, show me how to install it and set it as my default markdown viewer, and tell me how you checked the launch speed. Ask me before deleting or overwriting any existing files.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
