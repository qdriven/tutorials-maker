---
title: "Diagnose and roll back bad config during outages"
slug: "diagnose-and-roll-back-bad-config-during-outages"
summary: "Google SREs use Gemini CLI to pull logs, find a bad config push, generate a reverting changelist, and file postmortem action items via MCP."
category: "Software & DevOps"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "cloud.google.com"
source_date: "Undated"
source_url: "https://cloud.google.com/blog/topics/developers-practitioners/how-google-sres-use-gemini-cli-to-solve-real-world-outages"
fetched_from: "https://agentusecases.ai/use-case/diagnose-and-roll-back-bad-config-during-outages"
---

# Diagnose and roll back bad config during outages

> Google SREs use Gemini CLI to pull logs, find a bad config push, generate a reverting changelist, and file postmortem action items via MCP.

**Category:** Software & DevOps  
**Agent:** Gemini  
**Source:** cloud.google.com · Undated

## What they did

In a simulated outage, an SRE opened Gemini CLI, which pulled incident details, correlated time series and analyzed logs through Google's internal ProdAgent tools. It proposed a restart playbook, and the SRE approved it. The restart failed, so the agent checked the service's source and recent changes, found a bad config push, and drafted a reverting changelist. A custom command then wrote the postmortem and filed action items via MCP.

## How it went

The agent found the faulty config push in under two minutes, and the SRE-approved revert rolled out and the service recovered. The article gives no other measurements, and the scenario was simulated.

## Worth knowing

Humans approved each production change, and the agent could only use typed, policy-checked tools. Several tools here are Google-internal, so you'd need your own MCP servers.

## Prompt

```text
An outage is happening in [service name]. Pull the recent logs from [log source or command], find the most recent config change that lines up with the errors, and explain your evidence. Then draft a revert of that change as a patch or pull request, and write a list of postmortem action items. Stop once the revert and action items are ready, and show me both before you push, deploy, or file anything.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Hunt for unpatched vulnerabilities in SQLite commits](./hunt-for-unpatched-vulnerabilities-in-sqlite-commits.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
