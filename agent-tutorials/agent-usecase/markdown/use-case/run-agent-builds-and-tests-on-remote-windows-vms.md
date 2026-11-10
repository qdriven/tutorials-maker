---
title: "Run agent builds and tests on remote Windows VMs"
slug: "run-agent-builds-and-tests-on-remote-windows-vms"
summary: "A developer gives coding agents ssh access to WSL instances on remote Windows VMs to run builds and tests instead of on their Mac laptop."
category: "Software & DevOps"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "HN"
source_date: "Oct 18, 2026"
source_url: "https://news.ycombinator.com/item?id=50137976"
fetched_from: "https://agentusecases.ai/use-case/run-agent-builds-and-tests-on-remote-windows-vms"
---

# Run agent builds and tests on remote Windows VMs

> A developer gives coding agents ssh access to WSL instances on remote Windows VMs to run builds and tests instead of on their Mac laptop.

**Category:** Software & DevOps  
**Agent:** Codex  
**Source:** HN · Oct 18, 2026

## What they did

The developer's employer supplies a Mac laptop plus remote Windows VMs. The agents get ssh access to WSL instances on those VMs and run their builds and tests there. Setup is ad hoc: agents have to pull the latest code, or the developer keeps the main enlistment current on each machine.

## How it went

Builds no longer run on the Mac, so background agents stop causing video streams to drop during meetings. The developer is happy with it, though the setup is only good enough for now.

## Worth knowing

Keeping code in sync on the VMs is manual; the developer is considering containers or GitHub Actions to make it cleaner.

## Prompt

```text
I'm working in [project folder] on my [Mac/Linux] machine, but builds and tests must run on a remote Windows machine. You can reach it with ssh at [user@host] and use WSL there. Sync the code to [remote path], run [build command] and [test command] over ssh, and report which tests passed and failed with the relevant error output. Do not delete or overwrite anything on the remote machine outside [remote path], and show me any command that would do so before running it.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Diagnose a killed process on a server](./diagnose-a-killed-process-on-a-server.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Migrate an Electron app from Vue 2 to Vue 3](./migrate-an-electron-app-from-vue-2-to-vue-3.md)
- [Auto-generate a searchable help video library for an app](./auto-generate-a-searchable-help-video-library-for-an-app.md)
