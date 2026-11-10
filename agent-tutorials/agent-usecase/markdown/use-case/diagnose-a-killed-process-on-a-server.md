---
title: "Diagnose a killed process on a server"
slug: "diagnose-a-killed-process-on-a-server"
summary: "Codex CLI over SSH found the OOM killer in kernel logs on a 2 GB droplet with no swap and listed fixes by risk without changing anything."
category: "Software & DevOps"
agents:
  - name: "Codex"
    slug: "codex"
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "flaviocopes.com"
source_date: "Undated"
source_url: "https://flaviocopes.com/server-process-killed/"
fetched_from: "https://agentusecases.ai/use-case/diagnose-a-killed-process-on-a-server"
---

# Diagnose a killed process on a server

> Codex CLI over SSH found the OOM killer in kernel logs on a 2 GB droplet with no swap and listed fixes by risk without changing anything.

**Category:** Software & DevOps  
**Agent:** Codex, Claude Code  
**Source:** flaviocopes.com · Undated

## What they did

Claude Code kept dying within seconds on the author's Ubuntu droplet. He ran Codex CLI on his Mac and gave it the SSH command for the server, plus the symptom and no hints. Codex asked approval to connect, then checked memory, processes and limits. It grepped the kernel log via journalctl for kill and OOM messages.

## How it went

Codex found the OOM killer ending claude at about 860 MB on a 1.9 GB droplet with no swap, with MySQL using about 786 MB. It ranked fixes and changed nothing.

## Worth knowing

The author resized the droplet, which caused its own problems. He says in hindsight that the first fix Codex listed, a 2 GB swap file, was cheaper.

## Prompt

```text
My server at [user@host] has a process that keeps getting killed, namely [service name]. Connect over SSH and investigate read-only: check kernel logs, memory, swap, and service logs to find the cause. Finish with a diagnosis and a list of possible fixes ranked by risk. Do not change any settings, install anything, or restart services without showing me the exact command and getting my approval first.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Patch laptop BIOS to unlock hidden firmware menus](./patch-laptop-bios-to-unlock-hidden-firmware-menus.md)
- [Run a live Kalshi prediction-market account autonomously](./run-a-live-kalshi-prediction-market-account-autonomously.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Click through apps to verify its own work](./click-through-apps-to-verify-its-own-work.md)
- [Auto-generate a searchable help video library for an app](./auto-generate-a-searchable-help-video-library-for-an-app.md)
