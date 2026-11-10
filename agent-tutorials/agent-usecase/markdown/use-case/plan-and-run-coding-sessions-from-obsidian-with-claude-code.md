---
title: "Plan and run coding sessions from Obsidian with Claude Code"
slug: "plan-and-run-coding-sessions-from-obsidian-with-claude-code"
summary: "Author drives Claude Code from Obsidian, with plan prompts, handoff docs, per-plan tmux sessions and an Efforts page tracking open PRs and progress."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Claude"
    slug: "claude"
source_platform: "HN"
source_date: "Nov 5, 2026"
source_url: "https://news.ycombinator.com/item?id=50379612"
fetched_from: "https://agentusecases.ai/use-case/plan-and-run-coding-sessions-from-obsidian-with-claude-code"
---

# Plan and run coding sessions from Obsidian with Claude Code

> Author drives Claude Code from Obsidian, with plan prompts, handoff docs, per-plan tmux sessions and an Efforts page tracking open PRs and progress.

**Category:** Software & DevOps  
**Agent:** Claude Code, Claude  
**Source:** HN · Nov 5, 2026

## What they did

Runs Claude Code inside separate Linux user accounts on Arch, one per major project, each with its own Obsidian vault. QuickAdd commands create a plan prompt, then a plan workflow skill writes the plan and a handoff doc as subpages. A "Send to Claude Session" command opens a tmux session named for the plan.

## How it went

Gives separate per-plan sessions and a global Efforts page showing open PRs, percent complete, next step, and a color-coded executing, idle or closed status. No timings or quantified results are given.

## Worth knowing

The author pays for a $20/mo personal and $100/mo work Claude subscription, and found OpenClaw and Hermes unproductive and local Qwen via OpenCode slow.

## Prompt

```text
Work from my Obsidian vault at [vault path]. For the task [describe feature or bug] in [repo path], write a plan note, then a handoff doc listing the steps, files involved and how to test it, and start a tmux session named for the plan. Keep an Efforts page in the vault with each plan's status and open PR links, and update it as you go; you're done when the plan, handoff doc and Efforts entry all exist. Ask me before pushing code or opening a PR.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Research and draft cold outreach with Claude Code](./research-and-draft-cold-outreach-with-claude-code.md)
- [Publish local news posts to WordPress automatically](./publish-local-news-posts-to-wordpress-automatically.md)
- [Review Linux kernel patches](./review-linux-kernel-patches.md)
- [Upgrade site dependencies and frameworks with Cursor](./upgrade-site-dependencies-and-frameworks-with-cursor.md)
- [Build an AI app over ten days](./build-an-ai-app-over-ten-days.md)
