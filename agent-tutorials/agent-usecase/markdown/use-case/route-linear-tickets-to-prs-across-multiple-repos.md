---
title: "Route Linear tickets to PRs across multiple repos"
slug: "route-linear-tickets-to-prs-across-multiple-repos"
summary: "A developer sends tasks via Telegram/OpenClaw into Linear, where Cyrus routes each to the right repo and model and opens PRs for review."
category: "Software & DevOps"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "HN"
source_date: "Sep 8, 2026"
source_url: "https://news.ycombinator.com/item?id=49615716"
fetched_from: "https://agentusecases.ai/use-case/route-linear-tickets-to-prs-across-multiple-repos"
---

# Route Linear tickets to PRs across multiple repos

> A developer sends tasks via Telegram/OpenClaw into Linear, where Cyrus routes each to the right repo and model and opens PRs for review.

**Category:** Software & DevOps  
**Agent:** OpenClaw  
**Source:** HN · Sep 8, 2026

## What they did

The developer sends tasks through Telegram/OpenClaw into a single Linear account that acts as the control plane across several projects. In Cyrus, they set up labels and routing so it knows which git repo to build worktrees from. Labels also select the model, such as codex or claude variants. Cyrus then opens PRs for review.

## How it went

The setup lets the developer work more hands-off, with PRs arriving across multiple repos for review. No numbers are given. For hands-on work they use Orca instead, a desktop UI with Linear and GitHub integrations.

## Prompt

```text
Set up a flow where I send a task by [Telegram or another chat app] and you create a Linear ticket for it in [team name]. Route each ticket to the right repo from [list of repos] and the right model, and have the coding agent open a pull request for review. Stop when one test task has gone from message to open PR, and never merge anything without my approval.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a booking and payment app for tattoo artists](./build-a-booking-and-payment-app-for-tattoo-artists.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
