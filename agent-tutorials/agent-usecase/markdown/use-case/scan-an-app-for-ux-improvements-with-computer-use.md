---
title: "Scan an app for UX improvements with computer use"
slug: "scan-an-app-for-ux-improvements-with-computer-use"
summary: "A user tried Claude Code's computer-use feature on Windows to scan their app for UX improvements, and asks whether it works well there."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "May 6, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1sp0r2s/is_cc_computer_use_crappy_on_windows"
fetched_from: "https://agentusecases.ai/use-case/scan-an-app-for-ux-improvements-with-computer-use"
---

# Scan an app for UX improvements with computer use

> A user tried Claude Code's computer-use feature on Windows to scan their app for UX improvements, and asks whether it works well there.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** Reddit · May 6, 2026

## What they did

The poster tried Claude Code’s new computer-use feature on Windows to inspect their app for UX issues. In their run, it could not use the screenshot MCP server, so it fell back to shell-script ways of grabbing screenshots; commenters said the built-in computer-use MCP server showed up on macOS, not in Claude Code on Windows PowerShell or WSL, though one person reported screenshots, debugging, and video analysis working in WSL2.

## How it went

For this Windows app-review use case, the reported result was unreliable native support rather than a smooth UX scan. The thread offers no measured improvements or output quality, only that native Windows seemed unsupported while WSL2 may work better.

## Worth knowing

The main catch is setup: out of the box, Claude Code was described as lacking native Windows computer-use support, so copying this likely means using WSL2 or wiring in extra tooling yourself.

## Prompt

```text
Run my app at [how to start it] and use computer use to click through the main flows: [list of 2-3 key screens or tasks]. Note anything confusing, inconsistent, or slow from a user's point of view. Finish with a prioritized list of [5-10] UX improvements, each with the screen it applies to, and don't change any code until I pick which to do.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
