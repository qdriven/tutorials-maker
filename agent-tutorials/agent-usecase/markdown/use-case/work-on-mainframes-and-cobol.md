---
title: "Work on mainframes and COBOL"
slug: "work-on-mainframes-and-cobol"
summary: "Hopper is an agentic development environment for the mainframe systems behind banking, payments, insurance, and airlines. · May 12, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://www.hypercubic.ai/hopper"
fetched_from: "https://agentusecases.ai/use-case/work-on-mainframes-and-cobol"
---

# Work on mainframes and COBOL

> Hopper is an agentic development environment for the mainframe systems behind banking, payments, insurance, and airlines. · May 12, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

Hopper is a desktop app that runs on your laptop and connects to z/OS over TN3270, plus optional FTP. You give the agent plain-English prompts. It reads COBOL and JCL, drives ISPF, submits jobs, decodes spool output and VSAM records, and can NEWCOPY into CICS. Read-only actions run immediately. Any change pauses for your approval.

## How it went

The page claims it turns hours of SDSF triage into one tag, which returns the abend code, failing step and source line. It gives no measured results or benchmarks.

## Worth knowing

FTP credentials are optional, but without them the datasets and jobs browsers, builds and most agent tools stay disabled. The free Hobby tier needs your own mainframe.

## Prompt

```text
I have a legacy COBOL program at [path]. Read it and its copybooks, then write a plain-English explanation of what each paragraph or section does, list the data files and fields it touches, and flag any business rules hidden in the code. Finish with a suggested outline for rewriting it in [target language, e.g. Java]. Don't modify any files.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
