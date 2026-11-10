---
title: "Manage files in a chosen folder with an agent"
slug: "manage-files-in-a-chosen-folder-with-an-agent"
summary: "The author built an open-source desktop agent that works inside a chosen folder, reading and writing files and asking before changing anything."
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Oct 3, 2026"
source_url: "https://www.reddit.com/r/ClaudeCowork/comments/1wuqa6c/i_built_an_open-source_cowork-style_folder_agent"
fetched_from: "https://agentusecases.ai/use-case/manage-files-in-a-chosen-folder-with-an-agent"
---

# Manage files in a chosen folder with an agent

> The author built an open-source desktop agent that works inside a chosen folder, reading and writing files and asking before changing anything.

**Category:** Work & Operations  
**Agent:** Claude Code  
**Source:** Reddit · Oct 3, 2026

## What they did

The author built a desktop agent that operates only inside a folder the user chooses. It can read existing files, write new ones, and asks for approval before every change; shell commands are disabled by default and only run if the user turns them on. They say it began as a way to study how Claude Code works, and about half the app’s commits were written with Claude Code.

## How it went

The result is an open-source alternative with no account or telemetry, support for Claude, OpenAI, Google, and local models, and an option to keep files on-disk with local inference. It still has notable gaps: text files only, no Windows sandbox, unsigned builds, and nothing runs when the app is closed.

## Worth knowing

The main catch is safety and scope: it asks before every file change, but sandboxing is incomplete and the app only works on text files while open.

## Prompt

```text
Work only inside the folder [path to folder]. Read through the files, then [organize, rename, or summarize them, e.g. sort by project and rename with a consistent date format]. Before changing, moving, or deleting any file, show me the exact list of changes and wait for my OK. When done, give me a summary of what changed and how to undo it.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Write end-of-sprint changelogs from completed tickets](./write-end-of-sprint-changelogs-from-completed-tickets.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
