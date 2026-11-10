---
title: "Verify SPICE simulations against a real oscilloscope"
slug: "verify-spice-simulations-against-a-real-oscilloscope"
summary: "MCP servers for an oscilloscope and SPICE simulator let Claude Code compare simulated circuits with real hardware measurements, closing the loop. · Apr 17, 2026"
category: "Security, Science & Hardware"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_url: "https://lucasgerads.com/blog/lecroy-mcp-spice-demo/"
fetched_from: "https://agentusecases.ai/use-case/verify-spice-simulations-against-a-real-oscilloscope"
---

# Verify SPICE simulations against a real oscilloscope

> MCP servers for an oscilloscope and SPICE simulator let Claude Code compare simulated circuits with real hardware measurements, closing the loop. · Apr 17, 2026

**Category:** Security, Science & Hardware  
**Agent:** Claude Code

## What they did

Lucas Gerads gave Claude Code two MCP servers: one for a LeCroy oscilloscope and one wrapping spicelib for SPICE simulation. The demo uses a trivial RC filter driven by a simple microcontroller. Claude compares simulated and measured data. For firmware, he gave it a pinout map and a Makefile with build, flash, ping and erase targets.

## How it went

The post says the setup became very valuable for validating SPICE circuits and models, and it removed tedious data analysis such as time-axis normalization and alignment. It gives no numbers, and the demo circuit is deliberately trivial.

## Worth knowing

Claude can't see your physical wiring, so tell it what is connected where. Make sure it never reads stale captures, and save raw waveform data to files instead of pasting it into context.

## Prompt

```text
I have a SPICE simulation of [circuit] at [file path] and an oscilloscope reachable at [address] through an MCP server. Run the simulation, capture the real measurement of [signal or test point], and compare them on rise time, amplitude, and frequency. Report the differences and suggest model tweaks. Ask me before changing any hardware settings or sending output to the circuit.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Find exploitable bugs in smart contracts](./find-exploitable-bugs-in-smart-contracts.md)
- [Reverse engineer a classic game ROM via Ghidra MCP](./reverse-engineer-a-classic-game-rom-via-ghidra-mcp.md)
- [Reverse engineer a Go binary with Ghidra via MCP](./reverse-engineer-a-go-binary-with-ghidra-via-mcp.md)
