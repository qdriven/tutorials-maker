---
title: "Cross-check coding agent answers with a second agent"
slug: "cross-check-coding-agent-answers-with-a-second-agent"
summary: "The poster built a tool that automatically sends Claude Code responses to Codex for a second opinion, replacing manual copy-pasting."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Codex"
    slug: "codex"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/OpenaiCodex/comments/1pdv38j/got_tired_of_copypasting_my_agents_responses_into"
fetched_from: "https://agentusecases.ai/use-case/cross-check-coding-agent-answers-with-a-second-agent"
---

# Cross-check coding agent answers with a second agent

> The poster built a tool that automatically sends Claude Code responses to Codex for a second opinion, replacing manual copy-pasting.

**Category:** Software & DevOps  
**Agent:** Claude Code, Codex  
**Source:** Reddit · Undated

## What they did

The poster had been manually pasting Claude Code’s replies into Codex for a second opinion, then built Sage to automate that workflow. Sage runs in a separate terminal, watches the main coding agent in real time, and sends each response to another model for review while keeping its own persistent thread; unlike the MCP approach they tried, it can read the codebase, use tools, search the web, and the human chooses whether to apply or ignore the feedback.

## How it went

They say this workflow led to far fewer bugs and caught bad plans early, but they gave no hard metrics. In comments, users reported it already made useful catches, while the poster noted some rough edges around plan mode and needing to restart after Claude’s /clear.

## Worth knowing

You can authenticate through a ChatGPT Pro Codex subscription or an API key, but /clear creates a new conversation log, so you have to rerun Sage and pick the new convo.

## Prompt

```text
Build me a small tool that takes each response Claude Code gives in my project at [repo path] and automatically sends it, with the relevant question and code context, to Codex for a second opinion. It should show me both answers side by side and highlight where they disagree. You're done when I can run one command and see the cross-check for a sample question, and tell me before installing anything or running commands that change my repo.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Patch laptop BIOS to unlock hidden firmware menus](./patch-laptop-bios-to-unlock-hidden-firmware-menus.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Click through apps to verify its own work](./click-through-apps-to-verify-its-own-work.md)
- [Auto-generate a searchable help video library for an app](./auto-generate-a-searchable-help-video-library-for-an-app.md)
