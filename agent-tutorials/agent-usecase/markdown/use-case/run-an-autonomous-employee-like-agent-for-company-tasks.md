---
title: "Run an autonomous employee-like agent for company tasks"
slug: "run-an-autonomous-employee-like-agent-for-company-tasks"
summary: "Author runs a self-built autonomous agent on Codex, ChatGPT Plus, systemd and email that handles various company tasks, using a rolling context, diary and markdown wiki for memory."
category: "Work & Operations"
agents:
  - name: "Codex"
    slug: "codex"
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "HN"
source_date: "Apr 11, 2026"
source_url: "https://news.ycombinator.com/item?id=47730086"
fetched_from: "https://agentusecases.ai/use-case/run-an-autonomous-employee-like-agent-for-company-tasks"
---

# Run an autonomous employee-like agent for company tasks

> Author runs a self-built autonomous agent on Codex, ChatGPT Plus, systemd and email that handles various company tasks, using a rolling context, diary and markdown wiki for memory.

**Category:** Work & Operations  
**Agent:** Codex, ChatGPT  
**Source:** HN · Apr 11, 2026

## What they did

The author built their own autonomous agent instead of using OpenClaw. It runs on Codex with a ChatGPT Plus account, is scheduled by systemd, and communicates through ordinary UNIX email and a normal user account. For memory it uses one long rolling context window, a diary, and a folder of markdown wiki files. It works as an employee of the author's company.

## How it went

The author reports it works great and has handled all kinds of tasks, with no memory problems so far. They say it is early days and demands may grow. Specifics on tasks and results are not given.

## Worth knowing

If memory strains as workload grows, the author's plan is to add a second or third bot as specialists, like employees, rather than overloading one.

## Prompt

```text
Help me build an always-on agent for my company that handles [recurring tasks, such as triaging email or updating docs]. It should run as a [systemd service or scheduled job], keep memory in a markdown wiki and a daily diary file, and read tasks from [inbox or folder]. Finished means it completes one test task end to end and logs what it did. Require my approval before it sends any email or deletes anything.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Speed up a thesis literature review](./speed-up-a-thesis-literature-review.md)
- [Order from a restaurant menu photo with ChatGPT](./order-from-a-restaurant-menu-photo-with-chatgpt.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Pull invoices from Gmail and organize them](./pull-invoices-from-gmail-and-organize-them.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
