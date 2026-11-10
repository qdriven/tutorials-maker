---
title: "Triage issues and open fix PRs with a GitHub bot"
slug: "triage-issues-and-open-fix-prs-with-a-github-bot"
summary: "A cookbook shows a GitHub bot that triages issues, reviews PRs, answers questions with citations, flags AI-slop contributions, and opens patch PRs for human review."
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "dev.meta.ai"
source_date: "Undated"
source_url: "https://dev.meta.ai/docs/cookbook/github-agent"
fetched_from: "https://agentusecases.ai/use-case/triage-issues-and-open-fix-prs-with-a-github-bot"
---

# Triage issues and open fix PRs with a GitHub bot

> A cookbook shows a GitHub bot that triages issues, reviews PRs, answers questions with citations, flags AI-slop contributions, and opens patch PRs for human review.

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent  
**Source:** dev.meta.ai · Undated

## What they did

The bot runs on OpenCode in GitHub Actions with Muse Spark. Each agent is a markdown file with its own tool allow-list. Events route to agents: a PR runs review, a new issue runs triage, and an agent-fix label runs bugfix. A maintainer's /oc comment goes to an orchestrator agent. Bugfix reproduces the bug, patches it, adds a test, runs pytest and opens a PR. It cannot merge.

## How it went

Sample outputs show triage asking for a repro, review flagging emoji churn as slop, and a prompt injection being flagged. No benchmark is reported yet. Long review turns sometimes return empty, so re-run.

## Worth knowing

Prompts are tuned for Python, pytest and uv, so adapt AGENTS.md and the agent files. The allow-lists are not a sandbox; human gates and branch protection are the real boundary.

## Prompt

```text
Help me set up a GitHub bot for [owner/repo] that triages new issues with labels, reviews pull requests, answers questions with citations to the repo's docs or code, and flags low-effort AI-generated contributions. For clear small bugs it should open a patch PR for human review only. Build it, test it on a few existing issues in dry-run mode, and show me the output before it posts any comments or opens any PRs.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Configure a local AI lab and build a knowledge graph by chat](./configure-a-local-ai-lab-and-build-a-knowledge-graph-by-chat.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
