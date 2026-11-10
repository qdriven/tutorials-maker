---
title: "Control your Mac by voice with a Claude-backed assistant"
slug: "control-your-mac-by-voice-with-a-claude-backed-assistant"
summary: "Atticus lets a user speak or type tasks on macOS; simple ones run locally and complex ones go to Claude via claude -p, with successful steps saved for faster replay. · Oct 12, 2026"
category: "Life Admin & Home"
agents:
  - name: "Claude"
    slug: "claude"
source_url: "https://github.com/SaarthurR/atticus-mac"
fetched_from: "https://agentusecases.ai/use-case/control-your-mac-by-voice-with-a-claude-backed-assistant"
---

# Control your Mac by voice with a Claude-backed assistant

> Atticus lets a user speak or type tasks on macOS; simple ones run locally and complex ones go to Claude via claude -p, with successful steps saved for faster replay. · Oct 12, 2026

**Category:** Life Admin & Home  
**Agent:** Claude

## What they did

The user holds ⌃⌥Space and speaks. Apple's on-device speech turns the audio into text. Opening apps, moving windows, web searches and music run locally with no AI. Everything else goes to Claude through claude -p on the user's existing plan. Claude can read the screen and search files, and Peekaboo is optional for clicking inside apps. Safe mode asks for confirmation before deletes, sends or purchases.

## How it went

The source reports about 0.14¢ per ask, roughly 700 asks per dollar, at API list rates. It gives no benchmarks for task success. The repo has 1 star and no reported user results.

## Worth knowing

It needs macOS 26 or later and a paid Claude Pro or Max plan with Claude Code. Peekaboo is a separate install if you want clicking inside apps.

## Prompt

```text
Help me build a small macOS menu bar assistant in [Swift or Python] that takes a spoken or typed task like 'open my calendar and show tomorrow'. Simple tasks should run locally with AppleScript or shell commands, and harder ones should be passed to Claude through the claude -p command. Save each successful command sequence so it can be replayed faster next time. You're done when I can run three example tasks and see the third replay from the saved steps; ask me before running any command that deletes or sends anything.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Manage calendar and tasks by text with an assistant](./manage-calendar-and-tasks-by-text-with-an-assistant.md)
- [Maintain a home media library and handle personal projects](./maintain-a-home-media-library-and-handle-personal-projects.md)
