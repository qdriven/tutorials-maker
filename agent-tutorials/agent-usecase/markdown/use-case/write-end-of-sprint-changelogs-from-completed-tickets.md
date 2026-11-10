---
title: "Write end-of-sprint changelogs from completed tickets"
slug: "write-end-of-sprint-changelogs-from-completed-tickets"
summary: "A PM has Claude Cowork read completed Linear tickets, pick what matters, draft the update and suggest email or in-app format, replacing about an hour per sprint."
category: "Work & Operations"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
source_platform: "Reddit"
source_date: "Apr 5, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1rvw4jg/cowork_replaced_an_hour_of_my_most_hated_pm_task"
fetched_from: "https://agentusecases.ai/use-case/write-end-of-sprint-changelogs-from-completed-tickets"
---

# Write end-of-sprint changelogs from completed tickets

> A PM has Claude Cowork read completed Linear tickets, pick what matters, draft the update and suggest email or in-app format, replacing about an hour per sprint.

**Category:** Work & Operations  
**Agent:** Claude Cowork  
**Source:** Reddit · Apr 5, 2026

## What they did

The PM set up a recurring Claude Cowork task that runs every two weeks. Through MCP connections, Claude reads completed Linear issues, decides which ones are user-facing, drafts changelog copy from ticket descriptions and comments, publishes it, and then chooses whether the release also merits an email and in-app notification; the PM says they usually just review and send it.

## How it went

It replaced about an hour of manual work each sprint, and the PM says the writing is better because Claude includes details they used to skip. They still review it before shipping, but say that happens 90% of the time rather than writing it themselves.

## Worth knowing

The key catch is the MCP setup: Claude needed one connection to Linear and another to the publishing destination, plus rules for when bigger updates should trigger email and in-app announcements.

## Prompt

```text
Read the tickets completed in [Linear project or team] during [sprint dates]. Pick the changes customers would care about, skip internal chores, and draft a changelog in plain language. Finished means one draft in [email or in-app] format plus a short note on why you left certain tickets out. Show me the draft before sending or posting anything.
```

## Related use cases

- [Summarize email and prep briefings from your phone](./summarize-email-and-prep-briefings-from-your-phone.md)
- [Turn trip receipts into an expense report and triage files](./turn-trip-receipts-into-an-expense-report-and-triage-files.md)
- [Fill out job applications in a browser](./fill-out-job-applications-in-a-browser.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
