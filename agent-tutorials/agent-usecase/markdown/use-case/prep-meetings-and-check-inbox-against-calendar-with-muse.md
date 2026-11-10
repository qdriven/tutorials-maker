---
title: "Prep meetings and check inbox against calendar with Muse"
slug: "prep-meetings-and-check-inbox-against-calendar-with-muse"
summary: "The author ran work tasks in Muse: it found the right email thread for meeting prep and cross-checked emails against the calendar for conflicts, though inbox prioritisation was weak."
category: "Work & Operations"
agents:
  - name: "Meta Muse"
    slug: "meta-muse"
source_platform: "aiagentslibrary.com"
source_date: "Undated"
source_url: "https://www.aiagentslibrary.com/blog/meta-muse-prompts/"
fetched_from: "https://agentusecases.ai/use-case/prep-meetings-and-check-inbox-against-calendar-with-muse"
---

# Prep meetings and check inbox against calendar with Muse

> The author ran work tasks in Muse: it found the right email thread for meeting prep and cross-checked emails against the calendar for conflicts, though inbox prioritisation was weak.

**Category:** Work & Operations  
**Agent:** Meta Muse  
**Source:** aiagentslibrary.com · Undated

## What they did

The author connected Muse to email and calendar and ran it on real work tasks inside a ten-task test. For meeting prep, Muse picked the right email thread unprompted from several plausible ones and found the matching calendar event. It also saw it needed calendar access and walked through the connection itself. For inbox triage, the prompt told it to read and rank only, not reply.

## How it went

Meeting preparation scored 10/10. Inbox prioritisation scored 6/10 because Muse wrongly decided a message was unanswered when it had been, apparently confused by the thread and CC structure.

## Worth knowing

Have Muse list uncertain threads for you to check rather than guessing, and forbid replying, since acting on the wrong inbox call would have meant emailing someone twice.

## Prompt

```text
For my meeting with [person or topic] on [date], find the right email thread in my [Gmail] and summarize where things stand, with open items and what I should bring. Then cross-check my unread emails from the past [3] days against my calendar and flag any scheduling conflicts or requests that clash with existing events. Give me the results as one short list and don't reply to or send anything.
```

## Related use cases

- [Find airline food-fee reimbursement emails buried in the inbox](./find-airline-food-fee-reimbursement-emails-buried-in-the-inb.md)
- [Build and order a grocery cart from an idea](./build-and-order-a-grocery-cart-from-an-idea.md)
- [Build profit/loss statements for rental properties](./build-profit-loss-statements-for-rental-properties.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
