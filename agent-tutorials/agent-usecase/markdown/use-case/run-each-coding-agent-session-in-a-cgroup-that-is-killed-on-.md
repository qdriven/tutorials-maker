---
title: "Run each coding agent session in a cgroup that is killed on completion"
slug: "run-each-coding-agent-session-in-a-cgroup-that-is-killed-on-"
summary: "A developer built an agent spawner that launches each coding agent session in its own cgroup and kills leftover processes when the task completes, plus a job that clears stale tmp files."
category: "Software & DevOps"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "HN"
source_date: "Oct 17, 2026"
source_url: "https://news.ycombinator.com/item?id=50136354"
fetched_from: "https://agentusecases.ai/use-case/run-each-coding-agent-session-in-a-cgroup-that-is-killed-on-"
---

# Run each coding agent session in a cgroup that is killed on completion

> A developer built an agent spawner that launches each coding agent session in its own cgroup and kills leftover processes when the task completes, plus a job that clears stale tmp files.

**Category:** Software & DevOps  
**Agent:** Codex  
**Source:** HN · Oct 17, 2026

## What they did

The developer traced heavy swapping to a RAM-backed tmpfs /tmp and to processes that earlier coding agents had forked and abandoned. They added a frequently run job that deletes tmp files unused for about two hours and not held open by any command. They also built their agent spawner to launch each session in its own cgroup, killing every process in it when the task finishes.

## How it went

The source gives no measurements. It says the cleanup job and per-session cgroups addressed the swap usage and the leftover processes, but it is a brief forum comment with no before-and-after figures.

## Worth knowing

Check whether swap is really coming from a RAM-backed tmpfs /tmp before blaming the agents; the cleanup job only removes files with no open handles.

## Prompt

```text
In my repo at [path], write a small agent spawner script for [Linux distro or systemd setup] that launches each coding agent session in its own cgroup and kills every leftover process in that cgroup when the task finishes or fails. Also add a scheduled job that deletes stale files older than [number] hours in [tmp directory]. Finish by running a test session that leaves a background process behind and showing me that it gets cleaned up. Before deleting any files or killing processes outside the test, show me what would be removed and wait for my approval.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Diagnose a killed process on a server](./diagnose-a-killed-process-on-a-server.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Migrate an Electron app from Vue 2 to Vue 3](./migrate-an-electron-app-from-vue-2-to-vue-3.md)
- [Auto-generate a searchable help video library for an app](./auto-generate-a-searchable-help-video-library-for-an-app.md)
