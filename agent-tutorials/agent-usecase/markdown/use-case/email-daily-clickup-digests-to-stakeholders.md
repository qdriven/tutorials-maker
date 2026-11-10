---
title: "Email daily ClickUp digests to stakeholders"
slug: "email-daily-clickup-digests-to-stakeholders"
summary: "A Make.com scenario sends a daily email digest from ClickUp to stakeholders without ClickUp accounts, and adds contacts to a selected action item."
category: "Work & Operations"
agents:
  - name: "Make"
    slug: "make"
source_platform: "Reddit"
source_date: "Jul 1, 2026"
source_url: "https://www.reddit.com/r/Make/comments/1u6amg9/clickup_x_makecom_automation_my_boss_wants_me_to"
fetched_from: "https://agentusecases.ai/use-case/email-daily-clickup-digests-to-stakeholders"
---

# Email daily ClickUp digests to stakeholders

> A Make.com scenario sends a daily email digest from ClickUp to stakeholders without ClickUp accounts, and adds contacts to a selected action item.

**Category:** Work & Operations  
**Agent:** Make  
**Source:** Reddit · Jul 1, 2026

## What they did

They set up ClickUp with a master action-item list plus related project and contact lists, rolling stakeholder emails into each task and auto-adding the right contacts when a project is chosen. In Make, the intended flow was a 6 AM scheduled run that lists incomplete tasks, iterates them, groups them by project in a Text Aggregator, and sends one email digest to that project’s stakeholder email field; the person manually tested the outputs and email format.

## How it went

The first version failed because the Text Aggregator was pulling whole ClickUp objects, so the email came out as JSON instead of task fields. Commenters said the fix was mapping individual fields and grouping by project name; no finished result or performance numbers were reported.

## Worth knowing

A practical catch from the thread: test by writing the generated subject, recipients, and body to Google Sheets or a Make data store before turning on live email sends.

## Prompt

```text
Build a scenario that runs every day at [time] and pulls tasks from my ClickUp [space or list] that are [due soon, changed, or blocked]. Format them into a clean email digest and send it to [stakeholder emails] who don't have ClickUp accounts. Send a test digest to me first and don't send it to stakeholders until I approve.
```

## Related use cases

- [Manage email, calendar and tasks from Slack](./manage-email-calendar-and-tasks-from-slack.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
- [Enrich new CRM leads for personalized outreach](./enrich-new-crm-leads-for-personalized-outreach.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Draft follow-up emails automatically when no reply arrives](./draft-follow-up-emails-automatically-when-no-reply-arrives.md)
