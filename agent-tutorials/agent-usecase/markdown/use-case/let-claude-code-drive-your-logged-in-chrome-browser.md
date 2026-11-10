---
title: "Let Claude Code drive your logged-in Chrome browser"
slug: "let-claude-code-drive-your-logged-in-chrome-browser"
summary: "Users type a task into Claude Code and it uses their logged-in Chrome session through the official extension; the thread compares this with other browser-agent setups."
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
source_platform: "Reddit"
source_date: "Oct 19, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1x9qkq5/two_ways_to%20let%20Claude%20Code%20use%20your%20loggedin"
fetched_from: "https://agentusecases.ai/use-case/let-claude-code-drive-your-logged-in-chrome-browser"
---

# Let Claude Code drive your logged-in Chrome browser

> Users type a task into Claude Code and it uses their logged-in Chrome session through the official extension; the thread compares this with other browser-agent setups.

**Category:** Work & Operations  
**Agent:** Claude Code, Claude in Chrome  
**Source:** Reddit · Oct 19, 2026

## What they did

The post compares two setups for giving Claude Code a signed-in browser. With the official route, you launch `claude --chrome`, log in, and Claude uses your existing Chrome profile to click and type step by step in that window; with ego lite, you install the `/ego-browser` skill, import your Chrome profile in one click, then Claude runs in a separate browser space and writes short JavaScript to batch actions, while you can watch or take over and keep final submits, CAPTCHAs, 2FA, and payments for yourself.

## How it went

The thread does not report a hands-on result from the poster using the official extension; it mainly lays out tradeoffs. It cites ego’s own benchmark at 93.5% completion versus 77.4% for Browser Use’s local runtime, with $1.75 versus $3.14 model cost per completed task, but says those numbers were not run with Claude Code and do not compare against the Claude extension.

## Worth knowing

ego lite is described here as Mac-only, and the poster says some sites may ask you to log in again after importing your Chrome profile.

## Prompt

```text
Using the Claude in Chrome extension, open my logged-in Chrome and do this task: [describe the task, e.g. find the latest invoice in [site name] and download it]. Work only on [site or sites], and tell me each step you take. The job is done when [finished result, e.g. the file is saved to [folder] and you've told me its name]. Before you submit any form, send any message, make any payment, or delete anything, pause and show me exactly what you're about to do.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Track personal finances nightly from bank emails](./track-personal-finances-nightly-from-bank-emails.md)
- [Draft pull request reviews for you to edit and send](./draft-pull-request-reviews-for-you-to-edit-and-send.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Run a meeting assistant that handles meetings and summaries](./run-a-meeting-assistant-that-handles-meetings-and-summaries.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
