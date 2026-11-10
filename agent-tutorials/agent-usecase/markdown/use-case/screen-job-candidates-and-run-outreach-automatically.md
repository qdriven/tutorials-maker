---
title: "Screen job candidates and run outreach automatically"
slug: "screen-job-candidates-and-run-outreach-automatically"
summary: "A Make scenario parses resumes with AI, scores candidates, updates the ATS, emails acknowledgments, sends shortlists to recruiters in Slack and auto-declines non-responders; vendor how-to."
category: "Work & Operations"
agents:
  - name: "Make"
    slug: "make"
source_platform: "4spotconsulting.com"
source_date: "Undated"
source_url: "https://4spotconsulting.com/automate-recruitment-your-step-by-step-guide-to-ai-screening-outreach/"
fetched_from: "https://agentusecases.ai/use-case/screen-job-candidates-and-run-outreach-automatically"
---

# Screen job candidates and run outreach automatically

> A Make scenario parses resumes with AI, scores candidates, updates the ATS, emails acknowledgments, sends shortlists to recruiters in Slack and auto-declines non-responders; vendor how-to.

**Category:** Work & Operations  
**Agent:** Make  
**Source:** 4spotconsulting.com · Undated

## What they did

A Make.com scenario fires on a new-application webhook from the ATS or career page. It sends the resume URL to an AI parsing API, calculates a weighted rubric score, writes it back to the ATS and emails the candidate an acknowledgment. Candidates above the threshold go to the recruiter in Slack with approve/reject buttons. Calendly scheduling, feedback reminders and automatic declines of unresponsive candidates follow.

## How it went

The source gives no measured results. It says scoring and write-back happen within minutes of submission, and recruiters get a pre-scored queue instead of an unsorted inbox.

## Worth knowing

If your ATS has no webhooks, poll its API every 15 minutes, which adds up to 15 minutes of lag. If it has no API, parse its notification emails instead.

## Prompt

```text
Build a Make scenario that watches [email inbox or ATS] for new resumes for [job title]. Parse each resume with AI, score it against these criteria: [must-have skills and experience], and log the name, score, and a one-line rationale in [ATS or Google Sheet]. Post the top-scoring candidates to [Slack channel] for the recruiter. Before any acknowledgment or decline emails go out, pause and show me the drafts and the list of recipients for approval.
```

## Related use cases

- [Manage email, calendar and tasks from Slack](./manage-email-calendar-and-tasks-from-slack.md)
- [Summarize a YouTuber's latest video into a Google Doc daily](./summarize-a-youtuber-s-latest-video-into-a-google-doc-daily.md)
- [Research, score and draft outreach for leads](./research-score-and-draft-outreach-for-leads.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Draft follow-up emails automatically when no reply arrives](./draft-follow-up-emails-automatically-when-no-reply-arrives.md)
