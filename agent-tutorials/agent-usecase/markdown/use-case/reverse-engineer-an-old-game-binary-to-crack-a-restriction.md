---
title: "Reverse engineer an old game binary to crack a restriction"
slug: "reverse-engineer-an-old-game-binary-to-crack-a-restriction"
summary: "A poster used Claude Code alongside Ghidra to trace a call graph across many validation sites in a 13-year-old game binary and crack a restriction."
category: "Security, Science & Hardware"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Mar 16, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1ru3irp/i_used_claude_code_to_reverse_engineer_a"
fetched_from: "https://agentusecases.ai/use-case/reverse-engineer-an-old-game-binary-to-crack-a-restriction"
---

# Reverse engineer an old game binary to crack a restriction

> A poster used Claude Code alongside Ghidra to trace a call graph across many validation sites in a 13-year-old game binary and crack a restriction.

**Category:** Security, Science & Hardware  
**Agent:** Claude Code  
**Source:** Reddit · Mar 16, 2026

## What they did

The poster pointed Claude Code in Opus high-reasoning mode at a 2013 Disney Infinity game binary with no symbols, source, or prior reverse-engineering notes. Claude traced the FindPlaysetForCharacter call graph through the codebase, found 13 separate validation sites across six code areas, recognized the x86 branch patterns after each call, and helped identify the exact bytes to patch after some failed attempts.

## How it went

It produced 17 binary patches plus 3 modified data files so any character could be used in any playset, packaged as a free open-source mod with a reported two-minute install. The poster says simpler one-off patches had failed because the remaining checks still blocked the game.

## Worth knowing

The poster says the whole effort took under 24 hours.

## Prompt

```text
I'm analyzing [old program or game binary] that I own, to understand how it enforces [restriction] for [research or preservation purpose]. Using Ghidra output in [project folder], trace the call graph from [function or string] and list every place the check is validated. Finish with a written map of the validation sites and a proposed patch plan; don't modify any files until I approve.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Find exploitable bugs in smart contracts](./find-exploitable-bugs-in-smart-contracts.md)
- [Reverse engineer a classic game ROM via Ghidra MCP](./reverse-engineer-a-classic-game-rom-via-ghidra-mcp.md)
- [Reverse engineer a Go binary with Ghidra via MCP](./reverse-engineer-a-go-binary-with-ghidra-via-mcp.md)
