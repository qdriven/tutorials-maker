---
title: "Triage unread email with an approval step"
slug: "triage-unread-email-with-an-approval-step"
summary: "Author built an agent that runs when unread emails arrive and analyzes each one, without auto-replying absent approval."
category: "Work & Operations"
agents:
  - name: "Make"
    slug: "make"
source_platform: "aimaker.substack.com"
source_date: "Jan 15, 2026"
source_url: "https://aimaker.substack.com/p/build-ai-email-triage-agent-automation-make-tutorial"
fetched_from: "https://agentusecases.ai/use-case/triage-unread-email-with-an-approval-step"
---

# Triage unread email with an approval step

> Author built an agent that runs when unread emails arrive and analyzes each one, without auto-replying absent approval.

**Category:** Work & Operations  
**Agent:** Make  
**Source:** aimaker.substack.com · Jan 15, 2026

## What they did

Wyndo built a Make.com scenario that uses Gmail's Watch New Emails trigger to start when unread mail arrives. Make's AI Agent module, running on an OpenAI API key, checks each email's sender, subject and content against his triage rules. It labels, archives or flags each one, then sends him a summary email. The system prompt and the rest of the build are behind the paywall.

## How it went

He says he woke up to a summary of 3 urgent, 2 newsletter-idea, 1 follow-up and 4 archived emails, without opening Gmail. The source doesn't describe how the approval step works.

## Worth knowing

Costs about $12-15 a month: a Make.com paid plan from $9 a month, plus $5-10 of OpenAI credits that he says last 1-3 months.

## Prompt

```text
Build a workflow that triggers whenever a new unread email lands in [Gmail or Outlook account]. For each one, have the AI summarize it, label it as [categories, e.g. urgent, needs reply, FYI], and draft a suggested reply for anything that needs one. Send me the summaries and drafts in [Slack or email digest] for approval, and never send a reply automatically until I approve it.
```

## Related use cases

- [Manage email, calendar and tasks from Slack](./manage-email-calendar-and-tasks-from-slack.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
- [Enrich new CRM leads for personalized outreach](./enrich-new-crm-leads-for-personalized-outreach.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Draft follow-up emails automatically when no reply arrives](./draft-follow-up-emails-automatically-when-no-reply-arrives.md)
