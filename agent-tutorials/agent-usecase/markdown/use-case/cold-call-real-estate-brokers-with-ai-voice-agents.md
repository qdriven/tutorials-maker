---
title: "Cold-call real estate brokers with AI voice agents"
slug: "cold-call-real-estate-brokers-with-ai-voice-agents"
summary: "A workflow places AI voice calls to brokers, schedules follow-up calls if no appointment is booked, and emails warm and hot lead alerts."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/n8n/comments/1nxsp4f/this_workflow_is_spamming_the_shit_out_of_your"
fetched_from: "https://agentusecases.ai/use-case/cold-call-real-estate-brokers-with-ai-voice-agents"
---

# Cold-call real estate brokers with AI voice agents

> A workflow places AI voice calls to brokers, schedules follow-up calls if no appointment is booked, and emails warm and hot lead alerts.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** Reddit · Undated

## What they did

The poster built an n8n workflow around Vapi that calls new real-estate leads within a minute of entering the CRM, qualifies them, and tries to book an appointment. If no meeting is set, the agent asks permission for a later check-in, auto-schedules it from the conversation, calls back with memory of the prior call, retries up to four times over four days with immediate redials, and emails warm or hot lead alerts; a human can retag missed leads to rerun the sequence.

## How it went

The post claims the client’s brokerage still had a 5.0 rating with 37 reviews and that most people did not realize the caller was AI. In comments, the poster also said their own broker-prospecting version was likely not compliant, while the client setup had lawyer approval and opt-in language.

## Worth knowing

The main catch is compliance: the poster said they research each jurisdiction, require opt-in for communications, and in some places disclosure for robocalls or recording.

## Prompt

```text
Design a workflow for calling [type of professional, e.g. real estate brokers] from a list in [Google Sheet] using an AI voice agent like [Vapi/Retell]. The call should pitch [my offer] and try to book an appointment. If none is booked, schedule a follow-up call in [number] days, and email me an alert for warm or hot leads with the call summary. Before any live calls go out, show me the script, the call list, and the compliance checks like calling hours and consent rules, and wait for my approval.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
