---
title: "Design and build a robotic arm with no CAD experience"
slug: "design-and-build-a-robotic-arm-with-no-cad-experience"
summary: "A builder used Claude Code with FreeCAD and Claude Vision to design, print, and assemble a 5-DOF servo arm with vision and voice control."
category: "Security, Science & Hardware"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "hiitzroman.com"
source_date: "Undated"
source_url: "https://hiitzroman.com/blog/robotic-arm-with-claude-code-and-freecad"
fetched_from: "https://agentusecases.ai/use-case/design-and-build-a-robotic-arm-with-no-cad-experience"
---

# Design and build a robotic arm with no CAD experience

> A builder used Claude Code with FreeCAD and Claude Vision to design, print, and assemble a 5-DOF servo arm with vision and voice control.

**Category:** Security, Science & Hardware  
**Agent:** Claude Code  
**Source:** hiitzroman.com · Undated

## What they did

Claude Code wrote one Python macro that FreeCAD re-rendered live, building every part of the arm from boolean operations. The builder iterated by conversation, then printed and assembled the arm. For control, a laptop script sent Whisper speech and a webcam frame to Claude Vision. Claude returned JSON actions, local inverse-kinematics code converted target pixels to servo angles, and an ESP32 drove the servos.

## How it went

About 30 hours from design to assembly produced four working servos. The gripper is not built, there is no feedback loop, and the pixel-to-world calibration is only approximate.

## Worth knowing

Expect print fixes. The builder taped two servos, glued a lid, reprinted the base turntable, and replaced a failed print-in-place hinge. FreeCAD's macro runner also needs ASCII-only scripts.

## Prompt

```text
Help me design a [N]-DOF robotic arm from scratch using FreeCAD via MCP, including part files ready for 3D printing and a servo control script, even though I have no CAD experience. Guide me through printing, assembly, and wiring, stopping to confirm before any step that involves ordering parts.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Find exploitable bugs in smart contracts](./find-exploitable-bugs-in-smart-contracts.md)
- [Reverse engineer a classic game ROM via Ghidra MCP](./reverse-engineer-a-classic-game-rom-via-ghidra-mcp.md)
- [Reverse engineer a Go binary with Ghidra via MCP](./reverse-engineer-a-go-binary-with-ghidra-via-mcp.md)
