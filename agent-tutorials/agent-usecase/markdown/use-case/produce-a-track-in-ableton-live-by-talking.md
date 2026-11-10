---
title: "Produce a track in Ableton Live by talking"
slug: "produce-a-track-in-ableton-live-by-talking"
summary: "An MCP server that lets Codex drive Ableton Live, used to write and mix a full song from chat messages. · May 3, 2026"
category: "Content & Creative"
agents:
  - name: "Codex"
    slug: "codex"
source_url: "https://github.com/bschoepke/ableton-live-mcp"
fetched_from: "https://agentusecases.ai/use-case/produce-a-track-in-ableton-live-by-talking"
---

# Produce a track in Ableton Live by talking

> An MCP server that lets Codex drive Ableton Live, used to write and mix a full song from chat messages. · May 3, 2026

**Category:** Content & Creative  
**Agent:** Codex

## What they did

The MCP server lets Codex run Python inside Ableton Live's object model, plus built-in tools for common tasks. In the demo, the author sent chat prompts asking for an EDM song with macOS "say" vocals, chiptune sounds and 80s drum machines. Follow-up messages then asked for MIDI instruments, fills, dynamics, sidechain and a new element.

## How it went

Complete live sets were built from scratch in a few minutes, and follow-up prompts refined them. The README doesn't give quality metrics. One follow-up reported that the new element had no notes, and a later one called it muddy.

## Worth knowing

Back up your Live Set first, because the MCP edits it directly and could corrupt it. The author has only tested it on Live Suite 12.3.8 on macOS.

## Prompt

```text
Help me connect an MCP server for [Ableton Live or my music software] so you can control it from chat. Then create a [genre] track of about [length] with [instruments or mood], adding the drums, bass, and melody and doing a basic mix. Stop when the song plays through start to finish, and tell me what you changed before deleting or overwriting any existing project files.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a racing game from a single prompt](./build-a-racing-game-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
- [Edit raw footage by describing the video you want](./edit-raw-footage-by-describing-the-video-you-want.md)
- [Edit existing video clips with plain-English instructions](./edit-existing-video-clips-with-plain-english-instructions.md)
- [Run content creation with specialized bots](./run-content-creation-with-specialized-bots.md)
