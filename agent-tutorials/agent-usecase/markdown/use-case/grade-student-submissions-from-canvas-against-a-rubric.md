---
title: "Grade student submissions from Canvas against a rubric"
slug: "grade-student-submissions-from-canvas-against-a-rubric"
summary: "An instructor's pipeline pulls student files from Canvas, has Claude score each per criterion with comments, and posts grades back after human review."
category: "Work & Operations"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "vitraag.com"
source_date: "Mar 12, 2026"
source_url: "https://www.vitraag.com/2026/03/12/ai-assisted-grading-canvas-api-claude/"
fetched_from: "https://agentusecases.ai/use-case/grade-student-submissions-from-canvas-against-a-rubric"
---

# Grade student submissions from Canvas against a rubric

> An instructor's pipeline pulls student files from Canvas, has Claude score each per criterion with comments, and posts grades back after human review.

**Category:** Work & Operations  
**Agent:** Claude  
**Source:** vitraag.com · Mar 12, 2026

## What they did

Vaibhav Bhandari, who teaches a hacking course, used a personal Canvas API token to download submissions. For each one, a script extracts text, or renders scanned PDFs as images. It sends that and a YAML rubric to Claude, which returns per-criterion scores, a first-person comment and a flag. He reviews a CSV, then confirms the upload to Canvas.

## How it went

On Lab 5, 13 of 22 submissions were flagged, mostly for suspected AI-generated content or thin evidence. Scoring was consistent but not calibrated to his own grading. He still read every capstone submission and heard every presentation.

## Worth knowing

Add examples of what a 90 looks like in the rubric's extra instructions, since scores weren't calibrated to his grading. Responses aren't cached, so re-runs call the API again.

## Prompt

```text
Read the student submissions in [folder path of downloaded Canvas files] and grade each against the rubric in [rubric file]. For every student, write a score and a short comment per criterion into a single spreadsheet at [output file], and flag any submission you're unsure about. Do not post anything back to Canvas; stop once the spreadsheet is complete so I can review it first.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Generate invoices automatically from a template](./generate-invoices-automatically-from-a-template.md)
