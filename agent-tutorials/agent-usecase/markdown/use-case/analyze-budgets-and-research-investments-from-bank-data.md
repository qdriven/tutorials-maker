---
title: "Analyze budgets and research investments from bank data"
slug: "analyze-budgets-and-research-investments-from-bank-data"
summary: "The poster pipes bank transaction data into ChatGPT and uses Claude for budget analysis, investment research, and summarizing and comparing financial reports."
category: "Money, Bills & Benefits"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Apr 1, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1s9b6im/anyone_using_claude_for_managing_finances"
fetched_from: "https://agentusecases.ai/use-case/analyze-budgets-and-research-investments-from-bank-data"
---

# Analyze budgets and research investments from bank data

> The poster pipes bank transaction data into ChatGPT and uses Claude for budget analysis, investment research, and summarizing and comparing financial reports.

**Category:** Money, Bills & Benefits  
**Agent:** ChatGPT, Claude  
**Source:** Reddit · Apr 1, 2026

## What they did

The poster says they use WisePenny to pipe transaction data from their bank accounts into ChatGPT without handing over bank logins or broad third-party permissions, then use Claude for the analysis work. In the thread they describe using Claude to build budgets from spending history, summarize and compare companies’ financial reports, and help research investments rather than directly controlling accounts.

## How it went

The source gives no hard performance numbers; it presents this as a practical read-and-analyze workflow. In comments, others stress keeping the setup read-only or local and not letting Claude manage money autonomously.

## Worth knowing

The clearest catch is security: the poster says they avoid sharing bank login details, and a commenter says their own local setup keeps financial data entirely on-device.

## Prompt

```text
I have exported my bank transactions to [file path, CSV]. Categorize the spending, show monthly totals by category, flag subscriptions and unusual charges, and suggest [number] realistic ways to save toward [goal]. Finish with a one-page summary and a cleaned spreadsheet, and do not change or delete my original files.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Triage support emails and draft refund-policy replies](./triage-support-emails-and-draft-refund-policy-replies.md)
- [Negotiate a car purchase with ChatGPT](./negotiate-a-car-purchase-with-chatgpt.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Turn vet charges into ready-to-send pet insurance claims](./turn-vet-charges-into-ready-to-send-pet-insurance-claims.md)
- [Fight a denied home insurance water damage claim](./fight-a-denied-home-insurance-water-damage-claim.md)
