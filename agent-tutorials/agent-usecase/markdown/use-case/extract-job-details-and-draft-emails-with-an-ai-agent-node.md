---
title: "Extract job details and draft emails with an AI agent node"
slug: "extract-job-details-and-draft-emails-with-an-ai-agent-node"
summary: "An n8n AI Agent node extracts fields like receiver email, job title, duration and paid status, and drafts the email."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Oct 6, 2026"
source_url: "https://www.reddit.com/r/n8nforbeginners/comments/1wo236v/my_first_n8n_workflow_was_a_drinking_reminder"
fetched_from: "https://agentusecases.ai/use-case/extract-job-details-and-draft-emails-with-an-ai-agent-node"
---

# Extract job details and draft emails with an AI agent node

> An n8n AI Agent node extracts fields like receiver email, job title, duration and paid status, and drafts the email.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** Reddit · Oct 6, 2026

## What they did

In a job-hunt automation, the poster had n8n send applications with a CV attached when a job opening was posted. They said they used an AI Agent node to pull out receiver_email, job_title, duration, and is_paid, and to draft the email, while they built the workflow logic themselves and set up Google credentials for Gmail, Sheets, and Drive.

## How it went

The source only says it worked as a first workflow and taught them how to handle Google service credentials and use Telegram as a free trigger for a production workflow. It gives no response-rate, accuracy, or hiring results.

## Worth knowing

The main catch they called out was credential setup: Google APIs for Gmail, Sheets, and Drive each had to be configured correctly.

## Prompt

```text
Create a workflow with an AI Agent node that reads incoming [text or email] about a job and extracts the receiver email, job title, duration, and paid status as structured fields. Then have it draft a reply email using those fields in [tone]. Save the draft without sending it, and show me the output for [number] sample inputs.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Publish AI-written blog posts from trending news to WordPress](./publish-ai-written-blog-posts-from-trending-news-to-wordpres.md)
- [Write and send AI newsletters automatically](./write-and-send-ai-newsletters-automatically.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Triage email by voice while walking](./triage-email-by-voice-while-walking.md)
- [Delegate tab-juggling work to ChatGPT Agent's virtual computer](./delegate-tab-juggling-work-to-chatgpt-agent-s-virtual-comput.md)
