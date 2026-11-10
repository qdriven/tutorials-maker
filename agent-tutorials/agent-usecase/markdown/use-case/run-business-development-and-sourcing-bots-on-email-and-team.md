---
title: "Run business development and sourcing bots on email and Teams"
slug: "run-business-development-and-sourcing-bots-on-email-and-team"
summary: "The author runs multiple Grok Bot agents connected to Microsoft email and Teams accounts, including two BD agents and one sourcing agent."
category: "Work & Operations"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "Reddit"
source_date: "Sep 11, 2026"
source_url: "https://www.reddit.com/r/grok/comments/1vob5q2/grok_bot"
fetched_from: "https://agentusecases.ai/use-case/run-business-development-and-sourcing-bots-on-email-and-team"
---

# Run business development and sourcing bots on email and Teams

> The author runs multiple Grok Bot agents connected to Microsoft email and Teams accounts, including two BD agents and one sourcing agent.

**Category:** Work & Operations  
**Agent:** Grok Bot  
**Source:** Reddit · Sep 11, 2026

## What they did

The author says they set up six Grok Bot agents, with three tied to separate Microsoft accounts so each could use email and Teams in isolation: two for business development and one for sourcing. In practice, the BD agents used browser access to log into the team’s websites, write customized outreach emails, respond to replies, send requested marketing material, and later follow up without waiting for API integrations.

## How it went

The author says the communication quality felt strong enough that the agents seemed like they were actually working accounts, but the setup was hampered by daily Chrome profile resets, frequent crashes, limited concurrency of about one to two active agents, and heavy usage that burned 42% of a weekly allowance on day one.

## Worth knowing

Each agent needed its own Chrome profile, and the author says usage hit about 42% of the weekly limit on the first day.

## Prompt

```text
Act as a business development agent for [company]. Use the connected [Microsoft email and Teams accounts] to find new leads in [source, e.g. inbound inquiries or a target list], and draft a personalized outreach message for each. Pause and show me every draft before you send any email or Teams message. Finish with a tracker of leads, status, and next steps.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
- [Monitor competitor marketplace prices](./monitor-competitor-marketplace-prices.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Send a 7am daily brief from email, calendar and Todoist](./send-a-7am-daily-brief-from-email-calendar-and-todoist.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
