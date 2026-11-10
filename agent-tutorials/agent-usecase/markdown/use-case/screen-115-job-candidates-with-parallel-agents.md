---
title: "Screen 115 job candidates with parallel agents"
slug: "screen-115-job-candidates-with-parallel-agents"
summary: "A team connected Notion to Claude Code, dispatching one agent per candidate to check data and GitHub evidence against a rubric, producing a ranked shortlist for $65."
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "happycapy.ai"
source_date: "Undated"
source_url: "https://happycapy.ai/blog/hiring-dynamic-workflow"
fetched_from: "https://agentusecases.ai/use-case/screen-115-job-candidates-with-parallel-agents"
---

# Screen 115 job candidates with parallel agents

> A team connected Notion to Claude Code, dispatching one agent per candidate to check data and GitHub evidence against a rubric, producing a ranked shortlist for $65.

**Category:** Work & Operations  
**Agent:** Claude Code  
**Source:** happycapy.ai · Undated

## What they did

The team pulled their Notion hiring database into one data file per candidate with the Notion CLI. A script then dispatched 115 Claude agents in parallel. Each agent read markdown rubric files, visited the candidate's GitHub and portfolio links, and returned structured JSON scores. Code computed the rankings, and 10 devil's-advocate agents challenged the top candidates' scores. Code then enforced a 5% cap on the top grade.

## How it went

The run took about 13 minutes and cost about $65, roughly $0.57 per candidate. No one reached S or A, 6 candidates scored B, and adversarial review cut the top two from about 82 to about 75.

## Worth knowing

Cache writes were the largest cost line, because each parallel agent builds its own cache. The authors suggest Sonnet for scoring and Opus only for review to cut cost 70 to 80%.

## Prompt

```text
I have [number] job candidates in [Notion database/spreadsheet] for the [role] position. Read my scoring rubric: [paste criteria]. Run one sub-agent per candidate to check their data and public evidence like [GitHub/portfolio] against the rubric, then produce a ranked shortlist with a one-paragraph reason for each. Don't contact any candidates or change records. You're done when I have the ranked list and the cost of the run.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Write end-of-sprint changelogs from completed tickets](./write-end-of-sprint-changelogs-from-completed-tickets.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
