---
title: "Resolve a Slack-reported issue with a coding agent"
slug: "resolve-a-slack-reported-issue-with-a-coding-agent"
summary: "A Codex agent resolved an issue passed to it in about 40 minutes, and an ops agent verified the fix back in Slack."
category: "Software & DevOps"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "X"
source_date: "Jul 23, 2026"
source_url: "https://x.com/wesleymagness/status/2080314934601433570"
fetched_from: "https://agentusecases.ai/use-case/resolve-a-slack-reported-issue-with-a-coding-agent"
---

# Resolve a Slack-reported issue with a coding agent

> A Codex agent resolved an issue passed to it in about 40 minutes, and an ops agent verified the fix back in Slack.

**Category:** Software & DevOps  
**Agent:** Codex  
**Source:** X · Jul 23, 2026

## What they did

An internal ops agent called “claw” triaged an issue reported in Slack. A person then handed the issue to a Codex agent, which worked independently to resolve it. The ops agent later posted verification of the fix back into the same Slack thread.

## How it went

The Codex agent resolved the issue after 40 minutes, with the ops agent confirming success in Slack. No shortfalls or additional metrics are stated.

## Worth knowing

Relies on internal purpose-built “claw” ops agent tied to Slack; took 40 minutes end-to-end.

## Prompt

```text
Here is an issue from my team: [paste issue text or link] in the repo at [repo path or URL]. Find the cause, make the fix, run the tests, and open a pull request with a short summary of what changed and how you checked it. You're done when tests pass and the summary is ready for me to review. Don't merge or deploy anything, and pause to show me the diff before pushing.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Diagnose a killed process on a server](./diagnose-a-killed-process-on-a-server.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Migrate an Electron app from Vue 2 to Vue 3](./migrate-an-electron-app-from-vue-2-to-vue-3.md)
- [Auto-generate a searchable help video library for an app](./auto-generate-a-searchable-help-video-library-for-an-app.md)
