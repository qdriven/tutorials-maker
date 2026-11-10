---
title: "Debug low-level cryptography code"
slug: "debug-low-level-cryptography-code"
summary: "Cryptography engineer Filippo Valsorda's write-up on Claude Code debugging low-level crypto. · Nov 1, 2025"
category: "Security, Science & Hardware"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_url: "https://words.filippo.io/claude-debugging/"
fetched_from: "https://agentusecases.ai/use-case/debug-low-level-cryptography-code"
---

# Debug low-level cryptography code

> Cryptography engineer Filippo Valsorda's write-up on Claude Code debugging low-level crypto. · Nov 1, 2025

**Category:** Security, Science & Hardware  
**Agent:** Claude Code

## What they did

Filippo Valsorda ran Claude Code (Opus 4.1, no system prompt) on his new Go ML-DSA implementation. His prompt named the test command and code directory, described the failing symptom, and asked it to think hard. It read the code and traced the bug. It also tested a hypothesis with a small test of its own. He then repeated this on two earlier signing bugs, using a fresh session for each.

## How it went

It found all three bugs in one shot without help. The Verify bug took minutes: high bits were taken twice. Its proposed fixes were mediocre, so Valsorda threw them away and rewrote them himself.

## Worth knowing

Use well-scoped failing tests, start a fresh session for each independent bug, and treat the agent's output as a pointer to the bug, not a fix to merge.

## Prompt

```text
I have a failing test in my cryptography code at [path], where [describe the symptom, e.g. wrong output for certain inputs]. Investigate why it fails, compare against [reference implementation or test vectors], and propose a fix. Finished means the tests pass and you've explained the root cause, and you should show me the diff before changing any files.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Find exploitable bugs in smart contracts](./find-exploitable-bugs-in-smart-contracts.md)
- [Reverse engineer a classic game ROM via Ghidra MCP](./reverse-engineer-a-classic-game-rom-via-ghidra-mcp.md)
- [Reverse engineer a Go binary with Ghidra via MCP](./reverse-engineer-a-go-binary-with-ghidra-via-mcp.md)
