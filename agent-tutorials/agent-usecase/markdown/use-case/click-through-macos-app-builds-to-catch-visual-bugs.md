---
title: "Click through macOS app builds to catch visual bugs"
slug: "click-through-macos-app-builds-to-catch-visual-bugs"
summary: "A developer used Claude Code computer use to compile, launch, and click through macOS app screens to find layout bugs."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Claude computer use"
    slug: "claude-computer-use"
source_platform: "claudcod.com"
source_date: "Undated"
source_url: "https://claudcod.com/blog/claude-code-computer-use/"
fetched_from: "https://agentusecases.ai/use-case/click-through-macos-app-builds-to-catch-visual-bugs"
---

# Click through macOS app builds to catch visual bugs

> A developer used Claude Code computer use to compile, launch, and click through macOS app screens to find layout bugs.

**Category:** Software & DevOps  
**Agent:** Claude Code, Claude computer use  
**Source:** claudcod.com · Undated

## What they did

The built-in computer-use MCP server is enabled through /mcp, and macOS Accessibility and Screen Recording permissions are granted. The developer approves each app per session. Claude then runs xcodebuild, launches the app, clicks through windows, resizes them to reproduce layout problems, takes screenshots, and reads the code to suggest a fix.

## How it went

The article describes the workflow but gives no measured results. It is a research preview, so behavior may change between versions.

## Worth knowing

It needs a Pro or Max plan, Claude Code v2.1.85 or later, and macOS in an interactive session. It runs on your real desktop, so check manually anything where a wrong click could cause side effects.

## Prompt

```text
Compile and launch my macOS app in [project path]. Click through each screen, including [key screens or flows], and look for layout bugs like clipped text, overlapping views, or misaligned controls. Finish with a list of each bug, the screen it was on, and a suggested fix; don't change any code until I approve.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run nightly briefing pipelines with scheduled tasks](./run-nightly-briefing-pipelines-with-scheduled-tasks.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Point a computer-using bot at any repo](./point-a-computer-using-bot-at-any-repo.md)
