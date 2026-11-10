---
title: "Send a daily competitor and mentions digest to Slack"
slug: "send-a-daily-competitor-and-mentions-digest-to-slack"
summary: "A solo business owner runs an agent that gathers competitor news, Twitter activity, Reddit mentions and new G2 reviews into a 7am Slack digest; content repurposing still sounded robotic."
category: "Sales, Marketing & Support"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Apr 1, 2026"
source_url: "https://www.reddit.com/r/automation/comments/1stbu1c/heres_the_actual_agent_setup_im_running_for_my"
fetched_from: "https://agentusecases.ai/use-case/send-a-daily-competitor-and-mentions-digest-to-slack"
---

# Send a daily competitor and mentions digest to Slack

> A solo business owner runs an agent that gathers competitor news, Twitter activity, Reddit mentions and new G2 reviews into a 7am Slack digest; content repurposing still sounded robotic.

**Category:** Sales, Marketing & Support  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Apr 1, 2026

## What they did

The owner runs the workflow on Twin because many sources they monitor do not offer APIs, so the agent uses browser automation to pull competitor news, relevant Twitter activity, Reddit mentions they care about, and new G2 reviews in their space. It packages that into a Slack digest delivered at 7am, and the person also experimented with an agent that repurposed long posts into social content but found the output still needed human judgment.

## How it went

They say the morning digest alone saves about two hours a day of scattered context-gathering. The main miss was content repurposing: it was factually fine but still read obviously agent-written.

## Worth knowing

Their key constraint was source access: browser automation was necessary because many of the sites they wanted to monitor had no APIs.

## Prompt

```text
Build a workflow that runs every day at 7am [my time zone] and posts a digest to my Slack channel [#channel-name]. It should gather news about these competitors: [competitor names], recent posts mentioning [my brand or keywords] on Twitter and Reddit, and new reviews of [my product] on G2. Summarize each section in a few plain-language bullets with links, skip anything already reported, and post a test digest to Slack only after showing me the draft message. The job is done when the schedule is active and the test digest looks right to me.
```

## Related use cases

- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Resolve customer calls proactively with AI agents](./resolve-customer-calls-proactively-with-ai-agents.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Draft daily niche-news posts for four social platforms](./draft-daily-niche-news-posts-for-four-social-platforms.md)
- [Qualify leads and draft emails pending human approval](./qualify-leads-and-draft-emails-pending-human-approval.md)
- [Research and suggest X posts for Slack approval](./research-and-suggest-x-posts-for-slack-approval.md)
