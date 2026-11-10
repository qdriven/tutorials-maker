---
title: "Manage an inbox and build courses and budgets with Claude Code"
slug: "manage-an-inbox-and-build-courses-and-budgets-with-claude-co"
summary: "A non-technical user filters their inbox to emails needing replies, turned 15 homeschool PDFs into interactive narrated courses, and built a budget dashboard."
category: "Life Admin & Home"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "michaelcrist.substack.com"
source_date: "Undated"
source_url: "https://michaelcrist.substack.com/p/claude-code"
fetched_from: "https://agentusecases.ai/use-case/manage-an-inbox-and-build-courses-and-budgets-with-claude-co"
---

# Manage an inbox and build courses and budgets with Claude Code

> A non-technical user filters their inbox to emails needing replies, turned 15 homeschool PDFs into interactive narrated courses, and built a budget dashboard.

**Category:** Life Admin & Home  
**Agent:** Claude Code  
**Source:** michaelcrist.substack.com · Undated

## What they did

Michael Crist, a CEO who can't code, ran Claude Code from a project folder on his computer. He connected Gmail through an MCP server and asked it to list only emails from real people awaiting a reply. For the budget, he loaded bank transactions, credit card statements and Amazon order history, then had it build a dashboard. He approved each permission prompt.

## How it went

The inbox scan reduced what felt like a hundred unread messages to about 8 needing replies. He spot-checked the budget numbers and found them right. The article gives few details on the homeschool courses.

## Worth knowing

Back up files before letting it edit, and launch it only from a dedicated folder, because files it reads are sent to Anthropic's servers. A paid plan is required, starting at Claude Pro ($20/month).

## Prompt

```text
I'm not technical, so please explain steps simply. Take the PDFs in [folder path] and turn them into [an interactive study course / a budget dashboard] I can open in my browser, with [features, e.g. quizzes, narration, charts]. You're done when I can open the result by double-clicking a file; ask before deleting or changing my original files.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a personal doorman agent on a $7 VPS](./run-a-personal-doorman-agent-on-a-7-vps.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Place library holds for books you need](./place-library-holds-for-books-you-need.md)
