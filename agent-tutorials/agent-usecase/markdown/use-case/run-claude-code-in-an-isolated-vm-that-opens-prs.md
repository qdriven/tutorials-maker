---
title: "Run Claude Code in an isolated VM that opens PRs"
slug: "run-claude-code-in-an-isolated-vm-that-opens-prs"
summary: "The author runs Claude Code in a restricted VM with secrets served from Infisical. It can only create issues and PRs on Forgejo, and merges are manual before CI deploys."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "HN"
source_date: "Oct 20, 2026"
source_url: "https://news.ycombinator.com/item?id=50164831"
fetched_from: "https://agentusecases.ai/use-case/run-claude-code-in-an-isolated-vm-that-opens-prs"
---

# Run Claude Code in an isolated VM that opens PRs

> The author runs Claude Code in a restricted VM with secrets served from Infisical. It can only create issues and PRs on Forgejo, and merges are manual before CI deploys.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** HN · Oct 20, 2026

## What they did

Claude Code runs in its own VM on a heavily restricted VLAN that can reach only the internet, the author's Forgejo instance, Infisical, and one-way SSH from the author's machine. Secrets come through Infisical, so the agent never sees them. Its Forgejo user can only create issues and PRs. The author merges manually, then CI packages and deploys to an app server VM.

## How it went

The source gives no measured results. It describes the setup as overkill but worth it to cut the risk of personal data exfiltration. Dev mode can still expose some secrets locally.

## Worth knowing

In local dev mode the agent may still see secrets, so the Infisical protection only fully holds outside that mode.

## Prompt

```text
Help me set up a locked-down virtual machine for running you on my project [repo name]. Give it only the permissions it needs: reading the code, getting secrets from [secrets manager], and opening issues and pull requests on [Git host], with no ability to merge. Walk me through the setup step by step, and finish by having it open a small test pull request. Pause and show me each command that changes my system or credentials before you run it.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
