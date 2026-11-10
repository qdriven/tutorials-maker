---
title: "Build a speed-to-lead SMS agent that qualifies and books leads"
slug: "build-a-speed-to-lead-sms-agent-that-qualifies-and-books-lea"
summary: "Poster is building a Make agent for local small businesses that texts leads, asks qualifying questions, books appointments and sends summaries, but the conversation logic is looping."
category: "Sales, Marketing & Support"
agents:
  - name: "Make"
    slug: "make"
source_platform: "Reddit"
source_date: "Mar 20, 2026"
source_url: "https://www.reddit.com/r/Make/comments/1rz4epp/can_someone_help_me_figure_out_how_to_get_this"
fetched_from: "https://agentusecases.ai/use-case/build-a-speed-to-lead-sms-agent-that-qualifies-and-books-lea"
---

# Build a speed-to-lead SMS agent that qualifies and books leads

> Poster is building a Make agent for local small businesses that texts leads, asks qualifying questions, books appointments and sends summaries, but the conversation logic is looping.

**Category:** Sales, Marketing & Support  
**Agent:** Make  
**Source:** Reddit · Mar 20, 2026

## What they did

The poster is building a two-scenario Make setup for local businesses. One scenario already works: a web form lead triggers Webhooks, OpenAI, JSON parsing, Twilio, and two Data Store writes for leads and conversation history, which sends an immediate reply; the second inbound-SMS scenario is meant to keep the chat going, ask qualifying questions, book an appointment, and then notify the business with a summary, but the poster says they have not gotten that logic working and came to Reddit for help.

## How it went

The only working result described is the instant first text after a form submission. The inbound agent is failing because it sends multiple messages, loses memory, and repeats questions, and the comments mostly tell the poster to simplify the automation and map the workflow first.

## Worth knowing

The source gives no cost or timing data; the main catch is that the poster says they spent several days unsuccessfully trying to debug the looping conversation logic.

## Prompt

```text
Help me build a speed-to-lead scenario for [type of local business] in Make. When a new lead arrives from [form or CRM], text them within a minute, ask [3 qualifying questions] one at a time, track which question they've answered so it never repeats itself, book qualified leads into [calendar tool], and send me a summary. Stop asking once all answers are collected or the lead says stop, and hand off to me if the reply is unclear. Run it in test mode with a sample lead and show me the messages before anything goes to real customers.
```

## Related use cases

- [Manage email, calendar and tasks from Slack](./manage-email-calendar-and-tasks-from-slack.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
- [Automate customer onboarding with a Make scenario](./automate-customer-onboarding-with-a-make-scenario.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Find weak-web-presence businesses and pitch them with personalized outreach](./find-weak-web-presence-businesses-and-pitch-them-with-person.md)
- [Run autonomous weekly marketing actions with spend guardrails](./run-autonomous-weekly-marketing-actions-with-spend-guardrail.md)
