---
title: "Reconcile industry files and chase clarifications with agents"
slug: "reconcile-industry-files-and-chase-clarifications-with-agent"
summary: "An agent workflow ingests a complex industry file, loads it into a database, spawns agents to check it against work in flight, and contacts people to resolve bad data."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Sep 16, 2026"
source_url: "https://news.ycombinator.com/item?id=49726000"
fetched_from: "https://agentusecases.ai/use-case/reconcile-industry-files-and-chase-clarifications-with-agent"
---

# Reconcile industry files and chase clarifications with agents

> An agent workflow ingests a complex industry file, loads it into a database, spawns agents to check it against work in flight, and contacts people to resolve bad data.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Sep 16, 2026

## What they did

The author, building for a specific industry they don't name, has a $4/1M-token model ingest a file normally used in a complicated legacy program. It parses the data into a database, then spawns agents to check it against work in flight. Further agents contact the people involved to clarify bad data, and others keep reconciling against many items as updates arrive.

## How it went

The author says it replaces a $500+/hr service and catches mistakes in real time across languages and cultures. No measured results are given.

## Worth knowing

Expect patience: the author says it takes running tests and tweaking until it works, and their main ongoing job is maintaining the tests.

## Prompt

```text
I receive a [file type, e.g. industry data file] from [source] every [frequency]. Write a workflow that loads it into a local [SQLite or Postgres] database, then checks each record against [my in-flight work, such as a spreadsheet or table]. List every mismatch or bad record in a report, with a draft clarification email to the person responsible for each. Stop when the report and drafts are ready, and show me the emails before sending any.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Delegate calendar, inbox and travel booking to a personal work agent](./delegate-calendar-inbox-and-travel-booking-to-a-personal-wor.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Regrade assignments and update grades in Brightspace](./regrade-assignments-and-update-grades-in-brightspace.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
