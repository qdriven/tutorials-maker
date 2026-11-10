---
title: "Debug prod pods and docker-compose with Cursor"
slug: "debug-prod-pods-and-docker-compose-with-cursor"
summary: "A DevOps engineer uses Cursor with a Kubernetes MCP to pull prod logs and suggest fixes, and to repair a broken docker-compose file."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "medium.com"
source_date: "Undated"
source_url: "https://medium.com/@soodrajesh/advanced-tips-and-tricks-for-cursor-ide-7dc236ff9870"
fetched_from: "https://agentusecases.ai/use-case/debug-prod-pods-and-docker-compose-with-cursor"
---

# Debug prod pods and docker-compose with Cursor

> A DevOps engineer uses Cursor with a Kubernetes MCP to pull prod logs and suggest fixes, and to repair a broken docker-compose file.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** medium.com · Undated

## What they did

With a Kubernetes MCP enabled in Cursor, Rajesh Sood asks in plain language for the logs of a named prod pod. Cursor pulls them and suggests fixes without him running kubectl. For a broken docker-compose.yml, he turned on the agent setting that runs commands automatically. He told it to keep retrying a compose dry-run until the build errors cleared.

## How it went

The author says the agent iterated on its own until the compose file passed. The article gives no numbers, and no example output from the prod log debugging.

## Worth knowing

He says Cursor once hallucinated secrets from a .env file; adding .env to .cursorignore fixed it. He also advises committing often, because agent changes can go wrong.

## Prompt

```text
Connect to my Kubernetes cluster via MCP, pull recent logs for [pod/deployment name], diagnose the issue, and suggest a fix. Also check my docker-compose.yml for errors and propose corrected version, showing me the diff before applying any changes.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Draft articles quoting Kindle highlights and notes](./draft-articles-quoting-kindle-highlights-and-notes.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
