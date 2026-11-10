---
title: "Optimize a PC by removing background services with Claude Code"
slug: "optimize-a-pc-by-removing-background-services-with-claude-co"
summary: "A user had Claude Code remove about 30 background services and startup programs, change BIOS settings at the boot screen, and work through GUI-only apps using screenshots and click instructions."
category: "Life Admin & Home"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Sep 30, 2025"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1wf7es1/claude_can_optimize_my_computer"
fetched_from: "https://agentusecases.ai/use-case/optimize-a-pc-by-removing-background-services-with-claude-co"
---

# Optimize a PC by removing background services with Claude Code

> A user had Claude Code remove about 30 background services and startup programs, change BIOS settings at the boot screen, and work through GUI-only apps using screenshots and click instructions.

**Category:** Life Admin & Home  
**Agent:** Claude Code  
**Source:** Reddit · Sep 30, 2025

## What they did

The user asked in plain language for help with game stutter, then approved Claude Code’s plan step by step. Running under the normal Windows account, it inspected logs, drivers, config files, registry values, processes, and network tests with PowerShell; for admin changes it generated scripts that triggered UAC prompts, while the user handled BIOS changes at boot from Claude’s menu directions and followed screenshot-based click guidance in GUI-only apps like NVIDIA Control Panel.

## How it went

On the PC, the user says RAM was corrected from 4800 to 6000, BIOS was updated, frame cap rose from 150 to 225 with about 217 in matches, three recording tools were disabled, roughly 30 background or startup items were removed, and about 85 GB was freed. The MacBook cleanup mostly recovered storage, with little noticeable performance gain.

## Worth knowing

The main catch was safety: the user says they did not back up first, got lucky, and recommends approving changes in stages rather than letting it run unsupervised.

## Prompt

```text
Help me speed up my [Windows/Mac] computer. First list the background services and startup programs that are running, and mark which ones look safe to disable and which ones I should keep and why. Don't change or remove anything until I've approved your list, and tell me how to undo each change; you're done when the approved items are disabled and you've given me a summary of what changed.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Run a personal doorman agent on a $7 VPS](./run-a-personal-doorman-agent-on-a-7-vps.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Place library holds for books you need](./place-library-holds-for-books-you-need.md)
