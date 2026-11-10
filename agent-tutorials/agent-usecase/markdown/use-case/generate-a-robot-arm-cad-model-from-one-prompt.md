---
title: "Generate a robot arm CAD model from one prompt"
slug: "generate-a-robot-arm-cad-model-from-one-prompt"
summary: "A text-to-cad skill let Codex produce a 7-DOF robot arm with kinematics, a GUI and STEP parts in one demo prompt, though not the gripper."
category: "Security, Science & Hardware"
agents:
  - name: "Codex"
    slug: "codex"
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "en.kocpc.com.tw"
source_date: "Undated"
source_url: "https://en.kocpc.com.tw/archives/279"
fetched_from: "https://agentusecases.ai/use-case/generate-a-robot-arm-cad-model-from-one-prompt"
---

# Generate a robot arm CAD model from one prompt

> A text-to-cad skill let Codex produce a 7-DOF robot arm with kinematics, a GUI and STEP parts in one demo prompt, though not the gripper.

**Category:** Security, Science & Hardware  
**Agent:** Codex, Claude Code  
**Source:** en.kocpc.com.tw · Undated

## What they did

Jake Fitzgerald installed the open source text-to-cad skill package in Codex, running GPT 5.5. The agent writes build123d Python scripts, regenerates the geometry locally, and outputs STEP parts plus a URDF. In a 22-second demo, one prompt produced a 7-DOF arm with working kinematics and a custom GUI, driven almost entirely by prompting.

## How it went

The arm's URDF, kinematics, GUI and STEP assembly were all generated, except the gripper. Fitzgerald says similar work would have taken weeks across half a dozen tools. Commenters questioned the joint limits and parts that wouldn't assemble.

## Worth knowing

The homepage benchmark prompt was an excerpt. Real runs expand a short request into a full spec with GPT 5.5 Pro first, so vague prompts will likely do worse.

## Prompt

```text
Using a text-to-CAD approach with CadQuery, generate a model of [a robot arm / mechanism] with [number of joints, size, and constraints] in [folder]. Include the parts as separate STEP files and a simple viewer so I can inspect it. Finish by listing any parts you could not model well so I can handle them myself.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Patch laptop BIOS to unlock hidden firmware menus](./patch-laptop-bios-to-unlock-hidden-firmware-menus.md)
- [Run a live Kalshi prediction-market account autonomously](./run-a-live-kalshi-prediction-market-account-autonomously.md)
- [Find exploitable bugs in smart contracts](./find-exploitable-bugs-in-smart-contracts.md)
- [Run a home robot through Claude Desktop](./run-a-home-robot-through-claude-desktop.md)
- [Hunt business-logic flaws and open fix PRs](./hunt-business-logic-flaws-and-open-fix-prs.md)
