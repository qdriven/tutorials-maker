---
title: "Track incoming emails and notify about key ones"
slug: "track-incoming-emails-and-notify-about-key-ones"
summary: "The user asked Dots to watch for certain incoming emails and notify them, but it did not do so and was very slow."
category: "Work & Operations"
agents:
  - name: "Dots"
    slug: "dots"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/OpenAI/comments/1wu77gv/thoughts_on_dots"
fetched_from: "https://agentusecases.ai/use-case/track-incoming-emails-and-notify-about-key-ones"
---

# Track incoming emails and notify about key ones

> The user asked Dots to watch for certain incoming emails and notify them, but it did not do so and was very slow.

**Category:** Work & Operations  
**Agent:** Dots  
**Source:** Reddit · Undated

## What they did

The poster asked Dots to watch incoming email for specific messages and notify them, then checked whether it caught new mail on its own. In practice, they had to keep prompting it manually: it was slow, gave no useful progress updates, saw only one of two recent emails unless explicitly told to look again, and even reported no new mail when one had already arrived.

## How it went

It did not reliably perform the monitoring job. The poster says it missed one of the two most recent emails, said there were no new emails at 8:50 a.m. when there was one, and then failed to mention two more that arrived over the next two hours.

## Worth knowing

The main catch was reliability for time-sensitive inbox use: the poster says they had to manually ask Dots to find missed emails instead of trusting notifications.

## Prompt

```text
Watch my inbox for emails from [sender or topic, e.g. my landlord or invoices] and notify me by [text, push, or chat] as soon as one arrives, with the sender, subject, and a one-line summary. First send me a test notification to prove it works, and tell me how often you check. Don't reply to or delete any email.
```

## Related use cases

- [Plan a trip and book flight, hotel and shuttle with an always-on agent](./plan-a-trip-and-book-flight-hotel-and-shuttle-with-an-always.md)
- [Track rare coffee beans with a scheduled Dot](./track-rare-coffee-beans-with-a-scheduled-dot.md)
- [Use a persistent assistant for student research and daily tasks](./use-a-persistent-assistant-for-student-research-and-daily-ta.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Automate email replies, form data extraction, and lead notes](./automate-email-replies-form-data-extraction-and-lead-notes.md)
