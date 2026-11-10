---
title: "Run Codex tasks on your Home Assistant config"
slug: "run-codex-tasks-on-your-home-assistant-config"
summary: "An integration starts Codex CLI tasks against a Home Assistant config to diagnose failing automations, check dashboards for broken cards and create scripts."
category: "Life Admin & Home"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "community.home-assistant.io"
source_date: "Undated"
source_url: "https://community.home-assistant.io/t/codex-for-home-assistant-let-codex-cli-work-on-your-ha-config-from-scripts-automations-and-assist/1011929"
fetched_from: "https://agentusecases.ai/use-case/run-codex-tasks-on-your-home-assistant-config"
---

# Run Codex tasks on your Home Assistant config

> An integration starts Codex CLI tasks against a Home Assistant config to diagnose failing automations, check dashboards for broken cards and create scripts.

**Category:** Life Admin & Home  
**Agent:** Codex  
**Source:** community.home-assistant.io · Undated

## What they did

A Home Assistant add-on runs Codex CLI with read/write access to /config, and a custom integration (installable through HACS) exposes actions and entities. Tasks start from scripts, automations, or Assist and run non-interactively. Logs and results are saved under /config/codex_tasks. If Codex needs input, a reply action continues the task. Sign-in uses device-code auth through a persistent notification.

## How it went

The author shows an Assist request that had Codex update a dashboard card, followed by a completion notification. The post gives no success rates or measurements. Users have asked for image upload and live progress, which are not yet available.

## Worth knowing

Codex gets write access to your whole config folder, so review its changes. It signs in with a ChatGPT account (Plus or higher recommended) rather than API keys, so there are no per-token charges.

## Prompt

```text
Open my Home Assistant config at [config path] and diagnose why [automation name] keeps failing, checking logs and entity names. Also scan [dashboard name] for broken cards that reference missing entities. Finish with a list of causes and proposed fixes, and show me the diffs before changing any file.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a racing game from a single prompt](./build-a-racing-game-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Fill out a prescription order form on a clinic site](./fill-out-a-prescription-order-form-on-a-clinic-site.md)
- [Control your Mac by voice with a Claude-backed assistant](./control-your-mac-by-voice-with-a-claude-backed-assistant.md)
