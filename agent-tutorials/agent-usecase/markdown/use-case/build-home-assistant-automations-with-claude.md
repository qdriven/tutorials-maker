---
title: "Build Home Assistant automations with Claude"
slug: "build-home-assistant-automations-with-claude"
summary: "A time-strapped parent had Claude build Home Assistant automations, including a helper that infers whether the stove is on from power usage."
category: "Life Admin & Home"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Sep 26, 2026"
source_url: "https://www.reddit.com/r/homeassistant/comments/1wpy5q6/claude_and_home_assistant"
fetched_from: "https://agentusecases.ai/use-case/build-home-assistant-automations-with-claude"
---

# Build Home Assistant automations with Claude

> A time-strapped parent had Claude build Home Assistant automations, including a helper that infers whether the stove is on from power usage.

**Category:** Life Admin & Home  
**Agent:** Claude  
**Source:** Reddit · Sep 26, 2026

## What they did

The poster, a busy parent who had let Home Assistant sit mostly dormant, connected Claude to their HA instance using MCP and used it to build and improve automations instead of hand-writing YAML. In the thread, they and others describe Claude reviewing devices and automations, generating logic like occupancy and state checks, and in one example building a helper that infers whether the stove is on from range power usage, then adding warnings and exhaust-fan automation; people still review plans, code, and backups themselves.

## How it went

They say tasks that used to take days now take minutes, and one commenter said an automation that normally would have taken days worked on the first shot in 10 minutes. The main limitation raised is that Claude can overcomplicate things or act on more HA data than some users are comfortable exposing.

## Worth knowing

A repeated catch is to keep backups Claude cannot access, review its plan or YAML before applying changes, and be aware MCP setups may consume a lot of tokens.

## Prompt

```text
I use Home Assistant and want an automation that [what I want to happen, e.g. alert me if the stove has likely been left on]. My relevant devices and entities are [list entities, e.g. smart plug power sensor sensor.stove_power]. Write the full YAML, including any helpers or template sensors needed to infer the state, and explain step by step where to paste it and how to test it safely.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Manage calendar and tasks by text with an assistant](./manage-calendar-and-tasks-by-text-with-an-assistant.md)
- [Maintain a home media library and handle personal projects](./maintain-a-home-media-library-and-handle-personal-projects.md)
