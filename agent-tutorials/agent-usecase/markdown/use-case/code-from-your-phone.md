---
title: "Code from your phone"
slug: "code-from-your-phone"
summary: "A write-up on a setup for using Claude Code on the go. · Jan 4, 2026"
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_url: "https://granda.org/en/2026/01/02/claude-code-on-the-go/"
fetched_from: "https://agentusecases.ai/use-case/code-from-your-phone"
---

# Code from your phone

> A write-up on a setup for using Claude Code on the go. · Jan 4, 2026

**Category:** Software & DevOps  
**Agent:** Claude Code

## What they did

The author runs Claude Code on a Vultr cloud VM reachable only through Tailscale, using Termius with mosh from an iPhone. tmux keeps sessions alive. Each git worktree gets its own tmux window and agent. A PreToolUse hook sends a Poke push notification when Claude asks a question. Claude Code built the VM setup in one session, given a Vultr API key and gh access.

## How it went

He runs six agents in parallel on separate features from his phone, handling tasks of 10-20 minutes between notifications. The source gives no results beyond that workflow.

## Worth knowing

The VM costs $0.29/hr, so he starts and stops it per session. Mosh doesn't forward the SSH agent, so git auth needs plain SSH inside tmux.

## Prompt

```text
Help me set up Claude Code so I can use it from my phone on [project folder] running on my [laptop, home server, or cloud VM]. Walk me through the secure remote access setup, for example SSH plus tmux or a remote session tool, so tasks keep running when my phone disconnects. Finish with a short checklist I can follow from my phone, and ask before opening any ports.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
