---
title: "Investigate customer errors and draft tickets in support"
slug: "investigate-customer-errors-and-draft-tickets-in-support"
summary: "Cursor's support team uses Cursor with MCP to pull Datadog logs, search past cases, and draft a Linear bug ticket and customer reply."
category: "Sales, Marketing & Support"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "cursor.com"
source_date: "Undated"
source_url: "https://cursor.com/blog/cursor-support"
fetched_from: "https://agentusecases.ai/use-case/investigate-customer-errors-and-draft-tickets-in-support"
---

# Investigate customer errors and draft tickets in support

> Cursor's support team uses Cursor with MCP to pull Datadog logs, search past cases, and draft a Linear bug ticket and customer reply.

**Category:** Sales, Marketing & Support  
**Agent:** Cursor  
**Source:** cursor.com · Undated

## What they did

Support engineers start in Ask Mode with the codebase in a multi-root workspace. MCP servers bring in Datadog logs and traces, Slack and Notion history, and Linear. Slash commands and skills cover log search, known-issue lookup, ticket drafting and customer replies. Parallel subagents (log investigator, known-issue miner, ticket writer, reply drafter) merge into one output that a person reviews and sends.

## How it went

Over 75% of support interactions now run through Cursor, and the team estimates 5–10x throughput per support engineer. These figures are the team's own estimates, not measured results.

## Worth knowing

Write guardrails into the reply prompts so drafts leave out internal service names, error codes and file paths. A human still reviews everything before it goes out.

## Prompt

```text
A customer reported [error description] on [date/account]. Using my connected [Datadog / logging tool], [past case search], and [Linear / Jira], find the relevant logs and similar past cases, then draft a bug ticket and a customer reply. Show me both drafts with the evidence you found, and do not file the ticket or send the reply until I approve.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Grade Cursor on a real data science project](./grade-cursor-on-a-real-data-science-project.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Build a profitable online business from scratch with an agent](./build-a-profitable-online-business-from-scratch-with-an-agen.md)
- [Qualify leads and draft emails pending human approval](./qualify-leads-and-draft-emails-pending-human-approval.md)
