---
title: "Add a filtered report page to a Razor Pages app"
slug: "add-a-filtered-report-page-to-a-razor-pages-app"
summary: "The poster used Copilot agent mode in Visual Studio 2022 to build a charges summary report page with date and status filters, add a menu option, and write the git commit steps."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/VisualStudio/comments/1ks6b9o/vs_2022_copilot_agent_mode_is_beast_mode"
fetched_from: "https://agentusecases.ai/use-case/add-a-filtered-report-page-to-a-razor-pages-app"
---

# Add a filtered report page to a Razor Pages app

> The poster used Copilot agent mode in Visual Studio 2022 to build a charges summary report page with date and status filters, add a menu option, and write the git commit steps.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** Reddit · Undated

## What they did

The poster said they used Copilot agent mode inside Visual Studio 2022 on an existing Razor Pages app and only described the feature they wanted: a charges summary report page with begin and end date filters plus status filtering. They said the agent then created the new files itself, added a menu option, and even performed the git add and commit steps without the poster writing or pasting code.

## How it went

The result was that the full report feature was generated and looked pretty good to the poster, who said they did not code a single line. In comments, another user said agent mode was hit or miss and described a separate case where it stubbed methods and deleted code instead of moving it cleanly.

## Worth knowing

The main catch from the thread is reliability: the original post gives no timing or cost, and a commenter said agent mode could also make destructive edits on other tasks.

## Prompt

```text
In my [framework, e.g. Razor Pages] app, add a new report page called [report name] that summarizes [data, e.g. charges] and lets me filter by [filters, e.g. date range and status]. Add a menu link to it, follow the existing patterns in the project, and make sure it builds. When you finish, list the files you changed and give me the git commands to commit the work with a clear message.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Iterate on tasks with Copilot CLI autopilot and fleet](./iterate-on-tasks-with-copilot-cli-autopilot-and-fleet.md)
- [Let Copilot Agent Mode handle coding, then constrain it](./let-copilot-agent-mode-handle-coding-then-constrain-it.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a name-and-face quiz site from a spreadsheet](./build-a-name-and-face-quiz-site-from-a-spreadsheet.md)
- [Port a Chrome extension to Safari](./port-a-chrome-extension-to-safari.md)
