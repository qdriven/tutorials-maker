---
title: "Build a C compiler with a team of parallel agents"
slug: "build-a-c-compiler-with-a-team-of-parallel-agents"
summary: "Anthropic's engineering write-up on tasking Opus 4.6 agent teams with building a C compiler. · Feb 5, 2026"
category: "Software & DevOps"
agents:
  - name: "Claude"
    slug: "claude"
source_url: "https://www.anthropic.com/engineering/building-c-compiler"
fetched_from: "https://agentusecases.ai/use-case/build-a-c-compiler-with-a-team-of-parallel-agents"
---

# Build a C compiler with a team of parallel agents

> Anthropic's engineering write-up on tasking Opus 4.6 agent teams with building a C compiler. · Feb 5, 2026

**Category:** Software & DevOps  
**Agent:** Claude

## What they did

Nicholas Carlini ran 16 Claude agents in an endless loop, each in its own Docker container, pushing to a shared git repo. Agents claimed tasks by writing lock files, merged each other's work, and had no orchestrator. Carlini's main work was building tests, CI, and a GCC-based oracle so agents could fix different kernel bugs in parallel.

## How it went

About 2,000 sessions produced a 100,000-line Rust compiler that builds Linux 6.9 on x86, ARM and RISC-V and passes 99% of most test suites. It still calls GCC for 16-bit x86, its assembler and linker are buggy, and its output is inefficient.

## Worth knowing

It cost just under $20,000 in API fees over two weeks, and the quality of the test harness decided whether agents stayed on track. Run it in a container.

## Prompt

```text
I want to build a small [tool, e.g. a Markdown-to-HTML converter in Python] from scratch with a spec-first approach. First write a short spec and a test suite in this folder, then split the work into independent pieces and use sub-agents to implement them in parallel. Stop when all tests pass, and give me a summary of what each sub-agent built and any tests you had to skip.
```

## Related use cases

- [Run a personal doorman agent on a $7 VPS](./run-a-personal-doorman-agent-on-a-7-vps.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Build a project management tool with a 24-hour agent run](./build-a-project-management-tool-with-a-24-hour-agent-run.md)
