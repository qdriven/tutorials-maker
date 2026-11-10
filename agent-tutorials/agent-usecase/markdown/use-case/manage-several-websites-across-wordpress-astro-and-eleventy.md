---
title: "Manage several websites across WordPress, Astro and Eleventy"
slug: "manage-several-websites-across-wordpress-astro-and-eleventy"
summary: "The poster uses OpenClaw, alongside Claude Code and Codex, to manage and work across about five websites."
category: "Software & DevOps"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Codex"
    slug: "codex"
source_platform: "Reddit"
source_date: "Aug 19, 2026"
source_url: "https://www.reddit.com/r/openclaw/comments/1vt0a5e/my_experience_with_openclaw"
fetched_from: "https://agentusecases.ai/use-case/manage-several-websites-across-wordpress-astro-and-eleventy"
---

# Manage several websites across WordPress, Astro and Eleventy

> The poster uses OpenClaw, alongside Claude Code and Codex, to manage and work across about five websites.

**Category:** Software & DevOps  
**Agent:** OpenClaw, Claude Code, Codex  
**Source:** Reddit · Aug 19, 2026

## What they did

The poster says they use OpenClaw to manage about five websites spanning WordPress, Astro, and Eleventy, alongside Claude Code and Codex so they can pick different coding agents for different tasks. The thread adds one concrete workflow around upkeep: people wait on updates, back up first, and in one case use Claude Code to clone the OpenClaw install on the same server, test and troubleshoot the upgrade there, then only update the real system if it passes.

## How it went

The poster says the setup has become genuinely useful for working across several sites, but updates are the weak point. They report that almost every update breaks something, and another commenter said it took Claude four update-and-rollback attempts to get from 5.28 to 7.1-2 working.

## Worth knowing

The main catch is upgrade risk: commenters describe treating updates like production deployments, with backups, snapshots, or a test replica before touching the live setup.

## Prompt

```text
Look at the site projects in [folder paths] built with [WordPress, Astro, Eleventy, etc.] and do [task, such as update dependencies, fix broken links, or add a new page]. Work on one site at a time and run each site's build to confirm it still works. Summarize what changed per site, and ask me before deploying, pushing to production, or deleting anything.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Synthesize interview transcripts and PDFs for research](./synthesize-interview-transcripts-and-pdfs-for-research.md)
- [Use Codex for non-coding chores](./use-codex-for-non-coding-chores.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Port a Chrome extension to Safari](./port-a-chrome-extension-to-safari.md)
