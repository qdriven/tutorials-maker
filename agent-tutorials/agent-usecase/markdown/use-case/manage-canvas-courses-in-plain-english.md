---
title: "Manage Canvas courses in plain English"
slug: "manage-canvas-courses-in-plain-english"
summary: "The author built a Canvas LMS tool with Claude Code that lets educators list courses, find missing submissions, monitor forums, schedule announcements and export the gradebook."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "chatwithgpt.substack.com"
source_date: "Undated"
source_url: "https://chatwithgpt.substack.com/p/when-claude-code-becomes-your-codeveloper"
fetched_from: "https://agentusecases.ai/use-case/manage-canvas-courses-in-plain-english"
---

# Manage Canvas courses in plain English

> The author built a Canvas LMS tool with Claude Code that lets educators list courses, find missing submissions, monitor forums, schedule announcements and export the gradebook.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** chatwithgpt.substack.com · Undated

## What they did

A non-developer educator used Claude Code over four months to build an MCP server in Python on FastMCP, starting from a 200-line proof of concept that listed courses. It grew into modular tools covering assignments, discussions, announcements and gradebook export, with API tokens kept in environment variables. Claude Code did the refactoring and API handling. A colleague contributed group-management features.

## How it went

The author says a 45-minute weekly check of submissions and participation became a 2-minute conversation. The codebase reached about 3,000 lines. Source-level anonymization of student data was added later; early screenshots predate it.

## Worth knowing

Setup is said to take about 15 minutes, but you need Canvas API permissions. Start with simple queries like listing courses before trying analytics.

## Prompt

```text
Build me a small tool that connects to [LMS, e.g. Canvas] using my API token stored in [environment variable] so I can manage my courses in plain English. It should be able to list my courses, find students with missing submissions in [course], and export the gradebook to CSV. Test it with read-only actions first, and before it schedules or posts any announcement, show me the text and ask for my confirmation.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
