---
title: "Build a financial plan and retirement scenarios from statements"
slug: "build-a-financial-plan-and-retirement-scenarios-from-stateme"
summary: "A commenter used Claude Code to read assets, debt and income statements, interview them on goals, and dispatch sub-agents to produce a multiphase action plan and retirement scenarios."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1py5icg/whats_your_best_claude_code_noncoding_use_case"
fetched_from: "https://agentusecases.ai/use-case/build-a-financial-plan-and-retirement-scenarios-from-stateme"
---

# Build a financial plan and retirement scenarios from statements

> A commenter used Claude Code to read assets, debt and income statements, interview them on goals, and dispatch sub-agents to produce a multiphase action plan and retirement scenarios.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Code  
**Source:** Reddit · Undated

## What they did

A commenter set up Claude Code as a small “financial firm” with separate agents: a budget analyst, a Boglehead-style retirement advisor, a more aggressive asset manager, a coding agent, and a lead advisor. They stored assets, liabilities, debt, and income in markdown, pulled YNAB spending data through its API, had Python scripts summarize transactions, and used the lead agent to interview them on goals, dispatch the sub-agents, and assemble a multiphase plan plus retirement scenarios.

## How it went

It produced a full financial planning review, including budget feedback from two years of transactions and retirement options covering timing, location, lifestyle, and an estimated probability of reaching those goals. The commenter did not share measured performance or real-world results beyond that output.

## Worth knowing

The main practical catch was setup: they had to wire YNAB’s API and save the token in a local JSON file so the workflow was repeatable without rerunning the LLM for every summary.

## Prompt

```text
Read the financial statements in [folder path] covering my assets, debts and income. Then interview me one question at a time about my goals, such as [retirement age, savings targets, big purchases]. When you have enough, write a multiphase action plan and a few retirement scenarios as markdown files in [output folder], with assumptions listed at the top of each.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Draft a refund demand for an unauthorized renewal](./draft-a-refund-demand-for-an-unauthorized-renewal.md)
- [Run overnight memecoin checks and alerts](./run-overnight-memecoin-checks-and-alerts.md)
