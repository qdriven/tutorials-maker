---
title: "Run code agents and a personal assistant on a custom agent factory"
slug: "run-code-agents-and-a-personal-assistant-on-a-custom-agent-f"
summary: "Developer at a consultancy uses Codex, Claude and their own Workforce agent harness for daily back-office software development, plus a personal assistant called Clara."
category: "Software & DevOps"
agents:
  - name: "Claude"
    slug: "claude"
  - name: "Codex"
    slug: "codex"
source_platform: "HN"
source_date: "Nov 5, 2026"
source_url: "https://news.ycombinator.com/item?id=50379352"
fetched_from: "https://agentusecases.ai/use-case/run-code-agents-and-a-personal-assistant-on-a-custom-agent-f"
---

# Run code agents and a personal assistant on a custom agent factory

> Developer at a consultancy uses Codex, Claude and their own Workforce agent harness for daily back-office software development, plus a personal assistant called Clara.

**Category:** Software & DevOps  
**Agent:** Claude, Codex  
**Source:** HN · Nov 5, 2026

## What they did

Dave Sanders, who works at a consultancy building back-office systems for customers, uses the Codex and Claude desktop apps directly. He is moving toward his own agent factory, Workforce, which runs general and code agents in containers for some containment. Workforce agents build and deploy Workforce itself. He also uses it to run Clara, a personal assistant he is building. Models mostly go through OpenRouter.

## How it went

He has agents coding 8-10 hours a day plus personal projects after work, and just stays under the $200 Claude plan limits. He expects that to get uncomfortable as he adds agents.

## Worth knowing

Subscription limits are the constraint: he pays for a $200 Claude plan and a $100 Codex plan, and more agents will strain the Claude cap.

## Prompt

```text
Act as my back-office software developer on [repo path]. Take this task: [describe task, e.g. add an export feature to the invoicing tool], work on a new branch, run the tests, and leave a summary of what changed and anything you're unsure about. You're done when the tests pass and the branch is ready for me to review. Don't merge, push, or touch production config without showing me the diff first.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Compile and filter apartment listings](./compile-and-filter-apartment-listings.md)
- [Screen interview code submissions with a Codex review agent](./screen-interview-code-submissions-with-a-codex-review-agent.md)
- [Review Linux kernel patches](./review-linux-kernel-patches.md)
- [Build a clinic app with booking and trackers](./build-a-clinic-app-with-booking-and-trackers.md)
- [Build specs through automated multi-agent verification and review loops](./build-specs-through-automated-multi-agent-verification-and-r.md)
