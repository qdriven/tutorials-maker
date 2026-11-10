---
title: "Patch laptop BIOS to unlock hidden firmware menus"
slug: "patch-laptop-bios-to-unlock-hidden-firmware-menus"
summary: "A Reddit user gave Claude Code a BIOS dump; it disassembled it, found the signature check and patched it, unlocking hidden settings after flashing (secondhand account)."
category: "Security, Science & Hardware"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "enterprisedna.co"
source_date: "Jul 22, 2026"
source_url: "https://enterprisedna.co/resources/ai-pulse/ai-pulse-2026-07-22-a-reddit-user-had-claude-code-reverse-engineer-their-laptop/"
fetched_from: "https://agentusecases.ai/use-case/patch-laptop-bios-to-unlock-hidden-firmware-menus"
---

# Patch laptop BIOS to unlock hidden firmware menus

> A Reddit user gave Claude Code a BIOS dump; it disassembled it, found the signature check and patched it, unlocking hidden settings after flashing (secondhand account).

**Category:** Security, Science & Hardware  
**Agent:** Claude Code  
**Source:** enterprisedna.co · Jul 22, 2026

## What they did

A Reddit user gave Claude a raw BIOS dump from their laptop and asked it to unlock hidden firmware menus. Claude disassembled the binary, found the RSA signature-check function, and patched the verifier so it always returns true. The owner then flashed the modified firmware themselves. The article says there was no step-by-step prompting.

## How it went

After flashing, the owner could reach settings the manufacturer hid. The article is secondhand, relayed from X posts, and gives no laptop model, prompts, or timings.

## Worth knowing

Flashing firmware with a disabled signature check carries risk; the source gives no details on backups or recovery, so check those before trying this.

## Prompt

```text
I have a firmware dump for my own [laptop model] at [file path]. Disassemble it, explain how the settings menus are gated and where any signature check happens, and propose a patch to unlock the hidden options. Work only on a copy of the file and don't flash anything; show me the proposed patch and the recovery risks first so I can decide.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Find exploitable bugs in smart contracts](./find-exploitable-bugs-in-smart-contracts.md)
- [Reverse engineer a classic game ROM via Ghidra MCP](./reverse-engineer-a-classic-game-rom-via-ghidra-mcp.md)
- [Reverse engineer a Go binary with Ghidra via MCP](./reverse-engineer-a-go-binary-with-ghidra-via-mcp.md)
