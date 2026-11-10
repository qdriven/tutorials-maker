---
title: "Split and log handwritten homework scans for teachers"
slug: "split-and-log-handwritten-homework-scans-for-teachers"
summary: "A Claude Code skill reads handwritten names on batched scans, matches them to a roster, splits PDFs per student, updates the completion spreadsheet and flags missing work."
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "mcpmarket.com"
source_date: "Undated"
source_url: "https://mcpmarket.com/tools/skills/homework-grading-workflow"
fetched_from: "https://agentusecases.ai/use-case/split-and-log-handwritten-homework-scans-for-teachers"
---

# Split and log handwritten homework scans for teachers

> A Claude Code skill reads handwritten names on batched scans, matches them to a roster, splits PDFs per student, updates the completion spreadsheet and flags missing work.

**Category:** Work & Operations  
**Agent:** Claude Code  
**Source:** mcpmarket.com · Undated

## What they did

The skill takes a batched PDF of scanned homework and uses vision to read the handwritten name on each page. It fuzzy-matches those names to the student roster, so spelling variations still match. It then splits the PDF into one file per student and updates the Excel completion spreadsheet. For batches over 99 pages it can resume a session. It requires a manual verification step.

## How it went

The listing gives no measured results or timings. It says the manual verification step is meant to make student attribution fully accurate, and it describes missing-assignment identification across large rosters as a use case.

## Worth knowing

Expect to check the name matches by hand, because the skill requires manual verification. Batches over 99 pages need its session-resume feature.

## Prompt

```text
Create a reusable skill that processes batches of scanned handwritten homework PDFs in [folder path]. It should read the handwritten student name on each page, match it against the roster in [roster file], split the scans into one PDF per student, and update [completion spreadsheet] to mark who turned the work in. Finish with a list of students with missing work and any names you couldn't match confidently. Show me the planned splits and spreadsheet changes before writing anything, and never delete the original scans.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Write end-of-sprint changelogs from completed tickets](./write-end-of-sprint-changelogs-from-completed-tickets.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
