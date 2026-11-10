---
title: "Port Claude Code skills to Codex"
slug: "port-claude-code-skills-to-codex"
summary: "The author moved 201 Claude Code skills to Codex in an afternoon using a skill inside Claude Code, and reports what transferred and what broke."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Codex"
    slug: "codex"
source_platform: "charliehills.substack.com"
source_date: "Undated"
source_url: "https://charliehills.substack.com/p/claude-code-codex"
fetched_from: "https://agentusecases.ai/use-case/port-claude-code-skills-to-codex"
---

# Port Claude Code skills to Codex

> The author moved 201 Claude Code skills to Codex in an afternoon using a skill inside Claude Code, and reports what transferred and what broke.

**Category:** Software & DevOps  
**Agent:** Claude Code, Codex  
**Source:** charliehills.substack.com · Undated

## What they did

Charlie Hills used the Codex app's Settings > Import > Claude Code to copy his skills, projects and recent chats, with CLAUDE.md renamed AGENTS.md. He then installed OpenAI's migrate-to-codex skill inside Claude Code to convert the leftovers (subagents, hooks, shortcuts) and keep both tools running. Last, he had Codex read his rules back and report which ones were Claude-only.

## How it went

201 skills moved in an afternoon and 106 landed cleanly. Afterward 155 skills and 28 agents ran in both tools. The migration report showed 3,006 infographic files still in iCloud.

## Worth knowing

Back up your Codex settings file first, because the migrate skill rewrites it from scratch.

## Prompt

```text
I have a set of Claude Code skills in [folder path]. Convert them to work with Codex, putting the results in [destination folder], and keep the originals untouched. When done, give me a list of which skills transferred cleanly and which broke or need manual fixes, with the reason for each.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Patch laptop BIOS to unlock hidden firmware menus](./patch-laptop-bios-to-unlock-hidden-firmware-menus.md)
- [Run a live Kalshi prediction-market account autonomously](./run-a-live-kalshi-prediction-market-account-autonomously.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Click through apps to verify its own work](./click-through-apps-to-verify-its-own-work.md)
- [Auto-generate a searchable help video library for an app](./auto-generate-a-searchable-help-video-library-for-an-app.md)
