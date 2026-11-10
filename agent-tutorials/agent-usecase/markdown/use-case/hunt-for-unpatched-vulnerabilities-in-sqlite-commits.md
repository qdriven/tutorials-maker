---
title: "Hunt for unpatched vulnerabilities in SQLite commits"
slug: "hunt-for-unpatched-vulnerabilities-in-sqlite-commits"
summary: "Google's Big Sleep agent reviewed recent SQLite commits starting from a patched bug and found an exploitable flaw, which was fixed before release."
category: "Security, Science & Hardware"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "scworld.com"
source_date: "Undated"
source_url: "https://www.scworld.com/news/googles-big-sleep-llm-agent-discovers-exploitable-bug-in-sqlite"
fetched_from: "https://agentusecases.ai/use-case/hunt-for-unpatched-vulnerabilities-in-sqlite-commits"
---

# Hunt for unpatched vulnerabilities in SQLite commits

> Google's Big Sleep agent reviewed recent SQLite commits starting from a patched bug and found an exploitable flaw, which was fixed before release.

**Category:** Security, Science & Hardware  
**Agent:** Gemini  
**Source:** scworld.com · Undated

## What they did

A Gemini 1.5 Pro agent ran in Project Zero's Naptime framework, which gives it a code browser, debugger, reporter tool and a sandbox for Python scripts. Researchers gave it a previously fixed SQLite bug, plus recent commit messages and diffs, and asked it to look for unresolved similar issues. It linked the old bug to other code, wrote a test case, triggered a crash, and produced a root-cause analysis.

## How it went

It found a stack buffer underflow in seriesBestIndex, and SQLite fixed it the same day, before any release. Fuzzing for 150 CPU hours failed to rediscover it. The team calls Big Sleep highly experimental.

## Worth knowing

The bug was in a development version only. The researchers think a target-specific fuzzer would likely be at least as effective as the agent today.

## Prompt

```text
In this repo [path or URL], review the commits from the last [time period or number], starting with the fix for [known patched bug or commit]. Look for similar flaws that the fix may have missed, especially [bug class, e.g. memory safety]. Write a report listing each suspect commit, why it looks vulnerable, and how you'd confirm it. Don't modify the code or disclose anything publicly.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Drive a 7-axis robot arm with natural language](./drive-a-7-axis-robot-arm-with-natural-language.md)
- [Reverse engineer a Go binary with Ghidra via MCP](./reverse-engineer-a-go-binary-with-ghidra-via-mcp.md)
