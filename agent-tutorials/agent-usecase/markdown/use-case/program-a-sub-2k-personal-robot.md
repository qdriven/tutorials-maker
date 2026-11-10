---
title: "Program a sub-$2k personal robot"
slug: "program-a-sub-2k-personal-robot"
summary: "MARS is a general-purpose robot with an open onboard agentic OS built on ROS2."
category: "Security, Science & Hardware"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Oct 7, 2025"
source_url: "https://news.ycombinator.com/item?id=45504127"
fetched_from: "https://agentusecases.ai/use-case/program-a-sub-2k-personal-robot"
---

# Program a sub-$2k personal robot

> MARS is a general-purpose robot with an open onboard agentic OS built on ROS2.

**Category:** Security, Science & Hardware  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Oct 7, 2025

## What they did

The source is a launch post for MARS, an assembled, calibrated robot with a Jetson Orin Nano, a 5DoF arm with wrist camera, an RGBD camera, 2D LiDAR and speakers. You write "behaviors" in the BASIC SDK, which runs the robot like an AI agent with VLAs. Skills come from training the arm or writing code tools, and ROS2 topics allow low-level control.

## How it went

The post is a launch announcement and reports no results or measurements. It says the robot boots in a minute and can be controlled by phone or programmed from a PC. Hardware and software are to be open-sourced later.

## Worth knowing

A temporary Hacker News code lowers the price to $1,799; the post says it targets hobbyists and education, and the open-sourcing is still planned, not done.

## Prompt

```text
Help me get started programming my [robot name or model] using ROS2. Look at the project in this folder, explain how it is structured, and write a simple node that makes the robot [simple task, e.g. drive forward 1 meter and stop]. Stop once the node builds and I have the exact command to run it in simulation, and ask me before running anything on real hardware.
```

## Related use cases

- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Generate parametric geometry workflows with an agent](./generate-parametric-geometry-workflows-with-an-agent.md)
- [Run a home robot through Claude Desktop](./run-a-home-robot-through-claude-desktop.md)
- [Repair formal proofs for a verified garbage collector](./repair-formal-proofs-for-a-verified-garbage-collector.md)
- [Orchestrate a Spot robot through multi-step tasks](./orchestrate-a-spot-robot-through-multi-step-tasks.md)
- [Run an AI agent on a Nokia 110 feature phone](./run-an-ai-agent-on-a-nokia-110-feature-phone.md)
