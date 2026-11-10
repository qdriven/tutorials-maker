---
title: "Vibe-code a pull request dashboard across Azure DevOps repos"
slug: "vibe-code-a-pull-request-dashboard-across-azure-devops-repos"
summary: "Author used ChatGPT for architecture and the Junie agent in WebStorm to build a dashboard aggregating PRs across four repos, flagging approvals, conflicts and comments, in about 3 hours."
category: "Software & DevOps"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "HN"
source_date: "Nov 10, 2025"
source_url: "https://news.ycombinator.com/item?id=45881626"
fetched_from: "https://agentusecases.ai/use-case/vibe-code-a-pull-request-dashboard-across-azure-devops-repos"
---

# Vibe-code a pull request dashboard across Azure DevOps repos

> Author used ChatGPT for architecture and the Junie agent in WebStorm to build a dashboard aggregating PRs across four repos, flagging approvals, conflicts and comments, in about 3 hours.

**Category:** Software & DevOps  
**Agent:** ChatGPT  
**Source:** HN · Nov 10, 2025

## What they did

The author described the goals to ChatGPT 5 to get an architecture, then gave that output to the Junie agent in WebStorm to write a Readme and project guidelines. They built it step by step: layout, dummy data, Azure API calls, YouTrack integration, features. PATs stay local. They hand-edited no code but read it and suggested improvements.

## How it went

After about 3 hours there were three views, and the team loved it. Another hour added their suggestions, and everyone uses it daily. Almost every step worked first try; Junie sometimes got repetitive or inconsistent.

## Worth knowing

Adding a step to maximize code reuse and centralize configuration fixed the repetition and inconsistency Junie produced. The author says it struggles on their large .NET Maui codebase.

## Prompt

```text
Build a dashboard that pulls open pull requests from my [Azure DevOps/GitHub] repos [repo names] and shows for each one its approval status, merge conflicts, and unresolved comments. Start with a simple architecture proposal, then build it step by step. Finished means the dashboard runs locally against my real repos with read-only access. Don't push code or change any PRs.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Generate a spoken daily news bulletin at home](./generate-a-spoken-daily-news-bulletin-at-home.md)
- [Find SEO competitors with ChatGPT Pro agent](./find-seo-competitors-with-chatgpt-pro-agent.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
