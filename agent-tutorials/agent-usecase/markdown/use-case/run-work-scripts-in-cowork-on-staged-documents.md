---
title: "Run work scripts in Cowork on staged documents"
slug: "run-work-scripts-in-cowork-on-staged-documents"
summary: "A user runs Claude Cowork on a headless machine, staging cloned documents so it can run the scripts and programs needed for work."
category: "Work & Operations"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
source_platform: "Reddit"
source_date: "Oct 3, 2026"
source_url: "https://www.reddit.com/r/claude/comments/1wtlbfj/claude_cowork_will_no_longer_work_locally"
fetched_from: "https://agentusecases.ai/use-case/run-work-scripts-in-cowork-on-staged-documents"
---

# Run work scripts in Cowork on staged documents

> A user runs Claude Cowork on a headless machine, staging cloned documents so it can run the scripts and programs needed for work.

**Category:** Work & Operations  
**Agent:** Claude Cowork  
**Source:** Reddit · Oct 3, 2026

## What they did

A commenter says they use Cowork with a headless machine dedicated to Claude, then let it run the work scripts and programs they need by cloning the documents into Cowork’s cloud session and staging them there. They describe steering that setup remotely from their phone, rather than keeping Claude running directly on the machine.

## How it went

They say the setup has been seamless for extensive use and that they do not notice a meaningful difference from local mode. The thread gives no metrics or concrete failures for this specific workflow.

## Worth knowing

The main catch is that this depends on a separate headless Claude-only machine, with the actual documents cloned into the cloud session context.

## Prompt

```text
In the folder [path to staged copies of my documents], run the script [script name or command] on each file and save the outputs in a new folder called [output folder]. Work only on these copies, and never touch the originals. When you finish, give me a list of the files processed, anything that failed, and why. Ask me before deleting or overwriting any file.
```

## Related use cases

- [Summarize email and prep briefings from your phone](./summarize-email-and-prep-briefings-from-your-phone.md)
- [Turn trip receipts into an expense report and triage files](./turn-trip-receipts-into-an-expense-report-and-triage-files.md)
- [Monitor tech subreddits and competitors, draft emails and articles](./monitor-tech-subreddits-and-competitors-draft-emails-and-art.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
