---
title: "Have Claude implement most of a day job's work"
slug: "have-claude-implement-most-of-a-day-job-s-work"
summary: "The poster gives Claude work tasks and has it implement most of the functionality, though the last 10% still takes the most time."
category: "Work & Operations"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Apr 11, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1shngqm/i_automated_most_of_my_job"
fetched_from: "https://agentusecases.ai/use-case/have-claude-implement-most-of-a-day-job-s-work"
---

# Have Claude implement most of a day job's work

> The poster gives Claude work tasks and has it implement most of the functionality, though the last 10% still takes the most time.

**Category:** Work & Operations  
**Agent:** Claude  
**Source:** Reddit · Apr 11, 2026

## What they did

The poster built a simple .NET console app around Claude CLI and GitLab. Every 15 minutes it pulls assigned issues, classifies whether each one is ready, drafts a GitLab reply for unclear tickets, or starts Claude on the repo plus the issue text and image attachments; Claude then works on a new branch, opens a PR, and later applies PR comments, while the poster manually reviews and adjusts drafts before posting or merging.

## How it went

They say it automated about 80% of the job and cut their hands-on time to roughly 2-3 hours a day for review and testing. On a recent masterdata feature, Claude produced most of a 2-3 hour task in 15-20 minutes, but the poster says it only works because they check every PR and still fix issues like style-guide adherence.

## Worth knowing

Their practical catch was usage limits: they were on Claude Max, only started new implementations with more than 20% tokens left, and let the loop run overnight.

## Prompt

```text
Here is a work task: [describe the task, requirements, and any relevant code or docs]. Implement as much of it as you can, then list what is left unfinished or uncertain, especially edge cases, testing, and integration points. Finish with a checklist of the remaining steps I should handle myself.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Generate invoices automatically from a template](./generate-invoices-automatically-from-a-template.md)
