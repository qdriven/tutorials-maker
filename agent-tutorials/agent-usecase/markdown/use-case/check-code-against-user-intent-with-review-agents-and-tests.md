---
title: "Check code against user intent with review agents and tests"
slug: "check-code-against-user-intent-with-review-agents-and-tests"
summary: "A developer has agents re-read all user messages to re-derive intent, then checks code and tests against it, tracking work in a reviewed todo file."
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Oct 16, 2026"
source_url: "https://news.ycombinator.com/item?id=50124513"
fetched_from: "https://agentusecases.ai/use-case/check-code-against-user-intent-with-review-agents-and-tests"
---

# Check code against user intent with review agents and tests

> A developer has agents re-read all user messages to re-derive intent, then checks code and tests against it, tracking work in a reviewed todo file.

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Oct 16, 2026

## What they did

The developer has the agent re-read every user message posted in a project to derive a fresh statement of what the user wanted, then uses that to check the code and tests. For long work, the agent writes a todo list kept as a project document, recording feedback on what happened as each gate closes. Tests, logging, and interacting with the running app support this.

## How it went

The developer says they have used this approach for about half a year to cut bugs and keep code matching intent. No bug counts or other measurements are given.

## Worth knowing

Re-reading all user messages takes only a few minutes even on a project with 10,000 messages, and the task file gets reviewed twice, before and after implementation.

## Prompt

```text
Read all of my messages in this session and re-derive what I actually wanted, written as a short list of requirements. Then check the code and tests in [folder or branch] against that list and report anything missing, extra, or untested. Record the gaps in a file called todo-review.md and stop there, without editing code until I approve the list.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Configure a local AI lab and build a knowledge graph by chat](./configure-a-local-ai-lab-and-build-a-knowledge-graph-by-chat.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Migrate a password reset flow to modern libraries](./migrate-a-password-reset-flow-to-modern-libraries.md)
- [Point a computer-using bot at any repo](./point-a-computer-using-bot-at-any-repo.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
