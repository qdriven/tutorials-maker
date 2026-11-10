---
title: "Run coding agents from one front-end across machines and VPS"
slug: "run-coding-agents-from-one-front-end-across-machines-and-vps"
summary: "A developer uses T3 Code as a front-end for Claude Code, Codex, and pi on personal machines and a VPS, and Copilot at work, for implementing tasks and drafting commit messages and PR summaries."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Codex"
    slug: "codex"
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "HN"
source_date: "Nov 4, 2026"
source_url: "https://news.ycombinator.com/item?id=50367589"
fetched_from: "https://agentusecases.ai/use-case/run-coding-agents-from-one-front-end-across-machines-and-vps"
---

# Run coding agents from one front-end across machines and VPS

> A developer uses T3 Code as a front-end for Claude Code, Codex, and pi on personal machines and a VPS, and Copilot at work, for implementing tasks and drafting commit messages and PR summaries.

**Category:** Software & DevOps  
**Agent:** Claude Code, Codex, GitHub Copilot  
**Source:** HN · Nov 4, 2026

## What they did

The developer runs T3 Code as one front-end over several agents on personal computers and a VPS: Claude Code, Codex, and pi (for an OpenCode Go subscription). At work a separate T3 Code uses GitHub Copilot via ACP, kept apart from personal machines. They break implementation into small pieces and raise reasoning effort or use a bigger model for architecture and design work.

## How it went

Small tasks work well even without extra reasoning, and DeepSeek 4.1 Flash has proven capable. Models still struggle with prose, so most effort goes into rewriting reports, commit messages, and PR summaries.

## Worth knowing

Split implementation into small tasks; save high reasoning effort or larger models for architecture and cross-subsystem features, and expect to rewrite generated prose yourself.

## Prompt

```text
In [project folder], implement this task: [describe the task]. When the code works and tests pass, draft a concise commit message and a pull request summary covering what changed and why. Do not commit or push anything; show me the diff and the drafts so I can approve them first.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a racing game from a single prompt](./build-a-racing-game-from-a-single-prompt.md)
- [Automate content distribution across Reddit and LinkedIn](./automate-content-distribution-across-reddit-and-linkedin.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build a project management tool with a 24-hour agent run](./build-a-project-management-tool-with-a-24-hour-agent-run.md)
