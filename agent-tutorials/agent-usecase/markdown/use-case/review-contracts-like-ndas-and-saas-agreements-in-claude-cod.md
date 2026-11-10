---
title: "Review contracts like NDAs and SaaS agreements in Claude Code"
slug: "review-contracts-like-ndas-and-saas-agreements-in-claude-cod"
summary: "The author built an open-source contract-review skill for Claude Code and other AI coding tools to review NDAs, SaaS agreements, vendor terms and merchant agreements."
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Mar 1, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1r6tse1/i_built_a_free_contract_review_skill_for_claude"
fetched_from: "https://agentusecases.ai/use-case/review-contracts-like-ndas-and-saas-agreements-in-claude-cod"
---

# Review contracts like NDAs and SaaS agreements in Claude Code

> The author built an open-source contract-review skill for Claude Code and other AI coding tools to review NDAs, SaaS agreements, vendor terms and merchant agreements.

**Category:** Work & Operations  
**Agent:** Claude Code  
**Source:** Reddit · Mar 1, 2026

## What they did

The author packaged a contract-review skill as an open-source Claude Code add-on with a one-line install from GitHub into the local skills folder. They describe using it inside their workflow to review NDAs, SaaS agreements, vendor terms, and merchant agreements, and the thread positions it as usable with Claude Code and similar AI coding tools rather than a fully autonomous service.

## How it went

The stated result is a free, open-source review skill shared publicly on Reddit and GitHub for contract checking across several common agreement types. The thread excerpt does not give performance numbers, examples of detected issues, or a comparison against lawyer review.

## Worth knowing

The main practical catch mentioned is setup: installation is a local git clone into ~/.claude/skills/contract-review; the available thread excerpt gives no cost or time figures.

## Prompt

```text
I have a contract at [file path], which is a [NDA, SaaS agreement, vendor terms, etc.]. I am the [party, e.g. customer or vendor]. Read it clause by clause and flag risky or unusual terms such as liability caps, auto-renewal, IP ownership, termination and indemnity. Finish with a table of issues ranked by severity, with suggested redline language for each. Do not edit the original file, and remind me you are not a lawyer.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Write end-of-sprint changelogs from completed tickets](./write-end-of-sprint-changelogs-from-completed-tickets.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
