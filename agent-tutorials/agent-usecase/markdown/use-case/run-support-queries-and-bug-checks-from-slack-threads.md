---
title: "Run support queries and bug checks from Slack threads"
slug: "run-support-queries-and-bug-checks-from-slack-threads"
summary: "Doozy, a Slack agent, takes tasks from support staff and runs them against Postgres, Stripe, GitHub and Linear in a sandbox, then posts results in the thread; 13 people use it daily."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Oct 20, 2026"
source_url: "https://news.ycombinator.com/item?id=50166597"
fetched_from: "https://agentusecases.ai/use-case/run-support-queries-and-bug-checks-from-slack-threads"
---

# Run support queries and bug checks from Slack threads

> Doozy, a Slack agent, takes tasks from support staff and runs them against Postgres, Stripe, GitHub and Linear in a sandbox, then posts results in the thread; 13 people use it daily.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Oct 20, 2026

## What they did

At Spur, support staff mention Doozy in a Slack thread with a task. It runs in a fresh sandbox (E2B) holding no credentials, while gateways outside add them per request. It queries Postgres, Stripe, GitHub, Linear, PostHog, MCP servers or the web, then posts results and files back in the thread. Destructive tools start denied until owners enable them.

## How it went

13 people at Spur use it daily, mostly support and success rather than engineers, and the author calls it a critical part of the team. The first version was hacky and barely read files sent in a thread.

## Worth knowing

Keep credentials outside the sandbox and deny destructive tools by default; the author says injection can still misuse granted tools, though it can't leak a key.

## Prompt

```text
Set up a helper I can hand support tasks to. When I describe a problem, like [a customer's failed payment or a suspected bug], look it up using read-only access to [your database, Stripe, GitHub and Linear] and write up what you found with links to the records. You're done when you've given me a short summary I could post in a Slack thread. Never change or delete any data, and pause and show me anything you'd write or send before doing it.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Delegate calendar, inbox and travel booking to a personal work agent](./delegate-calendar-inbox-and-travel-booking-to-a-personal-wor.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Run a business assistant that resumes project work](./run-a-business-assistant-that-resumes-project-work.md)
- [Scrape websites with a plain-language browser agent](./scrape-websites-with-a-plain-language-browser-agent.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
