---
title: "Migrate a legacy product stack with Claude Code"
slug: "migrate-a-legacy-product-stack-with-claude-code"
summary: "An engineer ran a proof-of-concept that consolidated 4 repos into 2, moved MySQL to PostgreSQL, upgraded frameworks and replaced the auth model, in about 15 work days."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/aws-builders/the-setup-is-the-strategy-how-i-orchestrated-a-product-migration-with-claude-code-b92"
fetched_from: "https://agentusecases.ai/use-case/migrate-a-legacy-product-stack-with-claude-code"
---

# Migrate a legacy product stack with Claude Code

> An engineer ran a proof-of-concept that consolidated 4 repos into 2, moved MySQL to PostgreSQL, upgraded frameworks and replaced the auth model, in about 15 work days.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** dev.to · Undated

## What they did

The engineer wrote layered CLAUDE.md context files and gave Claude Code the legacy repos, read-only MySQL and PostgreSQL connections, and a reference implementation. Claude drafted the design, and parallel reviewer agents stress-tested it. Claude then made 19 Jira tickets. Each ticket got a design doc and plan doc that he reviewed, then ran in its own git worktree, with CI monitored through a loop.

## How it went

About 15 work days produced roughly 50 tickets and 580 passing tests, with 95%+ API coverage and zero bugs or vulnerabilities at QA handoff. AI review caught only 30-40% of issues, and the Jira MCP could not link tickets.

## Worth knowing

Cost was close to $5,000 in Bedrock tokens, mostly up front. Also, the Confluence MCP silently truncated pages over about 5KB, overwriting two large design docs.

## Prompt

```text
I want a proof-of-concept migration of [legacy product] from [current stack, e.g. 4 repos, MySQL, old framework version] to [target stack, e.g. 2 repos, PostgreSQL, current framework]. Start by reading the codebases and writing a phased migration plan with risks, then execute the first phase on a new branch with tests passing. Pause for my review before merging anything or running changes against any real database.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
