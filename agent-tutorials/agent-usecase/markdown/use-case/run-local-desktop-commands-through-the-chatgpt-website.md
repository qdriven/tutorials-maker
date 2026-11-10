---
title: "Run local desktop commands through the ChatGPT website"
slug: "run-local-desktop-commands-through-the-chatgpt-website"
summary: "The author built a desktop app plus Chrome extension that makes the ChatGPT website act as a local coding agent running commands on their desktop; not available for general release."
category: "Software & DevOps"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "HN"
source_date: "Nov 3, 2026"
source_url: "https://news.ycombinator.com/item?id=50352857"
fetched_from: "https://agentusecases.ai/use-case/run-local-desktop-commands-through-the-chatgpt-website"
---

# Run local desktop commands through the ChatGPT website

> The author built a desktop app plus Chrome extension that makes the ChatGPT website act as a local coding agent running commands on their desktop; not available for general release.

**Category:** Software & DevOps  
**Agent:** ChatGPT  
**Source:** HN · Nov 3, 2026

## What they did

The author paired a desktop app with a Chrome extension so the ChatGPT website could work as a local coding agent, running real commands on their own desktop. The comment says this took a lot of fighting with the website itself. The technical details are in a separate note the author links to, which this comment only mentions.

## How it went

It partly works, in the author's words "sorta". It is not available for general release, and the comment gives no numbers or benchmarks.

## Worth knowing

The comment doesn't say how the setup behaves in practice or why it can't be released, so read the author's linked note for those details.

## Prompt

```text
Help me work on the project in [folder path] by running commands on my computer. Start by reading the project and running [test or build command], then fix any failures you find in [language or framework]. Show me each change before you apply it, and ask before running anything that deletes files or installs software. Stop when the command passes and give me a short summary of what changed.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Turn spoken answers into a Todoist task list](./turn-spoken-answers-into-a-todoist-task-list.md)
- [Accelerate scientific research with Codex](./accelerate-scientific-research-with-codex.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Diagnose Kubernetes alerts with MCP servers](./diagnose-kubernetes-alerts-with-mcp-servers.md)
- [Plan with PRDs and delegate tasks to cheaper agents](./plan-with-prds-and-delegate-tasks-to-cheaper-agents.md)
