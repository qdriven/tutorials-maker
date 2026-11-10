---
title: "Rank 200 resumes into a shortlist with Claude"
slug: "rank-200-resumes-into-a-shortlist-with-claude"
summary: "A friend uploaded 200 resumes to Claude for a ranked shortlist; the top pick bombed the first call because it ranked writing quality, not job readiness."
category: "Work & Operations"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Jun 1, 2026"
source_url: "https://www.reddit.com/r/AIQuality/comments/1tyfkep/my_friend_used_claude_to_rank_200_resumes_the_top"
fetched_from: "https://agentusecases.ai/use-case/rank-200-resumes-into-a-shortlist-with-claude"
---

# Rank 200 resumes into a shortlist with Claude

> A friend uploaded 200 resumes to Claude for a ranked shortlist; the top pick bombed the first call because it ranked writing quality, not job readiness.

**Category:** Work & Operations  
**Agent:** Claude  
**Source:** Reddit · Jun 1, 2026

## What they did

A solo recruiter at a small startup received more than 200 applications for one role and, short on time, uploaded the resumes into Claude to generate a ranked shortlist. She took Claude’s top-ranked candidate into a first-round call, but the post says he could not explain much of what was on his resume; commenters mainly argue this reflected a weak prompt and overreliance on the model.

## How it went

The immediate result was a bad top pick: the #1 candidate looked strong on paper but failed the first screening call. The post’s broader claim is that a general-purpose LLM favored polished, keyword-heavy writing over real job readiness, though it gives no measured shortlist stats beyond that anecdote.

## Worth knowing

The source’s clearest catch is process risk: the recruiter used Claude because manually reviewing 200 resumes felt too slow, but the thread repeatedly flags privacy, audit, and prompting issues.

## Prompt

```text
I'm uploading [number] resumes for a [job title] role. Rank them for job readiness, not writing polish, using these criteria: [must-have skills, years of experience, relevant achievements]. Give me a top [number] shortlist with evidence from each resume and flag where you're unsure. Then suggest three screening questions to test the top candidates, since the ranking shouldn't be the final call.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Generate invoices automatically from a template](./generate-invoices-automatically-from-a-template.md)
