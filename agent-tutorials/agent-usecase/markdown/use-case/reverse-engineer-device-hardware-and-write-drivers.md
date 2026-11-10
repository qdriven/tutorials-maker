---
title: "Reverse engineer device hardware and write drivers"
slug: "reverse-engineer-device-hardware-and-write-drivers"
summary: "A user points Claude at their own electronics to write drivers, such as one for an old printer that stopped working on a new macOS, with the user acting as its hands for diagnosis."
category: "Security, Science & Hardware"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "HN"
source_date: "Oct 15, 2026"
source_url: "https://news.ycombinator.com/item?id=50106153"
fetched_from: "https://agentusecases.ai/use-case/reverse-engineer-device-hardware-and-write-drivers"
---

# Reverse engineer device hardware and write drivers

> A user points Claude at their own electronics to write drivers, such as one for an old printer that stopped working on a new macOS, with the user acting as its hands for diagnosis.

**Category:** Security, Science & Hardware  
**Agent:** Claude  
**Source:** HN · Oct 15, 2026

## What they did

The commenter connected a device over USB to a computer and let Claude probe it. For an old printer that stopped working on a newer macOS, Claude wrote the drivers and had the user run physical checks: whether grayscale worked, how page 1 and 2 quality compared, unloading paper to expose an error, then reloading it to test duplex.

## How it went

The printer worked again with the new drivers. The commenter also says they did the same for remotes and a Rodecaster, though no details are given. This is one anecdote, not a tested method.

## Worth knowing

It mostly costs tokens, but the commenter says it works best on devices that aren't heavily locked down, such as phones.

## Prompt

```text
I have an old [device, e.g. printer or scanner] that no longer works on [my OS and version]. Help me write a driver for it: tell me what to run or check on the device, I'll report back exactly what I see, and use that to work out how it communicates. Finished means working driver code, build and install steps, and a way for me to test that it works. Pause and ask before anything that could change the device's firmware or my system settings.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Run a home robot through Claude Desktop](./run-a-home-robot-through-claude-desktop.md)
- [Orchestrate a Spot robot through multi-step tasks](./orchestrate-a-spot-robot-through-multi-step-tasks.md)
