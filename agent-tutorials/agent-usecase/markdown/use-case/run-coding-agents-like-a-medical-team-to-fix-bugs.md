---
title: "Run coding agents like a medical team to fix bugs"
slug: "run-coding-agents-like-a-medical-team-to-fix-bugs"
summary: "Over five months, the author treated bugs like patients and organized coding agents as a hospital-style team to diagnose and fix them. · Oct 9, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://www.cockroachlabs.com/blog/experiment-running-hospital-code/"
fetched_from: "https://agentusecases.ai/use-case/run-coding-agents-like-a-medical-team-to-fix-bugs"
---

# Run coding agents like a medical team to fix bugs

> Over five months, the author treated bugs like patients and organized coding agents as a hospital-style team to diagnose and fix them. · Oct 9, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

Cockroach Labs built a GitHub Actions pipeline in which labels on an issue trigger role-specific agents. A Fellow reproduces the bug and posts a treatment plan, and a separate Review Attending approves or rejects it before any code is written. Large issues are split into sub-issues of under 1,000 lines each. A Discharge Nurse audits the review before merge, and humans handle escalations.

## How it went

Over five months it merged 1,238 PRs and over a million lines of code with 7 reverts. A Db2 migration feature shipped in under two days. Reviewers sometimes looped on trivial fixes, and agents filed about half of all issues.

## Worth knowing

It used about $135,000 in Claude tokens, around $84 per issue. Some issues went 9 to 11 rework rounds before a circuit-breaker was added.

## Prompt

```text
Treat the bugs in this repo like patients in a hospital. For each bug in [issue list or file], have one agent triage and reproduce it, another diagnose the root cause, and another write a fix with a test, then have a separate reviewer check the fix. Finish with a summary table of each bug, its diagnosis, the fix and test status, and pause for my approval before committing or pushing anything.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Configure a local AI lab and build a knowledge graph by chat](./configure-a-local-ai-lab-and-build-a-knowledge-graph-by-chat.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Migrate a password reset flow to modern libraries](./migrate-a-password-reset-flow-to-modern-libraries.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
