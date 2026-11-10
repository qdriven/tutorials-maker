---
title: "Run swarms of agents for equity analysis"
slug: "run-swarms-of-agents-for-equity-analysis"
summary: "A user runs dozens of agents over a large data store for equity analysis, and has Claude coordinate a group of Codex agents for coding."
category: "Research & Knowledge"
agents:
  - name: "Claude"
    slug: "claude"
  - name: "Codex"
    slug: "codex"
source_platform: "HN"
source_date: "Nov 5, 2026"
source_url: "https://news.ycombinator.com/item?id=50373324"
fetched_from: "https://agentusecases.ai/use-case/run-swarms-of-agents-for-equity-analysis"
---

# Run swarms of agents for equity analysis

> A user runs dozens of agents over a large data store for equity analysis, and has Claude coordinate a group of Codex agents for coding.

**Category:** Research & Knowledge  
**Agent:** Claude, Codex  
**Source:** HN · Nov 5, 2026

## What they did

For coding, the user has Claude coordinate a group of Codex agents over a communication channel they set up. Claude also acts as a second verifier. The Codex parent session only handles comms with Claude, and the other agents run as sub agents. For equity analysis, they use ctlflow.com to run dozens of agents over a large data store.

## How it went

The user says talking to one coordinating agent instead of a group saves time, and that a swarm can surface surprising information from a large data store. No concrete numbers or results are given.

## Worth knowing

The setup runs on 2x ChatGPT Pro 200 plus a Claude Max 200 subscription, which is a substantial monthly cost to replicate.

## Prompt

```text
I have a folder of [filings, transcripts, or data files] at [path]. Split the work into parallel sub-agents, one per [company or ticker from my list: ...], and have each write a one-page analysis covering [revenue trends, risks, valuation, or other criteria]. Then combine them into a single comparison table in [file name] that ranks the companies and flags where the sub-agents disagreed or the data was thin. Don't delete or modify my source files.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Compile and filter apartment listings](./compile-and-filter-apartment-listings.md)
- [Screen interview code submissions with a Codex review agent](./screen-interview-code-submissions-with-a-codex-review-agent.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Save and search links via a Telegram second brain](./save-and-search-links-via-a-telegram-second-brain.md)
- [Send a daily AI news digest on a schedule](./send-a-daily-ai-news-digest-on-a-schedule.md)
