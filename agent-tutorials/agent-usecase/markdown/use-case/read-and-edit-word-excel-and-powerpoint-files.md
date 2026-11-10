---
title: "Read and edit Word, Excel, and PowerPoint files"
slug: "read-and-edit-word-excel-and-powerpoint-files"
summary: "OfficeCLI is an office suite built for agents to read and edit Microsoft Office files. · Jul 6, 2026"
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://github.com/iOfficeAI/OfficeCLI"
fetched_from: "https://agentusecases.ai/use-case/read-and-edit-word-excel-and-powerpoint-files"
---

# Read and edit Word, Excel, and PowerPoint files

> OfficeCLI is an office suite built for agents to read and edit Microsoft Office files. · Jul 6, 2026

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent

## What they did

OfficeCLI is a single binary with no Office install needed. Running its install command adds a skill to detected agents such as Claude Code, Cursor, Windsurf and GitHub Copilot. The agent then uses commands like create, add, set, get and view to build or edit .docx, .xlsx and .pptx files. It can render pages to HTML or PNG to check its own work, and a live browser preview updates after each command.

## How it went

The README shows sample decks, Word documents and spreadsheets that it says agents made with no templates or manual editing. It gives no benchmarks or failure cases.

## Worth knowing

Rendering to PNG screenshots works by piping HTML through a headless browser, so the look-and-fix loop may need one available. The binary also checks for updates in the background by default.

## Prompt

```text
I have an Office file at [file path]. Read it and [task, e.g. update the figures in the Excel sheet, fix the formatting in the Word doc, rework slides 3 to 6 in the PowerPoint]. Save the result as a new copy named [new file name], leave the original untouched, and give me a short list of everything you changed.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Automate recurring work with scheduled Cowork tasks](./automate-recurring-work-with-scheduled-cowork-tasks.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Regrade assignments and update grades in Brightspace](./regrade-assignments-and-update-grades-in-brightspace.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
