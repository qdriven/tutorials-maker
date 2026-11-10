---
title: "Automate per-room heating control in Home Assistant"
slug: "automate-per-room-heating-control-in-home-assistant"
summary: "A homeowner built an add-on and MCP server so Cursor could write and deploy Home Assistant automations for per-room temperature control, iterating through five versions over a weekend."
category: "Life Admin & Home"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "coolver.github.io"
source_date: "Undated"
source_url: "https://coolver.github.io/home-assistant-cursor-agent/"
fetched_from: "https://agentusecases.ai/use-case/automate-per-room-heating-control-in-home-assistant"
---

# Automate per-room heating control in Home Assistant

> A homeowner built an add-on and MCP server so Cursor could write and deploy Home Assistant automations for per-room temperature control, iterating through five versions over a weekend.

**Category:** Life Admin & Home  
**Agent:** Cursor  
**Source:** coolver.github.io · Undated

## What they did

The homeowner used Home Assistant with Zigbee radiator valves and a relay wired in parallel with the old thermostat as a fallback. After the first version, manual YAML copying became tedious, so they built an add-on and MCP server. Cursor could then edit, deploy and restart automations from the IDE. Every change was committed to a local Git repository.

## How it went

Five versions of the control logic in one weekend. The final one switches the boiler off slightly early so the radiators coast to target, which improved comfort and saved a noticeable amount of energy. The source gives no figures.

## Worth knowing

Building the deployment tooling after version one was what made fast iteration possible, and the Git commits allow safe rollback.

## Prompt

```text
Open my Home Assistant config folder [path or SSH host] and help me set up per-room heating control for [list of rooms] using my [thermostat / TRV / sensor entities]. Write the automations with target temperatures and schedules of [your schedule], explain each one, and stop once they pass a config check. Show me the diff and wait for my approval before deploying anything to the live system.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Grade Cursor on a real data science project](./grade-cursor-on-a-real-data-science-project.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Fill out a prescription order form on a clinic site](./fill-out-a-prescription-order-form-on-a-clinic-site.md)
- [Control your Mac by voice with a Claude-backed assistant](./control-your-mac-by-voice-with-a-claude-backed-assistant.md)
