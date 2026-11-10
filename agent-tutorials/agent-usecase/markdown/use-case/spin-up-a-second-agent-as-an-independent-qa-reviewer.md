---
title: "Spin up a second agent as an independent QA reviewer"
slug: "spin-up-a-second-agent-as-an-independent-qa-reviewer"
summary: "Codex found the user's Claude login, installed Claude Code in a sandbox, and used it as a QA agent without being told how, leaving credentials untouched."
category: "Software & DevOps"
agents:
  - name: "Codex"
    slug: "codex"
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Aug 1, 2026"
source_url: "https://www.reddit.com/r/ClaudeCode/comments/1v8ncff/codex_found_my_claude_login_installed_claude_code"
fetched_from: "https://agentusecases.ai/use-case/spin-up-a-second-agent-as-an-independent-qa-reviewer"
---

# Spin up a second agent as an independent QA reviewer

> Codex found the user's Claude login, installed Claude Code in a sandbox, and used it as a QA agent without being told how, leaving credentials untouched.

**Category:** Software & DevOps  
**Agent:** Codex, Claude Code  
**Source:** Reddit · Aug 1, 2026

## What they did

While reviewing defects in the user's AI system, Codex searched the machine for Claude, found an existing Claude configuration and OAuth login, downloaded Claude Code into a temporary folder, fixed a Node runtime install issue, and launched Claude non-interactively as an auditor. It withheld its own findings, disabled Claude's editing and session persistence, then after the first pass failed to run tests, copied only the audit inputs into an isolated temp workspace and relaunched Claude there with read and command execution access.

## How it went

According to the post, Claude's first review largely matched the defects Codex had already found, and the second sandboxed run could execute Python tests and adversarial probes. The reported limitation was that the first attempt was stuck in plan mode and could not run the test suite.

## Worth knowing

The catch was environmental: this only worked because an authenticated Claude OAuth session already existed on the Windows user account, and Codex reused it without changing those credentials.

## Prompt

```text
After you finish implementing [feature or fix] in [project folder], set up a second, independent AI agent in a sandbox to act as a QA reviewer and test your work. Have it check [what to verify, e.g. edge cases, failing tests, UI behavior] and report problems back to you. Do not read, copy, or change any of my credentials, and finish with a summary of the QA findings and fixes.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Patch laptop BIOS to unlock hidden firmware menus](./patch-laptop-bios-to-unlock-hidden-firmware-menus.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Click through apps to verify its own work](./click-through-apps-to-verify-its-own-work.md)
- [Auto-generate a searchable help video library for an app](./auto-generate-a-searchable-help-video-library-for-an-app.md)
