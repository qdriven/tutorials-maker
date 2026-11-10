---
title: "Build apps with a judge subagent and multi-stage review"
slug: "build-apps-with-a-judge-subagent-and-multi-stage-review"
summary: "A Claude Code setup for app development uses a judge subagent, context management, and multi-stage review for quality control."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Oct 19, 2026"
source_url: "https://www.reddit.com/r/ClaudeWorkflows/comments/1x9vwqf/workflow_advanced_claude_code_workflow_judge"
fetched_from: "https://agentusecases.ai/use-case/build-apps-with-a-judge-subagent-and-multi-stage-review"
---

# Build apps with a judge subagent and multi-stage review

> A Claude Code setup for app development uses a judge subagent, context management, and multi-stage review for quality control.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** Reddit · Oct 19, 2026

## What they did

The post describes a solo developer using Claude Code to build a Windows app with a separate read-only judge subagent for unresolved decisions. The judge had to label claims as confirmed, guessed, or unknown and avoid deciding from guesses; the developer also started each issue in a fresh child session, then ran two review passes on code: a general code review and a second pass using coding-guideline skills, with deferred issues left in PRs for human review.

## How it went

The workflow reportedly led to a Microsoft Store shipment and 142 merged PRs in 17 days. The post also notes the setup is complex and may be hard for beginners.

## Worth knowing

The main catch is overhead: this workflow adds fresh sessions, a separate judge, and two review stages, so it is presented as an advanced setup rather than a lightweight default.

## Prompt

```text
Set up my project in [repo path] so that after you implement each feature of [app description], a separate judge subagent reviews the work against the requirements and tests and sends back a list of problems. Repeat the fix and review loop until the judge has no blocking issues. Keep a short notes file of decisions so context survives between sessions, and summarize the final state when finished.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
