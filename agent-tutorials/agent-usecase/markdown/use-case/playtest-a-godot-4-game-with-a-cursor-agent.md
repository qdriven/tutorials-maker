---
title: "Playtest a Godot 4 game with a Cursor agent"
slug: "playtest-a-godot-4-game-with-a-cursor-agent"
summary: "A Cursor plugin and subagent lets an agent capture screenshots and click through UI flows of a Godot 4 game like a player."
category: "Games & Simulations"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "github.com"
source_date: "Undated"
source_url: "https://github.com/Joelnicolass/godot-studio-playtest"
fetched_from: "https://agentusecases.ai/use-case/playtest-a-godot-4-game-with-a-cursor-agent"
---

# Playtest a Godot 4 game with a Cursor agent

> A Cursor plugin and subagent lets an agent capture screenshots and click through UI flows of a Godot 4 game like a player.

**Category:** Games & Simulations  
**Agent:** Cursor  
**Source:** github.com · Undated

## What they did

You install a Godot plugin, skills, a command and a subagent. The caller gives the studio-playtester subagent a slice with criteria, a scene and an action. The agent inspects the scene's unique node names and InputMap, writes a JSON flow under res://agent/, and runs it through the plugin's CLI. Button presses go in as mapped input actions, and screenshots land in out/.

## How it went

Each run ends in AGENT_OK or AGENT_FAIL, and the agent reports PASS/FAIL. A script error or unmapped input counts as a failure. The source gives no measured results beyond a boot-to-race demo.

## Worth knowing

Capture and flow runs need a real game window. If the debug scene is missing, the agent returns NEED_SETUP and stops, and it won't build one.

## Prompt

```text
Set up an agent that can launch my Godot 4 game, take screenshots, and click through the main UI flows like a player would. Have it report any broken buttons, dead ends, or visual glitches it finds.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Draft articles quoting Kindle highlights and notes](./draft-articles-quoting-kindle-highlights-and-notes.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Add a battle-of-Alesia expansion to a 1990s game remake](./add-a-battle-of-alesia-expansion-to-a-1990s-game-remake.md)
- [Build and grow a mobile game with bots](./build-and-grow-a-mobile-game-with-bots.md)
