---
title: "Validate firmware in simulation with AI agents"
slug: "validate-firmware-in-simulation-with-ai-agents"
summary: "Simantic gives AI agents virtual devboards and a firmware code reviewer so they can test firmware without physical hardware."
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Oct 29, 2026"
source_url: "https://news.ycombinator.com/item?id=50291116"
fetched_from: "https://agentusecases.ai/use-case/validate-firmware-in-simulation-with-ai-agents"
---

# Validate firmware in simulation with AI agents

> Simantic gives AI agents virtual devboards and a firmware code reviewer so they can test firmware without physical hardware.

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Oct 29, 2026

## What they did

Simantic gives agents virtual devboards that can be programmed and run with one API call from the terminal, backed by a simulation engine the founders rewrote in Rust after a Renode wrapper proved too slow and inaccurate. An AI reviewer uses the simulation as evidence for firmware decisions, and CI validates each commit against a simulated microcontroller.

## How it went

The founders say validation that took hours on devboards now takes seconds. An early satellite startup tested firmware on hardware it lacked, at about a hundredth of the cost and time. Chip support is limited to some STM32, ESP32 and RP2040 models.

## Worth knowing

Supported models are limited to certain STM32F0/F4/H7, ESP32-S3/C3 and RP2040 parts, so check your microcontroller is covered first.

## Prompt

```text
I'm developing firmware for [board or microcontroller] and don't always have the hardware on hand. Set up a simulation workflow, using an emulator like Renode or QEMU if one exists for my board, so you can build my firmware in [repo path], run it virtually, and check that it behaves as expected for [behavior to verify]. Then review the code for bugs such as race conditions and bad register use. You're done when you've run the simulated tests and given me a pass/fail report with the issues you found.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Configure a local AI lab and build a knowledge graph by chat](./configure-a-local-ai-lab-and-build-a-knowledge-graph-by-chat.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Migrate a password reset flow to modern libraries](./migrate-a-password-reset-flow-to-modern-libraries.md)
- [Point a computer-using bot at any repo](./point-a-computer-using-bot-at-any-repo.md)
- [Migrate a website from a CMS to raw code and Markdown](./migrate-a-website-from-a-cms-to-raw-code-and-markdown.md)
