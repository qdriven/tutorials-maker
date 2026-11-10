---
title: "Test AI annotations on student problem sets"
slug: "test-ai-annotations-on-student-problem-sets"
summary: "A chemistry professor ran 11 students' problem sets through Claude to see if its annotations could help manual grading; the project was accidentally left public, exposing student information."
category: "Work & Operations"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "thedartmouth.com"
source_date: "May 1, 2026"
source_url: "https://www.thedartmouth.com/article/2026/05/klee-claude-prof"
fetched_from: "https://agentusecases.ai/use-case/test-ai-annotations-on-student-problem-sets"
---

# Test AI annotations on student problem sets

> A chemistry professor ran 11 students' problem sets through Claude to see if its annotations could help manual grading; the project was accidentally left public, exposing student information.

**Category:** Work & Operations  
**Agent:** Claude  
**Source:** thedartmouth.com · May 1, 2026

## What they did

Chemistry professor Paul Robustelli made a project called "PS3 Grading" in Dartmouth's Claude enterprise portal. He uploaded 11 students' problem sets from his CHEM 76 class and ran them through Claude. He wanted to see whether its annotations could later serve as a reference for his manual grading. He says Claude had no role in any grade.

## How it went

The project was visible to everyone in the Dartmouth Claude group, with students' names and work exposed. It came down May 2 after The Dartmouth asked for comment. The source reports no results on annotation quality.

## Worth knowing

New projects default to private. Sharing happens only if you pick the organization-wide visibility option, and Robustelli says he thought the project was private, so check the setting before uploading student work.

## Prompt

```text
Take the student problem sets in [folder] after I remove names and IDs from them. For each one, annotate where the work goes wrong against [solution key or rubric] and write a short comment I could use while grading by hand. Save the annotations in a local folder [output path] and stop when every file is done. Keep everything private, don't upload it anywhere, and pause and ask me before any step that shares or publishes files.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Generate invoices automatically from a template](./generate-invoices-automatically-from-a-template.md)
