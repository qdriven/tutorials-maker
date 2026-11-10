---
title: "Run GTD task management through Claude with Todoist"
slug: "run-gtd-task-management-through-claude-with-todoist"
summary: "A commenter gave Claude control of Todoist plus email, calendar, messages, contacts and files, so it creates tasks automatically when it spots commitments."
category: "Life Admin & Home"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/todoist/comments/1x73un7/anyone_actually_using_ai_to_manage_their_tasks"
fetched_from: "https://agentusecases.ai/use-case/run-gtd-task-management-through-claude-with-todoist"
---

# Run GTD task management through Claude with Todoist

> A commenter gave Claude control of Todoist plus email, calendar, messages, contacts and files, so it creates tasks automatically when it spots commitments.

**Category:** Life Admin & Home  
**Agent:** Claude  
**Source:** Reddit · Undated

## What they did

The commenter gave Claude Code direct access to Todoist plus email, calendar, messages, YNAB, contacts, Obsidian, and Dropbox, along with a version-controlled memory made of interlinked Markdown files for people, projects, and relationships. Claude watches those sources for commitments, creates Todoist tasks and scheduled ticklers, suggests the right project and sometimes a date, then the user reviews new tasks during a daily or weekly brief and keeps tuning the system from failures.

## How it went

About a month in, the commenter said it had already found $3,000 and helped avoid multiple mishaps. They said the weekly review was the biggest win and that task suggestions were usually right, though they were still improving its memory and understanding.

## Worth knowing

The main catch was setup and tuning: the system depended on rich human-readable Markdown memory that Claude maintained with feedback, not just raw access to Todoist and inboxes.

## Prompt

```text
Act as my GTD assistant using my Todoist, email, calendar, and messages. Scan my [last 7 days] of email and messages for commitments I made or requests I received, and draft a list of tasks with due dates and projects for each. Show me the list first and wait for my approval before creating anything in Todoist, then confirm what was added.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Manage calendar and tasks by text with an assistant](./manage-calendar-and-tasks-by-text-with-an-assistant.md)
- [Maintain a home media library and handle personal projects](./maintain-a-home-media-library-and-handle-personal-projects.md)
