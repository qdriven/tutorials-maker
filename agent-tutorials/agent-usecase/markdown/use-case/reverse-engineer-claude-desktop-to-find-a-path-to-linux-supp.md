---
title: "Reverse engineer Claude Desktop to find a path to Linux support"
slug: "reverse-engineer-claude-desktop-to-find-a-path-to-linux-supp"
summary: "A maintainer pointed Claude at the minified Claude Desktop app to find why Cowork only runs on macOS; it found the VM and sandbox layers and mapped a route to Linux."
category: "Security, Science & Hardware"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Claude Cowork"
    slug: "claude-cowork"
source_platform: "aaddrick.com"
source_date: "Undated"
source_url: "https://aaddrick.com/blog/reverse-engineering-claude-desktops-cowork-mode-a-deep-dive-into-vm-isolation-and-linux-possibilities"
fetched_from: "https://agentusecases.ai/use-case/reverse-engineer-claude-desktop-to-find-a-path-to-linux-supp"
---

# Reverse engineer Claude Desktop to find a path to Linux support

> A maintainer pointed Claude at the minified Claude Desktop app to find why Cowork only runs on macOS; it found the VM and sandbox layers and mapped a route to Linux.

**Category:** Security, Science & Hardware  
**Agent:** Claude Code, Claude Cowork  
**Source:** aaddrick.com · Undated

## What they did

The maintainer of a Linux repackaging script for Claude Desktop extracted the app's minified JavaScript from the Windows installer and ran it through prettier. Claude then went through roughly 170,000 lines, renamed the obfuscated symbols, and documented the architecture. A contributor found x64 VM image URLs, and the maintainer downloaded and inspected that image.

## How it went

It found a macOS-only Swift addon driving a Linux VM, with bubblewrap and seccomp inside it. It laid out three Linux routes: stub the addon, add bubblewrap, or run Firecracker. Nothing was implemented.

## Worth knowing

Minified symbol names change with each release, so re-trace the patterns instead of searching for the names in this write-up (analysis covers version 1.1.799).

## Prompt

```text
Reverse engineer [the app or binary] by inspecting its minified or compiled code to understand how a specific feature works or why it's limited to a certain platform, then write up what you find including any architectural layers involved. Produce a clear technical summary and a proposed path forward, stopping short of modifying or redistributing the original software.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Track personal finances nightly from bank emails](./track-personal-finances-nightly-from-bank-emails.md)
- [Summarize Reddit threads before writing code](./summarize-reddit-threads-before-writing-code.md)
- [Find exploitable bugs in smart contracts](./find-exploitable-bugs-in-smart-contracts.md)
- [Repair formal proofs for a verified garbage collector](./repair-formal-proofs-for-a-verified-garbage-collector.md)
- [Monitor and score CVEs with real-time alerts](./monitor-and-score-cves-with-real-time-alerts.md)
