---
title: "Research calendar guests and send a Slack briefing"
slug: "research-calendar-guests-and-send-a-slack-briefing"
summary: "The author built a Zapier agent that researches Google Calendar guests via web search, drafts a short summary, and sends it on Slack."
category: "Work & Operations"
agents:
  - name: "Zapier Agents"
    slug: "zapier-agents"
source_platform: "xray.tech"
source_date: "Undated"
source_url: "https://www.xray.tech/post/ai-agent-zapier"
fetched_from: "https://agentusecases.ai/use-case/research-calendar-guests-and-send-a-slack-briefing"
---

# Research calendar guests and send a Slack briefing

> The author built a Zapier agent that researches Google Calendar guests via web search, drafts a short summary, and sends it on Slack.

**Category:** Work & Operations  
**Agent:** Zapier Agents  
**Source:** xray.tech · Undated

## What they did

The agent is built in Zapier with a 6 AM daily schedule trigger and three tools: Google Calendar Find Event, Slack Send Channel Message, and the built-in Web Search. Written instructions tell it to find the day's meetings, pick out external attendees, research each person and their company, and post a summary paragraph to a Slack channel. The author tests it in preview before switching it on.

## How it went

In the test, the agent correctly found biographical and career background on the author's CEO and CTO and sent it to Slack. The source gives no results from live runs.

## Worth knowing

The free plan caps test runs at 10 actions, and the agent may ask for confirmations during testing but runs on its own once live.

## Prompt

```text
Create a Zapier Agent that looks at my Google Calendar each morning, finds meetings with external guests, and researches each guest and their company using web search. Have it write a 3-4 line briefing per guest and send it to me in a Slack message to [channel or DM]. Test it on tomorrow's meetings and show me the briefing before turning on the schedule.
```

## Related use cases

- [Find an NYC apartment with a listing-watching agent](./find-an-nyc-apartment-with-a-listing-watching-agent.md)
- [Curate industry news and draft posts from it](./curate-industry-news-and-draft-posts-from-it.md)
- [Generate weekly leadership reports and handle feature requests](./generate-weekly-leadership-reports-and-handle-feature-reques.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Speed up multifamily deal research and property summaries](./speed-up-multifamily-deal-research-and-property-summaries.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
