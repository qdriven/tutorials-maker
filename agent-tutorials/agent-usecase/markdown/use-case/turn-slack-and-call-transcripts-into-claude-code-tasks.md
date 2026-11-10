---
title: "Turn Slack and call transcripts into Claude Code tasks"
slug: "turn-slack-and-call-transcripts-into-claude-code-tasks"
summary: "The poster wants a persistent Claude agent that watches Slack and call transcripts, spots tasks, and drafts the Claude Code prompts, removing them from the loop."
category: "Work & Operations"
agents:
  - name: "Claude"
    slug: "claude"
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Oct 8, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1x0an42/serious_work_question_ive_become_a_human_api"
fetched_from: "https://agentusecases.ai/use-case/turn-slack-and-call-transcripts-into-claude-code-tasks"
---

# Turn Slack and call transcripts into Claude Code tasks

> The poster wants a persistent Claude agent that watches Slack and call transcripts, spots tasks, and drafts the Claude Code prompts, removing them from the loop.

**Category:** Work & Operations  
**Agent:** Claude, Claude Code  
**Source:** Reddit · Oct 8, 2026

## What they did

The post itself is a request, not a finished build: the poster says their company’s Claude enterprise setup already connects to Slack, call recordings/transcripts, a data warehouse, a knowledge base, Google Workspace, and internal tools, and they want a permanent agent to watch Slack and transcripts, identify tasks, draft Claude Code prompts, and let them approve or tweak before running. In comments, the most concrete similar setup described is a small always-on Slack app on a Mac that listens for mentions and alerts, starts Claude Code in headless mode per Slack thread, keeps phase one read-only, and gates write actions, sends, and higher-risk changes behind approval buttons.

## How it went

No outcome is reported by the original poster because they are asking for advice. A commenter who built a similar system says it was a "total game changer," but gives no hard metrics; others warn quality can drop without strong approval, deduping, and read-only staging.

## Worth knowing

Most actionable catch: start read-only, separate task extraction from execution, and dedupe requests because the same ask may appear in both Slack and call transcripts.

## Prompt

```text
Read the [Slack export or channel folder] and the call transcripts in [folder path], and find action items that could be handed to a coding agent for [project name]. For each one, draft a clear, ready-to-run Claude Code prompt and note which message or transcript it came from. Save them as a single list in [file path], and don't run any of the tasks or send any messages yourself.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build retro games with a child using Claude Code](./build-retro-games-with-a-child-using-claude-code.md)
- [Generate ad-copy variants and scrape competitor ads](./generate-ad-copy-variants-and-scrape-competitor-ads.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Speed up multifamily deal research and property summaries](./speed-up-multifamily-deal-research-and-property-summaries.md)
- [Generate invoices automatically from a template](./generate-invoices-automatically-from-a-template.md)
