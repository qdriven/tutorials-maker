---
title: "Automate a day job as an automation engineer"
slug: "automate-a-day-job-as-an-automation-engineer"
summary: "The poster has Claude act as an automation engineer, doing design and research work and finding related docs and indexes for their job."
category: "Work & Operations"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Jul 11, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1uszlay/how_claude_does_my_40_hour_a_week_job_by_itself"
fetched_from: "https://agentusecases.ai/use-case/automate-a-day-job-as-an-automation-engineer"
---

# Automate a day job as an automation engineer

> The poster has Claude act as an automation engineer, doing design and research work and finding related docs and indexes for their job.

**Category:** Work & Operations  
**Agent:** Claude  
**Source:** Reddit · Jul 11, 2026

## What they did

The poster had Claude write a Python script for a contracting job that extracts information from websites, because doing it manually was too time consuming. They use Claude as the decision-maker around that code: they tell it to start, it runs the workflow and returns the finished work, and the human mainly supplies the field expertise about where to look and submits the result.

## How it went

The poster says it now covers what had been a 40-hour-a-week job and that their own involvement is down to about 10 minutes. They also say the LLM portion costs about 15 cents, but give no hard accuracy metrics or failure rates.

## Worth knowing

Their main caution is to avoid having Claude scrape directly; they trusted a script to do the extraction because it used almost no tokens and was faster.

## Prompt

```text
Act as an automation engineer on my team. I need to automate [process, e.g. weekly report generation] using [tools you use]. Research the best approach, point me to relevant documentation, and produce a design with steps, inputs and outputs, and risks. Finish with a recommended plan I can review before building anything.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Generate invoices automatically from a template](./generate-invoices-automatically-from-a-template.md)
