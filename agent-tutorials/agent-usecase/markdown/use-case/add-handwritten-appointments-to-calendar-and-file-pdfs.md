---
title: "Add handwritten appointments to calendar and file PDFs"
slug: "add-handwritten-appointments-to-calendar-and-file-pdfs"
summary: "A commenter describes a self-built agent that OCRs a photo of a handwritten appointment into their calendar, searches the web, and files an emailed PDF into paperless."
category: "Life Admin & Home"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Sep 9, 2026"
source_url: "https://news.ycombinator.com/item?id=49627493"
fetched_from: "https://agentusecases.ai/use-case/add-handwritten-appointments-to-calendar-and-file-pdfs"
---

# Add handwritten appointments to calendar and file PDFs

> A commenter describes a self-built agent that OCRs a photo of a handwritten appointment into their calendar, searches the web, and files an emailed PDF into paperless.

**Category:** Life Admin & Home  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Sep 9, 2026

## What they did

The commenter describes building a personal agent rather than relying on a chat subscription. It reads a photo of a handwritten appointment and adds it to a calendar, searches the web, and finds an email with a PDF and files it in a local paperless instance. It runs on cheap flash-tier models paid per token.

## How it went

The commenter calls it easy to build and says flash models are more than enough for simple agent tasks. They estimate about 15 dollars a year in tokens, versus 20 a month for a subscription. No detailed results are given.

## Worth knowing

The cost figure is the commenter's own estimate, and the comment gives no build details, so expect to work out the tool integrations yourself.

## Prompt

```text
When I send you a photo of a handwritten appointment, read the text and add it to my [calendar name] with the date, time, and place. When I forward a PDF by email, file it into [paperless or folder] with a sensible title and tags. Show me each calendar entry and filename before saving, and stop once everything from today's batch is filed.
```

## Related use cases

- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Manage an inbox and build courses and budgets with Claude Code](./manage-an-inbox-and-build-courses-and-budgets-with-claude-co.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Extract school dates from forwarded emails and flyers](./extract-school-dates-from-forwarded-emails-and-flyers.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
- [Run personal assistant tasks like medical data and finance reports](./run-personal-assistant-tasks-like-medical-data-and-finance-r.md)
