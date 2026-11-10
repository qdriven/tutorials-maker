---
title: "Visualize your codebase and coding agents in a 3D workspace"
slug: "visualize-your-codebase-and-coding-agents-in-a-3d-workspace"
summary: "A solo dev built a local-first 3D environment where existing coding agents are embodied as avatars, and the repo is shown as a city to browse code and run apps."
category: "Software & DevOps"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
  - name: "Hermes Agent"
    slug: "hermes-agent"
  - name: "Codex"
    slug: "codex"
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "HN"
source_date: "Oct 27, 2026"
source_url: "https://news.ycombinator.com/item?id=50259193"
fetched_from: "https://agentusecases.ai/use-case/visualize-your-codebase-and-coding-agents-in-a-3d-workspace"
---

# Visualize your codebase and coding agents in a 3D workspace

> A solo dev built a local-first 3D environment where existing coding agents are embodied as avatars, and the repo is shown as a city to browse code and run apps.

**Category:** Software & DevOps  
**Agent:** OpenClaw, Hermes Agent, Codex, Claude Code  
**Source:** HN · Oct 27, 2026

## What they did

The developer built a Three.js browser app that attaches coding agents already installed and signed in (OpenClaw, Hermes, Codex, Claude Code), with tools, skills and memory staying in each agent's own harness. Agents appear as 3D avatars that walk, chat and code. The repo shows as a city of clickable code slabs, with spatial terminal and worldview screens that run the app being edited.

## How it went

It shipped as an MIT-licensed release for Windows and Linux after being built on and off since July. The author admits it is rough in places, and some AI-generated 3D models look rough.

## Worth knowing

You need one of the four supported agents installed and signed in first, and the Windows build is unsigned.

## Prompt

```text
Look at the repo in [path to your project] and build a local-first 3D visualization of it: show the folder structure as a city where each folder is a district and each file is a building sized by line count. Add a simple avatar for each coding agent I run ([agent names]) that moves to the files it is editing. You're done when I can run one command, open it in my browser, and click a building to view that file. Ask me before installing anything globally or deleting any files.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Patch laptop BIOS to unlock hidden firmware menus](./patch-laptop-bios-to-unlock-hidden-firmware-menus.md)
- [Post a rendered video to Slack when integration fails](./post-a-rendered-video-to-slack-when-integration-fails.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a booking and payment app for tattoo artists](./build-a-booking-and-payment-app-for-tattoo-artists.md)
- [Port a Chrome extension to Safari](./port-a-chrome-extension-to-safari.md)
