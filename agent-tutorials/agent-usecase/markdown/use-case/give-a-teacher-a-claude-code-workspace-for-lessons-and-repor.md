---
title: "Give a teacher a Claude Code workspace for lessons and reports"
slug: "give-a-teacher-a-claude-code-workspace-for-lessons-and-repor"
summary: "Built a Claude Code workspace for a teacher that remembers curriculum, grading style and class size to produce lesson plans, report comments, parent emails and rubrics."
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Apr 5, 2026"
source_url: "https://www.reddit.com/r/ClaudeCode/comments/1s5m6a2/built_this_for_teachers"
fetched_from: "https://agentusecases.ai/use-case/give-a-teacher-a-claude-code-workspace-for-lessons-and-repor"
---

# Give a teacher a Claude Code workspace for lessons and reports

> Built a Claude Code workspace for a teacher that remembers curriculum, grading style and class size to produce lesson plans, report comments, parent emails and rubrics.

**Category:** Work & Operations  
**Agent:** Claude Code  
**Source:** Reddit · Apr 5, 2026

## What they did

The poster built a reusable Claude Code workspace for teachers and preloaded it with each teacher’s curriculum, grading style, class size, and teaching preferences. In use, the teacher gives Claude their scheme of work and academic calendar, then asks for outputs like lesson plans, report comments, parent emails, and rubrics shaped to that stored context.

## How it went

The post says it now produces those common teaching materials in the teacher’s preferred style, aiming to cut prep and admin work. The thread excerpt does not give hard results, usage numbers, or measured time savings.

## Worth knowing

The main catch is setup: it depends on feeding Claude the teacher’s curriculum documents, calendar, and preferred lesson flow first.

## Prompt

```text
Set up a workspace folder for me, a [grade/subject] teacher. Create a notes file recording my curriculum ([standards or unit list]), my grading style ([describe tone and strictness]) and my class size ([number]), and read it at the start of every session. Then use it to draft a lesson plan for [topic], a rubric for [assignment], and a parent email about [situation], saving each as its own file. You're done when all three files exist and the notes file is ready for future requests.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Write end-of-sprint changelogs from completed tickets](./write-end-of-sprint-changelogs-from-completed-tickets.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
