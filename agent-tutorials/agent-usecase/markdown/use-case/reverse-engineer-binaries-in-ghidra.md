---
title: "Reverse-engineer binaries in Ghidra"
slug: "reverse-engineer-binaries-in-ghidra"
summary: "An MCP server exposing 110 Ghidra tools for AI-assisted reverse engineering. · Feb 4, 2026"
category: "Security, Science & Hardware"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://github.com/bethington/ghidra-mcp"
fetched_from: "https://agentusecases.ai/use-case/reverse-engineer-binaries-in-ghidra"
---

# Reverse-engineer binaries in Ghidra

> An MCP server exposing 110 Ghidra tools for AI-assisted reverse engineering. · Feb 4, 2026

**Category:** Security, Science & Hardware  
**Agent:** custom-built or unnamed agent

## What they did

A Ghidra plugin starts an HTTP server on localhost, and a Python bridge exposes it to MCP clients such as Claude or Cursor. The agent decompiles functions, follows call graphs and cross-references, and renames, retypes and comments in batches. A person builds and deploys the plugin and enables it in CodeBrowser.

## How it went

The README now lists 253 tools, not 110. It claims 93% fewer API calls from batching, and says it was refined over hundreds of documented functions. It gives no benchmark of results.

## Worth knowing

Lazy tool loading is on by default because Gemini rejects the full tool list. Script-running endpoints are off unless you set GHIDRA_MCP_ALLOW_SCRIPTS, and the server has no authentication on localhost.

## Prompt

```text
Connect to the Ghidra MCP server I have set up and open the binary at [path to binary]. Identify its main functions, rename them based on what they do, and list any suspicious behavior such as network calls or file writes. Finish with a short written summary of what the program does and the functions that support that conclusion.
```

## Related use cases

- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Generate parametric geometry workflows with an agent](./generate-parametric-geometry-workflows-with-an-agent.md)
- [Run a home robot through Claude Desktop](./run-a-home-robot-through-claude-desktop.md)
- [Repair formal proofs for a verified garbage collector](./repair-formal-proofs-for-a-verified-garbage-collector.md)
- [Orchestrate a Spot robot through multi-step tasks](./orchestrate-a-spot-robot-through-multi-step-tasks.md)
- [Run an AI agent on a Nokia 110 feature phone](./run-an-ai-agent-on-a-nokia-110-feature-phone.md)
