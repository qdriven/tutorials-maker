---
title: "Get Microsoft Office running on Linux via Wine"
slug: "get-microsoft-office-running-on-linux-via-wine"
summary: "Claude Code did most of the work to make desktop Office 365 run under Wine on Linux without virtualization, packaged as a Nix flake. · Sep 17, 2026"
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_url: "https://github.com/Tombert/office365_flake"
fetched_from: "https://agentusecases.ai/use-case/get-microsoft-office-running-on-linux-via-wine"
---

# Get Microsoft Office running on Linux via Wine

> Claude Code did most of the work to make desktop Office 365 run under Wine on Linux without virtualization, packaged as a Nix flake. · Sep 17, 2026

**Category:** Software & DevOps  
**Agent:** Claude Code

## What they did

The repo is a Nix flake that runs click-to-run Microsoft 365 through umu-launcher and GE-Proton instead of stock Wine. Each blocker was found by reading Wine and Click-to-Run logs and fixed with a small shim DLL or registry change. These cover licensing, missing Windows APIs, sign-in errors and Direct2D rendering. The README doesn't describe the agent's role.

## How it went

The full suite installs and Word starts, and sign-in with a personal account works. Licensing was never verified because the test account had no subscription. Excel, PowerPoint and Outlook are installed but untested.

## Worth knowing

The install downloads several GB and the installer window looks frozen for long stretches. A Microsoft 365 licence is required, and sign-in needs a 680 MB WebView2 install.

## Prompt

```text
I want to run [Windows desktop app, e.g. Microsoft Office] on [Linux distro] using Wine, without a virtual machine. Work in this folder, try Wine configurations until the app installs and launches, and package the setup as [Nix flake / shell script] so I can reproduce it. Finish by writing a short README of the steps and any known issues, and ask me before installing system-wide packages or deleting anything.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
