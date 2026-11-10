---
title: "Revise courses from student evaluation feedback"
slug: "revise-courses-from-student-evaluation-feedback"
summary: "A professor had Claude Code summarize course-evaluation PDFs, filed themes as GitHub issues, and used agents to revise his security course and two others."
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "practicespace.substack.com"
source_date: "Undated"
source_url: "https://practicespace.substack.com/p/using-claude-code-to-modernize-my"
fetched_from: "https://agentusecases.ai/use-case/revise-courses-from-student-evaluation-feedback"
---

# Revise courses from student evaluation feedback

> A professor had Claude Code summarize course-evaluation PDFs, filed themes as GitHub issues, and used agents to revise his security course and two others.

**Category:** Work & Operations  
**Agent:** Claude Code  
**Source:** practicespace.substack.com · Undated

## What they did

Nick Feamster gave Claude Code a course-evaluation PDF, had it summarize the themes, and filed them as a GitHub issue checklist. Agents then rebuilt assignments with rubrics, standardized exam rules, and converted about two dozen slide decks to Quarto, one agent per deck, about six at a time. He approved a hand-built reference deck first. He then wrote playbook issues so fresh sessions could repeat this in two other courses.

## How it went

The security course got rubrics, a syllabus communication section, consistent exam rules and rebuilt slides. The same approach was repeated in the ML systems and censorship courses. An agent also found and reconstructed a past final with empty source files.

## Worth knowing

He reviewed diffs, required confirmation before any commit or push, and approved the reference deck before the fan-out. Web-sourced claims were verified rather than trusted.

## Prompt

```text
Read the course evaluation PDFs in [folder] for [course name] and summarize the recurring themes in student feedback, grouped as praise, complaints, and concrete suggestions. Then propose specific revisions to my course materials in [folder or repo], and make them on a new branch so I can review the diff. Keep any student-identifying details out of the summaries, and show me the plan before changing files.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Write end-of-sprint changelogs from completed tickets](./write-end-of-sprint-changelogs-from-completed-tickets.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
