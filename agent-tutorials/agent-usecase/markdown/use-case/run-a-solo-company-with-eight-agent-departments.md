---
title: "Run a solo company with eight agent departments"
slug: "run-a-solo-company-with-eight-agent-departments"
summary: "A founder set up CEO, CFO, COO, lawyer, accountant, marketing, CTO, and improver agents that share memory and consult each other."
category: "Work & Operations"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "DEV"
source_date: "Mar 3, 2026"
source_url: "https://dev.to/setas/i-run-a-solo-company-with-ai-agent-departments-50nf"
fetched_from: "https://agentusecases.ai/use-case/run-a-solo-company-with-eight-agent-departments"
---

# Run a solo company with eight agent departments

> A founder set up CEO, CFO, COO, lawyer, accountant, marketing, CTO, and improver agents that share memory and consult each other.

**Category:** Work & Operations  
**Agent:** GitHub Copilot  
**Source:** DEV · Mar 3, 2026

## What they did

The founder wrote eight agents as markdown files in a GitHub Copilot repo. They have MCP tools for X, dev.to, Sentry and scheduling, and all read and write one shared JSONL knowledge graph. A COO agent runs a morning standup and delegates. Agents consult each other by trigger table, for example Marketing sends product claims to the Lawyer. An Improver proposes upgrades as diffs, and the founder reviews them.

## How it went

After two months: €6.09 revenue, about €42/month infrastructure, 84+ tweets, 5 articles, under an hour a week on marketing, and no missed tax deadlines. Parallel writes corrupted the memory file until he forked the server.

## Worth knowing

Start with three agents (COO, Marketing, Accountant), not eight. Build the cross-agent review step in from the start. Building it took about 40 hours.

## Prompt

```text
Help me set up a set of AI agent roles for my solo business, [business description], with roles like CEO, finance, legal, marketing, and tech. Create a project folder with one instruction file per role and a shared memory file they all read and update. Write a short note on how the roles should consult each other, and stop when the structure is ready for me to try one question.
```

## Related use cases

- [Evaluate hiring candidates against competency levels](./evaluate-hiring-candidates-against-competency-levels.md)
- [Add a filtered report page to a Razor Pages app](./add-a-filtered-report-page-to-a-razor-pages-app.md)
- [Let Copilot Agent Mode handle coding, then constrain it](./let-copilot-agent-mode-handle-coding-then-constrain-it.md)
- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
