---
title: "Turn Slack messages and sheet rows into Linear issues"
slug: "turn-slack-messages-and-sheet-rows-into-linear-issues"
summary: "Lindy workflows create Linear issues from Slack messages or new Google Sheet rows and write the issue link back to the sheet (vendor description)."
category: "Work & Operations"
agents:
  - name: "Lindy"
    slug: "lindy"
source_platform: "linear.app"
source_date: "Undated"
source_url: "https://linear.app/integrations/lindy"
fetched_from: "https://agentusecases.ai/use-case/turn-slack-messages-and-sheet-rows-into-linear-issues"
---

# Turn Slack messages and sheet rows into Linear issues

> Lindy workflows create Linear issues from Slack messages or new Google Sheet rows and write the issue link back to the sheet (vendor description).

**Category:** Work & Operations  
**Agent:** Lindy  
**Source:** linear.app · Undated

## What they did

In Lindy you set a trigger, such as a new Google Sheets row, then add a Linear action step and connect your Linear account. Lindy's AI can fill in the issue details, and it can also be told how to enter the Linear link back on the sheet. Supported actions include creating an issue and looking up issues, projects, statuses, teams and users.

## How it went

The page is a vendor description with no results or numbers. It names the sheet-row-to-issue workflow as a common one and shows a Slack message feeding issue creation only in a screenshot.

## Worth knowing

Use the Test button in the upper right of Lindy to check the workflow before relying on it.

## Prompt

```text
Create a workflow that turns messages I tag with [emoji or keyword] in [Slack channel] and new rows in [Google Sheet name] into [Linear] issues. Each issue should have a clear title, a description, and a link back to the source. For sheet rows, write the issue link back into column [column letter]. Test it on one example first and show me the issue before creating it, then stop after the test passes.
```

## Related use cases

- [Spin up a customer-support agent from a prompt](./spin-up-a-customer-support-agent-from-a-prompt.md)
- [Compile a daily digest of Reddit AI tool chatter](./compile-a-daily-digest-of-reddit-ai-tool-chatter.md)
- [Run a meeting assistant that handles meetings and summaries](./run-a-meeting-assistant-that-handles-meetings-and-summaries.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Speed up multifamily deal research and property summaries](./speed-up-multifamily-deal-research-and-property-summaries.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
