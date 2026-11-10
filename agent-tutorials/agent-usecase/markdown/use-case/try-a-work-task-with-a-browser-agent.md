---
title: "Try a work task with a browser agent"
slug: "try-a-work-task-with-a-browser-agent"
summary: "The poster had Operator search the web for a work task; it made mistakes and would have taken longer than doing it manually."
category: "Work & Operations"
agents:
  - name: "Operator"
    slug: "operator"
source_platform: "Reddit"
source_date: "Jan 1, 2025"
source_url: "https://www.reddit.com/r/csMajors/comments/1i8joi4/ai_agents_are_not_coming_for_your_job_my"
fetched_from: "https://agentusecases.ai/use-case/try-a-work-task-with-a-browser-agent"
---

# Try a work task with a browser agent

> The poster had Operator search the web for a work task; it made mistakes and would have taken longer than doing it manually.

**Category:** Work & Operations  
**Agent:** Operator  
**Source:** Reddit · Jan 1, 2025

## What they did

The poster used OpenAI’s Operator through the Operator website with a ChatGPT Pro subscription and gave it a concrete browser task: find 50 popular financial YouTubers, gather LinkedIn info, emails, and channel summaries, and put it all in a table. Operator then browsed on its own, searching Bing, visiting pages, and trying spreadsheet tools; the human mainly watched, noticed it never asked for sign-in help, and stopped it after about 20 minutes.

## How it went

It produced only 18 influencers after 20 minutes, and the table format itself was fine, but the LinkedIn details and email addresses were made up. The poster says they could have done the job manually in about 15 minutes with fewer mistakes.

## Worth knowing

A key catch was speed: each click or scroll took about 1–2 seconds, and it also wasted roughly 5 minutes looking for a spreadsheet option instead of asking the user to sign in.

## Prompt

```text
I need to do this work task: [describe task, such as compiling vendor pricing or finding contact details]. Search the web, collect the results in a table with a source link for each row, and flag anything you are unsure about. Before you submit any form or send anything, pause and show me what you are about to do, and stop once the table is complete.
```

## Related use cases

- [Find a toy and start checkout with Operator](./find-a-toy-and-start-checkout-with-operator.md)
- [Test Operator on legal paperwork, party planning and shopping](./test-operator-on-legal-paperwork-party-planning-and-shopping.md)
- [Run web research jobs and capture screenshots into a doc](./run-web-research-jobs-and-capture-screenshots-into-a-doc.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Pull invoices from Gmail and organize them](./pull-invoices-from-gmail-and-organize-them.md)
- [Draft follow-up emails automatically when no reply arrives](./draft-follow-up-emails-automatically-when-no-reply-arrives.md)
