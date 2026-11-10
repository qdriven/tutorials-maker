---
title: "Run parallel Claude sessions to build and test apps"
slug: "run-parallel-claude-sessions-to-build-and-test-apps"
summary: "A developer runs about 10 codebase copies with Claude sessions, planning specs first, and has Claude drive phones via adb to test UIs and debug from logs."
category: "Software & DevOps"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "HN"
source_date: "Nov 2, 2026"
source_url: "https://news.ycombinator.com/item?id=50334362"
fetched_from: "https://agentusecases.ai/use-case/run-parallel-claude-sessions-to-build-and-test-apps"
---

# Run parallel Claude sessions to build and test apps

> A developer runs about 10 codebase copies with Claude sessions, planning specs first, and has Claude drive phones via adb to test UIs and debug from logs.

**Category:** Software & DevOps  
**Agent:** Claude  
**Source:** HN · Nov 2, 2026

## What they did

The developer keeps about 10 copies of the codebase in a /code folder, each with its own git branch, Claude session and terminal. He spends heavy time planning and specifying each task tightly so Claude can't wander. For mobile apps, he plugs phones into the laptop over USB (emulators if needed) and Claude drives the UI through adb, reads logs and debugs.

## How it went

The source gives no measured results, only the claim that Claude moves very fast on tasks once set up this way. It reports the limit that he can only manage as many sessions as he can mentally handle.

## Worth knowing

Prep mattered: about a year ago they split 10K+ line files into files of 2K lines or less and had Claude add per-file summaries and comments; a strictly typed language like dotnet is also needed.

## Prompt

```text
I'm building [describe your app] in the repo at [path]. First write a short spec and a step-by-step plan for [feature], and wait for my approval. Once I approve, implement it, run the app on my connected Android device or emulator using adb, tap through [the key screen or flow], and read the logs to fix any crashes. Stop when the flow works end to end and give me a summary of what you changed and tested.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Track competitor prices and contacts into Google Sheets](./track-competitor-prices-and-contacts-into-google-sheets.md)
- [Run weekly marketing content in brand voice](./run-weekly-marketing-content-in-brand-voice.md)
- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Upgrade site dependencies and frameworks with Cursor](./upgrade-site-dependencies-and-frameworks-with-cursor.md)
- [Deploy agent-built static pages to your own Cloudflare domain](./deploy-agent-built-static-pages-to-your-own-cloudflare-domai.md)
