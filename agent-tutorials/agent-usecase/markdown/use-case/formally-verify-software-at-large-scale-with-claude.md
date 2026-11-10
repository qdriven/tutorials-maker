---
title: "Formally verify software at large scale with Claude"
slug: "formally-verify-software-at-large-scale-with-claude"
summary: "Anthropic's Frontier Red Team used Claude to formally verify software, proving code is free of certain bugs on codebases larger than was historically feasible. · Oct 22, 2026"
category: "Security, Science & Hardware"
agents:
  - name: "Claude"
    slug: "claude"
source_url: "https://www.anthropic.com/research/formal-verification"
fetched_from: "https://agentusecases.ai/use-case/formally-verify-software-at-large-scale-with-claude"
---

# Formally verify software at large scale with Claude

> Anthropic's Frontier Red Team used Claude to formally verify software, proving code is free of certain bugs on codebases larger than was historically feasible. · Oct 22, 2026

**Category:** Security, Science & Hardware  
**Agent:** Claude

## What they did

The team turned existing OSS-Fuzz fuzz tests into specs: the compiled RISC-V binary never crashes on any input under 64 MB. Using Theorem's RISC-V and Linux semantics, Claude wrote Rocq proofs that a proof checker verified. When a proof hit a bug, Claude patched the code, the spec was regenerated, and Claude continued. Patches were penalized and audited for reward hacking.

## How it went

Over a few weeks Claude proved no-crash for 239 entry points across 123 libraries, about 180 million lines of Rocq. It also found hundreds of bugs. The proofs cover only single-threaded static RISC-V binaries.

## Worth knowing

Proofs can take hundreds of millions of tokens each. Agents that could copy each other's proofs used 17% fewer tokens in the 36-task test.

## Prompt

```text
I want to formally verify that [a specific module or library in my codebase at path] is free of [a bug class, e.g. out-of-bounds access or integer overflow]. Pick a suitable verification tool for [language], write the specifications and proofs, and run them. Finish with a report listing what was proven, what failed, and any bugs found, and don't change my source code without showing me the diff first.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Run a home robot through Claude Desktop](./run-a-home-robot-through-claude-desktop.md)
- [Orchestrate a Spot robot through multi-step tasks](./orchestrate-a-spot-robot-through-multi-step-tasks.md)
