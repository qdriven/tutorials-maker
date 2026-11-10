---
title: "Fill lengthy web forms from spreadsheet data"
slug: "fill-lengthy-web-forms-from-spreadsheet-data"
summary: "An agent fills long forms from Google Sheets or Excel data; one commenter used Playwright MCP with Claude and had it screenshot and verify fields."
category: "Work & Operations"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1ti3irm/use_case_automated_form_filling"
fetched_from: "https://agentusecases.ai/use-case/fill-lengthy-web-forms-from-spreadsheet-data"
---

# Fill lengthy web forms from spreadsheet data

> An agent fills long forms from Google Sheets or Excel data; one commenter used Playwright MCP with Claude and had it screenshot and verify fields.

**Category:** Work & Operations  
**Agent:** Claude  
**Source:** Reddit · Undated

## What they did

The post itself is just someone asking how to build an agent that copies data from Google Sheets or Excel into long web forms. The only concrete report in the thread comes from a commenter who used Claude with Playwright MCP to operate the browser, explicitly prompted it to take screenshots and re-check entries, and suggested switching to a fixed script if the form layout stays stable after some troubleshooting.

## How it went

The commenter said the agent could fill forms and, once turned into a stable script, do all fields at once and faster than a person. But they also said the Playwright MCP approach was extremely slow and made unexpected formatting mistakes unless verification was spelled out.

## Worth knowing

The main catch was speed and reliability: they said you must prompt it to screenshot and double-check fields, or it can misformat entries.

## Prompt

```text
Using Playwright, open [form URL] and fill it out using each row of my spreadsheet [file path or Google Sheet link], mapping columns [list column to field matches]. After filling each page, take a screenshot and verify every field matches the data, then report any mismatches. Stop and show me the filled form before clicking Submit, and only submit after I confirm.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Track competitor prices and contacts into Google Sheets](./track-competitor-prices-and-contacts-into-google-sheets.md)
- [Run weekly marketing content in brand voice](./run-weekly-marketing-content-in-brand-voice.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Grade papers and build lessons with Claude Cowork](./grade-papers-and-build-lessons-with-claude-cowork.md)
- [Answer patient enquiries for a clinic by chat](./answer-patient-enquiries-for-a-clinic-by-chat.md)
