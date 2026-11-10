---
title: "Turn a recorded task into instructions an agent runs"
slug: "turn-a-recorded-task-into-instructions-an-agent-runs"
summary: "The poster recorded themselves doing a task, had AI convert it to step-by-step instructions, and ChatGPT Agent executed it alone with the same output."
category: "Work & Operations"
agents:
  - name: "ChatGPT Agent"
    slug: "chatgpt-agent"
source_platform: "Reddit"
source_date: "Jul 1, 2025"
source_url: "https://www.reddit.com/r/ChatGPT/comments/1m97oeu"
fetched_from: "https://agentusecases.ai/use-case/turn-a-recorded-task-into-instructions-an-agent-runs"
---

# Turn a recorded task into instructions an agent runs

> The poster recorded themselves doing a task, had AI convert it to step-by-step instructions, and ChatGPT Agent executed it alone with the same output.

**Category:** Work & Operations  
**Agent:** ChatGPT Agent  
**Source:** Reddit · Jul 1, 2025

## What they did

The poster recorded a Loom walkthrough of the task while narrating why each click mattered, uploaded the video to YouTube, and used Gemini 2.5 Pro to turn that recording into detailed step-by-step instructions. They pasted those instructions into ChatGPT Agent, which ran in a virtual machine, paused for the user to enter Salesforce credentials and a rotating authorization code, then pulled a Salesforce report, checked the same account in Gong, summarized the last 7 days, and assembled the result in a Word document.

## How it went

The agent produced the exact same output as the poster’s manual process, and the poster saw it as a practical time-saver for recurring reporting. The source does not give timing or accuracy numbers, and the poster was still only exploring whether the approach was detailed enough for a weekly forecast report.

## Worth knowing

The main catch was setup: they had to first make a narrated screen recording and manually handle login and multi-factor authentication because the temporary session did not store credentials.

## Prompt

```text
Here is a transcript or step-by-step description of me doing [task] in [tools/sites]: [paste]. First turn it into clear numbered instructions, then follow them to produce [expected output] using [inputs]. Show me the instructions before you start, and pause before sending, submitting, or deleting anything.
```

## Related use cases

- [Plan a family trip and pre-fill bookings](./plan-a-family-trip-and-pre-fill-bookings.md)
- [Collate WHO data into a multi-tab spreadsheet](./collate-who-data-into-a-multi-tab-spreadsheet.md)
- [Save the best local restaurants as a Google Maps list](./save-the-best-local-restaurants-as-a-google-maps-list.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Scrape websites with a plain-language browser agent](./scrape-websites-with-a-plain-language-browser-agent.md)
