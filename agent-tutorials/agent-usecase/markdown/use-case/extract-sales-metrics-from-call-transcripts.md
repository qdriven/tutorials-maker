---
title: "Extract sales metrics from call transcripts"
slug: "extract-sales-metrics-from-call-transcripts"
summary: "A commenter feeds sales call transcripts to Claude to pull out revenue, leads and CPL for their trackers, and gets a local HTML file to interact with a dashboard."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Jul 28, 2026"
source_url: "https://gl.reddit.com/r/aiagents/comments/1usrgnk/is_anyone_actually_using_claude_for_other_stuff"
fetched_from: "https://agentusecases.ai/use-case/extract-sales-metrics-from-call-transcripts"
---

# Extract sales metrics from call transcripts

> A commenter feeds sales call transcripts to Claude to pull out revenue, leads and CPL for their trackers, and gets a local HTML file to interact with a dashboard.

**Category:** Sales, Marketing & Support  
**Agent:** Claude  
**Source:** Reddit · Jul 28, 2026

## What they did

The source describes two related Claude setups. In the original post, the user feeds sales-call transcripts into a workspace that already contains product docs and brand voice so Claude can extract KPI fields like revenue, leads, and CPL for trackers. In a comment, another user says they added a standing instruction to always create an HTML app for project chats, and Claude outputs a local HTML file in Downloads that organizes dashboards and can later be updated through a built-in chat button.

## How it went

The post claims this kind of workflow saves 10–15 hours a week overall, and the follow-up email draft arrives in about 60 seconds. The thread does not give a concrete result for the KPI extractor itself, only that the dashboard user found it a huge life hack.

## Worth knowing

The main catch is context setup: the users say Claude worked because it had source documents like brand voice, product docs, and styling instructions, not just a blank prompt.

## Prompt

```text
Here are my sales call transcripts: [paste transcripts]. For each call, extract [revenue, number of leads, cost per lead, and any other metrics] into a table, and note where a number was unclear. Then build a single local HTML file with an interactive dashboard of those metrics that I can open in my browser.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run brand marketing end to end and publish to social](./run-brand-marketing-end-to-end-and-publish-to-social.md)
- [Find roofing leads and run AI voice outreach](./find-roofing-leads-and-run-ai-voice-outreach.md)
