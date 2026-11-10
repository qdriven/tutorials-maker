---
title: "Manage NixOS server configs with Claude Code"
slug: "manage-nixos-server-configs-with-claude-code"
summary: "The author uses Claude Code to maintain the NixOS config repo for their self-hosted machines, blocked from running nixos-rebuild switch and reviewing each change before applying it manually."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "HN"
source_date: "Oct 9, 2026"
source_url: "https://news.ycombinator.com/item?id=50017667"
fetched_from: "https://agentusecases.ai/use-case/manage-nixos-server-configs-with-claude-code"
---

# Manage NixOS server configs with Claude Code

> The author uses Claude Code to maintain the NixOS config repo for their self-hosted machines, blocked from running nixos-rebuild switch and reviewing each change before applying it manually.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** HN · Oct 9, 2026

## What they did

The author keeps one config repo that defines all their NixOS machines, two refurbished 32GB Lenovo laptops used as self-hosting servers, and has Claude Code work on it. Claude is restricted from running nixos-rebuild switch. The author reviews each change and runs the switch manually.

## How it went

The source gives no results or numbers for the Claude workflow itself. It only says the review-then-switch setup is how they manage the machines, which run services like Nextcloud, Vaultwarden and Jellyfin.

## Worth knowing

Block nixos-rebuild switch for the agent so every change to a live machine gets human review before it is applied.

## Prompt

```text
Help me maintain the NixOS config repo at [path to repo] for my machines [machine names]. Make this change: [describe change, such as adding a service or updating a package]. You may edit files and run dry builds, but never run nixos-rebuild switch. Show me the full diff and a plain-language explanation so I can review and apply it myself.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
