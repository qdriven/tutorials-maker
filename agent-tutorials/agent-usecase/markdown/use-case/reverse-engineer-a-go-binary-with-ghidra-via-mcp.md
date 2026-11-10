---
title: "Reverse engineer a Go binary with Ghidra via MCP"
slug: "reverse-engineer-a-go-binary-with-ghidra-via-mcp"
summary: "Huli had Cursor drive GhidraMCP to identify a Golang binary, list its routes and find a path traversal, but it missed the SQL injection check."
category: "Security, Science & Hardware"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "blog.huli.tw"
source_date: "Mar 1, 2026"
source_url: "https://blog.huli.tw/2026/03/01/en/reverse-engineering-with-ai-ghidra-mcp/"
fetched_from: "https://agentusecases.ai/use-case/reverse-engineer-a-go-binary-with-ghidra-via-mcp"
---

# Reverse engineer a Go binary with Ghidra via MCP

> Huli had Cursor drive GhidraMCP to identify a Golang binary, list its routes and find a path traversal, but it missed the SQL injection check.

**Category:** Security, Science & Hardware  
**Agent:** Cursor  
**Source:** blog.huli.tw · Mar 1, 2026

## What they did

Huli built a stripped Golang gin server with a deliberate SQL injection and path traversal, loaded it into Ghidra with the GolangAnalyzerExtension, then connected GhidraMCP to Cursor so the agent could call Ghidra's decompiler itself. Prompted only to identify the binary and its functions, it autonomously queried MCP, then was asked to reconstruct the Go source and check for vulnerabilities.

## How it went

Using Cursor's composer 1.5, it correctly recovered routes, libraries, and file structure (with minor route-name errors) and found the path traversal bug but reconstructed the SQL injection code as already fixed, missing it. Switching to Opus 4.6 on the same prompt caught both vulnerabilities but still mislabeled some routes.

## Worth knowing

Results varied heavily by model: a weaker model (composer 1.5) missed the SQL injection that a stronger model (Opus 4.6) caught with the same prompt.

## Prompt

```text
Connect to Ghidra via MCP and analyze this Go binary [path/name] to identify its routes and endpoints, then look for vulnerabilities like path traversal or SQL injection. Give me a report of what it found, and flag anything uncertain for me to double check manually.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Draft articles quoting Kindle highlights and notes](./draft-articles-quoting-kindle-highlights-and-notes.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Run a home robot through Claude Desktop](./run-a-home-robot-through-claude-desktop.md)
- [Sort waste using local recycling rules](./sort-waste-using-local-recycling-rules.md)
