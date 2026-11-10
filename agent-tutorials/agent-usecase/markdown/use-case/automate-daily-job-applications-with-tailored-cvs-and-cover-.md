---
title: "Automate daily job applications with tailored CVs and cover letters"
slug: "automate-daily-job-applications-with-tailored-cvs-and-cover-"
summary: "An n8n pipeline runs daily to search for jobs, adapt a CV and cover letter with AI, and send applications by email."
category: "Life Admin & Home"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/n8n/comments/1r95t1k/i_built_a_fully_automated_job_application"
fetched_from: "https://agentusecases.ai/use-case/automate-daily-job-applications-with-tailored-cvs-and-cover-"
---

# Automate daily job applications with tailored CVs and cover letters

> An n8n pipeline runs daily to search for jobs, adapt a CV and cover letter with AI, and send applications by email.

**Category:** Life Admin & Home  
**Agent:** n8n  
**Source:** Reddit · Undated

## What they did

The n8n workflow runs on a daily schedule, reads the applicant’s profile from sources like LinkedIn and a portfolio via Jina AI, generates job-search queries, pulls listings from an API, removes duplicates through Google Sheets, and has AI rank the best matches. For each selected role it drafts a tailored cover letter and, in the author’s setup, can edit a YAML CV in GitHub, trigger a GitHub Action to compile a PDF, then email the application pack; the human reviews the emailed package and applies through the job link.

## How it went

The author says it handles the pipeline end to end in about 51 nodes, but not full submission: in practice the email goes to the author, who then applies manually because automating portal submissions without an API is described as nearly impossible. No interview or offer results are given.

## Worth knowing

The author says building it took about two hours using their n8n-as-code helper, and the CV-editing GitHub subflow is optional and removable if you just attach a static PDF.

## Prompt

```text
Build me a workflow that runs every day at [time], searches [job boards or sites] for [job title] roles in [location], and picks postings that match my CV at [link to CV file]. For each match, have the AI tailor my CV and write a cover letter, then prepare an application email to the contact in the posting. Don't send any email automatically; first post each draft with the job link to [Slack channel or my email] for my approval. The workflow is finished when one test run produces reviewed drafts for at least [number] jobs.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Control your Mac by voice with a Claude-backed assistant](./control-your-mac-by-voice-with-a-claude-backed-assistant.md)
