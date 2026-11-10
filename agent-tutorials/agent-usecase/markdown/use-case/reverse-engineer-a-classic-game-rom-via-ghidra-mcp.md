---
title: "Reverse engineer a classic game ROM via Ghidra MCP"
slug: "reverse-engineer-a-classic-game-rom-via-ghidra-mcp"
summary: "The author connected Claude to Ghidra through MCP to analyze and rename functions in an Atari River Raid ROM."
category: "Security, Science & Hardware"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "quesma.com"
source_date: "Undated"
source_url: "https://quesma.com/blog/ghidra-mcp-unlimited-lives/"
fetched_from: "https://agentusecases.ai/use-case/reverse-engineer-a-classic-game-rom-via-ghidra-mcp"
---

# Reverse engineer a classic game ROM via Ghidra MCP

> The author connected Claude to Ghidra through MCP to analyze and rename functions in an Atari River Raid ROM.

**Category:** Security, Science & Hardware  
**Agent:** Claude  
**Source:** quesma.com · Undated

## What they did

The author ran an open-source Ghidra MCP server so Claude could inspect an unlabeled 8 kB Atari ROM, imported as 6502 only. Claude inferred the Atari platform from hardware registers and located the lives-decrement code. The author did the rebasing (twice) by hand and applied the one-byte patch outside Ghidra.

## How it went

Swapping DEY for NOP froze the lives counter at 3 in an emulator. Claude wrongly guessed the game was Centipede and struggled with sprite data. The MCP tools couldn't rebase or write the binary.

## Worth knowing

Setup was a chain of four components, and some tool calls took about 30 seconds each, so interactive use felt slow.

## Prompt

```text
Connect to Ghidra via MCP and load this [ROM or binary file]. Analyze the disassembled functions, infer their purpose from behavior and strings, and rename them with descriptive labels, producing an annotated function map when done.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Run a home robot through Claude Desktop](./run-a-home-robot-through-claude-desktop.md)
- [Orchestrate a Spot robot through multi-step tasks](./orchestrate-a-spot-robot-through-multi-step-tasks.md)
