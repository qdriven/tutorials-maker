---
title: "Refactor a million-line repo with 1,393 subagents"
slug: "refactor-a-million-line-repo-with-1-393-subagents"
summary: "A Nous Research developer had Hermes dispatch 1,393 subagents over about 19 hours to clean up its own repo, cutting non-test Python source by 34.4% in a merged PR."
category: "Software & DevOps"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "nousresearch.com"
source_date: "Undated"
source_url: "https://nousresearch.com/refactoring-hermes-with-1393-agents"
fetched_from: "https://agentusecases.ai/use-case/refactor-a-million-line-repo-with-1-393-subagents"
---

# Refactor a million-line repo with 1,393 subagents

> A Nous Research developer had Hermes dispatch 1,393 subagents over about 19 hours to clean up its own repo, cutting non-test Python source by 34.4% in a merged PR.

**Category:** Software & DevOps  
**Agent:** Hermes Agent  
**Source:** nousresearch.com · Undated

## What they did

Teknium gave his everyday Hermes agent a standing goal with /goal, plus a dev skill it had built up over time. The orchestrator split the code into 36 non-overlapping groups and wrote briefs for workers. Workers used separate git worktrees, committed after each verified step, and checked interfaces against the original. An expired token killed the run at about fifty minutes, so a separate session prepared a handoff and the run resumed.

## How it went

Non-test Python fell from 1,063,826 to 698,363 lines (34.4%), and gateway/run.py from 34,847 to 5,512 lines. Reviewers found regressions the tests missed, and six files still exceeded 5,000 lines.

## Worth knowing

Model spend was about $19,300 for the main run, roughly $25k with follow-ups, excluding human review. Review caught removed public names that plugins use and altered exception handling at about 65 sites.

## Prompt

```text
Audit my repo at [path or repo name] for dead code, duplicated logic, and over-complicated modules. Split the cleanup into independent chunks, work on each in a separate branch, and run [test command] after every change. Finish with one pull request summary showing lines removed and test results, and pause for my review before merging or deleting anything.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Produce a short-form video from research to captions](./produce-a-short-form-video-from-research-to-captions.md)
- [Debloat an Android TV](./debloat-an-android-tv.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a booking and payment app for tattoo artists](./build-a-booking-and-payment-app-for-tattoo-artists.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
