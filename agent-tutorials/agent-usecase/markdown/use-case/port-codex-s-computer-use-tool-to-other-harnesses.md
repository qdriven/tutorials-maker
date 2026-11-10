---
title: "Port Codex's computer-use tool to other harnesses"
slug: "port-codex-s-computer-use-tool-to-other-harnesses"
summary: "The poster pointed Gemini at a folder and had it adapt Codex's computer-use tool for Antigravity, finishing in under 10 minutes."
category: "Software & DevOps"
agents:
  - name: "Gemini"
    slug: "gemini"
  - name: "Codex"
    slug: "codex"
source_platform: "Reddit"
source_date: "Sep 4, 2026"
source_url: "https://www.reddit.com/r/GeminiAI/comments/1w5rfs7/i_got_gemini_38_to_adapt_codexs_computeruse_tool"
fetched_from: "https://agentusecases.ai/use-case/port-codex-s-computer-use-tool-to-other-harnesses"
---

# Port Codex's computer-use tool to other harnesses

> The poster pointed Gemini at a folder and had it adapt Codex's computer-use tool for Antigravity, finishing in under 10 minutes.

**Category:** Software & DevOps  
**Agent:** Gemini, Codex  
**Source:** Reddit · Sep 4, 2026

## What they did

The poster says they pointed Gemini 3.8 in Antigravity at Codex’s folder on their PC and told it to adapt Codex’s computer-use tool for Antigravity. In under 10 minutes, Gemini rewired the Codex binary into a zero-dependency bridge that works as both a CLI and MCP stdio server, while reverse-engineering sandbox window access, auto-approving new apps, restoring the hidden mouse cursor, and adding screenshot fallback for Chrome or minimized windows.

## How it went

The result reportedly reached feature parity with Codex’s tool and worked on tests including autonomous Telegram Web messaging on a dual-monitor setup and full Antigravity UI navigation. The post does not give benchmark numbers or failure rates beyond saying early issues included invisible cursor and failed browser capture.

## Worth knowing

The main catch is that Gemini had to solve several Windows-specific low-level issues around desktop isolation, approvals, cursor recovery, and screen capture to make the bridge usable.

## Prompt

```text
I've pointed you at the folder [path to folder] that contains [source tool, such as a computer-use tool from one agent harness]. Read how it works and adapt it so it runs in [target harness or environment]. You're finished when the ported tool is in [output folder], with a short README on how to install it and a basic test showing it works. Tell me what you changed and anything that couldn't be carried over.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Solve open math problems autonomously](./solve-open-math-problems-autonomously.md)
- [Split work between ChatGPT architect and Codex executor](./split-work-between-chatgpt-architect-and-codex-executor.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Migrate 180 microservices to a new framework version](./migrate-180-microservices-to-a-new-framework-version.md)
- [Build code with agents while keeping a working understanding](./build-code-with-agents-while-keeping-a-working-understanding.md)
