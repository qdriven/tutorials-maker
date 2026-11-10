---
title: "Set up a new laptop to match an existing Arch Linux machine"
slug: "set-up-a-new-laptop-to-match-an-existing-arch-linux-machine"
summary: "A commenter had Claude create an Arch Linux live USB and configure a laptop to mirror another Arch machine, including tools and desktop setup."
category: "Software & DevOps"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Apr 1, 2026"
source_url: "https://www.reddit.com/r/technology/comments/1s3cbn3/anthropic_says_claude_can_now_use_your_computer"
fetched_from: "https://agentusecases.ai/use-case/set-up-a-new-laptop-to-match-an-existing-arch-linux-machine"
---

# Set up a new laptop to match an existing Arch Linux machine

> A commenter had Claude create an Arch Linux live USB and configure a laptop to mirror another Arch machine, including tools and desktop setup.

**Category:** Software & DevOps  
**Agent:** Claude  
**Source:** Reddit · Apr 1, 2026

## What they did

A commenter said they had Claude create an Arch Linux live USB from an existing Arch PC, then plugged that USB into a Windows laptop. After giving Claude the laptop’s IP address and telling it to match the Arch machine exactly, Claude handled the setup on its own; the person only stepped in at the end to remove the USB after Claude said it had rebooted the laptop.

## How it went

The commenter said the laptop came up 15 minutes later as a fully configured Arch Linux system with the same tools and desktop setup they wanted. They also claimed Claude now keeps their computers updated, but gave no technical detail on how it did the install or maintenance.

## Worth knowing

The main practical detail is speed: they said the clone-style setup took about 15 minutes, but the post does not explain the method or tooling.

## Prompt

```text
I want my new laptop [model] to match my existing Arch Linux machine. Inspect this machine's installed packages, dotfiles and desktop setup, then write a script and notes to recreate them, plus steps to build an Arch live USB on [device path]. Show me every command that writes to a disk before running it, and finish with a checklist for verifying the new laptop.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Track competitor prices and contacts into Google Sheets](./track-competitor-prices-and-contacts-into-google-sheets.md)
- [Run weekly marketing content in brand voice](./run-weekly-marketing-content-in-brand-voice.md)
- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Upgrade site dependencies and frameworks with Cursor](./upgrade-site-dependencies-and-frameworks-with-cursor.md)
- [Deploy agent-built static pages to your own Cloudflare domain](./deploy-agent-built-static-pages-to-your-own-cloudflare-domai.md)
