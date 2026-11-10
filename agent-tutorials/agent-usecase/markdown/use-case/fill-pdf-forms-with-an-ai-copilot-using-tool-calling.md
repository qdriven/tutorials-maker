---
title: "Fill PDF forms with an AI copilot using tool calling"
slug: "fill-pdf-forms-with-an-ai-copilot-using-tool-calling"
summary: "An in-browser copilot fills PDF form fields from data sources or user input, helps with foreign-language forms, and explains contract clauses before signing."
category: "Life Admin & Home"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "May 3, 2026"
source_url: "https://news.ycombinator.com/item?id=47995318"
fetched_from: "https://agentusecases.ai/use-case/fill-pdf-forms-with-an-ai-copilot-using-tool-calling"
---

# Fill PDF forms with an AI copilot using tool calling

> An in-browser copilot fills PDF form fields from data sources or user input, helps with foreign-language forms, and explains contract clauses before signing.

**Category:** Life Admin & Home  
**Agent:** custom-built or unnamed agent  
**Source:** HN · May 3, 2026

## What they did

The copilot runs inside a browser-based PDF editor and uses LLM tool calling to fill form fields. It can draw values from existing data sources such as a CRM or EHR through MCP/RAG, or from what the user types. Each change appears live in the editor, and the user can correct any field with one click. The LLM is bring-your-own, local or hosted.

## How it went

The source gives no metrics. The author says a commenter found a bug where mangled form labels sent to the LLM put values in wrong fields, and that it is now fixed.

## Worth knowing

Check that the form labels passed to the LLM are clean; mangled labels caused values to land in the wrong fields.

## Prompt

```text
Help me fill out the PDF form at [URL or file] using the details I give you: [name, address, other info]. If the form is in [language], translate each field for me, and flag any contract clause I should understand before signing. Pause and show me every filled field before I sign or submit anything.
```

## Related use cases

- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Manage an inbox and build courses and budgets with Claude Code](./manage-an-inbox-and-build-courses-and-budgets-with-claude-co.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Extract school dates from forwarded emails and flyers](./extract-school-dates-from-forwarded-emails-and-flyers.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
- [Run personal assistant tasks like medical data and finance reports](./run-personal-assistant-tasks-like-medical-data-and-finance-r.md)
