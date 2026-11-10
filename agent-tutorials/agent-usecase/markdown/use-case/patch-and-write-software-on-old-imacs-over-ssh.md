---
title: "Patch and write software on old iMacs over SSH"
slug: "patch-and-write-software-on-old-imacs-over-ssh"
summary: "A commenter has Claude SSH into 2007-era iMacs to patch issues and write bespoke software, upcycling old hardware."
category: "Software & DevOps"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "HN"
source_date: "Oct 28, 2026"
source_url: "https://news.ycombinator.com/item?id=50274432"
fetched_from: "https://agentusecases.ai/use-case/patch-and-write-software-on-old-imacs-over-ssh"
---

# Patch and write software on old iMacs over SSH

> A commenter has Claude SSH into 2007-era iMacs to patch issues and write bespoke software, upcycling old hardware.

**Category:** Software & DevOps  
**Agent:** Claude  
**Source:** HN · Oct 28, 2026

## What they did

The commenter keeps a 2007 iMac running Mac OS X 10.6 for an iPod and CD collection, with an SSD added for speed. Claude connects to these old machines over SSH to patch issues and write bespoke software for them. The commenter also mentions Powerfox, a port that runs a fairly modern Firefox on 10.6.

## How it went

The commenter says an SSD makes these machines surprisingly fast and that agents can help upcycle old hardware. No specific results, numbers, or failures are given.

## Worth knowing

This is a short comment, not a walkthrough, so it gives no details on setup, prompts, or what was actually patched.

## Prompt

```text
I have an old computer at [hostname or IP] that I can reach over SSH as [username]. Connect, check the OS version and what's installed, then diagnose [the problem, e.g. browser won't load modern sites] and propose a fix. Show me each command that changes anything before you run it, and stop when the problem is fixed and you've written a short summary of what changed.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Build a project management tool with a 24-hour agent run](./build-a-project-management-tool-with-a-24-hour-agent-run.md)
