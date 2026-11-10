---
title: "Sort 400 PDFs into folders"
slug: "sort-400-pdfs-into-folders"
summary: "A user had Claude Cowork read 400 PDF files and sort them into different folders."
category: "Work & Operations"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
source_platform: "Reddit"
source_date: "Jul 1, 2026"
source_url: "https://www.reddit.com/r/claude/comments/1ur3x8a/when_or_what_to_use_cowork_for"
fetched_from: "https://agentusecases.ai/use-case/sort-400-pdfs-into-folders"
---

# Sort 400 PDFs into folders

> A user had Claude Cowork read 400 PDF files and sort them into different folders.

**Category:** Work & Operations  
**Agent:** Claude Cowork  
**Source:** Reddit · Jul 1, 2026

## What they did

The user put all the PDFs in one local folder, selected that folder in Claude Cowork, and gave a plain-language instruction saying how many files were there, what text to look for, and which matching files should be moved into one or more subfolders. They said Cowork handled text-based PDFs, could also group related PDFs for merging, and after sorting they could ask it to generate an XLSX index showing what went where.

## How it went

They reported Cowork sorted 400 PDFs without trouble; in the more detailed follow-up they described the same workflow on 382 files. The source gives no measured accuracy, speed, or examples of mistakes, only that it worked for text rather than image content.

## Worth knowing

Their main tip was to be very explicit in the prompt, like briefing a smart new coworker; they only made a reusable skill if it was something they wanted to repeat.

## Prompt

```text
Read the PDFs in [folder path] and sort them into subfolders by [criteria, e.g. client, document type, or year]. First show me the proposed folder names and a sample of how files would be assigned, and wait for my OK. Then move the files, never delete anything, and finish with a list of any files you couldn't classify.
```

## Related use cases

- [Summarize email and prep briefings from your phone](./summarize-email-and-prep-briefings-from-your-phone.md)
- [Turn trip receipts into an expense report and triage files](./turn-trip-receipts-into-an-expense-report-and-triage-files.md)
- [Monitor tech subreddits and competitors, draft emails and articles](./monitor-tech-subreddits-and-competitors-draft-emails-and-art.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
