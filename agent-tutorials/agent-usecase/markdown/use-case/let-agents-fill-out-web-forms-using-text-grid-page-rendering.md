---
title: "Let agents fill out web forms using text-grid page rendering"
slug: "let-agents-fill-out-web-forms-using-text-grid-page-rendering"
summary: "Author built TextWeb, a text-grid browser so LLM agents can fill out job applications without costly vision models."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Feb 19, 2026"
source_url: "https://news.ycombinator.com/item?id=47073885"
fetched_from: "https://agentusecases.ai/use-case/let-agents-fill-out-web-forms-using-text-grid-page-rendering"
---

# Let agents fill out web forms using text-grid page rendering

> Author built TextWeb, a text-grid browser so LLM agents can fill out job applications without costly vision models.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Feb 19, 2026

## What they did

The author built TextWeb, which loads a page in headless Chromium and pulls out each visible element's position, text, and whether it's interactive. It maps these onto a character grid that keeps the on-screen layout. Interactive elements get numbers, so an agent issues commands like click 3 or type 7 followed by text. Any LLM can read it.

## How it went

Each page comes out as roughly 2-5KB of text instead of a roughly 1MB screenshot, so no vision model is needed. The post gives no results from actual job applications and asks for feedback on the grid format.

## Worth knowing

It installs with npm install -g textweb and plugs in through an MCP server, function-calling definitions, LangChain, CrewAI, an HTTP API, a CLI, or a Node.js library.

## Prompt

```text
Write a small tool that renders a web page as a text grid, listing each form field, button, and link with a reference number, so an LLM agent can fill out forms without screenshots. Test it on [job application or form URL] using placeholder data and show me the filled fields. Never submit the form.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Automate recurring work with scheduled Cowork tasks](./automate-recurring-work-with-scheduled-cowork-tasks.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Regrade assignments and update grades in Brightspace](./regrade-assignments-and-update-grades-in-brightspace.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
