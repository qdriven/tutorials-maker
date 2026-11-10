---
title: "Automate customer onboarding with a Make scenario"
slug: "automate-customer-onboarding-with-a-make-scenario"
summary: "Agency replaced a planned AI agent with a Make.com scenario and Slack channel for client customer onboarding, and the client paid."
category: "Work & Operations"
agents:
  - name: "Make"
    slug: "make"
source_platform: "Reddit"
source_date: "Aug 17, 2026"
source_url: "https://www.reddit.com/r/u_Actual-Struggle9480/comments/1vhxx3q/client_paid_us_to_build_an_ai_agent_we_killed_the"
fetched_from: "https://agentusecases.ai/use-case/automate-customer-onboarding-with-a-make-scenario"
---

# Automate customer onboarding with a Make scenario

> Agency replaced a planned AI agent with a Make.com scenario and Slack channel for client customer onboarding, and the client paid.

**Category:** Work & Operations  
**Agent:** Make  
**Source:** Reddit · Aug 17, 2026

## What they did

The team began by spending two hours mapping the client’s existing onboarding process instead of building the proposed AI agent. They found three people re-entering the same data across three separate tools, scrapped the agent plan, and replaced it with a Make.com scenario plus a Slack channel.

## How it went

They shipped the replacement in four days, the client still paid the original invoice, and the new setup saved 15 hours per week. The post does not give more detail on the build or any limitations.

## Worth knowing

The key catch was to audit the workflow first: two hours of process mapping avoided building unnecessary AI.

## Prompt

```text
Build a Make scenario that starts when a new client signs up through [form or CRM trigger] and runs our onboarding steps: create their folder in [Drive or tool], send the welcome email, add tasks to [project tool], and post a summary to Slack channel [channel]. Use fixed steps rather than an open-ended AI agent so it behaves predictably. Pause before sending the client email and show me the draft, and finish once a test signup runs cleanly through every step.
```

## Related use cases

- [Manage email, calendar and tasks from Slack](./manage-email-calendar-and-tasks-from-slack.md)
- [Summarize a YouTuber's latest video into a Google Doc daily](./summarize-a-youtuber-s-latest-video-into-a-google-doc-daily.md)
- [Research, score and draft outreach for leads](./research-score-and-draft-outreach-for-leads.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Draft follow-up emails automatically when no reply arrives](./draft-follow-up-emails-automatically-when-no-reply-arrives.md)
