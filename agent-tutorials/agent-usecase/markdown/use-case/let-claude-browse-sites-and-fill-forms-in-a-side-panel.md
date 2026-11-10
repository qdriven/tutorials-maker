---
title: "Let Claude browse sites and fill forms in a side panel"
slug: "let-claude-browse-sites-and-fill-forms-in-a-side-panel"
summary: "When a task involves a website, Cowork opens a built-in browser where Claude navigates, clicks and fills forms while the user watches."
category: "Work & Operations"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
source_platform: "Reddit"
source_date: "Sep 17, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1vzeorx/cowork_now_has_its_own_builtin_browser"
fetched_from: "https://agentusecases.ai/use-case/let-claude-browse-sites-and-fill-forms-in-a-side-panel"
---

# Let Claude browse sites and fill forms in a side panel

> When a task involves a website, Cowork opens a built-in browser where Claude navigates, clicks and fills forms while the user watches.

**Category:** Work & Operations  
**Agent:** Claude Cowork  
**Source:** Reddit · Sep 17, 2026

## What they did

Claude’s Cowork mode opens a built-in browser in a side panel when a task involves a website, so the agent can fetch information from a specified site, navigate pages, click, and fill forms while the user watches. The post says this works without installing the Chrome extension, uses a browser separate from the user’s own tabs and logins, and allows optional import of saved Chrome logins.

## How it went

The example shown is a pricing comparison workflow that starts pulling prices from a chosen site. The post gives rollout details for paid desktop users, but no performance numbers or failure cases.

## Worth knowing

It is separate from your normal browser by default, and importing saved Chrome logins is opt-in.

## Prompt

```text
Open [website URL] in the browser panel and [task, e.g. fill out the application form] using these details: [your details]. Narrate what you're doing so I can watch. Stop and show me everything you've entered before submitting any form, making a payment, or sending a message.
```

## Related use cases

- [Summarize email and prep briefings from your phone](./summarize-email-and-prep-briefings-from-your-phone.md)
- [Turn trip receipts into an expense report and triage files](./turn-trip-receipts-into-an-expense-report-and-triage-files.md)
- [Monitor tech subreddits and competitors, draft emails and articles](./monitor-tech-subreddits-and-competitors-draft-emails-and-art.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
