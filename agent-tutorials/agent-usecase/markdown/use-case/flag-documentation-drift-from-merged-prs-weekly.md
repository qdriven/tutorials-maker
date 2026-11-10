---
title: "Flag documentation drift from merged PRs weekly"
slug: "flag-documentation-drift-from-merged-prs-weekly"
summary: "A weekly Hermes cron job checks merged PRs for changes to tool schemas, CLI commands, config options or env variables to flag docs needing updates."
category: "Software & DevOps"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "hermes-agent.nousresearch.com"
source_date: "Undated"
source_url: "https://hermes-agent.nousresearch.com/docs/guides/automation-blueprints"
fetched_from: "https://agentusecases.ai/use-case/flag-documentation-drift-from-merged-prs-weekly"
---

# Flag documentation drift from merged PRs weekly

> A weekly Hermes cron job checks merged PRs for changes to tool schemas, CLI commands, config options or env variables to flag docs needing updates.

**Category:** Software & DevOps  
**Agent:** Hermes Agent  
**Source:** hermes-agent.nousresearch.com · Undated

## What they did

A Hermes cron job runs Mondays at 9am. It uses the gh CLI to list the last 30 merged PRs in the hermes-agent repo, keeps those from the past 7 days, and checks whether they touched tool, CLI, config or env-var code. For each such PR it checks whether the matching docs page changed in the same PR, then sends a Telegram report.

## How it went

The source gives a copy-paste blueprint and no measured results. Output is a list of gaps where code changed but docs didn't. If everything is in sync, the agent replies [SILENT] and nothing is sent.

## Worth knowing

The prompt hardcodes this repo's file paths and fetches only 30 merged PRs, so adapt the paths and raise the limit if more than 30 PRs merge in a week.

## Prompt

```text
Every [day and time], check the pull requests merged into [repo name] over the past week. Flag any that changed [tool schemas, CLI commands, config options, or environment variables] and list which docs pages in [docs path] likely need updating. Send me a short report with PR links and stop there without editing any docs.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Produce a short-form video from research to captions](./produce-a-short-form-video-from-research-to-captions.md)
- [Debloat an Android TV](./debloat-an-android-tv.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a booking and payment app for tattoo artists](./build-a-booking-and-payment-app-for-tattoo-artists.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
