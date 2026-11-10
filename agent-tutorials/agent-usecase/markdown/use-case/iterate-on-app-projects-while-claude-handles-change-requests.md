---
title: "Iterate on app projects while Claude handles change requests"
slug: "iterate-on-app-projects-while-claude-handles-change-requests"
summary: "The poster has Claude make change requests on ongoing projects, including a video editor, a graphic adventure game engine and a text editor, while testing in the meantime."
category: "Software & DevOps"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1x84umz/what_do_you_usually_do_when_claude_runs_for"
fetched_from: "https://agentusecases.ai/use-case/iterate-on-app-projects-while-claude-handles-change-requests"
---

# Iterate on app projects while Claude handles change requests

> The poster has Claude make change requests on ongoing projects, including a video editor, a graphic adventure game engine and a text editor, while testing in the meantime.

**Category:** Software & DevOps  
**Agent:** Claude  
**Source:** Reddit · Undated

## What they did

The poster uses Claude as part of an ongoing app-iteration loop: while Claude is processing a previous batch of change requests, they go back through the app to spot more improvements and prepare the next prompt. In parallel, they switch to other Claude-assisted projects, specifically mentioning a video editor, a graphic adventure game engine, and a text editor, then return with another round of requests.

## How it went

The source describes a workflow habit rather than a measured result, so it gives no metrics or finished-project outcomes. It does show the setup works well enough for the poster to keep several projects moving at once while Claude is busy.

## Worth knowing

The main catch is that this depends on having enough parallel work to queue up; the poster fills Claude's wait time by reviewing the current app and hopping to other projects.

## Prompt

```text
I'm working on [project type, e.g. a text editor] built with [language or framework]. Here is the current code: [paste code]. Please make these changes: [list of change requests]. Return the updated code with a short summary of what changed so I can test it.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Build a project management tool with a 24-hour agent run](./build-a-project-management-tool-with-a-24-hour-agent-run.md)
