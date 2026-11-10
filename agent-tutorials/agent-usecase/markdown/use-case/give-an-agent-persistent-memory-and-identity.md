---
title: "Give an agent persistent memory and identity"
slug: "give-an-agent-persistent-memory-and-identity"
summary: "A developer gave a Claude Code agent memory and an identity, then reported back on what it was doing four months later."
category: "Life Admin & Home"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "DEV"
source_date: "Mar 17, 2026"
source_url: "https://dev.to/jkheadley/i-built-a-claude-code-agent-that-doesnt-need-me-anymore-dfm"
fetched_from: "https://agentusecases.ai/use-case/give-an-agent-persistent-memory-and-identity"
---

# Give an agent persistent memory and identity

> A developer gave a Claude Code agent memory and an identity, then reported back on what it was doing four months later.

**Category:** Life Admin & Home  
**Agent:** Claude Code  
**Source:** DEV · Mar 17, 2026

## What they did

Justin Headley ran a Claude Code agent, reached through Telegram, that starts a session with its memory and identity loaded and shuts down afterward. Most of the infrastructure was written by the agent: a process manager for sessions, layered memory, and identity re-injection after each start or compaction. A separate AI reviews outbound actions such as emails and pushes before they go out. The agent has email access and runs scheduled jobs.

## How it went

After four months the agent, named Dawn, ran 59 scheduled jobs and had dealt with 470+ people. It also ran a week-long open source collaboration he didn't know about. A Feb 22 session destroyed production data, which was restored from a four-day-old backup.

## Worth knowing

The first single-file memory overflowed the agent's working memory in about a week. A commenter who tried Instar spent roughly $25 and 12 hours without getting it working, and said it was expensive to run.

## Prompt

```text
In my project folder [path], set up a persistent memory file and a short identity description for you (name, role, how I like to work, current goals: [goals]). Update the memory at the end of each session with what you did, decisions made, and open tasks. Finished means I can start a fresh session and you can summarize where we left off from the memory alone.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a personal doorman agent on a $7 VPS](./run-a-personal-doorman-agent-on-a-7-vps.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Place library holds for books you need](./place-library-holds-for-books-you-need.md)
