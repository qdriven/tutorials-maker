---
title: "Tutor you through pen-and-paper math with a local agent"
slug: "tutor-you-through-pen-and-paper-math-with-a-local-agent"
summary: "An open-sourced tutor app runs Codex locally with a TUTOR.md brief to teach math with pen and paper using the user's subscription credits."
category: "Research & Knowledge"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "HN"
source_date: "Oct 19, 2026"
source_url: "https://news.ycombinator.com/item?id=50147872"
fetched_from: "https://agentusecases.ai/use-case/tutor-you-through-pen-and-paper-math-with-a-local-agent"
---

# Tutor you through pen-and-paper math with a local agent

> An open-sourced tutor app runs Codex locally with a TUTOR.md brief to teach math with pen and paper using the user's subscription credits.

**Category:** Research & Knowledge  
**Agent:** Codex  
**Source:** HN · Oct 19, 2026

## What they did

The author built a tutor app called ari and open-sourced it. It runs Codex locally, so it draws on the user's existing subscription credits instead of an API key. A TUTOR.md file, adapted from the SOUL.md idea in openclaw, holds the brief that sets up the agent as a math tutor for pen-and-paper work.

## How it went

The author calls it very fun and says a version of your own is trivial to make. The comment gives no results, numbers, or limitations.

## Worth knowing

Running Codex locally means it uses subscription credits rather than an API key, so no separate API billing is needed.

## Prompt

```text
Set up a local math tutor for me in this folder. Write a TUTOR.md brief telling you to teach [topic, e.g. algebra or calculus] at [my level] by giving me one problem at a time to work out on paper, then asking me to type or describe my answer and steps, and giving hints before solutions. The setup is done when I can start a session, receive a first problem, and get feedback on my attempt. Don't delete or overwrite any existing files without showing me first.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Diagnose a killed process on a server](./diagnose-a-killed-process-on-a-server.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Turn any URL into a structured Notion note](./turn-any-url-into-a-structured-notion-note.md)
- [Measure how long jobs stay open at tech companies](./measure-how-long-jobs-stay-open-at-tech-companies.md)
