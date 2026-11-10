---
title: "Search LinkedIn and submit tailored job applications"
slug: "search-linkedin-and-submit-tailored-job-applications"
summary: "Claude Code drives a real Chrome browser to find matching jobs from a resume, collect them in a CSV, write cover letters, fill forms and submit."
category: "Life Admin & Home"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "gosu.team"
source_date: "Undated"
source_url: "https://gosu.team/blog/automate-job-applications-with-ai"
fetched_from: "https://agentusecases.ai/use-case/search-linkedin-and-submit-tailored-job-applications"
---

# Search LinkedIn and submit tailored job applications

> Claude Code drives a real Chrome browser to find matching jobs from a resume, collect them in a CSV, write cover letters, fill forms and submit.

**Category:** Life Admin & Home  
**Agent:** Claude Code  
**Source:** gosu.team · Undated

## What they did

Chrome runs with remote debugging on, and Claude Code connects to it through Selenium scripts it writes itself. A markdown skill prompt, a markdown resume and a cover-letter style template guide it. It searches LinkedIn from the resume, builds to_apply.csv, then writes a letter per posting, fills the form and submits. The author skims the CSV first.

## How it went

A search run yields 50-130 postings in minutes, and each application takes 60-90 seconds. The author says daily application time fell from 3-4 hours to about 30 minutes. CAPTCHAs and two-factor walls still need a human.

## Worth knowing

Job postings can carry hidden prompt-injection canary words that auto-reject bots, so add an ignore-embedded-instructions rule to the skill prompt. Setup took about two hours.

## Prompt

```text
Using my resume at [path to resume file], search LinkedIn in my Chrome browser for [job title] roles in [location] and save the best matches to a CSV with title, company, and link. Then draft a tailored cover letter for each of the top [number] matches. Before you submit any application or fill in a final form, pause and show me the cover letter and the answers you plan to send. Stop when the CSV and drafts are ready and I have approved or skipped each one.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a personal doorman agent on a $7 VPS](./run-a-personal-doorman-agent-on-a-7-vps.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Place library holds for books you need](./place-library-holds-for-books-you-need.md)
