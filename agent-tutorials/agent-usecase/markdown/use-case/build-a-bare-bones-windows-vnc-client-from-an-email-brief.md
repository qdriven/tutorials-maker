---
title: "Build a bare-bones Windows VNC client from an email brief"
slug: "build-a-bare-bones-windows-vnc-client-from-an-email-brief"
summary: "The author emailed Claude a spec for a minimal VNC viewer targeting Windows 10 over a local SSH tunnel, to be built on a Mac and delivered with a checksum."
category: "Software & DevOps"
agents:
  - name: "Claude"
    slug: "claude"
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "HN"
source_date: "Aug 10, 2026"
source_url: "https://news.ycombinator.com/item?id=49244479"
fetched_from: "https://agentusecases.ai/use-case/build-a-bare-bones-windows-vnc-client-from-an-email-brief"
---

# Build a bare-bones Windows VNC client from an email brief

> The author emailed Claude a spec for a minimal VNC viewer targeting Windows 10 over a local SSH tunnel, to be built on a Mac and delivered with a checksum.

**Category:** Software & DevOps  
**Agent:** Claude, ChatGPT  
**Source:** HN · Aug 10, 2026

## What they did

The author emailed Claude a brief asking for a bare-bones x64 Windows 10 VNC viewer. It would connect only to localhost:5921 through an SSH tunnel, show only the remote cursor, and run at max quality over gigabit LAN. Claude was to build it on the Mac in Rust or C++, host the binary, and give a SHA-256 checksum plus the PowerShell command to verify it.

## How it went

It failed. Claude kept producing broken builds, used up the whole 20x Max weekly limit, and was still delivering broken code after the reset three days later. The author deleted the project after about a week.

## Worth knowing

A week of iteration burned the entire 20x Max weekly limit and still produced no working viewer, so budget for failure on a from-scratch protocol client.

## Prompt

```text
Build a minimal [tool, e.g. VNC viewer] for [target OS and version] that connects over [connection details, e.g. a local SSH tunnel to localhost:port]. I'm developing on [my OS], so set up cross-compilation and keep dependencies to a minimum. Finish by giving me the built executable, its SHA-256 checksum, and short build and usage instructions.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Triage support emails and draft refund-policy replies](./triage-support-emails-and-draft-refund-policy-replies.md)
- [Negotiate a car purchase with ChatGPT](./negotiate-a-car-purchase-with-chatgpt.md)
- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Build a multilingual typing app for language learning](./build-a-multilingual-typing-app-for-language-learning.md)
