---
title: "Control a computer with Claude's mouse and keyboard"
slug: "control-a-computer-with-claude-s-mouse-and-keyboard"
summary: "A poster tested Claude computer use for a day, where it screenshots, infers the screen, then moves the mouse and types; multi-app drift and small UI misses remained problems."
category: "Work & Operations"
agents:
  - name: "Claude computer use"
    slug: "claude-computer-use"
source_platform: "Reddit"
source_date: "Mar 30, 2025"
source_url: "https://www.reddit.com/r/PromptEngineering/comments/1s2h1h6/claude_can_now_control_your_mouse_and_keyboard_i"
fetched_from: "https://agentusecases.ai/use-case/control-a-computer-with-claude-s-mouse-and-keyboard"
---

# Control a computer with Claude's mouse and keyboard

> A poster tested Claude computer use for a day, where it screenshots, infers the screen, then moves the mouse and types; multi-app drift and small UI misses remained problems.

**Category:** Work & Operations  
**Agent:** Claude computer use  
**Source:** Reddit · Mar 30, 2025

## What they did

The poster spent a day testing Claude’s Computer Use on a Mac, where Claude repeatedly took screenshots, inferred the UI, then clicked and typed to complete tasks. They had it rename and sort 40+ files, copy PDF data into a Numbers spreadsheet, fill the same browser form eight times, and compile notes from five tabs, stepping in when it lost track of windows or needed a correction.

## How it went

It got all 40+ file actions right in about five minutes and was described as slow but accurate on data entry; the form-filling test had one date-format mistake. The poster estimated about 80% reliability on simple tasks and 50% on complex ones, with silent failures in longer multi-app workflows and no good handling of captchas, 2FA, speed-sensitive tasks, or risky clicks.

## Worth knowing

The main catch was that it took over the whole Mac while running, so the poster saw the best use case as starting a task and walking away.

## Prompt

```text
Use my desktop to do this task: [describe a short task, e.g. copy the figures from a spreadsheet into a form in another app]. Take a screenshot after each step to confirm it worked, and tell me if something doesn't look as expected instead of guessing. Pause and show me what you're about to do before submitting, sending, or deleting anything; you're done when [the finished result] is on screen.
```

## Related use cases

- [Fill out a Form 1040 with computer use](./fill-out-a-form-1040-with-computer-use.md)
- [Research a blog post with Claude computer use](./research-a-blog-post-with-claude-computer-use.md)
- [Apply to 50 jobs in under 30 minutes](./apply-to-50-jobs-in-under-30-minutes.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
